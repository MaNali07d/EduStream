import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  GraduationCap,
  Plus,
  Clock,
  CheckCircle,
  X,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import clsx from 'clsx';
import type { Quiz, QuizQuestion } from '../types';

const Quizzes: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    quizzes, 
    getStudentQuizAttempts,
    submitQuiz,
    addQuiz,
    courses,
    getCourseQuizzes,
  } = useStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isTeacher = currentUser.role === 'teacher';
  const studentAttempts = getStudentQuizAttempts(currentUser.id);

  // Get available quizzes for students
  let availableQuizzes = quizzes;
  if (!isTeacher) {
    const enrolledCourseIds = currentUser.enrolledCourses;
    availableQuizzes = quizzes.filter(q => enrolledCourseIds.includes(q.courseId));
  }

  const getQuizStatus = (quizId: string) => {
    const attempt = studentAttempts.find(a => a.quizId === quizId);
    if (!attempt) return 'not_started';
    return 'completed';
  };

  const getBestScore = (quizId: string) => {
    const attempts = studentAttempts.filter(a => a.quizId === quizId);
    if (attempts.length === 0) return null;
    const best = attempts.reduce((best, current) => 
      (current.score / current.totalPoints) > (best.score / best.totalPoints) ? current : best
    );
    return Math.round((best.score / best.totalPoints) * 100);
  };

  const getQuizAttempts = (quizId: string) => {
    return studentAttempts.filter(a => a.quizId === quizId).length;
  };

  return (
    <div className="min-h-screen">
      <Header title="Quizzes" />
      
      <div className="p-6">
        {/* Create Quiz Button (Teacher only) */}
        {isTeacher && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Quiz
            </button>
          </div>
        )}

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableQuizzes.map(quiz => {
            const status = getQuizStatus(quiz.id);
            const bestScore = getBestScore(quiz.id);
            const attempts = getQuizAttempts(quiz.id);

            return (
              <div
                key={quiz.id}
                className="bg-[#1A1A24] border border-gray-700 rounded-xl p-5 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-indigo-400" />
                  </div>
                  {status === 'completed' && (
                    <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded-full">
                      Completed
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-white mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{quiz.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {quiz.timeLimit} min
                  </span>
                  <span>{quiz.questions.length} questions</span>
                  <span>{quiz.courseName}</span>
                </div>

                {status === 'completed' && bestScore !== null && (
                  <div className="flex items-center justify-between p-3 bg-[#252532] rounded-lg mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Best Score</p>
                      <p className="text-lg font-bold text-emerald-400">{bestScore}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Attempts</p>
                      <p className="text-lg font-semibold text-white">{attempts}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setShowQuizModal(true);
                  }}
                  className="w-full py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors"
                >
                  {status === 'completed' ? 'Retake Quiz' : 'Start Quiz'}
                </button>
              </div>
            );
          })}
        </div>

        {availableQuizzes.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No quizzes available</p>
          </div>
        )}

        {/* Take Quiz Modal */}
        {showQuizModal && selectedQuiz && (
          <TakeQuizModal
            quiz={selectedQuiz}
            onClose={() => {
              setShowQuizModal(false);
              setSelectedQuiz(null);
            }}
            onSubmit={submitQuiz}
            studentId={currentUser.id}
          />
        )}

        {/* Create Quiz Modal */}
        {showCreateModal && (
          <CreateQuizModal
            onClose={() => setShowCreateModal(false)}
            onCreate={addQuiz}
          />
        )}
      </div>
    </div>
  );
};

// Take Quiz Modal
const TakeQuizModal: React.FC<{
  quiz: Quiz;
  onClose: () => void;
  onSubmit: (quizId: string, studentId: string, answers: { questionId: string; answer: number }[]) => void;
  studentId: string;
}> = ({ quiz, onClose, onSubmit, studentId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60);

  // Timer
  React.useEffect(() => {
    if (showResults) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = answers[question.id];

  const handleAnswer = (answerIndex: number) => {
    setAnswers({ ...answers, [question.id]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    onSubmit(quiz.id, studentId, formattedAnswers);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = quiz.questions.reduce((acc, q) => 
    answers[q.id] === q.correctAnswer ? acc + 1 : acc, 0
  );
  const percentage = Math.round((score / quiz.questions.length) * 100);

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-xl p-6">
          <div className="text-center mb-6">
            <div className={clsx(
              'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4',
              percentage >= 70 ? 'bg-emerald-500/20' : percentage >= 50 ? 'bg-amber-500/20' : 'bg-red-500/20'
            )}>
              <GraduationCap className={clsx(
                'w-12 h-12',
                percentage >= 70 ? 'text-emerald-400' : percentage >= 50 ? 'text-amber-400' : 'text-red-400'
              )} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-5xl font-bold text-indigo-400 mb-2">{percentage}%</p>
            <p className="text-gray-400">
              You got {score} out of {quiz.questions.length} questions correct
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="p-3 bg-[#252532] rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-300">Question {idx + 1}</span>
                {answers[q.id] === q.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : (
                  <X className="w-5 h-5 text-red-400" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-[#1A1A24]">
          <div>
            <h2 className="text-lg font-semibold text-white">{quiz.title}</h2>
            <p className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className={clsx(
            'px-3 py-1 rounded-lg text-sm font-medium',
            timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'
          )}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <p className="text-lg text-white font-medium mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={clsx(
                  'w-full p-4 text-left rounded-lg border transition-colors',
                  selectedAnswer === idx
                    ? 'bg-indigo-500/20 border-indigo-500 text-white'
                    : 'bg-[#252532] border-gray-700 text-gray-300 hover:border-gray-600'
                )}
              >
                <span className="inline-block w-6 h-6 rounded-full border border-current text-center text-sm mr-3">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={currentQuestion === quiz.questions.length - 1 ? handleSubmit : handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Create Quiz Modal
const CreateQuizModal: React.FC<{
  onClose: () => void;
  onCreate: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
}> = ({ onClose, onCreate }) => {
  const { currentUser, courses } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [timeLimit, setTimeLimit] = useState('15');
  const [questions, setQuestions] = useState<Omit<QuizQuestion, 'id'>[]>([]);

  const teacherCourses = courses.filter(c => c.instructorId === currentUser?.id);

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    }]);
  };

  const updateQuestion = (index: number, field: string, value: string | number) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value as string;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value as number;
    }
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !courseId) return;

    const course = courses.find(c => c.id === courseId);
    
    onCreate({
      title,
      description,
      courseId,
      courseName: course?.title || '',
      teacherId: currentUser.id,
      timeLimit: parseInt(timeLimit),
      questions: questions.map((q, i) => ({ ...q, id: `q-${Date.now()}-${i}` })),
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-[#1A1A24]">
          <h2 className="text-lg font-semibold text-white">Create Quiz</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
                required
              >
                <option value="">Select course</option>
                {teacherCourses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (minutes)</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">Questions</label>
              <button
                type="button"
                onClick={addQuestion}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((question, qIdx) => (
                <div key={qIdx} className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-300">Question {qIdx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIdx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                    className="w-full px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white mb-3"
                    placeholder="Enter question"
                    required
                  />

                  <div className="space-y-2">
                    {question.options.map((option, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIdx}`}
                          checked={question.correctAnswer === oIdx}
                          onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                          className="text-indigo-500"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                          className="flex-1 px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm"
                          placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={questions.length === 0}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg disabled:opacity-50"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quizzes;
