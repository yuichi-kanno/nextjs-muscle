import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth-token')?.value

    if (authToken) {
      // セッションを削除
      await prisma.session.deleteMany({
        where: { token: authToken }
      })
    }

    const response = NextResponse.json({
      message: 'ログアウトしました'
    })

    // クッキーを削除
    response.cookies.delete('auth-token')

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}