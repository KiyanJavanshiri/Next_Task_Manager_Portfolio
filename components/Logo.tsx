import Link from "next/link";
import { SiTask } from "react-icons/si";

const Logo = () => {
  return (
    <Link className="flex justify-start items-center gap-x-2 lg:gap-x-4" href={"/"}>
      <SiTask className="w-5 h-5" />
      <span className="text-[18px] leading-[143%] font-semibold text-black">Taski</span>
    </Link>
  );
};

export default Logo
