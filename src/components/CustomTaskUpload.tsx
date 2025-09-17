import React, { useState, useRef } from 'react';
import { Upload, X, Camera, FileText, ArrowLeft } from 'lucide-react';
import { TaskType } from '../types';

interface CustomTaskUploadProps {
  onTaskCreate: (task: TaskType) => void;
  onCancel: () => void;
}

const CustomTaskUpload: React.FC<CustomTaskUploadProps> = ({ onTaskCreate, onCancel }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [taskText, setTaskText] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'text' | 'image' | 'both'>('text');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateTask = () => {
    // Check if user provided either text or image
    if (!taskText.trim() && !uploadedImage) return;

    // Create task content based on what user provided
    let taskContent = '';
    if (taskText.trim() && uploadedImage) {
      taskContent = `TASK TEXT: ${taskText}\n\n[Image also provided - AI will analyze both text and image for complete task understanding]`;
    } else if (taskText.trim()) {
      taskContent = taskText;
    } else if (uploadedImage) {
      taskContent = '[Custom task image uploaded - AI will analyze the image to determine task requirements and provide appropriate evaluation]';
    }

    const newTask: TaskType = {
      id: 'custom',
      title: 'Custom Task',
      description: 'Your custom CELPIP task',
      prompt: taskContent,
      timeLimit: 30, // Default 30 minutes
      wordLimit: { min: 150, max: 300 }, // Flexible range
      type: 'custom',
      customImage: uploadedImage || undefined
    };

    onTaskCreate(newTask);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Add Your Custom Task</h2>
          <button
            onClick={onCancel}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 How to Upload Your Task</h3>
          <p className="text-blue-800">
            Found a CELPIP task in a book, online, or elsewhere? Upload it in any format you have:
          </p>
          <ul className="list-disc list-inside text-blue-700 mt-2 space-y-1">
            <li><strong>Copy & Paste</strong> the text if you have it in text format</li>
            <li><strong>Upload a Screenshot</strong> if you have an image of the task</li>
            <li><strong>Or do both</strong> for the most accurate analysis</li>
          </ul>
          <p className="text-blue-800 mt-2 font-medium">
            🤖 Our AI will analyze your task and provide authentic CELPIP evaluation!
          </p>
        </div>

        {/* Upload Method Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Upload Method</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setUploadMethod('text')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                uploadMethod === 'text'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileText className={`w-8 h-8 mx-auto mb-2 ${uploadMethod === 'text' ? 'text-blue-600' : 'text-gray-400'}`} />
              <h4 className="font-medium">Text Only</h4>
              <p className="text-sm text-gray-500">Copy & paste task text</p>
            </button>
            
            <button
              onClick={() => setUploadMethod('image')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                uploadMethod === 'image'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Camera className={`w-8 h-8 mx-auto mb-2 ${uploadMethod === 'image' ? 'text-green-600' : 'text-gray-400'}`} />
              <h4 className="font-medium">Image Only</h4>
              <p className="text-sm text-gray-500">Upload screenshot/photo</p>
            </button>
            
            <button
              onClick={() => setUploadMethod('both')}
              className={`p-4 border-2 rounded-lg text-center transition-all ${
                uploadMethod === 'both'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-center mb-2">
                <FileText className={`w-6 h-6 ${uploadMethod === 'both' ? 'text-purple-600' : 'text-gray-400'}`} />
                <Camera className={`w-6 h-6 ${uploadMethod === 'both' ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
              <h4 className="font-medium">Text + Image</h4>
              <p className="text-sm text-gray-500">Both for best results</p>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Text Input Section */}
          {(uploadMethod === 'text' || uploadMethod === 'both') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Task Text</h3>
              <textarea
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Paste your CELPIP task here...

Example:
You recently moved to a new city for work. Write an email to your friend describing your new job and asking about their recent vacation. Include details about your workplace and express interest in their travel experiences."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                Copy and paste the exact task instructions from your source
              </p>
            </div>
          )}

          {/* Image Upload Section */}
          {(uploadMethod === 'image' || uploadMethod === 'both') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📸 Task Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded task"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-green-600 font-medium mt-3">✅ Image uploaded successfully!</p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload your task screenshot or photo</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Camera className="w-4 h-4 inline mr-2" />
                      Choose Image
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              {taskText.trim() && uploadedImage && '📝📸 Both text and image provided - perfect!'}
              {taskText.trim() && !uploadedImage && uploadMethod !== 'text' && '📝 Text provided'}
              {!taskText.trim() && uploadedImage && '📸 Image provided'}
              {!taskText.trim() && !uploadedImage && '⚠️ Please provide your task content'}
            </div>
            <div className="space-x-4">
              <button
                onClick={onCancel}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                disabled={!taskText.trim() && !uploadedImage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                🚀 Start Writing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTaskUpload;