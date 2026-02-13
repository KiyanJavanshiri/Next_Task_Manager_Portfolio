"use client";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { User } from "@/lib/generated/prisma/client";
import { getUsers } from "@/utils/actions/user/getUsers";
import { createPortal } from "react-dom";
import { MdGroupAdd } from "react-icons/md";
import Button from "@/components/Button/Button";

type SearchedUsers = Omit<
  User,
  "createdAt" | "updatedAt" | "password" | "login"
>;

const AddMemberModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<SearchedUsers[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchedUsers[]>([]);
  const [email, setEmail] = useState("");

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeQuery = useDebouncedCallback(async (email: string) => {
    if (email.trim().length < 2) return;
    setIsLoading(true);

    const users = await getUsers(email.trim());
    setUsers(users);

    setIsLoading(false);
  }, 500);

  console.log("users: ", users);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      <Button
        className="flex justify-center items-center gap-x-2 px-4 py-2 text-base border border-gray-300 transition-colors duration-100 ease-in-out text-black leading-[143%] font-medium bg-white rounded-sm hover:bg-black hover:text-white"
        onClick={handleOpenModal}
      >
        <MdGroupAdd />
        <p>Add members</p>
      </Button>
      {isOpen &&
        createPortal(
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,60%)]"
            onClick={handleOpenModal}
          >
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <h2>Add member</h2>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleChangeQuery(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter user email..."
                />
              </div>
            </div>
          </div>,
          document.getElementById("modals")!,
        )}
    </>
  );
};

export default AddMemberModal;
