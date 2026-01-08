
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { auth, enrollments, courses } = useApp();

  const enrolledData = enrollments.map(e => {
    const course = courses.find(c => c.id === e.courseId);
    return {
      ...e,
      courseTitle: course?.title || 'Unknown Course',
      totalLessons: course?.lessons.length || 0,
      slug: course?.slug || ''
    };
  });

  const chartData = enrolledData.map(d => ({
    name: d.courseTitle.substring(0, 15) + '...',
    progress: d.percentage
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900">Welcome back, {auth.user?.name}!</h1>
        <p className="text-lg text-slate-600 mt-2">Pick up where you left off and keep growing.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Your Enrolled Courses</h2>
          {enrolledData.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {enrolledData.map((data) => (
                <div key={data.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-900 line-clamp-1">{data.courseTitle}</h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {data.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <Link 
                    to={`/learn/${data.courseId}/${Object.keys(data.progress)[0] || 'start'}`}
                    className="block text-center py-2.5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all text-sm"
                  >
                    Continue Learning
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
              <p className="text-slate-500 mb-6">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl">
                Find a Course
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Learning Activity</h2>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#8b5cf6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-indigo-600 rounded-2xl p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Ready for a Quiz?</h3>
              <p className="text-indigo-100 text-sm mb-4">Complete your current module to unlock AI-powered assessment.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-7xl opacity-20 transform -rotate-12">📝</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
