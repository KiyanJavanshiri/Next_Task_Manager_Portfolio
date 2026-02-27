"use client";
import { useEffect, useState, useActionState } from "react";
import { createPortal } from "react-dom";
import { MemberUser } from "@/utils/types";
import { actionCreateTasks } from "@/utils/actions/tasks/createTasks";
import { MdOutlineClose } from "react-icons/md";
import Button from "@/components/Button/Button";
import FormInput from "@/components/Input/FormInput";
import SelectAssignee from "./components/SelectAssignee";
import TaskDateCalendar from "./components/TaskDateCalendar";

const CreateTaskModal = ({
  boardId,
  members,
}: {
  boardId: string;
  members: MemberUser[];
}) => {
  const [state, action, isPending] = useActionState(
    actionCreateTasks,
    undefined,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    if (state?.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
    }
  }, [state]);

  return (
    <>
      <Button
        onClick={handleCloseModal}
        className="px-6 py-2 inline-block text-base text-white leading-[143%] font-medium bg-black rounded-sm hover:bg-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
      >
        Create new task
      </Button>
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-30 bg-[rgba(0,0,0,60%)] dark:bg-[rgba(0,0,0,70%)]"
            onClick={handleCloseModal}
          >
            <div
              className="fixed top-1/2 left-1/2 -translate-1/2 p-4 rounded-md bg-white min-w-120 dark:bg-gray-800 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] leading-[143%] text-black font-medium dark:text-white">
                  Create a task
                </h2>
                <Button onClick={handleCloseModal} className="">
                  <MdOutlineClose className="w-5 h-5" />
                </Button>
              </div>
              {state && !state.success && (
                <p className="p-2 rounded-sm bg-white shadow-[0_0_10px_rgba(0,0,0,10%)] text-sm leading-[143%] font-medium text-red-500 mb-2 text-center dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
                  {state.message}
                </p>
              )}
              <form action={action} className="flex flex-col gap-y-4">
                <FormInput
                  label="Title"
                  placeholder="Enter title"
                  id="title"
                  name="title"
                />
                <FormInput
                  label="Description"
                  placeholder="Enter title"
                  id="description"
                  name="description"
                />
                <TaskDateCalendar />
                <SelectAssignee
                  label="Assignee"
                  name="assigneeId"
                  members={members}
                />
                <input type="hidden" value={boardId} name="boardId" />
                <div className="flex justify-end items-center gap-x-4">
                  <Button
                    onClick={() => setIsOpen(false)}
                    disabled={isPending}
                    className="px-4 py-2 rounded-md border border-gray-300 text-black leading-[143%] font-medium text-base dark:border-gray-600 dark:text-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="px-4 py-2 rounded-md border border-gray-300 bg-black text-white leading-[143%] font-medium text-base dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                  >
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.getElementById("modals")!,
        )}
    </>
  );
};

export default CreateTaskModal;
