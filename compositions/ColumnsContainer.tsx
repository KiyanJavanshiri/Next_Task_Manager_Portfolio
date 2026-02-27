"use client";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import type { IColumn } from "@/utils/types";
import { TBoardTask as Task } from "@/utils/types";
import { Columns } from "@prisma/client";
import { changeTaskStatus } from "@/utils/actions/tasks/changeTaskStatus";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import TaskBoardColumn from "@/components/Tasks/TaskBoardColumn";

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

const ColumnsContainer = ({
  tasks,
  boardId,
}: {
  tasks: Task[];
  boardId: string;
}) => {
  const [alltasks, setAllTasks] = useState<Task[]>(() => tasks);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskStatus = active.data!.current!.status as Columns;

    if (taskStatus === over.id) return;
    const taskId = String(active.id);
    const newStatus = over.id as Columns;

    setAllTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
    await changeTaskStatus(taskId, boardId, newStatus);
  };

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  return (
    <div className="mt-6 grid grid-cols-3 gap-6">
      <DndContext id="draggble-table" onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <TaskBoardColumn
            key={column.status}
            column={column}
            tasks={alltasks.filter((task) => task.status === column.status)}
          />
        ))}
      </DndContext>
    </div>
  );
};

export default ColumnsContainer;
