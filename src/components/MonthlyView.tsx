'use client';

import React from 'react';
import { usePlanner } from '@/store/usePlanner';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 임포트

dayjs.locale('ko'); // 한국어 로케일 설정

export default function MonthlyView() {
  const { tasks } = usePlanner();
  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');
  const daysInMonth = endOfMonth.date();

  const calendarDays = [];
  let day = startOfMonth.startOf('week');

  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, 'day')) {
    for (let i = 0; i < 7; i++) {
      calendarDays.push(day);
      day = day.add(1, 'day');
    }
  }

  const getTaskProgress = (date: dayjs.Dayjs) => {
    const dayTasks = tasks.filter(
      (task) =>
        task.dow.includes(date.day()) &&
        dayjs(task.createdAt).isSame(date, 'day') // Only count tasks created on that day
    );
    const completedTasks = dayTasks.filter((task) => task.completed).length;
    const totalTasks = dayTasks.length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-200';
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-lg font-semibold mb-4">월간 계획</h2>
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-4">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((date, index) => {
          const isCurrentMonth = date.isSame(today, 'month');
          const isToday = date.isSame(today, 'day');
          const progress = getTaskProgress(date);
          const progressColor = getProgressColor(progress);

          return (
            <div
              key={index}
              className={`p-2 border rounded-lg flex flex-col items-center justify-center h-20
                        ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                        ${isToday ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
            >
              <div className={`text-sm font-bold ${isToday ? 'text-blue-600' : ''}`}>
                {date.date()}
              </div>
              <div className="mt-2 w-full h-2 rounded-full overflow-hidden">
                <div
                  className={`${progressColor} h-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {progress > 0 && (
                <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
        <h3 className="font-semibold mb-2">범례:</h3>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>100% 완료</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>부분 완료</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
          <span>미완료 또는 할 일 없음</span>
        </div>
      </div>
    </div>
  );
}
