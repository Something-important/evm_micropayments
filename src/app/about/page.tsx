'use client';

import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TeamModal from "../components/TeamModal";
import { useFadeInOnScroll } from "../../lib/useFadeInOnScroll";
import { useTheme } from "../context/themeContext";

type TeamMember = {
  name: string;
  role: string;
  emoji: string;
  bg: string;
  bio: string;
};

export default function About() {
  const { theme } = useTheme();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const team: TeamMember[] = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      emoji: "👨‍💻",
      bg: "bg-primary/20",
      bio: "John has 10+ years in fintech and is passionate about real-time payments.",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      emoji: "👩‍💻",
      bg: "bg-secondary/20",
      bio: "Jane leads our technology strategy and has built scalable blockchain systems.",
    },
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      emoji: "👨‍🔬",
      bg: "bg-primary/20",
      bio: "Alex architects smart contract infrastructure and core logic for HashPay.",
    },
    {
      name: "Sarah Williams",
      role: "UX Designer",
      emoji: "👩‍🎨",
      bg: "bg-secondary/20",
      bio: "Sarah ensures the app is intuitive, beautiful, and user-centered.",
    },
  ];

  const [missionRef, missionVisible] = useFadeInOnScroll<HTMLDivElement>();
  const [teamRef, teamVisible] = useFadeInOnScroll<HTMLDivElement>();
  const [valuesRef, valuesVisible] = useFadeInOnScroll<HTMLDivElement>();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-background" : "bg-dark-background"}`}>
      <Header />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">About HashPay</h1>

          {/* Mission Section */}
          <div
            ref={missionRef}
            className={`card p-8 mb-8 transition-opacity transform duration-1000 ${
              missionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              HashPay is revolutionizing the way we think about payments. Our mission is to make financial transactions
              more flexible, transparent, and efficient through blockchain technology.
            </p>
            <p className="text-muted-foreground">
              We believe in a future where payments are streamed in real-time, allowing for more granular control
              over how and when money is spent. This benefits both consumers and service providers.
            </p>
          </div>

          {/* Team Section */}
          <div
            ref={teamRef}
            className={`card p-8 mb-8 transition-opacity transform duration-1000 ${
              teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer flex flex-col items-center text-center hover:bg-accent/10 p-4 rounded-md transition"
                >
                  <div className={`w-24 h-24 rounded-full ${member.bg} mb-4 flex items-center justify-center`}>
                    <span className="text-3xl">{member.emoji}</span>
                  </div>
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div
            ref={valuesRef}
            className={`card p-8 transition-opacity transform duration-1000 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <div className="space-y-4">
              {[
                { title: "Transparency", text: "We believe in complete transparency in all financial transactions." },
                { title: "Innovation", text: "We constantly push the boundaries of what's possible with blockchain technology." },
                { title: "User-Centric", text: "We design our products with the user experience as our top priority." },
              ].map((val, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{val.title}</h3>
                    <p className="text-muted-foreground">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <TeamModal isOpen={selectedMember !== null} onClose={() => setSelectedMember(null)} member={selectedMember} />
    </div>
  );
}
