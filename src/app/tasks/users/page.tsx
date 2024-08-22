import prisma from "../../lib/prisma";
import styles from "./page.module.css";
import { UserList } from "@/app/components/UserList";
import { AddUserForm } from "@/app/components/AddUserForm";

export default async function Users() {
  // 遅延させている
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const users = await prisma.user.findMany();

  return (
    <div className={styles.module}>
      <UserList users={users} />
      <AddUserForm />
    </div>
  );
}
