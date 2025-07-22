import { NextRequest, NextResponse } from 'next/server'
import { WorkoutService } from '@/lib/api/workouts'
import { updateWorkoutSchema } from '@/lib/validations/workout'
import { z } from 'zod'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const workout = await WorkoutService.getById(id)

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const body = await request.json()
    const validatedData = updateWorkoutSchema.parse({
      ...body,
      date: body.date ? new Date(body.date) : undefined
    })

    const workout = await WorkoutService.update(id, validatedData)

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await WorkoutService.delete(id)

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('ワークアウト削除エラー:', error)
    return NextResponse.json(
      { error: 'ワークアウトの削除に失敗しました' },
      { status: 500 }
    )
  }
}