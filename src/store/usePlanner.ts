import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { weeklyTasksApi, WeeklyTask } from '@/lib/api'

export interface Task {
  id: string
  title: string
  time: string
  dow: number[] // day of week (0=Sunday, 1=Monday, ...)
  completed?: boolean
  createdAt: string
  isWeekly?: boolean // Flag to distinguish weekly tasks
}

export interface WeeklyGoal {
  id: string
  title: string
  completed: boolean
  priority: number // 1-5 (1: highest, 5: lowest)
  createdAt: string
}

interface PlannerState {
  tasks: Task[]
  weeklyGoals: WeeklyGoal[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  addWeeklyGoal: (goal: Omit<WeeklyGoal, 'id' | 'createdAt'>) => void
  toggleWeeklyGoal: (id: string) => void
  deleteWeeklyGoal: (id: string) => void
  hydrate: () => void
  syncWeeklyTasks: () => Promise<void>
  clearAllTasks: () => void
}

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      tasks: [],
      weeklyGoals: [],
      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          completed: false,
          isWeekly: task.isWeekly || false,
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },
      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }))
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      hydrate: () => {
        // Rehydrate from localStorage
        const state = get()
        return state
      },
      syncWeeklyTasks: async () => {
        try {
          const weeklyTasks = await weeklyTasksApi.getAll();
          const currentTasks = get().tasks;
          
          // Remove ALL existing weekly tasks and add new ones from backend
          const nonWeeklyTasks = currentTasks.filter(task => !task.isWeekly);
          const backendTasks: Task[] = weeklyTasks.map(weeklyTask => ({
            ...weeklyTask,
            isWeekly: true
          }));
          
          // Force update with backend data
          set({ tasks: [...nonWeeklyTasks, ...backendTasks] });
        } catch (error) {
          console.error('Failed to sync weekly tasks:', error);
        }
      },
             addWeeklyGoal: (goal) => {
               const newGoal: WeeklyGoal = {
                 ...goal,
                 id: Date.now().toString(),
                 createdAt: new Date().toISOString(),
                 priority: goal.priority || 3, // Default priority is 3 (medium)
               }
               set((state) => ({ weeklyGoals: [...state.weeklyGoals, newGoal] }))
             },
      toggleWeeklyGoal: (id) => {
        set((state) => ({
          weeklyGoals: state.weeklyGoals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
          ),
        }))
      },
      deleteWeeklyGoal: (id) => {
        set((state) => ({
          weeklyGoals: state.weeklyGoals.filter((goal) => goal.id !== id),
        }))
      },
      clearAllTasks: () => {
        set({ tasks: [], weeklyGoals: [] });
        // Also clear localStorage
        localStorage.removeItem('planner-storage');
      },
    }),
    {
      name: 'planner-storage',
    }
  )
)
