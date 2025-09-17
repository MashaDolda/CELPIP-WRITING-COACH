import React from 'react';
import { AlertCircle, Shield, Database, Cloud } from 'lucide-react';

const DemoExplanation: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-900 mb-2">Demo Mode Active</h4>
          <p className="text-blue-800 text-sm mb-3">
            You're currently using the demo version of CELPIP Writing Coach. Here's what this means:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-blue-700 text-sm">
              <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
              <span><strong>Authentication:</strong> Login is simulated (no real Google OAuth)</span>
            </div>
            <div className="flex items-center text-blue-700 text-sm">
              <Database className="w-4 h-4 mr-2 flex-shrink-0" />
              <span><strong>Data Storage:</strong> Essays saved locally (browser storage only)</span>
            </div>
            <div className="flex items-center text-blue-700 text-sm">
              <Cloud className="w-4 h-4 mr-2 flex-shrink-0" />
              <span><strong>Full Features:</strong> All practice and feedback features work normally</span>
            </div>
          </div>
          
          <p className="text-blue-800 text-sm mt-3">
            For persistent data storage and real authentication, Firebase configuration is required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoExplanation;
