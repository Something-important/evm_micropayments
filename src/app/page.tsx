'use client';
import React from "react";
import Link from "next/link";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useTheme } from "./context/themeContext";
import HashStreamMatrix from "./components/HashStreamMatrix";
import WalletConnectButton from './components/connectButton';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 px-4">
      {/* Wallet Connect */}
      <div className="w-full max-w-2xl mb-8">
        <WalletConnectButton />
      </div>

      {/* Create Channel Card */}
      <div className="card w-full max-w-2xl mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Create Payment Channel</h2>
        {/* TODO: Add create channel form here */}
        <div className="text-muted-foreground">Channel creation form coming soon...</div>
      </div>

      {/* Channel List Placeholder */}
      <div className="w-full max-w-2xl animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Your Channels</h2>
        {/* TODO: Add channel list here */}
        <div className="text-muted-foreground">No channels yet. Connect your wallet to view channels.</div>
      </div>
    </main>
  );
}



