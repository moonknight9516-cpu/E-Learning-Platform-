
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Course, Enrollment, AuthState } from '../types';
import { api } from '../services/api';

interface AppContextType {
  auth: AuthState;
  courses: Course[];
  enrollments: Enrollment[];
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  refreshData: () => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  updateLessonProgress: (enrollmentId: string, lessonId: string, completed: boolean) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false, isLoading: true });
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const refreshData = useCallback(async () => {
    try {
      const [fetchedCourses, user] = await Promise.all([
        api.getCourses(),
        api.getCurrentUser()
      ]);
      setCourses(fetchedCourses);
      
      if (user) {
        setAuth({ user, isAuthenticated: true, isLoading: false });
        const userEnrollments = await api.getEnrollments(user.id);
        setEnrollments(userEnrollments);
      } else {
        setAuth({ user: null, isAuthenticated: false, isLoading: false });
        setEnrollments([]);
      }
    } catch (error) {
      console.error("Data refresh failed", error);
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const login = async (email: string) => {
    const user = await api.login(email);
    setAuth({ user, isAuthenticated: true, isLoading: false });
    const userEnrollments = await api.getEnrollments(user.id);
    setEnrollments(userEnrollments);
  };

  const signup = async (name: string, email: string) => {
    const user = await api.signup(name, email);
    setAuth({ user, isAuthenticated: true, isLoading: false });
    setEnrollments([]);
  };

  const logout = async () => {
    await api.logout();
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
    setEnrollments([]);
  };

  const enrollInCourse = async (courseId: string) => {
    if (!auth.user) throw new Error("Must be logged in");
    const enrollment = await api.enroll(auth.user.id, courseId);
    setEnrollments(prev => [...prev, enrollment]);
  };

  const updateLessonProgress = async (enrollmentId: string, lessonId: string, completed: boolean) => {
    const updated = await api.updateProgress(enrollmentId, lessonId, completed);
    setEnrollments(prev => prev.map(e => e.id === enrollmentId ? updated : e));
  };

  return (
    <AppContext.Provider value={{ 
      auth, courses, enrollments, login, signup, logout, refreshData, 
      enrollInCourse, updateLessonProgress 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
