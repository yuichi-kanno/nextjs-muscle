"use client";

import styles from "./styles.module.css";
import { deleteTodo } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import { format } from "date-fns"; // format関数をインポート
import { ja } from "date-fns/locale"; // 日本語ロケールをインポート

type Props = {
  todos: {
    id: string;
    text: string;
    isCompleted: boolean;
    priority: string | null; // priority を追加
    dueDate: Date | null; // dueDate を追加
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
            <div>
              <span className={styles.text}>{todo.text}</span>
              {todo.priority && (
                <span className={styles.priority}>優先度: {todo.priority}</span>
              )}
              {todo.dueDate && (
                <span className={styles.dueDate}>
                  期限: {format(new Date(todo.dueDate), "yyyy/MM/dd", { locale: ja })}
                </span>
              )}
            </div>
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
