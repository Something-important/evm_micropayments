import React from 'react';

export default function HashStreamMatrix({ theme = "light" }) {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="hash-stream-matrix"
      data-theme={theme}
    >
      <title>Visualization of Off-Chain Payment Updates</title>
      <desc>A diagram showing different ways to update payment states from a central trust anchor in off-chain systems, including direct, sequential, and fragmented paths.</desc>

      {/* Inline CSS Variables for Theme Switching */}
      <style type="text/css">
        {`
          :root {
            /* Light Theme (Default) */
            --background: #F3F4F6;
            --text: #333333;
            --accent: #34D399;
            --button: #FB923C;
            --header-footer: #FFFFFF;
            --primary: #1D4ED8;
            --secondary: #F97316;
            --light-mint: #A7F3D0;
            --muted-gray: #E5E7EB;
            --dark-gray: #6B7280;
            --shadow-color: #6B7280;
          }
          [data-theme="dark"] {
            /* Dark Theme */
            --background: #2D3748;
            --text: #E2E8F0;
            --accent: #34D399;
            --button: #FB923C;
            --header-footer: #1A202C;
            --primary: #3182CE;
            --secondary: #F97316;
            --light-mint: #A7F3D0;
            --muted-gray: #4A5568;
            --dark-gray: #4A5568;
            --shadow-color: #A0AEC0;
          }
        `}
      </style>

      {/* Background with Subtle Grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--muted-gray)" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="var(--background)" />
      <rect width="400" height="400" fill="url(#grid)" />

      {/* Definitions for Gradients and Filters */}
      <defs>
        <linearGradient id="gradCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--primary)' }} />
        </linearGradient>
        <linearGradient id="gradStream" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--light-mint)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--secondary)' }} />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="var(--shadow-color)" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Central Trust Anchor (n) */}
      <circle cx="200" cy="200" r="40" fill="url(#gradCore)" filter="url(#shadow)" />
      <text x="200" y="200" textAnchor="middle" dominantBaseline="central" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="bold" fill="var(--header-footer)">n</text>
      <text x="200" y="230" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">Trust Anchor</text>

      {/* Connection Lines */}
      <path d="M 200 200 H 240" stroke="var(--text)" strokeWidth="2" />
      <path d="M 200 200 H 160" stroke="var(--text)" strokeWidth="2" />

      {/* Right Side (n-n Direct, n-1 Sequential) */}
      <path d="M 240 200 H 280 V 280 H 320" stroke="url(#gradStream)" strokeWidth="5" fill="none" />
      <circle cx="320" cy="280" r="12" fill="var(--light-mint)" filter="url(#shadow)" />
      <text x="320" y="280" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-n</text>
      <text x="300" y="250" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--secondary)">Direct Update</text>
      <text x="300" y="265" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--secondary)">to Final State</text>

      <path d="M 240 200 H 260 V 160 H 280" stroke="var(--primary)" strokeWidth="4" fill="none" />
      <circle cx="280" cy="160" r="12" fill="var(--primary)" filter="url(#shadow)" />
      <text x="280" y="160" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--header-footer)">n-1</text>

      <path d="M 280 160 H 300 V 140" stroke="var(--primary)" strokeWidth="3" fill="none" />
      <circle cx="300" cy="140" r="10" fill="var(--primary)" filter="url(#shadow)" />
      <text x="300" y="140" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--header-footer)">n-2</text>

      <path d="M 300 140 H 320 V 120" stroke="var(--primary)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      <circle cx="320" cy="120" r="8" fill="var(--primary)" filter="url(#shadow)" />
      <text x="320" y="120" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--header-footer)">n-3</text>
      <text x="290" y="180" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--primary)">Sequential Updates</text>
      <text x="290" y="195" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--primary)">through States</text>

      {/* Left Side (Corrected Order: n-2 → n-3 → n-5 → n-8 → n-9) */}
      <path d="M 160 200 H 140 V 220" stroke="var(--muted-gray)" strokeWidth="5" fill="none" />
      <circle cx="140" cy="220" r="12" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="140" y="220" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-2</text>

      <path d="M 140 220 H 120 V 240" stroke="var(--muted-gray)" strokeWidth="4" fill="none" />
      <circle cx="120" cy="240" r="10" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="120" y="240" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-3</text>

      <path d="M 120 240 H 100 V 260" stroke="var(--muted-gray)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
      <circle cx="100" cy="260" r="8" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="100" y="260" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-5</text>

      <path d="M 100 260 H 80 V 280" stroke="var(--muted-gray)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      <circle cx="80" cy="280" r="8" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="80" y="280" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-8</text>

      <path d="M 80 280 H 60 V 300" stroke="var(--muted-gray)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      <circle cx="60" cy="300" r="8" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="60" y="300" textAnchor="middle" fontSize="12" fontFamily="Arial, sans-serif" fill="var(--text)">n-9</text>

      <text x="120" y="260" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--dark-gray)">Fragmented Path</text>
      <text x="120" y="275" fontSize="10" fontFamily="Arial, sans-serif" fill="var(--dark-gray)">with Hops</text>

      {/* Connections from n-3 and n-8 to n-n (Direct) */}
      <path d="M 120 240 Q 200 260 320 280" stroke="var(--muted-gray)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
      <path d="M 80 280 Q 200 300 320 280" stroke="var(--muted-gray)" strokeWidth="2" fill="none" strokeDasharray="5,5" />

      {/* Additional Details */}
      <circle cx="200" cy="200" r="60" stroke="var(--muted-gray)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
      <text x="200" y="350" textAnchor="middle" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="600" fill="var(--accent)">Matrix of Flexible Off-Chain Payments</text>
    </svg>
  );
}