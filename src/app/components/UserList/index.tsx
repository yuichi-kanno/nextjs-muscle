"use client";

import styles from "./styles.module.css";
import { deleteUser } from "@/app/lib/actions";

import { useFormState, useFormStatus } from "react-dom";

type Props = {
  users: {
    id: string;
    name: string;
    email: string;
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

export const UserList = ({ users }: Props) => {
  const status = useFormStatus();

  return (
    <ul className={styles.list}>
      {users.map((user) => {
        return (
          <li className={styles.item} key={user.id}>
            <span className={styles.text}>{user.name}</span>
            <span className={styles.text}>{user.email}</span>
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <DeleteButton />
            </form>
          </li>
        );
      })}
    </ul>
  );
};
