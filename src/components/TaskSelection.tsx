import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, Upload, ChevronLeft, ChevronRight, Star, Users, Trophy } from 'lucide-react';
import { TaskType } from '../types';
import { EMAIL_TASKS, SURVEY_TASKS, getFreeTasksOnly, getPremiumTasks } from '../data/taskLibrary';
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
      title: 'Workplace Issue',
      description: 'Address a problem with a coworker professionally',
      prompt: TASK_PROMPTS.task8[i18n.language as keyof typeof TASK_PROMPTS.task8] || TASK_PROMPTS.task8.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task9',
      title: 'Thank Host Family',
      description: 'Express gratitude to host family after staying',
      prompt: TASK_PROMPTS.task9[i18n.language as keyof typeof TASK_PROMPTS.task9] || TASK_PROMPTS.task9.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task10',
      title: 'Library Hours Request',
      description: 'Request extended library hours from local government',
      prompt: TASK_PROMPTS.task10[i18n.language as keyof typeof TASK_PROMPTS.task10] || TASK_PROMPTS.task10.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task11',
      title: 'Course Information',
      description: 'Inquire about language course details and enrollment',
      prompt: TASK_PROMPTS.task11[i18n.language as keyof typeof TASK_PROMPTS.task11] || TASK_PROMPTS.task11.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    },
    {
      id: 'task12',
      title: 'Moving Notice',
      description: 'Inform landlord about decision to move out',
      prompt: TASK_PROMPTS.task12[i18n.language as keyof typeof TASK_PROMPTS.task12] || TASK_PROMPTS.task12.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 },
      type: 'email'
    }
  ];

  const surveyTasks: TaskType[] = [
    {
      id: 'task2',
      title: 'Online Shopping vs Store Shopping',
      description: 'Compare online and in-store shopping experiences',
      prompt: TASK_PROMPTS.task2[i18n.language as keyof typeof TASK_PROMPTS.task2] || TASK_PROMPTS.task2.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task5',
      title: 'Public Transportation Investment',
      description: 'Discuss government spending on public transportation',
      prompt: TASK_PROMPTS.task5[i18n.language as keyof typeof TASK_PROMPTS.task5] || TASK_PROMPTS.task5.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task6',
      title: 'Technology in Education',
      description: 'Evaluate the role of technology in modern education',
      prompt: TASK_PROMPTS.task6[i18n.language as keyof typeof TASK_PROMPTS.task6] || TASK_PROMPTS.task6.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task13',
      title: 'Outdoor Exercise Benefits',
      description: 'Discuss benefits of outdoor vs indoor exercise',
      prompt: TASK_PROMPTS.task13[i18n.language as keyof typeof TASK_PROMPTS.task13] || TASK_PROMPTS.task13.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task14',
      title: 'Remote Work Advantages',
      description: 'Analyze benefits and challenges of remote work',
      prompt: TASK_PROMPTS.task14[i18n.language as keyof typeof TASK_PROMPTS.task14] || TASK_PROMPTS.task14.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task15',
      title: 'Community Volunteering Impact',
      description: 'Evaluate importance of community volunteer work',
      prompt: TASK_PROMPTS.task15[i18n.language as keyof typeof TASK_PROMPTS.task15] || TASK_PROMPTS.task15.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task16',
      title: 'Reading vs Digital Media',
      description: 'Compare traditional reading with digital entertainment',
      prompt: TASK_PROMPTS.task16[i18n.language as keyof typeof TASK_PROMPTS.task16] || TASK_PROMPTS.task16.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task17',
      title: 'Career Change Timing',
      description: 'Discuss optimal age for career transitions',
      prompt: TASK_PROMPTS.task17[i18n.language as keyof typeof TASK_PROMPTS.task17] || TASK_PROMPTS.task17.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    },
    {
      id: 'task18',
      title: 'Social Media Privacy',
      description: 'Analyze privacy concerns in social media usage',
      prompt: TASK_PROMPTS.task18[i18n.language as keyof typeof TASK_PROMPTS.task18] || TASK_PROMPTS.task18.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 },
      type: 'survey'
    }
  ];

  const getTaskIcon = (taskId: string) => {
    if (taskId.includes('4') || taskId.includes('7') || taskId.includes('8')) return <Users className="w-5 h-5" />;
    if (taskId.includes('5') || taskId.includes('6') || taskId.includes('9')) return <Trophy className="w-5 h-5" />;
    return <Mail className="w-5 h-5" />;
  };
  
  const getCurrentPageTasks = (tasks: TaskType[], page: number) => {
    const startIndex = page * TASKS_PER_PAGE;
    return tasks.slice(startIndex, startIndex + TASKS_PER_PAGE);
  };
  
  const getTotalPages = (tasks: TaskType[]) => {
    return Math.ceil(tasks.length / TASKS_PER_PAGE);
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your CELPIP Writing Task</h2>
        <p className="text-lg text-gray-600">
          Select from authentic CELPIP tasks - organized and easy to navigate
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'email'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Task 1: Emails
          </button>
          <button
            onClick={() => setActiveTab('survey')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'survey'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Task 2: Surveys
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Custom Upload
          </button>
        </div>
      </div>

      {/* Email Tasks */}
      {activeTab === 'email' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Email Writing Tasks</h3>
                <p className="text-gray-600">150-200 words • 27 minutes • Formal and informal emails</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Page {emailPage + 1} of {getTotalPages(emailTasks)}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getCurrentPageTasks(emailTasks, emailPage).map((task, index) => (
          <div
            key={task.id}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => onTaskSelect(task)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-lg text-blue-600 mr-3">
                      {getTaskIcon(task.id)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{task.title}</h4>
                      <span className="text-xs text-blue-600">Email Task</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {task.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>📝 {task.wordLimit.min}-{task.wordLimit.max}</span>
                    <span>⏱️ {task.timeLimit}min</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg group-hover:scale-105 transition-transform">
                    Start Writing
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Email Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setEmailPage(Math.max(0, emailPage - 1))}
              disabled={emailPage === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Showing {emailPage * TASKS_PER_PAGE + 1}-{Math.min((emailPage + 1) * TASKS_PER_PAGE, emailTasks.length)} of {emailTasks.length} email tasks
            </div>

            <button
              onClick={() => setEmailPage(Math.min(getTotalPages(emailTasks) - 1, emailPage + 1))}
              disabled={emailPage >= getTotalPages(emailTasks) - 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Survey Tasks */}
      {activeTab === 'survey' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Survey Response Tasks</h3>
                <p className="text-gray-600">250-300 words • 26 minutes • Opinion essays with examples</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Page {surveyPage + 1} of {getTotalPages(surveyTasks)}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getCurrentPageTasks(surveyTasks, surveyPage).map((task, index) => (
              <div 
                key={task.id} 
                className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => onTaskSelect(task)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-white rounded-lg text-green-600 mr-3">
                      {getTaskIcon(task.id)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{task.title}</h4>
                      <span className="text-xs text-green-600">Survey Task</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {task.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span>📝 {task.wordLimit.min}-{task.wordLimit.max}</span>
                    <span>⏱️ {task.timeLimit}min</span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg group-hover:scale-105 transition-transform">
                    Start Writing
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Survey Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSurveyPage(Math.max(0, surveyPage - 1))}
              disabled={surveyPage === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Showing {surveyPage * TASKS_PER_PAGE + 1}-{Math.min((surveyPage + 1) * TASKS_PER_PAGE, surveyTasks.length)} of {surveyTasks.length} survey tasks
            </div>

            <button
              onClick={() => setSurveyPage(Math.min(getTotalPages(surveyTasks) - 1, surveyPage + 1))}
              disabled={surveyPage >= getTotalPages(surveyTasks) - 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Upload */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center mb-8">
            <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Custom Task Upload</h3>
              <p className="text-gray-600">Upload your own CELPIP task • Any format • Professional evaluation</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-200 p-12 text-center">
            <div className="p-6 bg-white rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Upload className="w-12 h-12 text-purple-600" />
            </div>
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your Own Task</h4>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
              Found a CELPIP task in a book, online, or elsewhere? Upload it in any format and get professional AI feedback on your writing.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h5 className="font-medium text-gray-900">Copy & Paste</h5>
                <p className="text-sm text-gray-500">Text format tasks</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <h5 className="font-medium text-gray-900">Upload Image</h5>
                <p className="text-sm text-gray-500">Screenshots & photos</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <h5 className="font-medium text-gray-900">AI Analysis</h5>
                <p className="text-sm text-gray-500">Professional feedback</p>
              </div>
            </div>
            <button
              onClick={() => setShowCustomUpload(true)}
              className="px-12 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
            >
              🚀 Upload Your Task
            </button>
          </div>
      </div>
      )}
    </div>
  );
};

export default TaskSelection;