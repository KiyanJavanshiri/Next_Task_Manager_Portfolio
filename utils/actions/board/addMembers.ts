"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addMembers = async (
  state: { success: boolean } | undefined,
  formData: FormData,
) => {
  const boardId = formData.get("boardId") as string;
  const userIds = formData.getAll("userIds") as string[];
  await prisma.boardMember.createMany({
    data: userIds.map((id) => ({
      boardId,
      userId: id,
    })),
  });

  revalidatePath(`/boards/${boardId}`);

  return { success: true };
};
