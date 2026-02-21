import React from 'react'
import { usePlanner, Task } from '@/store/usePlanner'

interface TaskListProps {
  mode: 'today' | 'week'
}

export default function TaskList({ mode }: TaskListProps) {
  const { tasks, toggleTask, deleteTask } = usePlanner()
  
  const today = new Date().getDay()
  const filteredTasks = mode === 'today'
    ? tasks.filter(task => !task.isWeekly && task.dow.includes(today)) // Daily tasks only for today
    : tasks.filter(task => task.isWeekly) // Weekly tasks only

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleDeleteWeekly = (taskId: string) => {
    // Simply remove from local state - no backend API call needed
    deleteTask(taskId);
  };

  // For weekly tasks, group by day of week
  const weeklyTasksByDay = filteredTasks.reduce((acc, task) => {
    task.dow.forEach(day => {
      if (!acc[day]) acc[day] = [];
      acc[day].push(task);
    });
    return acc;
  }, {} as Record<number, typeof filteredTasks>);

  // Get current week starting from today
  const getWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - currentDay + i);
      weekDays.push({
        dayIndex: i,
        dayName: dayNames[i],
        date: day.getDate(),
        isToday: i === currentDay
      });
    }
    return weekDays;
  };

  const weekDays = getWeekDays();
  
  // Split week days into two rows: Mon-Thu and Fri-Sun
  const firstRowDays = weekDays.slice(1, 5); // Mon, Tue, Wed, Thu
  const secondRowDays = weekDays.slice(5, 7).concat(weekDays.slice(0, 1)); // Fri, Sat, Sun

  if (mode === 'week') {
    return (
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">주간 계획</h2>
        
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">예정된 주간 계획이 없습니다</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {/* First row: Mon, Tue, Wed, Thu */}
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-gray-600">할 일</th>
                  {firstRowDays.map(({ dayIndex, dayName, date, isToday }) => (
                    <th key={dayIndex} className={`text-center p-2 font-medium text-sm ${isToday ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                      <div>{dayName}</div>
                      <div className="text-xs">{date}</div>
                    </th>
                  ))}
                  <th className="text-center p-2 font-medium text-gray-600">관리</th>
                </tr>
                {/* Second row: Fri, Sat, Sun, Feedback */}
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-gray-600"></th>
                  {secondRowDays.map(({ dayIndex, dayName, date, isToday }) => (
                    <th key={dayIndex} className={`text-center p-2 font-medium text-sm ${isToday ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}>
                      <div>{dayName}</div>
                      <div className="text-xs">{date}</div>
                    </th>
                  ))}
                  <th className="text-center p-2 font-medium text-sm text-gray-600">피드백</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={task.completed || false}
                          onChange={() => toggleTask(task.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div>
                          <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </div>
                          <div className="text-sm text-gray-500">{task.time}</div>
                        </div>
                      </div>
                    </td>
                    {/* First row cells: Mon, Tue, Wed, Thu */}
                    {firstRowDays.map(({ dayIndex }) => (
                      <td key={dayIndex} className="text-center p-2">
                        {task.dow.includes(dayIndex) ? (
                          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-200 rounded-full mx-auto"></div>
                        )}
                      </td>
                    ))}
                    <td className="text-center p-2">
                      <button
                        onClick={() => handleDeleteWeekly(task.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Second row for each task: Fri, Sat, Sun, Feedback */}
                {filteredTasks.map((task) => (
                  <tr key={`${task.id}-row2`} className="border-b hover:bg-gray-50">
                    <td className="p-2"></td>
                    {secondRowDays.map(({ dayIndex }) => (
                      <td key={dayIndex} className="text-center p-2">
                        {task.dow.includes(dayIndex) ? (
                          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-200 rounded-full mx-auto"></div>
                        )}
                      </td>
                    ))}
                    <td className="text-center p-2">
                      <div className="w-3 h-3 bg-gray-200 rounded-full mx-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">오늘의 할 일</h2>
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">예정된 할 일이 없습니다</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <input
                type="checkbox"
                checked={task.completed || false}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div className="flex-1">
                <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </div>
                <div className="text-sm text-gray-500">
                  {task.time} • {task.dow.map(d => dayNames[d]).join(', ')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}