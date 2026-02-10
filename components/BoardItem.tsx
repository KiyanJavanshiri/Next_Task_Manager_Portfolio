import type { BoardWithRelations } from "@/utils/types";
import { formattedDate } from "@/utils/formattedDate";
import Link from "next/link";
import Image from "next/image";

const BoardItem = ({ board }: { board: BoardWithRelations }) => {
  const { id, title, createdAt, tasks, members } = board;
  const date = formattedDate(createdAt);
  return (
    <Link
      href={`/boards/${id}`}
      className="block p-4 rounded-sm bg-white border border-gray-300 transition-shadow duration-75 ease-in-out hover:shadow-[0_0_10px_rgba(0,0,0,10%)]"
    >
      <h3 className="text-[18px] md:text-base text-black font-medium leading-[143%] mb-2 md:mb-3">
        {title}
      </h3>
      <div className="flex justify-between items-center gap-x-2 mb-1">
        <p className="leading-[143%] text-black text-base font-normal tracking-wide">
          {tasks.length} tasks | {members.length} members
        </p>
        <div className="flex justify-start items-center">
            {members.slice(0,3).map(({id, user}) => (
                <div key={id} className="relative not-first:-ml-2">
                    <Image
                    src={user.avatarUrl || "/images/no-avatar.png"}
                    alt="avatar member"
                    width={32}
                    height={32}
                    priority
                    className="rounded-full border border-gray-400"
                    />
                </div>
            ))}
        </div>
      </div>
      <p className="font-normal text-gray-400 leading-[143%] text-sm">
        {date.month} {date.day}, {date.year}
      </p>
    </Link>
  );
};

export default BoardItem;
