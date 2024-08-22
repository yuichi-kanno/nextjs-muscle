import { AddTodoForm } from "@/app/components/AddTodoForm";
import prisma from "../../lib/prisma";
import styles from "./page.module.css";
import { TaskList } from "@/app/components/TaskList";

export default async function Tasks() {
  // 遅延させている
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const todos = await prisma.tODO.findMany();

  return (
    <div className={styles.module}>
      <TaskList todos={todos} />
      <AddTodoForm />
    </div>
  );
}
