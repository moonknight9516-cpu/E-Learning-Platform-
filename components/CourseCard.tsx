
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link to={`/courses/${course.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={course.thumbnailUrl} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex space-x-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm rounded-md text-indigo-600 shadow-sm">
              {course.category}
            </span>
            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md shadow-sm ${
              course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
              course.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
            }`}>
              {course.difficulty}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {course.title}
          </h3>
          <p className="mt-2 text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {course.description}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center text-slate-500 text-sm">
              <svg className="w-4 h-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-slate-900">4.9</span>
              <span className="mx-1">•</span>
              <span>{course.lessons.length} lessons</span>
            </div>
            <span className="text-xl font-bold text-indigo-600">
              ${course.price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
