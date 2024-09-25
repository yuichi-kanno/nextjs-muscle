"use client";

import styles from "./styles.module.css";
import { ja } from "date-fns/locale";
import { format } from "date-fns";

import Link from "next/link";

type Props = {
  training: {
    id: string;
    work_date: Date;
    work_type: string;
    times: number;
    comment: string;
  }[];
};

export const TrainingList = ({ training }: Props) => {

  return (
    <ul className={styles.list}>
      {training.map((training) => {
        return (
          <li className={styles.item} key={training.id}>
            <Link href={`/training/${training.id}`}>
              <span className={styles.text}>
                {format(training.work_date, "yyyy/MM/dd", { locale: ja })}
              </span>
              <br />
              <span className={styles.text}>{training.work_type}</span>を
              <span>{training.times}</span>回やった！
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
