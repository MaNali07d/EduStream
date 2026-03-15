import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  Brain,
  Route,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Bell,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout, sidebarOpen, toggleSidebar } = useStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: GraduationCap, label: 'Quizzes' },
    { to: '/progress', icon: Brain, label: 'My Progress' },
    { to: '/study-assistant', icon: Sparkles, label: 'Study Assistant' },
    { to: '/learning-path', icon: Route, label: 'Learning Path' },
  ];

  const teacherLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'My Courses' },
    { to: '/assignments', icon: FileText, label: 'Assignments' },
    { to: '/quizzes', icon: GraduationCap, label: 'Quizzes' },
    { to: '/study-assistant', icon: Sparkles, label: 'Study Assistant' },
    { to: '/quiz-generator', icon: Brain, label: 'Quiz Generator' },
  ];

  const adminLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin', icon: Users, label: 'Admin Panel' },
    { to: '/courses', icon: BookOpen, label: 'All Courses' },
    { to: '/study-assistant', icon: Sparkles, label: 'Study Assistant' },
  ];

  const links = currentUser?.role === 'admin' 
    ? adminLinks 
    : currentUser?.role === 'teacher' 
      ? teacherLinks 
      : studentLinks;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1A1A24] border-r border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">EduStream</h1>
          <p className="text-xs text-gray-400">AI Learning OS</p>
        </div>
        <button 
          onClick={() => setMobileOpen(false)}
          className="ml-auto lg:hidden text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-400 border-l-2 border-indigo-500'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              )
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium">{link.label}</span>
            <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100" />
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{currentUser?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-gray-400 hover:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={clsx(
        'lg:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {sidebarContent}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:w-72 flex-shrink-0">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
