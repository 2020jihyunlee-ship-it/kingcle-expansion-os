import React, { useState } from 'react'
import { usePlanner } from '@/store/usePlanner'

export default function AddTask() {
  const { addTask } = usePlanner()
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('09:00')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [isWeekly, setIsWeekly] = useState(false)

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && selectedDays.length > 0) {
      addTask({
        title: title.trim(),
        time,
        dow: selectedDays,
        isWeekly: isWeekly,
      })
      setTitle('')
      setTime('09:00')
      setSelectedDays([])
      setIsWeekly(false)
    }
  }

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">새 할 일 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">할 일 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="할 일을 입력하세요"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">할 일 유형</label>
          <div className="flex gap-4 mb-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="taskType"
                checked={!isWeekly}
                onChange={() => setIsWeekly(false)}
                className="mr-2"
              />
              일일 할 일
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="taskType"
                checked={isWeekly}
                onChange={() => setIsWeekly(true)}
                className="mr-2"
              />
              주간 할 일
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">요일</label>
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleDay(index)}
                className={`p-2 text-xs rounded ${
                  selectedDays.includes(index)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          할 일 추가
        </button>
      </form>
    </div>
  )
}
