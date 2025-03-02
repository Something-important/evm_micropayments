'use client';
import React from "react";
import Link from "next/link";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./context/themeContext";

export default function Home() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
      <Header />
      
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
            Stream seamless recurring crypto payments!
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Automate salaries by streaming them - so employees can withdraw whenever they want.
          </p>
          <Link href="/dashboard">
            <button className="px-6 py-2 bg-gray-800 text-white dark:bg-gray-700 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition">
              Get Started
            </button>
          </Link>
          <div className="pt-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Trusted By remarkable organisation</p>
            <div className="flex space-x-4">
              <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded">
                <span className="text-xs">CIRCLE</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded">
                <span className="text-xs">CoinPayments</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded">
                <span className="text-xs">BitGo</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img 
            src="/api/placeholder/400/320" 
            alt="Crypto streaming illustration" 
            className="w-full"
          />
        </div>
      </div>

      {/* Main Feature Section */}
      <div className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-center mb-2">
            Automate transactions and stream them by the second.
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            LlamaPay is a multi-chain protocol that allows you to automate transactions and stream them by the second. 
            Recipients can withdraw these funds at any time, eliminating the need for manual recurring payment transactions.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded">
              <div className="flex items-start space-x-4">
                <div className="text-blue-500">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none"/>
                    <path d="M12,2 L2,7 L12,12 L22,7 L12,2 Z M2,17 L12,22 L22,17 M2,12 L12,17 L22,12" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Gas efficient</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Deploying a LlamaPay stream is 3.2-3.7x cheaper than other services.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded">
              <div className="flex items-start space-x-4">
                <div className="text-blue-500">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <rect width="24" height="24" fill="none"/>
                    <path d="M12,2 L2,7 L12,12 L22,7 L12,2 Z M2,17 L12,22 L22,17 M2,12 L12,17 L22,12" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Multi-chain</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available on all EVM chains with all contracts sharing the same address across chains.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-medium text-center mb-8">
          Features of Wallet.io
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
            <h3 className="text-lg font-medium mb-2 text-blue-500">Anyone can trigger a claim</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive payment into centralized exchanges via a 3rd party wallet triggering the claim.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
            <h3 className="text-lg font-medium mb-2 text-blue-500">No precision errors</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wallet.io operates internally with 20 decimals which will keep precision errors to a minimum.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
            <h3 className="text-lg font-medium mb-2 text-blue-500">Never run out of balance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Opt to borrow money to fund streams, for when you forget to top-up your balance.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
            <h3 className="text-lg font-medium mb-2 text-blue-500">Never run out of balance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stream indefinitely. Use Wallet.io to create streams with no end date - or set a custom end date.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-medium text-center mb-8">
          How it Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4 h-40 flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-blue-500">Input payee information</div>
            </div>
            <h3 className="font-medium">Input payee information</h3>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4 h-40 flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-blue-500">Enter amount & frequency</div>
            </div>
            <h3 className="font-medium">Enter amount & frequency</h3>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4 h-40 flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-blue-500">Start Streaming!</div>
            </div>
            <h3 className="font-medium">Start Streaming!</h3>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Register Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}