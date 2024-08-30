"use client";
import { useFormState, useFormStatus } from "react-dom";


import styles from "./styles.module.css";
import { deleteTodo } from "@/app/lib/actions";
import { addTodo } from "@/app/lib/actions";

function PendingText() {
  const status = useFormStatus();

  return (
    <>
    {status.pending && <div>送信中だよ。もう少し待ってね。</div>}
    </>
  );
}

export const AddTodoForm = () => {
  return (
    <>
    
    <PendingText />
    <form action={addTodo}>
      <label htmlFor="task">タスク</label>
      <input type="text" name="task" />
      <button type="submit">Add Todo</button>
    </form>
    </>
  );
};
