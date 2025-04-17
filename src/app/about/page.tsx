'use client';
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

export default function About() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">About HashPay</h1>
          
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              HashPay is revolutionizing the way we think about payments. Our mission is to make financial transactions 
              more flexible, transparent, and efficient through blockchain technology.
            </p>
            <p className="text-muted-foreground">
              We believe in a future where payments are streamed in real-time, allowing for more granular control 
              over how and when money is spent. This approach benefits both consumers and service providers, 
              creating a more equitable financial ecosystem.
            </p>
          </div>
          
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍💻</span>
                </div>
                <h3 className="text-xl font-medium">John Doe</h3>
                <p className="text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-secondary/20 mb-4 flex items-center justify-center">
                  <span className="text-3xl">👩‍💻</span>
                </div>
                <h3 className="text-xl font-medium">Jane Smith</h3>
                <p className="text-muted-foreground">CTO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-3xl">👨‍🔬</span>
                </div>
                <h3 className="text-xl font-medium">Alex Johnson</h3>
                <p className="text-muted-foreground">Lead Developer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-secondary/20 mb-4 flex items-center justify-center">
                  <span className="text-3xl">👩‍🎨</span>
                </div>
                <h3 className="text-xl font-medium">Sarah Williams</h3>
                <p className="text-muted-foreground">UX Designer</p>
              </div>
            </div>
          </div>
          
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Transparency</h3>
                  <p className="text-muted-foreground">We believe in complete transparency in all financial transactions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Innovation</h3>
                  <p className="text-muted-foreground">We constantly push the boundaries of what's possible with blockchain technology.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                  <span className="text-primary">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">User-Centric</h3>
                  <p className="text-muted-foreground">We design our products with the user experience as our top priority.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 