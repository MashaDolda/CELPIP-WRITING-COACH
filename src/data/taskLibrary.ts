import { TaskType } from '../types';

// Comprehensive CELPIP Task Library (50+ tasks)
export const EMAIL_TASKS: TaskType[] = [
  // BEGINNER EMAIL TASKS (CLB 4-6)
  {
    id: 'email_beginner_1',
    title: 'Thank You Email to Teacher',
    description: 'Write a simple thank you email to your English teacher.',
    prompt: 'You recently finished an English course. Write an email to your teacher to thank them for their help. In your email:\n• Thank your teacher\n• Mention one thing you learned\n• Say how it will help you\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'beginner',
    category: 'academic',
    isPremium: false
  },
  {
    id: 'email_beginner_2',
    title: 'Library Book Request',
    description: 'Request a book from your local library.',
    prompt: 'You want to borrow a specific book from the library, but it\'s not available. Write an email to the librarian to:\n• Explain which book you need\n• Ask when it will be available\n• Request to be notified when it arrives\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'beginner',
    category: 'community',
    isPremium: false
  },
  {
    id: 'email_beginner_3',
    title: 'Neighbor Introduction',
    description: 'Introduce yourself to a new neighbor.',
    prompt: 'You have new neighbors who just moved in next door. Write an email to introduce yourself and:\n• Welcome them to the neighborhood\n• Introduce your family\n• Offer help if they need anything\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'beginner',
    category: 'personal',
    isPremium: false
  },

  // INTERMEDIATE EMAIL TASKS (CLB 6-8)
  {
    id: 'email_intermediate_1',
    title: 'Work Schedule Change Request',
    description: 'Request a change to your work schedule for family reasons.',
    prompt: 'You need to change your work schedule because your child started daycare. Write an email to your supervisor to:\n• Explain your situation\n• Propose a new schedule\n• Emphasize your commitment to your job\n• Request a meeting to discuss\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'workplace',
    isPremium: false
  },
  {
    id: 'email_intermediate_2',
    title: 'University Program Inquiry',
    description: 'Inquire about admission requirements for a university program.',
    prompt: 'You are interested in applying to a Master\'s program in Business Administration. Write an email to the admissions office to:\n• Express your interest in the program\n• Ask about admission requirements\n• Inquire about application deadlines\n• Request an information package\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'academic',
    isPremium: false
  },
  {
    id: 'email_intermediate_3',
    title: 'Community Event Proposal',
    description: 'Propose organizing a community event to local officials.',
    prompt: 'You want to organize a multicultural festival in your community. Write an email to the community center coordinator to:\n• Propose your event idea\n• Explain the benefits for the community\n• Request support and venue booking\n• Suggest potential dates\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'community',
    isPremium: true
  },
  {
    id: 'email_intermediate_4',
    title: 'Insurance Claim Follow-up',
    description: 'Follow up on a delayed insurance claim.',
    prompt: 'You submitted a car insurance claim three weeks ago but haven\'t heard back. Write an email to your insurance agent to:\n• Reference your claim number and date\n• Express concern about the delay\n• Request an update on the status\n• Ask for an estimated resolution time\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'personal',
    isPremium: true
  },

  // ADVANCED EMAIL TASKS (CLB 8-10)
  {
    id: 'email_advanced_1',
    title: 'Business Partnership Proposal',
    description: 'Propose a business partnership with another company.',
    prompt: 'Your small marketing company wants to partner with a larger firm to expand services. Write an email to their business development manager to:\n• Introduce your company and expertise\n• Propose a mutually beneficial partnership\n• Outline potential collaboration areas\n• Request a meeting to discuss further\n• Attach your company profile\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'advanced',
    category: 'workplace',
    isPremium: true
  },
  {
    id: 'email_advanced_2',
    title: 'Research Collaboration Request',
    description: 'Request collaboration on academic research project.',
    prompt: 'You are a graduate student researching climate change impacts. Write an email to a professor at another university to:\n• Introduce your research project\n• Explain why their expertise is valuable\n• Propose specific collaboration opportunities\n• Suggest sharing data and resources\n• Request a video call to discuss\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'advanced',
    category: 'academic',
    isPremium: true
  },
  {
    id: 'email_advanced_3',
    title: 'Government Policy Feedback',
    description: 'Provide feedback on proposed immigration policy changes.',
    prompt: 'The government is seeking public input on new immigration policies that may affect you. Write an email to your Member of Parliament to:\n• Introduce yourself as a constituent\n• Reference the specific policy proposal\n• Explain how it would impact you personally\n• Provide constructive suggestions for improvement\n• Request their support for amendments\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'advanced',
    category: 'immigration',
    isPremium: true
  }
];

export const SURVEY_TASKS: TaskType[] = [
  // BEGINNER SURVEY TASKS (CLB 4-6)
  {
    id: 'survey_beginner_1',
    title: 'Favorite Season Opinion',
    description: 'Share your opinion about your favorite season and why.',
    prompt: 'Some people prefer summer, while others prefer winter. Which season do you prefer and why?\n\nIn your response:\n• State your preferred season\n• Give 2-3 reasons for your preference\n• Provide examples from your experience\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'beginner',
    category: 'personal',
    isPremium: false
  },
  {
    id: 'survey_beginner_2',
    title: 'Learning a New Language',
    description: 'Discuss the benefits of learning a new language.',
    prompt: 'Learning a second language has many benefits. Do you think everyone should learn a second language?\n\nIn your response:\n• State your opinion clearly\n• Explain the benefits you see\n• Give examples from your own experience\n• Address potential challenges\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'beginner',
    category: 'academic',
    isPremium: false
  },
  {
    id: 'survey_beginner_3',
    title: 'Community Sports Programs',
    description: 'Give your opinion on community sports programs for children.',
    prompt: 'Many communities offer sports programs for children. Do you think these programs are important for child development?\n\nIn your response:\n• State your position clearly\n• Explain benefits for children\n• Consider costs and accessibility\n• Share any relevant experience\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'beginner',
    category: 'community',
    isPremium: false
  },

  // INTERMEDIATE SURVEY TASKS (CLB 6-8)
  {
    id: 'survey_intermediate_1',
    title: 'Remote Work vs Office Work',
    description: 'Compare remote work and traditional office work.',
    prompt: 'The pandemic changed how many people work. Some prefer working from home, while others prefer the traditional office. Which work arrangement do you think is better?\n\nIn your response:\n• State your preference clearly\n• Compare advantages of both arrangements\n• Consider impacts on productivity and work-life balance\n• Support your argument with examples\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'intermediate',
    category: 'workplace',
    isPremium: false
  },
  {
    id: 'survey_intermediate_2',
    title: 'Social Media Impact on Youth',
    description: 'Analyze the impact of social media on young people.',
    prompt: 'Social media platforms are very popular among teenagers and young adults. Do you think social media has a positive or negative impact on young people?\n\nIn your response:\n• State your position clearly\n• Discuss both positive and negative aspects\n• Consider mental health and social development\n• Suggest ways to minimize negative effects\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'intermediate',
    category: 'community',
    isPremium: true
  },
  {
    id: 'survey_intermediate_3',
    title: 'Electric Vehicles Adoption',
    description: 'Discuss the transition to electric vehicles.',
    prompt: 'Many countries are encouraging people to buy electric vehicles to reduce pollution. Do you think everyone should switch to electric vehicles?\n\nIn your response:\n• State your opinion clearly\n• Discuss environmental benefits\n• Consider practical challenges (cost, charging infrastructure)\n• Suggest solutions for widespread adoption\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'intermediate',
    category: 'community',
    isPremium: true
  },

  // ADVANCED SURVEY TASKS (CLB 8-10)
  {
    id: 'survey_advanced_1',
    title: 'Immigration Policy and Economic Growth',
    description: 'Analyze the relationship between immigration and economic development.',
    prompt: 'Some economists argue that increased immigration drives economic growth, while others worry about job competition for local workers. What is your view on the relationship between immigration and economic development?\n\nIn your response:\n• Present a clear thesis statement\n• Analyze economic benefits of immigration\n• Address concerns about job competition\n• Consider both short-term and long-term impacts\n• Support your arguments with logical reasoning\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'advanced',
    category: 'immigration',
    isPremium: true
  },
  {
    id: 'survey_advanced_2',
    title: 'Artificial Intelligence in Education',
    description: 'Evaluate the role of AI in modern education systems.',
    prompt: 'Artificial Intelligence is increasingly being integrated into educational systems, from personalized learning platforms to automated grading. Do you think AI will improve or harm the quality of education?\n\nIn your response:\n• Present a nuanced position on AI in education\n• Analyze potential benefits for personalized learning\n• Consider risks to human interaction and critical thinking\n• Discuss implications for teachers and students\n• Propose balanced implementation strategies\n\nWrite 250-300 words.',
    timeLimit: 26,
    wordLimit: { min: 250, max: 300 },
    type: 'survey',
    difficulty: 'advanced',
    category: 'academic',
    isPremium: true
  }
];

// Additional Premium Task Categories
export const WORKPLACE_TASKS: TaskType[] = [
  {
    id: 'workplace_1',
    title: 'Performance Review Self-Assessment',
    description: 'Write a professional self-assessment for your annual review.',
    prompt: 'Your manager has asked you to complete a self-assessment as part of your annual performance review. Write an email outlining:\n• Your key achievements this year\n• Areas where you\'ve grown professionally\n• Challenges you\'ve overcome\n• Goals for the upcoming year\n• Support you need to achieve these goals\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'advanced',
    category: 'workplace',
    isPremium: true
  },
  {
    id: 'workplace_2',
    title: 'Team Conflict Resolution',
    description: 'Address a workplace conflict professionally.',
    prompt: 'There has been ongoing tension between your team and another department affecting project deadlines. Write an email to your manager to:\n• Describe the situation objectively\n• Explain the impact on work quality and deadlines\n• Propose concrete solutions\n• Request support for implementation\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'advanced',
    category: 'workplace',
    isPremium: true
  }
];

export const IMMIGRATION_TASKS: TaskType[] = [
  {
    id: 'immigration_1',
    title: 'Provincial Nominee Program Application',
    description: 'Express interest in a Provincial Nominee Program.',
    prompt: 'You are interested in applying for your province\'s nominee program for permanent residence. Write an email to the immigration office to:\n• Express your interest in the program\n• Highlight your qualifications and work experience\n• Explain your ties to the province\n• Request information about the application process\n• Ask about required documents\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'immigration',
    isPremium: true
  },
  {
    id: 'immigration_2',
    title: 'Citizenship Test Preparation Inquiry',
    description: 'Inquire about citizenship test preparation resources.',
    prompt: 'You are preparing for the Canadian citizenship test and need additional study materials. Write an email to a settlement agency to:\n• Explain your current preparation status\n• Ask about available study groups or classes\n• Request recommended study materials\n• Inquire about practice tests\n• Ask about fees and registration process\n\nWrite 150-200 words.',
    timeLimit: 27,
    wordLimit: { min: 150, max: 200 },
    type: 'email',
    difficulty: 'intermediate',
    category: 'immigration',
    isPremium: true
  }
];

// Combine all tasks
export const ALL_TASKS = [
  ...EMAIL_TASKS,
  ...SURVEY_TASKS,
  ...WORKPLACE_TASKS,
  ...IMMIGRATION_TASKS
];

// Helper functions
export const getTasksByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return ALL_TASKS.filter(task => task.difficulty === difficulty);
};

export const getTasksByCategory = (category: string) => {
  return ALL_TASKS.filter(task => task.category === category);
};

export const getFreeTasksOnly = () => {
  return ALL_TASKS.filter(task => !task.isPremium);
};

export const getPremiumTasks = () => {
  return ALL_TASKS.filter(task => task.isPremium);
};
