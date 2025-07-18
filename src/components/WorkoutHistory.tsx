'use client'

import { useState, useEffect } from 'react'
import { Workout } from '@/types'

interface WorkoutHistoryProps {
  onWorkoutSelect?: (workout: Workout) => void
}

export default function WorkoutHistory({ onWorkoutSelect }: WorkoutHistoryProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchWorkouts = async (start?: string, end?: string) => {
    try {
      setLoading(true)
      let url = '/api/workouts'
      
      if (start && end) {
        const startDateTime = new Date(start).toISOString()
        const endDateTime = new Date(end + 'T23:59:59.999Z').toISOString()
        url += `?startDate=${startDateTime}&endDate=${endDateTime}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch workouts')
      }

      const data = await response.json()
      setWorkouts(data.workouts)
      setError(null)
    } catch (err) {
      setError('ワークアウト履歴の取得に失敗しました')
      console.error('Error fetching workouts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkouts()
  }, [])

  const handleWorkoutClick = (workout: Workout) => {
    setSelectedWorkout(selectedWorkout?.id === workout.id ? null : workout)
    onWorkoutSelect?.(workout)
  }

  const handleDeleteWorkout = async (workoutId: string) => {
    if (!window.confirm('このワークアウトを削除しますか？')) {
      return
    }

    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete workout')
      }

      // ワークアウト一覧を再取得
      fetchWorkouts(startDate, endDate)
    } catch (err) {
      alert('ワークアウトの削除に失敗しました')
      console.error('Error deleting workout:', err)
    }
  }

  const handleFilterApply = () => {
    if (startDate && endDate) {
      fetchWorkouts(startDate, endDate)
    } else {
      fetchWorkouts()
    }
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '-'
    const minutes = Math.floor(seconds / 60)
    return `${minutes}分`
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(new Date(date))
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">ワークアウト履歴</h1>
        <div className="text-center py-8">読み込み中...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">ワークアウト履歴</h1>
        <div className="text-center py-8 text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ワークアウト履歴</h1>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">期間フィルター</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              開始日
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              終了日
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <button
            onClick={handleFilterApply}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            フィルター適用
          </button>
          <button
            onClick={() => {
              setStartDate('')
              setEndDate('')
              fetchWorkouts()
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            クリア
          </button>
        </div>
      </div>

      {/* ワークアウト一覧 */}
      {workouts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-2">ワークアウト履歴がありません</div>
          <div className="text-gray-400">新しいワークアウトを始めましょう！</div>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-lg shadow-sm border">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleWorkoutClick(workout)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {workout.name}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{formatDate(workout.date)}</span>
                      <span>{formatDuration(workout.duration)}</span>
                      <span>{workout.exercises.length}種目</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteWorkout(workout.id)
                    }}
                    className="text-red-600 hover:text-red-700 text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>

              {/* 詳細表示 */}
              {selectedWorkout?.id === workout.id && (
                <div className="border-t p-4 bg-gray-50">
                  {workout.notes && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">メモ</h4>
                      <p className="text-gray-700">{workout.notes}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">エクササイズ</h4>
                    {workout.exercises.length === 0 ? (
                      <p className="text-gray-500">エクササイズが記録されていません</p>
                    ) : (
                      <div className="space-y-3">
                        {workout.exercises.map((exercise) => (
                          <div key={exercise.id} className="border rounded-lg p-3 bg-white">
                            <h5 className="font-medium text-gray-900 mb-2">
                              {exercise.exercise.name}
                            </h5>
                            <div className="space-y-1">
                              {exercise.sets.map((set, index) => (
                                <div key={set.id} className="text-sm text-gray-600">
                                  セット{index + 1}: {set.reps}回
                                  {set.weight && ` × ${set.weight}kg`}
                                  {set.duration && ` (${set.duration}秒)`}
                                  {set.rest && ` - 休憩${set.rest}秒`}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}