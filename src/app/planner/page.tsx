'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PeriodTabs } from '@/components/PeriodTabs'
import TaskList from '@/components/TaskList'
import MonthlyView from '@/components/MonthlyView'
import AddTask from '@/components/AddTask'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'

export type Period = 'daily' | 'weekly' | 'monthly'

export default function PlannerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activePeriod, setActivePeriod] = useState<Period>('daily')

  useEffect(() => {
    if (status === 'loading') return // 로딩 중
    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (!session) {
    return null // 리다이렉트 중
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Kingcle Expansion OS
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <User className="w-4 h-4" />
                <span>{session.user?.name || session.user?.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Period Tabs */}
          <div className="flex justify-center">
            <PeriodTabs 
              value={activePeriod} 
              onChange={setActivePeriod} 
            />
          </div>

          {/* Add Task Section */}
          <AddTask />

          {/* Content based on active period */}
          {activePeriod === 'monthly' ? (
            <MonthlyView />
          ) : activePeriod === 'daily' ? (
            <TaskList mode="today" />
          ) : (
            <TaskList mode="week" />
          )}
        </div>
      </main>
    </div>
  )
}
