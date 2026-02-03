import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button = (props: ButtonProps) => {
  const { className, children, onClick, type = "button" } = props;

  return (
    <button
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button
