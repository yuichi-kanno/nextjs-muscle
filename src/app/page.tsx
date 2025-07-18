import Link from 'next/link'
import styles from './page.module.css'

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          トレーニング記録
        </h1>
        <p className={styles.subtitle}>
          今日も最高のワークアウトを始めましょう
        </p>
      </header>

      <div className={styles.cardGrid}>
        {/* クイックアクション */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            クイックアクション
          </h2>
          <div className={styles.buttonGroup}>
            <Link href="/workout/new" className={styles.primaryButton}>
              ワークアウト開始
            </Link>
            <Link href="/exercises" className={styles.secondaryButton}>
              エクササイズ一覧
            </Link>
          </div>
        </div>

        {/* 今週の統計 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            今週の統計
          </h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>3</div>
              <div className={styles.statLabel}>ワークアウト</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statValue} ${styles.green}`}>4.5h</div>
              <div className={styles.statLabel}>トレーニング時間</div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近のワークアウト */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            最近のワークアウト
          </h2>
          <Link href="/workout/history" className={styles.textLink}>
            すべて見る →
          </Link>
        </div>
        
        <div className={styles.emptyState}>
          まだワークアウト記録がありません。<br />
          最初のワークアウトを開始しましょう！
        </div>
      </div>
    </div>
  )
}
