import Link from "next/link"

const NotFountPage = () => {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <Link href='/'>トップに戻る</Link>
    </div>
  )
}

export default NotFountPage