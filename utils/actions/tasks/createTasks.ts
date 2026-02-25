"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const actionCreateTasks = async (
  state: { success: boolean; message: string } | undefined,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData) as {
    boardId: string;
    title: string;
    dueDate?: string;
    description: string;
    assigneeId: string;
  };

  for (const value of Object.values(data)) {
    if (!value.trim()) {
      return {
        message: "Enter all task information",
        success: false,
      };
    }
  }

  await prisma.task.create({
    data,
  });

  revalidatePath(`/boards/${data.boardId}`);

  return {
    success: true,
    message: "",
  };
};
