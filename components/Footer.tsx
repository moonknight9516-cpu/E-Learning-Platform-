
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold text-slate-900">EduFlow</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge technology and expert-led education.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Courses</a></li>
              <li><a href="#" className="hover:text-indigo-600">For Business</a></li>
              <li><a href="#" className="hover:text-indigo-600">Learning Paths</a></li>
              <li><a href="#" className="hover:text-indigo-600">Certificates</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Subscribe</h4>
            <p className="text-sm text-slate-500 mb-4">Get the latest course updates and news.</p>
            <div className="flex">
              <input type="email" placeholder="Email" className="bg-slate-50 border border-slate-200 rounded-l-lg px-4 py-2 w-full outline-none focus:ring-1 focus:ring-indigo-500" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg font-bold hover:bg-indigo-700">Go</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>© 2025 EduFlow Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Twitter</a>
            <a href="#" className="hover:text-indigo-600">LinkedIn</a>
            <a href="#" className="hover:text-indigo-600">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
