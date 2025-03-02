// Footer.tsx
import React from "react";
import Link from "next/link";
import { useTheme } from "../../context/themeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`w-full ${theme === "light" ? "bg-white" : "bg-gray-900"} py-8 px-6 border-t ${theme === "light" ? "border-gray-200" : "border-gray-800"}`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className={`font-medium mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>Wallet.io</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Streaming wallet application</p>
        </div>
        <div>
          <h3 className={`font-medium mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>Community</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition duration-200">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition duration-200">
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={`font-medium mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition duration-200">
                Get started
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={`font-medium mb-3 ${theme === "light" ? "text-gray-900" : "text-white"}`}>Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 dark:text-gray-400">91+9999999</li>
            <li className="text-gray-600 dark:text-gray-400">Wallet.io@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2025 Copyright reserved
      </div>
    </footer>
  );
};

export default Footer;