"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import z from "zod";
import { type FormState, authScheme } from "@/utils/authValidation";
import { redirect } from "next/navigation";
import { createSession } from "./sessions/createSession";

export const actionLoginAuth = async (state: FormState, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validationResult = z.safeParse(
    authScheme.pick({ login: true, password: true }),
    rawData,
  );

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const { login, password } = validationResult.data;

  const user = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });

  if (!user) {
    return {
      message: "User was not found",
    };
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return {
      message: "Password is incorrect",
    };
  }

  await createSession(user.id);
  redirect("/");
};

export const actionSignUpAuth = async (
  state: FormState,
  formData: FormData,
) => {
  const rawData = Object.fromEntries(formData);
  const validationResult = z.safeParse(authScheme, rawData);

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }

  const data = validationResult.data;
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  redirect("/sign-in");
};
