'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './AuthForm.module.css'

interface RegisterFormProps {
  onSuccess?: () => void
  onSwitchToLogin?: () => void
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません')
      setLoading(false)
      return
    }

    try {
      await register(formData.email, formData.password, formData.name)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ユーザー登録に失敗しました')
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
        <h2 className={styles.title}>新規登録</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="山田太郎"
            />
          </div>

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
              minLength={8}
              className={styles.input}
              placeholder="8文字以上"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword" className={styles.label}>
              パスワード（確認）
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className={styles.input}
              placeholder="パスワードを再入力"
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
            {loading ? '登録中...' : '新規登録'}
          </button>
        </form>

        <div className={styles.switchForm}>
          <p>
            既にアカウントをお持ちの方は
            <button
              type="button"
              onClick={onSwitchToLogin}
              className={styles.switchButton}
            >
              ログイン
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}