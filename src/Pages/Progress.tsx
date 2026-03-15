import clsx from "clsx";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  Brain,
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
  Clock,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    getUserCourses, 
    getStudentSubmissions,
    getStudentQuizAttempts,
  } = useStore();

 if (!currentUser) {
  return null;
}

  const enrolledCourses = getUserCourses(currentUser.id);
  const submissions = getStudentSubmissions(currentUser.id);
  const quizAttempts = getStudentQuizAttempts(currentUser.id);

  // Calculate stats
  const totalLectures = enrolledCourses.reduce((acc, c) => acc + c.lectures.length, 0);
  const completedLectures = enrolledCourses.reduce(
    (acc, c) => acc + c.lectures.filter(l => l.completed).length, 
    0
  );
  const courseProgress = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

  const gradedSubmissions = submissions.filter(s => s.grade !== undefined);
  const avgAssignmentScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((acc, s) => acc + (s.grade || 0), 0) / gradedSubmissions.length)
    : 0;

  const avgQuizScore = quizAttempts.length > 0
    ? Math.round(quizAttempts.reduce((acc, a) => acc + (a.score / a.totalPoints) * 100, 0) / quizAttempts.length)
    : 0;

  const totalStudyHours = Math.round((completedLectures * 30 + quizAttempts.length * 15) / 60); // estimate

  // Chart data - Weekly progress
  const weeklyProgress = [
    { day: 'Mon', hours: 1.5, assignments: 1, quizzes: 0 },
    { day: 'Tue', hours: 2, assignments: 0, quizzes: 1 },
    { day: 'Wed', hours: 1, assignments: 1, quizzes: 0 },
    { day: 'Thu', hours: 2.5, assignments: 0, quizzes: 0 },
    { day: 'Fri', hours: 1.5, assignments: 1, quizzes: 1 },
    { day: 'Sat', hours: 3, assignments: 0, quizzes: 0 },
    { day: 'Sun', hours: 2, assignments: 0, quizzes: 0 },
  ];

  // Chart data - Quiz scores
  const quizScores = quizAttempts.map((attempt, idx) => ({
    name: `Quiz ${idx + 1}`,
    score: Math.round((attempt.score / attempt.totalPoints) * 100),
  }));

  // Chart data - Skills radar
  const skillsData = [
    { skill: 'Programming', value: avgQuizScore > 0 ? avgQuizScore : 60 },
    { skill: 'Data Analysis', value: courseProgress },
    { skill: 'Problem Solving', value: avgAssignmentScore > 0 ? avgAssignmentScore : 70 },
    { skill: 'Theory', value: 50 },
    { skill: 'Practice', value: courseProgress },
    { skill: 'Projects', value: 40 },
  ];

  // Chart data - Course completion
  const courseData = enrolledCourses.map(course => ({
    name: course.title.slice(0, 15) + '...',
    completed: course.lectures.filter(l => l.completed).length,
    total: course.lectures.length,
  }));

  return (
    <div className="min-h-screen">
      <Header title="My Progress" />
      
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookOpen}
            label="Course Progress"
            value={`${courseProgress}%`}
            subtext={`${completedLectures}/${totalLectures} lectures`}
            color="indigo"
          />
          <StatCard
            icon={FileText}
            label="Assignment Score"
            value={avgAssignmentScore > 0 ? `${avgAssignmentScore}%` : '-'}
            subtext={`${gradedSubmissions.length} graded`}
            color="emerald"
          />
          <StatCard
            icon={GraduationCap}
            label="Quiz Average"
            value={avgQuizScore > 0 ? `${avgQuizScore}%` : '-'}
            subtext={`${quizAttempts.length} quizzes taken`}
            color="violet"
          />
          <StatCard
            icon={Clock}
            label="Study Time"
            value={`${totalStudyHours}h`}
            subtext="Estimated total"
            color="amber"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Weekly Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgress}>
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
                  <Bar dataKey="hours" fill="#6366F1" radius={[4, 4, 0, 0]} name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quiz Performance */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              Quiz Performance
            </h3>
            <div className="h-64">
              {quizScores.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quizScores}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1A24',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2 }}
                      name="Score %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No quiz data yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Radar */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-violet-400" />
              Skills Overview
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" fontSize={12} />
                  <PolarRadiusAxis stroke="#374151" />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Course Progress
            </h3>
            <div className="space-y-4">
              {courseData.length > 0 ? (
                courseData.map((course, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{course.name}</span>
                      <span className="text-gray-400">{course.completed}/{course.total}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                        style={{ width: `${(course.completed / course.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No enrolled courses</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Recent Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quizAttempts.length > 0 && (
              <div className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Quiz Completed</p>
                    <p className="font-semibold text-white">{quizAttempts.length} quizzes</p>
                  </div>
                </div>
              </div>
            )}
            {gradedSubmissions.length > 0 && (
              <div className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Assignments Graded</p>
                    <p className="font-semibold text-white">{gradedSubmissions.length} submissions</p>
                  </div>
                </div>
              </div>
            )}
            {courseProgress > 0 && (
              <div className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Learning Streak</p>
                    <p className="font-semibold text-white">{completedLectures} lectures</p>
                  </div>
                </div>
              </div>
            )}
            {quizAttempts.length === 0 && gradedSubmissions.length === 0 && courseProgress === 0 && (
              <div className="col-span-3 text-center py-4 text-gray-500">
                <p>Start learning to unlock achievements!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string;
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

export default Progress;