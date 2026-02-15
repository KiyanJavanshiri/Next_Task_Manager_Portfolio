"use client";
import { useDraggable } from "@dnd-kit/core";
import type { Task } from "@/lib/generated/prisma/client";

const TaskItem = ({ task }: { task: Task }) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
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

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-3 rounded-md border border-gray-300 bg-white cursor-grab`}
    >
      <h3 className="text-base leading-[143%] font-semibold text-black mb-1">
        {task.title}
      </h3>
      <p className="text-sm leading-[143%] font-normal text-gray-600">
        {task.description}
      </p>
    </div>
  );
};

export default TaskItem;
