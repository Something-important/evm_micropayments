'use client';
import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import contractABI from "../utils/contracts/citrea.json";
import { useTheme } from "../context/themeContext";

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const RedeemChannelTab: React.FC = () => {
  const [payer, setPayer] = useState("");
  const [finalHashValue, setFinalHashValue] = useState("");
  const [numberOfTokensUsed, setNumberOfTokensUsed] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { writeContract, isPending, error } = useWriteContract();
  const { theme } = useTheme(); // Accessing the current theme

  const redeemChannel = async () => {
    try {
      const transaction: any = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "redeemChannel",
        args: [payer, finalHashValue, BigInt(numberOfTokensUsed)],
      });
      console.log("Transaction hash:", transaction);
      setTxHash(transaction.hash);
      resetForm();
    } catch (error) {
      console.error("Error redeeming channel:", error);
    }
  };

  const resetForm = () => {
    setPayer("");
    setFinalHashValue("");
    setNumberOfTokensUsed("");
  };

  return (
    <div>
      {/* Title Section */}
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
          Redeem Payment Channel
        </h4>
      </div>

      {/* Payer Address Input */}
      <div className="mb-4">
        <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
          Payer Address
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
          type="text"
          placeholder="Enter payer address"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
      </div>

      {/* Final Hash Value Input */}
      <div className="mb-4">
        <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
          Final Hash Value
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
          type="text"
          placeholder="Enter final hash value"
          value={finalHashValue}
          onChange={(e) => setFinalHashValue(e.target.value)}
        />
      </div>

      {/* Number of Tokens Used Input */}
      <div className="mb-4">
        <label className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}>
          Number of Tokens Used
        </label>
        <input
          className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
          type="number"
          placeholder="Enter number of tokens used"
          value={numberOfTokensUsed}
          onChange={(e) => setNumberOfTokensUsed(e.target.value)}
        />
      </div>

      {/* Status Messages */}
      {isPending && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction pending...</p>}
      {error && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {error.message}</p>}

      {/* Transaction Hash */}
      {txHash && (
        <p className={`text-green-400 mt-4 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>
          Transaction successful! Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Etherscan
          </a>
        </p>
      )}

      {/* Redeem Button */}
      <div className="mt-6 flex justify-start">
        <button
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg`}
          onClick={redeemChannel}
          disabled={isPending}
        >
          <span>{isPending ? "Redeeming..." : "Redeem Channel"}</span>
        </button>
      </div>
    </div>
  );
};

export default RedeemChannelTab;
