'use client'

import { useState } from 'react'
import { WorkoutSetInput } from '@/lib/validations/workout'
import WorkoutSetForm from './WorkoutSetForm'

interface Set {
  id: string
  reps: number
  weight?: number
  duration?: number
  rest?: number
  notes?: string
  completed: boolean
}

interface Exercise {
  id: string
  name: string
  category: string
  sets: Set[]
}

interface WorkoutSessionProps {
  workoutName: string
  onFinish: (exercises: Exercise[]) => void
  onCancel: () => void
}

export default function WorkoutSession({
  workoutName,
  onFinish,
  onCancel,
}: WorkoutSessionProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [showSetForm, setShowSetForm] = useState(false)
  const [startTime] = useState(new Date())
  const [elapsedTime, setElapsedTime] = useState(0)

  // タイマー更新（実際のアプリではuseEffectでsetIntervalを使用）
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addExercise = (exerciseName: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName,
      category: 'strength',
      sets: [],
    }
    setExercises([...exercises, newExercise])
    setCurrentExercise(newExercise)
  }

  const addSet = (setData: WorkoutSetInput) => {
    if (!currentExercise) return

    const newSet: Set = {
      id: Date.now().toString(),
      ...setData,
      completed: true,
    }

    const updatedExercise = {
      ...currentExercise,
      sets: [...currentExercise.sets, newSet],
    }

    setExercises(exercises.map(ex => 
      ex.id === currentExercise.id ? updatedExercise : ex
    ))
    setCurrentExercise(updatedExercise)
    setShowSetForm(false)
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId 
        ? { ...exercise, sets: exercise.sets.filter(set => set.id !== setId) }
        : exercise
    ))
  }

  const finishWorkout = () => {
    onFinish(exercises)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* ヘッダー */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{workoutName}</h1>
            <p className="text-sm text-gray-500">
              開始時刻: {startTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-blue-600">
              {formatTime(elapsedTime)}
            </div>
            <p className="text-xs text-gray-500">経過時間</p>
          </div>
        </div>
      </div>

      {/* エクササイズ追加 */}
      {!currentExercise && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">エクササイズを追加</h2>
          <div className="grid grid-cols-2 gap-2">
            {['ベンチプレス', 'スクワット', 'デッドリフト', 'プルアップ'].map(name => (
              <button
                key={name}
                onClick={() => addExercise(name)}
                className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 現在のエクササイズ */}
      {currentExercise && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{currentExercise.name}</h2>
            <button
              onClick={() => setCurrentExercise(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              他のエクササイズ
            </button>
          </div>

          {/* セット一覧 */}
          <div className="space-y-2 mb-4">
            {currentExercise.sets.map((set, index) => (
              <div key={set.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">#{index + 1}</span>
                  <span>{set.reps}回</span>
                  {set.weight && <span>{set.weight}kg</span>}
                  {set.duration && <span>{set.duration}秒</span>}
                </div>
                <button
                  onClick={() => removeSet(currentExercise.id, set.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  削除
                </button>
              </div>
            ))}
          </div>

          {/* セット追加ボタン */}
          {!showSetForm ? (
            <button
              onClick={() => setShowSetForm(true)}
              className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              セット追加
            </button>
          ) : (
            <div className="border-t pt-4">
              <h3 className="text-md font-medium mb-3">新しいセット</h3>
              <WorkoutSetForm
                onSubmit={addSet}
                onCancel={() => setShowSetForm(false)}
              />
            </div>
          )}
        </div>
      )}

      {/* ワークアウト完了エリア */}
      {exercises.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold mb-3">ワークアウト概要</h3>
          <div className="space-y-2 mb-4">
            {exercises.map(exercise => (
              <div key={exercise.id} className="flex justify-between">
                <span>{exercise.name}</span>
                <span className="text-gray-600">{exercise.sets.length}セット</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={finishWorkout}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ワークアウト完了
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  )
}