import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'CELPIP Writing Coach',
      subtitle: 'Master your CELPIP writing skills with AI-powered feedback',
      selectTask: 'Select Writing Task',
      task1: 'Task 1: Writing an Email',
      task2: 'Task 2: Responding to Survey Questions',
      task1Description: 'Write an email responding to a given situation',
      task2Description: 'Express and support your opinion on a given topic',
      startWriting: 'Start Writing',
      writeEssay: 'Write Your Essay',
      submitForFeedback: 'Submit for AI Feedback',
      wordCount: 'Word Count',
      criteria: {
        content: 'Content & Coherence',
        vocabulary: 'Vocabulary',
        readability: 'Readability', 
        taskFulfillment: 'Task Fulfillment'
      },
      feedback: 'AI Feedback',
      overallScore: 'Overall Score',
      recommendations: 'Recommendations',
      loading: 'Analyzing your writing...',
      backToTasks: 'Back to Tasks'
    }
  },
  ru: {
    translation: {
      title: 'CELPIP Тренер по Письму',
      subtitle: 'Овладейте навыками письма CELPIP с обратной связью на основе ИИ',
      selectTask: 'Выберите задание по письму',
      task1: 'Задание 1: Написание электронного письма',
      task2: 'Задание 2: Ответы на вопросы опроса',
      task1Description: 'Напишите электронное письмо в ответ на данную ситуацию',
      task2Description: 'Выразите и подкрепите свое мнение по данной теме',
      startWriting: 'Начать писать',
      writeEssay: 'Напишите ваше эссе',
      submitForFeedback: 'Отправить на анализ ИИ',
      wordCount: 'Количество слов',
      criteria: {
        content: 'Содержание и связность',
        vocabulary: 'Словарный запас',
        readability: 'Читаемость',
        taskFulfillment: 'Выполнение задания'
      },
      feedback: 'Обратная связь ИИ',
      overallScore: 'Общий балл',
      recommendations: 'Рекомендации',
      loading: 'Анализируем ваш текст...',
      backToTasks: 'Назад к заданиям'
    }
  },
  uk: {
    translation: {
      title: 'CELPIP Тренер з Письма',
      subtitle: 'Оволодійте навичками письма CELPIP з зворотним зв\'язком на основі ШІ',
      selectTask: 'Оберіть завдання з письма',
      task1: 'Завдання 1: Написання електронного листа',
      task2: 'Завдання 2: Відповіді на питання опитування',
      task1Description: 'Напишіть електронний лист у відповідь на дану ситуацію',
      task2Description: 'Висловіть та підкріпіть свою думку з даної теми',
      startWriting: 'Почати писати',
      writeEssay: 'Напишіть ваше есе',
      submitForFeedback: 'Відправити на аналіз ШІ',
      wordCount: 'Кількість слів',
      criteria: {
        content: 'Зміст та зв\'язність',
        vocabulary: 'Словниковий запас',
        readability: 'Читабельність',
        taskFulfillment: 'Виконання завдання'
      },
      feedback: 'Зворотний зв\'язок ШІ',
      overallScore: 'Загальний бал',
      recommendations: 'Рекомендації',
      loading: 'Аналізуємо ваш текст...',
      backToTasks: 'Назад до завдань'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
