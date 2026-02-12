"use server";
import prisma from "@/lib/prisma";

export const actionGetTasks = async (boardId: string) => {
  const tasks = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      tasks: true,
    },
  });

  return tasks;
};
