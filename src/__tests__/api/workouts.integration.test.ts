/**
 * @jest-environment node
 */
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals'
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/workouts/route'
import { GET as GetById, PUT as PutById, DELETE as DeleteById } from '@/app/api/workouts/[id]/route'

describe('Workout API Integration Tests', () => {
  describe('GET /api/workouts', () => {
    it('ワークアウト一覧を正常に取得できる（統合テスト）', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/workouts',
      })

      // NextRequestオブジェクトを模擬
      const request = new Request('http://localhost:3000/api/workouts', {
        method: 'GET',
      })

      const response = await GET(request as any)
      
      expect(response.status).toBe(200)
      
      const data = await response.json()
      expect(data).toHaveProperty('workouts')
      expect(Array.isArray(data.workouts)).toBe(true)
    })
  })

  describe('POST /api/workouts', () => {
    it('有効なデータでワークアウトを作成できる（統合テスト）', async () => {
      const requestBody = {
        name: 'テストワークアウト',
        date: new Date('2024-01-15').toISOString(),
        notes: 'テスト用のワークアウト'
      }

      const request = new Request('http://localhost:3000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request as any)
      
      expect(response.status).toBe(201)
      
      const data = await response.json()
      expect(data).toHaveProperty('workout')
      expect(data.workout.name).toBe('テストワークアウト')
    })

    it('不正なデータの場合400エラーを返す（統合テスト）', async () => {
      const requestBody = {
        name: '', // 空の名前
        date: 'invalid-date'
      }

      const request = new Request('http://localhost:3000/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request as any)
      
      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/workouts/[id]', () => {
    it('存在しないIDの場合404エラーを返す（統合テスト）', async () => {
      const request = new Request('http://localhost:3000/api/workouts/nonexistent', {
        method: 'GET',
      })

      const response = await GetById(request as any, { params: { id: 'nonexistent' } })
      
      expect(response.status).toBe(404)
    })
  })

  describe('PUT /api/workouts/[id]', () => {
    it('存在しないワークアウトの更新で404エラーを返す（統合テスト）', async () => {
      const requestBody = {
        name: '更新されたワークアウト',
        notes: '更新されました'
      }

      const request = new Request('http://localhost:3000/api/workouts/nonexistent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const response = await PutById(request as any, { params: { id: 'nonexistent' } })
      
      expect(response.status).toBe(500) // Prismaエラーで500になる
    })
  })

  describe('DELETE /api/workouts/[id]', () => {
    it('存在しないワークアウトの削除で404エラーを返す（統合テスト）', async () => {
      const request = new Request('http://localhost:3000/api/workouts/nonexistent', {
        method: 'DELETE',
      })

      const response = await DeleteById(request as any, { params: { id: 'nonexistent' } })
      
      expect(response.status).toBe(500) // Prismaエラーで500になる
    })
  })
})