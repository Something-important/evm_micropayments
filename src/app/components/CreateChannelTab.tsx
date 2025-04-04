import React, { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { TransactionResponse } from "ethers";
import contractABI from "../utils/contracts/citrea.json";
import { useTheme } from "../context/themeContext";

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const CreateChannelTab: React.FC = () => {
  const [merchant, setMerchant] = useState("");
  const [trustAnchor, setTrustAnchor] = useState("");
  const [amount, setAmount] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [merchantWithdrawAfterBlocks, setMerchantWithdrawAfterBlocks] = useState("");
  const [payerWithdrawAfterBlocks, setPayerWithdrawAfterBlocks] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { writeContract, isPending, error: txError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  const { theme } = useTheme(); // Accessing the current theme

  // Function to create channel
  const createChannel = async () => {
    setErrorMessage(null); // Clear previous errors
    setTxHash(null); // Reset tx hash

    try {
      const tx: TransactionResponse | void = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "createChannel",
        args: [
          merchant,
          trustAnchor,
          BigInt(amount),
          BigInt(numberOfTokens),
          BigInt(merchantWithdrawAfterBlocks),
          BigInt(payerWithdrawAfterBlocks),
        ],
        value: BigInt(amount),
      });

      // If the transaction is sent, update txHash
      if (tx !== undefined && tx !== null && 'hash' in tx) {
        setTxHash((tx as TransactionResponse).hash);
      }
    } catch (error: any) {
      console.error("Error creating channel:", error);

      if (error.shortMessage) {
        setErrorMessage(error.shortMessage);
      } else if (error.code === "ACTION_REJECTED") {
        setErrorMessage("Transaction rejected by user.");
      } else if (error.message.includes("insufficient funds")) {
        setErrorMessage("Not enough ETH to cover the transaction cost.");
      } else if (error.message.includes("execution reverted")) {
        setErrorMessage("Transaction reverted. Check input values.");
      } else {
        setErrorMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Title Section with Advanced Options Button */}
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
          Create Payment Channel
        </h4>
        {/* Advanced Options Toggle Button (Top Right) */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none ${theme === "light" ? "bg-light-background" : "bg-dark-background"}`}
        >
          <span className="flex items-center">
            <i className={`fa ${showAdvanced ? "fa-chevron-up" : "fa-chevron-down"} mr-1`}></i>
            Advanced Options
          </span>
        </button>
      </div>

      {/* Optional: Info or Instructions above the form */}
      <div className="mb-4">
        <p className={`text-sm ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
          Please fill out the following details to create a payment channel.
          <br />
          Ensure that the values are correct before submitting.
        </p>
      </div>

      {/* Form Fields Section */}
      {[
        { label: "Merchant Address", value: merchant, setter: setMerchant },
        { label: "Trust Anchor", value: trustAnchor, setter: setTrustAnchor },
        { label: "Amount", value: amount, setter: setAmount, type: "number" },
      ].map(({ label, value, setter, type = "text" }) => (
        <div key={label} className="mb-4">
          <label
            className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
          >
            {label}
          </label>
          <input
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => setter(e.target.value)}
          />
        </div>
      ))}

      {/* Show Advanced Options if Toggled */}
      {showAdvanced && (
        <>
          {[
            { label: "Number of Tokens", value: numberOfTokens, setter: setNumberOfTokens, type: "number" },
            { label: "Merchant Withdraw After Blocks", value: merchantWithdrawAfterBlocks, setter: setMerchantWithdrawAfterBlocks, type: "number" },
            { label: "Payer Withdraw After Blocks", value: payerWithdrawAfterBlocks, setter: setPayerWithdrawAfterBlocks, type: "number" },
          ].map(({ label, value, setter, type = "text" }) => (
            <div key={label} className="mb-4">
              <label
                className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
              >
                {label}
              </label>
              <input
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          ))}
        </>
      )}

      {/* Status Messages */}
      {isPending && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction pending...</p>}
      {isConfirming && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Waiting for confirmation...</p>}
      {isConfirmed && <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction confirmed!</p>}
      {errorMessage && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {errorMessage}</p>}

      {/* Show transaction link when hash is available */}
      {txHash && (
        <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>
          Transaction successful! Hash:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Etherscan
          </a>
        </p>
      )}

      {/* Create Channel Button at bottom-left */}
      <div className="mt-6 flex justify-start">
        <button
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg`}
          onClick={createChannel}
          disabled={isPending}
        >
          <span>{isPending ? "Processing..." : "Create Channel"}</span>
        </button>
      </div>
    </div>
  );
};

export default CreateChannelTab;
