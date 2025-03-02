'use client'
import React, { useState, useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import contractABI from "../utils/contracts/citrea.json";

// Define the interface for channel data
interface ChannelData {
  trustAnchor: string;
  amount: string; // The amount is typically a string in smart contracts
  numberOfTokens: string;
  merchantWithdrawAfterBlocks: string;
  payerWithdrawAfterBlocks: string;
}

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const ViewChannelTab: React.FC = () => {
  const [payer, setPayer] = useState<string>("");
  const [merchant, setMerchant] = useState<string>("");
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Fetch connected wallet address for merchant
  const { address: connectedAddress } = useAccount();

  // Automatically set the merchant to the connected wallet address
  useEffect(() => {
    if (connectedAddress) {
      setMerchant(connectedAddress); // Automatically set merchant as the connected address
    }
  }, [connectedAddress]);

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
      setError(null);
    } else {
      console.error("Payer or merchant address is missing.");
    }
  };

  // Utility function to format and remove trailing zeroes
  const formatAmount = (amount: string) => {
    if (amount) {
      // Assuming the amount is in wei (18 decimals)
      const etherAmount = Number(amount) / 10 ** 18;
      return etherAmount.toFixed(18).replace(/\.?0+$/, ''); // Remove trailing zeros
    }
    return "0";
  };

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">View Payment Channel</h4>
      <div className="mb-4">
        <label className="block text-sm font-medium">Payer Address</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="Enter payer address"
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Merchant Address</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="Merchant address (Auto-filled from wallet)"
          value={merchant}
          disabled // Disabled since it's auto-filled from wallet
        />
      </div>
      <button
        className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
        onClick={fetchChannelData}
        disabled={!payer || !merchant}
      >
        Fetch Channel Data
      </button>
      {isLoading && <p className="text-yellow-400">Loading channel data...</p>}
      {error && <p className="text-red-400">Error: {error.message}</p>}
      {channelData && !isLoading && (
        <div>
          <p>Trust Anchor: {channelData.trustAnchor}</p>
          <p>Amount: {formatAmount(channelData.amount)}</p>
          <p>Number of Tokens: {channelData.numberOfTokens}</p>
          <p>Merchant Withdraw After Blocks: {channelData.merchantWithdrawAfterBlocks}</p>
          <p>Payer Withdraw After Blocks: {channelData.payerWithdrawAfterBlocks}</p>
        </div>
      )}
    </div>
  );
};

export default ViewChannelTab;
