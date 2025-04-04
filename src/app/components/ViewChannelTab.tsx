import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import contractABI from "../utils/contracts/citrea.json";
import { useTheme } from "../context/themeContext";

// Define the interface for channel data
interface ChannelData {
  trustAnchor: string;
  amount: string;
  numberOfTokens: string;
  merchantWithdrawAfterBlocks: string;
  payerWithdrawAfterBlocks: string;
}

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const ViewChannelTab: React.FC = () => {
  const [payer, setPayer] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [role, setRole] = useState<"payer" | "merchant">("payer"); // Role toggle
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null); // More specific type for error
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false); // Toggle for advanced options
  const [highlightPayer, setHighlightPayer] = useState<boolean>(false); // Highlight payer address field
  const [highlightMerchant, setHighlightMerchant] = useState<boolean>(false); // Highlight merchant address field

  // Fetch connected wallet address using Wagmi's useAccount hook
  const { address: connectedAddress } = useAccount();

  // Automatically set the payer and merchant based on the connected wallet address
  useEffect(() => {
    if (connectedAddress) {
      if (role === "payer") {
        setPayer(connectedAddress);
        setHighlightPayer(false); // Remove highlight on payer if address is auto-filled
        setHighlightMerchant(true); // Highlight merchant address box to fill
      } else {
        setMerchant(connectedAddress);
        setHighlightMerchant(false); // Remove highlight on merchant if address is auto-filled
        setHighlightPayer(true); // Highlight payer address box to fill
      }
    }
  }, [connectedAddress, role]);

  // Triggering the contract call when both payer and merchant are set
  const { data, isLoading: contractLoading, error: contractError } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "channelsMapping",
    args: payer && merchant ? [payer, merchant] : undefined,
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 5) {
      setChannelData({
        trustAnchor: data[0],
        amount: data[1],
        numberOfTokens: data[2],
        merchantWithdrawAfterBlocks: data[3],
        payerWithdrawAfterBlocks: data[4],
      });
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(contractLoading);
  }, [contractLoading]);

  useEffect(() => {
    if (contractError) {
      setError(contractError);
    }
  }, [contractError]);

  const fetchChannelData = () => {
    if (payer && merchant) {
      console.log("Fetching channel data with:", { payer, merchant });
      setIsLoading(true);
      setError(null); // Reset error before fetching new data
    } else {
      console.error("Payer or merchant address is missing.");
    }
  };

  // Utility function to format and remove trailing zeroes
  const formatAmount = (amount: string) => {
    if (amount) {
      const etherAmount = Number(amount) / 10 ** 18;
      return etherAmount.toFixed(18).replace(/\.?0+$/, ''); // Remove trailing zeros
    }
    return "0";
  };

  const { theme } = useTheme(); // Accessing the current theme

  // Determine text color based on theme
  const textColor = theme === "light" ? "text-light-primary" : "text-dark-primary";  // Adjusted to reflect better contrast
  const inputColor = theme === "light" ? "text-light-text" : "text-dark-text";

  return (
    <div>
      <h4 className={`text-xl font-semibold mb-4 ${textColor}`}>
        View Payment Channel
      </h4>

      {/* Role Selection using Radio Buttons (only visible if not in advanced mode) */}
      {!showAdvanced && (
        <div className="mb-4">
          <label className={`block text-sm font-medium text-button`}>Select Your Role</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="payer"
                name="role"
                value="payer"
                checked={role === "payer"}
                onChange={() => setRole("payer")}
                className="mr-2"
              />
              <label htmlFor="payer" className={`text-sm ${textColor}`}>Payer</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="merchant"
                name="role"
                value="merchant"
                checked={role === "merchant"}
                onChange={() => setRole("merchant")}
                className="mr-2"
              />
              <label htmlFor="merchant" className={`text-sm ${textColor}`}>Merchant</label>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Advanced Options */}
      <div className="mb-4 flex justify-end items-center">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`text-sm font-medium ${theme === "light" ? "text-blue-500" : "text-blue-400"} hover:text-blue-700 focus:outline-none`}
        >
          <span className="flex items-center">
            <i className={`fa ${showAdvanced ? "fa-chevron-up" : "fa-chevron-down"} mr-1`}></i>
            Advanced Options
          </span>
        </button>
      </div>

      {/* Payer and Merchant Input Fields */}
      {!showAdvanced ? (
        <div>
          {/* Payer Address (auto-filled based on the selected role) */}
          <div className="mb-4">
            <label className={`block text-sm font-medium ${textColor}`}>
              {role === "payer" ? "Payer Address" : "Fill User Address"}
            </label>
            <input
              type="text"
              value={role === "payer" ? payer : merchant}
              onChange={(e) => role === "payer" ? setPayer(e.target.value) : setMerchant(e.target.value)}
              placeholder={role === "payer" ? "Enter payer address" : "Enter user address"}
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${role === "payer" ? highlightPayer : highlightMerchant ? "border-blue-500" : ""} ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
            />
          </div>
        </div>
      ) : (
        <div>
          {/* Advanced Fields */}
          <div className="mb-4">
            <label className={`block text-sm font-medium ${textColor}`}>Payer Address</label>
            <input
              type="text"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              placeholder="Enter payer address"
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${highlightPayer ? "border-blue-500" : ""} ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium ${textColor}`}>Merchant Address</label>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Enter merchant address"
              className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${highlightMerchant ? "border-blue-500" : ""} ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
            />
          </div>
        </div>
      )}

      {/* Status Messages */}
      {isLoading && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Loading...</p>}
      {error && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {error.message}</p>}

      {/* Fetch Button */}
      <div className="mt-6 flex justify-start">
        <button
          onClick={fetchChannelData}
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg`}
        >
          <span>Fetch Channel Data</span>
        </button>
      </div>
    </div>
  );
};

export default ViewChannelTab;
