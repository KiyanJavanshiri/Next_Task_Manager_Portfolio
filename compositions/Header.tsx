"use client";
import { MemberUser } from "@/utils/types";
import { MdNotificationsNone } from "react-icons/md";
import { useAuthContext } from "@/context/AuthContext";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import BurgerMenu from "./BurgerMenu";
import Logo from "@/components/Logo";
import InnerContainer from "@/layout/InnerContainer";
import SearchBar from "@/components/SearchBar";

const Header = ({ user }: { user: MemberUser }) => {
  // const { user } = useAuthContext();
  return (
    <header className="py-2.5 bg-gray-100 border-b border-gray-200">
      <InnerContainer>
        <div className="flex justify-between items-center">
          <SearchBar />
          <BurgerMenu />
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <form className="hidden lg:flex justify-center items-center">
              <Button className="">
                <MdNotificationsNone className="w-6 h-6" />
              </Button>
            </form>
            <Link href={"/profile"} className="relative">
              {/* <RxAvatar className="w-6 h-6" /> */}
              <Image
                src={user.avatarUrl || "/images/no-avatar.png"}
                alt={`${user.firstName} avatar`}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </InnerContainer>
    </header>
  );
};

export default Header;
