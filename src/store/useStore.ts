import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { 
  User, 
  Course, 
  Assignment, 
  Submission, 
  Quiz, 
  QuizAttempt,
  Notification,
  Activity,
  ChatMessage,
  Lecture,
  Material,
  QuizQuestion,
  LearningWeek
} from '../types';

// Helper to create initial demo data
const createInitialData = () => {
  const teacherId = uuidv4();
  const studentId = uuidv4();
  const adminId = uuidv4();

  const demoTeacher: User = {
    id: teacherId,
    name: 'Dr. Sarah Johnson',
    email: 'teacher@edustream.com',
    password: 'teacher123',
    role: 'teacher',
    enrolledCourses: [],
    createdAt: new Date().toISOString(),
  };

  const demoStudent: User = {
    id: studentId,
    name: 'Alex Chen',
    email: 'student@edustream.com',
    password: 'student123',
    role: 'student',
    enrolledCourses: ['course-1', 'course-2'],
    createdAt: new Date().toISOString(),
  };

  const demoAdmin: User = {
    id: adminId,
    name: 'Admin User',
    email: 'admin@edustream.com',
    password: 'admin123',
    role: 'admin',
    enrolledCourses: [],
    createdAt: new Date().toISOString(),
  };

  const demoCourses: Course[] = [
    {
      id: 'course-1',
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning, including supervised and unsupervised learning, neural networks, and practical applications using Python.',
      category: 'Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      instructorId: teacherId,
      instructorName: 'Dr. Sarah Johnson',
      enrolledStudents: [studentId],
      createdAt: new Date().toISOString(),
      isPublished: true,
      lectures: [
        {
          id: 'lec-1',
          title: 'What is Machine Learning?',
          description: 'An introduction to the concept of machine learning and its applications.',
          videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
          duration: 15,
          completed: true,
        },
        {
          id: 'lec-2',
          title: 'Supervised Learning Basics',
          description: 'Understanding supervised learning algorithms and their use cases.',
          videoUrl: 'https://www.youtube.com/embed/jygrpWnjE4A',
          duration: 20,
          completed: false,
        },
        {
          id: 'lec-3',
          title: 'Neural Networks Explained',
          description: 'Deep dive into neural networks and how they work.',
          videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
          duration: 25,
          completed: false,
        },
      ],
      materials: [
        { id: 'mat-1', title: 'ML Fundamentals Guide', url: '#', type: 'pdf' },
        { id: 'mat-2', title: 'Python for ML', url: '#', type: 'link' },
      ],
    },
    {
      id: 'course-2',
      title: 'Web Development Bootcamp',
      description: 'Complete web development course covering HTML, CSS, JavaScript, React, and Node.js. Build real-world projects from scratch.',
      category: 'Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      instructorId: teacherId,
      instructorName: 'Dr. Sarah Johnson',
      enrolledStudents: [studentId],
      createdAt: new Date().toISOString(),
      isPublished: true,
      lectures: [
        {
          id: 'lec-4',
          title: 'HTML Fundamentals',
          description: 'Learn the building blocks of web pages.',
          videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE',
          duration: 30,
          completed: false,
        },
        {
          id: 'lec-5',
          title: 'CSS Styling',
          description: 'Master CSS layouts and styling techniques.',
          videoUrl: 'https://www.youtube.com/embed/yfoY53QXEnI',
          duration: 25,
          completed: false,
        },
      ],
      materials: [
        { id: 'mat-3', title: 'HTML Cheat Sheet', url: '#', type: 'pdf' },
      ],
    },
    {
      id: 'course-3',
      title: 'Data Structures & Algorithms',
      description: 'Master essential data structures and algorithms for technical interviews and efficient programming.',
      category: 'Computer Science',
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
      instructorId: teacherId,
      instructorName: 'Dr. Sarah Johnson',
      enrolledStudents: [],
      createdAt: new Date().toISOString(),
      isPublished: true,
      lectures: [
        {
          id: 'lec-6',
          title: 'Arrays and Strings',
          description: 'Understanding arrays and string manipulation.',
          videoUrl: 'https://www.youtube.com/embed/9emXNzqCKyg',
          duration: 35,
          completed: false,
        },
      ],
      materials: [],
    },
  ];

  const demoAssignments: Assignment[] = [
    {
      id: 'assign-1',
      title: 'Build a Neural Network',
      description: 'Implement a simple neural network from scratch using Python numpy.',
      courseId: 'course-1',
      courseName: 'Introduction to Machine Learning',
      teacherId: teacherId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxPoints: 100,
      instructions: 'Create a neural network with at least 2 hidden layers. Use the sigmoid activation function.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'assign-2',
      title: 'Create a Portfolio Website',
      description: 'Build a personal portfolio website using HTML, CSS, and JavaScript.',
      courseId: 'course-2',
      courseName: 'Web Development Bootcamp',
      teacherId: teacherId,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      maxPoints: 100,
      instructions: 'Include at least 3 sections: About, Projects, Contact. Make it responsive.',
      createdAt: new Date().toISOString(),
    },
  ];

  const demoSubmissions: Submission[] = [
    {
      id: 'sub-1',
      assignmentId: 'assign-1',
      studentId: studentId,
      studentName: 'Alex Chen',
      content: 'I have implemented a neural network with 3 layers using numpy...',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      grade: 85,
      feedback: 'Great implementation! Consider adding more epochs for better convergence.',
      gradedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const demoQuizzes: Quiz[] = [
    {
      id: 'quiz-1',
      title: 'Machine Learning Basics Quiz',
      description: 'Test your understanding of fundamental ML concepts.',
      courseId: 'course-1',
      courseName: 'Introduction to Machine Learning',
      teacherId: teacherId,
      timeLimit: 15,
      createdAt: new Date().toISOString(),
      questions: [
        {
          id: 'q1',
          question: 'What is machine learning?',
          options: [
            'A way to make computers think like humans',
            'A type of programming where computers learn from data',
            'A method for building websites',
            'A database management system',
          ],
          correctAnswer: 1,
        },
        {
          id: 'q2',
          question: 'Which of these is a supervised learning algorithm?',
          options: ['K-Means Clustering', 'Linear Regression', 'PCA', 'Autoencoders'],
          correctAnswer: 1,
        },
        {
          id: 'q3',
          question: 'What is overfitting?',
          options: [
            'When a model performs well on training but poorly on test data',
            'When a model is too simple',
            'When training takes too long',
            'When the dataset is too small',
          ],
          correctAnswer: 0,
        },
        {
          id: 'q4',
          question: 'Which activation function is commonly used in output layers for classification?',
          options: ['Sigmoid', 'ReLU', 'Tanh', 'Leaky ReLU'],
          correctAnswer: 0,
        },
        {
          id: 'q5',
          question: 'What is the purpose of the loss function?',
          options: [
            'To add more layers to the network',
            'To measure how well the model is performing',
            'To speed up training',
            'To initialize weights',
          ],
          correctAnswer: 1,
        },
      ],
    },
  ];

  const demoQuizAttempts: QuizAttempt[] = [
    {
      id: 'attempt-1',
      quizId: 'quiz-1',
      studentId: studentId,
      answers: [
        { questionId: 'q1', answer: 1 },
        { questionId: 'q2', answer: 1 },
        { questionId: 'q3', answer: 0 },
        { questionId: 'q4', answer: 0 },
        { questionId: 'q5', answer: 1 },
      ],
      score: 4,
      totalPoints: 5,
      completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const demoNotifications: Notification[] = [
    {
      id: 'notif-1',
      userId: studentId,
      type: 'assignment_due',
      title: 'Assignment Due Soon',
      message: 'Build a Neural Network is due in 7 days.',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/assignments',
    },
    {
      id: 'notif-2',
      userId: studentId,
      type: 'grade_posted',
      title: 'Grade Posted',
      message: 'Your submission for Neural Network has been graded.',
      read: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/assignments',
    },
  ];

  const demoActivities: Activity[] = [
    {
      id: 'act-1',
      userId: studentId,
      type: 'course_enrolled',
      description: 'Enrolled in Web Development Bootcamp',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act-2',
      userId: studentId,
      type: 'quiz_completed',
      description: 'Completed Machine Learning Basics Quiz with 80% score',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act-3',
      userId: studentId,
      type: 'assignment_submitted',
      description: 'Submitted Neural Network Assignment',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return {
    users: [demoTeacher, demoStudent, demoAdmin],
    courses: demoCourses,
    assignments: demoAssignments,
    submissions: demoSubmissions,
    quizzes: demoQuizzes,
    quizAttempts: demoQuizAttempts,
    notifications: demoNotifications,
    activities: demoActivities,
  };
};

// Store state interface
interface AppState {
  // Data
  users: User[];
  courses: Course[];
  assignments: Assignment[];
  submissions: Submission[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  notifications: Notification[];
  activities: Activity[];
  
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  
  // UI
  sidebarOpen: boolean;
  chatHistory: ChatMessage[];
  
  // Actions - Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'student' | 'teacher') => boolean;
  
  // Actions - Courses
  addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'enrolledStudents'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  enrollInCourse: (courseId: string, userId: string) => void;
  markLectureComplete: (courseId: string, lectureId: string, userId: string) => void;
  
  // Actions - Assignments
  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  submitAssignment: (assignmentId: string, studentId: string, studentName: string, content: string) => void;
  gradeSubmission: (submissionId: string, grade: number, feedback: string) => void;
  
  // Actions - Quizzes
  addQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  updateQuiz: (id: string, updates: Partial<Quiz>) => void;
  deleteQuiz: (id: string) => void;
  submitQuiz: (quizId: string, studentId: string, answers: { questionId: string; answer: number }[]) => void;
  
  // Actions - Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Actions - UI
  toggleSidebar: () => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;
  
  // Getters
  getUserCourses: (userId: string) => Course[];
  getTeacherCourses: (teacherId: string) => Course[];
  getCourseAssignments: (courseId: string) => Assignment[];
  getStudentSubmissions: (studentId: string) => Submission[];
  getAssignmentSubmissions: (assignmentId: string) => Submission[];
  getCourseQuizzes: (courseId: string) => Quiz[];
  getStudentQuizAttempts: (studentId: string) => QuizAttempt[];
  getUserNotifications: (userId: string) => Notification[];
  getUserActivities: (userId: string) => Activity[];
}

const initialData = createInitialData();

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial data
      ...initialData,
      
      // Auth state
      currentUser: null,
      isAuthenticated: false,
      sidebarOpen: true,
      chatHistory: [],
      
      // Auth actions
      login: (email: string, password: string) => {
        const user = get().users.find(u => u.email === email && u.password === password);
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ currentUser: null, isAuthenticated: false, chatHistory: [] });
      },
      
      signup: (name: string, email: string, password: string, role: 'student' | 'teacher') => {
        const existingUser = get().users.find(u => u.email === email);
        if (existingUser) return false;
        
        const newUser: User = {
          id: uuidv4(),
          name,
          email,
          password,
          role,
          enrolledCourses: [],
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAuthenticated: true,
        }));
        
        return true;
      },
      
      // Course actions
      addCourse: (courseData) => {
        const newCourse: Course = {
          ...courseData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          enrolledStudents: [],
        };
        set(state => ({ courses: [...state.courses, newCourse] }));
      },
      
      updateCourse: (id, updates) => {
        set(state => ({
          courses: state.courses.map(c => c.id === id ? { ...c, ...updates } : c),
        }));
      },
      
      deleteCourse: (id) => {
        set(state => ({ courses: state.courses.filter(c => c.id !== id) }));
      },
      
      enrollInCourse: (courseId, userId) => {
        set(state => ({
          courses: state.courses.map(c => 
            c.id === courseId 
              ? { ...c, enrolledStudents: [...c.enrolledStudents, userId] }
              : c
          ),
          users: state.users.map(u =>
            u.id === userId
              ? { ...u, enrolledCourses: [...u.enrolledCourses, courseId] }
              : u
          ),
        }));
      },
      
      markLectureComplete: (courseId, lectureId, userId) => {
        set(state => ({
          courses: state.courses.map(c =>
            c.id === courseId
              ? {
                  ...c,
                  lectures: c.lectures.map(l =>
                    l.id === lectureId ? { ...l, completed: true } : l
                  ),
                }
              : c
          ),
        }));
      },
      
      // Assignment actions
      addAssignment: (assignmentData) => {
        const newAssignment: Assignment = {
          ...assignmentData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set(state => ({ assignments: [...state.assignments, newAssignment] }));
        
        // Create notifications for enrolled students
        const course = get().courses.find(c => c.id === assignmentData.courseId);
        if (course) {
          course.enrolledStudents.forEach(studentId => {
            get().addNotification({
              userId: studentId,
              type: 'assignment_due',
              title: 'New Assignment',
              message: `${assignmentData.title} has been assigned in ${course.title}`,
              read: false,
              link: '/assignments',
            });
          });
        }
      },
      
      updateAssignment: (id, updates) => {
        set(state => ({
          assignments: state.assignments.map(a => a.id === id ? { ...a, ...updates } : a),
        }));
      },
      
      deleteAssignment: (id) => {
        set(state => ({ assignments: state.assignments.filter(a => a.id !== id) }));
      },
      
      submitAssignment: (assignmentId, studentId, studentName, content) => {
        const newSubmission: Submission = {
          id: uuidv4(),
          assignmentId,
          studentId,
          studentName,
          content,
          submittedAt: new Date().toISOString(),
        };
        set(state => ({ submissions: [...state.submissions, newSubmission] }));
        
        // Notify teacher
        const assignment = get().assignments.find(a => a.id === assignmentId);
        if (assignment) {
          get().addNotification({
            userId: assignment.teacherId,
            type: 'course_update',
            title: 'New Submission',
            message: `${studentName} submitted ${assignment.title}`,
            read: false,
            link: '/assignments',
          });
        }
      },
      
      gradeSubmission: (submissionId, grade, feedback) => {
        set(state => ({
          submissions: state.submissions.map(s =>
            s.id === submissionId
              ? { ...s, grade, feedback, gradedAt: new Date().toISOString() }
              : s
          ),
        }));
        
        // Notify student
        const submission = get().submissions.find(s => s.id === submissionId);
        if (submission) {
          get().addNotification({
            userId: submission.studentId,
            type: 'grade_posted',
            title: 'Grade Posted',
            message: `Your submission has been graded: ${grade}/${get().assignments.find(a => a.id === submission.assignmentId)?.maxPoints || 100} points`,
            read: false,
            link: '/assignments',
          });
        }
      },
      
      // Quiz actions
      addQuiz: (quizData) => {
        const newQuiz: Quiz = {
          ...quizData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set(state => ({ quizzes: [...state.quizzes, newQuiz] }));
      },
      
      updateQuiz: (id, updates) => {
        set(state => ({
          quizzes: state.quizzes.map(q => q.id === id ? { ...q, ...updates } : q),
        }));
      },
      
      deleteQuiz: (id) => {
        set(state => ({ quizzes: state.quizzes.filter(q => q.id !== id) }));
      },
      
      submitQuiz: (quizId, studentId, answers) => {
        const quiz = get().quizzes.find(q => q.id === quizId);
        if (!quiz) return;
        
        let score = 0;
        answers.forEach(answer => {
          const question = quiz.questions.find(q => q.id === answer.questionId);
          if (question && question.correctAnswer === answer.answer) {
            score++;
          }
        });
        
        const attempt: QuizAttempt = {
          id: uuidv4(),
          quizId,
          studentId,
          answers,
          score,
          totalPoints: quiz.questions.length,
          completedAt: new Date().toISOString(),
        };
        
        set(state => ({ quizAttempts: [...state.quizAttempts, attempt] }));
      },
      
      // Notification actions
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set(state => ({ notifications: [...state.notifications, notification] }));
      },
      
      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
      },
      
      markAllNotificationsRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
        }));
      },
      
      // UI actions
      toggleSidebar: () => {
        set(state => ({ sidebarOpen: !state.sidebarOpen }));
      },
      
      addChatMessage: (message) => {
        set(state => ({ chatHistory: [...state.chatHistory, message] }));
      },
      
      clearChatHistory: () => {
        set({ chatHistory: [] });
      },
      
      // Getters
      getUserCourses: (userId) => {
        const user = get().users.find(u => u.id === userId);
        if (!user) return [];
        return get().courses.filter(c => user.enrolledCourses.includes(c.id));
      },
      
      getTeacherCourses: (teacherId) => {
        return get().courses.filter(c => c.instructorId === teacherId);
      },
      
      getCourseAssignments: (courseId) => {
        return get().assignments.filter(a => a.courseId === courseId);
      },
      
      getStudentSubmissions: (studentId) => {
        return get().submissions.filter(s => s.studentId === studentId);
      },
      
      getAssignmentSubmissions: (assignmentId) => {
        return get().submissions.filter(s => s.assignmentId === assignmentId);
      },
      
      getCourseQuizzes: (courseId) => {
        return get().quizzes.filter(q => q.courseId === courseId);
      },
      
      getStudentQuizAttempts: (studentId) => {
        return get().quizAttempts.filter(a => a.studentId === studentId);
      },
      
      getUserNotifications: (userId) => {
        return get().notifications
          .filter(n => n.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      
      getUserActivities: (userId) => {
        return get().activities
          .filter(a => a.userId === userId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      },
    }),
    {
      name: 'edustream-storage',
      partialize: (state) => ({
        users: state.users,
        courses: state.courses,
        assignments: state.assignments,
        submissions: state.submissions,
        quizzes: state.quizzes,
        quizAttempts: state.quizAttempts,
        notifications: state.notifications,
        activities: state.activities,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
