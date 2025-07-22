import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
})

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // ユーザー検索
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが間違っています' },
        { status: 401 }
      )
    }

    // パスワード確認
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが間違っています' },
        { status: 401 }
      )
    }

    // JWTトークン生成
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    // セッション保存
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      }
    })

    const response = NextResponse.json({
      message: 'ログインしました',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      }
    })

    // クッキーにトークンを設定
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24時間
    })

    return response

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}