import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

const DemoNotice: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Demo Mode Active</h4>
          <p className="text-blue-800 text-sm mb-2">
            You're currently using the app in demo mode. User accounts and essay history are stored locally. 
            For full functionality with persistent data storage, please set up Firebase.
          </p>
          <a 
            href="https://github.com/MashaDolda/CELPIP-WRITING-COACH/blob/main/FIREBASE_SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Firebase Setup Guide
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoNotice;
