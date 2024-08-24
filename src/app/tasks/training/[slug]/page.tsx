import styles from "./styles.module.css";
import { ja } from "date-fns/locale";
import { format } from "date-fns";
import { getTrainingById } from "@/app/lib/actions";

type Props = {
  params: {
    slug: string;
  };
};

export type Training = {
  id: string;
  work_date: Date;
  work_type: string;
  times: number;
  comment: string;
};

export default async function Page({ params }: Props) {
  const training = (await getTrainingById(params.slug)) as Training;

  return (
    <div className={styles.module}>
      <div className={styles.text}>
        {format(training.work_date, "yyyy/MM/dd", { locale: ja })}
      </div>
      <br />
      <div className={styles.text}>
        {training.work_type}を{training.times}回やった！
      </div>
      <div>コメント</div>
      <div>{training.comment}</div>
    </div>
  );
}
