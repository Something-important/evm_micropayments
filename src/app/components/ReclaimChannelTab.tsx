'use client';
import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { TransactionResponse } from "ethers";
import contractABI from "../utils/contracts/citrea.json";
import { useTheme } from "../context/themeContext";

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const ReclaimChannelTab: React.FC = () => {
  const [merchant, setMerchant] = useState("");
  const { writeContract, isPending, error } = useWriteContract();
  const { theme } = useTheme(); // Accessing the current theme

  const reclaimChannel = async () => {
    try {
      const transaction: TransactionResponse | void = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "reclaimChannel",
        args: [merchant],
      });
      console.log("Transaction hash:", transaction);
    } catch (error) {
      console.error("Error reclaiming channel:", error);
    }
  };

  return (
    <div>
      {/* Title Section */}
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
          Reclaim Payment Channel
        </h4>
      </div>

      {/* Merchant Address Input */}
      <div className="mb-4">
        <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
          Merchant Address
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
          type="text"
          placeholder="Enter merchant address"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
        />
      </div>

      {/* Status Messages */}
      {isPending && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction pending...</p>}
      {error && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {error.message}</p>}

      {/* Reclaim Button */}
      <div className="mt-6 flex justify-start">
        <button
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg`}
          onClick={reclaimChannel}
          disabled={isPending}
        >
          <span>{isPending ? "Reclaiming..." : "Reclaim Channel"}</span>
        </button>
      </div>
    </div>
  );
};

export default ReclaimChannelTab;
