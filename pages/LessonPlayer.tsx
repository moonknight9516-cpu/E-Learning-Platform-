
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { aiAssistant } from '../services/gemini';
import { Lesson } from '../types';

const LessonPlayer: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { courses, enrollments, updateLessonProgress } = useApp();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<'correct' | 'wrong' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const course = useMemo(() => courses.find(c => c.id === courseId), [courses, courseId]);
  const enrollment = useMemo(() => enrollments.find(e => e.courseId === courseId), [enrollments, courseId]);

  useEffect(() => {
    if (course) {
      const lesson = lessonId === 'start' 
        ? course.lessons[0] 
        : course.lessons.find(l => l.id === lessonId);
      
      if (lesson) {
        setCurrentLesson(lesson);
        setQuiz(null);
        setQuizResult(null);
        setSelectedOption(null);
        setShowSuccess(false);
      }
    }
  }, [course, lessonId]);

  if (!course || !enrollment || !currentLesson) return <div className="h-screen flex items-center justify-center">Loading lesson content...</div>;

  const isCompleted = enrollment.progress[currentLesson.id];

  const nextLesson = useMemo(() => {
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id);
    return course.lessons[currentIndex + 1];
  }, [course, currentLesson]);

  const handleToggleComplete = async () => {
    const newState = !isCompleted;
    // This call updates the global state immediately
    await updateLessonProgress(enrollment.id, currentLesson.id, newState);
    
    if (newState) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsGeneratingQuiz(true);
    const data = await aiAssistant.generateLessonQuiz(currentLesson.title, currentLesson.content);
    setQuiz(data);
    setIsGeneratingQuiz(false);
  };

  const handleCheckQuiz = () => {
    if (selectedOption === quiz.answerIndex) {
      setQuizResult('correct');
    } else {
      setQuizResult('wrong');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
      {/* Sidebar - Course Structure */}
      <div className="w-full lg:w-80 bg-white border-r border-slate-200 overflow-y-auto order-2 lg:order-1">
        <div className="p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-slate-900 line-clamp-2">{course.title}</h2>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">
              {enrollment.percentage}% Complete
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
             <div 
               className="bg-indigo-600 h-full transition-all duration-700" 
               style={{ width: `${enrollment.percentage}%` }}
             ></div>
          </div>
        </div>
        <div className="p-2">
          {course.lessons.map((lesson, idx) => {
            const isActive = lesson.id === currentLesson.id;
            const isLessonCompleted = enrollment.progress[lesson.id];
            return (
              <button
                key={lesson.id}
                onClick={() => navigate(`/learn/${courseId}/${lesson.id}`)}
                className={`w-full text-left p-4 rounded-xl flex items-center space-x-3 transition-all ${
                  isActive ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] shrink-0 ${
                  isLessonCompleted ? 'bg-green-500 border-green-500 text-white' : 
                  isActive ? 'border-indigo-600 text-indigo-600' : 'border-slate-300 text-slate-400'
                }`}>
                  {isLessonCompleted ? '✓' : idx + 1}
                </div>
                <span className="flex-grow line-clamp-1 text-sm">{lesson.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-slate-50 order-1 lg:order-2">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Success Notification */}
          <div className={`fixed top-20 right-8 z-[100] transition-all duration-500 transform ${showSuccess ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4">
              <div className="bg-white/20 p-2 rounded-full">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <p className="font-bold">Progress Updated!</p>
                <p className="text-sm text-indigo-100">Your profile now reflects your hard work.</p>
              </div>
              <button onClick={() => setShowSuccess(false)} className="text-indigo-200 hover:text-white">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl aspect-video mb-8 flex items-center justify-center text-white overflow-hidden relative shadow-2xl">
             <img src={course.thumbnailUrl} className="w-full h-full object-cover opacity-30 blur-sm absolute" alt="" />
             <div className="relative z-10 text-center px-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.516 7.548c0-.923.951-1.471 1.674-.99l7.081 4.706a1.2 1.2 0 010 1.98l-7.081 4.706c-.723.48-1.674-.067-1.674-.99V7.548z" />
                  </svg>
                </div>
                <h2 className="font-bold text-2xl mb-1">{currentLesson.title}</h2>
                <p className="text-slate-300 text-sm">Lesson {course.lessons.findIndex(l => l.id === currentLesson.id) + 1} of {course.lessons.length}</p>
             </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{currentLesson.title}</h1>
                <p className="text-slate-500 font-medium">{course.title}</p>
              </div>
              <button 
                onClick={handleToggleComplete}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
                  isCompleted 
                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
              </button>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
              {currentLesson.content}
            </div>

            {/* Navigation Prompt */}
            {isCompleted && nextLesson && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-between mb-10 animate-fade-in">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Up Next</p>
                  <h4 className="font-bold text-slate-900">{nextLesson.title}</h4>
                </div>
                <button 
                  onClick={() => navigate(`/learn/${courseId}/${nextLesson.id}`)}
                  className="px-6 py-3 bg-white border border-slate-200 text-indigo-600 font-bold rounded-xl hover:border-indigo-600 transition-all flex items-center space-x-2"
                >
                  <span>Go to Next Lesson</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            )}

            <div className="mt-12 pt-12 border-t border-slate-100">
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Check Your Understanding</h3>
                    <p className="text-slate-600 text-sm">Challenge yourself with an AI-generated quiz based on this lesson.</p>
                  </div>
                  {!quiz && (
                    <button 
                      onClick={handleGenerateQuiz}
                      disabled={isGeneratingQuiz}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isGeneratingQuiz && (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      )}
                      <span>{isGeneratingQuiz ? 'Generating...' : 'Start Quiz'}</span>
                    </button>
                  )}
                </div>

                {quiz && (
                  <div className="space-y-6">
                    <p className="font-bold text-lg text-slate-900">{quiz.question}</p>
                    <div className="space-y-3">
                      {quiz.options.map((option: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => { if(!quizResult) setSelectedOption(idx); }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedOption === idx 
                              ? quizResult === 'correct' ? 'border-green-500 bg-white' : quizResult === 'wrong' ? 'border-red-500 bg-white' : 'border-indigo-600 bg-white shadow-md' 
                              : 'border-white bg-white/50 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {quizResult ? (
                      <div className="flex flex-col items-center space-y-4">
                        <div className={`w-full p-4 rounded-xl font-bold text-center ${
                          quizResult === 'correct' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          {quizResult === 'correct' ? '✨ Perfect! You got it right.' : '❌ Oops! That\'s not quite right. Try again.'}
                        </div>
                        {quizResult === 'wrong' && (
                          <button 
                            onClick={() => { setQuizResult(null); setSelectedOption(null); }}
                            className="text-indigo-600 font-bold hover:underline"
                          >
                            Try Again
                          </button>
                        )}
                      </div>
                    ) : (
                      <button 
                        onClick={handleCheckQuiz}
                        disabled={selectedOption === null}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50 shadow-lg"
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
