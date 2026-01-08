
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { auth, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                EduFlow
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/courses" className="text-slate-600 hover:text-indigo-600 font-medium">Browse Courses</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {auth.isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium">Dashboard</Link>
                {auth.user?.role === 'admin' && (
                  <Link to="/admin" className="text-slate-600 hover:text-indigo-600 font-medium">Admin</Link>
                )}
                <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium">Log in</Link>
                <Link to="/signup" className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                  Join Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
