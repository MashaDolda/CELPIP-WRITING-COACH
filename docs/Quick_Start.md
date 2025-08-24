# CELPIP Writing Coach - Quick Start Guide

## Overview
CELPIP Writing Coach is a multilingual web application that helps learners prepare for the CELPIP exam by providing AI-powered feedback on their writing. The platform evaluates essays on the four official CELPIP criteria and supports English, Russian, and Ukrainian languages.

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Step-by-Step Setup Instructions

### 1. Navigate to Project Directory
```bash
cd "/Users/mashadolda/CELPIP APP 2"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

### 4. Access the Application
- Open your web browser
- Navigate to: `http://localhost:3000`
- The application should load automatically

## Application Features

### 🌐 Language Support
- Switch between English, Russian, and Ukrainian using the language selector in the header
- All UI elements and task prompts are fully translated

### 📝 Writing Tasks
- **Task 1**: Email writing (150-200 words, 27 minutes)
- **Task 2**: Opinion essay (250-300 words, 26 minutes)

### ⏱️ Timer & Word Count
- Built-in timer for each task
- Real-time word count tracking
- Color-coded feedback for word limits

### 🤖 AI Feedback System
- Evaluates essays on 4 CELPIP criteria:
  - Content & Coherence
  - Vocabulary
  - Readability
  - Task Fulfillment
- Provides overall score (0-12 scale)
- Offers specific recommendations for improvement
- Shows inline corrections with explanations

## How to Use the Application

### Step 1: Select a Task
- Choose between Task 1 (Email Writing) or Task 2 (Opinion Essay)
- Review the task description and requirements
- Click "Start Writing" to begin

### Step 2: Write Your Essay
- Read the task prompt carefully
- Write your response in the text editor
- Monitor the timer and word count
- Ensure you stay within the word limits

### Step 3: Submit for Feedback
- Click "Submit for AI Feedback" when ready
- Wait for the AI analysis (takes a few seconds)
- Review your scores and feedback

### Step 4: Review Feedback
- Check your scores for each CELPIP criterion
- Read the AI-generated recommendations
- Review suggested corrections and explanations
- Use "Back to Tasks" to try another essay

## Technical Details

### Built With
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **i18next** for internationalization
- **Lucide React** for icons

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with language selector
│   ├── TaskSelection.tsx   # Task selection interface
│   ├── EssayEditor.tsx     # Essay writing interface
│   └── FeedbackDisplay.tsx # Feedback and results display
├── i18n/               # Internationalization
│   └── i18n.ts         # Language configuration
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## Available Scripts

### Development
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   - The app will automatically try port 3001
   - Or manually specify: `PORT=3001 npm start`

2. **Dependencies not installing**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **App not loading**
   - Check console for errors (F12 in browser)
   - Ensure all dependencies are installed
   - Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Performance Notes
- The AI feedback simulation includes a 3-second delay to mimic real API processing
- In production, this would be replaced with actual OpenAI API calls
- The app is optimized for modern browsers and responsive design

## Next Steps for Development

### Immediate Enhancements
1. **Real AI Integration**: Replace mock feedback with OpenAI API
2. **User Authentication**: Add login/registration system
3. **Progress Tracking**: Save user essays and track improvement
4. **Advanced Feedback**: Add more detailed grammar and style analysis

### Future Features
1. **Gamification**: Add points, badges, and achievements
2. **Subscription System**: Implement payment integration
3. **Speaking Module**: Add CELPIP speaking practice
4. **Mobile App**: React Native version
5. **Tutor Dashboard**: Interface for human tutors

## Support
For technical issues or questions about the application, refer to the codebase documentation or contact the development team.

---

**Happy Writing! 🚀**
