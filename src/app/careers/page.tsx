'use client';
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../context/themeContext";

export default function Careers() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Join Our Team</h1>
          
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Work at HashPay?</h2>
            <p className="text-muted-foreground mb-6">
              At HashPay, we're building the future of payments. We're looking for passionate individuals 
              who want to make a difference in the world of finance and blockchain technology.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-medium">Innovation</h3>
                <p className="text-muted-foreground text-sm">Work on cutting-edge blockchain technology</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-lg font-medium">Impact</h3>
                <p className="text-muted-foreground text-sm">Make a difference in the financial world</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 mb-4 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-medium">Culture</h3>
                <p className="text-muted-foreground text-sm">Join a diverse and inclusive team</p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium">Senior Blockchain Developer</h3>
                  <p className="text-muted-foreground">Full-time • Remote</p>
                </div>
                <button className="btn-primary mt-4 md:mt-0">Apply Now</button>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">
                  We're looking for an experienced blockchain developer to join our team and help build 
                  the next generation of payment streaming technology.
                </p>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium">Frontend Developer</h3>
                  <p className="text-muted-foreground">Full-time • Remote</p>
                </div>
                <button className="btn-primary mt-4 md:mt-0">Apply Now</button>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">
                  Join our frontend team to create beautiful, intuitive interfaces for our payment streaming platform.
                </p>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-medium">Product Manager</h3>
                  <p className="text-muted-foreground">Full-time • Remote</p>
                </div>
                <button className="btn-primary mt-4 md:mt-0">Apply Now</button>
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground">
                  Help shape the future of HashPay by leading product development and strategy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-4">Don't See a Fit?</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals to join our team. If you don't see a position 
              that matches your skills, but you're passionate about blockchain and payments, we'd love to hear from you.
            </p>
            <button className="btn-secondary">Send Us Your Resume</button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 