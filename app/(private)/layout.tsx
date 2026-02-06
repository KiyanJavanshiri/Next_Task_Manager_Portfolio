import SideBar from "@/compositions/SideBar";
import { type ReactNode } from "react";

const PrivateRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <SideBar />
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default PrivateRootLayout;
