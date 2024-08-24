import { AddTrainingForm } from "@/app/components/AddTrainingForm";
import prisma from "../../lib/prisma";
import styles from "./page.module.css";
import { AddUserForm } from "@/app/components/AddUserForm";
import { TrainingList } from "@/app/components/TrainingList";

export default async function Training() {
  // 遅延させている
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const training = await prisma.training.findMany();

  return (
    <div className={styles.module}>
      <TrainingList training={training} />
      <div className={styles.formWrapper}>
        <AddTrainingForm />
      </div>
    </div>
  );
}
