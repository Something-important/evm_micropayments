"use client";
import React, { useState, useEffect } from "react";
import { providers, utils } from "ethers"; // ethers.js v5.8.0 (fallback)
// import { ethers } from "ethers"; // ethers.js v6.x (uncomment post-SDK update)
import { HashchainProtocol } from "@hashchain/sdk";
import { useTheme } from "../context/themeContext";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";

// Contract address (aligned with CreateChannelTab)
const CONTRACT_ADDRESS = "0x0996EE5AfDbaF4914B2e0Fe51D12585298a805d7";

// Target chain: Citrea Testnet
const TARGET_CHAIN = {
  chainId: 5115,
  chainName: "Citrea Testnet",
};

const ReclaimChannelTab: React.FC = () => {
  const [merchant, setMerchant] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { theme } = useTheme();
  const { address: userAddress, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Derive provider (v5.8.0)
  const provider = publicClient ? new providers.JsonRpcProvider(publicClient.transport.url) : null;

  // Post-SDK-update provider (v6.x)
  // const provider = publicClient ? new ethers.JsonRpcProvider(publicClient.transport.url) : null;

  // Wallet and network status
  useEffect(() => {
    if (isConnected && userAddress) {
      setStatus(`Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`);
    } else {
      setMerchant("");
      setStatus("");
      setErrorMessage("Please connect your wallet using the header button.");
    }
  }, [isConnected, userAddress]);

  useEffect(() => {
    if (chainId && chainId !== TARGET_CHAIN.chainId) {
      setErrorMessage(`Wrong network detected. Please switch to ${TARGET_CHAIN.chainName} (Chain ID ${TARGET_CHAIN.chainId}).`);
    } else if (isConnected) {
      setErrorMessage(null);
    }
  }, [chainId, isConnected]);

  const reclaimChannel = async () => {
    setErrorMessage("");
    setTxHash(null);
    setStatus("");
    setIsPending(true);

    if (!isConnected || !userAddress) {
      setErrorMessage("Please connect your wallet using the header button.");
      setIsPending(false);
      return;
    }

    if (!provider) {
      setErrorMessage("Wallet provider not available. Please ensure your wallet is connected.");
      setIsPending(false);
      return;
    }

    if (!walletClient) {
      setErrorMessage("Wallet signer not available. Please reconnect your wallet.");
      setIsPending(false);
      return;
    }

    if (chainId !== TARGET_CHAIN.chainId) {
      setErrorMessage(`Wrong network. Please switch to ${TARGET_CHAIN.chainName} (Chain ID ${TARGET_CHAIN.chainId}).`);
      setIsPending(false);
      return;
    }

    // Validate merchant address
    if (!merchant || !utils.isAddress(merchant)) {
      setErrorMessage("Invalid merchant address.");
      setIsPending(false);
      return;
    }

    try {
      // Derive signer (v5.8.0)
      const resolvedSigner = new providers.Web3Provider(walletClient as any).getSigner();

      // Post-SDK-update signer (v6.x)
      // const browserProvider = new ethers.BrowserProvider(walletClient);
      // const resolvedSigner = await browserProvider.getSigner();

      let hashchainSDK: HashchainProtocol;
      try {
        hashchainSDK = new HashchainProtocol(provider, CONTRACT_ADDRESS, resolvedSigner);
      } catch (err: any) {
        setErrorMessage(`SDK Error: Failed to initialize HashchainProtocol - ${err.message || "Invalid parameters"}`);
        setIsPending(false);
        return;
      }

      setStatus("Initiating reclaim transaction...");
      const tx = await hashchainSDK.reclaimChannel({merchant,tokenAddress: utils.getAddress("0x0000000000000000000000000000000000000000"),});

      setTxHash(tx.hash);
      setStatus(`Transaction sent! Hash: ${tx.hash}`);

      const receipt = await tx.wait();
      setStatus(`Transaction confirmed in block: ${receipt.blockNumber}`);
    } catch (err: any) {
      let errorMsg = "Unknown error";
      if (err.code === "INSUFFICIENT_FUNDS") {
        errorMsg = "Insufficient cBTC for gas or transaction.";
      } else if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
        errorMsg = "Cannot estimate gas. Check contract address or parameters.";
      } else if (err.reason) {
        errorMsg = `Contract Error: ${err.reason}`;
      } else {
        errorMsg = `Transaction Error: ${err.message || "Failed to reclaim channel"}`;
      }
      setErrorMessage(errorMsg);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {/* Title Section with Advanced Options Button */}
      <div className="flex justify-between items-center mb-4">
        <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
          Reclaim Payment Channel
        </h4>
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

      {/* Instructions */}
      <div className="mb-4">
        <p className={`text-sm ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
          Enter the merchant address to reclaim the payment channel.
          <br />
          Ensure the address is correct before submitting.
        </p>
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

      {/* Advanced Options (Placeholder) */}
      {showAdvanced && (
        <div className="mb-4">
          <p className={`text-sm ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
            No advanced options available at this time.
          </p>
        </div>
      )}

      {/* Status Messages */}
      {isPending && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction pending...</p>}
      {status && <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>{status}</p>}
      {errorMessage && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {errorMessage}</p>}

      {/* Transaction Link */}
      {txHash && (
        <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>
          Transaction submitted! Hash:{" "}
          <a
            href={`https://explorer.testnet.citrea.xyz/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View on Citrea Explorer
          </a>
        </p>
      )}

      {/* Reclaim Button */}
      <div className="mt-6 flex justify-start">
        <button
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg ${isPending || !isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={reclaimChannel}
          disabled={isPending || !isConnected}
        >
          <span>{isPending ? "Reclaiming..." : "Reclaim Channel"}</span>
        </button>
      </div>
    </div>
  );
};

export default ReclaimChannelTab;