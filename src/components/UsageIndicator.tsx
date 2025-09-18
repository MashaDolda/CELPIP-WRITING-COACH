import React from 'react';
import { AlertCircle, Users, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UsageIndicatorProps {
  remaining: number;
  limit: number;
  isGuest: boolean;
}

const UsageIndicator: React.FC<UsageIndicatorProps> = ({ remaining, limit, isGuest }) => {
  const used = limit - remaining;
  const percentage = (used / limit) * 100;
  
  // Color scheme based on usage
  const getColorScheme = () => {
    if (percentage >= 90) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500' };
    if (percentage >= 70) return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-500' };
    return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500' };
  };

  const colors = getColorScheme();

  if (remaining === 0) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-red-900 mb-2">
              {isGuest ? 'Free Trial Complete' : 'Monthly Limit Reached'}
            </h4>
            <p className="text-red-800 text-sm mb-3">
              {isGuest 
                ? `You've used all ${limit} free essays. Sign up for ${limit > 3 ? 'unlimited' : '10'} essays per month!`
                : `You've used all ${limit} essays this month. Upgrade for unlimited access!`
              }
            </p>
            <div className="flex space-x-3">
              <Link
                to={isGuest ? "/signup" : "#"}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors inline-flex items-center"
              >
                {isGuest ? (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Sign Up Free
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </>
                )}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-lg p-4 mb-6`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={`font-medium ${colors.text}`}>
          {isGuest ? 'Free Trial' : 'Monthly Usage'}
        </h4>
        <span className={`text-sm font-medium ${colors.text}`}>
          {used} / {limit} used
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${colors.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <p className={`text-sm ${colors.text}`}>
          <span className="font-medium">{remaining} essays</span> remaining this month
        </p>
        
        {isGuest && (
          <Link
            to="/signup"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center"
          >
            Sign up for more
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default UsageIndicator;
