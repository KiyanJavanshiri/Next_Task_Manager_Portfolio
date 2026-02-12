import { type ReactNode } from "react";
import SideBar from "@/compositions/SideBar";
import Header from "@/compositions/Header";
import InnerContainer from "@/layout/InnerContainer";

const PrivateRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="py-6 flex-1">
          <InnerContainer>{children}</InnerContainer>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default PrivateRootLayout;
