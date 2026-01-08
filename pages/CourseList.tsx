
import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/CourseCard';
import { api } from '../services/api';
import { Course } from '../types';

const CourseList: React.FC = () => {
  const { courses: allCourses } = useApp();
  const [displayCourses, setDisplayCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allCourses.map(c => c.category))];
    return cats;
  }, [allCourses]);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const fetchFilteredCourses = async () => {
    setIsLoading(true);
    try {
      const filtered = await api.getCourses({
        search: searchTerm,
        category: selectedCategory,
        difficulty: selectedDifficulty
      });
      setDisplayCourses(filtered);
    } catch (error) {
      console.error("Failed to fetch filtered courses", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search/filter
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredCourses();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedDifficulty, allCourses]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Explore Our Catalog</h1>
          <p className="text-lg text-slate-600">Master new skills with our industry-leading courses.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm min-w-[140px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Difficulty</label>
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm min-w-[140px]"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 pointer-events-none">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[400px] bg-slate-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : displayCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No matches found</h3>
          <p className="text-slate-600">We couldn't find any courses matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedDifficulty('All'); }}
            className="mt-6 px-6 py-2 bg-slate-100 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
