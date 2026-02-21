'use client'

import React, { useState } from 'react'
import { usePlanner, WeeklyGoal } from '@/store/usePlanner'

export default function WeeklyGoals() {
  const [newGoal, setNewGoal] = useState('')
  const [priority, setPriority] = useState(3) // Default priority is 3 (medium)
  const { weeklyGoals, addWeeklyGoal, toggleWeeklyGoal, deleteWeeklyGoal } = usePlanner()

  const addGoal = () => {
    if (newGoal.trim()) {
      addWeeklyGoal({
        title: newGoal.trim(),
        completed: false,
        priority: priority
      })
      setNewGoal('')
      setPriority(3) // Reset to default priority
    }
  }

  const toggleGoal = (id: string) => {
    toggleWeeklyGoal(id)
  }

  const deleteGoal = (id: string) => {
    deleteWeeklyGoal(id)
  }

  const completedCount = weeklyGoals.filter(goal => goal.completed).length
  const totalCount = weeklyGoals.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'text-red-600 bg-red-50 border-red-200'
      case 2: return 'text-orange-600 bg-orange-50 border-orange-200'
      case 3: return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 4: return 'text-blue-600 bg-blue-50 border-blue-200'
      case 5: return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return '매우 높음'
      case 2: return '높음'
      case 3: return '보통'
      case 4: return '낮음'
      case 5: return '매우 낮음'
      default: return '보통'
    }
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">주간 목표</h2>
        <div className="text-sm text-gray-500">
          {completedCount}/{totalCount} 완료 ({progressPercentage}%)
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Add Goal Input */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addGoal()}
            placeholder="새로운 주간 목표를 입력하세요"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            추가
          </button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">우선순위:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>1 - 매우 높음</option>
            <option value={2}>2 - 높음</option>
            <option value={3}>3 - 보통</option>
            <option value={4}>4 - 낮음</option>
            <option value={5}>5 - 매우 낮음</option>
          </select>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-2">
        {weeklyGoals.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            아직 주간 목표가 없습니다. 위에서 목표를 추가해보세요
          </p>
        ) : (
          weeklyGoals
            .sort((a, b) => a.priority - b.priority) // Sort by priority (1 = highest)
            .map((goal) => (
            <div key={goal.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal.id)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`font-medium ${goal.completed ? 'line-through text-gray-500' : ''}`}>
                    {goal.title}
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(goal.priority)}`}>
                    P{goal.priority} - {getPriorityLabel(goal.priority)}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(goal.createdAt).toLocaleDateString('ko-KR')}
                </div>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
              >
                삭제
              </button>
            </div>
          ))
        )}
      </div>

      {/* Motivational Message */}
      {totalCount > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            {progressPercentage === 100 
              ? "🎉 모든 주간 목표를 달성했습니다! 훌륭해요"
              : progressPercentage >= 75
              ? "🚀 거의 다 왔습니다! 조금만 더 힘내세요"
              : progressPercentage >= 50
              ? "💪 절반 이상 완료했습니다! 계속 화이팅"
              : "🌱 시작이 반입니다! 꾸준히 해보세요"
            }
          </p>
        </div>
      )}
    </div>
  )
}
