import { Router } from 'express';
import { deleteWeeklyTask, getWeeklyTasks } from '../services/weeklyTasks';

const router = Router();

// GET /api/weekly-tasks - List all weekly tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getWeeklyTasks();
    return res.json(tasks);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// DELETE /api/weekly-tasks/:id - Delete a weekly task
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const ok = await deleteWeeklyTask(id);
    if (!ok) return res.status(404).json({ message: 'Not found' });
    return res.json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Delete failed' });
  }
});

export default router;
