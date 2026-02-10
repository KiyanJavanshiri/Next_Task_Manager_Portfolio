import { type ReactNode } from "react";
import SideBar from "@/compositions/SideBar";
import Header from "@/compositions/Header";
import InnerContainer from "@/layout/InnerContainer";

const PrivateRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <Header />
        <main className="py-6">
          <InnerContainer>{children}</InnerContainer>
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default PrivateRootLayout;
