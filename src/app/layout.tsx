import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
