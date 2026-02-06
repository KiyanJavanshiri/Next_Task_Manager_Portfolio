import { type ReactNode } from "react";

const InnerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto px-4 max-w-270">
      {children}
    </div>
  );
};

export default InnerContainer;
