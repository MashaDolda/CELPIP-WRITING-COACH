import React, { useState, useRef } from 'react';
import { Upload, X, Camera, FileText, AlertCircle } from 'lucide-react';
import { TaskType } from '../types';

interface CustomTaskUploadProps {
  onTaskCreate: (task: TaskType) => void;
  onCancel: () => void;
}

const CustomTaskUpload: React.FC<CustomTaskUploadProps> = ({ onTaskCreate, onCancel }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [taskType, setTaskType] = useState<'email' | 'survey'>('email');
  const [wordLimit, setWordLimit] = useState({ min: 150, max: 200 });
  const [timeLimit, setTimeLimit] = useState(27);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        // For now, we'll ask users to type the prompt manually
        // In the future, we could integrate OCR here
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCustomTask = () => {
    if (!customPrompt.trim()) {
      alert('Please enter the task prompt from your uploaded image.');
      return;
    }

    const customTask: TaskType = {
      id: 'custom',
      title: `Custom ${taskType === 'email' ? 'Email' : 'Survey'} Task`,
      description: 'Your uploaded CELPIP task',
      prompt: customPrompt,
      timeLimit: timeLimit,
      wordLimit: wordLimit,
      type: 'custom',
      customImage: uploadedImage || undefined
    };

    onTaskCreate(customTask);
  };

  const handleTaskTypeChange = (type: 'email' | 'survey') => {
    setTaskType(type);
    if (type === 'email') {
      setWordLimit({ min: 150, max: 200 });
      setTimeLimit(27);
    } else {
      setWordLimit({ min: 250, max: 300 });
      setTimeLimit(26);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upload Your Own CELPIP Task</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            {uploadedImage ? (
              <div className="text-center">
                <img
                  src={uploadedImage}
                  alt="Uploaded task"
                  className="max-w-full max-h-96 mx-auto rounded-lg shadow-md"
                />
                <div className="mt-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Upload Different Image
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Upload CELPIP Task Image
                </h3>
                <p className="text-gray-500 mb-4">
                  Click to browse or drag and drop your task image here
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Camera className="w-4 h-4 mr-1" />
                    Photo
                  </span>
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Screenshot
                  </span>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Task Configuration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Type
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleTaskTypeChange('email')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    taskType === 'email'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Email (Task 1)
                </button>
                <button
                  onClick={() => handleTaskTypeChange('survey')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    taskType === 'survey'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Survey (Task 2)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="1"
                max="60"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Words
              </label>
              <input
                type="number"
                value={wordLimit.min}
                onChange={(e) => setWordLimit(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="50"
                max="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Words
              </label>
              <input
                type="number"
                value={wordLimit.max}
                onChange={(e) => setWordLimit(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                min="100"
                max="600"
              />
            </div>
          </div>

          {/* Task Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Prompt
            </label>
            <div className="mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center text-yellow-700">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Please type the exact task prompt from your uploaded image below.
                </span>
              </div>
            </div>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter the complete task prompt from your uploaded image..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustomTask}
              disabled={!customPrompt.trim()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Create Custom Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTaskUpload;
