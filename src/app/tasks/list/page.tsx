
import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import styles from './page.module.css'

export default async function Tasks() {
  // 遅延させている
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const todos = await prisma.tODO.findMany();

  const addTodo = async (data: FormData) => {
    "use server";
    const text = data.get("task") as string;
    await prisma.tODO.create({ data: { text: text, isCompleted: false } });
    revalidatePath('/');
  };

  return (
    <div className={styles.module}>
        <ul className={styles.list}>
          {todos.map((todo) => {
            return <li className={styles.item} key={todo.id}>{todo.text}</li>;
          })}
        </ul>

        <form action={addTodo}>
          <label htmlFor="task">タスク</label>
          <input type="text" name="task" />
          <button type="submit">Add Todo</button>
        </form>
    </div>
  );
}
