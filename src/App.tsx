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
    return await response.json();
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
