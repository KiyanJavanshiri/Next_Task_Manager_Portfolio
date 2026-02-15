"use server";
import { Columns } from "@/lib/generated/prisma/enums";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeTaskStatus = async (
  taskId: string,
  boardId: string,
  status: Columns,
) => {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });

  revalidatePath(`/boards/${boardId}`);
};
