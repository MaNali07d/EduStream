import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Header from '../components/Header';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  Lightbulb,
  MessageSquare,
} from 'lucide-react';
import clsx from 'clsx';
import { getAIResponse } from '../utils/aiUtils';
import type { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const StudyAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, chatHistory, addChatMessage, clearChatHistory } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions] = useState([
    'Explain neural networks',
    'What is photosynthesis?',
    'How does Python programming work?',
    'What are data structures?',
    'Explain machine learning',
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);
    
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(input);
      const aiMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(aiMessage);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Study Assistant" />
      
      <div className="flex-1 flex flex-col p-6">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {/* Welcome Section */}
          {chatHistory.length === 0 && (
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">AI Study Assistant</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Ask me anything about your courses, and I'll explain concepts in a way that's easy to understand.
              </p>
            </div>
          )}

          {/* Suggested Questions */}
          {chatHistory.length === 0 && (
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-4 py-2 bg-[#1A1A24] border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-indigo-500/50 hover:text-white transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {chatHistory.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  'flex gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={clsx(
                    'max-w-[70%] rounded-2xl p-4',
                    message.role === 'user'
                      ? 'bg-indigo-500/20 text-white'
                      : 'bg-[#1A1A24] border border-gray-700 text-gray-200'
                  )}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    {message.content.split('\n').map((line, idx) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={idx} className="font-semibold text-indigo-300 mt-2">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('• ')) {
                        return <p key={idx} className="ml-2">• {line.slice(2)}</p>;
                      }
                      if (line.startsWith('```')) {
                        return null;
                      }
                      return <p key={idx} className="mb-1">{line}</p>;
                    })}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-[#1A1A24] border border-gray-700 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Clear Chat */}
          {chatHistory.length > 0 && (
            <div className="flex justify-center mb-4">
              <button
                onClick={clearChatHistory}
                className="text-sm text-gray-500 hover:text-gray-400"
              >
                Clear chat history
              </button>
            </div>
          )}

          {/* Input */}
          <div className="bg-[#1A1A24] border border-gray-700 rounded-xl p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-600 hover:to-violet-700 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAssistant;
