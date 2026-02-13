import type { Task } from "@/lib/generated/prisma/client";

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div className="p-3 rounded-md border border-gray-300 bg-white">
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
