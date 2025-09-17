import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, Clock, Target, Users, Trophy, Upload } from 'lucide-react';
import { TaskType, TASK_PROMPTS } from '../types';
import CustomTaskUpload from './CustomTaskUpload';

interface TaskSelectionProps {
  onTaskSelect: (task: TaskType) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onTaskSelect }) => {
  const { i18n } = useTranslation();
  const [showCustomUpload, setShowCustomUpload] = useState(false);

  const tasks: TaskType[] = [
    {
      id: 'task1',
      title: 'Email: Friend Visit',
      description: 'Write to a friend planning to visit your city',
      prompt: TASK_PROMPTS.task1[i18n.language as keyof typeof TASK_PROMPTS.task1] || TASK_PROMPTS.task1.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task3',
      title: 'Email: Missed Meeting',
      description: 'Apologize to supervisor for missing important meeting',
      prompt: TASK_PROMPTS.task3[i18n.language as keyof typeof TASK_PROMPTS.task3] || TASK_PROMPTS.task3.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task4',
      title: 'Email: Join Sports Team',
      description: 'Request to join local sports team without experience',
      prompt: TASK_PROMPTS.task4[i18n.language as keyof typeof TASK_PROMPTS.task4] || TASK_PROMPTS.task4.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task2',
      title: 'Survey: Social Media Impact',
      description: 'Opinion on social media effects on society',
      prompt: TASK_PROMPTS.task2[i18n.language as keyof typeof TASK_PROMPTS.task2] || TASK_PROMPTS.task2.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task5',
      title: 'Survey: School Subject Choice',
      description: 'Students choosing subjects vs standard curriculum',
      prompt: TASK_PROMPTS.task5[i18n.language as keyof typeof TASK_PROMPTS.task5] || TASK_PROMPTS.task5.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task6',
      title: 'Survey: Shopping Mall vs Park',
      description: 'Choose between new shopping mall or public park',
      prompt: TASK_PROMPTS.task6[i18n.language as keyof typeof TASK_PROMPTS.task6] || TASK_PROMPTS.task6.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    }
  ];

  const getTaskIcon = (taskType: string | undefined, taskId: string) => {
    if (taskType === 'email') return <Mail className="w-6 h-6" />;
    if (taskType === 'survey') return <FileText className="w-6 h-6" />;
    
    // Fallback icons for specific tasks
    if (taskId.includes('sport')) return <Trophy className="w-6 h-6" />;
    if (taskId.includes('meeting')) return <Users className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const getTaskColor = (taskType: string | undefined, index: number) => {
    if (taskType === 'email') return 'bg-blue-100 text-blue-600';
    if (taskType === 'survey') return 'bg-green-100 text-green-600';
    return index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600';
  };

  const getButtonColor = (taskType: string | undefined, index: number) => {
    if (taskType === 'email') return 'bg-blue-600 hover:bg-blue-700 text-white';
    if (taskType === 'survey') return 'bg-green-600 hover:bg-green-700 text-white';
    return index % 2 === 0 
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-green-600 hover:bg-green-700 text-white';
  };

  if (showCustomUpload) {
    return (
      <CustomTaskUpload
        onTaskCreate={onTaskSelect}
        onCancel={() => setShowCustomUpload(false)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your CELPIP Writing Task</h2>
        <p className="text-lg text-gray-600">
          Select from authentic CELPIP tasks organized by type, or upload your own
        </p>
      </div>

      {/* Task 1: Email Writing Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Task 1: Email Writing</h3>
            <p className="text-gray-600">150-200 words • 27 minutes • Formal and informal emails</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.filter(task => task.type === 'email').map((task, index) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                  {getTaskIcon(task.type, task.id)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{task.title.replace('Email: ', '')}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                    Task 1
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{task.description}</p>

              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-700 line-clamp-3">{task.prompt.substring(0, 100)}...</p>
              </div>

              <button
                onClick={() => onTaskSelect(task)}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Start Writing
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task 2: Survey Response Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Task 2: Responding to Survey Questions</h3>
            <p className="text-gray-600">250-300 words • 26 minutes • Opinion essays with examples</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.filter(task => task.type === 'survey').map((task, index) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-50 text-green-600 mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{task.title.replace('Survey: ', '')}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">
                    Task 2
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm">{task.description}</p>

              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-green-700 line-clamp-3">{task.prompt.substring(0, 100)}...</p>
              </div>

              <button
                onClick={() => onTaskSelect(task)}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
              >
                Start Writing
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Upload Section */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Custom Task Upload</h3>
            <p className="text-gray-600">Upload your own CELPIP task image • Any word count • Custom time</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 rounded-full bg-purple-100 text-purple-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Upload className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Own Task</h4>
            <p className="text-gray-600 mb-6">
              Have a specific CELPIP task you want to practice? Upload an image and get personalized feedback.
            </p>
            <button
              onClick={() => setShowCustomUpload(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
            >
              Upload Custom Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSelection;
