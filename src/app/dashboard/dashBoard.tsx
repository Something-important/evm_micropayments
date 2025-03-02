"use client";
import React, { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import { ConnectWallet } from "../components/connectButton";
import contractABI from "../utils/contracts/contract.json";
import contractABI2 from "../utils/contracts/citrea.json";

const contractAddress = "0x029a0EE432447F93a516d96fFA5dB19463c7c6D8";
const contractAddress2 = "0xDfc2613D13f56344060Ad8EA93a296149263d607";

const Dashboard: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<number>(1);
  const [amount, setAmount] = useState(0);
  const { data: result, isPending, error, writeContract } = useWriteContract();
  const [betResult, setBetResult] = useState(false);

  const { data: balance, isLoading } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getContractBalance",
  });

  const { data: balance2, isLoading: isLoading2 } = useReadContract({
    address: contractAddress2,
    abi: contractABI2,
    functionName: "channelsMapping",
    args: ['0xb1B560CD3929949B079d5f51A570891c69C7682D', '0x5E1db14378278D012b192b022cDB609eA5A5EC52'],
  });
  console.log('this is channel info',balance2);

  const handleOptionChange = (option: number) => {
    setSelectedValue(option);
  };

  const placeBet = async () => {
    const numberValue: number = Number(amount) * 10 ** 18;
    const bigintValue: bigint = BigInt(numberValue);

    if (Number(selectedValue) < 1 || Number(selectedValue) > 6) {
      alert("Invalid selected value");
      return;
    }

    if (numberValue > Number(balance) / 6) {
      alert("Choose a smaller amount");
      return;
    }

    try {
      const transaction = await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: "placeBet",
        args: [selectedValue],
        value: bigintValue,
      });
      console.log("Transaction hash:", transaction);

      if (!result) {
        throw new Error("Transaction failed");
      }

      setBetResult(true);
      return result;
    } catch (error) {
      console.error("Error writing to contract:", error);
      setBetResult(false);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-yellow-400">LuckyRoll 🎲</h1>
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <span className="text-sm">Loading Casino balance...</span>
          ) : balance ? (
            <span className="text-sm text-green-400"> Casino Balance: {(Number(balance) / 10 ** 18).toFixed(2)} ETH</span>
          ) : (
            <span className="text-sm text-red-400"> Casino Balance unavailable</span>
          )}
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-10 w-full max-w-md">
        <h4 className="text-xl font-semibold mb-4">Test Your Intuition</h4>
        
        <div className="w-full mb-4">
          <label className="block text-sm font-medium">Enter Amount</label>
          <input 
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
            type="number" 
            placeholder="0.00" 
            step="0.00001" 
            onChange={(e) => setAmount(Number(e.target.value))} 
          />
        </div>
        
        <div className="w-full mb-4">
          <label className="block text-sm font-medium">Select Number</label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button 
                key={num} 
                className={`px-4 py-2 rounded-lg text-lg font-semibold ${selectedValue === num ? "bg-yellow-400 text-gray-900" : "bg-gray-700 hover:bg-gray-600"}`} 
                onClick={() => handleOptionChange(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {isPending && <p className="text-yellow-400">Transaction pending...</p>}
        {error && <p className="text-red-400">Error: {error.message}</p>}
        {result && <p className="text-green-400">Transaction hash: {result}</p>}

        <button 
          className="mt-4 px-6 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500" 
          onClick={placeBet}
        >
          Try Your Luck
        </button>
      </div>
    </div>
  );
};

export default Dashboard;