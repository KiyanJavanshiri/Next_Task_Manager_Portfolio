"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteBoard = async (boardId: string, formData: FormData) => {
  await prisma.$transaction([
    prisma.boardMember.deleteMany({
      where: {
        boardId: boardId,
      },
    }),
    prisma.task.deleteMany({
      where: {
        boardId: boardId,
      },
    }),
    prisma.board.delete({
      where: {
        id: boardId,
      },
    }),
  ]);

  revalidatePath("/boards");
};

export const leaveBoard = async (
  boardId: string,
  userId: string,
  formData: FormData,
) => {
  await prisma.$transaction([
    prisma.boardMember.deleteMany({
      where: {
        boardId: boardId,
        userId: userId,
      },
    }),
    prisma.task.updateMany({
      where: {
        boardId,
        assigneeId: userId,
      },
      data: {
        assigneeId: null,
      },
    }),
  ]);

  revalidatePath("/boards");
};
