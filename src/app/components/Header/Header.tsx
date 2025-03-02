// Header.tsx
import React from "react";
import Link from "next/link";
import CustomConnectButton from "../connectButton";
import { useTheme } from "../../context/themeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`w-full ${theme === "light" ? "bg-white" : "bg-gray-900"} py-4 px-6`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className={`text-xl font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          Wallet.io
        </Link>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md ${theme === "light" ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 hover:bg-gray-800"}`}
          >
            {theme === "light" ? (
              <span className="material-icons">dark_mode</span>
            ) : (
              <span className="material-icons">light_mode</span>
            )}
          </button>
          <CustomConnectButton />
          <Link
            href="/login"
            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;