import { actionGetTasks } from "@/utils/actions/tasks/getTasks";
import Button from "@/components/Button/Button";
import AddMemberModal from "@/compositions/AddMemberModal/AddMemberModal";
import CreateTaskModal from "@/compositions/CreateTaskModal/CreateTaskModal";
import ColumnsContainer from "@/compositions/ColumnsContainer";
import Image from "next/image";

const AllTasksPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const board = await actionGetTasks(id);
  const { title, tasks, members } = board!;

  return (
    <section className="">
      <div className="mt-3 flex justify-between items-center gap-x-4 pb-4 border-b border-gray-300">
        <h2 className="text-3xl leading-[143%] text-black font-semibold">
          {title}
        </h2>
        <div className="flex justify-end items-center gap-x-4">
          <ul className="flex items-center">
            <li>
              {members.slice(0, 4).map(({ user: member }, i, arr) => {
                const lastIndex = arr.length - 1;
                if (arr.length >= 4 && i === lastIndex) {
                  return <span key={i}>{arr.length - 3}</span>;
                }

                return (
                  <div
                    key={member.id}
                    className="w-9 h-9 rounded-full overflow-hidden not-first:-ml-2"
                  >
                    <Image
                      src={member.avatarUrl || "/images/no-avatar.png"}
                      alt={`${member.firstName} avatar`}
                      width={36}
                      height={36}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </li>
          </ul>
          <AddMemberModal boardId={board!.id} />
          <CreateTaskModal
            boardId={board!.id}
            members={members.map((member) => ({ ...member.user }))}
          />
        </div>
      </div>
      <ColumnsContainer tasks={tasks} boardId={board!.id} />
    </section>
  );
};

export default AllTasksPage;
