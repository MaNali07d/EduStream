import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  BookOpen,
  Search,
  Plus,
  Users,
  Clock,
  Play,
  ChevronRight,
  FileText,
  X,
  Trash2,
} from 'lucide-react';
import clsx from 'clsx';
import type { Course, Lecture, Material } from '../types';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, 
    courses, 
    enrollInCourse, 
    getUserCourses,
    addCourse,
    deleteCourse,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const isTeacher = currentUser.role === 'teacher';
  const isAdmin = currentUser.role === 'admin';
  
  const userCourses = getUserCourses(currentUser.id);
  const teacherCourses = courses.filter(c => c.instructorId === currentUser.id);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const isEnrolled = userCourses.some(c => c.id === course.id);
    
    if (isTeacher || isAdmin) {
      return matchesSearch && matchesCategory;
    }
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(courses.map(c => c.category))];

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId, currentUser.id);
  };

  return (
    <div className="min-h-screen">
      <Header title={isTeacher || isAdmin ? "My Courses" : "Courses"} />
      
      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 bg-[#1A1A24] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-[#1A1A24] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Create Course Button (Teacher/Admin only) */}
          {(isTeacher || isAdmin) && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:from-indigo-600 hover:to-violet-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Course
            </button>
          )}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const isEnrolled = userCourses.some(c => c.id === course.id);
            const isOwner = course.instructorId === currentUser.id;
            const completedLectures = course.lectures.filter(l => l.completed).length;
            const progress = Math.round((completedLectures / course.lectures.length) * 100);

            return (
              <div
                key={course.id}
                className="bg-[#1A1A24] border border-gray-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A24] to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs bg-indigo-500/80 text-white rounded-md">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolledStudents.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>{course.lectures.length} lectures</span>
                    </div>
                  </div>

                  {/* Progress (for enrolled students) */}
                  {!isTeacher && !isAdmin && isEnrolled && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
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

                  {/* Actions */}
                  <div className="flex gap-2">
                    {isEnrolled || isOwner || isAdmin ? (
                      <button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="flex-1 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        {isOwner ? 'Manage' : 'Continue'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course.id)}
                        className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 transition-all"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-500">No courses found</p>
          </div>
        )}

        {/* Create Course Modal */}
        {showCreateModal && (
          <CreateCourseModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
};

// Create Course Modal Component
const CreateCourseModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { currentUser, addCourse } = useStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Data Science');
  const [thumbnail, setThumbnail] = useState('');
  const [lectures, setLectures] = useState<Omit<Lecture, 'id' | 'completed'>[]>([]);
  const [materials, setMaterials] = useState<Omit<Material, 'id'>[]>([]);

  const categories = ['Data Science', 'Web Development', 'Mobile Development', 'Computer Science', 'Machine Learning', 'Programming'];

  const addLecture = () => {
    setLectures([...lectures, { title: '', description: '', videoUrl: '', duration: 0 }]);
  };

  const updateLecture = (index: number, field: string, value: string | number) => {
    const updated = [...lectures];
    (updated[index] as Record<string, string | number>)[field] = value;
    setLectures(updated);
  };

  const removeLecture = (index: number) => {
    setLectures(lectures.filter((_, i) => i !== index));
  };

  const addMaterial = () => {
    setMaterials([...materials, { title: '', url: '', type: 'link' }]);
  };

  const updateMaterial = (index: number, field: string, value: string) => {
    const updated = [...materials];
    (updated[index] as Record<string, string>)[field] = value;
    setMaterials(updated);
  };

  const removeMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newCourse = {
      title,
      description,
      category,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      lectures: lectures.map((l, i) => ({ ...l, id: `lec-${Date.now()}-${i}`, completed: false })),
      materials: materials.map((m, i) => ({ ...m, id: `mat-${Date.now()}-${i}` })),
      isPublished: true,
    };

    addCourse(newCourse);
    onClose();
    navigate('/courses');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A1A24] border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Create New Course</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Introduction to Machine Learning"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                placeholder="What will students learn?"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Lectures */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">Lectures</label>
              <button
                type="button"
                onClick={addLecture}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Lecture
              </button>
            </div>
            <div className="space-y-3">
              {lectures.map((lecture, index) => (
                <div key={index} className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-300">Lecture {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeLecture(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={lecture.title}
                      onChange={(e) => updateLecture(index, 'title', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Title"
                      required
                    />
                    <input
                      type="text"
                      value={lecture.videoUrl}
                      onChange={(e) => updateLecture(index, 'videoUrl', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Video URL (YouTube embed)"
                    />
                    <input
                      type="number"
                      value={lecture.duration}
                      onChange={(e) => updateLecture(index, 'duration', parseInt(e.target.value) || 0)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Duration (min)"
                    />
                    <input
                      type="text"
                      value={lecture.description}
                      onChange={(e) => updateLecture(index, 'description', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Description"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-300">Materials</label>
              <button
                type="button"
                onClick={addMaterial}
                className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Material
              </button>
            </div>
            <div className="space-y-3">
              {materials.map((material, index) => (
                <div key={index} className="p-4 bg-[#252532] rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-300">Material {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={material.title}
                      onChange={(e) => updateMaterial(index, 'title', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="Title"
                      required
                    />
                    <input
                      type="text"
                      value={material.url}
                      onChange={(e) => updateMaterial(index, 'url', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                      placeholder="URL"
                    />
                    <select
                      value={material.type}
                      onChange={(e) => updateMaterial(index, 'type', e.target.value)}
                      className="px-3 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                    >
                      <option value="link">Link</option>
                      <option value="pdf">PDF</option>
                      <option value="document">Document</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 transition-all"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Courses;
