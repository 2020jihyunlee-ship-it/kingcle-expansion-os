import React from 'react'
import { usePlanner } from '@/store/usePlanner'

export default function ProgressCard() {
  const { tasks } = usePlanner()
  
  const today = new Date().getDay()
  const todayTasks = tasks.filter(task => task.dow.includes(today))
  const completedToday = todayTasks.filter(task => task.completed).length
  const progress = todayTasks.length > 0 ? (completedToday / todayTasks.length) * 100 : 0

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Today's Progress</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Completed</span>
          <span>{completedToday}/{todayTasks.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}
