import type { SearchedUsers } from "../AddMemberModal";
import Image from "next/image";
import Button from "@/components/Button/Button";

const SearchedUsersItem = ({
  user,
  handleSelectUser,
}: {
  user: SearchedUsers;
  handleSelectUser: () => void;
}) => {
  return (
    <Button
      className="w-full p-2 rounded-sm border border-gray-300 bg-white hover:bg-gray-300 cursor-pointer flex justify-start items-start gap-x-3"
      onClick={handleSelectUser}
    >
      <div className="relative">
        <Image
          src={user.avatarUrl || "/images/no-avatar.png"}
          priority
          alt={user.firstName}
          width={40}
          height={40}
          className="rounded-full object-cover border border-gray-300"
        />
      </div>
      <div className="text-left">
        <p className="text-sm leading-[143%] font-medium text-black">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-[12px] text-gray-500 leading-[143%] font-normal">
          {user.email}
        </p>
      </div>
    </Button>
  );
};

export default SearchedUsersItem;
