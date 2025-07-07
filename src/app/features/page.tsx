'use client';
import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";
import { motion } from "framer-motion";

export default function Features() {
  const { theme } = useTheme();
  const [imageLoading, setImageLoading] = useState(true);

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
      image: "/images/subscription-services.jpg",
      imageAlt: "Digital subscription services illustration",
      learnMoreLink: "/blog/subscription-payments",
      learnMoreText: "Read our guide on subscription payments",
      icon: "📱"
    },
    {
      id: 2,
      title: "Freelancer Payments",
      description: "Pay freelancers based on time worked or milestones achieved, with automatic payment distribution.",
      image: "/images/freelancer-payments.jpg",
      imageAlt: "Freelancer working on laptop",
      learnMoreLink: "/blog/freelancer-payments",
      learnMoreText: "Learn about freelancer payment solutions",
      icon: "💼"
    },
    {
      id: 3,
      title: "Content Creator Revenue",
      description: "Monetize content with pay-per-view or subscription models, with automatic revenue distribution.",
      image: "/images/content-creator.jpg",
      imageAlt: "Content creator streaming setup",
      learnMoreLink: "/blog/content-creator-revenue",
      learnMoreText: "Explore content creator monetization",
      icon: "🎥"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">HashPay Features</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how HashPay is revolutionizing the way payments are made on the blockchain.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how HashPay can be applied to various industries and scenarios.
            </p>
          </motion.div>

          <div className="space-y-12">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-video rounded-lg overflow-hidden relative bg-primary/5">
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">{useCase.icon}</span>
                      </div>
                    )}
                    <img
                      src={useCase.image}
                      alt={useCase.imageAlt}
                      className="object-cover w-full h-full transition-opacity duration-300"
                      onLoad={() => setImageLoading(false)}
                      onError={() => {
                        setImageLoading(true);
                        // If image fails to load, show the icon instead
                        const imgElement = document.querySelector(`img[alt="${useCase.imageAlt}"]`) as HTMLImageElement;
                        if (imgElement) {
                          imgElement.style.display = 'none';
                        }
                      }}
                      style={{ opacity: imageLoading ? 0 : 1 }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6">{useCase.description}</p>
                  <a 
                    href={useCase.learnMoreLink}
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    <span>{useCase.learnMoreText}</span>
                    <svg 
                      className="w-4 h-4 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-8 mt-16 text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join the future of payments with HashPay. Create your first payment channel today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/dashboard" target="_blank">
                <button className="btn-primary hover:scale-105 transition-transform duration-300">
                  Create Channel
                </button>
              </a>
              <a href="https://docs.hashchainprotocol.com/" target="_blank">
                <button className="btn-secondary hover:scale-105 transition-transform duration-300">
                  View Documentation
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 