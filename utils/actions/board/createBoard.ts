"use server";
import type { TBoardState } from "@/compositions/BoardCreateModal";
import prisma from "@/lib/prisma";
import { getSession } from "../auth/sessions/getSession";

export const createBoard = async (state: TBoardState, formData: FormData) => {
  const data = Object.fromEntries(formData) as {
    boardName: string;
    background: string;
  };

  if (!data.boardName.trim())
    return {
      errors: {
        boardName: "Enter at least 1 symbol",
      },
    };

  if (!data.background)
    return {
      errors: {
        background: "Choose your background",
      },
    };

  const userId = await getSession();

  prisma.$transaction(async (t) => {
    try {

    } catch (ex) {
      // return t.rollback()
    }
  });
};
