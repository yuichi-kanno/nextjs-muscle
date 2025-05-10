"use client";

import styles from "./styles.module.css";
import { deleteTodo } from "@/app/lib/actions";

import { useFormStatus } from "react-dom";

type Props = {
  todos: {
    id: string;
    text: string;
    isCompleted: boolean;
  }[];
};

function DeleteButton() {
  const status = useFormStatus();

  return (
    <button
      className={styles.deleteButton}
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? "送信中..." : "削除"}
    </button>
  );
}

function PendingText() {
  const status = useFormStatus();

  return (
    <>
    {status.pending && <div>送信中だよ。もう少し待ってね。</div>}
    </>
  );
}

export const TaskList = ({ todos }: Props) => {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => {
        return (
          <li className={styles.item} key={todo.id}>
            <span className={styles.text}>{todo.text}</span>
            <PendingText />
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <DeleteButton />
            </form>
          </li>
        );
      })}
    </ul>
  );
};
