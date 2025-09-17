import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TaskSelection from './TaskSelection';
import EssayEditor from './EssayEditor';
import FeedbackDisplay from './FeedbackDisplay';
import { useAuth } from '../contexts/AuthContext';
import { saveEssayResult } from '../services/essayService';
import { TaskType, EssayData, FeedbackData, CLBFeedbackData } from '../types';
import { ArrowLeft } from 'lucide-react';

type AppStep = 'selection' | 'writing' | 'feedback';

const PracticeApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('selection');
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [essayData, setEssayData] = useState<EssayData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  const handleTaskSelect = (task: TaskType) => {
    setSelectedTask(task);
    setCurrentStep('writing');
  };

  const handleEssaySubmit = async (essay: EssayData) => {
    setEssayData(essay);
    setLoading(true);
    setCurrentStep('feedback');
    
    try {
      const feedbackData = await generateAIFeedback(essay);
      setFeedback(feedbackData);
      
      // Save to Firebase if user is authenticated
      if (currentUser) {
        await saveEssayResult(currentUser.uid, essay, feedbackData);
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTasks = () => {
    setCurrentStep('selection');
    setSelectedTask(null);
    setEssayData(null);
    setFeedback(null);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
              <h1 className="text-xl font-bold text-gray-900">CELPIP Writing Practice</h1>
            </div>
          </div>
        </div>
      </div>
      
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
            feedback={loading ? null : feedback}
            onBack={handleBackToTasks}
          />
        )}
      </main>
    </div>
  );
};

export default PracticeApp;
