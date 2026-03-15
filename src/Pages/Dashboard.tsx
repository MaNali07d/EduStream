import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  BookOpen,
  FileText,
  GraduationCap,
  Clock,
  TrendingUp,
  Users,
  ChevronRight,
  Target,
  Award,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import clsx from 'clsx';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    getUserCourses, 
    getStudentSubmissions, 
    getStudentQuizAttempts,
    getUserActivities,
    assignments,
    courses,
    quizzes,
    users,
  } = useStore();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const enrolledCourses = getUserCourses(currentUser.id);
  const submissions = getStudentSubmissions(currentUser.id);
  const quizAttempts = getStudentQuizAttempts(currentUser.id);
  const activities = getUserActivities(currentUser.id);

  // Calculate stats
  const pendingAssignments = assignments.filter(a => {
    const submission = submissions.find(s => s.assignmentId === a.id);
    return !submission?.grade;
  }).length;

  const completedAssignments = submissions.filter(s => s.grade !== undefined).length;

  const avgQuizScore = quizAttempts.length > 0
    ? Math.round((quizAttempts.reduce((acc, a) => acc + (a.score / a.totalPoints) * 100, 0)) / quizAttempts.length)
    : 0;

  // Chart data - Quiz scores over time
  const quizChartData = quizAttempts.map((attempt, index) => ({
    name: `Quiz ${index + 1}`,
    score: Math.round((attempt.score / attempt.totalPoints) * 100),
  }));

  // Chart data - Weekly activity
  const weeklyData = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 },
  ];

  // Chart data - Course completion
  const courseProgress = enrolledCourses.map(course => {
    const completedLectures = course.lectures.filter(l => l.completed).length;
    return {
      name: course.title.length > 20 ? course.title.slice(0, 20) + '...' : course.title,
      progress: Math.round((completedLectures / course.lectures.length) * 100),
    };
  });

  // Chart data - Assignment status
  const assignmentStatus = [
    { name: 'Completed', value: completedAssignments, color: '#10B981' },
    { name: 'Pending', value: pendingAssignments, color: '#F59E0B' },
    { name: 'Not Started', value: Math.max(0, assignments.length - completedAssignments - pendingAssignments), color: '#6B7280' },
  ];

  const isTeacher = currentUser.role === 'teacher';
  const isAdmin = currentUser.role === 'admin';

  // Teacher stats
  const teacherCourses = courses.filter(c => c.instructorId === currentUser.id);
  const totalStudents = [...new Set(teacherCourses.flatMap(c => c.enrolledStudents))].length;
  const pendingSubmissions = submissions.filter(s => !s.grade).length;

  // Admin stats
  const totalUsers = users.length;
  const totalCourses = courses.length;
  const students = users.filter(u => u.role === 'student').length;
  const teachers = users.filter(u => u.role === 'teacher').length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-2xl p-6 border border-gray-700">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              {getGreeting()}, {currentUser.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-gray-400">
              {isAdmin 
                ? 'Welcome to the admin panel. Monitor your platform here.'
                : isTeacher 
                  ? 'Manage your courses and track student progress.'
                  : 'Ready to continue your learning journey?'
              }
            </p>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isAdmin ? (
            <>
              <StatCard
                icon={Users}
                label="Total Users"
                value={totalUsers}
                subtext={`${students} students, ${teachers} teachers`}
                color="indigo"
              />
              <StatCard
                icon={BookOpen}
                label="Total Courses"
                value={totalCourses}
                subtext="Active courses"
                color="violet"
              />
              <StatCard
                icon={FileText}
                label="Total Assignments"
                value={assignments.length}
                subtext="On platform"
                color="amber"
              />
              <StatCard
                icon={GraduationCap}
                label="Total Quizzes"
                value={quizzes.length}
                subtext="Available quizzes"
                color="emerald"
              />
            </>
          ) : isTeacher ? (
            <>
              <StatCard
                icon={BookOpen}
                label="My Courses"
                value={teacherCourses.length}
                subtext="Created courses"
                color="indigo"
              />
              <StatCard
                icon={Users}
                label="Students"
                value={totalStudents}
                subtext="Enrolled students"
                color="violet"
              />
              <StatCard
                icon={FileText}
                label="Assignments"
                value={assignments.filter(a => a.teacherId === currentUser.id).length}
                subtext="Created assignments"
                color="amber"
              />
              <StatCard
                icon={FileText}
                label="To Grade"
                value={pendingSubmissions}
                subtext="Pending submissions"
                color="emerald"
              />
            </>
          ) : (
            <>
              <StatCard
                icon={BookOpen}
                label="Enrolled Courses"
                value={enrolledCourses.length}
                subtext="Active enrollments"
                color="indigo"
              />
              <StatCard
                icon={FileText}
                label="Pending Tasks"
                value={pendingAssignments}
                subtext="Assignments due"
                color="amber"
              />
              <StatCard
                icon={GraduationCap}
                label="Quiz Score"
                value={`${avgQuizScore}%`}
                subtext="Average score"
                color="emerald"
              />
              <StatCard
                icon={Award}
                label="Completed"
                value={completedAssignments}
                subtext="Assignments graded"
                color="violet"
              />
            </>
          )}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Weekly Study Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A24',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quiz Performance Chart */}
          {!isAdmin && (
            <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                Quiz Performance
              </h3>
              <div className="h-64">
                {quizChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quizChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1A24',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#F9FAFB' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No quiz attempts yet</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admin Charts */}
          {isAdmin && (
            <>
              <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  User Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Students', value: students, color: '#6366F1' },
                          { name: 'Teachers', value: teachers, color: '#8B5CF6' },
                          { name: 'Admins', value: 1, color: '#10B981' },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: 'Students', value: students, color: '#6366F1' },
                          { name: 'Teachers', value: teachers, color: '#8B5CF6' },
                          { name: 'Admins', value: 1, color: '#10B981' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1A1A24',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-sm text-gray-400">Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500" />
                    <span className="text-sm text-gray-400">Teachers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-400">Admins</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Courses by Category
                </h3>
                <div className="space-y-4">
                  {['Data Science', 'Web Development', 'Computer Science'].map((category, index) => {
                    const count = courses.filter(c => c.category === category).length;
                    const percentage = totalCourses > 0 ? (count / totalCourses) * 100 : 0;
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{category}</span>
                          <span className="text-gray-400">{count} courses</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2 bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                {isTeacher ? 'Your Courses' : 'My Courses'}
              </h3>
              <button
                onClick={() => navigate('/courses')}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(isTeacher ? teacherCourses : enrolledCourses).slice(0, 4).map(course => {
                const completed = course.lectures.filter(l => l.completed).length;
                const progress = Math.round((completed / course.lectures.length) * 100);
                return (
                  <div
                    key={course.id}
                    className="p-4 bg-[#252532] rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{course.title}</h4>
                        <p className="text-sm text-gray-400 truncate">{course.instructorName}</p>
                        {!isTeacher && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>{completed}/{course.lectures.length} lectures</span>
                              <span>{progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {(isTeacher ? teacherCourses : enrolledCourses).length === 0 && (
                <div className="col-span-2 py-8 text-center text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No courses yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-400" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex gap-3">
                  <div className={clsx(
                    'w-2 h-2 rounded-full mt-2',
                    activity.type === 'course_enrolled' ? 'bg-indigo-500' :
                    activity.type === 'quiz_completed' ? 'bg-emerald-500' :
                    activity.type === 'assignment_submitted' ? 'bg-amber-500' :
                    'bg-violet-500'
                  )} />
                  <div>
                    <p className="text-sm text-gray-300">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string | number;
  subtext: string;
  color: 'indigo' | 'violet' | 'amber' | 'emerald';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, subtext, color }) => {
  const colors = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30',
    violet: 'from-violet-500/20 to-violet-500/5 border-violet-500/30',
    amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
  };

  const iconColors = {
    indigo: 'text-indigo-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  };

  return (
    <div className={clsx(
      'bg-gradient-to-br rounded-xl p-5 border',
      colors[color]
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
        <div className={clsx('p-2 rounded-lg bg-[#1A1A24]', iconColors[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
