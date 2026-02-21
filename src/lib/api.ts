const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export interface WeeklyTask {
  id: string;
  title: string;
  time: string;
  dow: number[];
  completed?: boolean;
  createdAt: string;
}

export const weeklyTasksApi = {
  async getAll(): Promise<WeeklyTask[]> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch weekly tasks');
    }
    return response.json();
  },

  async delete(id: string): Promise<{ id: string }> {
    const response = await fetch(`${API_BASE_URL}/api/weekly-tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Task not found');
      }
      throw new Error('Failed to delete task');
    }

    return response.json();
  },
};
