import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Target, BookOpen, Trophy, ArrowRight } from 'lucide-react';

const QuickAccess: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-blue-600" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/practice"
          className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200">
            <PenTool className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Start Practice</h4>
          <p className="text-sm text-gray-600 mb-2">Begin new essay</p>
          <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        
        <div className="group p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 flex flex-col items-center text-center cursor-pointer">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Study Guide</h4>
          <p className="text-sm text-gray-600 mb-2">Tips & strategies</p>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
        
        <div className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 flex flex-col items-center text-center cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Mock Exam</h4>
          <p className="text-sm text-gray-600 mb-2">Full test simulation</p>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
        
        <div className="group p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 flex flex-col items-center text-center cursor-pointer">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-200">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Goal Tracker</h4>
          <p className="text-sm text-gray-600 mb-2">Monitor progress</p>
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
