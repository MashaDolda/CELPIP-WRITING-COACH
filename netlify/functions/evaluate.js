exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'OPENAI_API_KEY is not set' }) };
  }

  try {
    const { essay } = JSON.parse(event.body || '{}');
    if (!essay || !essay.content) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) };
    }

    const prompt = `You are a CELPIP writing examiner. Evaluate this ${essay.task?.id === 'task1' ? 'email writing' : 'opinion essay'} response according to official CELPIP criteria.\n\nTASK: ${essay.task?.title}\nPROMPT: ${essay.task?.prompt}\nWORD COUNT: ${essay.wordCount} (Target: ${essay.task?.wordLimit?.min}-${essay.task?.wordLimit?.max})\n\nESSAY:\n"${essay.content}"\n\nEvaluate on these 4 criteria (0-12 scale each):\n1. CONTENT & COHERENCE: Organization, logical flow, completeness, relevance\n2. VOCABULARY: Range, accuracy, appropriateness, sophistication\n3. READABILITY: Grammar, sentence structure, clarity, mechanics\n4. TASK FULFILLMENT: Addressing all requirements, staying on topic, meeting format expectations\n\nProvide your response in this EXACT JSON format:\n{\n  "scores": {\n    "content": [score 0-12],\n    "vocabulary": [score 0-12],\n    "readability": [score 0-12],\n    "taskFulfillment": [score 0-12]\n  },\n  "overallScore": [average score 0-12],\n  "recommendations": [\n    "Specific recommendation 1",\n    "Specific recommendation 2",\n    "Specific recommendation 3"\n  ],\n  "corrections": [\n    {\n      "original": "incorrect phrase from essay",\n      "corrected": "improved version",\n      "explanation": "why this is better"\n    }\n  ]\n}`;

    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert CELPIP examiner. Be accurate and consistent with official scoring.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
      max_tokens: 1500,
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'OpenAI error', details: text }) };
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'No content from OpenAI' }) };
    }

    let feedback;
    try {
      feedback = JSON.parse(content);
    } catch (e) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Invalid JSON from OpenAI', raw: content }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify(feedback) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server error', details: String(err) }) };
  }
};

