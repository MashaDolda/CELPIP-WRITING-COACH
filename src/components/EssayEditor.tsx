import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, FileText, ArrowLeft, Send, Play, Pause, Square, RotateCcw } from 'lucide-react';
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
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length;
  const isWithinWordLimit = wordCount >= task.wordLimit.min && wordCount <= task.wordLimit.max;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerRunning && !isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setIsPaused(false);
  };

  const handleRestartTimer = () => {
    setTimeLeft(task.timeLimit * 60);
    setIsTimerRunning(true);
    setIsPaused(false);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    setIsPaused(false);
  };

  const getTimerColor = () => {
    if (timeLeft === 0) return 'text-red-600';
    if (timeLeft < 300) return 'text-orange-600'; // Less than 5 minutes
    if (isPaused) return 'text-yellow-600';
    return 'text-gray-700';
  };

  const getTimerBgColor = () => {
    if (timeLeft === 0) return 'bg-red-50 border-red-200';
    if (timeLeft < 300) return 'bg-orange-50 border-orange-200';
    if (isPaused) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200';
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
            {/* Timer with Controls */}
            <div className={`flex items-center px-4 py-2 rounded-lg border ${getTimerBgColor()}`}>
              <Clock className={`w-5 h-5 mr-3 ${getTimerColor()}`} />
              <div className="flex flex-col items-center mr-4">
                <span className={`text-2xl font-bold ${getTimerColor()}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs text-gray-500">
                  {isPaused ? 'PAUSED' : timeLeft === 0 ? 'TIME UP' : isTimerRunning ? 'RUNNING' : 'STOPPED'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {isTimerRunning && !isPaused ? (
                  <button
                    onClick={handlePauseTimer}
                    className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors"
                    title="Pause Timer"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={isPaused ? handlePauseTimer : handleStartTimer}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                    title={isPaused ? "Resume Timer" : "Start Timer"}
                  >
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleStopTimer}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Stop Timer"
                >
                  <Square className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRestartTimer}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Restart Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Word Count */}
            <div className="flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <FileText className="w-5 h-5 mr-3 text-blue-600" />
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-700">
                  {wordCount}
                </span>
                <span className="text-xs text-blue-500">WORDS</span>
              </div>
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
          disabled={isSubmitting}
        />

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Target: <span className="text-gray-700 font-medium">{task.wordLimit.min}-{task.wordLimit.max} words</span>
            </div>
            {!isWithinWordLimit && (
              <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                {wordCount < task.wordLimit.min ? 'Too few words' : 'Too many words'}
              </div>
            )}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!essay.trim() || isSubmitting}
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
            <p className="text-red-800 font-medium">⏰ Time's up! You can continue writing or submit your essay.</p>
          </div>
        )}

        {isPaused && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-medium">⏸️ Timer is paused. Click the play button to resume.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayEditor;
