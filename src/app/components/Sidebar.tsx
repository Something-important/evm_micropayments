import React from "react";
import Link from "next/link";
import { useTheme } from "../context/themeContext";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-64 min-h-screen p-6 bg-light-headerFooter dark:bg-dark-headerFooter shadow-lg`}
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
          <Link key={tab.id} href={`#${tab.id}`} passHref>
            <div
              className={`block py-2 px-4 rounded-lg flex items-center gap-3 ${
                theme === "light"
                  ? "text-light-text hover:bg-light-mutedGray dark:hover:bg-dark-mutedGray"
                  : "text-dark-text hover:bg-dark-mutedGray dark:hover:bg-dark-mutedGray"
              }`}
            >
              <span className="material-icons">{tab.icon}</span>
              {tab.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
