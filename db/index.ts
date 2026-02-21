// Database configuration
// This is a placeholder - replace with your actual database setup

// For Prisma:
// import { PrismaClient } from '@prisma/client';
// export const db = new PrismaClient();

// For in-memory store:
interface WeeklyTask {
  id: string;
  title: string;
  time: string;
  dow: number[];
  completed?: boolean;
  createdAt: string;
}

const store = {
  weekly: [
    {
      id: 'weekly-1',
      title: '주간 목표 점검',
      time: '09:00',
      dow: [1],
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'weekly-2', 
      title: '학습 콘텐츠 2개',
      time: '20:00',
      dow: [3],
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'weekly-3',
      title: '헬스 3회',
      time: '19:00',
      dow: [1, 3, 5],
      completed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'weekly-4',
      title: '주간 회고 작성',
      time: '18:00',
      dow: [5],
      completed: false,
      createdAt: new Date().toISOString()
    }
  ] as WeeklyTask[]
};

export default store;
