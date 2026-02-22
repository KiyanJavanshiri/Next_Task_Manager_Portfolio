"use client";
import { useDroppable } from "@dnd-kit/core";
import { TBoardTask as Task } from "@/utils/types";
import type { IColumn } from "@/utils/types";
import TaskItem from "./TaskItem";

const TaskBoardColumn = (props: { tasks: Task[]; column: IColumn }) => {
  const {
    tasks,
    column: { title, Icon, status },
  } = props;

  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="p-4 rounded-md bg-gray-100">
      <div className="flex justify-start items-center gap-x-3">
        <Icon />
        <p className="text-sm leading-[143%] text-black font-medium">{title}</p>
        <div className="flex justify-center items-center w-4.5 h-4.5 rounded-full border border-gray-800">
          <span className="text-[12px] leading-[143%] text-gray-500 font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-y-4">
        {tasks.length === 0 ? (
          <p className="text-center mt-4 text-sm leading-[143%] text-gray-500 font-medium">No tasks here</p>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskBoardColumn;
