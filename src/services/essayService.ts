import { EssayData, FeedbackData } from '../types';

interface EssayRecord {
  userId: string;
  taskTitle: string;
  taskId: string;
  content: string;
  wordCount: number;
  timeSpent: number;
  overallCLB: number;
  criteriaScores: {
    content: number;
    vocabulary: number;
    readability: number;
    taskFulfillment: number;
  };
  feedback: FeedbackData;
  createdAt: Date;
}

// Demo mode - store in localStorage until Firebase is set up
export const saveEssayResult = async (
  userId: string,
  essay: EssayData,
  feedback: FeedbackData
): Promise<void> => {
  try {
    const essayRecord: EssayRecord = {
      userId,
      taskTitle: essay.task.title,
      taskId: essay.task.id,
      content: essay.content,
      wordCount: essay.wordCount,
      timeSpent: essay.timeSpent,
      overallCLB: feedback.overallScore,
      criteriaScores: feedback.scores,
      feedback,
      createdAt: new Date()
    };

    // Store in localStorage for demo mode
    const existingEssays = JSON.parse(localStorage.getItem('demo-essays') || '[]');
    existingEssays.push(essayRecord);
    localStorage.setItem('demo-essays', JSON.stringify(existingEssays));

    console.log('Essay result saved to local storage (demo mode)');
  } catch (error) {
    console.error('Error saving essay result:', error);
  }
};

export const getUserEssays = async (userId: string): Promise<EssayRecord[]> => {
  // Get essays from localStorage for demo mode
  const essays = JSON.parse(localStorage.getItem('demo-essays') || '[]');
  return essays
    .filter((essay: EssayRecord) => essay.userId === userId)
    .sort((a: EssayRecord, b: EssayRecord) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const calculateUserAverage = async (userId: string, newCLB: number): Promise<number> => {
  const essays = await getUserEssays(userId);
  if (essays.length === 0) return newCLB;
  
  const total = essays.reduce((sum, essay) => sum + essay.overallCLB, 0);
  return Math.round((total / essays.length) * 10) / 10;
};