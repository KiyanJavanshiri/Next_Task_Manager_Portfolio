"use server";
import { ProfileFormState } from "@/compositions/ProfileEditForm";
import { MemberUser } from "@/utils/types";
import prisma from "@/lib/prisma";
import { authScheme } from "@/utils/authValidation";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateUser = async (
  state: ProfileFormState,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validResult = z.safeParse(
    authScheme.omit({ login: true, password: true }),
    rawData,
  );

  if (!validResult.success) {
    return {
      errors: z.flattenError(validResult.error).fieldErrors,
    };
  }

  const mainData = validResult.data;

  const id = formData.get("id")?.toString();
  const avatarUrl = formData.get("avatarUrl")?.toString() ?? "";

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...mainData,
      avatarUrl,
    },
  });

  revalidatePath("/profile");

  return { ...state, success: true };
};
