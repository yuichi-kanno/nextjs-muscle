import styles from "./styles.module.css";
import { deleteTodo } from "@/app/lib/actions";
import { addTodo } from "@/app/lib/actions";



export const AddTodoForm = () => {
  return (
    <form action={addTodo}>
        <label htmlFor="task">タスク</label>
        <input type="text" name="task" />
        <button type="submit">Add Todo</button>
      </form>
  );
};
