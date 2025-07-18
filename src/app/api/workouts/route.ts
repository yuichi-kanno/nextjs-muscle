import { NextRequest, NextResponse } from 'next/server'
import { WorkoutService } from '@/lib/api/workouts'
import { createWorkoutSchema } from '@/lib/validations/workout'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let workouts
    if (startDate && endDate) {
      workouts = await WorkoutService.getByDateRange(
        new Date(startDate),
        new Date(endDate)
      )
    } else {
      workouts = await WorkoutService.getAll()
    }

    return NextResponse.json({ workouts }, { status: 200 })
  } catch (error) {
    console.error('ワークアウト取得エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createWorkoutSchema.parse({
      ...body,
      date: new Date(body.date)
    })

    const workout = await WorkoutService.create(validatedData)

    return NextResponse.json({ workout }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error.errors },
        { status: 400 }
      )
    }

    console.error('ワークアウト作成エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの作成に失敗しました' },
      { status: 500 }
    )
  }
}