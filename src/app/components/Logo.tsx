// Logo.tsx
import React from "react";
import { useTheme } from "../context/themeContext"; // Adjust based on your theme context

const Logo: React.FC = () => {
  const { theme } = useTheme(); // Assuming you have a theme context

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
      {/* Logo Text */}
      <text
        x="10"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="36"
        fontWeight="bold"
        className={theme === "light" ? "fill-light-primary" : "fill-dark-primary"}
      >
        Hash
      </text>
      <text
        x="95"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="36"
        fontWeight="bold"
        className={theme === "light" ? "fill-light-accent" : "fill-dark-accent"}
      >
        Pay
      </text>

      {/* Crypto Circle Symbol */}
      <circle
        cx="180"
        cy="30"
        r="18"
        className={theme === "light" ? "fill-light-secondary stroke-light-primary" : "fill-dark-secondary stroke-dark-primary"}
        strokeWidth="3"
      />
      <text
        x="180"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        fontWeight="bold"
        className="fill-white"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        ⚡
      </text>
    </svg>
  );
};

export default Logo;