import { User } from "@prisma/client";
import { actionGetUsersBoards } from "./actions/user/userActions";
import { actionGetTasks } from "./actions/tasks/getTasks";
import { Columns } from "@prisma/client";
import type { IconType } from "react-icons";

export type BoardWithRelations = Awaited<
  ReturnType<typeof actionGetUsersBoards>
>[0];

export enum BoardBackgroundColor {
  ROYAL_BLUE = "rgba(64, 53, 222, 100%)",
  DUSTY_BLUE = "rgba(138, 165, 210, 100%)",
  SKY_BLUE = "rgba(101, 182, 216, 100%)",
  BLACK = "rgba(0,0,0,100%)",
  MIDNIGHT_BLUE = "rgba(30, 69, 98, 100%)",
}

export interface IColumn {
  title: string;
  Icon: IconType;
  status: Columns;
}

export type MemberUser = Omit<
  User,
  "createdAt" | "updatedAt" | "password" | "login"
>;

export type TBoardTask = NonNullable<
  Awaited<ReturnType<typeof actionGetTasks>>
>["tasks"][number];
