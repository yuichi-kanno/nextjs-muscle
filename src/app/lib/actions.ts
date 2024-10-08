"use server";

import { revalidatePath } from "next/cache";
import { parse } from "date-fns";
import prisma from "./prisma";

export type FormState = {
  error: string;
};

export const createTask = async (state: FormState, formData: FormData) => {
  const text = formData.get("task") as string;

  try {
    await prisma.todo.create({ data: { text: text, isCompleted: false } });
  } catch (error) {
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

  await prisma.training.create({
    data: {
      work_date: parsedDate,
      work_type: trainingMenu,
      times: times,
      comment: comment,
    },
  });

  revalidatePath("/");
};

export type Training = {
  id: string;
  work_date: Date;
  work_type: string;
  times: number;
  comment: string;
};

export const getTrainingById = async (id: string) => {
  const training = await prisma.training
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((res: any) => res)
    .catch((error: any) => console.log(error));

  return training;
};
