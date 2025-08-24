import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, FileText, ArrowLeft, Send } from 'lucide-react';
import { TaskType, EssayData } from '../types';

interface EssayEditorProps {
  task: TaskType;
  onSubmit: (essay: EssayData) => void;
  onBack: () => void;
}

const EssayEditor: React.FC<EssayEditorProps> = ({ task, onSubmit, onBack }) => {
  const { t } = useTranslation();
  const [essay, setEssay] = useState('');
  const [timeLeft, setTimeLeft] = useState(task.timeLimit * 60); // Convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isWithinWordLimit = wordCount >= task.wordLimit.min && wordCount <= task.wordLimit.max;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!essay.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const essayData: EssayData = {
      task,
      content: essay,
      wordCount,
      timeSpent: (task.timeLimit * 60) - timeLeft
    };

    await onSubmit(essayData);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToTasks')}
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className={timeLeft < 300 ? 'text-red-600 font-semibold' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span className={!isWithinWordLimit ? 'text-red-600' : 'text-green-600'}>
                {wordCount} / {task.wordLimit.min}-{task.wordLimit.max}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">Task Instructions:</h3>
          <p className="text-gray-700 whitespace-pre-line">{task.prompt}</p>
        </div>
      </div>

      {/* Essay Editor */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('writeEssay')}</h3>
        
        <textarea
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Start writing your response here..."
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          disabled={timeLeft === 0 || isSubmitting}
        />

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            {t('wordCount')}: <span className={!isWithinWordLimit ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>{wordCount}</span>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!essay.trim() || timeLeft === 0 || isSubmitting}
            className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('submitForFeedback')}
              </>
            )}
          </button>
        </div>

        {timeLeft === 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium">Time's up! Please submit your essay.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayEditor;
