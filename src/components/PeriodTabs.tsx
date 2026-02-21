'use client'

import * as React from 'react'

export type Period = 'daily' | 'weekly' | 'monthly'

export function PeriodTabs({ value, onChange }: { value: Period; onChange: (p: Period) => void }) {
  return (
    <div className="inline-flex gap-1 rounded-md border p-1">
      {(['daily', 'weekly', 'monthly'] as Period[]).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={
            'rounded-md px-3 py-1 text-sm capitalize ' +
            (value === p ? 'bg-black text-white' : 'hover:bg-muted')
          }
          aria-pressed={value === p}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
