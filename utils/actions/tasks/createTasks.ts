"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const actionCreateTasks = async (formData: FormData) => {
  const boardId = "698b208a5f64061f9d9cde71";
  await prisma.task.createMany({
    data: [
      {
        title: "Setup project structure",
        description: "Create initial folders and base configuration",
        boardId,
        status: "TODO",
      },
      {
        title: "Design database schema",
        description: "Define models and relations in Prisma",
        boardId,
        status: "TODO",
      },
      {
        title: "Implement authentication",
        description: "Add login and registration flow",
        boardId,
        status: "IN_PROGRESS",
      },
      {
        title: "Create board UI",
        description: "Implement main board layout with columns",
        boardId,
        status: "IN_PROGRESS",
      },
      {
        title: "Deploy project",
        description: "Setup production environment and deploy",
        boardId,
        status: "DONE",
      },
    ],
  });

  revalidatePath(`/boards/698b208a5f64061f9d9cde71`);
};
