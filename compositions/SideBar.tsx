"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogout } from "react-icons/md";
import { PATHS } from "@/utils/links";
import { actionLogout } from "@/utils/actions/auth/auth";
import Logo from "@/components/Logo";
import Button from "@/components/Button/Button";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed min-h-screen bg-white border-r border-r-gray-200 flex flex-col justify-between min-w-55">
      <div className="">
        <div className="px-6 py-4 border-b border-gray-200">
          <Logo />
        </div>
        <nav className="pt-4 pr-4">
          <ul className="flex flex-col gap-y-4">
            {PATHS.map(({ title, path, Icon }, i) => (
              <li key={i}>
                <Link
                  className={`flex justify-start items-center gap-x-3 py-2 px-6 ${pathname === path ? "bg-gray-200" : ""} rounded-r-sm`}
                  href={path}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-black font-normal leading-[143%]">
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <form action={actionLogout}>
        <Button className="">
          <span>Logout</span>
          <MdOutlineLogout />
        </Button>
      </form>
    </aside>
  );
};

export default SideBar;
