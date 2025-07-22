'use client'

import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/layout/Header'
import Dashboard from './dashboard'
import LandingPage from './landing'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          読み込み中...
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      {user ? <Dashboard /> : <LandingPage />}
    </div>
  )
}
