'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './AuthForm.module.css'

interface LoginFormProps {
  onSuccess?: () => void
  onSwitchToRegister?: () => void
}

export default function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(formData.email, formData.password)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>ログイン</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="example@email.com"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              パスワード
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="8文字以上"
            />
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className={styles.switchForm}>
          <p>
            アカウントをお持ちでない方は
            <button
              type="button"
              onClick={onSwitchToRegister}
              className={styles.switchButton}
            >
              新規登録
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}