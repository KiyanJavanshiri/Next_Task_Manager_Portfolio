import type { Task } from "@/lib/generated/prisma/client";
import type { IColumn } from "@/utils/types";
import TaskItem from "./TaskItem";

const TaskBoardColumn = (props: { tasks: Task[]; column: IColumn }) => {
  const {
    tasks,
    column: { title, Icon, status },
  } = props;

  return (
    <div className="p-4 rounded-md bg-gray-100">
      <div className="flex justify-start items-center gap-x-3">
        <Icon />
        <p className="text-sm leading-[143%] text-black font-medium">{title}</p>
        <div className="flex justify-center items-center w-4.5 h-4.5 rounded-full border border-gray-800">
          <span className="text-[12px] leading-[143%] text-gray-500 font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      <ul className="mt-3 flex flex-col gap-y-4">
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskBoardColumn;
