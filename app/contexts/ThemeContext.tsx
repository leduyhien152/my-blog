import React, { useState } from "react";
import { createContext, useContext } from "react";

interface ThemeProps {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeProps>({
  isDark: true,
  setIsDark: () => {},
});

const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
