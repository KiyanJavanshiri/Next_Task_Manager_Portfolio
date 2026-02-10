import { actionGetUsersBoards } from "./actions/user/userActions"
export type BoardWithRelations = Awaited<ReturnType<typeof actionGetUsersBoards>>[0]