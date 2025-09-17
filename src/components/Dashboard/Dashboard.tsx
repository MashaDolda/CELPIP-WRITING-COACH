import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getUserEssays } from '../../services/essayService';
import { 
  User, 
  PenTool, 
  TrendingUp, 
  Calendar,
  Award,
  Target,
  BarChart3,
  BookOpen,
  LogOut,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DemoNotice from '../DemoNotice';

interface EssayHistory {
  id: string;
  taskTitle: string;
  overallCLB: number;
  createdAt: Date;
  wordCount: number;
}

const Dashboard: React.FC = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [essayHistory, setEssayHistory] = useState<EssayHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<any[]>([]);

  useEffect(() => {
    const fetchEssayHistory = async () => {
      if (!currentUser) return;

      try {
        const essays = await getUserEssays(currentUser.uid);
        const essayHistory: EssayHistory[] = essays.slice(0, 10).map((essay, index) => ({
          id: `essay-${index}`,
          taskTitle: essay.taskTitle,
          overallCLB: essay.overallCLB,
          createdAt: new Date(essay.createdAt),
          wordCount: essay.wordCount
        }));

        setEssayHistory(essayHistory);

        // Create progress data for chart
        const chartData = essayHistory.reverse().map((essay, index) => ({
          essay: index + 1,
          clb: essay.overallCLB,
          date: essay.createdAt.toLocaleDateString()
        }));
        setProgressData(chartData);

      } catch (error) {
        console.error('Error fetching essay history:', error);
      }
      setLoading(false);
    };

    fetchEssayHistory();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg mr-3"></div>
              <h1 className="text-xl font-bold text-gray-900">CELPIP Writing Coach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {userProfile?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DemoNotice />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <PenTool className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userProfile?.totalEssays || 0}</p>
                <p className="text-gray-600">Essays Written</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {userProfile?.averageCLB ? userProfile.averageCLB.toFixed(1) : '0.0'}
                </p>
                <p className="text-gray-600">Average CLB</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userProfile?.targetCLB || 9}</p>
                <p className="text-gray-600">Target CLB</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{userProfile?.currentStreak || 0}</p>
                <p className="text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">CLB Progress</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            {progressData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="essay" />
                    <YAxis domain={[0, 12]} />
                    <Tooltip 
                      labelFormatter={(value) => `Essay ${value}`}
                      formatter={(value: any) => [value, 'CLB Level']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clb" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No essays yet. Start writing to see your progress!</p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Essays */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Essays</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {essayHistory.length > 0 ? (
                essayHistory.map((essay) => (
                  <div key={essay.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{essay.taskTitle}</p>
                      <p className="text-sm text-gray-500">
                        {essay.createdAt.toLocaleDateString()} • {essay.wordCount} words
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">CLB {essay.overallCLB}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <PenTool className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500">No essays written yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/practice"
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Write New Essay
            </Link>
            <Link
              to="/samples"
              className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View Sample Essays
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
