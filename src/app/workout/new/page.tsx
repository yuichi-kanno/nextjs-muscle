'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function NewWorkoutPage() {
  const [workoutName, setWorkoutName] = useState('')
  const [selectedExercises, setSelectedExercises] = useState<Array<{
    id: string
    name: string
    category: string
  }>>([])

  // サンプルエクササイズデータ
  const exercises = [
    { id: '1', name: 'ベンチプレス', category: '胸' },
    { id: '2', name: 'スクワット', category: '脚' },
    { id: '3', name: 'デッドリフト', category: '背中' },
    { id: '4', name: 'ショルダープレス', category: '肩' },
    { id: '5', name: 'バーベルロウ', category: '背中' },
    { id: '6', name: 'ディップス', category: '胸' },
  ]

  const addExercise = (exercise: { id: string; name: string; category: string }) => {
    if (!selectedExercises.find(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise])
    }
  }

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId))
  }

  const startWorkout = () => {
    // ワークアウト開始処理（今後実装）
    alert('ワークアウトを開始しました！')
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← ダッシュボードに戻る
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>
          新しいワークアウト
        </h1>
        <p className={styles.subtitle}>
          今日のトレーニングを計画しましょう
        </p>
      </header>

      {/* ワークアウト名 */}
      <div className={styles.section}>
        <label className={styles.label}>
          ワークアウト名（オプション）
        </label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="例: Push Day, 胸・肩・三頭筋"
          className={styles.input}
        />
      </div>

      {/* 選択されたエクササイズ */}
      {selectedExercises.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            選択されたエクササイズ
          </h2>
          <div className={styles.selectedExercises}>
            {selectedExercises.map((exercise) => (
              <div key={exercise.id} className={styles.exerciseItem}>
                <div className={styles.exerciseInfo}>
                  <div className={styles.exerciseName}>{exercise.name}</div>
                  <div className={styles.exerciseCategory}>{exercise.category}</div>
                </div>
                <button
                  onClick={() => removeExercise(exercise.id)}
                  className={styles.removeButton}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* エクササイズ選択 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          エクササイズを選択
        </h2>
        <div className={styles.exerciseGrid}>
          {exercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => addExercise(exercise)}
              disabled={selectedExercises.some(ex => ex.id === exercise.id)}
              className={styles.exerciseButton}
            >
              <div className={styles.exerciseButtonName}>{exercise.name}</div>
              <div className={styles.exerciseButtonCategory}>{exercise.category}</div>
            </button>
          ))}
        </div>
      </div>

      {/* アクションボタン */}
      <div className={styles.actionButtons}>
        <button
          onClick={startWorkout}
          disabled={selectedExercises.length === 0}
          className={styles.startButton}
        >
          ワークアウト開始
        </button>
        <Link href="/" className={styles.cancelButton}>
          キャンセル
        </Link>
      </div>
    </div>
  )
}