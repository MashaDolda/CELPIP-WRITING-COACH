import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, FileText, Clock, Target } from 'lucide-react';
import { TaskType, TASK_PROMPTS } from '../types';

interface TaskSelectionProps {
  onTaskSelect: (task: TaskType) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onTaskSelect }) => {
  const { t, i18n } = useTranslation();

  const tasks: TaskType[] = [
    {
      id: 'task1',
      title: t('task1'),
      description: t('task1Description'),
      prompt: TASK_PROMPTS.task1[i18n.language as keyof typeof TASK_PROMPTS.task1] || TASK_PROMPTS.task1.en,
      timeLimit: 27,
      wordLimit: { min: 150, max: 200 }
    },
    {
      id: 'task2',
      title: t('task2'),
      description: t('task2Description'),
      prompt: TASK_PROMPTS.task2[i18n.language as keyof typeof TASK_PROMPTS.task2] || TASK_PROMPTS.task2.en,
      timeLimit: 26,
      wordLimit: { min: 250, max: 300 }
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('selectTask')}</h2>
        <p className="text-lg text-gray-600">
          Choose between Task 1 (Email Writing) or Task 2 (Opinion Essay)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${index === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                {index === 0 ? <Mail className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-3">{task.title}</h3>
            </div>

            <p className="text-gray-600 mb-4">{task.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{task.timeLimit} minutes</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Target className="w-4 h-4 mr-2" />
                <span>{task.wordLimit.min}-{task.wordLimit.max} words</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Task Prompt:</h4>
              <p className="text-sm text-gray-700 whitespace-pre-line">{task.prompt}</p>
            </div>

            <button
              onClick={() => onTaskSelect(task)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                index === 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {t('startWriting')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSelection;
