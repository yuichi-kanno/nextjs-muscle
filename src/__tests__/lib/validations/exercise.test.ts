import { describe, it, expect } from '@jest/globals'
import { createExerciseSchema, updateExerciseSchema } from '@/lib/validations/exercise'

describe('Exercise Validation', () => {
  describe('createExerciseSchema', () => {
    it('有効なエクササイズデータを受け入れる', () => {
      const validData = {
        name: 'ベンチプレス',
        category: 'strength' as const,
        muscleGroups: ['chest', 'arms'],
        description: '胸筋を鍛える基本的なエクササイズ',
        instructions: '1. ベンチに横になる\n2. バーベルを胸まで下ろす\n3. 押し上げる',
      }

      const result = createExerciseSchema.safeParse(validData)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    it('必須フィールドが欠けている場合はエラーを返す', () => {
      const invalidData = {
        // name が欠けている
        category: 'strength' as const,
        muscleGroups: ['chest'],
      }

      const result = createExerciseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1)
        expect(result.error.issues[0].path).toEqual(['name'])
      }
    })

    it('エクササイズ名が長すぎる場合はエラーを返す', () => {
      const invalidData = {
        name: 'a'.repeat(101), // 101文字
        category: 'strength' as const,
        muscleGroups: ['chest'],
      }

      const result = createExerciseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('エクササイズ名は100文字以内で入力してください')
      }
    })

    it('無効なカテゴリの場合はエラーを返す', () => {
      const invalidData = {
        name: 'テストエクササイズ',
        category: 'invalid_category',
        muscleGroups: ['chest'],
      }

      const result = createExerciseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('筋肉群が空の場合はエラーを返す', () => {
      const invalidData = {
        name: 'テストエクササイズ',
        category: 'strength' as const,
        muscleGroups: [],
      }

      const result = createExerciseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('少なくとも1つの筋肉群を選択してください')
      }
    })

    it('筋肉群が多すぎる場合はエラーを返す', () => {
      const invalidData = {
        name: 'テストエクササイズ',
        category: 'strength' as const,
        muscleGroups: ['chest', 'back', 'shoulders', 'arms', 'legs', 'glutes'], // 6つ
      }

      const result = createExerciseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('筋肉群は最大5つまで選択できます')
      }
    })

    it('オプションフィールドなしでも有効', () => {
      const validData = {
        name: 'テストエクササイズ',
        category: 'strength' as const,
        muscleGroups: ['chest'],
      }

      const result = createExerciseSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('updateExerciseSchema', () => {
    it('部分的な更新データを受け入れる', () => {
      const partialData = {
        name: '新しいエクササイズ名',
      }

      const result = updateExerciseSchema.safeParse(partialData)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.name).toBe('新しいエクササイズ名')
      }
    })

    it('空のオブジェクトも受け入れる', () => {
      const result = updateExerciseSchema.safeParse({})
      expect(result.success).toBe(true)
    })
  })
})