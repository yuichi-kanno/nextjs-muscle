import { NextRequest, NextResponse } from 'next/server'
import { WorkoutService } from '@/lib/api/workouts'
import { updateWorkoutSchema } from '@/lib/validations/workout'
import { z } from 'zod'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const workout = await WorkoutService.getById(params.id)

    if (!workout) {
      return NextResponse.json(
        { error: 'ワークアウトが見つかりません' },
        { status: 404 }
      )
    }

    return NextResponse.json({ workout }, { status: 200 })
  } catch (error) {
    console.error('ワークアウト取得エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const validatedData = updateWorkoutSchema.parse({
      ...body,
      date: body.date ? new Date(body.date) : undefined
    })

    const workout = await WorkoutService.update(params.id, validatedData)

    return NextResponse.json({ workout }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error.errors },
        { status: 400 }
      )
    }

    console.error('ワークアウト更新エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの更新に失敗しました' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await WorkoutService.delete(params.id)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('ワークアウト削除エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの削除に失敗しました' },
      { status: 500 }
    )
  }
}