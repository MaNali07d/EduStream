import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  FileText,
  Plus,
  Clock,
  CheckCircle,
  X,
  Send,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import type { Assignment } from '../types';

const Assignments: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    assignments, 
    submissions,
    getStudentSubmissions,
    getAssignmentSubmissions,
    submitAssignment,
    addAssignment,
    courses,
    gradeSubmission,
  } = useStore();

  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isTeacher = currentUser.role === 'teacher';
  const studentSubmissions = getStudentSubmissions(currentUser.id);

  // Filter assignments based on user role and filter
  let filteredAssignments = assignments;
  
  if (!isTeacher) {
    // For students, show assignments for enrolled courses
    const enrolledCourseIds = currentUser.enrolledCourses;
    filteredAssignments = assignments.filter(a => 
      enrolledCourseIds.includes(a.courseId)
    );
  }

  const getAssignmentStatus = (assignment: Assignment) => {
    const submission = studentSubmissions.find(s => s.assignmentId === assignment.id);
    if (!submission) return 'pending';
    if (submission.grade !== undefined) return 'graded';
    return 'submitted';
  };

  const filteredByStatus = filteredAssignments.filter(a => {
    if (filter === 'all') return true;
    const status = getAssignmentStatus(a);
    if (filter === 'pending') return status === 'pending';
    if (filter === 'submitted') return status === 'submitted';
    if (filter === 'graded') return status === 'graded';
    return true;
  });

  const handleSubmitAssignment = () => {
    if (!selectedAssignment || !submissionContent.trim()) return;
    submitAssignment(selectedAssignment.id, currentUser.id, currentUser.name, submissionContent);
    setSelectedAssignment(null);
    setSubmissionContent('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen">
      <Header title="Assignments" />
      
      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'submitted', 'graded'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  filter === f
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-[#1A1A24] text-gray-400 border border-gray-700 hover:border-gray-600'
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Create Assignment Button (Teacher only) */}
          {isTeacher && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 transition-all ml-auto"
            >
              <Plus className="w-4 h-4" />
              Create Assignment
            </button>
          )}
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {filteredByStatus.map(assignment => {
            const status = getAssignmentStatus(assignment);
            const submission = studentSubmissions.find(s => s.assignmentId === assignment.id);
            const dueSoon = !isOverdue(assignment.dueDate) && 
              new Date(assignment.dueDate).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;
            const overdue = isOverdue(assignment.dueDate);

            return (
              <div
                key={assignment.id}
                className="bg-[#1A1A24] border border-gray-700 rounded-xl p-5 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{assignment.title}</h3>
                      <span className={clsx(
                        'px-2 py-0.5 text-xs rounded-full',
                        status === 'graded' ? 'bg-emerald-500/20 text-emerald-400' :
                        status === 'submitted' ? 'bg-amber-500/20 text-amber-400' :
                        status === 'pending' ? 'bg-gray-700 text-gray-300' :
                        'bg-gray-700 text-gray-400'
                      )}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{assignment.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {assignment.courseName}
                      </span>
                      <span className={clsx(
                        'flex items-center gap-1',
                        overdue ? 'text-red-400' : dueSoon ? 'text-amber-400' : ''
                      )}>
                        <Clock className="w-3 h-3" />
                        Due: {formatDate(assignment.dueDate)}
                      </span>
                      <span>Max: {assignment.maxPoints} pts</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Student submission info */}
                    {!isTeacher && (
                      <>
                        {status === 'pending' && (
                          <button
                            onClick={() => setSelectedAssignment(assignment)}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                          >
                            Submit
                          </button>
                        )}
                        {status === 'submitted' && (
                          <div className="text-center">
                            <p className="text-amber-400 text-sm">Awaiting grade</p>
                          </div>
                        )}
                        {status === 'graded' && submission && (
                          <div className="text-center px-4">
                            <p className="text-2xl font-bold text-emerald-400">
                              {submission.grade}/{assignment.maxPoints}
                            </p>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Teacher view submissions */}
                    {isTeacher && (
                      <button
                        onClick={() => setSelectedAssignment(assignment)}
                        className="flex items-center gap-1 px-4 py-2 text-indigo-400 hover:text-indigo-300"
                      >
                        View Submissions
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Feedback for graded submissions */}
                {submission?.feedback && (
                  <div className="mt-4 p-3 bg-[#252532] rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">Teacher Feedback:</p>
                    <p className="text-sm text-gray-300">{submission.feedback}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredByStatus.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No assignments found</p>
          </div>
        )}

        {/* Submit Assignment Modal */}
        {selectedAssignment && !isTeacher && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-xl">
              <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Submit Assignment</h2>
                <button
                  onClick={() => {
                    setSelectedAssignment(null);
                    setSubmissionContent('');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-white mb-2">{selectedAssignment.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{selectedAssignment.description}</p>
                
                <div className="mb-4 p-3 bg-[#252532] rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Instructions:</p>
                  <p className="text-sm text-gray-300">{selectedAssignment.instructions}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Answer</label>
                  <textarea
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    placeholder="Write your answer here..."
                  />
                </div>

                <button
                  onClick={handleSubmitAssignment}
                  disabled={!submissionContent.trim()}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Assignment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Teacher: View/Grade Submissions Modal */}
        {selectedAssignment && isTeacher && (
          <GradeSubmissionsModal
            assignment={selectedAssignment}
            submissions={getAssignmentSubmissions(selectedAssignment.id)}
            onClose={() => setSelectedAssignment(null)}
            onGrade={gradeSubmission}
          />
        )}

        {/* Create Assignment Modal */}
        {showCreateModal && (
          <CreateAssignmentModal
            onClose={() => setShowCreateModal(false)}
            onCreate={addAssignment}
          />
        )}
      </div>
    </div>
  );
};

// Grade Submissions Modal
const GradeSubmissionsModal: React.FC<{
  assignment: Assignment;
  submissions: typeof import('../types').Submission[];
  onClose: () => void;
  onGrade: (submissionId: string, grade: number, feedback: string) => void;
}> = ({ assignment, submissions, onClose, onGrade }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGrade = () => {
    if (!selectedSubmission || !grade) return;
    onGrade(selectedSubmission, parseInt(grade), feedback);
    setSelectedSubmission(null);
    setGrade('');
    setFeedback('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between sticky top-0 bg-[#1A1A24]">
          <div>
            <h2 className="text-lg font-semibold text-white">Submissions</h2>
            <p className="text-sm text-gray-400">{assignment.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No submissions yet</p>
          ) : (
            submissions.map(submission => (
              <div
                key={submission.id}
                className="p-4 bg-[#252532] rounded-lg border border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-white">{submission.studentName}</h4>
                    <p className="text-xs text-gray-500">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  {submission.grade !== undefined ? (
                    <div className="text-right">
                      <span className="text-lg font-bold text-emerald-400">
                        {submission.grade}/{assignment.maxPoints}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedSubmission(submission.id)}
                      className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-lg"
                    >
                      Grade
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{submission.content}</p>
                {submission.feedback && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-500 mb-1">Feedback:</p>
                    <p className="text-sm text-gray-400">{submission.feedback}</p>
                  </div>
                )}

                {selectedSubmission === submission.id && (
                  <div className="mt-4 p-4 bg-[#1A1A24] rounded-lg border border-indigo-500/30">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Grade (/{assignment.maxPoints})</label>
                        <input
                          type="number"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          max={assignment.maxPoints}
                          className="w-full px-3 py-2 bg-[#252532] border border-gray-700 rounded-lg text-white"
                          placeholder="Enter grade"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm text-gray-400 mb-1">Feedback</label>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-[#252532] border border-gray-700 rounded-lg text-white"
                        placeholder="Provide feedback..."
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleGrade}
                        className="flex-1 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                      >
                        Submit Grade
                      </button>
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="px-4 py-2 text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Create Assignment Modal
const CreateAssignmentModal: React.FC<{
  onClose: () => void;
  onCreate: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
}> = ({ onClose, onCreate }) => {
  const { currentUser, courses } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxPoints, setMaxPoints] = useState('100');
  const [instructions, setInstructions] = useState('');

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
      dueDate: new Date(dueDate).toISOString(),
      maxPoints: parseInt(maxPoints),
      instructions,
    });
    
    onClose();
  };

  const teacherCourses = courses.filter(c => c.instructorId === currentUser?.id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-xl">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Create Assignment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select a course</option>
              {teacherCourses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Points</label>
              <input
                type="number"
                value={maxPoints}
                onChange={(e) => setMaxPoints(e.target.value)}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              placeholder="Detailed instructions for students..."
            />
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
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Assignments;