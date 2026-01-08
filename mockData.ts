
import { Course, User } from './types';

export const SEED_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@eduflow.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  }
];

export const SEED_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Modern Web Development with React',
    slug: 'modern-web-development-react',
    description: 'Master React 18, Hooks, and the modern ecosystem. Build production-grade applications from scratch.',
    category: 'Development',
    difficulty: 'Intermediate',
    price: 99.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l1', title: 'Introduction to React 18', content: 'Explore concurrent rendering and new features.', order: 1 },
      { id: 'l2', title: 'State Management with Context', content: 'Learn when to use Context over Redux.', order: 2 },
      { id: 'l3', title: 'Advanced Hooks', content: 'Deep dive into useMemo, useCallback, and custom hooks.', order: 3 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    title: 'UI/UX Design Essentials',
    slug: 'ui-ux-design-essentials',
    description: 'Learn the principles of modern design. Master Figma and build stunning user interfaces.',
    category: 'Design',
    difficulty: 'Beginner',
    price: 49.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l4', title: 'Design Thinking Process', content: 'Empathize, Define, Ideate, Prototype, Test.', order: 1 },
      { id: 'l5', title: 'Figma Fundamentals', content: 'Components, Auto-layout, and Prototyping.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c4',
    title: 'Data Structures & Algorithms',
    slug: 'data-structures-algorithms',
    description: 'The foundation of Computer Science. Master Big O notation, trees, graphs, and dynamic programming.',
    category: 'Computer Science',
    difficulty: 'Intermediate',
    price: 79.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l8', title: 'Complexity Analysis', content: 'Mastering Big O notation and space-time tradeoffs.', order: 1 },
      { id: 'l9', title: 'Graph Theory', content: 'BFS, DFS, and Dijkstra\'s algorithm explained.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c5',
    title: 'Introduction to Machine Learning',
    slug: 'intro-machine-learning',
    description: 'Learn to build predictive models. Covers regression, classification, and neural networks using Python.',
    category: 'Computer Science',
    difficulty: 'Advanced',
    price: 149.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l10', title: 'Supervised Learning', content: 'Linear regression and decision trees.', order: 1 },
      { id: 'l11', title: 'Neural Networks 101', content: 'Understanding backpropagation and activation functions.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c6',
    title: 'Human Anatomy & Physiology',
    slug: 'human-anatomy-physiology',
    description: 'A comprehensive guide to the human body systems. Perfect for medical students and nursing prep.',
    category: 'Medical',
    difficulty: 'Intermediate',
    price: 119.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l12', title: 'The Skeletal System', content: 'Bone structure, classification, and joints.', order: 1 },
      { id: 'l13', title: 'Cardiovascular Dynamics', content: 'Heart anatomy and blood flow mechanics.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c7',
    title: 'Clinical Pharmacology',
    slug: 'clinical-pharmacology',
    description: 'Understand drug interactions, pharmacokinetics, and clinical applications in patient care.',
    category: 'Medical',
    difficulty: 'Advanced',
    price: 139.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l14', title: 'Pharmacokinetics', content: 'Absorption, Distribution, Metabolism, and Excretion.', order: 1 },
      { id: 'l15', title: 'Antibiotic Stewardship', content: 'Proper use and resistance mechanisms.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c8',
    title: 'Bioethics & Professionalism',
    slug: 'bioethics-professionalism',
    description: 'Navigating ethical dilemmas in modern medicine. Patient rights, consent, and end-of-life care.',
    category: 'Medical',
    difficulty: 'Beginner',
    price: 59.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l16', title: 'Informed Consent', content: 'The legal and moral requirements for patient autonomy.', order: 1 },
      { id: 'l17', title: 'Confidentiality (HIPAA)', content: 'Maintaining privacy in the digital age.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c3',
    title: 'Advanced Node.js Microservices',
    slug: 'advanced-node-microservices',
    description: 'Architect scalable backend systems using Node.js, Docker, and Kubernetes.',
    category: 'Development',
    difficulty: 'Advanced',
    price: 129.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    lessons: [
      { id: 'l6', title: 'Event-Driven Architecture', content: 'RabbitMQ and Kafka in microservices.', order: 1 },
      { id: 'l7', title: 'Dockerizing Node Apps', content: 'Optimizing Dockerfiles for production.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  }
];
