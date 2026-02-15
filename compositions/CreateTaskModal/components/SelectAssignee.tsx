"use client";
import { useState } from "react";
import type { MemberUser } from "@/utils/types";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/Button/Button";
import Image from "next/image";

interface ISelectAssigneeProps {
  label: string;
  name: string;
  members: MemberUser[];
}

const SelectAssignee = (props: ISelectAssigneeProps) => {
  const { label, name, members } = props;
  const [selectedUser, setSelectedUser] = useState<MemberUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAssignee = (member: MemberUser) => {
    setSelectedUser(member);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <p className="text-left mb-2 text-[14px] leading-[143%] text-black font-medium">
        {label}
      </p>
      <Button
        className={`flex w-full justify-between items-center px-4 py-3 rounded-[10px] border bg-white text-[14px] leading-[143%] text-black font-normal ${isOpen ? "border-black shadow-[0_0_10px_rgba(0,0,0,5%)]" : "border-gray-200"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedUser ? (
          <div className="flex justify-start gap-x-2">
            <div className="">
              <Image
                src={selectedUser.avatarUrl || "/images/no-avatar.png"}
                priority
                width={20}
                height={20}
                alt={selectedUser.firstName}
              />
            </div>
            <p className="capitalize leading-[143%] text-sm font-normal text-black">
              {selectedUser.firstName} {selectedUser.lastName}
            </p>
          </div>
        ) : (
          "Choose assignee"
        )}
        <MdOutlineKeyboardArrowDown
          className={`transition-transform duration-200 ease-in-out ${isOpen ? "-rotate-180" : ""}`}
        />
      </Button>
      <input type="hidden" value={selectedUser?.id || ""} name={name} />
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 translate-y-2 shadow-[0_0_10px_rgba(0,0,0,10%)] p-3 rounded-md flex flex-col gap-y-2 max-h-20 overflow-y-auto bg-white">
          {members.map((member) => (
            <li
              onClick={() => handleAssignee(member)}
              key={member.id}
              className={`flex justify-start items-center gap-x-3 rounded-sm p-2 hover:bg-gray-200 ${member.id === selectedUser?.id ? "bg-gray-300" : ""}`}
            >
              <div className="relative">
                <Image
                  src={member.avatarUrl || "/images/no-avatar.png"}
                  alt={member.firstName}
                  priority
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
              <p className="capitalize leading-[143%] text-sm font-normal text-black">
                {member.firstName} {member.lastName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectAssignee;
