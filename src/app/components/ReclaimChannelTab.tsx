import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import contractABI from "../utils/contracts/citrea.json";

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const ReclaimChannelTab: React.FC = () => {
  const [merchant, setMerchant] = useState("");
  const { writeContract, isPending, error } = useWriteContract();

  const reclaimChannel = async () => {
    try {
      const transaction = await writeContract({
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
      <h4 className="text-xl font-semibold mb-4">Reclaim Payment Channel</h4>
      <div className="mb-4">
        <label className="block text-sm font-medium">Merchant Address</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="Enter merchant address"
          onChange={(e) => setMerchant(e.target.value)}
        />
      </div>
      {isPending && <p className="text-yellow-400">Transaction pending...</p>}
      {error && <p className="text-red-400">Error: {error.message}</p>}
      <button
        className="mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500"
        onClick={reclaimChannel}
      >
        Reclaim Channel
      </button>
    </div>
  );
};

export default ReclaimChannelTab;
