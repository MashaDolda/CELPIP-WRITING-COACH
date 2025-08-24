import { EssayData, FeedbackData, FeedbackScores } from '../types';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1/chat/completions';
  private customModelId?: string;

  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY || '';
    this.customModelId = process.env.REACT_APP_CUSTOM_MODEL_ID;
    
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Using mock feedback.');
    }
  }

  private getCELPIPPrompt(essay: EssayData): string {
    return `You are a CELPIP writing examiner. Evaluate this ${essay.task.id === 'task1' ? 'email writing' : 'opinion essay'} response according to official CELPIP criteria.

TASK: ${essay.task.title}
PROMPT: ${essay.task.prompt}
WORD COUNT: ${essay.wordCount} (Target: ${essay.task.wordLimit.min}-${essay.task.wordLimit.max})

ESSAY:
"${essay.content}"

Evaluate on these 4 criteria (0-12 scale each):
1. CONTENT & COHERENCE: Organization, logical flow, completeness, relevance
2. VOCABULARY: Range, accuracy, appropriateness, sophistication
3. READABILITY: Grammar, sentence structure, clarity, mechanics
4. TASK FULFILLMENT: Addressing all requirements, staying on topic, meeting format expectations

Provide your response in this EXACT JSON format:
{
  "scores": {
    "content": [score 0-12],
    "vocabulary": [score 0-12], 
    "readability": [score 0-12],
    "taskFulfillment": [score 0-12]
  },
  "overallScore": [average score 0-12],
  "recommendations": [
    "Specific recommendation 1",
    "Specific recommendation 2", 
    "Specific recommendation 3"
  ],
  "corrections": [
    {
      "original": "incorrect phrase from essay",
      "corrected": "improved version",
      "explanation": "why this is better"
    }
  ]
}

Focus on constructive feedback that helps improve CELPIP performance. Be specific and actionable.`;
  }

  async evaluateEssay(essay: EssayData): Promise<FeedbackData> {
    // If no API key, return mock data
    if (!this.apiKey) {
      return this.getMockFeedback();
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.customModelId || 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: 'You are an expert CELPIP writing examiner with years of experience evaluating English language proficiency. You provide accurate, constructive feedback following official CELPIP scoring guidelines.'
            },
            {
              role: 'user',
              content: this.getCELPIPPrompt(essay)
            }
          ],
          temperature: 0.3, // Lower temperature for more consistent evaluation
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse JSON response
      const feedback = JSON.parse(content.trim());
      
      // Validate the response structure
      if (!this.validateFeedbackStructure(feedback)) {
        throw new Error('Invalid feedback structure from AI');
      }

      return feedback;

    } catch (error) {
      console.error('Error getting AI feedback:', error);
      // Fallback to mock data if API fails
      return this.getMockFeedback();
    }
  }

  private validateFeedbackStructure(feedback: any): feedback is FeedbackData {
    return (
      feedback &&
      typeof feedback === 'object' &&
      feedback.scores &&
      typeof feedback.scores.content === 'number' &&
      typeof feedback.scores.vocabulary === 'number' &&
      typeof feedback.scores.readability === 'number' &&
      typeof feedback.scores.taskFulfillment === 'number' &&
      typeof feedback.overallScore === 'number' &&
      Array.isArray(feedback.recommendations) &&
      Array.isArray(feedback.corrections)
    );
  }

  private getMockFeedback(): FeedbackData {
    // Fallback mock data (your existing implementation)
    return {
      scores: {
        content: Math.floor(Math.random() * 4) + 7,
        vocabulary: Math.floor(Math.random() * 4) + 6,
        readability: Math.floor(Math.random() * 4) + 7,
        taskFulfillment: Math.floor(Math.random() * 4) + 6,
      },
      overallScore: Math.floor(Math.random() * 4) + 7,
      recommendations: [
        'Consider using more advanced vocabulary to enhance your writing.',
        'Work on sentence variety to improve readability.',
        'Ensure all parts of the task are adequately addressed.',
        'Pay attention to paragraph structure and transitions.'
      ],
      corrections: [
        {
          original: 'I think that',
          corrected: 'I believe that',
          explanation: 'More formal expression for academic writing'
        }
      ]
    };
  }
}

// Export singleton instance
export const openaiService = new OpenAIService();
