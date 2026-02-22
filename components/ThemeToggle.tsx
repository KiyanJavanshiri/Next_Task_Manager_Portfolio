"use client";
import { useState, useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(theme as Theme);
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
}, []);

  const toggleDarkMode = () => {
    setTheme((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      return nextTheme
    });
  };

  return (
    <div
      className="h-8 w-8 rounded-full bg-white cursor-pointer relative"
      onClick={toggleDarkMode}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-250 ease-in-out ${theme === "dark" ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
      >
        <MdSunny />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 -translate-1/2 transition-all duration-250 ease-in-out ${theme === "light" ? "opacity-0 rotate-0" : "opacity-100 -rotate-360"}`}
      >
        <FaMoon />
      </div>
    </div>
  );
};

export default ThemeToggle;
