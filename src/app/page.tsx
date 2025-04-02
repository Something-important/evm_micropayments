'use client';
import React from "react";
import Link from "next/link";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./context/themeContext";
import HashStreamMatrix from "./components/HashStreamMatrix";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
    >
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-light-secondary dark:text-dark-secondary">
            Stream seamless recurring crypto payments with HashPay!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Automate salaries by streaming them - so employees can withdraw whenever they want.
          </p>
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-light-primary text-white dark:bg-dark-primary rounded hover:bg-green-600 dark:hover:bg-green-500 transition">
              Get Started
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <HashStreamMatrix theme={theme} />
        </div>
      </div>

      {/* Main Feature Section */}
      <div className="py-12 bg-light-mutedGray dark:bg-dark-background">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-center mb-2 text-light-secondary dark:text-dark-secondary">
            Automate transactions and stream them by the second.
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            HashPay is a multi-chain protocol that allows you to automate transactions and stream them by the second.
            Recipients can withdraw these funds at any time, eliminating the need for manual recurring payment transactions.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-dark-mutedGray p-6 rounded">
              <div className="flex items-start space-x-4">
                <div className="text-light-primary dark:text-dark-primary">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none" />
                    <path
                      d="M12,2 L2,7 L12,12 L22,7 L12,2 Z M2,17 L12,22 L22,17 M2,12 L12,17 L22,12"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-light-primary dark:text-dark-primary">Gas efficient</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deploying a HashPay stream is 3.2-3.7x cheaper than other services.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-mutedGray p-6 rounded">
              <div className="flex items-start space-x-4">
                <div className="text-light-secondary dark:text-dark-secondary">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none" />
                    <path
                      d="M12,2 L2,7 L12,12 L22,7 L12,2 Z M2,17 L12,22 L22,17 M2,12 L12,17 L22,12"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1 text-light-secondary dark:text-dark-secondary">Multi-chain</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available on all EVM chains with all contracts sharing the same address across chains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}



