"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { createTask, FormState } from "@/app/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "送信中です。今は追加できません" : "タスクを追加する"}
    </button>
  );
};

export const AddTodoForm = () => {
  const initialState: FormState = { error: "" };
  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <>
      <form action={formAction}>
        <div>
          <label htmlFor="task">タスク</label>
          <input type="text" id="task" name="task" required />
        </div>
        <div>
          <label htmlFor="priority">優先度</label>
          <select id="priority" name="priority">
            <option value="">指定なし</option>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">期限日</label>
          <input type="date" id="dueDate" name="dueDate" />
        </div>
        <SubmitButton />
        {state?.error && <p>{state.error}</p>}
      </form>
    </>
  );
};
