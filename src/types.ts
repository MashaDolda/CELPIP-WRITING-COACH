export interface TaskType {
  id: 'task1' | 'task2';
  title: string;
  description: string;
  prompt: string;
  timeLimit: number; // in minutes
  wordLimit: { min: number; max: number };
}

export interface EssayData {
  task: TaskType;
  content: string;
  wordCount: number;
  timeSpent: number; // in seconds
}

export interface FeedbackScores {
  content: number; // 0-12 scale
  vocabulary: number;
  readability: number;
  taskFulfillment: number;
}

export interface Correction {
  original: string;
  corrected: string;
  explanation: string;
}

export interface FeedbackData {
  scores: FeedbackScores;
  overallScore: number;
  recommendations: string[];
  corrections: Correction[];
}

// New CLB-based feedback format
export interface CriterionAnalysis {
  celpipScore: number; // 0-12 scale
  clbLevel: number; // 1-12 CLB level
  analysis: string;
  improvementToNextLevel: string;
}

export interface CLBFeedbackData {
  overallCLB: number;
  criteriaAnalysis: {
    content: CriterionAnalysis;
    vocabulary: CriterionAnalysis;
    readability: CriterionAnalysis;
    taskFulfillment: CriterionAnalysis;
  };
  keyCorrections: Correction[];
}

export const TASK_PROMPTS = {
  task1: {
    en: "You received an email from a friend who is planning to visit your city. Write an email response (150-200 words) that includes:\n\n• Welcome them to your city\n• Suggest 2-3 places they should visit\n• Offer to help with their trip planning\n• Ask about their arrival date and duration of stay",
    ru: "Вы получили письмо от друга, который планирует посетить ваш город. Напишите ответное письмо (150-200 слов), которое включает:\n\n• Приветствие в вашем городе\n• Предложение 2-3 места, которые стоит посетить\n• Предложение помочь с планированием поездки\n• Вопрос о дате прибытия и продолжительности пребывания",
    uk: "Ви отримали лист від друга, який планує відвідати ваше місто. Напишіть відповідного листа (150-200 слів), який включає:\n\n• Привітання у вашому місті\n• Пропозицію 2-3 місця, які варто відвідати\n• Пропозицію допомогти з плануванням подорожі\n• Питання про дату прибуття та тривалість перебування"
  },
  task2: {
    en: "Some people believe that social media has more negative effects than positive effects on society. Others disagree.\n\nWhat is your opinion? Explain your position with specific examples and reasons. (250-300 words)",
    ru: "Некоторые люди считают, что социальные сети оказывают больше негативного влияния на общество, чем позитивного. Другие с этим не согласны.\n\nКакое ваше мнение? Объясните свою позицию с конкретными примерами и причинами. (250-300 слов)",
    uk: "Деякі люди вважають, що соціальні мережі мають більше негативних наслідків, ніж позитивних для суспільства. Інші з цим не погоджуються.\n\nЯка ваша думка? Поясніть свою позицію з конкретними прикладами та причинами. (250-300 слів)"
  }
};
