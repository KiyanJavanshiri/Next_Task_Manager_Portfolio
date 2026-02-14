"use client";
import type { MemberUser } from "@/utils/types";
import SearchedUsersItem from "./SearchedUsersItem";

const SearchedUsersList = ({
  users,
  handleSelectUser,
}: {
  users: MemberUser[];
  handleSelectUser: (user: MemberUser) => void;
}) => {
  return (
    <ul className="absolute top-full translate-y-2 left-0 right-0 rounded-sm shadow-[0_0_10px_rgba(0,0,0,10%)] p-4 max-h-50 overflow-y-auto flex flex-col gap-y-3 bg-white">
      {users.map((user) => (
        <li key={user.id}>
            <SearchedUsersItem user={user} handleSelectUser={() => handleSelectUser(user)} />
        </li>
      ))}
    </ul>
  );
};

export default SearchedUsersList;
