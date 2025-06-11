
"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react"; // Ensure these are used in the toggle
import { Button } from "@/components/ui/button"; // For the toggle button

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light", // Default resolved, will be updated
  setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme", // Using a common storage key name
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
      return storedTheme || defaultTheme;
    } catch (e) {
      console.error("Error reading theme from localStorage", e);
      return defaultTheme;
    }
  });

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (currentTheme: Theme) => {
      root.classList.remove("light", "dark");
      let effectiveTheme: "light" | "dark";

      if (currentTheme === "system") {
        effectiveTheme = mediaQuery.matches ? "dark" : "light";
      } else {
        effectiveTheme = currentTheme;
      }
      
      root.classList.add(effectiveTheme);
      setResolvedTheme(effectiveTheme);
      try {
        window.localStorage.setItem(storageKey, currentTheme);
      } catch (e) {
        console.error("Error saving theme to localStorage", e);
      }
    };

    applyTheme(theme); // Apply on initial load or theme change

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, storageKey]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Optional: A simple toggle component to be used in the header
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light'); // system -> light -> dark -> system
  };
  
  // More sophisticated toggle could cycle through light, dark, system
  // For simplicity, this one just toggles between light and dark based on resolved.
  const simpleToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button variant="ghost" size="icon" onClick={simpleToggle} aria-label="Toggle theme">
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
}
