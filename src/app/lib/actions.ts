"use server";

import { revalidatePath } from "next/cache";

export const addTodo = async (data: FormData) => {
  const text = data.get("task") as string;
  await prisma.tODO.create({ data: { text: text, isCompleted: false } });
  revalidatePath("/tasks/list");
};

export const deleteTodo = async (data: FormData) => {
  "use server";
  const id = data.get("id") as string;
  await prisma.tODO.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/tasks/list");
};