"use client";
import { MemberUser } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import Logo from "@/components/Logo";
import InnerContainer from "@/layout/InnerContainer";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

const Header = ({ user }: { user: MemberUser }) => {
  return (
    <header className="py-2.5 fixed left-0 right-0 top-0 z-10 bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <InnerContainer>
        <div className="flex justify-between items-center">
          <SearchBar />
          <BurgerMenu />
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <ThemeToggle />
            <Link
              href={"/profile"}
              className="w-8 h-8 rounded-full overflow-hidden shrink-0"
            >
              <Image
                src={user.avatarUrl || "/images/no-avatar.png"}
                alt={`${user.firstName} avatar`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        </div>
      </InnerContainer>
    </header>
  );
};

export default Header;
