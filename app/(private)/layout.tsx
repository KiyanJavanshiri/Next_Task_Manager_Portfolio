import { type ReactNode } from "react";
import { getUser } from "@/utils/actions/user/getUser";
import SideBar from "@/compositions/SideBar";
import Header from "@/compositions/Header";
// import AuthContextProvider from "@/context/AuthContext";
import InnerContainer from "@/layout/InnerContainer";

const PrivateRootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  return (
    <div>
        <SideBar />
        <div className="flex flex-col flex-1">
          <Header user={user!} />
          <main className="pb-6 py-24 flex-1">
            <InnerContainer>{children}</InnerContainer>
          </main>
          <footer></footer>
        </div>
    </div>
  );
};

export default PrivateRootLayout;
