import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Video, Calendar, Award, Settings, BarChart3, 
  Upload, Play, FileText, MessageCircle, Bell, Search, Menu, X,
  Home, GraduationCap, Clock, Star, CheckCircle, Eye, Edit,
  Download, Share, Mail, Phone, MapPin, Trophy, Target, Lock,
  UserPlus, Key, LogOut, Shield, Pause, SkipBack, SkipForward,
  Volume2, Maximize, Minimize, Send, Filter, ChevronDown, ChevronUp,
  Bookmark, Heart, ThumbsUp, DownloadCloud, AlertCircle, BarChart2,
  PieChart, TrendingUp, MessageSquare, CheckSquare, type
} from 'lucide-react';

// Import Recharts for data visualization
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const LMS = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New assignment available', message: 'React Fundamentals quiz is now available', time: '2 hours ago', read: false },
    { id: 2, title: 'Live session starting soon', message: 'Advanced JavaScript patterns in 15 minutes', time: '30 minutes ago', read: false },
    { id: 3, title: 'Course updated', message: 'New content added to Python course', time: '1 day ago', read: true }
  ]);

  // Predefined admin credentials and user database
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'System Administrator',
      email: 'admin@eduplatform.com',
      createdAt: '2024-01-01',
      lastLogin: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 2,
      username: 'john_student',
      password: 'student123',
      role: 'student',
      name: 'John Student',
      email: 'john@student.com',
      createdAt: '2024-02-15',
      lastLogin: null,
      status: 'active',
      courses: ['React Development', 'Python Basics'],
      progress: 75
    },
    {
      id: 3,
      username: 'jane_instructor',
      password: 'teacher123',
      role: 'instructor',
      name: 'Jane Teacher',
      email: 'jane@instructor.com',
      createdAt: '2024-01-20',
      lastLogin: '2024-01-25T10:30:00Z',
      status: 'active',
      courses: ['Advanced JavaScript', 'Web Development']
    }
  ]);

  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'student'
  });

  // Sample data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React Development Masterclass",
      instructor: "Jane Teacher",
      students: 150,
      duration: "12 weeks",
      progress: 75,
      price: 299,
      rating: 4.8,
      status: "active",
      description: "Complete React.js course from beginner to advanced",
      modules: 8,
      videos: 45,
      assignments: 12,
      modulesList: [
        {
          id: 1,
          title: "Introduction to React",
          videos: [
            { id: 1, title: "What is React?", duration: "10:30", completed: true },
            { id: 2, title: "Setting up your environment", duration: "15:45", completed: true },
            { id: 3, title: "Your first React component", duration: "20:15", completed: false }
          ],
          assignments: [
            { id: 1, title: "Build a simple component", dueDate: "2024-03-15", submitted: true, grade: "A" },
            { id: 2, title: "State management exercise", dueDate: "2024-03-22", submitted: false }
          ],
          quizzes: [
            { id: 1, title: "React Basics Quiz", questions: 10, completed: true, score: 85 }
          ]
        },
        {
          id: 2,
          title: "React Hooks",
          videos: [
            { id: 4, title: "Understanding useState", duration: "18:20", completed: false },
            { id: 5, title: "Using useEffect", duration: "22:10", completed: false }
          ],
          assignments: [],
          quizzes: []
        }
      ]
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Jane Teacher",
      students: 89,
      duration: "10 weeks",
      progress: 60,
      price: 199,
      rating: 4.6,
      status: "active",
      description: "Learn Python programming for data analysis",
      modules: 6,
      videos: 32,
      assignments: 8,
      modulesList: [
        {
          id: 1,
          title: "Python Basics",
          videos: [
            { id: 1, title: "Python syntax and variables", duration: "12:30", completed: true },
            { id: 2, title: "Data structures", duration: "18:15", completed: true }
          ],
          assignments: [
            { id: 1, title: "Data manipulation exercise", dueDate: "2024-03-10", submitted: true, grade: "B+" }
          ],
          quizzes: [
            { id: 1, title: "Python Fundamentals", questions: 8, completed: true, score: 92 }
          ]
        }
      ]
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalStudents: 1247,
    activeCourses: 23,
    completedCourses: 156,
    totalRevenue: 89450,
    monthlyGrowth: 15.3,
    avgRating: 4.7,
    monthlyData: [
      { month: 'Jan', students: 500, revenue: 15000 },
      { month: 'Feb', students: 750, revenue: 22500 },
      { month: 'Mar', students: 900, revenue: 27000 },
      { month: 'Apr', students: 1247, revenue: 37410 },
      { month: 'May', students: 1500, revenue: 45000 },
      { month: 'Jun', students: 1800, revenue: 54000 }
    ],
    courseDistribution: [
      { name: 'Web Development', value: 35 },
      { name: 'Data Science', value: 25 },
      { name: 'Mobile Development', value: 20 },
      { name: 'Cloud Computing', value: 15 },
      { name: 'UI/UX Design', value: 5 }
    ]
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Jane Teacher',
      senderId: 3,
      content: 'Hi there! Do you have any questions about the React assignment?',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: true
    },
    {
      id: 2,
      sender: 'John Student',
      senderId: 2,
      content: "I'm having trouble with the state management exercise. Could we schedule a quick call?",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      read: true
    },
    {
      id: 3,
      sender: 'Jane Teacher',
      senderId: 3,
      content: 'Sure! How about tomorrow at 3 PM?',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Course Player Component
  const CoursePlayer = ({ course, moduleId, videoId }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(300); // 5 minutes in seconds
    const [volume, setVolume] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    
    const currentModule = course.modulesList.find(m => m.id === moduleId);
    const currentVideo = currentModule?.videos.find(v => v.id === videoId);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleProgressChange = (e) => {
      const newTime = parseInt(e.target.value);
      setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
      setVolume(parseFloat(e.target.value));
    };

    if (!currentModule || !currentVideo) {
      return <div>Video not found</div>;
    }

    return (
      <div className={`bg-black rounded-lg overflow-hidden ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {/* Video placeholder */}
        <div className="w-full h-64 bg-gray-800 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
          </div>
          
          {/* Video progress bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-700 h-2">
            <div 
              className="bg-blue-600 h-2"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Video controls */}
        <div className="p-4 bg-gray-900 text-white">
          <h3 className="font-medium text-lg mb-1">{currentVideo.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{currentModule.title} • {currentVideo.duration}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="hover:text-blue-400 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-blue-400 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
              <button className="hover:text-blue-400 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-blue-500"
                />
              </div>
              
              <div className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <button 
              onClick={() => setFullscreen(!fullscreen)}
              className="hover:text-blue-400 transition-colors"
            >
              {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Progress bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full mt-2 accent-blue-500"
          />
        </div>

        {/* Video sidebar with modules and videos */}
        <div className="bg-gray-800 p-4">
          <h4 className="font-medium text-white mb-3">Course Content</h4>
          <div className="space-y-2">
            {course.modulesList.map(module => (
              <div key={module.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <button className="w-full p-3 text-left text-white font-medium flex items-center justify-between">
                  <span>{module.title}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="bg-gray-600 p-2">
                  {module.videos.map(video => (
                    <div 
                      key={video.id} 
                      className={`p-2 text-sm rounded-md mb-1 cursor-pointer transition-colors ${video.id === videoId ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-500'}`}
                    >
                      <div className="flex items-center">
                        <Play className="w-3 h-3 mr-2" />
                        <span>{video.title}</span>
                        <span className="ml-auto text-xs">{video.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Login Component
  const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
      e.preventDefault();
      setLoginError('');

      const user = users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password &&
        u.status === 'active'
      );

      if (user) {
        // Update last login
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
        );
        setUsers(updatedUsers);
        
        setCurrentUser(user);
        setIsLoggedIn(true);
        setCurrentView(user.role === 'student' ? 'my-courses' : 'dashboard');
      } else {
        setLoginError('Invalid credentials or account deactivated');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">EduPlatform</h1>
            <p className="text-blue-100 mt-2">Learning Management System</p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Welcome Back</h2>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username or email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Demo Credentials:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin:</span>
                  <span className="font-mono">admin / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GrowSports Admin:</span>
                  <span className="font-mono">growsports.in@gmail.com / Rjbiber@9800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-mono">jane_instructor / teacher123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Student:</span>
                  <span className="font-mono">john_student / student123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // User Management Component (Admin Only)
  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button 
          onClick={() => setShowUserManagement(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* User Creation Modal */}
      {showUserManagement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New User</h3>
              <button 
                onClick={() => setShowUserManagement(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const newUser = {
                id: users.length + 1,
                ...newUserForm,
                createdAt: new Date().toISOString(),
                lastLogin: null,
                status: 'active'
              };
              setUsers([...users, newUser]);
              setNewUserForm({ username: '', password: '', name: '', email: '', role: 'student' });
              setShowUserManagement(false);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  value={newUserForm.username}
                  onChange={(e) => setNewUserForm({...newUserForm, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserManagement(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'instructor' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          const updatedUsers = users.map(u => 
                            u.id === user.id 
                              ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
                              : u
                          );
                          setUsers(updatedUsers);
                        }}
                        className={`text-sm ${user.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Student Dashboard
  const StudentDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser?.name}!</h1>
          <p className="text-gray-600 mt-1">Continue your learning journey</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Browse Courses
          </button>
        </div>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Enrolled Courses</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificates Earned</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
            <Award className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold text-gray-900">75%</p>
            </div>
            <Target className="w-12 h-12 text-green-600" />
          </div>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h3>
        <div className="space-y-4">
          {courses.flatMap(course => 
            course.modulesList.flatMap(module => 
              module.assignments.filter(a => !a.submitted)
            )
          ).slice(0, 3).map((assignment, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                <p className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Start Assignment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.slice(0, 2).map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm opacity-90">by {course.instructor}</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <button 
                onClick={() => {
                  setCurrentView('course-detail');
                  // In a real app, we would set the current course here
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Navigation based on user role
  const getNavItems = () => {
    if (!currentUser) return [];

    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'courses', label: 'Courses', icon: BookOpen },
    ];

    if (currentUser.role === 'admin') {
      return [
        ...commonItems,
        { id: 'user-management', label: 'User Management', icon: Users },
        { id: 'students', label: 'Student Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'live', label: 'Live Sessions', icon: Calendar },
        { id: 'certificates', label: 'Certificates', icon: Award },
        { id: 'settings', label: 'Settings', icon: Settings }
      ];
    }

    if (currentUser.role === 'instructor') {
      return [
        ...commonItems,
        { id: 'my-students', label: 'My Students', icon: Users },
        { id: 'live', label: 'Live Sessions', icon: Calendar },
        { id: 'content', label: 'Content Creation', icon: Upload },
        { id: 'certificates', label: 'Certificates', icon: Award }
      ];
    }

    // Student view
    return [
      { id: 'my-courses', label: 'My Courses', icon: BookOpen },
      { id: 'assignments', label: 'Assignments', icon: FileText },
      { id: 'certificates', label: 'My Certificates', icon: Award },
      { id: 'progress', label: 'Progress', icon: Target },
      { id: 'messages', label: 'Messages', icon: MessageCircle }
    ];
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('dashboard');
  };

  // Dashboard Component (Admin/Instructor)
  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Content
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Live Session
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalStudents.toLocaleString()}</p>
              <p className="text-green-600 text-sm">+{analytics.monthlyGrowth}% this month</p>
            </div>
            <Users className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.activeCourses}</p>
              <p className="text-blue-600 text-sm">12 new this month</p>
            </div>
            <BookOpen className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Certificates Issued</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.completedCourses}</p>
              <p className="text-green-600 text-sm">+23% completion rate</p>
            </div>
            <Award className="w-12 h-12 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
              <p className="text-green-600 text-sm">+18% this quarter</p>
            </div>
            <Trophy className="w-12 h-12 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#4f46e5" fill="#c7d2fe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={analytics.courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Course Activity</h3>
          <div className="space-y-4">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">{course.students} students enrolled</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Progress</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Users</h3>
          <div className="space-y-4">
            {users.filter(u => u.role !== 'admin').slice(0, 3).map((user, index) => (
              <div key={user.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Course Management Component
  const CourseManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
        {currentUser?.role !== 'student' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Create New Course
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">{course.title}</h3>
                <p className="text-sm opacity-90">by {course.instructor}</p>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{course.students}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{course.videos}</p>
                  <p className="text-xs text-gray-600">Videos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{course.assignments}</p>
                  <p className="text-xs text-gray-600">Assignments</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  {currentUser?.role !== 'student' && (
                    <button className="p-2 text-gray-600 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Student Management Component
  const StudentManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.filter(u => u.role === 'student').map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{student.courses?.length || 0}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${student.progress || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.progress || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.lastLogin ? new Date(student.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Message</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Analytics Component
  const Analytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          <p className="text-green-600 text-sm">+2 new this week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Students</h3>
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'student' && u.status === 'active').length}</p>
          <p className="text-green-600 text-sm">100% active rate</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Course Completion</h3>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">73.8%</p>
          <p className="text-green-600 text-sm">+2.1% from last week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">4.7/5</p>
          <p className="text-green-600 text-sm">+0.2 from last week</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#4f46e5" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Live Sessions Component
  const LiveSessions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Live Sessions</h1>
        {currentUser?.role !== 'student' && (
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
            <Video className="w-4 h-4" />
            Start Live Session
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Advanced React Patterns</h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Live</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Interactive session on React hooks and context patterns</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />Today, 3:00 PM</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" />45 registered</span>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Join Session
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Python Data Analysis Workshop</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Scheduled</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Hands-on workshop with Pandas and NumPy</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />Tomorrow, 2:00 PM</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" />32 registered</span>
                  </div>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-600">Sessions This Month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">89%</p>
                <p className="text-sm text-gray-600">Average Attendance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">4.8</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recording Library</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Play className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">React Hooks Deep Dive</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Play className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Database Design Principles</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Certificate Management Component
  const CertificateManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {currentUser?.role === 'student' ? 'My Certificates' : 'Certificate Management'}
        </h1>
        {currentUser?.role !== 'student' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Certificate Template
          </button>
        )}
      </div>

      {currentUser?.role === 'student' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-48 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg mb-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-16 h-16 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold">React Development</h4>
                <p className="text-sm opacity-90">Completed: Jan 2024</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Certificate of Completion</h4>
                <p className="text-sm text-gray-600">React Development Masterclass</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-16 h-16 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-bold">Python Basics</h4>
                <p className="text-sm opacity-90">Completed: Mar 2024</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Certificate of Completion</h4>
                <p className="text-sm text-gray-600">Python Programming Fundamentals</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Templates</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-3 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h4 className="font-medium text-gray-900">Course Completion Certificate</h4>
                <p className="text-sm text-gray-600 mt-1">Standard template for course completion</p>
                <div className="mt-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">Preview</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Certificates Issued</h3>
            <div className="space-y-3">
              {users.filter(u => u.role === 'student').slice(0, 3).map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">React Development Masterclass</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Issued</p>
                    <p className="text-sm font-medium text-gray-900">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Messaging Component
  const Messaging = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Messages</h1>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations list */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {messages.filter((msg, index, self) => 
              index === self.findIndex(m => m.senderId === msg.senderId)
            ).map(conversation => (
              <div key={conversation.senderId} className="p-4 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {conversation.sender.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{conversation.sender}</p>
                    <p className="text-sm text-gray-500 truncate">{conversation.content}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(conversation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {!conversation.read && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-1"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="border-b border-gray-200 p-4">
            <h2 className="font-medium text-gray-900">Jane Teacher</h2>
            <p className="text-sm text-gray-500">Instructor</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${message.senderId === currentUser.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Course Detail Component
  const CourseDetail = () => {
    const [selectedModule, setSelectedModule] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(1);
    
    // In a real app, we would get the course from state or params
    const course = courses[0];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600 mt-1">by {course.instructor}</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resources
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CoursePlayer course={course} moduleId={selectedModule} videoId={selectedVideo} />
          </div>
          
          <div className="space-y-6">
            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Overall</span>
                  <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{course.videos}</p>
                  <p className="text-xs text-gray-600">Videos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{course.assignments}</p>
                  <p className="text-xs text-gray-600">Assignments</p>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructor</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">JT</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{course.instructor}</p>
                  <p className="text-sm text-gray-600">Senior Web Developer</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Experienced developer with over 10 years of experience in web development and teaching.
              </p>
              <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                Message Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render function
  const renderView = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'my-courses':
        return <StudentDashboard />;
      case 'courses':
        return <CourseManagement />;
      case 'user-management':
        return <UserManagement />;
      case 'students':
        return <StudentManagement />;
      case 'certificates':
        return <CertificateManagement />;
      case 'analytics':
        return <Analytics />;
      case 'live':
        return <LiveSessions />;
      case 'messages':
        return <Messaging />;
      case 'course-detail':
        return <CourseDetail />;
      default:
        return currentUser.role === 'student' ? <StudentDashboard /> : <Dashboard />;
    }
  };

  // Don't show login if already logged in
  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`${isMobile ? 'fixed inset-0 z-50' : 'relative'} w-64 bg-white border-r border-gray-200 flex flex-col z-30`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">EduPlatform</h1>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {getNavItems().map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {currentUser?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{currentUser?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {currentView.replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>

              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>

              {/* Messages */}
              <button 
                onClick={() => setCurrentView('messages')}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <MessageCircle className="w-5 h-5" />
                {messages.filter(m => !m.read && m.senderId !== currentUser.id).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </button>

              {/* User profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser?.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {!isMobile && (
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{currentUser?.name}</p>
                    <p className="text-gray-600 capitalize">{currentUser?.role}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default LMS;