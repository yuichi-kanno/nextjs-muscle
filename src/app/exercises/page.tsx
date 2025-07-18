'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function ExercisesPage() {
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルエクササイズデータ
  const exercises = [
    { id: '1', name: 'ベンチプレス', category: '胸', equipment: 'バーベル', instructions: '胸筋を鍛える基本的なエクササイズ' },
    { id: '2', name: 'インクラインベンチプレス', category: '胸', equipment: 'バーベル', instructions: '胸筋上部を重点的に鍛える' },
    { id: '3', name: 'ダンベルフライ', category: '胸', equipment: 'ダンベル', instructions: '胸筋のストレッチを重視したエクササイズ' },
    { id: '4', name: 'スクワット', category: '脚', equipment: 'バーベル', instructions: '脚全体を鍛える最重要エクササイズ' },
    { id: '5', name: 'レッグプレス', category: '脚', equipment: 'マシン', instructions: '安全に高重量を扱える脚のエクササイズ' },
    { id: '6', name: 'デッドリフト', category: '背中', equipment: 'バーベル', instructions: '全身を使う最強のエクササイズ' },
    { id: '7', name: 'プルアップ', category: '背中', equipment: '自重', instructions: '背中と上腕二頭筋を鍛える' },
    { id: '8', name: 'ショルダープレス', category: '肩', equipment: 'ダンベル', instructions: '肩の前部と中部を鍛える' },
    { id: '9', name: 'ラテラルレイズ', category: '肩', equipment: 'ダンベル', instructions: '肩の中部を集中的に鍛える' },
    { id: '10', name: 'バーベルカール', category: '腕', equipment: 'バーベル', instructions: '上腕二頭筋を鍛える基本エクササイズ' },
    { id: '11', name: 'トライセップエクステンション', category: '腕', equipment: 'ダンベル', instructions: '上腕三頭筋を集中的に鍛える' }
  ]

  const categories = ['すべて', '胸', '背中', '脚', '肩', '腕']

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'すべて' || exercise.category === selectedCategory
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← ダッシュボードに戻る
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>
          エクササイズ一覧
        </h1>
        <p className={styles.subtitle}>
          利用可能なエクササイズを探索してください
        </p>
      </header>

      {/* 検索とフィルタ */}
      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="エクササイズ名で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        
        <div className={styles.categoryFilters}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* エクササイズ一覧 */}
      <div className={styles.exerciseGrid}>
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className={styles.exerciseCard}>
            <div className={styles.exerciseHeader}>
              <div>
                <h3 className={styles.exerciseTitle}>
                  {exercise.name}
                </h3>
                <div className={styles.tagGroup}>
                  <span className={styles.categoryTag}>
                    {exercise.category}
                  </span>
                  <span className={styles.equipmentTag}>
                    {exercise.equipment}
                  </span>
                </div>
              </div>
            </div>
            
            <p className={styles.exerciseDescription}>
              {exercise.instructions}
            </p>
            
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>
                ワークアウトに追加
              </button>
              <button className={styles.secondaryButton}>
                詳細を見る
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className={styles.emptyState}>
          <p>条件に一致するエクササイズが見つかりませんでした。</p>
          <p>検索条件を変更してお試しください。</p>
        </div>
      )}
    </div>
  )
}