"use server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const getUser = async () => {
  const cookie = await cookies();
  const secretKey = process.env.JWT_SECRET_KEY!;
  const token = cookie.get("session")!.value;

  const payload = jwt.verify(token, secretKey) as JwtPayload & { id: string };
  const userId = payload.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        email: true,
      },
    });

    return user;
  } catch (ex) {
    console.error(ex);
  }
};
