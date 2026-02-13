"use server";
import prisma from "@/lib/prisma";
import { getSession } from "../auth/sessions/getSession";

export const actionGetUsersBoards = async (search: string) => {
  const ownerId = await getSession();
  const boards = await prisma.board.findMany({
    where: {
      AND: [
        {
          OR: [{ ownerId }, { members: { some: { userId: ownerId } } }],
        },
        search ? { title: { contains: search, mode: "insensitive" } } : {},
      ],
    },
    include: {
      tasks: {
        select: { id: true },
      },
      members: {
        select: {
          id: true,
          user: {
            select: {
              avatarUrl: true,
            },
          },
        },
      },
    },
  });

  return boards;
};