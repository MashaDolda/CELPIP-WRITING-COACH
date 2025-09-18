import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PenTool, 
  Target, 
  TrendingUp, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "CLB-Based Evaluation",
      description: "Get precise CLB level assessments based on official CELPIP standards with detailed criterion analysis."
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: "18+ Authentic Tasks",
      description: "Practice with real CELPIP email and survey tasks, plus upload your own custom tasks."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your CLB level improvements with detailed analytics and performance insights."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Detailed Feedback",
      description: "Receive comprehensive feedback with writing examples, corrections, and improvement strategies."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      clb: "CLB 9 → CLB 11",
      text: "The detailed analysis helped me understand exactly what I needed to improve. Increased my CLB by 2 levels!"
    },
    {
      name: "Ahmed K.",
      clb: "CLB 6 → CLB 8",
      text: "Finally found a platform that gives real CELPIP-standard feedback. The progress tracking keeps me motivated."
    },
    {
      name: "Maria L.",
      clb: "CLB 7 → CLB 10",
      text: "The corrections with criterion explanations were game-changers. Now I know exactly how to reach CLB 10+."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
              <span className="text-xl font-bold text-gray-900">CELPIP Writing Coach</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Master CELPIP Writing with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> AI-Powered </span>
              Coaching
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get professional CLB-level evaluations, detailed feedback with writing examples, and track your progress 
              toward your target CELPIP score. Built by CELPIP experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="space-x-4 flex">
                <Link
                  to="/practice"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all flex items-center justify-center"
                >
                  Try Practice Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/signup"
                  className="border-2 border-blue-600 text-blue-600 bg-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  Sign Up Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <Link
                to="/login"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">18+</div>
                <div className="text-gray-600">Authentic CELPIP Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">CLB 0-12</div>
                <div className="text-gray-600">Precise Level Assessment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4 Criteria</div>
                <div className="text-gray-600">Detailed Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade CELPIP writing evaluation with personalized feedback and progress tracking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to improve your CELPIP writing score
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Task</h3>
              <p className="text-gray-600">Select from 18+ authentic CELPIP tasks or upload your own custom task</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Write Your Essay</h3>
              <p className="text-gray-600">Use our advanced writing interface with timer controls and word tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Detailed Feedback</h3>
              <p className="text-gray-600">Receive CLB-level analysis with corrections and personalized improvement plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* Platform Features Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our CELPIP Writing Coach?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology combined with authentic CELPIP methodology
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">50+ Practice Tasks</h4>
                  <p className="text-gray-600 text-sm">Comprehensive Task Library</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Access a vast collection of authentic CELPIP tasks organized by difficulty level, category, and CLB target level for focused practice.
              </p>
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Beginner to Advanced
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Personalized Feedback</h4>
                  <p className="text-gray-600 text-sm">AI-Powered Analysis</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Receive detailed CLB-level analysis with specific examples from your writing, targeted corrections, and clear improvement strategies.
              </p>
              <div className="flex items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  CLB-Aligned Scoring
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Progress Tracking</h4>
                  <p className="text-gray-600 text-sm">Goal-Oriented Learning</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Monitor your improvement with detailed analytics, essay history, and personalized study plans based on your specific CLB goals.
              </p>
              <div className="flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Smart Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Achieve Your Target CLB Level?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who've improved their CELPIP writing scores with our AI-powered coaching
          </p>
          <div className="space-x-4">
            <Link
              to="/practice"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Try Free Practice
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center"
            >
              Sign Up for More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
              <span className="text-xl font-bold">CELPIP Writing Coach</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional CELPIP writing evaluation powered by AI
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 CELPIP Writing Coach. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
