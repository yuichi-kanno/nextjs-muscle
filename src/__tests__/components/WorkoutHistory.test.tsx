import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkoutHistory from '@/components/WorkoutHistory'
import { Workout } from '@/types'

// fetch APIをモック
global.fetch = jest.fn()

const mockWorkouts: Workout[] = [
  {
    id: 'workout1',
    name: '上半身ワークアウト',
    date: new Date('2024-01-15'),
    duration: 3600,
    notes: '良い感じでした',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    exercises: [
      {
        id: 'we1',
        workoutId: 'workout1',
        exerciseId: 'ex1',
        notes: '',
        createdAt: new Date('2024-01-15'),
        exercise: {
          id: 'ex1',
          name: 'ベンチプレス',
          category: 'strength',
          muscleGroups: ['chest', 'triceps'],
          description: '',
          instructions: '',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15')
        },
        sets: [
          {
            id: 'set1',
            workoutExerciseId: 'we1',
            reps: 10,
            weight: 80,
            duration: null,
            rest: 120,
            notes: '',
            createdAt: new Date('2024-01-15')
          }
        ]
      }
    ]
  },
  {
    id: 'workout2',
    name: '下半身ワークアウト',
    date: new Date('2024-01-14'),
    duration: 4200,
    notes: 'きつかった',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    exercises: []
  }
]

describe('WorkoutHistory', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('ワークアウト履歴が正常に表示される', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ workouts: mockWorkouts }),
    } as Response)

    render(<WorkoutHistory />)

    expect(screen.getByText('ワークアウト履歴')).toBeInTheDocument()
    expect(screen.getByText('読み込み中...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('上半身ワークアウト')).toBeInTheDocument()
      expect(screen.getByText('下半身ワークアウト')).toBeInTheDocument()
    })

    expect(screen.getByText('2024/1/15')).toBeInTheDocument()
    expect(screen.getByText('2024/1/14')).toBeInTheDocument()
    expect(screen.getByText('60分')).toBeInTheDocument() // 3600秒 = 60分
    expect(screen.getByText('70分')).toBeInTheDocument() // 4200秒 = 70分
  })

  it('エラーが発生した場合エラーメッセージが表示される', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(<WorkoutHistory />)

    await waitFor(() => {
      expect(screen.getByText('ワークアウト履歴の取得に失敗しました')).toBeInTheDocument()
    })
  })

  it('ワークアウトをクリックすると詳細が表示される', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ workouts: mockWorkouts }),
    } as Response)

    const user = userEvent.setup()
    render(<WorkoutHistory />)

    await waitFor(() => {
      expect(screen.getByText('上半身ワークアウト')).toBeInTheDocument()
    })

    await user.click(screen.getByText('上半身ワークアウト'))

    expect(screen.getByText('ベンチプレス')).toBeInTheDocument()
    expect(screen.getByText('10回 × 80kg')).toBeInTheDocument()
    expect(screen.getByText('良い感じでした')).toBeInTheDocument()
  })

  it('日付フィルターが機能する', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ workouts: mockWorkouts }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ workouts: [mockWorkouts[0]] }),
      } as Response)

    const user = userEvent.setup()
    render(<WorkoutHistory />)

    await waitFor(() => {
      expect(screen.getByText('上半身ワークアウト')).toBeInTheDocument()
    })

    // 開始日を設定
    const startDateInput = screen.getByLabelText('開始日')
    await user.type(startDateInput, '2024-01-15')

    // 終了日を設定
    const endDateInput = screen.getByLabelText('終了日')
    await user.type(endDateInput, '2024-01-15')

    // フィルター適用
    await user.click(screen.getByText('フィルター適用'))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch).toHaveBeenLastCalledWith(
        '/api/workouts?startDate=2024-01-15T00:00:00.000Z&endDate=2024-01-15T23:59:59.999Z'
      )
    })
  })

  it('ワークアウト削除機能が動作する', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ workouts: mockWorkouts }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ workouts: [mockWorkouts[1]] }),
      } as Response)

    // window.confirmをモック
    window.confirm = jest.fn(() => true)

    const user = userEvent.setup()
    render(<WorkoutHistory />)

    await waitFor(() => {
      expect(screen.getByText('上半身ワークアウト')).toBeInTheDocument()
    })

    // 削除ボタンをクリック
    const deleteButton = screen.getAllByText('削除')[0]
    await user.click(deleteButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/workouts/workout1', {
        method: 'DELETE',
      })
      expect(screen.queryByText('上半身ワークアウト')).not.toBeInTheDocument()
    })
  })

  it('空の履歴の場合適切なメッセージが表示される', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ workouts: [] }),
    } as Response)

    render(<WorkoutHistory />)

    await waitFor(() => {
      expect(screen.getByText('ワークアウト履歴がありません')).toBeInTheDocument()
      expect(screen.getByText('新しいワークアウトを始めましょう！')).toBeInTheDocument()
    })
  })
})