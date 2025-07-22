import prisma from '@/app/lib/prisma'
import { CreateExerciseInput, UpdateExerciseInput } from '@/lib/validations/exercise'
import { Exercise } from '@/types'

export class ExerciseService {
  // エクササイズ一覧取得
  static async getAll(): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    return exercises.map((exercise: any) => ({
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }))
  }

  // カテゴリ別エクササイズ取得
  static async getByCategory(category: string): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
      where: {
        category,
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return exercises.map((exercise: any) => ({
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }))
  }

  // 筋肉群別エクササイズ取得
  static async getByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
      where: {
        muscleGroups: {
          has: muscleGroup,
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return exercises.map((exercise: any) => ({
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }))
  }

  // エクササイズ詳細取得
  static async getById(id: string): Promise<Exercise | null> {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    })
    
    if (!exercise) return null
    
    return {
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }
  }

  // エクササイズ作成
  static async create(data: CreateExerciseInput): Promise<Exercise> {
    const exercise = await prisma.exercise.create({
      data,
    })
    
    return {
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }
  }

  // エクササイズ更新
  static async update(id: string, data: UpdateExerciseInput): Promise<Exercise> {
    const exercise = await prisma.exercise.update({
      where: { id },
      data,
    })
    
    return {
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }
  }

  // エクササイズ削除
  static async delete(id: string): Promise<void> {
    await prisma.exercise.delete({
      where: { id },
    })
  }

  // エクササイズ検索
  static async search(query: string): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        name: 'asc',
      },
    })
    
    return exercises.map((exercise: any) => ({
      ...exercise,
      createdAt: new Date(exercise.createdAt),
      updatedAt: new Date(exercise.updatedAt),
    }))
  }
}