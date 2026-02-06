import { MdNotificationsNone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import Button from "@/components/Button/Button";
import InnerContainer from "@/layout/InnerContainer";
import SearchBar from "@/components/SearchBar";

const Header = () => {
  return (
    <header className="py-2 bg-gray-100 border-b border-gray-200">
      <InnerContainer>
        <div className="flex justify-between items-center">
          <SearchBar />
          <div className="flex justify-between items-center">
            <form>
              <Button className="">
                <MdNotificationsNone />
              </Button>
            </form>
            <div className="">
                <RxAvatar/>
            </div>
          </div>
        </div>
      </InnerContainer>
    </header>
  );
};

export default Header;
