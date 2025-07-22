import prisma from '@/app/lib/prisma'
import { CreateWorkoutInput, UpdateWorkoutInput, AddWorkoutExerciseInput } from '@/lib/validations/workout'
import { Workout } from '@/types'

export class WorkoutService {
  // ワークアウト一覧取得
  static async getAll(): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    
    return workouts.map((workout: any) => ({
      ...workout,
      date: new Date(workout.date),
      createdAt: new Date(workout.createdAt),
      updatedAt: new Date(workout.updatedAt),
      exercises: workout.exercises.map((we: any) => ({
        ...we,
        createdAt: new Date(we.createdAt),
        exercise: {
          ...we.exercise,
          createdAt: new Date(we.exercise.createdAt),
          updatedAt: new Date(we.exercise.updatedAt),
        },
        sets: we.sets.map((set: any) => ({
          ...set,
          createdAt: new Date(set.createdAt),
        })),
      })),
    }))
  }

  // ワークアウト詳細取得
  static async getById(id: string): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })
    
    if (!workout) return null
    
    return {
      ...workout,
      date: new Date(workout.date),
      createdAt: new Date(workout.createdAt),
      updatedAt: new Date(workout.updatedAt),
      exercises: workout.exercises.map((we: any) => ({
        ...we,
        createdAt: new Date(we.createdAt),
        exercise: {
          ...we.exercise,
          createdAt: new Date(we.exercise.createdAt),
          updatedAt: new Date(we.exercise.updatedAt),
        },
        sets: we.sets.map((set: any) => ({
          ...set,
          createdAt: new Date(set.createdAt),
        })),
      })),
    }
  }

  // ワークアウト作成
  static async create(data: CreateWorkoutInput): Promise<Workout> {
    const workout = await prisma.workout.create({
      data,
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },
    })
    
    return {
      ...workout,
      date: new Date(workout.date),
      createdAt: new Date(workout.createdAt),
      updatedAt: new Date(workout.updatedAt),
      exercises: workout.exercises.map((we: any) => ({
        ...we,
        createdAt: new Date(we.createdAt),
        exercise: {
          ...we.exercise,
          createdAt: new Date(we.exercise.createdAt),
          updatedAt: new Date(we.exercise.updatedAt),
        },
        sets: we.sets.map((set: any) => ({
          ...set,
          createdAt: new Date(set.createdAt),
        })),
      })),
    }
  }

  // ワークアウトにエクササイズ追加
  static async addExercise(workoutId: string, data: AddWorkoutExerciseInput): Promise<void> {
    await prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseId: data.exerciseId,
        notes: data.notes,
        sets: {
          create: data.sets,
        },
      },
    })
  }

  // ワークアウト更新
  static async update(id: string, data: UpdateWorkoutInput): Promise<Workout> {
    const workout = await prisma.workout.update({
      where: { id },
      data,
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },
    })
    
    return {
      ...workout,
      date: new Date(workout.date),
      createdAt: new Date(workout.createdAt),
      updatedAt: new Date(workout.updatedAt),
      exercises: workout.exercises.map((we: any) => ({
        ...we,
        createdAt: new Date(we.createdAt),
        exercise: {
          ...we.exercise,
          createdAt: new Date(we.exercise.createdAt),
          updatedAt: new Date(we.exercise.updatedAt),
        },
        sets: we.sets.map((set: any) => ({
          ...set,
          createdAt: new Date(set.createdAt),
        })),
      })),
    }
  }

  // ワークアウト削除
  static async delete(id: string): Promise<void> {
    await prisma.workout.delete({
      where: { id },
    })
  }

  // 期間別ワークアウト取得
  static async getByDateRange(startDate: Date, endDate: Date): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })
    
    return workouts.map((workout: any) => ({
      ...workout,
      date: new Date(workout.date),
      createdAt: new Date(workout.createdAt),
      updatedAt: new Date(workout.updatedAt),
      exercises: workout.exercises.map((we: any) => ({
        ...we,
        createdAt: new Date(we.createdAt),
        exercise: {
          ...we.exercise,
          createdAt: new Date(we.exercise.createdAt),
          updatedAt: new Date(we.exercise.updatedAt),
        },
        sets: we.sets.map((set: any) => ({
          ...set,
          createdAt: new Date(set.createdAt),
        })),
      })),
    }))
  }
}