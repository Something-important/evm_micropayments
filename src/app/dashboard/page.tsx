"use client";
import React, { useState, useEffect } from "react";
import CreateChannelTab from "../components/CreateChannelTab";
import ReclaimChannelTab from "../components/ReclaimChannelTab";
import RedeemChannelTab from "../components/RedeemChannelTab";
import ViewChannelTab from "../components/ViewChannelTab";
import GenerateHashchainTab from "../components/GenerateHashchainTab"; // New tab
import DashboardHome2 from "../components/Dashboard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

const Dashboard = () => {
  // 🟢 Load from localStorage directly on initial render
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dashboardActiveTab") || "home";
    }
    return "home";
  });

  const { theme } = useTheme();

  // 🔁 Update localStorage when tab changes
  useEffect(() => {
    localStorage.setItem("dashboardActiveTab", activeTab);
  }, [activeTab]);

  const sidebarBgColor =
    theme === "light" ? "bg-light-background" : "bg-dark-background";
  const contentBgColor =
    theme === "light" ? "bg-light-background" : "bg-dark-background";

  // 🧭 Define all tabs here
  const tabs = [
    { id: "home", label: "Dashboard Home", icon: "dashboard" },
    { id: "create", label: "Create Channel", icon: "add_circle" },
    { id: "reclaim", label: "Reclaim Channel", icon: "refresh" },
    { id: "redeem", label: "Redeem Channel", icon: "redeem" },
    { id: "view", label: "View Channel", icon: "visibility" },
    { id: "hashchain", label: "Generate Hashchain", icon: "fingerprint" }, // 🆕 Hashchain tab
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${contentBgColor} text-light-text dark:text-dark-text`}
    >
      {/* Header */}
      <Header />

      <div className="flex flex-row flex-1">
        {/* Sidebar */}
        <div
          className={`w-64 h-full p-6 ${sidebarBgColor} border-r-2 border-light-mutedGray dark:border-dark-mutedGray mt-16`}
        >
          <div className="space-y-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`block py-2 px-4 rounded-lg flex items-center gap-3 w-full text-left ${
                  activeTab === tab.id
                    ? "bg-light-primary text-white dark:bg-dark-primary dark:text-white shadow-md"
                    : "bg-light-mutedGray text-light-text dark:bg-dark-mutedGray dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="material-icons">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mt-8">
            {activeTab === "home" && <DashboardHome2 />}
            {activeTab === "create" && <CreateChannelTab />}
            {activeTab === "reclaim" && <ReclaimChannelTab />}
            {activeTab === "redeem" && <RedeemChannelTab />}
            {activeTab === "view" && <ViewChannelTab />}
            {activeTab === "hashchain" && <GenerateHashchainTab />} {/* ✅ New tab rendered */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
