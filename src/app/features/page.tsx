'use client';
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

export default function Features() {
  const { theme } = useTheme();

  const features = [
    {
      id: 1,
      title: "Payment Streaming",
      description: "Stream payments continuously over time instead of sending lump sums. Perfect for subscriptions, salaries, and recurring payments.",
      icon: "💰"
    },
    {
      id: 2,
      title: "Off-Chain Transactions",
      description: "Reduce gas fees by conducting most transactions off-chain. Only the opening and closing of channels require on-chain transactions.",
      icon: "⚡"
    },
    {
      id: 3,
      title: "Instant Settlements",
      description: "Recipients can claim their funds at any time without waiting for blockchain confirmations.",
      icon: "🚀"
    },
    {
      id: 4,
      title: "Secure Smart Contracts",
      description: "Built on audited smart contracts that ensure the security of your funds throughout the payment process.",
      icon: "🔒"
    },
    {
      id: 5,
      title: "Multi-Channel Management",
      description: "Create and manage multiple payment channels simultaneously for different purposes and recipients.",
      icon: "🔄"
    },
    {
      id: 6,
      title: "Cross-Chain Compatibility",
      description: "Support for multiple blockchain networks, allowing you to stream payments across different chains.",
      icon: "⛓️"
    }
  ];

  const useCases = [
    {
      id: 1,
      title: "Subscription Services",
      description: "Stream payments for subscription-based services like streaming platforms, software licenses, and memberships.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Freelancer Payments",
      description: "Pay freelancers based on time worked or milestones achieved, with automatic payment distribution.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Content Creator Revenue",
      description: "Monetize content with pay-per-view or subscription models, with automatic revenue distribution.",
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">HashPay Features</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how HashPay is revolutionizing the way payments are made on the blockchain.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <div key={feature.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how HashPay can be applied to various industries and scenarios.
            </p>
          </div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <div key={useCase.id} className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                <div className="w-full md:w-1/2">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <button className="btn-primary">Learn More</button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-8 mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the future of payments with HashPay. Create your first payment channel today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/dashboard" target="_blank">
              <button className="btn-primary">Create Channel</button>
            </a>
              <a href="https://docs.hashchainprotocol.com/" target="_blank">
                <button className="btn-secondary">View Documentation</button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 