/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/workouts/route'
import { GET as GetById, PUT as PutById, DELETE as DeleteById } from '@/app/api/workouts/[id]/route'
import { WorkoutService } from '@/lib/api/workouts'

// WorkoutServiceをモック
jest.mock('@/lib/api/workouts', () => ({
  WorkoutService: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getByDateRange: jest.fn(),
  },
}))

const mockWorkoutService = WorkoutService as jest.Mocked<typeof WorkoutService>

describe('/api/workouts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/workouts', () => {
    it('ワークアウト一覧を正常に取得できる', async () => {
      const mockWorkouts = [
        {
          id: 'workout1',
          name: '上半身ワークアウト',
          date: new Date('2024-01-15'),
          duration: 3600,
          notes: '良い感じでした',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-15'),
          exercises: []
        }
      ]

      mockWorkoutService.getAll.mockResolvedValue(mockWorkouts)

      const request = new NextRequest('http://localhost:3000/api/workouts')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.workouts).toHaveLength(1)
      expect(data.workouts[0].name).toBe('上半身ワークアウト')
      expect(mockWorkoutService.getAll).toHaveBeenCalled()
    })

    it('データベースエラーが発生した場合500エラーを返す', async () => {
      mockWorkoutService.getAll.mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/workouts')
      const response = await GET(request)

      expect(response.status).toBe(500)
    })
  })

  describe('POST /api/workouts', () => {
    it('有効なデータでワークアウトを作成できる', async () => {
      const mockCreatedWorkout = {
        id: 'workout1',
        name: '新しいワークアウト',
        date: new Date('2024-01-15'),
        duration: null,
        notes: 'テストワークアウト',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        exercises: []
      }

      mockWorkoutService.create.mockResolvedValue(mockCreatedWorkout)

      const requestBody = {
        name: '新しいワークアウト',
        date: '2024-01-15T00:00:00.000Z',
        notes: 'テストワークアウト'
      }

      const request = new NextRequest('http://localhost:3000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.workout.name).toBe('新しいワークアウト')
      expect(mockWorkoutService.create).toHaveBeenCalledWith({
        name: '新しいワークアウト',
        date: new Date('2024-01-15T00:00:00.000Z'),
        notes: 'テストワークアウト'
      })
    })

    it('不正なデータの場合400エラーを返す', async () => {
      const requestBody = {
        name: '', // 空の名前
        date: 'invalid-date'
      }

      const request = new NextRequest('http://localhost:3000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })
})

describe('/api/workouts/[id]', () => {
  describe('GET /api/workouts/[id]', () => {
    it('指定されたIDのワークアウトを取得できる', async () => {
      const mockWorkout = {
        id: 'workout1',
        name: '上半身ワークアウト',
        date: new Date('2024-01-15'),
        duration: 3600,
        notes: '良い感じでした',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        exercises: []
      }

      mockWorkoutService.getById.mockResolvedValue(mockWorkout)

      const request = new NextRequest('http://localhost:3000/api/workouts/workout1')
      const response = await GetById(request, { params: { id: 'workout1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.workout.name).toBe('上半身ワークアウト')
    })

    it('存在しないIDの場合404エラーを返す', async () => {
      mockWorkoutService.getById.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/workouts/nonexistent')
      const response = await GetById(request, { params: { id: 'nonexistent' } })

      expect(response.status).toBe(404)
    })
  })

  describe('PUT /api/workouts/[id]', () => {
    it('ワークアウトを正常に更新できる', async () => {
      const mockUpdatedWorkout = {
        id: 'workout1',
        name: '更新されたワークアウト',
        date: new Date('2024-01-16'),
        duration: 4200,
        notes: '更新されました',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-16'),
        exercises: []
      }

      mockWorkoutService.update.mockResolvedValue(mockUpdatedWorkout)

      const requestBody = {
        name: '更新されたワークアウト',
        notes: '更新されました'
      }

      const request = new NextRequest('http://localhost:3000/api/workouts/workout1', {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PutById(request, { params: { id: 'workout1' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.workout.name).toBe('更新されたワークアウト')
    })
  })

  describe('DELETE /api/workouts/[id]', () => {
    it('ワークアウトを正常に削除できる', async () => {
      mockWorkoutService.delete.mockResolvedValue()

      const request = new NextRequest('http://localhost:3000/api/workouts/workout1')
      const response = await DeleteById(request, { params: { id: 'workout1' } })

      expect(response.status).toBe(204)
      expect(mockWorkoutService.delete).toHaveBeenCalledWith('workout1')
    })
  })
})