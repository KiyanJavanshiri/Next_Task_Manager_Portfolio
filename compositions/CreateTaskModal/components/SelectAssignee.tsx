"use client";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import type { MemberUser } from "@/utils/types";
import Button from "@/components/Button/Button";
import Image from "next/image";

interface ISelectAssigneeProps {
  label: string;
  name: string;
  options: MemberUser[]
}

const SelectAssignee = (props: ISelectAssigneeProps) => {
  const { label, name } = props;
  const [selectedUser, setSelectedUser] = useState<MemberUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <p className="text-left mb-2 text-[14px] leading-[143%] text-black font-medium">
        {label}
      </p>
      <Button
        className={`flex justify-between items-center px-4 py-3 rounded-[10px] border border-gray-200 bg-white text-[14px] leading-[143%] text-black font-normal ${isOpen ? "border-black shadow-[0_0_10px_rgba(0,0,0,5%)]" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedUser ? (
          <div className="">
            <div className="">
              <Image
                src={selectedUser.avatarUrl || "/images/no-avatar.png"}
                priority
                width={20}
                height={20}
                alt={selectedUser.firstName}
              />
            </div>
          </div>
        ) : (
          "Choose assignee"
        )}
        <MdOutlineKeyboardArrowDown />
      </Button>
    </div>
  );
};

export default SelectAssignee;
