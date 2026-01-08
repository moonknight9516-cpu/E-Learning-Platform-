
import { Course, User, Enrollment, Lesson } from '../types';
import { SEED_COURSES, SEED_USERS } from '../mockData';

// Simulation of a persistent backend using LocalStorage
const STORAGE_KEYS = {
  COURSES: 'eduflow_courses',
  USERS: 'eduflow_users',
  ENROLLMENTS: 'eduflow_enrollments',
  SESSION: 'eduflow_session'
};

const getStorage = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorage = <T,>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize DB
if (!localStorage.getItem(STORAGE_KEYS.COURSES)) setStorage(STORAGE_KEYS.COURSES, SEED_COURSES);
if (!localStorage.getItem(STORAGE_KEYS.USERS)) setStorage(STORAGE_KEYS.USERS, SEED_USERS);
if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) setStorage(STORAGE_KEYS.ENROLLMENTS, []);

export const api = {
  // Auth
  getCurrentUser: async (): Promise<User | null> => {
    return getStorage<User | null>(STORAGE_KEYS.SESSION, null);
  },

  login: async (email: string): Promise<User> => {
    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('User not found');
    setStorage(STORAGE_KEYS.SESSION, user);
    return user;
  },

  logout: async () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  signup: async (name: string, email: string): Promise<User> => {
    const users = getStorage<User[]>(STORAGE_KEYS.USERS, []);
    if (users.find(u => u.email === email)) throw new Error('Email already exists');
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.USERS, [...users, newUser]);
    setStorage(STORAGE_KEYS.SESSION, newUser);
    return newUser;
  },

  // Courses
  getCourses: async (query?: { category?: string; search?: string }): Promise<Course[]> => {
    let courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    if (query?.category) courses = courses.filter(c => c.category === query.category);
    if (query?.search) {
      const s = query.search.toLowerCase();
      courses = courses.filter(c => c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s));
    }
    return courses;
  },

  getCourseBySlug: async (slug: string): Promise<Course | undefined> => {
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    return courses.find(c => c.slug === slug);
  },

  createCourse: async (courseData: Omit<Course, 'id' | 'createdAt'>): Promise<Course> => {
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    const newCourse: Course = {
      ...courseData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.COURSES, [newCourse, ...courses]);
    return newCourse;
  },

  updateCourse: async (id: string, updates: Partial<Course>): Promise<Course> => {
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Course not found');
    courses[index] = { ...courses[index], ...updates };
    setStorage(STORAGE_KEYS.COURSES, courses);
    return courses[index];
  },

  deleteCourse: async (id: string): Promise<void> => {
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    setStorage(STORAGE_KEYS.COURSES, courses.filter(c => c.id !== id));
  },

  // Enrollments
  enroll: async (userId: string, courseId: string): Promise<Enrollment> => {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
    if (enrollments.find(e => e.userId === userId && e.courseId === courseId)) {
      throw new Error('Already enrolled');
    }
    const newEnrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      progress: {},
      percentage: 0,
      enrolledAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.ENROLLMENTS, [...enrollments, newEnrollment]);
    return newEnrollment;
  },

  getEnrollments: async (userId: string): Promise<Enrollment[]> => {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
    return enrollments.filter(e => e.userId === userId);
  },

  updateProgress: async (enrollmentId: string, lessonId: string, completed: boolean): Promise<Enrollment> => {
    const enrollments = getStorage<Enrollment[]>(STORAGE_KEYS.ENROLLMENTS, []);
    const index = enrollments.findIndex(e => e.id === enrollmentId);
    if (index === -1) throw new Error('Enrollment not found');

    const enrollment = enrollments[index];
    enrollment.progress[lessonId] = completed;

    // Calculate percentage
    const courses = getStorage<Course[]>(STORAGE_KEYS.COURSES, []);
    const course = courses.find(c => c.id === enrollment.courseId);
    if (course) {
      const completedCount = Object.values(enrollment.progress).filter(Boolean).length;
      enrollment.percentage = Math.round((completedCount / course.lessons.length) * 100);
    }

    setStorage(STORAGE_KEYS.ENROLLMENTS, enrollments);
    return enrollment;
  }
};
