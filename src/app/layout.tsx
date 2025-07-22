import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'

export const metadata = {
  title: 'トレーニング記録アプリ',
  description: 'あなたのトレーニングを記録・管理するアプリケーション',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
