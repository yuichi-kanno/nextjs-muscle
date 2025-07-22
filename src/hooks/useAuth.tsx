'use client'

import React, { useState, useEffect, createContext, useContext, useCallback } from 'react'

interface AuthUser {
  id: string
  email: string
  name: string
  isPremium: boolean
}

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'ログインに失敗しました')
    }

    setUser(data.user)
  }

  const register = async (email: string, password: string, name: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'ユーザー登録に失敗しました')
    }

    // 登録後は自動的にログインは行わない
    // ユーザーに明示的にログインしてもらう
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 現在のユーザー情報を取得するAPI
export async function getCurrentUserServer(): Promise<AuthUser | null> {
  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Cache-Control': 'no-cache',
      },
    })
    
    if (response.ok) {
      const data = await response.json()
      return data.user
    }
    
    return null
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}