"use server";

import { revalidatePath } from "next/cache";

export const addTodo = async (data: FormData) => {
  const text = data.get("task") as string;
  await prisma.todo.create({ data: { text: text, isCompleted: false } });
  revalidatePath("/tasks/list");
};

export const deleteTodo = async (data: FormData) => {
  "use server";
  const id = data.get("id") as string;
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/tasks/list");
};

export const addUser = async (data: FormData) => {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  await prisma.user.create({ data: { name: name, email: email } });
  revalidatePath("/tasks/list");
};

export const deleteUser = async (data: FormData) => {
  "use server";
  const id = data.get("id") as string;
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/tasks/list");
};