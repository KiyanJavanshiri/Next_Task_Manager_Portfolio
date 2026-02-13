import type { BoardWithRelations } from "@/utils/types";
import { getSession } from "@/utils/actions/auth/sessions/getSession";
import { actionGetUsersBoards } from "@/utils/actions/user/userActions";
import BoardItem from "@/components/Board/BoardItem";

const BoardContainer = async ({ search }: { search: string }) => {
  const userId = await getSession();
  const boards: BoardWithRelations[] = await actionGetUsersBoards(search);
  console.log("boards: ", boards);

  return boards.length ? (
    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardItem board={board} userId={userId} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-40 text-2xl leading-[143%] text-gray-500 font-medium text-center">
      No any boards here
    </p>
  );
};

export default BoardContainer;
