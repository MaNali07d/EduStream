import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  FileText,
  Users,
  BookOpen,
  ChevronRight,
  Circle,
} from 'lucide-react';
import clsx from 'clsx';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { 
    currentUser, 
    courses, 
    enrollInCourse, 
    markLectureComplete,
    getUserCourses,
  } = useStore();

  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!currentUser || !courseId) {
    navigate('/login');
    return null;
  }

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-500">Course not found</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-4 text-indigo-400 hover:text-indigo-300"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const userCourses = getUserCourses(currentUser.id);
  const isEnrolled = userCourses.some(c => c.id === course.id);
  const isOwner = course.instructorId === currentUser.id;

  const currentLecture = course.lectures[currentLectureIndex];
  const completedLectures = course.lectures.filter(l => l.completed).length;
  const progress = Math.round((completedLectures / course.lectures.length) * 100);

  const handleEnroll = () => {
    enrollInCourse(course.id, currentUser.id);
  };

  const handleMarkComplete = () => {
    if (currentLecture) {
      markLectureComplete(course.id, currentLecture.id, currentUser.id);
    }
  };

  const handleNextLecture = () => {
    if (currentLectureIndex < course.lectures.length - 1) {
      setCurrentLectureIndex(currentLectureIndex + 1);
      setShowVideo(true);
    }
  };

  const handlePrevLecture = () => {
    if (currentLectureIndex > 0) {
      setCurrentLectureIndex(currentLectureIndex - 1);
      setShowVideo(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F14]">
      {/* Header */}
      <div className="bg-[#1A1A24] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/courses')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-white">{course.title}</h1>
            <p className="text-sm text-gray-400">{course.instructorName}</p>
          </div>
          {isEnrolled && !isOwner && (
            <div className="text-right">
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-lg font-semibold text-indigo-400">{progress}%</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player Area */}
          <div className="aspect-video bg-[#1A1A24] relative">
            {showVideo && currentLecture ? (
              <>
                {currentLecture.videoUrl.includes('youtube') || currentLecture.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={currentLecture.videoUrl.replace('watch?v=', 'embed/')}
                    title={currentLecture.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : currentLecture.videoUrl ? (
                  <video
                    src={currentLecture.videoUrl}
                    controls
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
                      <p className="text-gray-400">Video not available</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/10 to-violet-500/10">
                <div className="text-center">
                  {isEnrolled || isOwner ? (
                    currentLecture ? (
                    <button
                        onClick={() => setShowVideo(true)}
                        className="p-4 bg-indigo-500 rounded-full hover:bg-indigo-600 transition-colors"
                      >
                        <Play className="w-8 h-8 text-white" />
                      </button>
                    ) : null
                  ) : (
                    <div>
                      <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-400 mb-4">Enroll to start learning</p>
                      <button
                        onClick={handleEnroll}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg"
                      >
                        Enroll Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Lecture Info */}
          {currentLecture && (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Lecture {currentLectureIndex + 1}: {currentLecture.title}
                  </h2>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {currentLecture.duration} minutes
                  </p>
                </div>
                {isEnrolled && !isOwner && (
                  <button
                    onClick={handleMarkComplete}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                      currentLecture.completed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    )}
                  >
                    {currentLecture.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        Mark Complete
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <p className="text-gray-300 mb-6">{currentLecture.description}</p>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <button
                  onClick={handlePrevLecture}
                  disabled={currentLectureIndex === 0}
                  className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-sm text-gray-500">
                  {currentLectureIndex + 1} of {course.lectures.length}
                </span>
                <button
                  onClick={handleNextLecture}
                  disabled={currentLectureIndex === course.lectures.length - 1}
                  className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Course Content */}
        <div className="w-full lg:w-96 bg-[#1A1A24] border-l border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-white">Course Content</h3>
            <p className="text-sm text-gray-400 mt-1">
              {completedLectures} of {course.lectures.length} completed
            </p>
            <div className="mt-3 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {course.lectures.map((lecture, index) => (
              <button
                key={lecture.id}
                onClick={() => {
                  setCurrentLectureIndex(index);
                  setShowVideo(true);
                }}
                className={clsx(
                  'w-full p-4 flex items-start gap-3 text-left border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors',
                  currentLectureIndex === index && 'bg-indigo-500/10'
                )}
              >
                <div className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                  lecture.completed ? 'bg-emerald-500' : currentLectureIndex === index ? 'bg-indigo-500' : 'bg-gray-700'
                )}>
                  {lecture.completed ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs text-white">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    'text-sm font-medium',
                    currentLectureIndex === index ? 'text-indigo-400' : 'text-white'
                  )}>
                    {lecture.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lecture.duration} min
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Materials Section */}
          {course.materials.length > 0 && (
            <div className="p-4 border-t border-gray-700">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Course Materials
              </h4>
              <div className="space-y-2">
                {course.materials.map(material => (
                  <a
                    key={material.id}
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {material.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Course Info */}
          <div className="p-4 border-t border-gray-700">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Students</span>
                <span className="text-white">{course.enrolledStudents.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Lectures</span>
                <span className="text-white">{course.lectures.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Materials</span>
                <span className="text-white">{course.materials.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
