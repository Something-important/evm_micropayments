import React, { useState } from "react";
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { type UseWriteContractsReturnType } from "wagmi/experimental";
import contractABI from "../utils/contracts/citrea.json";

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

  const { writeContract, isPending, error: txError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  const createChannel = async () => {
    setErrorMessage(null); // Clear previous errors
    setTxHash(null); // Reset tx hash

    try {
      const tx = await writeContract({
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

      setTxHash(tx); // Store transaction hash

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
      <h4 className="text-xl font-semibold mb-4">Create Payment Channel</h4>

      {[
        { label: "Merchant Address", value: merchant, setter: setMerchant },
        { label: "Trust Anchor", value: trustAnchor, setter: setTrustAnchor },
        { label: "Amount", value: amount, setter: setAmount, type: "number" },
        { label: "Number of Tokens", value: numberOfTokens, setter: setNumberOfTokens, type: "number" },
        { label: "Merchant Withdraw After Blocks", value: merchantWithdrawAfterBlocks, setter: setMerchantWithdrawAfterBlocks, type: "number" },
        { label: "Payer Withdraw After Blocks", value: payerWithdrawAfterBlocks, setter: setPayerWithdrawAfterBlocks, type: "number" }
      ].map(({ label, value, setter, type = "text" }) => (
        <div key={label} className="mb-4">
          <label className="block text-sm font-medium">{label}</label>
          <input
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type={type}
            placeholder={`Enter ${label.toLowerCase()}`}
            value={value}
            onChange={(e) => setter(e.target.value)}
          />
        </div>
      ))}

      {/* Status Messages */}
      {isPending && <p className="text-yellow-400">Transaction pending...</p>}
      {isConfirming && <p className="text-yellow-400">Waiting for confirmation...</p>}
      {isConfirmed && <p className="text-green-400">Transaction confirmed!</p>}
      {errorMessage && <p className="text-red-400">Error: {errorMessage}</p>}

      {/* Show transaction link when hash is available */}
      {txHash && (
        <p className="text-green-400">
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

      {/* Button */}
      <button
        className="mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500"
        onClick={createChannel}
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Create Channel"}
      </button>
    </div>
  );
};

export default CreateChannelTab;
