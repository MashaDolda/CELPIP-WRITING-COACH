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
          content: `You are a certified CELPIP writing examiner with extensive experience in CLB (Canadian Language Benchmark) assessment. You must evaluate essays using the official CELPIP evaluation guide provided below as your PRIMARY REFERENCE.

**CORE EVALUATION PRINCIPLES:**
- Base ALL evaluations on the sample responses, level descriptors, and response analyses provided
- Match the evaluation patterns shown in the official examples
- Use the exact same criteria and standards demonstrated in the guide
- Maintain absolute consistency with the established benchmarks

**CLB LEVEL DESCRIPTORS AND STANDARDS:**

CLB 0-2 LEVEL DESCRIPTORS:
Content/Coherence: Write very short, simple phrases
Vocabulary: Write the alphabet and numbers, use very common words  
Readability: Rarely use correct grammar
Task Fulfillment: Write some very simple information about me when writing for familiar person
ANALYSIS PATTERN: Writers can use simple phrases but rarely use correct grammar, making ideas difficult or impossible to understand.

CLB 3 LEVEL DESCRIPTORS:
Content/Coherence: Write short, simple sentences
Vocabulary: Use very common words
Readability: Sometimes use correct grammar, use capital letters and some punctuation  
Task Fulfillment: Write some information about me when writing for familiar person
ANALYSIS PATTERN: Writers produce short, simple sentences and can express ideas using common words. More readable than CLB 0-2 but still basic.

CLB 4 LEVEL DESCRIPTORS:
Content/Coherence: Write simple sentences and short, simple paragraphs, communicate personal information
Vocabulary: Use common words
Readability: Connect simple ideas, write with some control of simple grammar, write with some control of spelling and punctuation
Task Fulfillment: Use some phrases appropriate to the situation, convey information about familiar topics when writing for familiar people

CLB 5 LEVEL DESCRIPTORS:
Content/Coherence: Write short, simple to moderately complex texts, express a main idea and some related ideas
Vocabulary: Use common words and phrases
Readability: Connect two or more related ideas, write with good control of simple grammar, write with adequate control of spelling and punctuation
Task Fulfillment: Use common phrases appropriate to the situation, convey some information about familiar topics when writing for familiar people

CLB 6 LEVEL DESCRIPTORS:
Content/Coherence: Write short, moderately complex texts, develop a main idea with supporting details
Vocabulary: Use common or context-specific words to communicate meaning
Readability: Connect ideas in longer, more complex sentences, write with good control of simple and some complex grammar, write with good control of spelling and punctuation
Task Fulfillment: Use phrases and expressions appropriate to the purpose and audience, convey information and ideas about familiar topics

CLB 7 LEVEL DESCRIPTORS:
Content/Coherence: Write short, moderately complex, factual texts, express a main idea with supporting details
Vocabulary: Use common and some context-specific words to communicate meaning
Readability: Organize related ideas into paragraphs, write with adequate control of complex grammatical structures, write with good control of simple grammar, spelling, and punctuation
Task Fulfillment: Present information using a tone and style that follows most common writing conventions, convey factual information about a topic when writing for familiar or clearly defined audience

CLB 8 LEVEL DESCRIPTORS:
Content/Coherence: Write short, moderately complex texts, develop a main idea with supporting details
Vocabulary: Use common or context-specific words to communicate meaning
Readability: Write well-organized paragraphs, write with good control of complex grammatical structures, spelling, and punctuation
Task Fulfillment: Present information using a tone and style that follows some formal and most informal writing conventions, convey my intended meaning when writing for a defined audience

CLB 9 LEVEL DESCRIPTORS:
Content/Coherence: Write short formal and informal texts of some complexity, support key ideas with relevant facts, descriptions, details, or quotations
Vocabulary: Choose words and phrases to provide accurate details, descriptions, and comparisons
Readability: Write well-organized paragraphs, write with control of a range of complex and diverse grammatical structures, write with good control of spelling and punctuation
Task Fulfillment: Present information using a tone and style that follows some formal and most informal writing conventions, convey my intended meaning when writing for defined audience in formal or informal situations

CLB 10+ LEVEL DESCRIPTORS:
Content/Coherence: Write complex formal and informal texts for a range of purposes, support key ideas with a range of facts, descriptions, details, or quotations
Vocabulary: Choose specialized, formal, and common words to express precise meaning
Readability: Write well-organized paragraphs with sophisticated transitions, write with control of complex and diverse grammatical structures, excellent spelling and punctuation
Task Fulfillment: Present information using appropriate tone and style for full range of writing conventions, convey precise intended meaning for any defined audience

**EVALUATION METHODOLOGY:**
1. Compare the essay directly to the sample responses at each CLB level
2. Match the writing quality, complexity, and characteristics shown in the official samples
3. Use the response analysis patterns to explain your assessment
4. Assign CLB levels based on demonstrated performance matching the official descriptors
5. Provide improvement guidance that follows the progression shown between levels

**CRITICAL**: Your evaluation must reflect the exact standards and patterns demonstrated in the official CELPIP guide. Reference specific characteristics from the level descriptors and sample analyses.` 
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

