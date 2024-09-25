import styles from "./styles.module.css";
import Link from "next/link";

export const SideNav = () => {
  return (
    <div className={styles.module}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">TOP</Link>
        </li>
        <li className={styles.item}>
          <Link href="/tasks">タスク一覧</Link>
        </li>
        <li className={styles.item}>
          <Link href="/users">ユーザー一覧</Link>
        </li>
        <li className={styles.item}>
          <Link href="/training">筋トレ記録</Link>
        </li>
        <li className={styles.item}>他のページ</li>
      </ul>
    </div>
  );
};
