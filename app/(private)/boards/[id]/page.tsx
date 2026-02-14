import type { IColumn } from "@/utils/types";
import { Columns } from "@/lib/generated/prisma/enums";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { actionGetTasks } from "@/utils/actions/tasks/getTasks";
import { actionCreateTasks } from "@/utils/actions/tasks/createTasks";
import Button from "@/components/Button/Button";
import TaskBoardColumn from "@/components/Tasks/TaskBoardColumn";
import AddMemberModal from "@/compositions/AddMemberModal/AddMemberModal";
import CreateTaskModal from "@/compositions/CreateTaskModal/CreateTaskModal";

const COLUMNS: IColumn[] = [
  {
    title: "To-do",
    Icon: FaRegCircle,
    status: Columns.TODO,
  },
  {
    title: "In progress",
    Icon: LuLoader,
    status: Columns.IN_PROGRESS,
  },
  {
    title: "Done",
    Icon: FaRegCheckCircle,
    status: Columns.DONE,
  },
];

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
      <h2 className="text-3xl leading-[143%] text-black font-semibold">
        {title}
      </h2>
      <div className="mt-3 flex justify-between items-center pb-4 border-b border-gray-300">
        <div className="">
          <Button className="">Board</Button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          <AddMemberModal boardId={board!.id} />
          <CreateTaskModal boardId={board!.id} members={members.map(member => ({...member.user}))}/>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {COLUMNS.map((column, i) => (
          <TaskBoardColumn
            key={i}
            column={column}
            tasks={tasks.filter((task) => task.status === column.status)}
          />
        ))}
      </div>
    </section>
  );
};

export default AllTasksPage;
