"use server";
import prisma from "@/lib/prisma";

export const getUsers = async (email: string) => {
  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: email,
        mode: "insensitive",
      },
    },
    take: 5,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
    },
  });

  return users.map((u) => ({
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    avatarUrl: u.avatarUrl,
  }));
};
