import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, Upload, ChevronLeft, ChevronRight, Star, Users, Trophy } from 'lucide-react';
import { TaskType, TASK_PROMPTS } from '../types';
import CustomTaskUpload from './CustomTaskUpload';

interface TaskSelectionProps {
  onTaskSelect: (task: TaskType) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onTaskSelect }) => {
  const { i18n } = useTranslation();
  const [showCustomUpload, setShowCustomUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'survey' | 'custom'>('email');
  const [emailPage, setEmailPage] = useState(0);
  const [surveyPage, setSurveyPage] = useState(0);
  
  const TASKS_PER_PAGE = 3;

  const emailTasks: TaskType[] = [
    {
      id: 'task1',
      title: 'Friend Visit',
      description: 'Welcome a friend planning to visit your city',
      prompt: TASK_PROMPTS.task1[i18n.language as keyof typeof TASK_PROMPTS.task1] || TASK_PROMPTS.task1.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task3',
      title: 'Missed Meeting',
      description: 'Apologize to supervisor for missing important meeting',
      prompt: TASK_PROMPTS.task3[i18n.language as keyof typeof TASK_PROMPTS.task3] || TASK_PROMPTS.task3.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task4',
      title: 'Join Sports Team',
      description: 'Request to join local sports team without experience',
      prompt: TASK_PROMPTS.task4[i18n.language as keyof typeof TASK_PROMPTS.task4] || TASK_PROMPTS.task4.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task7',
      title: 'Restaurant Complaint',
      description: 'Complain about poor service at a restaurant',
      prompt: TASK_PROMPTS.task7[i18n.language as keyof typeof TASK_PROMPTS.task7] || TASK_PROMPTS.task7.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task8',
      title: 'Gym Membership',
      description: 'Cancel gym membership instead of renewing',
      prompt: TASK_PROMPTS.task8[i18n.language as keyof typeof TASK_PROMPTS.task8] || TASK_PROMPTS.task8.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task9',
      title: 'Noisy Neighbors',
      description: 'Complain to landlord about noise problems',
      prompt: TASK_PROMPTS.task9[i18n.language as keyof typeof TASK_PROMPTS.task9] || TASK_PROMPTS.task9.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task10',
      title: 'Job Application',
      description: 'Apply for part-time job at local bookstore',
      prompt: TASK_PROMPTS.task10[i18n.language as keyof typeof TASK_PROMPTS.task10] || TASK_PROMPTS.task10.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task11',
      title: 'School Programs',
      description: 'Object to cutting arts programs at school',
      prompt: TASK_PROMPTS.task11[i18n.language as keyof typeof TASK_PROMPTS.task11] || TASK_PROMPTS.task11.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task12',
      title: 'Damaged Product',
      description: 'Return damaged laptop ordered online',
      prompt: TASK_PROMPTS.task12[i18n.language as keyof typeof TASK_PROMPTS.task12] || TASK_PROMPTS.task12.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    }
  ];

  const surveyTasks: TaskType[] = [
    {
      id: 'task2',
      title: 'Social Media Impact',
      description: 'Opinion on social media effects on society',
      prompt: TASK_PROMPTS.task2[i18n.language as keyof typeof TASK_PROMPTS.task2] || TASK_PROMPTS.task2.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task5',
      title: 'School Subject Choice',
      description: 'Students choosing subjects vs standard curriculum',
      prompt: TASK_PROMPTS.task5[i18n.language as keyof typeof TASK_PROMPTS.task5] || TASK_PROMPTS.task5.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task6',
      title: 'Shopping Mall vs Park',
      description: 'Choose between new shopping mall or public park',
      prompt: TASK_PROMPTS.task6[i18n.language as keyof typeof TASK_PROMPTS.task6] || TASK_PROMPTS.task6.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task13',
      title: 'Working from Home',
      description: 'Compare productivity of home vs office work',
      prompt: TASK_PROMPTS.task13[i18n.language as keyof typeof TASK_PROMPTS.task13] || TASK_PROMPTS.task13.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task14',
      title: 'Bike-sharing Programs',
      description: 'Opinion on city bike-sharing initiatives',
      prompt: TASK_PROMPTS.task14[i18n.language as keyof typeof TASK_PROMPTS.task14] || TASK_PROMPTS.task14.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task15',
      title: 'Mental Health Days',
      description: 'Should companies provide mental health days',
      prompt: TASK_PROMPTS.task15[i18n.language as keyof typeof TASK_PROMPTS.task15] || TASK_PROMPTS.task15.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task16',
      title: 'Shopping Preferences',
      description: 'Large chains vs small local businesses',
      prompt: TASK_PROMPTS.task16[i18n.language as keyof typeof TASK_PROMPTS.task16] || TASK_PROMPTS.task16.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task17',
      title: 'Free Public Transportation',
      description: 'Should government make public transport free',
      prompt: TASK_PROMPTS.task17[i18n.language as keyof typeof TASK_PROMPTS.task17] || TASK_PROMPTS.task17.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task18',
      title: 'Extended School Hours',
      description: 'Should schools extend the school day',
      prompt: TASK_PROMPTS.task18[i18n.language as keyof typeof TASK_PROMPTS.task18] || TASK_PROMPTS.task18.en,
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
          {emailTasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mr-3">
                  {getTaskIcon(task.type, task.id)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
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
          {surveyTasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-green-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-50 text-green-600 mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
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
