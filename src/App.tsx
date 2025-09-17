import React, { useState } from 'react';

import Header from './components/Header';
import TaskSelection from './components/TaskSelection';
import EssayEditor from './components/EssayEditor';
import FeedbackDisplay from './components/FeedbackDisplay';
import { TaskType, EssayData, FeedbackData } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'selection' | 'writing' | 'feedback'>('selection');
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [essayData, setEssayData] = useState<EssayData | null>(null);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);

  const handleTaskSelect = (task: TaskType) => {
    setSelectedTask(task);
    setCurrentStep('writing');
  };

  const handleEssaySubmit = async (essay: EssayData) => {
    setEssayData(essay);
    setCurrentStep('feedback');
    
    // Simulate AI processing
    const feedback = await generateAIFeedback(essay);
    setFeedbackData(feedback);
  };

  const handleBackToTasks = () => {
    setCurrentStep('selection');
    setSelectedTask(null);
    setEssayData(null);
    setFeedbackData(null);
  };

  const generateAIFeedback = async (essay: EssayData): Promise<FeedbackData> => {
    const response = await fetch(`/api/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essay }),
    });
    if (!response.ok) {
      throw new Error('Failed to get AI feedback');
    }
    
    const clbData = await response.json();
    
    // Check if we have the new CLB format or old format
    if (clbData.criteriaAnalysis) {
      // Convert new CLB format to old format for compatibility
      const convertedFeedback: FeedbackData = {
        scores: {
          content: clbData.criteriaAnalysis?.content?.celpipScore || 0,
          vocabulary: clbData.criteriaAnalysis?.vocabulary?.celpipScore || 0,
          readability: clbData.criteriaAnalysis?.readability?.celpipScore || 0,
          taskFulfillment: clbData.criteriaAnalysis?.taskFulfillment?.celpipScore || 0
        },
        overallScore: clbData.overallCLB || 0,
        recommendations: [
          `📝 Content (CLB ${clbData.criteriaAnalysis?.content?.clbLevel}): ${clbData.criteriaAnalysis?.content?.improvementToNextLevel}`,
          `📚 Vocabulary (CLB ${clbData.criteriaAnalysis?.vocabulary?.clbLevel}): ${clbData.criteriaAnalysis?.vocabulary?.improvementToNextLevel}`,
          `✍️ Readability (CLB ${clbData.criteriaAnalysis?.readability?.clbLevel}): ${clbData.criteriaAnalysis?.readability?.improvementToNextLevel}`,
          `🎯 Task Fulfillment (CLB ${clbData.criteriaAnalysis?.taskFulfillment?.clbLevel}): ${clbData.criteriaAnalysis?.taskFulfillment?.improvementToNextLevel}`
        ],
        corrections: clbData.keyCorrections || []
      };
      
      return convertedFeedback;
    } else {
      // Old format - return as is
      return clbData;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'selection' && (
          <TaskSelection onTaskSelect={handleTaskSelect} />
        )}
        
        {currentStep === 'writing' && selectedTask && (
          <EssayEditor 
            task={selectedTask} 
            onSubmit={handleEssaySubmit}
            onBack={handleBackToTasks}
          />
        )}
        
        {currentStep === 'feedback' && essayData && (
          <FeedbackDisplay 
            essay={essayData}
            feedback={feedbackData}
            onBack={handleBackToTasks}
          />
        )}
      </main>
    </div>
  );
}

export default App;
