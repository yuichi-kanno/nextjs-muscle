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
        <label htmlFor="task">タスク</label>
        <input type="text" name="task" />
        <SubmitButton />
        {state?.error && <p>{state.error}</p>}
      </form>
    </>
  );
};
