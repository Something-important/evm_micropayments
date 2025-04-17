'use client';
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/themeContext";
import { useAccount } from "wagmi";
import { fetchChannelsByFlexibleFilter } from "../../../lib/services/channelCreated";
import { fetchReclaimedChannelsByFlexibleFilter } from "../../../lib/services/channelReclaimed";
import { fetchRedeemedChannelsByFlexibleFilter } from "../../../lib/services/channelRedeemed";
import { fetchRefundedChannelsByFlexibleFilter } from "../../../lib/services/channelRefunded";

// Define types for channel events (unchanged)
interface ChannelCreated {
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  payer: string;
  merchant: string;
  token: string;
  amount: string;
  numberOfTokens: string;
  merchantWithdrawAfterBlocks: string;
}

interface ChannelReclaimed {
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  payer: string;
  merchant: string;
  token: string;
  blockNumberParam: string;
}

interface ChannelRedeemed {
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  payer: string;
  merchant: string;
  token: string;
  amountPaid: string;
  finalHashValue: string;
  numberOfTokensUsed: string;
}

interface ChannelRefunded {
  id: string;
  block_number: string;
  timestamp_: string;
  transactionHash_: string;
  contractId_: string;
  payer: string;
  merchant: string;
  token: string;
  refundAmount: string;
}

interface ChannelSummary {
  created: ChannelCreated;
  status: "active" | "reclaimed" | "redeemed";
  closingEvent?: ChannelReclaimed | ChannelRedeemed;
  refundedEvent?: ChannelRefunded;
}

// Process raw data into summaries (unchanged)
const processChannels = (
  created: ChannelCreated[],
  reclaimed: ChannelReclaimed[],
  redeemed: ChannelRedeemed[],
  refunded: ChannelRefunded[]
): ChannelSummary[] => {
  const summaries: ChannelSummary[] = [];
  const sortedCreated = [...created].sort((a, b) => Number(a.timestamp_) - Number(b.timestamp_));

  sortedCreated.forEach((createdEvent) => {
    const summary: ChannelSummary = { created: createdEvent, status: "active" };

    const reclaimedEvent = reclaimed.find(
      (r) =>
        r.payer === createdEvent.payer &&
        r.merchant === createdEvent.merchant &&
        Number(r.timestamp_) > Number(createdEvent.timestamp_)
    );
    if (reclaimedEvent) {
      summary.status = "reclaimed";
      summary.closingEvent = reclaimedEvent;
    } else {
      const redeemedEvent = redeemed.find(
        (r) =>
          r.payer === createdEvent.payer &&
          r.merchant === createdEvent.merchant &&
          Number(r.timestamp_) > Number(createdEvent.timestamp_)
      );
      if (redeemedEvent) {
        summary.status = "redeemed";
        summary.closingEvent = redeemedEvent;
        summary.refundedEvent = refunded.find(
          (r) => r.transactionHash_ === redeemedEvent.transactionHash_
        );
      }
    }

    summaries.push(summary);
  });

  return summaries;
};

// Helper to truncate addresses (unchanged)
const truncateAddress = (address: string) => {
  return address ? address.slice(0, 6) + "..." + address.slice(-4) : "N/A";
};

// Helper to format amounts (assuming 18 decimals) (unchanged)
const formatAmount = (amount: string) => {
  const parsed = parseFloat(amount);
  if (isNaN(parsed)) return '0.000000';
  return (parsed / 1e18).toFixed(6);
};

export default function DashboardHome() {
  const { theme } = useTheme();
  const { address: walletAddress } = useAccount();
  const EXPLORER_URL = "https://explorer.testnet.citrea.xyz/tx/";
  const [viewMode, setViewMode] = useState<"payer" | "merchant">("payer");
  const [addressFilter, setAddressFilter] = useState<string>('');
  const [channels, setChannels] = useState<ChannelSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [popover, setPopover] = useState<{
    channelId: string;
    x: number;
    y: number;
  } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Sync addressFilter with walletAddress
  useEffect(() => {
    console.log("Wallet Address Changed:", walletAddress);
    setAddressFilter(walletAddress ?? '');
  }, [walletAddress]);

  // Fetch data when addressFilter or viewMode change
  useEffect(() => {
    const fetchData = async () => {
      if (!addressFilter) {
        console.log("No address filter provided, skipping fetch.");
        setChannels([]);
        setLoading(false);
        setError("Please connect your wallet to view channels.");
        return;
      }

      setLoading(true);
      setError(null);
      console.log(`Fetching channels with filter: ${viewMode}=${addressFilter}`);

      try {
        const filter = {
          [viewMode]: addressFilter.toLowerCase(), // Ensure lowercase for consistency
          first: 100,
        };

        console.log("Filter Object:", filter);

        const [created, reclaimed, redeemed, refunded] = await Promise.all([
          fetchChannelsByFlexibleFilter(filter).catch((e) => {
            console.error("Error fetching created channels:", e);
            return [];
          }),
          fetchReclaimedChannelsByFlexibleFilter(filter).catch((e) => {
            console.error("Error fetching reclaimed channels:", e);
            return [];
          }),
          fetchRedeemedChannelsByFlexibleFilter(filter).catch((e) => {
            console.error("Error fetching redeemed channels:", e);
            return [];
          }),
          fetchRefundedChannelsByFlexibleFilter(filter).catch((e) => {
            console.error("Error fetching refunded channels:", e);
            return [];
          }),
        ]);

        console.log("Fetched Data:", { created, reclaimed, redeemed, refunded });

        const processed = processChannels(created, reclaimed, redeemed, refunded);
        console.log("Processed Channels:", processed);

        setChannels(processed);
        if (processed.length === 0) {
          setError(`No channels found for address ${truncateAddress(addressFilter)} as ${viewMode}.`);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setError("Failed to fetch channels. Please try again.");
        setChannels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addressFilter, viewMode]);

  // Close popover when clicking outside (unchanged)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate summary stats (unchanged)
  const totalBalance = channels.reduce((sum, channel) => {
    if (channel.status === "active") {
      return sum + parseFloat(channel.created.amount);
    }
    return sum;
  }, 0);
  const activeChannels = channels.filter((c) => c.status === "active").length;
  const totalTransactions = channels.length;

  // Copy to clipboard (unchanged)
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: "payer" | "merchant") => {
    setViewMode(mode);
  };

  // Handle view button click to show popover in center of viewable screen (unchanged)
  const handleViewClick = (channelId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = 320;
    const popoverHeight = 400;

    const x = window.scrollX + (viewportWidth - popoverWidth) / 2;
    const y = window.scrollY + (viewportHeight - popoverHeight) / 2;

    const boundedX = Math.max(window.scrollX, Math.min(x, window.scrollX + viewportWidth - popoverWidth));
    const boundedY = Math.max(window.scrollY, Math.min(y, window.scrollY + viewportHeight - popoverHeight));

    setPopover({ channelId, x: boundedX, y: boundedY });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="btn-primary">Create New Channel</button>
        </div>

        {/* Radio Buttons for View Mode */}
        <div className="mb-6">
          <label className="mr-4">
            <input
              type="radio"
              name="viewMode"
              value="payer"
              checked={viewMode === "payer"}
              onChange={() => handleViewModeChange("payer")}
              className="mr-2"
            />
            View as Payer
          </label>
          <label>
            <input
              type="radio"
              name="viewMode"
              value="merchant"
              checked={viewMode === "merchant"}
              onChange={() => handleViewModeChange("merchant")}
              className="mr-2"
            />
            View as Merchant
          </label>
        </div>

        {/* Display Connected Address */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Connected Address: {walletAddress ? truncateAddress(walletAddress) : "Not connected"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-primary">{formatAmount(totalBalance.toString())} Tokens</p>
            <p className="text-sm text-muted-foreground mt-2">Across all channels</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Active Channels</h3>
            <p className="text-3xl font-bold text-primary">{activeChannels}</p>
            <p className="text-sm text-muted-foreground mt-2">Currently streaming</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-primary">{totalTransactions}</p>
            <p className="text-sm text-muted-foreground mt-2">All time</p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Channels</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Name</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Balance</th>
                  <th className="text-left py-4 px-4">Last Update</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted-foreground">
                      Loading channels...
                    </td>
                  </tr>
                ) : channels.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted-foreground">
                      {walletAddress ? "No channels found." : "Please connect your wallet."}
                    </td>
                  </tr>
                ) : (
                  channels.map((channel, index) => (
                    <tr key={channel.created.id} className="border-b last:border-0">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">Channel #{index + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            {truncateAddress(channel.created.payer)} ↔{" "}
                            {truncateAddress(channel.created.merchant)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${channel.status === "active"
                            ? "bg-green-100 text-green-800"
                            : channel.status === "reclaimed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {channel.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium">{formatAmount(channel.created.amount)} Tokens</td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {new Date(Number(channel.created.timestamp_) * 1000).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => handleViewClick(channel.created.id, e)}
                            className="text-primary hover:text-primary/80"
                          >
                            View
                          </button>
                          <button className="text-red-500 hover:text-red-600">Close</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popover (unchanged) */}
        {popover && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setPopover(null)}>
            <div
              ref={popoverRef}
              className="fixed card p-6 max-w-sm z-50 shadow-lg"
              style={{ top: popover.y, left: popover.x }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const channel = channels.find((c) => c.created.id === popover.channelId);
                if (!channel) return null;
                return (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Channel Details</h3>
                    <p className="mb-2">
                      <span className="font-medium">ID:</span>{" "}
                      {truncateAddress(channel.created.id)}
                      <button
                        onClick={() => copyToClipboard(channel.created.id)}
                        className="ml-2 text-primary hover:text-primary/80 text-sm"
                      >
                        [copy]
                      </button>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Transaction Hash:</span>{" "}
                      <a
                        href={`${EXPLORER_URL}${channel.created.transactionHash_}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                      >
                        {truncateAddress(channel.created.transactionHash_)}
                      </a>
                      <button
                        onClick={() => copyToClipboard(channel.created.transactionHash_)}
                        className="ml-2 text-primary hover:text-primary/80 text-sm"
                      >
                        [copy]
                      </button>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Payer:</span>{" "}
                      {truncateAddress(channel.created.payer)}
                      <button
                        onClick={() => copyToClipboard(channel.created.payer)}
                        className="ml-2 text-primary hover:text-primary/80 text-sm"
                      >
                        [copy]
                      </button>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Merchant:</span>{" "}
                      {truncateAddress(channel.created.merchant)}
                      <button
                        onClick={() => copyToClipboard(channel.created.merchant)}
                        className="ml-2 text-primary hover:text-primary/80 text-sm"
                      >
                        [copy]
                      </button>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Token:</span>{" "}
                      {truncateAddress(channel.created.token)}
                      <button
                        onClick={() => copyToClipboard(channel.created.token)}
                        className="ml-2 text-primary hover:text-primary/80 text-sm"
                      >
                        [copy]
                      </button>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Amount:</span> {formatAmount(channel.created.amount)} Tokens
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Total Tokens:</span> {channel.created.numberOfTokens}
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Status:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${channel.status === "active"
                          ? "bg-green-100 text-green-800"
                          : channel.status === "reclaimed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {channel.status}
                      </span>
                    </p>
                    <p className="mb-2">
                      <span className="font-medium">Created:</span>{" "}
                      {new Date(Number(channel.created.timestamp_) * 1000).toLocaleString()}
                    </p>
                    {channel.status === "reclaimed" && channel.closingEvent && (
                      <>
                        <p className="mb-2">
                          <span className="font-medium">Reclaimed At:</span>{" "}
                          {new Date(Number(channel.closingEvent.timestamp_) * 1000).toLocaleString()}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Reclaim Tx Hash:</span>{" "}
                          {channel.closingEvent && (
                            <a
                              href={`${EXPLORER_URL}${channel.closingEvent.transactionHash_}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80"
                            >
                              {truncateAddress(channel.closingEvent.transactionHash_)}
                            </a>
                          )}
                          <button
                            onClick={() => channel.closingEvent && copyToClipboard(channel.closingEvent.transactionHash_)}
                            className="ml-2 text-primary hover:text-primary/80 text-sm"
                          >
                            [copy]
                          </button>
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Amount Reclaimed:</span>{" "}
                          {formatAmount(channel.created.amount)} Tokens
                        </p>
                      </>
                    )}
                    {channel.status === "redeemed" && channel.closingEvent && channel.refundedEvent && (
                      <>
                        <p className="mb-2">
                          <span className="font-medium">Redeemed At:</span>{" "}
                          {new Date(Number(channel.closingEvent.timestamp_) * 1000).toLocaleString()}
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Redeem Tx Hash:</span>{" "}
                          <a
                            href={`${EXPLORER_URL}${channel.closingEvent.transactionHash_}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            {truncateAddress(channel.closingEvent.transactionHash_)}
                          </a>
                          <button
                            onClick={() => channel.closingEvent && copyToClipboard(channel.closingEvent.transactionHash_)}
                            className="ml-2 text-primary hover:text-primary/80 text-sm"
                          >
                            [copy]
                          </button>
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Amount Paid to Merchant:</span>{" "}
                          {formatAmount((channel.closingEvent as ChannelRedeemed).amountPaid)} Tokens
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Refund to Payer:</span>{" "}
                          {formatAmount(channel.refundedEvent.refundAmount)} Tokens
                        </p>
                        <p className="mb-2">
                          <span className="font-medium">Tokens Used:</span>{" "}
                          {(channel.closingEvent as ChannelRedeemed).numberOfTokensUsed} / {channel.created.numberOfTokens}
                        </p>
                      </>
                    )}
                    <button
                      onClick={() => setPopover(null)}
                      className="mt-4 w-full btn-primary"
                    >
                      Close
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {channels.slice(0, 3).map((channel, index) => (
                <div key={channel.created.id} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Channel {channel.status}</p>
                    <p className="text-sm text-muted-foreground">
                      Channel #{index + 1} •{" "}
                      {new Date(Number(channel.created.timestamp_) * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {channels.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-secondary">Send Payment</button>
              <button className="btn-secondary">Request Payment</button>
              <button className="btn-secondary">View Analytics</button>
              <button className="btn-secondary">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}