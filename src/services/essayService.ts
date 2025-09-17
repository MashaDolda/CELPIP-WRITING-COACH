import { collection, addDoc, updateDoc, doc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
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
  createdAt: any;
}

export const saveEssayResult = async (
  userId: string,
  essay: EssayData,
  feedback: FeedbackData
): Promise<void> => {
  try {
    // Save the essay record
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
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, 'essays'), essayRecord);

    // Update user statistics
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      totalEssays: increment(1),
      averageCLB: feedback.overallScore, // This should be calculated as running average
      lastEssayDate: serverTimestamp()
    });

    console.log('Essay result saved successfully');
  } catch (error) {
    console.error('Error saving essay result:', error);
    throw error;
  }
};

export const calculateUserAverage = async (userId: string, newCLB: number): Promise<number> => {
  // This would typically fetch all user essays and calculate average
  // For now, we'll use a simple approach
  return newCLB;
};
