"use server";

import { revalidatePath } from "next/cache";
import { parse } from "date-fns";
import prisma from "./prisma";
// import { Training as PrismaTraining } from "@prisma/client"; // Prisma Clientからのインポートをコメントアウト
import type { Training as PrismaTraining } from "@/app/(main)/training/[slug]/page"; // エイリアスパスを使用

export type FormState = {
  error: string;
};

export const createTask = async (state: FormState, formData: FormData) => {
  const text = formData.get("task") as string;
  const priority = formData.get("priority") as string | null;
  const dueDateString = formData.get("dueDate") as string | null;

  let dueDate: Date | null = null;
  if (dueDateString) {
    // dueDateString が空文字やnullでない場合のみパースを試みる
    const parsedDate = parse(dueDateString, "yyyy-MM-dd", new Date());
    // parseがInvalid Dateを返さないかチェックする方がより堅牢
    if (!isNaN(parsedDate.getTime())) {
      dueDate = parsedDate;
    }
  }

  try {
    await prisma.todo.create({
      data: {
        text: text,
        isCompleted: false,
        priority: priority,
        dueDate: dueDate,
      },
    });
  } catch (error) {
    console.error("Failed to create task:", error); // エラーログを追加
    state.error = "タスクの作成に失敗したよ";
    return state;
  }

  revalidatePath("/");
  return state;
};

export const deleteTodo = async (data: FormData) => {
  const id = data.get("id") as string;
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
};

export const addUser = async (data: FormData) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  await prisma.user.create({ data: { name: name, email: email } });
  revalidatePath("/");
};

export const deleteUser = async (data: FormData) => {
  const id = data.get("id") as string;
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/");
};

export const addTraining = async (data: FormData) => {
  const trainingDate = data.get("trainingDate") as string;
  const parsedDate = parse(trainingDate, "yyyy/MM/dd", new Date());
  const trainingMenu = data.get("trainingMenu") as string;
  const times = Number(data.get("times")) as number;
  const comment = data.get("comment") as string;

  console.log("addTraining - Received data:", { trainingDate, trainingMenu, times, comment }); // 受け取ったデータを確認

  try {
    console.log("addTraining - Before prisma.training.create");
    const createdTraining = await prisma.training.create({
      data: {
        work_date: parsedDate,
        work_type: trainingMenu,
        times: times,
        comment: comment,
      },
    });
    console.log("addTraining - Created training:", createdTraining);
  } catch (e) {
    console.error("addTraining - Error creating training:", e);
    // エラーが発生した場合、ここで処理を中断するか、エラー情報を返す
    // 今回はテストのため、エラーをスローせずに進むが、実際にはエラー処理が必要
    // return { error: "トレーニング記録の追加に失敗しました。" }; // FormState を返す場合
    throw e; // またはエラーを再スローする
  }

  console.log("addTraining - Before revalidatePath('/training')");
  revalidatePath("/training");
  console.log("addTraining - After revalidatePath('/training')");
  // throw new Error("Test error after revalidatePath for debugging"); // デバッグ用エラーをコメントアウト
};

export const getTrainingById = async (id: string): Promise<PrismaTraining | null> => {
  try {
    const training = await prisma.training.findUnique({
      where: {
        id: id,
      },
    });
    return training;
  } catch (error) {
    console.error("Failed to get training by id:", error);
    return null;
  }
};
