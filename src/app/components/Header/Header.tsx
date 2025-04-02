// Header.tsx
import React from "react";
import Link from "next/link";
import CustomConnectButton from "../connectButton";
import { useTheme } from "../../context/themeContext";
import Logo from "../Logo";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 bg-light-headerFooter dark:bg-dark-headerFooter text-light-text dark:text-dark-text shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 ${
              theme === "light"
                ? "text-light-text hover:bg-light-mutedGray"
                : "text-dark-text hover:bg-dark-mutedGray"
            }`}
          >
            {theme === "light" ? (
              <span className="material-icons">dark_mode</span>
            ) : (
              <span className="material-icons">light_mode</span>
            )}
          </button>
          <CustomConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;







