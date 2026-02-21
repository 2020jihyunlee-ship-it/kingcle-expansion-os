import db from '../db';

export async function getWeeklyTasks() {
  try {
    // In-memory implementation:
    return db.weekly;
    
    // For Prisma implementation (uncomment when using Prisma):
    // return await db.weeklyTask.findMany();
  } catch (error) {
    console.error('Error fetching weekly tasks:', error);
    return [];
  }
}

export async function deleteWeeklyTask(id: string) {
  try {
    // In-memory implementation:
    const i = db.weekly.findIndex(t => t.id === id);
    if (i < 0) return false;
    db.weekly.splice(i, 1);
    return true;
    
    // For Prisma implementation (uncomment when using Prisma):
    // const result = await db.weeklyTask.delete({ where: { id } });
    // return true;
  } catch (error) {
    console.error('Error deleting weekly task:', error);
    return false;
  }
}
