"use client";

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div>
      <h1>エラーですよ</h1>
      <Link href="/">トップに戻る</Link>
    </div>
  );
};
export default ErrorPage;
