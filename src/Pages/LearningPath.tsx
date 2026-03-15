import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  Route,
  Sparkles,
  Clock,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import { generateLearningPath } from '../utils/aiUtils';
import type { LearningWeek } from '../types';

const LearningPath: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useStore();
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [subject, setSubject] = useState('Data Science');
  const [goal, setGoal] = useState('');
  const [learningPath, setLearningPath] = useState<LearningWeek[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const subjects = [
    'Data Science',
    'Web Development',
    'Machine Learning',
    'Mobile Development',
    'Programming Basics',
  ];

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const path = generateLearningPath(subject, skillLevel, goal);
    setLearningPath(path);
    setIsGenerating(false);
  };

  const totalHours = learningPath?.reduce((acc, week) => acc + week.estimatedHours, 0) || 0;

  return (
    <div className="min-h-screen">
      <Header title="Learning Path Generator" />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">Personalized Learning Path</h2>
                <p className="text-gray-400 text-sm">
                  Tell us about your learning goals, and we'll create a structured week-by-week roadmap to help you achieve them.
                </p>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                >
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Skill Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSkillLevel(level)}
                      className={clsx(
                        'py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors',
                        skillLevel === level
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-[#252532] text-gray-400 border border-gray-700 hover:border-gray-600'
                      )}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Learning Goal</label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#252532] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="What do you want to achieve? E.g., 'I want to become a data scientist in 2 months'"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!goal.trim() || isGenerating}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-lg hover:from-indigo-600 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Your Path...
                </>
              ) : (
                <>
                  <Route className="w-5 h-5" />
                  Generate Learning Path
                </>
              )}
            </button>
          </div>

          {/* Generated Learning Path */}
          {learningPath && (
            <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Your Learning Roadmap</h3>
                  <p className="text-sm text-gray-400">
                    {subject} • {skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)} • {learningPath.length} weeks
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Duration</p>
                  <p className="text-xl font-bold text-indigo-400">{totalHours} hours</p>
                </div>
              </div>

              <div className="space-y-4">
                {learningPath.map((week, idx) => (
                  <div
                    key={week.week}
                    className="relative"
                  >
                    {/* Connector Line */}
                    {idx < learningPath.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-700" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* Week Number */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
                          <span className="text-lg font-bold text-indigo-400">{week.week}</span>
                        </div>
                      </div>

                      {/* Week Content */}
                      <div className="flex-1 p-4 bg-[#252532] rounded-xl border border-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{week.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Clock className="w-3 h-3" />
                              {week.estimatedHours} hours
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs bg-gray-700 text-gray-400 rounded">
                            Week {week.week}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {week.topics.map((topic, topicIdx) => (
                            <div key={topicIdx} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-2">💡 Tips for Success</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Dedicate consistent time each week to study</li>
                  <li>• Practice with real projects after each topic</li>
                  <li>• Join online communities for support</li>
                  <li>• Review and revise regularly</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
