"use server";
import prisma from "@/lib/prisma";

export const actionGetTasks = async (boardId: string) => {
  const tasks = await prisma.board.findUnique({
    where: {
      id: boardId,
    },
    include: {
      tasks: {
        include: {
          assignee: {
            omit: {
              createdAt: true,
              updatedAt: true,
              login: true,
              password: true,
            },
          },
        },
      },
      members: {
        select: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  return tasks;
};
