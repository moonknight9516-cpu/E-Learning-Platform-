
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Course } from '../types';

const AdminPanel: React.FC = () => {
  const { courses, refreshData } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course> | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await api.deleteCourse(id);
      await refreshData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCourse) return;

    try {
      if (currentCourse.id) {
        await api.updateCourse(currentCourse.id, currentCourse);
      } else {
        await api.createCourse({
          title: currentCourse.title || '',
          slug: (currentCourse.title || '').toLowerCase().replace(/ /g, '-'),
          description: currentCourse.description || '',
          category: currentCourse.category || 'Development',
          difficulty: currentCourse.difficulty || 'Beginner',
          price: Number(currentCourse.price) || 0,
          thumbnailUrl: currentCourse.thumbnailUrl || 'https://picsum.photos/800/450',
          lessons: currentCourse.lessons || []
        });
      }
      setIsEditing(false);
      setCurrentCourse(null);
      await refreshData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Admin Console</h1>
          <p className="text-slate-600 mt-2">Manage your catalog and monitor student progress.</p>
        </div>
        <button 
          onClick={() => { setCurrentCourse({}); setIsEditing(true); }}
          className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          Add New Course
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{currentCourse?.id ? 'Edit Course' : 'Create Course'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
              <input 
                type="text" 
                required
                value={currentCourse?.title || ''}
                onChange={e => setCurrentCourse({...currentCourse, title: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              <textarea 
                required
                value={currentCourse?.description || ''}
                onChange={e => setCurrentCourse({...currentCourse, description: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                <input 
                  type="number" 
                  required
                  value={currentCourse?.price || 0}
                  onChange={e => setCurrentCourse({...currentCourse, price: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <input 
                  type="text" 
                  required
                  value={currentCourse?.category || ''}
                  onChange={e => setCurrentCourse({...currentCourse, category: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex space-x-4 pt-6">
              <button type="submit" className="flex-grow py-4 bg-indigo-600 text-white font-bold rounded-xl">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl">Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={course.thumbnailUrl} className="w-12 h-12 rounded-lg object-cover mr-4" alt="" />
                      <span className="font-bold text-slate-900">{course.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{course.category}</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">${course.price}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button 
                      onClick={() => { setCurrentCourse(course); setIsEditing(true); }}
                      className="text-indigo-600 font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(course.id)}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
