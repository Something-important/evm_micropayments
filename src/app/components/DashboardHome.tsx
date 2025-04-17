'use client';
import React from "react";
import { useTheme } from "../context/themeContext";

export default function DashboardHome() {
  const { theme } = useTheme();

  const paymentChannels = [
    {
      id: 1,
      name: "Subscription Service",
      status: "Active",
      balance: "1.5 ETH",
      lastUpdate: "2 hours ago",
      participants: ["0x1234...5678", "0x8765...4321"]
    },
    {
      id: 2,
      name: "Freelance Payment",
      status: "Pending",
      balance: "0.8 ETH",
      lastUpdate: "1 day ago",
      participants: ["0xabcd...efgh", "0xhijk...lmno"]
    },
    {
      id: 3,
      name: "Content Creator",
      status: "Active",
      balance: "2.3 ETH",
      lastUpdate: "5 hours ago",
      participants: ["0xqrst...uvwx", "0xyzab...cdef"]
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="btn-primary">Create New Channel</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Total Balance</h3>
            <p className="text-3xl font-bold text-primary">4.6 ETH</p>
            <p className="text-sm text-muted-foreground mt-2">Across all channels</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Active Channels</h3>
            <p className="text-3xl font-bold text-primary">2</p>
            <p className="text-sm text-muted-foreground mt-2">Currently streaming</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-medium mb-2">Total Transactions</h3>
            <p className="text-3xl font-bold text-primary">156</p>
            <p className="text-sm text-muted-foreground mt-2">Last 30 days</p>
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
                {paymentChannels.map((channel) => (
                  <tr key={channel.id} className="border-b last:border-0">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{channel.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {channel.participants[0]} ↔ {channel.participants[1]}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        channel.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {channel.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">{channel.balance}</td>
                    <td className="py-4 px-4 text-muted-foreground">{channel.lastUpdate}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-primary hover:text-primary/80">View</button>
                        <button className="text-primary hover:text-primary/80">Edit</button>
                        <button className="text-red-500 hover:text-red-600">Close</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Payment stream updated</p>
                  <p className="text-sm text-muted-foreground">Subscription Service • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">New channel created</p>
                  <p className="text-sm text-muted-foreground">Content Creator • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Channel closed</p>
                  <p className="text-sm text-muted-foreground">Project Payment • 2 days ago</p>
                </div>
              </div>
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