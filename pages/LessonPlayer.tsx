
import React, { useState, useEffect } from 'react';
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
  const navigate = useNavigate();

  const course = courses.find(c => c.id === courseId);
  const enrollment = enrollments.find(e => e.courseId === courseId);

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
      }
    }
  }, [course, lessonId]);

  if (!course || !enrollment || !currentLesson) return <div>Loading...</div>;

  const isCompleted = enrollment.progress[currentLesson.id];

  const handleToggleComplete = async () => {
    await updateLessonProgress(enrollment.id, currentLesson.id, !isCompleted);
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
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar - Course Structure */}
      <div className="w-full lg:w-80 bg-white border-r border-slate-200 overflow-y-auto order-2 lg:order-1">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 line-clamp-2">{course.title}</h2>
          <div className="mt-2 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">
            {enrollment.percentage}% Complete
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
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] ${
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
          <div className="bg-slate-900 rounded-2xl aspect-video mb-8 flex items-center justify-center text-white overflow-hidden">
             <img src={course.thumbnailUrl} className="w-full h-full object-cover opacity-50 blur-sm absolute" alt="" />
             <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4 mx-auto cursor-pointer hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.516 7.548c0-.923.951-1.471 1.674-.99l7.081 4.706a1.2 1.2 0 010 1.98l-7.081 4.706c-.723.48-1.674-.067-1.674-.99V7.548z" />
                  </svg>
                </div>
                <p className="font-medium text-lg">Watch: {currentLesson.title}</p>
             </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900">{currentLesson.title}</h1>
              <button 
                onClick={handleToggleComplete}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  isCompleted 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
                }`}
              >
                {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
              </button>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              {currentLesson.content}
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100">
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Check Your Understanding</h3>
                    <p className="text-slate-600 text-sm">Generate an AI quiz based on this lesson.</p>
                  </div>
                  {!quiz && (
                    <button 
                      onClick={handleGenerateQuiz}
                      disabled={isGeneratingQuiz}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      {isGeneratingQuiz ? 'Generating...' : 'Start Quiz'}
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
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            selectedOption === idx ? 'border-indigo-600 bg-white shadow-md' : 'border-white bg-white/50 hover:bg-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {quizResult ? (
                      <div className={`p-4 rounded-xl font-bold text-center ${
                        quizResult === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {quizResult === 'correct' ? 'Perfect! You got it right.' : 'Oops! That\'s not quite right. Try again.'}
                      </div>
                    ) : (
                      <button 
                        onClick={handleCheckQuiz}
                        disabled={selectedOption === null}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50"
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
