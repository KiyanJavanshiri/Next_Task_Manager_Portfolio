import { MdNotificationsNone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import Button from "@/components/Button/Button";
import BurgerMenu from "./BurgerMenu";
import Logo from "@/components/Logo";
import InnerContainer from "@/layout/InnerContainer";
import SearchBar from "@/components/SearchBar";

const Header = () => {
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
            <div className="">
              <RxAvatar className="w-6 h-6" />
            </div>
          </div>
        </div>
      </InnerContainer>
    </header>
  );
};

export default Header;
