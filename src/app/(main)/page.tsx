import Link from 'next/link'

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          トレーニング記録
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          今日も最高のワークアウトを始めましょう
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* クイックアクション */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9ecef' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
            クイックアクション
          </h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/workout/new" style={{ 
              backgroundColor: '#007bff', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              ワークアウト開始
            </Link>
            <Link href="/exercises" style={{ 
              backgroundColor: '#28a745', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '8px', 
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              エクササイズ一覧
            </Link>
          </div>
        </div>

        {/* 今週の統計 */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9ecef' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
            今週の統計
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>3</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>ワークアウト</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>4.5h</div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>トレーニング時間</div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近のワークアウト */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9ecef' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '600' }}>
            最近のワークアウト
          </h2>
          <Link href="/workout/history" style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            すべて見る →
          </Link>
        </div>
        
        <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
          まだワークアウト記録がありません。<br />
          最初のワークアウトを開始しましょう！
        </div>
      </div>
    </div>
  )
}