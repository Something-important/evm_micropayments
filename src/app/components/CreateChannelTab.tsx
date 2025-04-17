// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { HashchainProtocol, HashchainProtocolABI } from "@hashchain/sdk";
// import { useTheme } from "../context/themeContext";
// import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";

// // Contract address from Home component
// const CONTRACT_ADDRESS = "0x0996EE5AfDbaF4914B2e0Fe51D12585298a805d7";

// // Target chain: Citrea Testnet
// const TARGET_CHAIN = {
//   chainId: 5115, // Citrea Testnet
//   chainName: "Citrea Testnet",
// };

// const CreateChannelTab: React.FC = () => {
//   const [merchant, setMerchant] = useState("");
//   const [trustAnchor, setTrustAnchor] = useState("");
//   const [amount, setAmount] = useState("");
//   const [numberOfTokens, setNumberOfTokens] = useState("");
//   const [merchantWithdrawAfterBlocks, setMerchantWithdrawAfterBlocks] = useState("");
//   const [payerWithdrawAfterBlocks, setPayerWithdrawAfterBlocks] = useState("");
//   const [txHash, setTxHash] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [status, setStatus] = useState<string>("");
//   const [showAdvanced, setShowAdvanced] = useState(false);
//   const [isPending, setIsPending] = useState(false);

//   const { theme } = useTheme();
//   const { address, isConnected } = useAccount();
//   const chainId = useChainId();
//   const publicClient = usePublicClient();
//   const { data: walletClient } = useWalletClient();

//   // Derive provider and signer
//   const provider = publicClient ? new ethers.JsonRpcProvider(publicClient.transport.url) : null;

//   // Pre-fill merchant address and update status
//   useEffect(() => {
//     if (isConnected && address) {
//       setMerchant(address);
//       setStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
//     } else {
//       setMerchant("");
//       setStatus("");
//       setErrorMessage("Please connect your wallet using the header button.");
//     }
//   }, [isConnected, address]);

//   // Check network
//   useEffect(() => {
//     if (chainId && chainId !== TARGET_CHAIN.chainId) {
//       setErrorMessage(`Wrong network detected. Please switch to ${TARGET_CHAIN.chainName} (Chain ID ${TARGET_CHAIN.chainId}).`);
//     } else if (isConnected) {
//       setErrorMessage(null);
//     }
//   }, [chainId, isConnected]);

//   // Adapted from test function with input processing
//   const createChannel = async () => {
//     setErrorMessage("");
//     setTxHash(null);
//     setStatus("");
//     setIsPending(true);

//     if (!isConnected || !address) {
//       setErrorMessage("Please connect your wallet using the header button.");
//       setIsPending(false);
//       return;
//     }

//     if (!provider) {
//       setErrorMessage("Wallet provider not available.");
//       setIsPending(false);
//       return;
//     }

//     if (!walletClient) {
//       setErrorMessage("Wallet signer not available.");
//       setIsPending(false);
//       return;
//     }

//     if (chainId !== TARGET_CHAIN.chainId) {
//       setErrorMessage(`Wrong network. Please switch to ${TARGET_CHAIN.chainName} (Chain ID ${TARGET_CHAIN.chainId}).`);
//       setIsPending(false);
//       return;
//     }

//     // Input validation
//     if (!merchant || !ethers.isAddress(merchant)) {
//       setErrorMessage("Invalid merchant address.");
//       setIsPending(false);
//       return;
//     }

//     if (!trustAnchor || !trustAnchor.match(/^0x[a-fA-F0-9]{64}$/)) {
//       setErrorMessage("Invalid trust anchor (must be 32-byte hex).");
//       setIsPending(false);
//       return;
//     }

//     const parsedAmount = parseFloat(amount);
//     if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
//       setErrorMessage("Invalid amount (must be a positive number).");
//       setIsPending(false);
//       return;
//     }

//     const parsedTokens = parseInt(numberOfTokens, 10);
//     if (!numberOfTokens || isNaN(parsedTokens) || parsedTokens <= 0) {
//       setErrorMessage("Invalid number of tokens (must be a positive integer).");
//       setIsPending(false);
//       return;
//     }

//     const parsedMerchantBlocks = parseInt(merchantWithdrawAfterBlocks, 10);
//     if (!merchantWithdrawAfterBlocks || isNaN(parsedMerchantBlocks) || parsedMerchantBlocks <= 0) {
//       setErrorMessage("Invalid merchant withdraw blocks (must be a positive integer).");
//       setIsPending(false);
//       return;
//     }

//     const parsedPayerBlocks = parseInt(payerWithdrawAfterBlocks, 10);
//     if (!payerWithdrawAfterBlocks || isNaN(parsedPayerBlocks) || parsedPayerBlocks <= 0) {
//       setErrorMessage("Invalid payer withdraw blocks (must be a positive integer).");
//       setIsPending(false);
//       return;
//     }

//     try {
//       // Derive signer from walletClient
//       const browserProvider = new ethers.BrowserProvider(walletClient);
//       const resolvedSigner = await browserProvider.getSigner();

//       let hashchainSDK: HashchainProtocol;
//       try {
//         hashchainSDK = new HashchainProtocol(provider, CONTRACT_ADDRESS, resolvedSigner);
//       } catch (err: any) {
//         setErrorMessage(`SDK Error: Failed to initialize HashchainProtocol - ${err.message || "Invalid parameters"}`);
//         setIsPending(false);
//         return;
//       }

//       setStatus("Creating payment channel...");
//       const tx = await hashchainSDK.createChannel({
//         merchant,
//         tokenAddress: ethers.ZeroAddress, // cBTC (native token)
//         trustAnchor,
//         amount: ethers.parseEther(amount),
//         numberOfTokens: parsedTokens,
//         merchantWithdrawAfterBlocks: parsedMerchantBlocks,
//         payerWithdrawAfterBlocks: parsedPayerBlocks,
//       });

//       setTxHash(tx.hash);
//       setStatus(`Transaction sent! Hash: ${tx.hash}`);

//       const receipt = await tx.wait();
//       setStatus(`Transaction confirmed in block: ${receipt.blockNumber}`);
//     } catch (err: any) {
//       let errorMsg = "Unknown error";
//       if (err.code === "INSUFFICIENT_FUNDS") {
//         errorMsg = "Insufficient cBTC for gas or transaction.";
//       } else if (err.code === "UNPREDICTABLE_GAS_LIMIT") {
//         errorMsg = "Cannot estimate gas. Check contract address or parameters.";
//       } else if (err.reason) {
//         errorMsg = `Contract Error: ${err.reason}`;
//       } else {
//         errorMsg = `Transaction Error: ${err.message || "Failed to create channel"}`;
//       }
//       setErrorMessage(errorMsg);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   return (
//     <div>
//       {/* Title Section with Advanced Options Button */}
//       <div className="flex justify-between items-center mb-4">
//         <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
//           Create Payment Channel
//         </h4>
//         <button
//           onClick={() => setShowAdvanced(!showAdvanced)}
//           className={`text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none ${theme === "light" ? "bg-light-background" : "bg-dark-background"}`}
//         >
//           <span className="flex items-center">
//             <i className={`fa ${showAdvanced ? "fa-chevron-up" : "fa-chevron-down"} mr-1`}></i>
//             Advanced Options
//           </span>
//         </button>
//       </div>

//       {/* Instructions */}
//       <div className="mb-4">
//         <p className={`text-sm ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
//           Please fill out the following details to create a payment channel.
//           <br />
//           Ensure that the values are correct before submitting.
//         </p>
//       </div>

//       {/* Form Fields */}
//       {[
//         { label: "Merchant Address", value: merchant, setter: setMerchant, disabled: isConnected },
//         { label: "Trust Anchor", value: trustAnchor, setter: setTrustAnchor },
//         { label: "Amount", value: amount, setter: setAmount, type: "number" },
//       ].map(({ label, value, setter, type = "text", disabled = false }) => (
//         <div key={label} className="mb-4">
//           <label
//             className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
//           >
//             {label}
//           </label>
//           <input
//             className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
//             type={type}
//             placeholder={`Enter ${label.toLowerCase()}`}
//             value={value}
//             onChange={(e) => setter(e.target.value)}
//             disabled={disabled}
//           />
//         </div>
//       ))}

//       {/* Advanced Options */}
//       {showAdvanced && (
//         <>
//           {[
//             { label: "Number of Tokens", value: numberOfTokens, setter: setNumberOfTokens, type: "number" },
//             { label: "Merchant Withdraw After Blocks", value: merchantWithdrawAfterBlocks, setter: setMerchantWithdrawAfterBlocks, type: "number" },
//             { label: "Payer Withdraw After Blocks", value: payerWithdrawAfterBlocks, setter: setPayerWithdrawAfterBlocks, type: "number" },
//           ].map(({ label, value, setter, type = "text" }) => (
//             <div key={label} className="mb-4">
//               <label
//                 className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
//               >
//                 {label}
//               </label>
//               <input
//                 className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
//                 type={type}
//                 placeholder={`Enter ${label.toLowerCase()}`}
//                 value={value}
//                 onChange={(e) => setter(e.target.value)}
//               />
//             </div>
//           ))}
//         </>
//       )}

//       {/* Status Messages */}
//       {isPending && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Transaction pending...</p>}
//       {status && <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>{status}</p>}
//       {errorMessage && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {errorMessage}</p>}

//       {/* Transaction Link */}
//       {txHash && (
//         <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>
//           Transaction successful! Hash:{" "}
//           <a
//             href={`https://explorer.testnet.citrea.xyz/tx/${txHash}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline"
//           >
//             View on Citrea Explorer
//           </a>
//         </p>
//       )}

//       {/* Create Channel Button */}
//       <div className="mt-6 flex justify-start">
//         <button
//           className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg ${isPending || !isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
//           onClick={createChannel}
//           disabled={isPending || !isConnected}
//         >
//           <span>{isPending ? "Processing..." : "Create Channel"}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateChannelTab;



import React, { useState, useEffect } from "react";
import { providers, utils } from "ethers"; // ethers.js v5.8.0
import { HashchainProtocol, HashchainProtocolABI } from "@hashchain/sdk";
import { useTheme } from "../context/themeContext";
import { useAccount, useChainId, usePublicClient, useWalletClient } from "wagmi";

// Contract address
const CONTRACT_ADDRESS = "0x0996EE5AfDbaF4914B2e0Fe51D12585298a805d7";

// Target chain: Citrea Testnet
const TARGET_CHAIN = {
  chainId: 5115,
  chainName: "Citrea Testnet",
};

const CreateChannelTab: React.FC = () => {
  const [merchant, setMerchant] = useState("");
  const [trustAnchor, setTrustAnchor] = useState("");
  const [amount, setAmount] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [merchantWithdrawAfterBlocks, setMerchantWithdrawAfterBlocks] = useState("");
  const [payerWithdrawAfterBlocks, setPayerWithdrawAfterBlocks] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const { theme } = useTheme();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Derive provider
  const provider = publicClient ? new providers.JsonRpcProvider(publicClient.transport.url) : null;

  // Pre-fill merchant address and update status
  useEffect(() => {
    if (isConnected && address) {
      setMerchant(address);
      setStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
    } else {
      setMerchant("");
      setStatus("");
      setErrorMessage("Please connect your wallet using the header button.");
    }
  }, [isConnected, address]);

  // Check network
  useEffect(() => {
    if (chainId && chainId !== TARGET_CHAIN.chainId) {
      setErrorMessage(`Wrong network detected. Please switch to ${TARGET_CHAIN.chainName} (Chain ID ${TARGET_CHAIN.chainId}).`);
    } else if (isConnected) {
      setErrorMessage(null);
    }
  }, [chainId, isConnected]);

  const createChannel = async () => {
    setErrorMessage("");
    setTxHash(null);
    setStatus("");
    setIsPending(true);

    if (!isConnected || !address) {
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

    // Input validation
    if (!merchant || !utils.isAddress(merchant)) {
      setErrorMessage("Invalid merchant address.");
      setIsPending(false);
      return;
    }

    if (!trustAnchor || (!utils.isAddress(trustAnchor) && !trustAnchor.match(/^0x[a-fA-F0-9]{64}$/))) {
      setErrorMessage("Invalid trust anchor (must be a valid address or 32-byte hex).");
      setIsPending(false);
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Invalid amount (must be a positive number).");
      setIsPending(false);
      return;
    }

    const parsedTokens = parseInt(numberOfTokens, 10);
    if (!numberOfTokens || isNaN(parsedTokens) || parsedTokens <= 0) {
      setErrorMessage("Invalid number of tokens (must be a positive integer).");
      setIsPending(false);
      return;
    }

    const parsedMerchantBlocks = parseInt(merchantWithdrawAfterBlocks, 10);
    if (!merchantWithdrawAfterBlocks || isNaN(parsedMerchantBlocks) || parsedMerchantBlocks <= 0) {
      setErrorMessage("Invalid merchant withdraw blocks (must be a positive integer).");
      setIsPending(false);
      return;
    }

    const parsedPayerBlocks = parseInt(payerWithdrawAfterBlocks, 10);
    if (!payerWithdrawAfterBlocks || isNaN(parsedPayerBlocks) || parsedPayerBlocks <= 0) {
      setErrorMessage("Invalid payer withdraw blocks (must be a positive integer).");
      setIsPending(false);
      return;
    }

    try {
      // Derive signer (ethers v5.x)
      const resolvedSigner = new providers.Web3Provider(walletClient as any).getSigner();

      let hashchainSDK: HashchainProtocol;
      try {
        hashchainSDK = new HashchainProtocol(provider, CONTRACT_ADDRESS, resolvedSigner);
      } catch (err: any) {
        setErrorMessage(`SDK Error: Failed to initialize HashchainProtocol - ${err.message || "Invalid parameters"}`);
        setIsPending(false);
        return;
      }

      setStatus("Creating payment channel...");
      const tx = await hashchainSDK.createChannel({
        merchant,
        tokenAddress: utils.getAddress("0x0000000000000000000000000000000000000000"), // cBTC
        trustAnchor,
        amount: utils.parseEther(amount),
        numberOfTokens: parsedTokens,
        merchantWithdrawAfterBlocks: parsedMerchantBlocks,
        payerWithdrawAfterBlocks: parsedPayerBlocks,
      });

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
        errorMsg = `Transaction Error: ${err.message || "Failed to create channel"}`;
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
          Create Payment Channel
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
          Please fill out the following details to create a payment channel.
          <br />
          Ensure that the values are correct before submitting.
        </p>
      </div>

      {/* Form Fields */}
      {[
        { label: "Merchant Address", value: merchant, setter: setMerchant, disabled: false},
        { label: "Trust Anchor", value: trustAnchor, setter: setTrustAnchor },
        { label: "Amount", value: amount, setter: setAmount, type: "number" },
      ].map(({ label, value, setter, type = "text", disabled = false }) => (
        <div key={label} className="mb-4">
          <label
            className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
          >
            {label}
          </label>
          <input
            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"} ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => setter(e.target.value)}
            disabled={disabled}
          />
        </div>
      ))}

      {/* Advanced Options */}
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
      {status && <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>{status}</p>}
      {errorMessage && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Error: {errorMessage}</p>}

      {/* Transaction Link */}
      {txHash && (
        <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>
          Transaction successful! Hash:{" "}
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

      {/* Create Channel Button */}
      <div className="mt-6 flex justify-start">
        <button
          className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg ${isPending || !isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={createChannel}
          disabled={isPending || !isConnected}
        >
          <span>{isPending ? "Processing..." : "Create Channel"}</span>
        </button>
      </div>
    </div>
  );
};

export default CreateChannelTab;