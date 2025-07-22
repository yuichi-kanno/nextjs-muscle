import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface AuthUser {
  id: string
  email: string
  name: string
  isPremium: boolean
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    
    // セッションの確認
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isPremium: true,
          }
        }
      }
    })

    if (!session || session.expiresAt < new Date()) {
      return null
    }

    return session.user as AuthUser

  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function getCurrentUser(request: Request): Promise<AuthUser | null> {
  try {
    const cookies = request.headers.get('cookie')
    if (!cookies) return null

    const tokenMatch = cookies.match(/auth-token=([^;]+)/)
    if (!tokenMatch) return null

    const token = tokenMatch[1]
    return await verifyToken(token)

  } catch (error) {
    console.error('Get current user failed:', error)
    return null
  }
}