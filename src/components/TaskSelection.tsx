import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, Clock, Target, Users, Trophy, Upload, Building } from 'lucide-react';
import { TaskType, TASK_PROMPTS } from '../types';
import CustomTaskUpload from './CustomTaskUpload';

interface TaskSelectionProps {
  onTaskSelect: (task: TaskType) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onTaskSelect }) => {
  const { t, i18n } = useTranslation();
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your CELPIP Writing Task</h2>
        <p className="text-lg text-gray-600">
          Select from authentic CELPIP tasks or upload your own
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${getTaskColor(task.type, index)}`}>
                {getTaskIcon(task.type, task.id)}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.type === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                }`}>
                  {task.type === 'email' ? 'Task 1' : 'Task 2'}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{task.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{task.timeLimit} minutes</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Target className="w-4 h-4 mr-2" />
                <span>{task.wordLimit.min}-{task.wordLimit.max} words</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-gray-900 mb-1 text-sm">Task Prompt:</h4>
              <p className="text-xs text-gray-700 line-clamp-4">{task.prompt.substring(0, 120)}...</p>
            </div>

            <button
              onClick={() => onTaskSelect(task)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors text-sm ${getButtonColor(task.type, index)}`}
            >
              Start Writing
            </button>
          </div>
        ))}
      </div>

      {/* Custom Upload Option */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-200 p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="p-4 rounded-full bg-purple-100 text-purple-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Your Own Task</h3>
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
  );
};

export default TaskSelection;
