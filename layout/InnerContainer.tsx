import { type ReactNode } from "react";

const InnerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto px-4 md:px-16 lg:pl-60 max-w-340">
      {children}
    </div>
  );
};

export default InnerContainer;
