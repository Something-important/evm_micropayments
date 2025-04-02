"use client";
import React, { useState } from "react";
import CreateChannelTab from "../components/CreateChannelTab";
import ReclaimChannelTab from "../components/ReclaimChannelTab";
import RedeemChannelTab from "../components/RedeemChannelTab";
import ViewChannelTab from "../components/ViewChannelTab";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create"); // Default to "create" tab
  const { theme } = useTheme();

  // Set theme-specific background color for sidebar and main content
  const sidebarBgColor = theme === "light" ? "bg-light-background" : "bg-dark-background"; // Same as content background
  const contentBgColor = theme === "light" ? "bg-light-background" : "bg-dark-background"; // Same as content background

  return (
    <div
      className={`min-h-screen flex flex-col ${contentBgColor} text-light-text dark:text-dark-text`}
    >
      <Header />
      <div className="flex flex-row flex-1">
        {/* Sidebar */}
        <div
          className={`w-64 h-full p-6 ${sidebarBgColor} border-r-2 border-light-mutedGray dark:border-dark-mutedGray`}
        >
          <h2
            className={`text-2xl font-semibold text-center text-light-primary dark:text-dark-primary mb-8`}
          >
            Dashboard
          </h2>

          <div className="space-y-4">
            {[
              { id: "create", label: "Create Channel", icon: "add_circle" },
              { id: "reclaim", label: "Reclaim Channel", icon: "refresh" },
              { id: "redeem", label: "Redeem Channel", icon: "redeem" },
              { id: "view", label: "View Channel", icon: "visibility" },
            ].map((tab) => (
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
          {/* Tab content */}
          <div className="mt-8">
            {activeTab === "create" && <CreateChannelTab />}
            {activeTab === "reclaim" && <ReclaimChannelTab />}
            {activeTab === "redeem" && <RedeemChannelTab />}
            {activeTab === "view" && <ViewChannelTab />}
          </div>
        </div>
      </div>

      {/* Footer - Fixed at the bottom */}
      <Footer />
    </div>
  );
};

export default Dashboard;
