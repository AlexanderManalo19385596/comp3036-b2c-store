"use client";

import { Button } from "@repo/ui/button";
import { useTheme } from "./ThemeContext";

const ThemeSwitch = () => {
  const {theme, toggleTheme} = useTheme(); // <- TODO: Get the theme from the context

  return (
    <Button onClick={toggleTheme}
      className="px-3 py-1 rounded-full border text-sm font-bold"
      style={{ color: "var(--text)", borderColor: "var(--text)" }} 
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
  );
};

export default ThemeSwitch;
