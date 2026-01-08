
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { aiAssistant } from '../services/gemini';
import { Course } from '../types';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses, enrollments, enrollInCourse, auth } = useApp();
  const [course, setCourse] = useState<Course | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const found = courses.find(c => c.slug === slug);
    if (found) {
      setCourse(found);
      generateAISummary(found);
    }
  }, [slug, courses]);

  const generateAISummary = async (c: Course) => {
    setIsSummarizing(true);
    const result = await aiAssistant.getCourseSummary(c.title, c.description);
    setSummary(result);
    setIsSummarizing(false);
  };

  if (!course) return <div className="h-screen flex items-center justify-center">Loading course...</div>;

  const isEnrolled = enrollments.some(e => e.courseId === course.id);

  const handleEnroll = async () => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await enrollInCourse(course.id);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <nav className="mb-6 flex items-center text-sm text-slate-500">
            <button onClick={() => navigate('/courses')} className="hover:text-indigo-600">Courses</button>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-900">{course.category}</span>
          </nav>
          
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">{course.title}</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">{course.description}</p>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3 text-sm">✨</span>
              AI Quick Summary
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-8 rounded-2xl border border-indigo-100">
              {isSummarizing ? (
                <div className="flex items-center space-x-2 text-indigo-600 font-medium">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              ) : (
                <div className="prose prose-indigo text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {summary}
                </div>
              )}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Syllabus</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, idx) => (
                <div key={lesson.id} className="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-200 transition-all">
                  <span className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full font-bold text-sm mr-4">
                    {idx + 1}
                  </span>
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-900">{lesson.title}</h3>
                    <p className="text-sm text-slate-500">Lesson content and video</p>
                  </div>
                  <div className="text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
              <img src={course.thumbnailUrl} alt={course.title} className="w-full aspect-video object-cover" />
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-slate-900">${course.price}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Lifetime Access</span>
                </div>
                
                {isEnrolled ? (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all mb-4"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all mb-4"
                  >
                    Enroll Now
                  </button>
                )}
                
                <p className="text-xs text-center text-slate-500 mb-6">30-Day Money-Back Guarantee</p>
                
                <div className="space-y-4 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900">This course includes:</h4>
                  {[
                    'On-demand video', 'Full lifetime access', 'Certificate of completion', 'AI-generated quizzes'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
