import type { BoardWithRelations } from "@/utils/types";
import {
  actionCreateBoards,
  actionGetUsersBoards,
} from "@/utils/actions/user/userActions";
import BoardItem from "@/components/BoardItem";
import BoardCreateModal from "./BoardCreateModal";

const BoardContainer = async ({ search }: { search: string }) => {
  const boards: BoardWithRelations[] = await actionGetUsersBoards(search);
  console.log("boards: ", boards);

  return boards.length ? (
    <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {boards.map((board) => (
        <li key={board.id}>
          <BoardItem board={board} />
        </li>
      ))}
      <li>
        <BoardCreateModal />
      </li>
      {/* <form action={actionCreateBoards}>
        <button type="submit">

        add member
        </button>
      </form> */}
    </ul>
  ) : (
    <p className="mt-40 text-2xl leading-[143%] text-gray-500 font-medium text-center">
      No any boards here
    </p>
  );
};

export default BoardContainer;
