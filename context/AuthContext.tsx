"use client";
import { MemberUser as User } from "@/utils/types";
import { useContext, createContext, type ReactNode, useState } from "react";

interface IAuthContext {
  user: User;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  const [currentUser, setCurrentUser] = useState<User>(user);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context is undefind");
  }

  return context;
};
