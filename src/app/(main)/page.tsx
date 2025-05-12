import Link from "next/link"; // 重複した行を削除
import prisma from "../lib/prisma";
import styles from "./page.module.css";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
// import type { Training } from "@prisma/client"; // Prisma Clientからのインポートをコメントアウト
import type { Training } from "./training/[slug]/page"; // ローカルの型定義をインポート

export default async function Page() {
  const uncompletedTasksCount = await prisma.todo.count({
    where: { isCompleted: false },
  });
  const totalUsersCount = await prisma.user.count();
  const recentTrainings = await prisma.training.findMany({
    orderBy: { work_date: "desc" },
    take: 3,
  }) as Training[]; // 型アサーションを追加

  return (
    <div className={styles.module}>
      <h2>ダッシュボード</h2>

      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <h3>タスク管理</h3>
          <p>未完了タスク数: {uncompletedTasksCount}</p>
          <Link href="/tasks">タスク一覧へ</Link>
        </div>

        <div className={styles.dashboardCard}>
          <h3>ユーザー管理</h3>
          <p>登録ユーザー数: {totalUsersCount}</p>
          <Link href="/users">ユーザー一覧へ</Link>
        </div>

        <div className={styles.dashboardCard}>
          <h3>トレーニング記録</h3>
          {recentTrainings.length > 0 ? (
            <>
              <p>直近の記録:</p>
              <ul>
                {recentTrainings.map((training) => ( // 型指定は推論に任せる (Training[] から)
                  <li key={training.id}>
                    {format(new Date(training.work_date), "yyyy/MM/dd", { locale: ja })}: {training.work_type}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>トレーニング記録はありません。</p>
          )}
          <Link href="/training">トレーニング記録一覧へ</Link>
        </div>
      </div>
    </div>
  );
}
