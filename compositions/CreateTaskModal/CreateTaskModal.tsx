"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MemberUser } from "@/utils/types";
import { MdOutlineClose } from "react-icons/md";
import Button from "@/components/Button/Button";
import FormInput from "@/components/Input/FormInput";
import SelectAssignee from "./components/SelectAssignee";

const CreateTaskModal = ({ boardId, members }: { boardId: string, members: MemberUser[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={handleCloseModal}
        className="px-4 py-2 inline-block text-base text-white leading-[143%] font-medium bg-black rounded-sm hover:bg-gray-900"
      >
        Create new task
      </Button>
      {isOpen &&
        createPortal(
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,60%)]"
            onClick={handleCloseModal}
          >
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 p-4 rounded-md bg-white min-w-120"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] leading-[143%] text-black font-medium">
                  Create a task
                </h2>
                <Button onClick={handleCloseModal} className="">
                  <MdOutlineClose className="w-5 h-5" />
                </Button>
              </div>
              <form className="flex flex-col gap-y-4">
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
                <SelectAssignee label="Assignee" name="assignee" options={members}/>
                <input type="hidden" value={boardId} />
                <div className="">
                  <Button className="">Cancel</Button>
                  <Button type="submit" className="">
                    Create
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
