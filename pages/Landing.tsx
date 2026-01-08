
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
                Level up your skills with <span className="text-indigo-600">EduFlow</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Expert-led courses in technology, design, and business. Start your learning journey today and master the tools of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Link to="/courses" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all text-center">
                  Browse Courses
                </Link>
                <Link to="/signup" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all text-center">
                  Join for Free
                </Link>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <img 
                  src="https://picsum.photos/seed/elearning/800/600" 
                  alt="Students learning" 
                  className="relative rounded-3xl shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Courses', value: '500+' },
            { label: 'Students', value: '50k+' },
            { label: 'Instructors', value: '100+' },
            { label: 'Satisfaction', value: '99%' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose EduFlow?</h2>
            <p className="text-lg text-slate-600">We combine industry expertise with AI-powered features to provide a superior learning experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Learn from Experts', desc: 'Real-world instructors from top tech companies.', icon: '🎓' },
              { title: 'AI-Powered Support', desc: 'Get instant summaries and quizzes for every lesson.', icon: '🤖' },
              { title: 'Self-Paced Learning', desc: 'Lifetime access to all enrolled materials.', icon: '⏳' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
