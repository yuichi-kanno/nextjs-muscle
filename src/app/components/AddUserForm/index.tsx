import styles from "./styles.module.css";
import { addUser } from "@/app/lib/actions";

export const AddUserForm = () => {
  return (
    <form action={addUser}>
      <div>
        <label htmlFor="name" className={styles.label}>
          名前
        </label>
        <input type="text" name="name" />
      </div>
      <div>
        <label htmlFor="email" className={styles.label}>
          メールアドレス
        </label>
        <input type="email" name="email" />
      </div>
      <div className={styles.buttonWrapper}>
        <button type="submit">Add User</button>
      </div>
    </form>
  );
};
