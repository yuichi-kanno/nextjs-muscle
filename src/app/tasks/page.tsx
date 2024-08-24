import { Suspense } from "react";
import Tasks from "./list/page";
import styles from "./page.module.css";
import Users from "./users/page";

export default async function Page() {
  return (
    <div className={styles.module}>
      <div className={styles.content}>
        <Suspense fallback={<div>タスクを読み込み中</div>}>
          <Tasks />
        </Suspense>
      </div>
      <div className={styles.content}>
        <Suspense fallback={<div>ユーザーを読み込み中</div>}>
          　
          <Users />
        </Suspense>
      </div>
    </div>
  );
}
