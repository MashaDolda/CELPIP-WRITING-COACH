import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import TaskSelection from './components/TaskSelection';
import EssayEditor from './components/EssayEditor';
import FeedbackDisplay from './components/FeedbackDisplay';
import { TaskType, EssayData, FeedbackData } from './types';

function App() {
  const { t } = useTranslation();
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
    const { openaiService } = await import('./services/openai');
    return await openaiService.evaluateEssay(essay);
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
