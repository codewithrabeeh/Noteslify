import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: 'light',
  toggle: ()=>{}
});

const ThemeModeProvider = ({children}) => {
  const currentTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', theme);
    } else {
      setTheme('light');
      localStorage.setItem('theme', theme);
    }
  }

  const contextValues = {
    theme: theme,
    toggle: toggleTheme
  };
  return (
    <ThemeContext.Provider value={contextValues}>
      <div
        data-theme={theme}
        className={`isolate ${
          theme === "dark" ? "bg-[#030414] text-white" : "bg-white"
        } transition-all`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export default ThemeModeProvider;