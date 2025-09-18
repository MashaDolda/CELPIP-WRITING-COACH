import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Home, User, PenTool } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
            <span className="text-xl font-bold text-gray-900">CELPIP Writing Coach</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            
            <button
              onClick={() => navigate('/practice')}
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <PenTool className="w-4 h-4 mr-2" />
              Practice
            </button>

            {currentUser ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 text-sm">
                    Hi, {currentUser.displayName || 'User'}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => navigate(currentUser ? '/dashboard' : '/signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              {currentUser ? 'Dashboard' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;