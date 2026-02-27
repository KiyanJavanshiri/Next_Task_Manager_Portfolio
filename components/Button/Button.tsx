import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { className, children, onClick, type = "button", disabled } = props;

  return (
    <button
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
