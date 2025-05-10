import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import styles from './layout.module.css'

type Props = {
  children: React.ReactNode
}
export default function TasksLayout({children}: Props) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <SideNav />
        {children}
      </main>
    </>
  );
}
