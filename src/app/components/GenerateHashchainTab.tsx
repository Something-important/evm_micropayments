import React, { useState } from "react";
import { ethers } from "ethers";
import { hashchain } from "@hashchain/sdk";
import { useTheme } from "../context/themeContext";

const GenerateHashchainTab: React.FC = () => {
    const [seed, setSeed] = useState<string>("");
    const [iterations, setIterations] = useState<string>("1");
    const [hashchainResult, setHashchainResult] = useState<string[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");
    const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [lookupIndex, setLookupIndex] = useState<string>(""); // User's search input
    const [lookupHash, setLookupHash] = useState<string | null>(null); // The hash for the searched index

    const { theme } = useTheme();

    // Generate hashchain off-chain
    const generateHashchain = async () => {
        setErrorMessage("");
        setHashchainResult(null);
        setStatus("");
        setLookupIndex(""); // Reset lookup index
        setLookupHash(null); // Reset lookup hash
        setIsGenerating(true);

        // Validate iterations
        const parsedIterations = parseInt(iterations, 10);
        if (iterations && (isNaN(parsedIterations) || parsedIterations < 1)) {
            setErrorMessage("Invalid number of iterations (must be a positive integer).");
            setIsGenerating(false);
            return;
        }

        try {
            setStatus("Generating hashchain...");

            // Generate hashchain (using seed or random bytes)
            let input: string = seed || ethers.utils.hexlify(ethers.utils.randomBytes(32));
            const result = hashchain(input, parsedIterations || 1);
            console.log("Generated hashchain:", result);
            if (!result.some((str) => str.match(/^0x[a-fA-F0-9]{64}$/))) {
                throw new Error("Generated hashchain is not a valid 32-byte hex.");
            }
            setHashchainResult(result);
            setStatus("Hashchain generated successfully!");
        } catch (err: any) {
            setErrorMessage(`Error: ${err.message || "Failed to generate hashchain"}`);
        } finally {
            setIsGenerating(false);
        }
    };

    // Handle lookup based on user input (Nth hash)
    const handleLookup = () => {
        if (!hashchainResult) return;

        const index = parseInt(lookupIndex, 10);
        const maxIndex = hashchainResult.length;

        if (isNaN(index) || index < 1 || index >= maxIndex) {
            setLookupHash(null);
            setErrorMessage(`Invalid payment number. Enter a number from 1 (last hash) to ${maxIndex - 1} (second to last hash).`);
            return;
        }

        const reversedIndex = hashchainResult.length - (index + 1); // Reverse lookup logic
        setErrorMessage(null);
        setLookupHash(hashchainResult[reversedIndex]);
    };

    return (
        <div>
            {/* Title Section with Advanced Options Button */}
            <div className="flex justify-between items-center mb-4">
                <h4 className={`text-xl font-semibold ${theme === "light" ? "text-light-primary" : "text-dark-primary"}`}>
                    Generate Hashchain
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
                    Generate a 32-byte hashchain to use as a trust anchor.
                    <br />
                    Leave the seed blank for a random hashchain or enter a custom seed.
                </p>
            </div>

            {/* Form Fields */}
            <div className="mb-4">
                <label
                    className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
                >
                    Seed (Optional)
                </label>
                <input
                    className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
                    type="text"
                    placeholder="Enter seed or leave blank for random"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                />
            </div>

            {/* Advanced Options */}
            {showAdvanced && (
                <div className="mb-4">
                    <label
                        className={`block text-sm font-medium ${theme === "light" ? "text-gray-900" : "text-gray-100"}`}
                    >
                        Iterations
                    </label>
                    <input
                        className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light" ? "bg-light-background text-light-text border-light-border focus:ring-yellow-400" : "bg-dark-background text-dark-text border-dark-border focus:ring-yellow-400"}`}
                        type="number"
                        placeholder="Enter number of hash iterations (default: 1)"
                        value={iterations}
                        onChange={(e) => setIterations(e.target.value)}
                    />
                </div>
            )}

            {/* Generate Button */}
            <div className="mt-6 flex justify-start">
                <button
                    className={`px-6 py-3 rounded-lg bg-gradient-to-r ${theme === "light" ? "from-green-400 to-green-500 text-gray-900" : "from-green-600 to-green-700 text-gray-900"} font-semibold hover:bg-green-500 focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-lg ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={generateHashchain}
                    disabled={isGenerating}
                >
                    <span>{isGenerating ? "Generating..." : "Generate Hashchain"}</span>
                </button>
            </div>

            {/* Status Messages */}
            {isGenerating && <p className={`text-yellow-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>Generating...</p>}
            {status && <p className={`text-green-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>{status}</p>}
            {errorMessage && <p className={`text-red-400 ${theme === "light" ? "bg-dark-background" : "bg-light-background"}`}>{errorMessage}</p>}

            {/* Only show the hashchain data after it's generated */}
            {hashchainResult && (
                <div>
                    {/* Lookup for nth hash */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-1">
                            Find Hash for Payment #
                        </label>
                        <input
                            type="number"
                            value={lookupIndex}
                            onChange={(e) => setLookupIndex(e.target.value)}
                            placeholder="Enter payment # (e.g. 1 = 1st hash)"
                            className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 ${theme === "light"
                                    ? "bg-light-background text-light-text border-light-border focus:ring-blue-400"
                                    : "bg-dark-background text-dark-text border-dark-border focus:ring-blue-400"
                                }`}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleLookup}
                        >
                            Find Hash
                        </button>
                        {lookupHash && (
                            <p className="mt-2 text-sm">
                                <strong>Hash for Payment #{lookupIndex}:</strong> {lookupHash}
                            </p>
                        )}
                    </div>

                    {/* Display the parent seed (first hash) and trust anchor (last hash) */}
                    <div className="mb-4">
                        <div>
                            <strong>Main Seed (Parent Seed):</strong> {hashchainResult[0]}
                        </div>
                        <div>
                            <strong>Trust Anchor (Last Hash):</strong> {hashchainResult[hashchainResult.length - 1]}
                        </div>
                    </div>

                    {/* List of All Hashes (Scrollable) */}
                    <div
                        className={`p-2 rounded border overflow-y-auto max-h-[300px] ${theme === "light"
                                ? "bg-light-background border-light-border"
                                : "bg-dark-background border-dark-border"
                            }`}
                    >
                        <code className="break-all text-sm space-y-1 block">
                            {hashchainResult.map((hash, index) => (
                                <div key={index}>
                                    Hash #{index + 1}: {hash}
                                </div>
                            ))}
                        </code>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateHashchainTab;