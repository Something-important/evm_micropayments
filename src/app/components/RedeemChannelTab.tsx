// import React, { useState } from "react";
// import { useWriteContract } from "wagmi";
// import contractABI from "../utils/contracts/citrea.json";

// const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

// const RedeemChannelTab: React.FC = () => {
//   const [payer, setPayer] = useState("");
//   const [finalHashValue, setFinalHashValue] = useState("");
//   const [numberOfTokensUsed, setNumberOfTokensUsed] = useState("");
//   const { writeContract, isPending, error } = useWriteContract();

//   const redeemChannel = async () => {
//     try {
//       const transaction = await writeContract({
//         address: contractAddress,
//         abi: contractABI,
//         functionName: "redeemChannel",
//         args: [payer, finalHashValue, BigInt(numberOfTokensUsed)],
//       });
//       console.log("Transaction hash:", transaction);
//     } catch (error) {
//       console.error("Error redeeming channel:", error);
//     }
//   };

//   return (
//     <div>
//       <h4 className="text-xl font-semibold mb-4">Redeem Payment Channel</h4>
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Payer Address</label>
//         <input
//           className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           type="text"
//           placeholder="Enter payer address"
//           onChange={(e) => setPayer(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Final Hash Value</label>
//         <input
//           className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           type="text"
//           placeholder="Enter final hash value"
//           onChange={(e) => setFinalHashValue(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Number of Tokens Used</label>
//         <input
//           className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           type="number"
//           placeholder="Enter number of tokens used"
//           onChange={(e) => setNumberOfTokensUsed(e.target.value)}
//         />
//       </div>
//       {isPending && <p className="text-yellow-400">Transaction pending...</p>}
//       {error && <p className="text-red-400">Error: {error.message}</p>}
//       <button
//         className="mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500"
//         onClick={redeemChannel}
//       >
//         Redeem Channel
//       </button>
//     </div>
//   );
// };

// export default RedeemChannelTab;


'use client';
import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import contractABI from "../utils/contracts/citrea.json";

const contractAddress = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const RedeemChannelTab: React.FC = () => {
  const [payer, setPayer] = useState("");
  const [finalHashValue, setFinalHashValue] = useState("");
  const [numberOfTokensUsed, setNumberOfTokensUsed] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { writeContract, isPending, error } = useWriteContract();

  const redeemChannel = async () => {
    try {
      const transaction:any = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "redeemChannel",
        args: [payer, finalHashValue, BigInt(numberOfTokensUsed)],
      });
      console.log("Transaction hash:", transaction);
      setTxHash(transaction);
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
      <h4 className="text-xl font-semibold mb-4">Redeem Payment Channel</h4>
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
        <label className="block text-sm font-medium">Final Hash Value</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="text"
          placeholder="Enter final hash value"
          value={finalHashValue}
          onChange={(e) => setFinalHashValue(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Tokens Used</label>
        <input
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          type="number"
          placeholder="Enter number of tokens used"
          value={numberOfTokensUsed}
          onChange={(e) => setNumberOfTokensUsed(e.target.value)}
        />
      </div>
      {isPending && <p className="text-yellow-400">Transaction pending...</p>}
      {error && <p className="text-red-400">Error: {error.message}</p>}
      {txHash && (
        <p className="text-green-400">
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
      <button
        className="mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500"
        onClick={redeemChannel}
      >
        Redeem Channel
      </button>
    </div>
  );
};

export default RedeemChannelTab;

