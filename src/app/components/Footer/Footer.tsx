// Footer.tsx
import React from "react";
import Link from "next/link";
import { useTheme } from "../../context/themeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`w-full py-8 px-6 bg-light-headerFooter text-light-text dark:bg-dark-headerFooter dark:text-dark-text`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h3 className={`font-semibold mb-3 text-light-primary dark:text-dark-primary`}>
            HashPay
          </h3>
          <p className="text-sm text-light-darkGray dark:text-dark-mutedGray">
            Streaming crypto payments
          </p>
        </div>
        <div>
          <h3 className={`font-semibold mb-3 text-light-primary dark:text-dark-primary`}>
            Community
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2FHC_Protocol"
                className="text-light-darkGray dark:text-dark-mutedGray hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-light-darkGray dark:text-dark-mutedGray hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={`font-semibold mb-3 text-light-primary dark:text-dark-primary`}>
            Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-light-darkGray dark:text-dark-mutedGray hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="text-light-darkGray dark:text-dark-mutedGray hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-200"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={`font-semibold mb-3 text-light-primary dark:text-dark-primary`}>
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="text-light-darkGray dark:text-dark-mutedGray">+91 9999999999</li>
            <li className="text-light-darkGray dark:text-dark-mutedGray">contact@hashpay.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-light-mutedGray dark:border-dark-mutedGray text-center text-xs text-light-darkGray dark:text-dark-mutedGray">
        © 2025 Copyright reserved
      </div>
    </footer>
  );
};

export default Footer;

