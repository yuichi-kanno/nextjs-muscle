import Image from "next/image";
import styles from "./page.module.css";
import { fetchTodos } from "./lib/data";
import { Header } from "./components/Header";
import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const todos = await prisma.tODO.findMany();

  const addTodo = async (data: FormData) => {
    "use server";
    const text = data.get("task") as string;
    await prisma.tODO.create({ data: { text: text, isCompleted: false } });
    revalidatePath('/');
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <ul>
          {todos.map((todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>

        <form action={addTodo}>
          <label htmlFor="task">タスク</label>
          <input type="text" name="task" />
          <button type="submit">Add Todo</button>
        </form>
      </main>
    </>
  );
}
