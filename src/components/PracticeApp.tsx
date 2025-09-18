import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskSelection from './TaskSelection';
import EssayEditor from './EssayEditor';
import FeedbackDisplay from './FeedbackDisplay';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';
import { canSubmitEssay, updateGuestUsage, updateUserUsage } from '../services/usageService';
import { saveEssayResult } from '../services/essayService';
import { TaskType, EssayData, FeedbackData } from '../types';

type AppStep = 'selection' | 'writing' | 'feedback';

const PracticeApp: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AppStep>('selection');
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [essayData, setEssayData] = useState<EssayData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(false);
  const [usageInfo, setUsageInfo] = useState(canSubmitEssay(currentUser?.uid));

  useEffect(() => {
    // Update usage info when user changes
    setUsageInfo(canSubmitEssay(currentUser?.uid));
  }, [currentUser]);

  const handleTaskSelect = (task: TaskType) => {
    // Check if user can still submit essays
    const currentUsage = canSubmitEssay(currentUser?.uid);
    if (!currentUsage.canSubmit) {
      alert(`You've reached your monthly limit. ${currentUsage.isGuest ? 'Sign up for more essays!' : 'Upgrade for unlimited access.'}`);
      return;
    }
    
    setSelectedTask(task);
    setCurrentStep('writing');
  };

  const handleEssaySubmit = async (essay: EssayData) => {
    setLoading(true);
    setEssayData(essay);
    
    try {
      const feedbackData = await generateAIFeedback(essay);
      setFeedback(feedbackData);
      
      // Save essay result if user is logged in
      if (currentUser?.uid) {
        await saveEssayResult(currentUser.uid, essay, feedbackData);
      }
      
      setCurrentStep('feedback');
    } catch (error) {
      console.error('Error processing essay:', error);
      alert('There was an error processing your essay. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAIFeedback = async (essayData: EssayData): Promise<FeedbackData> => {
    try {
      const response = await fetch('/.netlify/functions/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: essayData.task,
          essay: essayData.content,
          wordCount: essayData.wordCount,
          timeSpent: essayData.timeSpent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Update usage after successful evaluation
      if (currentUser?.uid) {
        updateUserUsage(currentUser.uid);
      } else {
        updateGuestUsage();
      }
      
      // Update local usage info
      setUsageInfo(canSubmitEssay(currentUser?.uid));
      
      // Convert new CLB format to old format for display compatibility
      const feedbackData: FeedbackData = {
        scores: {
          content: result.criteriaAnalysis?.content?.clbLevel || result.overallCLB || 7,
          vocabulary: result.criteriaAnalysis?.vocabulary?.clbLevel || result.overallCLB || 7,
          readability: result.criteriaAnalysis?.readability?.clbLevel || result.overallCLB || 7,
          taskFulfillment: result.criteriaAnalysis?.taskFulfillment?.clbLevel || result.overallCLB || 7,
        },
        overallScore: result.overallCLB || 7,
        recommendations: [
          result.criteriaAnalysis?.content?.improvementToNextLevel || 'Focus on developing your ideas more clearly.',
          result.criteriaAnalysis?.vocabulary?.improvementToNextLevel || 'Expand your vocabulary usage.',
          result.criteriaAnalysis?.readability?.improvementToNextLevel || 'Improve sentence structure and grammar.',
          result.criteriaAnalysis?.taskFulfillment?.improvementToNextLevel || 'Better address all task requirements.',
        ],
        corrections: result.keyCorrections || []
      };
      
      return feedbackData;
      
    } catch (error) {
      console.error('Error generating feedback:', error);
      // Return fallback data
      return {
        scores: { content: 6, vocabulary: 6, readability: 6, taskFulfillment: 6 },
        overallScore: 6,
        recommendations: [
          'Continue practicing to improve your writing skills.',
          'Focus on using varied vocabulary and sentence structures.',
          'Ensure all parts of the task are addressed completely.',
        ],
        corrections: []
      };
    }
  };

  const handleBack = () => {
    if (currentStep === 'feedback') {
      setCurrentStep('selection');
      setSelectedTask(null);
      setEssayData(null);
      setFeedback(null);
    } else if (currentStep === 'writing') {
      setCurrentStep('selection');
      setSelectedTask(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your essay...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'selection' && (
          <TaskSelection 
            onTaskSelect={handleTaskSelect} 
            usageInfo={usageInfo}
          />
        )}
        
        {currentStep === 'writing' && selectedTask && (
          <EssayEditor 
            task={selectedTask}
            onSubmit={handleEssaySubmit}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 'feedback' && essayData && feedback && (
          <FeedbackDisplay 
            essay={essayData}
            feedback={feedback}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default PracticeApp;