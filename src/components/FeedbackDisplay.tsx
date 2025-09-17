import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen, Target, Eye, CheckCircle, Star, Lightbulb } from 'lucide-react';
import { EssayData, FeedbackData } from '../types';

interface FeedbackDisplayProps {
  essay: EssayData;
  feedback: FeedbackData | null;
  onBack: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ essay, feedback, onBack }) => {
  const { t } = useTranslation();

  const criteriaIcons = {
    content: <BookOpen className="w-5 h-5" />,
    vocabulary: <Target className="w-5 h-5" />,
    readability: <Eye className="w-5 h-5" />,
    taskFulfillment: <CheckCircle className="w-5 h-5" />
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 10) return 'Excellent';
    if (score >= 8) return 'Good';
    if (score >= 6) return 'Satisfactory';
    return 'Needs Improvement';
  };

  if (!feedback) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('loading')}</h3>
          <p className="text-gray-600">Our AI is analyzing your essay and preparing detailed feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToTasks')}
          </button>
          
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-900">
              Overall CLB Level: {feedback.overallScore}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('feedback')}</h2>
        <p className="text-gray-600">{essay.task.title}</p>
      </div>

      {/* Scores */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CLB Levels by Criteria</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(feedback.scores).map(([criterion, score]) => (
            <div key={criterion} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="text-gray-600 mr-2">
                    {criteriaIcons[criterion as keyof typeof criteriaIcons]}
                  </div>
                  <span className="font-medium text-gray-900">
                    {t(`criteria.${criterion}`)}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(score)}`}>
                  CLB {score}
                </div>
              </div>
              <p className="text-sm text-gray-600">{getScoreDescription(score)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Essay Display */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Essay</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-2">
            Word Count: {essay.wordCount} | Time Spent: {Math.floor(essay.timeSpent / 60)}:{(essay.timeSpent % 60).toString().padStart(2, '0')}
          </div>
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {essay.content}
          </div>
        </div>
      </div>

      {/* Corrections */}
      {feedback.corrections.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Corrections</h3>
          <div className="space-y-3">
            {feedback.corrections.map((correction, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-red-600 line-through">"{correction.original}"</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-green-600 font-medium">"{correction.corrected}"</span>
                </div>
                <p className="text-sm text-gray-600">{correction.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{t('recommendations')}</h3>
        </div>
        <ul className="space-y-3">
          {feedback.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
