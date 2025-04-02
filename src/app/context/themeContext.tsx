'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get the initial theme synchronously
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light"; // Fallback to "light" if no saved theme
  }
  return "light"; // Default for SSR
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize theme synchronously with getInitialTheme
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isLoaded, setIsLoaded] = useState(false); // Track when theme is applied

  // Apply theme to document and mark as loaded
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Persist to localStorage
    setIsLoaded(true); // Theme is now applied
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Delay rendering children until theme is loaded
  if (!isLoaded) {
    return null; // Or a loading spinner: <div>Loading...</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};