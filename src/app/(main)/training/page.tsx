// "use client"; // Server Componentに戻す

import { AddTrainingForm } from "@/app/components/AddTrainingForm";
import prisma from "../../lib/prisma";
import styles from "./page.module.css";
import { TrainingList } from "@/app/components/TrainingList";
import { TrainingChart } from "@/app/components/TrainingChart"; // TrainingChartをインポート
// import type { Training as TrainingType } from "@prisma/client"; // Prisma Clientからのインポートをコメントアウト
import type { Training as TrainingType } from "./[slug]/page"; // ローカルの型定義をインポート


export default async function TrainingPage() {
  // 遅延させている
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const trainingData = await prisma.training.findMany({
    orderBy: { work_date: "desc" },
  }) as TrainingType[];

  // 種目別合計回数の集計
  const aggregatedData: { [key: string]: number } = {};
  trainingData.forEach((item) => {
    if (aggregatedData[item.work_type]) {
      aggregatedData[item.work_type] += item.times;
    } else {
      aggregatedData[item.work_type] = item.times;
    }
  });

  const chartData = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: "種目別合計回数",
        data: Object.values(aggregatedData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  console.log("TrainingPage - trainingData:", trainingData);
  console.log("TrainingPage - aggregatedData:", aggregatedData);
  console.log("TrainingPage - chartData:", chartData);

  return (
    <div className={styles.module}>
      {Object.keys(aggregatedData).length > 0 ? ( // データがある場合のみチャートを表示
        <div className={styles.chartContainer}>
          <h3>種目別 合計回数</h3>
          <TrainingChart data={chartData} />
        </div>
      ) : (
        <p>グラフを表示するデータがありません。</p> // データがない場合のメッセージ
      )}
      <TrainingList training={trainingData} />
      <div className={styles.formWrapper}>
        <AddTrainingForm />
      </div>
    </div>
  );
}
