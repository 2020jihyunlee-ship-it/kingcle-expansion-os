'use client'

import * as React from 'react'

export type Task = { id: string; title: string; timestamp: string; completed: boolean }

export function TaskItem({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  return (
    <label className="flex items-start gap-3 rounded-md border p-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1"
      />
      <div>
        <div className={"font-medium " + (task.completed ? 'line-through opacity-70' : '')}>
          {task.title}
        </div>
        <div className="text-sm text-muted-foreground">{task.timestamp}</div>
      </div>
    </label>
  )
}
