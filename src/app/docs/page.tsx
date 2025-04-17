'use client';
import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

export default function Documentation() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started" },
    { id: "api-reference", title: "API Reference" },
    { id: "guides", title: "Guides" },
    { id: "examples", title: "Examples" },
    { id: "faq", title: "FAQ" }
  ];

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Documentation</h2>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`block w-full text-left px-4 py-2 rounded-lg ${activeSection === section.id
                          ? "bg-primary text-white"
                          : "hover:bg-primary/10"
                        }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeSection === "getting-started" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Getting Started with HashPay</h1>
                  <p className="text-muted-foreground mb-6">
                    HashPay is a revolutionary payment streaming platform that allows you to create and manage payment channels on the blockchain.
                  </p>

                  <div className="card p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary">1</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Connect Your Wallet</h3>
                          <p className="text-muted-foreground">Use MetaMask or any Web3 wallet to connect to HashPay.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary">2</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Create a Payment Channel</h3>
                          <p className="text-muted-foreground">Set up a new payment channel with another user.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                          <span className="text-primary">3</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Start Streaming Payments</h3>
                          <p className="text-muted-foreground">Begin streaming payments to the recipient.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h2 className="text-xl font-semibold mb-4">Installation</h2>
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <code className="text-sm">npm install @hashpay/sdk</code>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Import the SDK in your project:
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <code className="text-sm">"import {} from '@hashpay/sdk";</code>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "api-reference" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">API Reference</h1>
                  <p className="text-muted-foreground mb-6">
                    Complete reference documentation for the HashPay API.
                  </p>

                  <div className="space-y-8">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">createChannel</h2>
                      <p className="text-muted-foreground mb-4">
                        Creates a new payment channel between two parties.
                      </p>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <code className="text-sm">HashPay.createChannel(recipient, amount, duration)</code>
                      </div>
                      <h3 className="font-medium mb-2">Parameters</h3>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><code>recipient</code> - Ethereum address of the recipient</li>
                        <li><code>amount</code> - Total amount to be streamed (in ETH)</li>
                        <li><code>duration</code> - Duration of the payment stream (in seconds)</li>
                      </ul>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">updateChannel</h2>
                      <p className="text-muted-foreground mb-4">
                        Updates the payment amount in an existing channel.
                      </p>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <code className="text-sm">HashPay.updateChannel(channelId, newAmount)</code>
                      </div>
                      <h3 className="font-medium mb-2">Parameters</h3>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><code>channelId</code> - ID of the payment channel</li>
                        <li><code>newAmount</code> - New amount to be streamed (in ETH)</li>
                      </ul>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">closeChannel</h2>
                      <p className="text-muted-foreground mb-4">
                        Closes a payment channel and distributes the remaining funds.
                      </p>
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <code className="text-sm">HashPay.closeChannel(channelId)</code>
                      </div>
                      <h3 className="font-medium mb-2">Parameters</h3>
                      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><code>channelId</code> - ID of the payment channel to close</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "guides" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Guides</h1>
                  <p className="text-muted-foreground mb-6">
                    Step-by-step guides to help you implement HashPay in your applications.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">Subscription Payments</h2>
                      <p className="text-muted-foreground mb-4">
                        Learn how to implement subscription-based payments using HashPay.
                      </p>
                      <button className="text-primary hover:text-primary/80">Read Guide →</button>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">Freelancer Payments</h2>
                      <p className="text-muted-foreground mb-4">
                        Set up payment channels for freelancer-client relationships.
                      </p>
                      <button className="text-primary hover:text-primary/80">Read Guide →</button>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">Content Creator Revenue</h2>
                      <p className="text-muted-foreground mb-4">
                        Implement pay-per-view or subscription models for content creators.
                      </p>
                      <button className="text-primary hover:text-primary/80">Read Guide →</button>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">Gaming Microtransactions</h2>
                      <p className="text-muted-foreground mb-4">
                        Integrate HashPay for in-game purchases and microtransactions.
                      </p>
                      <button className="text-primary hover:text-primary/80">Read Guide →</button>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "examples" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Examples</h1>
                  <p className="text-muted-foreground mb-6">
                    Code examples demonstrating how to use HashPay in different scenarios.
                  </p>

                  <div className="space-y-8">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">Basic Payment Channel</h2>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{`// Create a new payment channel
const channel = await HashPay.createChannel(
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  1.5, // 1.5 ETH
  2592000 // 30 days in seconds
);

// Update the payment amount
await HashPay.updateChannel(channel.id, 2.0);

// Close the channel when done
await HashPay.closeChannel(channel.id);`}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-4">React Integration</h2>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{`import { useState, useEffect } from 'react';
import { HashPay } from '@hashpay/sdk';

function PaymentStream() {
  const [channel, setChannel] = useState(null);
  
  const createStream = async () => {
    const newChannel = await HashPay.createChannel(
      "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      0.1, // 0.1 ETH
      604800 // 7 days in seconds
    );
    setChannel(newChannel);
  };
  
  return (
    <div>
      <button onClick={createStream}>Create Payment Stream</button>
      {channel && (
        <div>
          <p>Channel ID: {channel.id}</p>
          <p>Status: {channel.status}</p>
        </div>
      )}
    </div>
  );
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "faq" && (
                <div>
                  <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
                  <p className="text-muted-foreground mb-6">
                    Common questions about HashPay and payment streaming.
                  </p>

                  <div className="space-y-6">
                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-2">What is payment streaming?</h2>
                      <p className="text-muted-foreground">
                        Payment streaming allows you to send money continuously over time rather than in a single transaction. This is useful for subscriptions, salaries, and other recurring payments.
                      </p>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-2">How does HashPay work?</h2>
                      <p className="text-muted-foreground">
                        HashPay uses state channels on the blockchain to enable off-chain transactions. When you create a payment channel, you lock funds in a smart contract. As time passes, the recipient can claim an increasing portion of these funds without requiring on-chain transactions for each payment.
                      </p>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-2">What are the fees?</h2>
                      <p className="text-muted-foreground">
                        HashPay charges a small fee (0.1%) on the total amount streamed. This covers the gas costs for opening and closing channels, as well as platform maintenance.
                      </p>
                    </div>

                    <div className="card p-6">
                      <h2 className="text-xl font-semibold mb-2">Is it secure?</h2>
                      <p className="text-muted-foreground">
                        Yes, HashPay is built on blockchain technology, which provides transparency and security. All transactions are verifiable on the blockchain, and the smart contracts have been audited by leading security firms.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 