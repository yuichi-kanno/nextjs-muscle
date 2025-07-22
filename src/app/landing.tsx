'use client'

import { useState } from 'react'
import AuthModal from '@/components/auth/AuthModal'
import styles from './landing.module.css'

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')

  const handleGetStarted = () => {
    setAuthMode('register')
    setAuthModalOpen(true)
  }

  const handleLogin = () => {
    setAuthMode('login')
    setAuthModalOpen(true)
  }

  const features = [
    {
      title: 'ワークアウト記録',
      description: 'トレーニング内容を詳細に記録し、プログレスを追跡',
      icon: '💪'
    },
    {
      title: '栄養管理',
      description: 'カロリーや栄養素を管理して理想の体作りをサポート',
      icon: '🥗'
    },
    {
      title: 'プログレス可視化',
      description: 'チャートとグラフで成長を視覚的に確認',
      icon: '📊'
    },
    {
      title: 'カスタムプラン',
      description: 'あなたの目標に合わせたワークアウトプランを作成',
      icon: '🎯'
    },
    {
      title: 'エクササイズガイド',
      description: '動画付きの詳細なエクササイズ解説',
      icon: '🎥'
    },
    {
      title: 'データ分析',
      description: 'AIが分析したパフォーマンスの洞察を提供',
      icon: '🤖'
    }
  ]

  const plans = [
    {
      name: 'フリー',
      price: '¥0',
      period: '永続無料',
      features: [
        'ワークアウト記録（基本）',
        'エクササイズライブラリ',
        '基本的な統計',
        'プログレストラッキング'
      ],
      buttonText: '無料で始める',
      isPrimary: false
    },
    {
      name: 'プレミアム',
      price: '¥980',
      period: '月額',
      features: [
        'すべての機能制限なし',
        '詳細な栄養管理',
        'カスタムワークアウトプラン',
        '動画エクササイズガイド',
        'AI分析とレコメンデーション',
        'データエクスポート',
        '優先サポート'
      ],
      buttonText: 'プレミアムを試す',
      isPrimary: true
    }
  ]

  return (
    <>
      <main className={styles.main}>
        {/* ヒーローセクション */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                あなたのフィットネス
                <br />
                <span className={styles.gradient}>革命を始めよう</span>
              </h1>
              <p className={styles.heroDescription}>
                科学的なデータ分析とパーソナライズされたプランで、
                理想の体作りを効率的にサポートします。
              </p>
              <div className={styles.heroButtons}>
                <button
                  onClick={handleGetStarted}
                  className={styles.primaryButton}
                >
                  無料で始める
                </button>
                <button
                  onClick={handleLogin}
                  className={styles.secondaryButton}
                >
                  ログイン
                </button>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.mockup}>
                📱 アプリのモックアップ
              </div>
            </div>
          </div>
        </section>

        {/* 機能セクション */}
        <section className={styles.features}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              フィットネス目標達成のための完全なツール
            </h2>
            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 料金プラン */}
        <section className={styles.pricing}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              シンプルな料金プラン
            </h2>
            <div className={styles.pricingGrid}>
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`${styles.pricingCard} ${plan.isPrimary ? styles.primary : ''}`}
                >
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.planPrice}>
                    {plan.price}
                    <span className={styles.planPeriod}>/{plan.period}</span>
                  </div>
                  <ul className={styles.planFeatures}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className={styles.planFeature}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleGetStarted}
                    className={`${styles.planButton} ${plan.isPrimary ? styles.primaryButton : styles.secondaryButton}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>
              今すぐフィットネス革命を始めませんか？
            </h2>
            <p className={styles.ctaDescription}>
              無料アカウントを作成して、あなたの理想の体作りを始めましょう。
            </p>
            <button
              onClick={handleGetStarted}
              className={styles.ctaButton}
            >
              無料で始める
            </button>
          </div>
        </section>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}