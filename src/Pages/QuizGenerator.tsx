import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  Brain,
  Sparkles,
  Copy,
  Plus,
  Check,
} from 'lucide-react';
import clsx from 'clsx';
import { generateQuizFromNotes } from '../utils/aiUtils';

const QuizGenerator: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, addQuiz, courses } = useStore();
  const [notes, setNotes] = useState('');
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isTeacher = currentUser.role === 'teacher';
  
  if (!isTeacher) {
    return (
      <div className="min-h-screen">
        <Header title="Quiz Generator" />
        <div className="p-6 flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">This feature is only available for teachers</p>
          </div>
        </div>
      </div>
    );
  }

  const teacherCourses = courses.filter(c => c.instructorId === currentUser.id);

  const handleGenerate = async () => {
    if (!notes.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const questions = generateQuizFromNotes(notes);
    setGeneratedQuestions(questions);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    const text = generatedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveQuiz = () => {
    if (!selectedCourse || !quizTitle) return;

    const course = courses.find(c => c.id === selectedCourse);
    
    // Convert generated questions to quiz format
    const questions = generatedQuestions.map((q, idx) => ({
      id: `q-${Date.now()}-${idx}`,
      question: q.replace('What is ', '').replace('?', '').trim() + '?',
      options: [
        'The process of ' + q.split(' ').slice(2).join(' ').replace('?', ''),
        'A method for ' + q.split(' ').slice(2).join(' ').replace('?', ''),
        'A type of ' + q.split(' ').slice(2).join(' ').replace('?', ''),
        'An example of ' + q.split(' ').slice(2).join(' ').replace('?', ''),
      ],
      correctAnswer: 0,
    }));

    addQuiz({
      title: quizTitle,
      description: `Generated from study notes - ${generatedQuestions.length} questions`,
      courseId: selectedCourse,
      courseName: course?.title || '',
      teacherId: currentUser.id,
      timeLimit: questions.length * 3,
      questions,
    });

    setShowSaveModal(false);
    setQuizTitle('');
    setSelectedCourse('');
    setGeneratedQuestions([]);
    navigate('/quizzes');
  };

  return (
    <div className="min-h-screen">
      <Header title="Quiz Generator" />
      
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Instructions */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">AI Quiz Generator</h2>
                <p className="text-gray-400 text-sm">
                  Paste your study notes or course material below, and our AI will automatically generate quiz questions based on the key concepts and definitions in your text.
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6 mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Paste Study Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Paste your study notes, lecture content, or course material here...

Example:
Photosynthesis is the process by which plants make food using sunlight, water, and carbon dioxide. The process occurs in the chloroplasts of plant cells. Chlorophyll absorbs light energy which is then used to convert carbon dioxide and water into glucose and oxygen."
            />
            
            <button
              onClick={handleGenerate}
              disabled={!notes.trim() || isGenerating}
              className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Generate Quiz Questions
                </>
              )}
            </button>
          </div>

          {/* Generated Questions */}
          {generatedQuestions.length > 0 && (
            <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Generated Questions ({generatedQuestions.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-[#252532] text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => setShowSaveModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Save as Quiz
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {generatedQuestions.map((question, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#252532] rounded-lg border border-gray-700"
                  >
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-gray-200">{question}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Quiz Modal */}
          {showSaveModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Save Quiz</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title</label>
                    <input
                      type="text"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white"
                    >
                      <option value="">Select a course</option>
                      {teacherCourses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveQuiz}
                    disabled={!quizTitle || !selectedCourse}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg disabled:opacity-50"
                  >
                    Save Quiz
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizGenerator;
