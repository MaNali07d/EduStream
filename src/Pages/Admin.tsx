import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  Search,
  Trash2,
  MoreVertical,
} from 'lucide-react';
import clsx from 'clsx';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, users, courses, assignments, quizzes, deleteCourse } = useStore();
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen">
        <Header title="Admin Panel" />
        <div className="p-6 flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">Access denied. Admin only.</p>
          </div>
        </div>
      </div>
    );
  }

  const students = users.filter(u => u.role === 'student');
  const teachers = users.filter(u => u.role === 'teacher');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header title="Admin Panel" />
      
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Users}
            label="Total Users"
            value={users.length}
            subtext={`${students.length} students, ${teachers.length} teachers`}
          />
          <StatCard
            icon={BookOpen}
            label="Total Courses"
            value={courses.length}
            subtext="Active courses"
          />
          <StatCard
            icon={FileText}
            label="Assignments"
            value={assignments.length}
            subtext="Created assignments"
          />
          <StatCard
            icon={GraduationCap}
            label="Quizzes"
            value={quizzes.length}
            subtext="Available quizzes"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={clsx(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'users'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-[#1A1A24] text-gray-400 border border-gray-700 hover:border-gray-600'
            )}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={clsx(
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === 'courses'
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-[#1A1A24] text-gray-400 border border-gray-700 hover:border-gray-600'
            )}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Courses
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-3 bg-[#1A1A24] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Content */}
        {activeTab === 'users' ? (
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">User</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Courses</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        'px-2 py-1 text-xs rounded-full',
                        user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                        user.role === 'teacher' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.enrolledCourses.length}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No users found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-[#1A1A24] border border-gray-700 rounded-xl p-5 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white line-clamp-1">{course.title}</h3>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{course.instructorName}</span>
                  <span>{course.enrolledStudents.length} students</span>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No courses found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: number;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, subtext }) => (
  <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtext}</p>
      </div>
      <div className="p-2 rounded-lg bg-indigo-500/20">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
    </div>
  </div>
);

export default Admin;