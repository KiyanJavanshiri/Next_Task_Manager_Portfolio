import { deleteBoard, leaveBoard } from "@/utils/actions/board/deleteBoard";
import { MdDelete, MdOutlineLogout } from "react-icons/md";
import Button from "../Button/Button";

const DeleteBoardButton = ({
  isOwner,
  boardId,
  userId,
}: {
  isOwner: boolean;
  boardId: string;
  userId: string;
}) => {
  const deleteBoardWithId = deleteBoard.bind(null, boardId);
  const leaveBoardWithId = leaveBoard.bind(null, boardId, userId);

  return (
    <form
      action={isOwner ? deleteBoardWithId : leaveBoardWithId}
      className="relative group"
    >
      <Button type="submit" className="">
        {isOwner ? <MdDelete /> : <MdOutlineLogout />}
      </Button>
      <div className="absolute bottom-[120%] left-1/2 -translate-x-1/2 px-3 py-2 text-xs text-white bg-[rgba(20,20,25,0.9)] rounded-sm shadow-xl backdrop-blur opacity-0 scale-95 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
        <p className="text-sm leading-[143%] text-white font-normal whitespace-nowrap">
          {isOwner ? "Delete the board" : "Leave from the board"}
        </p>
      </div>
    </form>
  );
};

export default DeleteBoardButton;
