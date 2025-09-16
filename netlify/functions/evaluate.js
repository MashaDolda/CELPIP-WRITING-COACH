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

    const taskType = essay.task?.id === 'task1' ? 'email' : 'opinion essay';
    const wordCountAnalysis = essay.wordCount < essay.task?.wordLimit?.min ? 'significantly under word limit' :
                             essay.wordCount > essay.task?.wordLimit?.max ? 'over word limit' : 'within word limit';

    const prompt = `You are a certified CELPIP writing examiner with extensive experience evaluating English language proficiency. Evaluate this ${taskType} response according to official CELPIP scoring criteria.

TASK DETAILS:
- Type: ${essay.task?.title}
- Prompt: "${essay.task?.prompt}"
- Word Count: ${essay.wordCount} (Target: ${essay.task?.wordLimit?.min}-${essay.task?.wordLimit?.max}) - ${wordCountAnalysis}

ESSAY TO EVALUATE:
"${essay.content}"

EVALUATION CRITERIA (0-12 scale):

1. CONTENT & COHERENCE (0-12):
   - 9-12: Excellent organization, clear logical progression, all ideas well-developed and relevant
   - 6-8: Good organization, mostly clear flow, ideas generally well-developed
   - 3-5: Some organization present, basic idea development, some irrelevant content
   - 0-2: Poor organization, unclear flow, underdeveloped or irrelevant ideas

2. VOCABULARY (0-12):
   - 9-12: Wide range of vocabulary, precise word choice, natural expressions, rare errors
   - 6-8: Good vocabulary range, generally appropriate word choice, some sophisticated usage
   - 3-5: Limited vocabulary range, basic word choice, some inappropriate usage
   - 0-2: Very limited vocabulary, frequent inappropriate usage, impedes communication

3. READABILITY (0-12):
   - 9-12: Excellent grammar, varied sentence structures, clear and fluent expression
   - 6-8: Good grammar with minor errors, some sentence variety, generally clear
   - 3-5: Adequate grammar with some errors, limited sentence variety, mostly understandable
   - 0-2: Poor grammar, repetitive structures, errors impede understanding

4. TASK FULFILLMENT (0-12):
   ${taskType === 'email' ? `
   - 9-12: Completely addresses all email requirements, appropriate tone/register, proper format
   - 6-8: Addresses most requirements, generally appropriate tone, mostly proper format
   - 3-5: Addresses some requirements, inconsistent tone, basic format
   - 0-2: Fails to address requirements, inappropriate tone, poor format` :
   `- 9-12: Clear position stated, well-supported with examples, addresses all aspects
   - 6-8: Position stated, some support provided, addresses most aspects
   - 3-5: Position unclear or weak, limited support, addresses some aspects
   - 0-2: No clear position, minimal support, fails to address requirements`}

SPECIAL CONSIDERATIONS:
- Word count significantly impacts Task Fulfillment score
- ${taskType === 'email' ? 'Formal/informal register must match the context' : 'Clear thesis and conclusion expected'}
- Grammar errors that impede understanding lower Readability score more severely

Provide your response in this EXACT JSON format:
{
  "overallCLB": [CLB level 1-12 as whole number],
  "criteriaAnalysis": {
    "content": {
      "celpipScore": [score 0-12],
      "clbLevel": [CLB level 1-12 as whole number],
      "analysis": "Detailed analysis of content and coherence performance explaining the CLB level",
      "improvementToNextLevel": "Specific steps to reach next CLB level"
    },
    "vocabulary": {
      "celpipScore": [score 0-12],
      "clbLevel": [CLB level 1-12 as whole number],
      "analysis": "Detailed analysis of vocabulary usage explaining the CLB level",
      "improvementToNextLevel": "Specific steps to reach next CLB level"
    },
    "readability": {
      "celpipScore": [score 0-12],
      "clbLevel": [CLB level 1-12 as whole number],
      "analysis": "Detailed analysis of grammar and readability explaining the CLB level",
      "improvementToNextLevel": "Specific steps to reach next CLB level"
    },
    "taskFulfillment": {
      "celpipScore": [score 0-12],
      "clbLevel": [CLB level 1-12 as whole number],
      "analysis": "Detailed analysis of task fulfillment explaining the CLB level",
      "improvementToNextLevel": "Specific steps to reach next CLB level"
    }
  },
  "keyCorrections": [
    {
      "original": "exact phrase from essay",
      "corrected": "improved version",
      "explanation": "specific reason for improvement"
    }
  ]
}`;

    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: `You are a certified CELPIP writing examiner with extensive experience in CLB (Canadian Language Benchmark) assessment. You evaluate essays using the official CELPIP-CLB correlation guidelines.

IMPORTANT: Base all evaluations on authentic CELPIP standards and provide CLB scores that directly correspond to CELPIP performance levels.

CLB-CELPIP CORRELATION:
- CLB 10-12: CELPIP 10-12 (Advanced/Superior)
- CLB 8-9: CELPIP 7-9 (Advanced) 
- CLB 6-7: CELPIP 5-6 (Intermediate)
- CLB 4-5: CELPIP 3-4 (Basic)
- CLB 1-3: CELPIP 0-2 (Below Basic)

EVALUATION APPROACH:
1. Assess each criterion using CELPIP 0-12 scale
2. Convert to corresponding CLB level (whole numbers only)
3. Provide detailed analysis explaining the CLB assignment
4. Give specific improvement strategies for reaching next CLB level

Use official CELPIP descriptors and maintain consistency with established benchmarks.` 
        },
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

