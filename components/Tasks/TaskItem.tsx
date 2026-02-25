"use client";
import { useDraggable } from "@dnd-kit/core";
import { formattedDate } from "@/utils/formattedDate";
import { TBoardTask as Task } from "@/utils/types";
import { FaRegFlag } from "react-icons/fa";
import Image from "next/image";

const TaskItem = ({ task }: { task: Task }) => {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task.id,
    data: {
      status: task.status,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        scale: 1.05,
        rotate: "2deg",
      }
    : {};

  const dueDate = task.dueDate ? formattedDate(task.dueDate) : null;

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-md border border-gray-300 bg-white cursor-grab`}
    >
      <h3 className="text-base leading-[143%] font-semibold text-black mb-1 line-clamp-3">
        {task.title}
      </h3>
      <p className="text-sm leading-[143%] font-normal text-gray-600">
        {task.description}
      </p>
      {dueDate && (
        <div className="flex justify-start items-center gap-x-1 mt-2">
          <FaRegFlag className="text-gray-500 w-3 h-3" />
          <span className="leading-[143%] text-gray-500 font-normal text-[12px]">
            {dueDate.month} {dueDate.day} {dueDate.year}
          </span>
        </div>
      )}
      <div className="flex justify-start items-center gap-x-4 mt-4 border-t border-t-gray-300 pt-3">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src={task.assignee?.avatarUrl || "/images/no-avatar.png"}
            alt={`${task.assignee?.firstName} avatar`}
            width={32}
            height={32}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm leading-[143%] font-medium text-black">
            {task.assignee?.firstName} {task.assignee?.lastName}
          </p>
          <p className="text-[12px] leading-[143%] font-normal text-gray-500">
            Executor
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
