// User types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  enrolledCourses: string[];
  createdAt: string;
}

// Course types
export interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  completed: boolean;
}

export interface Material {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'document';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  lectures: Lecture[];
  materials: Material[];
  enrolledStudents: string[];
  createdAt: string;
  isPublished: boolean;
}

// Assignment types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  dueDate: string;
  maxPoints: number;
  instructions: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
}

// Quiz types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  questions: QuizQuestion[];
  timeLimit: number;
  createdAt: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: { questionId: string; answer: number }[];
  score: number;
  totalPoints: number;
  completedAt: string;
}

// Notification types
export type NotificationType = 'assignment_due' | 'quiz_available' | 'grade_posted' | 'course_update';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// Learning Path types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LearningPath {
  id: string;
  subject: string;
  skillLevel: SkillLevel;
  goal: string;
  weeks: LearningWeek[];
  createdAt: string;
}

export interface LearningWeek {
  week: number;
  title: string;
  topics: string[];
  estimatedHours: number;
}

// Activity types
export interface Activity {
  id: string;
  userId: string;
  type: 'course_enrolled' | 'assignment_submitted' | 'quiz_completed' | 'course_completed';
  description: string;
  timestamp: string;
}

// AI Knowledge Base types
export interface KnowledgeEntry {
  keywords: string[];
  topic: string;
  explanation: string;
}

// Chat message for Study Assistant
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Dashboard stats
export interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  averageQuizScore: number;
  totalAssignments: number;
  pendingAssignments: number;
  completedAssignments: number;
  studyHours: number;
}

// Generated quiz question from notes
export interface GeneratedQuestion {
  question: string;
  answer: string;
}
