import type { MemberUser } from "@/utils/types";
import Image from "next/image";
import Button from "@/components/Button/Button";

const SearchedUsersItem = ({
  user,
  handleSelectUser,
}: {
  user: MemberUser;
  handleSelectUser: () => void;
}) => {
  return (
    <Button
      className="w-full p-2 rounded-sm border border-gray-300 bg-white hover:bg-gray-300 cursor-pointer flex justify-start items-start gap-x-3 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={handleSelectUser}
    >
      <div className="relative">
        <Image
          src={user.avatarUrl || "/images/no-avatar.png"}
          priority
          alt={user.firstName}
          width={40}
          height={40}
          className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="text-left">
        <p className="text-sm leading-[143%] font-medium text-black dark:text-white">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-[143%] font-normal">
          {user.email}
        </p>
      </div>
    </Button>
  );
};

export default SearchedUsersItem;
