import React, { useState } from 'react';
import { User, Target, BookOpen, Clock, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface OnboardingData {
  name: string;
  currentLevel: string;
  targetLevel: string;
  testDate: string;
  primaryGoal: string;
  weakAreas: string[];
  studyTime: string;
  hasTestExperience: boolean;
}

interface UserOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

const UserOnboarding: React.FC<UserOnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    currentLevel: '',
    targetLevel: '',
    testDate: '',
    primaryGoal: '',
    weakAreas: [],
    studyTime: '',
    hasTestExperience: false
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleWeakAreaToggle = (area: string) => {
    const newWeakAreas = formData.weakAreas.includes(area)
      ? formData.weakAreas.filter(a => a !== area)
      : [...formData.weakAreas, area];
    setFormData({ ...formData, weakAreas: newWeakAreas });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.currentLevel !== '' && formData.targetLevel !== '';
      case 3:
        return formData.primaryGoal !== '' && formData.testDate !== '';
      case 4:
        return formData.studyTime !== '';
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CELPIP Writing Coach!</h2>
              <p className="text-gray-600">Let's personalize your learning experience</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Have you taken a CELPIP test before?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, hasTestExperience: true })}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.hasTestExperience
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">Yes</div>
                  <div className="text-sm text-gray-600">I have experience</div>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, hasTestExperience: false })}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    !formData.hasTestExperience && formData.name
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">No</div>
                  <div className="text-sm text-gray-600">First time</div>
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Current & Target Levels</h2>
              <p className="text-gray-600">Help us understand your proficiency goals</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Current CLB Level (estimated)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12, "Don't know"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, currentLevel: level.toString() })}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        formData.currentLevel === level.toString()
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {level === "Don't know" ? level : `CLB ${level}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Target CLB Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[7, 8, 9, 10, 11, 12].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, targetLevel: level.toString() })}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        formData.targetLevel === level.toString()
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      CLB {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Goals & Timeline</h2>
              <p className="text-gray-600">Let's create a personalized study plan</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Goal
              </label>
              <div className="space-y-2">
                {[
                  'Immigration/PR application',
                  'University admission',
                  'Professional certification',
                  'Job requirements',
                  'Personal improvement',
                  'Other'
                ].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      formData.primaryGoal === goal
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                When do you plan to take the CELPIP test?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Within 1 month',
                  'Within 3 months',
                  'Within 6 months',
                  'More than 6 months',
                  'Not sure yet',
                  'Already scheduled'
                ].map((timeline) => (
                  <button
                    key={timeline}
                    onClick={() => setFormData({ ...formData, testDate: timeline })}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.testDate === timeline
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Study Preferences</h2>
              <p className="text-gray-600">Help us tailor your practice sessions</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Areas you'd like to focus on most (select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Content & Coherence',
                  'Vocabulary',
                  'Readability & Grammar',
                  'Task Fulfillment',
                  'Email Writing',
                  'Survey Responses',
                  'Time Management',
                  'Overall Confidence'
                ].map((area) => (
                  <button
                    key={area}
                    onClick={() => handleWeakAreaToggle(area)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.weakAreas.includes(area)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {formData.weakAreas.includes(area) && (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      {area}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How much time can you dedicate to practice daily?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  '15-30 minutes',
                  '30-60 minutes',
                  '1-2 hours',
                  '2+ hours'
                ].map((time) => (
                  <button
                    key={time}
                    onClick={() => setFormData({ ...formData, studyTime: time })}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.studyTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
              <button
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
