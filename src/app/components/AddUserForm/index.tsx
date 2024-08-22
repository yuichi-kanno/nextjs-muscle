import styles from "./styles.module.css";
import { deleteTodo } from "@/app/lib/actions";
import { addUser } from "@/app/lib/actions";



export const AddUserForm = () => {
  return (
    <form action={addUser}>
        <label htmlFor="name">名前</label>
        <input type="text" name="name" />
        <label htmlFor="email">メールアドレス</label>
        <input type="email" name="email" />
        <button type="submit">Add User</button>
      </form>
  );
};
