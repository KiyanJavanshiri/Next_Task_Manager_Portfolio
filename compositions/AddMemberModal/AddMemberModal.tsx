"use client";
import { useEffect, useState, useActionState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { User } from "@/lib/generated/prisma/client";
import { getUsers } from "@/utils/actions/user/getUsers";
import { addMembers } from "@/utils/actions/board/addMembers";
import { createPortal } from "react-dom";
import { MdGroupAdd } from "react-icons/md";
import Button from "@/components/Button/Button";
import SearchedUsersList from "./components/SearchedUsersList";
import Image from "next/image";

export type SearchedUsers = Omit<
  User,
  "createdAt" | "updatedAt" | "password" | "login"
>;

const AddMemberModal = ({ boardId }: { boardId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<SearchedUsers[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchedUsers[]>([]);
  const [email, setEmail] = useState("");
  const [state, action] = useActionState(addMembers, undefined);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectUser = (user: SearchedUsers) => {
    setSelectedUsers((prev) => [...prev, user]);
    setEmail("");
  };

  const handleChangeQuery = useDebouncedCallback(async (email: string) => {
    if (email.trim().length === 0) {
      setUsers([]);
      return;
    }
    setIsLoading(true);

    const users = await getUsers(email.trim(), boardId);
    const filteredUsers = users.filter(
      (user) => !selectedUsers.some((u) => u.id === user.id),
    );
    setUsers(filteredUsers);

    setIsLoading(false);
  }, 500);

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
              className="absolute top-1/3 left-1/2 -translate-x-1/2 p-4 rounded-md bg-white min-w-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h2 className="text-[20px] leading-[143%] text-black font-medium mb-3">
                  Add member
                </h2>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="inline-block mb-2 text-base leading-[143%] text-black font-medium"
                  >
                    Enter users email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleChangeQuery(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter user email..."
                      className="text-base leading-[143%] w-full px-4 py-2 rounded-sm bg-white border border-gray-300 placeholder:text-gray-400 outline-none focus:border-black"
                    />
                    {isLoading && (
                      <div className="absolute top-1/2 right-4 -translate-y-1/2">
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                  {email.length >= 2 && users.length === 0 && (
                    <p className="mt-1 leading-[143%] font-normal text-sm text-gray-500">
                      seems like no users found
                    </p>
                  )}
                  {users.length > 0 && (
                    <SearchedUsersList
                      users={users}
                      handleSelectUser={handleSelectUser}
                    />
                  )}
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex">
                    {selectedUsers.length === 0 && <p>no selected users yet</p>}
                    <div className="flex justify-start items-center">
                      {selectedUsers.slice(0, 4).map((user) => (
                        <div key={user.id} className="not-first:-ml-2">
                          <Image
                            src={user.avatarUrl || "/images/no-avatar.png"}
                            alt={user.firstName}
                            priority
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                          />
                        </div>
                      ))}
                      {selectedUsers.length > 0 && (
                        <Button
                          onClick={() => setSelectedUsers([])}
                          className="px-4 py-2 text-black leading-[143%] font-normal text-sm"
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                  <form action={action}>
                    {selectedUsers.map((u) => (
                      <input
                        key={u.id}
                        type="hidden"
                        name="userIds"
                        value={u.id}
                      />
                    ))}
                    <input type="hidden" name="boardId" value={boardId} />
                    <Button
                      type="submit"
                      className="inline-block px-3 py-2 rounded-sm leading-[143%] text-sm text-white bg-black font-medium disabled:bg-gray-300"
                      disabled={selectedUsers.length === 0}
                    >
                      Add to members
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("modals")!,
        )}
    </>
  );
};

export default AddMemberModal;
