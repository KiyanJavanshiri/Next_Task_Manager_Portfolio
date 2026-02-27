"use client";
import { RiMenu2Line } from "react-icons/ri";
import { useState } from "react";
import Button from "@/components/Button/Button";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Button
      onClick={() => {
        handleOpenMenu();
      }}
      className="block lg:hidden"
    >
      <RiMenu2Line className="w-6 h-6" />
    </Button>
  );
};

export default BurgerMenu
