
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
    thumbnailUrl: 'https://picsum.photos/seed/react/800/450',
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
    thumbnailUrl: 'https://picsum.photos/seed/design/800/450',
    lessons: [
      { id: 'l4', title: 'Design Thinking Process', content: 'Empathize, Define, Ideate, Prototype, Test.', order: 1 },
      { id: 'l5', title: 'Figma Fundamentals', content: 'Components, Auto-layout, and Prototyping.', order: 2 },
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
    thumbnailUrl: 'https://picsum.photos/seed/node/800/450',
    lessons: [
      { id: 'l6', title: 'Event-Driven Architecture', content: 'RabbitMQ and Kafka in microservices.', order: 1 },
      { id: 'l7', title: 'Dockerizing Node Apps', content: 'Optimizing Dockerfiles for production.', order: 2 },
    ],
    createdAt: new Date().toISOString(),
  }
];
