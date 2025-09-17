export interface TaskType {
  id: 'task1' | 'task2' | 'task3' | 'task4' | 'task5' | 'task6' | 'custom';
  title: string;
  description: string;
  prompt: string;
  timeLimit: number; // in minutes
  wordLimit: { min: number; max: number };
  type?: 'email' | 'survey' | 'custom';
  customImage?: string; // For uploaded task images
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
  },
  task3: {
    en: "You missed an important meeting at work due to a family emergency. Write an email to your supervisor (150-200 words) that includes:\n\n• Apologize for missing the meeting\n• Briefly explain the reason\n• Ask about key decisions made\n• Offer to make up for missed work",
    ru: "Вы пропустили важную встречу на работе из-за семейной экстренной ситуации. Напишите письмо своему руководителю (150-200 слов), которое включает:\n\n• Извинение за пропуск встречи\n• Краткое объяснение причины\n• Вопрос о ключевых принятых решениях\n• Предложение компенсировать пропущенную работу",
    uk: "Ви пропустили важливу зустріч на роботі через сімейну надзвичайну ситуацію. Напишіть лист своєму керівнику (150-200 слів), який включає:\n\n• Вибачення за пропуск зустрічі\n• Коротке пояснення причини\n• Питання про ключові прийняті рішення\n• Пропозицію компенсувати пропущену роботу"
  },
  task4: {
    en: "You want to join a local sports team but have no prior experience. Write an email to the team coach (150-200 words) that includes:\n\n• Express your interest in joining\n• Explain your fitness level and motivation\n• Ask about training schedule and requirements\n• Request a trial session",
    ru: "Вы хотите присоединиться к местной спортивной команде, но у вас нет предыдущего опыта. Напишите письмо тренеру команды (150-200 слов), которое включает:\n\n• Выражение интереса к присоединению\n• Объяснение вашего уровня физической подготовки и мотивации\n• Вопросы о расписании тренировок и требованиях\n• Просьба о пробной тренировке",
    uk: "Ви хочете приєднатися до місцевої спортивної команди, але у вас немає попереднього досвіду. Напишіть лист тренеру команди (150-200 слів), який включає:\n\n• Вираження інтересу до приєднання\n• Пояснення вашого рівня фізичної підготовки та мотивації\n• Питання про розклад тренувань та вимоги\n• Прохання про пробне тренування"
  },
  task5: {
    en: "Some people think that students should choose their own subjects in school, while others believe that everyone should study the same core subjects.\n\nWhat is your opinion? Support your answer with specific examples and reasons. (250-300 words)",
    ru: "Некоторые люди думают, что студенты должны выбирать свои собственные предметы в школе, в то время как другие считают, что все должны изучать одинаковые основные предметы.\n\nКакое ваше мнение? Подкрепите свой ответ конкретными примерами и причинами. (250-300 слов)",
    uk: "Деякі люди думають, що студенти повинні вибирати свої власні предмети в школі, тоді як інші вважають, що всі повинні вивчати однакові основні предмети.\n\nЯка ваша думка? Підкріпіть свою відповідь конкретними прикладами та причинами. (250-300 слів)"
  },
  task6: {
    en: "The city wants to build either a new shopping mall or a public park in your neighborhood. Citizens can vote on which option they prefer.\n\nWhich option would you choose? Explain your reasons with specific examples. (250-300 words)",
    ru: "Город хочет построить либо новый торговый центр, либо общественный парк в вашем районе. Граждане могут голосовать за тот вариант, который они предпочитают.\n\nКакой вариант вы бы выбрали? Объясните свои причины конкретными примерами. (250-300 слов)",
    uk: "Місто хоче побудувати або новий торговий центр, або громадський парк у вашому районі. Громадяни можуть голосувати за той варіант, який вони віддають перевагу.\n\nЯкий варіант ви б обрали? Поясніть свої причини конкретними прикладами. (250-300 слів)"
  },
  custom: {
    en: "Upload your own CELPIP task image and write your response based on the provided prompt.",
    ru: "Загрузите изображение своего задания CELPIP и напишите ответ на основе предоставленного задания.",
    uk: "Завантажте зображення свого завдання CELPIP і напишіть відповідь на основі наданого завдання."
  }
};
