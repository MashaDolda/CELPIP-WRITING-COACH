# CELPIP Writing Coach

A multilingual web application that helps learners prepare for the CELPIP exam by providing AI-powered feedback on their writing.

## Features

- 🌐 **Multilingual Support**: English, Russian, and Ukrainian
- 📝 **Two Writing Tasks**: Email writing and opinion essays
- ⏱️ **Timed Practice**: Real exam conditions with countdown timers
- 🤖 **AI Feedback**: Evaluation on official CELPIP criteria
- 📊 **Detailed Scoring**: Individual scores for Content, Vocabulary, Readability, and Task Fulfillment
- 💡 **Smart Recommendations**: Personalized improvement suggestions
- ✏️ **Inline Corrections**: Grammar and style improvements with explanations

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

For detailed setup instructions, see [Quick_Start.md](docs/Quick_Start.md)

## CELPIP Evaluation Criteria

The application evaluates essays based on the four official CELPIP writing criteria:

1. **Content & Coherence** - Organization, logical flow, and completeness
2. **Vocabulary** - Word choice, variety, and appropriateness
3. **Readability** - Sentence structure, grammar, and clarity
4. **Task Fulfillment** - Meeting all task requirements and addressing the prompt

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: i18next
- **Icons**: Lucide React
- **AI Integration**: OpenAI API (ready for integration)

## Project Structure

```
src/
├── components/          # React components
├── i18n/               # Internationalization setup
├── types.ts            # TypeScript definitions
├── App.tsx             # Main application
└── index.tsx           # Entry point
```

## Contributing

This is a prototype for educational purposes. Future enhancements could include:

- Real OpenAI API integration
- User authentication and progress tracking
- Payment integration for premium features
- Speaking practice modules
- Mobile application

## License

This project is for educational and demonstration purposes.
