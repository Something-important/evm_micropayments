import React from 'react';

export default function HashStreamMatrix({ theme = "light" }) {
  return (
    <svg
      width="800"
      height="800"
      viewBox="0 0 800 800"
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
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--muted-gray)" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="800" height="800" fill="var(--background)" />
      <rect width="800" height="800" fill="url(#grid)" />

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
          <feDropShadow dx="4" dy="4" stdDeviation="4" floodColor="var(--shadow-color)" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Central Trust Anchor (n) */}
      <circle cx="400" cy="400" r="80" fill="url(#gradCore)" filter="url(#shadow)" />
      <text x="400" y="400" textAnchor="middle" dominantBaseline="central" fontSize="36" fontFamily="Arial, sans-serif" fontWeight="bold" fill="var(--header-footer)">n</text>
      <text x="400" y="460" textAnchor="middle" fontSize="20" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Trust Anchor</text>

      {/* Connection Lines */}
      <path d="M 400 400 H 480" stroke="var(--text)" strokeWidth="4" />
      <path d="M 400 400 H 320" stroke="var(--text)" strokeWidth="4" />

      {/* Right Side (n-n Direct, n-1 Sequential) */}
      <path d="M 480 400 H 560 V 560 H 640" stroke="url(#gradStream)" strokeWidth="10" fill="none" />
      <circle cx="640" cy="560" r="24" fill="var(--light-mint)" filter="url(#shadow)" />
      <text x="640" y="560" textAnchor="middle" dominantBaseline="central" fontSize="20" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-n</text>
      <text x="600" y="500" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--secondary)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Direct Update</text>
      <text x="600" y="530" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--secondary)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">to Final State</text>

      <path d="M 480 400 H 520 V 320 H 560" stroke="var(--primary)" strokeWidth="8" fill="none" />
      <circle cx="560" cy="320" r="24" fill="var(--primary)" filter="url(#shadow)" />
      <text x="560" y="320" textAnchor="middle" dominantBaseline="central" fontSize="20" fontFamily="Arial, sans-serif" fill="var(--header-footer)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-1</text>

      <path d="M 560 320 H 600 V 280" stroke="var(--primary)" strokeWidth="6" fill="none" />
      <circle cx="600" cy="280" r="20" fill="var(--primary)" filter="url(#shadow)" />
      <text x="600" y="280" textAnchor="middle" dominantBaseline="central" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--header-footer)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-2</text>

      <path d="M 600 280 H 640 V 240" stroke="var(--primary)" strokeWidth="4" fill="none" strokeDasharray="10,10" />
      <circle cx="640" cy="240" r="16" fill="var(--primary)" filter="url(#shadow)" />
      <text x="640" y="240" textAnchor="middle" dominantBaseline="central" fontSize="16" fontFamily="Arial, sans-serif" fill="var(--header-footer)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-3</text>
      <text x="580" y="360" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--primary)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Sequential Updates</text>
      <text x="580" y="390" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--primary)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">through States</text>

      {/* Left Side (Corrected Order: n-2 → n-3 → n-5 → n-8 → n-9) */}
      <path d="M 320 400 H 280 V 440" stroke="var(--muted-gray)" strokeWidth="10" fill="none" />
      <circle cx="280" cy="440" r="24" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="280" y="440" textAnchor="middle" dominantBaseline="central" fontSize="20" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-2</text>

      <path d="M 280 440 H 240 V 480" stroke="var(--muted-gray)" strokeWidth="8" fill="none" />
      <circle cx="240" cy="480" r="20" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="240" y="480" textAnchor="middle" dominantBaseline="central" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-3</text>

      <path d="M 240 480 H 200 V 520" stroke="var(--muted-gray)" strokeWidth="6" fill="none" strokeDasharray="10,10" />
      <circle cx="200" cy="520" r="16" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="200" y="520" textAnchor="middle" dominantBaseline="central" fontSize="16" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-5</text>

      <path d="M 200 520 H 160 V 560" stroke="var(--muted-gray)" strokeWidth="4" fill="none" strokeDasharray="10,10" />
      <circle cx="160" cy="560" r="16" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="160" y="560" textAnchor="middle" dominantBaseline="central" fontSize="16" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-8</text>

      <path d="M 160 560 H 120 V 600" stroke="var(--muted-gray)" strokeWidth="4" fill="none" strokeDasharray="10,10" />
      <circle cx="120" cy="600" r="16" fill="var(--muted-gray)" filter="url(#shadow)" />
      <text x="120" y="600" textAnchor="middle" dominantBaseline="central" fontSize="16" fontFamily="Arial, sans-serif" fill="var(--text)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">n-9</text>

      <text x="240" y="520" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--dark-gray)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Fragmented Path</text>
      <text x="240" y="550" fontSize="18" fontFamily="Arial, sans-serif" fill="var(--dark-gray)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">with Hops</text>

      {/* Connections from n-3 and n-8 to n-n (Direct) */}
      <path d="M 240 480 Q 400 520 640 560" stroke="var(--muted-gray)" strokeWidth="4" fill="none" strokeDasharray="10,10" />
      <path d="M 160 560 Q 400 600 640 560" stroke="var(--muted-gray)" strokeWidth="4" fill="none" strokeDasharray="10,10" />

      {/* Additional Details */}
      <circle cx="400" cy="400" r="120" stroke="var(--muted-gray)" strokeWidth="2" fill="none" strokeDasharray="10,10" />
      <text x="400" y="700" textAnchor="middle" fontSize="28" fontFamily="Arial, sans-serif" fontWeight="600" fill="var(--accent)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Matrix of Flexible Off-Chain Payments</text>
    </svg>
  );
}
