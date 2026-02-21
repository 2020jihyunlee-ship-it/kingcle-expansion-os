import React from 'react'
import { usePlanner } from '@/store/usePlanner'

export default function WeeklyChart() {
  const { tasks } = usePlanner()
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  const weeklyData = dayNames.map((day, index) => {
    const dayTasks = tasks.filter(task => task.dow.includes(index))
    const completedTasks = dayTasks.filter(task => task.completed).length
    const totalTasks = dayTasks.length
    const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
    
    return {
      day,
      completed: completedTasks,
      total: totalTasks,
      percentage
    }
  })

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
      <div className="space-y-3">
        {weeklyData.map((data, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{data.day}</span>
              <span className="text-gray-500">{data.completed}/{data.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(weeklyData.reduce((acc, day) => acc + day.percentage, 0) / 7)}%
          </div>
          <div className="text-sm text-gray-500">Weekly Average</div>
        </div>
      </div>
    </div>
  )
}
