"use server";

import { revalidatePath } from "next/cache";
import { parse } from "date-fns";
import prisma from "./prisma";

export const addTodo = async (data: FormData) => {
	const textValue = data.get("task");
	if (typeof textValue !== "string" || textValue.trim() === "") {
		console.error("Task text is missing or invalid");
		return;
	}
	const text = textValue;

	try {
		await prisma.todo.create({ data: { text: text, isCompleted: false } });
		revalidatePath("/tasks");
	} catch (error) {
		console.error("Failed to add todo:", error);
	}
};

export const deleteTodo = async (data: FormData) => {
	const idValue = data.get("id");
	if (typeof idValue !== "string" || idValue.trim() === "") {
		console.error("Todo ID is missing or invalid");
		return;
	}
	const id = idValue;

	try {
		await prisma.todo.delete({
			where: {
				id: id,
			},
		});
		revalidatePath("/tasks");
	} catch (error) {
		console.error("Failed to delete todo:", error);
	}
};

export const addUser = async (data: FormData) => {
	const nameValue = data.get("name");
	const emailValue = data.get("email");

	if (typeof nameValue !== "string" || nameValue.trim() === "") {
		console.error("User name is missing or invalid");
		return;
	}
	const name = nameValue;

	if (typeof emailValue !== "string" || emailValue.trim() === "") {
		console.error("User email is missing or invalid");
		return;
	}
	// 簡単なメールアドレス形式チェック
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(emailValue)) {
		console.error("Invalid email format");
		return;
	}
	const email = emailValue;

	try {
		await prisma.user.create({ data: { name: name, email: email } });
		revalidatePath("/tasks");
	} catch (error) {
		console.error("Failed to add user:", error);
	}
};

export const deleteUser = async (data: FormData) => {
	const idValue = data.get("id");
	if (typeof idValue !== "string" || idValue.trim() === "") {
		console.error("User ID is missing or invalid");
		return;
	}
	const id = idValue;

	try {
		await prisma.user.delete({
			where: {
				id: id,
			},
		});
		revalidatePath("/tasks");
	} catch (error) {
		console.error("Failed to delete user:", error);
	}
};

export const addTraining = async (data: FormData) => {
	const trainingDateString = data.get("trainingDate") as string;
	const trainingMenu = data.get("trainingMenu") as string;
	const timesString = data.get("times") as string;
	const comment = data.get("comment") as string;

	let parsedDate: Date;
	try {
		parsedDate = parse(trainingDateString, "yyyy/MM/dd", new Date());
		if (isNaN(parsedDate.getTime())) {
			throw new Error("Invalid date format");
		}
	} catch (error) {
		console.error("Failed to parse training date:", error);
		return; // エラー時は処理を中断
	}

	const times = Number(timesString);
	if (isNaN(times)) {
		console.error("Invalid times format:", timesString);
		return; // エラー時は処理を中断
	}

	try {
		await prisma.training.create({
			data: {
				work_date: parsedDate,
				work_type: trainingMenu,
				times: times,
				comment: comment,
			},
		});
		revalidatePath("/tasks");
	} catch (error) {
		console.error("Failed to add training:", error);
		// ここでは revalidatePath を呼ばない
	}
};

export type Training = {
	id: string;
	work_date: Date;
	work_type: string;
	times: number;
	comment: string;
};

export const getTrainingById = async (id: string): Promise<Training | null> => {
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
