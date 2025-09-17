import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen, Target, Eye, CheckCircle, Star, Lightbulb, ChevronDown, ChevronUp, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { EssayData, FeedbackData } from '../types';

interface FeedbackDisplayProps {
  essay: EssayData;
  feedback: FeedbackData | null;
  onBack: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ essay, feedback, onBack }) => {
  const { t } = useTranslation();
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);

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

  // Get detailed explanation for each CLB level based on evaluation guide
  const getDetailedExplanation = (criterion: string, score: number) => {
    const explanations: Record<string, Record<number, string>> = {
      content: {
        0: "Writers can use simple phrases. Ideas are often difficult to understand due to limited coherence.",
        1: "Writers can use simple phrases. Ideas are often difficult to understand due to limited coherence.",
        2: "Writers can use simple phrases. Ideas are often difficult to understand due to limited coherence.",
        3: "Writers can produce short, simple sentences. Some longer sentences may be run-on sentences due to misused punctuation.",
        4: "Writers can produce simple sentences and short, simple paragraphs. Ideas are organized into simple paragraphs and can communicate some personal information.",
        5: "Writers can express a main idea and some related ideas. Tasks express main ideas with some supporting details, though coherence may vary.",
        6: "Writers can produce short, coherent texts that express a main idea with some supporting details. Clear organization with focused content.",
        7: "Writers can produce short, moderately complex, factual texts. Clear main idea with supporting details and factual precision.",
        8: "Writers can develop a main idea with supporting details. More complexity in ideas with specific, less repetitive supporting details.",
        9: "Writers can write short formal and informal texts of some complexity. Ideas are supported with relevant facts, descriptions, and details.",
        10: "Writers can write complex formal and informal texts for various purposes. Key ideas supported with comprehensive facts and details.",
        11: "Writers demonstrate sophisticated content organization with complex ideas and comprehensive factual support.",
        12: "Writers produce highly sophisticated, complex texts with exceptional content development and coherence."
      },
      vocabulary: {
        0: "Writers can use very common words. Vocabulary is very limited with frequent repetition.",
        1: "Writers can use very common words. Vocabulary is very limited with frequent repetition.",
        2: "Writers can use very common words. Vocabulary is very limited with frequent repetition.",
        3: "Writers can express ideas using common words. May copy phrases from the question, showing limited independent vocabulary use.",
        4: "Writers can use common words. Vocabulary may be repetitive but shows some variety in word choice.",
        5: "Writers can use common words and phrases. Noticeably broader vocabulary range with more varied usage than lower levels.",
        6: "Writers can use common words and phrases. Attempts at precise or context-specific language may result in unclear ideas.",
        7: "Writers can use some context-specific words to communicate meaning. Word choice is more specific, accurate, and varied.",
        8: "Writers can use common words appropriately and some context-specific expressions. Meaning communicated more precisely.",
        9: "Writers choose words and phrases to provide accurate details and descriptions. Vocabulary supports sophisticated expression.",
        10: "Writers choose specialized, formal, and common words to express precise meaning. Vocabulary is sophisticated and varied.",
        11: "Writers demonstrate advanced vocabulary control with precise, sophisticated word choices across various contexts.",
        12: "Writers exhibit exceptional vocabulary range and precision, using sophisticated and specialized terms appropriately."
      },
      readability: {
        0: "Writers rarely use correct grammar. Ideas are difficult or impossible to understand due to grammar errors.",
        1: "Writers rarely use correct grammar. Ideas are difficult or impossible to understand due to grammar errors.",
        2: "Writers rarely use correct grammar. Ideas are difficult or impossible to understand due to grammar errors.",
        3: "Writers sometimes use correct grammar and basic punctuation. More readable than lower levels but still basic.",
        4: "Writers show some control of simple grammar, spelling, and punctuation. Ideas are connected with basic transitions.",
        5: "Writers can connect two or more related ideas with appropriate transitions. Good control of simple grammar and punctuation.",
        6: "Writers can organize related ideas into paragraphs with good control of grammar, spelling, and punctuation.",
        7: "Writers have adequate control of complex grammatical structures and good control of simple grammar and punctuation.",
        8: "Writers demonstrate good control of complex grammatical structures, spelling, and punctuation with well-organized paragraphs.",
        9: "Writers show control of diverse grammatical structures with good spelling and punctuation. Well-organized with transitions.",
        10: "Writers exhibit excellent control of complex grammatical structures with sophisticated transitions and organization.",
        11: "Writers demonstrate superior grammatical control with sophisticated sentence structures and seamless organization.",
        12: "Writers show exceptional grammatical mastery with complex, varied structures and flawless mechanical control."
      },
      taskFulfillment: {
        0: "Writers can convey very basic information for familiar people in simple situations.",
        1: "Writers can convey very basic information for familiar people in simple situations.",
        2: "Writers can convey very basic information for familiar people in simple situations.",
        3: "Writers can convey some information about familiar topics when writing for familiar people.",
        4: "Writers use some phrases appropriate to the situation and convey information about familiar topics.",
        5: "Writers can convey some information about familiar topics using common phrases appropriate to the situation.",
        6: "Writers can convey information and ideas about familiar topics using appropriate phrases and expressions.",
        7: "Writers can present information using tone and style following most writing conventions for familiar audiences.",
        8: "Writers can present information using appropriate tone and style following formal and informal writing conventions.",
        9: "Writers can convey intended meaning using appropriate tone and style for defined audiences in various situations.",
        10: "Writers can convey precise intended meaning using appropriate tone and style for any defined audience.",
        11: "Writers demonstrate sophisticated understanding of audience and purpose with highly appropriate tone and style.",
        12: "Writers exhibit exceptional command of audience, purpose, tone, and style across all writing contexts."
      }
    };

    return explanations[criterion]?.[score] || "Score explanation not available.";
  };

  // Calculate strategic recommendations based on score distribution
  const getStrategicRecommendations = () => {
    if (!feedback) return [];
    
    const scores = Object.entries(feedback.scores);
    const sortedScores = scores.sort(([,a], [,b]) => a - b); // Sort by score, lowest first
    const [weakest, secondWeakest] = sortedScores;
    const [strongest] = scores.sort(([,a], [,b]) => b - a); // Highest score
    
    const avgScore = Math.round(scores.reduce((sum, [,score]) => sum + score, 0) / scores.length);
    
    const recommendations = [];
    
    // Overall CLB strategy
    recommendations.push({
      type: 'overall',
      icon: '🎯',
      title: `Your Current Overall CLB Level: ${avgScore}`,
      message: `To improve your overall CLB level, focus on strengthening your weakest areas first.`
    });
    
    // Focus on weakest areas
    if (weakest[1] < avgScore - 1) {
      recommendations.push({
        type: 'priority',
        icon: '🚨',
        title: `PRIORITY FOCUS: ${weakest[0].charAt(0).toUpperCase() + weakest[0].slice(1)} (CLB ${weakest[1]})`,
        message: `This is significantly below your average. Improving this by just 1 CLB level will boost your overall score. ${getImprovementStrategy(weakest[0], weakest[1])}`
      });
    }
    
    if (secondWeakest[1] < avgScore) {
      recommendations.push({
        type: 'secondary',
        icon: '⚡',
        title: `SECONDARY FOCUS: ${secondWeakest[0].charAt(0).toUpperCase() + secondWeakest[0].slice(1)} (CLB ${secondWeakest[1]})`,
        message: `Work on this after addressing your priority area. ${getImprovementStrategy(secondWeakest[0], secondWeakest[1])}`
      });
    }
    
    // Support stronger areas
    if (strongest[1] >= avgScore) {
      recommendations.push({
        type: 'maintain',
        icon: '🏆',
        title: `MAINTAIN STRENGTH: ${strongest[0].charAt(0).toUpperCase() + strongest[0].slice(1)} (CLB ${strongest[1]})`,
        message: `This is your strongest area. ${getMaintenanceStrategy(strongest[0], strongest[1])}`
      });
    }
    
    return recommendations;
  };

  const getImprovementStrategy = (criterion: string, score: number) => {
    const strategies: Record<string, Record<number, string>> = {
      content: {
        0: "Practice writing simple, clear sentences. Focus on expressing one idea per sentence.",
        3: "Work on organizing ideas into paragraphs. Practice connecting related ideas.",
        4: "Develop supporting details for your main ideas. Use examples and explanations.",
        5: "Practice creating clear topic sentences and supporting them with relevant details.",
        6: "Work on developing more complex ideas with specific examples and evidence.",
        7: "Focus on creating more sophisticated arguments with factual support.",
        8: "Practice developing multiple complex ideas with detailed, specific support.",
        9: "Work on integrating various types of evidence (facts, examples, quotes) effectively."
      },
      vocabulary: {
        0: "Build basic vocabulary by learning common words and phrases for everyday topics.",
        3: "Practice using your own words instead of copying from the question.",
        4: "Expand your vocabulary by learning synonyms and avoiding repetition.",
        5: "Learn topic-specific vocabulary for common CELPIP themes.",
        6: "Practice using more precise words and context-specific vocabulary appropriately.",
        7: "Focus on using varied, sophisticated vocabulary while maintaining clarity.",
        8: "Practice integrating advanced vocabulary naturally into your writing.",
        9: "Work on selecting the most precise words to express complex ideas."
      },
      readability: {
        0: "Focus on basic sentence structure: subject + verb + object. Practice simple grammar rules.",
        3: "Learn to use basic punctuation correctly. Practice writing complete sentences.",
        4: "Work on connecting ideas with simple transition words (and, but, because).",
        5: "Practice using complex sentences and varied sentence structures.",
        6: "Focus on paragraph organization and using appropriate transition phrases.",
        7: "Practice using complex grammatical structures accurately.",
        8: "Work on sophisticated sentence variety and advanced grammar structures.",
        9: "Focus on seamless transitions and sophisticated grammatical control."
      },
      taskFulfillment: {
        0: "Focus on addressing the basic requirements of the task clearly.",
        3: "Practice writing for different audiences (formal vs. informal).",
        4: "Work on using appropriate tone and style for the specific task type.",
        5: "Practice adapting your language to match the task requirements.",
        6: "Focus on fully addressing all parts of the task prompt.",
        7: "Work on using appropriate register and conventions for different contexts.",
        8: "Practice writing with sophisticated awareness of audience and purpose.",
        9: "Focus on demonstrating nuanced understanding of communicative purpose."
      }
    };
    
    return strategies[criterion]?.[Math.min(score, 9)] || "Continue practicing to improve this area.";
  };

  const getMaintenanceStrategy = (criterion: string, score: number) => {
    if (score >= 10) return "Keep practicing to maintain this excellent level.";
    if (score >= 8) return "Continue using varied techniques to reach the next level.";
    return "Build on this strength while focusing on weaker areas.";
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

      {/* Strategic Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-blue-900">Strategic Improvement Plan</h3>
        </div>
        <div className="space-y-3">
          {getStrategicRecommendations().map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              rec.type === 'priority' ? 'bg-red-50 border border-red-200' :
              rec.type === 'secondary' ? 'bg-orange-50 border border-orange-200' :
              rec.type === 'maintain' ? 'bg-green-50 border border-green-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-start">
                <span className="text-2xl mr-3 mt-1">{rec.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-gray-700 text-sm">{rec.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CLB Levels by Criteria - Detailed Analysis</h3>
        
        <div className="space-y-4">
          {Object.entries(feedback.scores).map(([criterion, score]) => (
            <div key={criterion} className="border border-gray-200 rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-gray-600 mr-3">
                      {criteriaIcons[criterion as keyof typeof criteriaIcons]}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 text-lg">
                        {criterion.charAt(0).toUpperCase() + criterion.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                      <p className="text-sm text-gray-600">{getScoreDescription(score)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getScoreColor(score)}`}>
                      CLB {score}
                    </div>
                    <button
                      onClick={() => setExpandedCriterion(
                        expandedCriterion === criterion ? null : criterion
                      )}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedCriterion === criterion ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {expandedCriterion === criterion && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">
                            Why CLB {score}? - Based on Official CELPIP Standards
                          </h5>
                          <p className="text-blue-800 text-sm leading-relaxed">
                            {getDetailedExplanation(criterion, score)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-yellow-900 mb-2">
                            How to Improve to CLB {score + 1}
                          </h5>
                          <p className="text-yellow-800 text-sm leading-relaxed">
                            {getImprovementStrategy(criterion, score)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
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
