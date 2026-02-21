"use client"

import * as React from 'react'

export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)))
  return (
    <div className="w-full rounded-md border p-2">
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span>{clamped}%</span>
      </div>
      <div className="h-2 w-full rounded bg-muted">
        <div
          className="h-2 rounded bg-black transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
