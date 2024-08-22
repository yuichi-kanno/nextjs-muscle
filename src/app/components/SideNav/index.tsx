import { memo } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export const SideNav = () => {
  return (
    <div className={styles.module}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/tasks/">TOP</Link>
        </li>
        <li className={styles.item}>
          <Link href="/tasks/list">タスク一覧</Link>
        </li>
        <li className={styles.item}>
          <Link href="/tasks/users">ユーザー一覧</Link>
        </li>
        <li className={styles.item}>他のページ</li>
        <li className={styles.item}>他のページ</li>
      </ul>
    </div>
  );
};
