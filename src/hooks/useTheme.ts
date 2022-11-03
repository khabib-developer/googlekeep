import { useState } from "react";
import { themeMode } from "../constans";

export const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("darkTheme") ? themeMode.dark : themeMode.light
  );
  const setDarkTheme = (darkTheme: boolean) => {
    if (darkTheme) {
      localStorage.setItem("darkTheme", "1");
      setTheme(themeMode.dark);
      return;
    }
    localStorage.removeItem("darkTheme");
    setTheme(themeMode.light);
  };

  return { theme, setDarkTheme };
};
