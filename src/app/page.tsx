import Image from "next/image";
import styles from "./page.module.css";
import { fetchTodos } from "./lib/data";

export default async function Page() {
  const todos = await fetchTodos();


  return (
    <div>{todos.map((todo) => {
      return (
        <div key={todo.id}>{todo.text}</div>
      )
    })}</div>
  );
}
