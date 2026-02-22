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
    <aside className="min-h-screen fixed top-0 left-0 bottom-0 bg-white border-r border-r-gray-200 hidden lg:flex flex-col justify-between max-w-55 pb-4 z-20 dark:bg-gray-800 dark:border-r-gray-700">
      <div className="">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <Logo />
        </div>
        <nav className="pt-4 pr-4">
          <ul className="flex flex-col gap-y-4">
            {PATHS.map(({ title, path, Icon }, i) => (
              <li key={i}>
                <Link
                  className={`flex justify-start items-center gap-x-3 py-2 px-6 ${pathname === path ? "bg-gray-200 dark:bg-gray-700" : ""} rounded-r-sm hover:bg-gray-300 transition-colors duration-100 ease-in-out dark:hover:bg-gray-600`}
                  href={path}
                >
                  <Icon className="w-4 h-4 dark:text-gray-100" />
                  <span className="text-black font-normal leading-[143%] dark:text-gray-100">
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <form action={actionLogout} className="pr-4">
        <Button
          type="submit"
          className="px-6 py-2 flex w-full justify-start items-center gap-x-3 hover:bg-gray-300 transition-colors duration-100 ease-in-out rounded-r-sm dark:hover:bg-gray-600"
        >
          <MdOutlineLogout className="w-4 h-4 text-red-500" />
          <span className="text-black font-normal leading-[143%] dark:text-gray-100">Logout</span>
        </Button>
      </form>
    </aside>
  );
};

export default SideBar;
