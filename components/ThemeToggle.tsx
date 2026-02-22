"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="h-8 w-8 rounded-full bg-white cursor-pointer relative"
      onClick={toggleDarkMode}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-250 ease-in-out ${theme === "dark" ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
      >
        <MdSunny className="text-black" />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-250 ease-in-out ${theme === "light" ? "opacity-0 rotate-0" : "opacity-100 -rotate-360"}`}
      >
        <FaMoon className="text-black" />
      </div>
    </div>
  );
};

export default ThemeToggle;
