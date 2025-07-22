'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/auth/AuthModal'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
  }

  if (loading) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            FitTracker
          </Link>
          <div className={styles.loading}>読み込み中...</div>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            FitTracker
          </Link>

          <nav className={styles.nav}>
            {user ? (
              <>
                <Link href="/dashboard" className={styles.navLink}>
                  ダッシュボード
                </Link>
                <Link href="/workouts" className={styles.navLink}>
                  ワークアウト
                </Link>
                <Link href="/nutrition" className={styles.navLink}>
                  栄養管理
                </Link>
                {user.isPremium && (
                  <span className={styles.premiumBadge}>Premium</span>
                )}
              </>
            ) : (
              <div className={styles.guestNav}>
                <Link href="/features" className={styles.navLink}>
                  機能
                </Link>
                <Link href="/pricing" className={styles.navLink}>
                  料金
                </Link>
              </div>
            )}
          </nav>

          <div className={styles.authSection}>
            {user ? (
              <div className={styles.userMenu}>
                <button
                  className={styles.userButton}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  {user.name}
                  <span className={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </button>
                
                {userMenuOpen && (
                  <div className={styles.dropdown}>
                    <Link href="/profile" className={styles.dropdownItem}>
                      プロフィール
                    </Link>
                    <Link href="/settings" className={styles.dropdownItem}>
                      設定
                    </Link>
                    {!user.isPremium && (
                      <Link href="/upgrade" className={styles.dropdownItem}>
                        プレミアムにアップグレード
                      </Link>
                    )}
                    <hr className={styles.divider} />
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authButtons}>
                <button
                  onClick={() => handleAuthClick('login')}
                  className={styles.loginButton}
                >
                  ログイン
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className={styles.registerButton}
                >
                  無料で始める
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}