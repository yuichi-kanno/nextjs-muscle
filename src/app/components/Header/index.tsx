import { memo } from 'react';
import styles from './styles.module.css'

export const Header = () => {
  

  return (
    <header className={styles.module}>
      <h1 className={styles.title}>筋トレ記録したいかも</h1>
        <ul className={styles.list}>
          <li>マイページ</li>
          <li>他のページ</li>
        </ul>
    </header>
  );
};
