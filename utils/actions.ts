"use server";
import prisma from "@/lib/prisma";
import z from "zod";
import { type FormState, authScheme } from "./authValidation";
import { redirect } from "next/navigation";

export const actionLoginAuth = async (state: FormState, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validationResult = z.safeParse(
    authScheme.pick({ email: true, password: true }),
    rawData,
  );

  if (!validationResult.success) {
    return {
      errors: z.flattenError(validationResult.error).fieldErrors,
    };
  }
};
