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
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
        <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-20 max-w-7xl mx-auto">
          <div className="md:w-1/2 space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Stream payments for <span className="text-primary">everything</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From gym memberships to coffee shops, pay for services as you use them with HashPay.
              Fast, secure, and gas-efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <button className="btn-primary w-full sm:w-auto">
                  Get Started
                </button>
              </Link>
              <Link href="#features">
                <button className="btn-secondary w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          {/* <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in">
            <HashStreamMatrix theme={theme} />
          </div> */}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose HashPay?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of payments with our multi-chain protocol that enables
              real-time streaming of funds with maximum efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card animate-fade-in">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Gas Efficient</h3>
                <p className="text-muted-foreground">
                  Deploying a HashPay stream is 3.2-3.7x cheaper than other services.
                </p>
              </div>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Multi-chain</h3>
                <p className="text-muted-foreground">
                  Available on all EVM chains with consistent contract addresses.
                </p>
              </div>
            </div>

            <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Real-time Streaming</h3>
                <p className="text-muted-foreground">
                  Stream payments by the second with instant withdrawals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases Section - Fixed to avoid repetition */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">
              Use Cases
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From daily coffee to monthly gym memberships, stream your payments for any service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Subscription Services</h3>
              <p className="text-muted-foreground">
                Pay for streaming services, software, and more by the minute instead of monthly fees.
              </p>
            </div>
            <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold mb-4">Freelancer Payments</h3>
              <p className="text-muted-foreground">
                Automatically distribute payments to freelancers based on completed work or time tracked.
              </p>
            </div>
            <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-4">Content Creator Revenue</h3>
              <p className="text-muted-foreground">
                Monetize your content through pay-per-view or subscription-based streaming models.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}



