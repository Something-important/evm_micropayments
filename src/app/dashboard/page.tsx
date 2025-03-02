"use client";
import React, { useState } from "react";
import CreateChannelTab from "../components/CreateChannelTab";
import ReclaimChannelTab from "../components/ReclaimChannelTab";
import RedeemChannelTab from "../components/RedeemChannelTab";
import ViewChannelTab from "../components/ViewChannelTab";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext"; // Import useTheme hook

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { theme } = useTheme(); // Use the useTheme hook

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-white"} flex flex-col`}>
      <Header />
      <div className="container mx-auto px-6 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">Payment Channel Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mt-2">
          Manage your payment channels effortlessly with a streamlined UI.
        </p>

        <div className="flex flex-wrap justify-center mt-6 gap-4">
          {[
            { id: "create", label: "Create Channel", icon: "add_circle" },
            { id: "reclaim", label: "Reclaim Channel", icon: "refresh" },
            { id: "redeem", label: "Redeem Channel", icon: "redeem" },
            { id: "view", label: "View Channel", icon: "visibility" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-lg transition-all font-medium flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white dark:bg-yellow-400 dark:text-gray-900"
                  : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="material-icons">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 w-full max-w-4xl p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md transition-all">
          {activeTab === "create" && <CreateChannelTab />}
          {activeTab === "reclaim" && <ReclaimChannelTab />}
          {activeTab === "redeem" && <RedeemChannelTab />}
          {activeTab === "view" && <ViewChannelTab />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
