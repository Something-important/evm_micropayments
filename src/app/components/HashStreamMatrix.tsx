import React, { useEffect, useRef } from 'react';

export default function HashStreamMatrix({ theme = "light" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current as SVGElement | null;
    if (!svg) return;

    // Add animation to the central node
    const centralNode = svg.querySelector('.central-node');
    if (centralNode) {
      centralNode.classList.add('pulse-animation');
    }

    // Add flow animation to the paths
    const paths = Array.from(svg.querySelectorAll('.flow-path')) as HTMLElement[];
    (paths as HTMLElement[]).forEach((path, index) => {
      path.style.animationDelay = `${index * 0.5}s`;
      path.classList.add('flow-animation');
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width="800"
      height="800"
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className="hash-stream-matrix"
      data-theme={theme}
    >
      <title>Visualization of Off-Chain Payment Updates</title>
      <desc>A diagram showing different ways to update payment states from a central trust anchor in off-chain systems, including direct, sequential, and indirect paths.</desc>

      {/* Inline CSS Variables for Theme Switching */}
      <style type="text/css">
        {`
          :root {
            --background: #F3F4F6;
            --text: #333333;
            --accent: #34D399; /* Green for Direct */
            --button: #FB923C;
            --header-footer: #FFFFFF;
            --primary: #1D4ED8; /* Blue for Sequential */
            --secondary: #F97316; /* Orange for Indirect */
            --light-mint: #A7F3D0;
            --muted-gray: #E5E7EB;
            --dark-gray: #6B7280;
            --shadow-color: #6B7280;
          }
          [data-theme="dark"] {
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
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes flow {
            0% { stroke-dashoffset: 1000; }
            100% { stroke-dashoffset: 0; }
          }
          .pulse-animation {
            animation: pulse 2s infinite ease-in-out;
          }
          .flow-animation {
            animation: flow 3s infinite linear;
            stroke-dasharray: 20;
          }
          .node-hover {
            transition: all 0.3s ease;
          }
          .node-hover:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
          }
        `}
      </style>

      {/* Background with Subtle Grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--muted-gray)" strokeWidth="1" opacity="0.3" />
        </pattern>
        <linearGradient id="gradCore" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--primary)' }} />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="4" dy="4" stdDeviation="4" floodColor="var(--shadow-color)" floodOpacity="0.3" />
        </filter>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="var(--text)" />
        </marker>
      </defs>
      <rect width="800" height="800" fill="var(--background)" />
      <rect width="800" height="800" fill="url(#grid)" />

      {/* Central Trust Anchor */}
      <g className="central-node">
        <circle cx="400" cy="400" r="80" fill="url(#gradCore)" filter="url(#shadow)" />
        <text x="400" y="400" textAnchor="middle" dominantBaseline="central" fontSize="36" fontFamily="Arial, sans-serif" fill="var(--header-footer)">Trust Anchor</text>
      </g>

      {/* Final State */}
      <g className="node-hover">
        <circle cx="400" cy="600" r="40" fill="var(--light-mint)" filter="url(#shadow)" />
        <text x="400" y="600" textAnchor="middle" dominantBaseline="central" fontSize="24" fontFamily="Arial, sans-serif" fill="var(--text)">Final State</text>
        <title>Updated payment state after off-chain updates</title>
      </g>

      {/* Direct Path */}
      <g className="flow-paths">
        <path className="flow-path" d="M 400 480 L 400 560" stroke="var(--accent)" strokeWidth="4" marker-end="url(#arrow)" />
        <text x="420" y="520" fontSize="18" fill="var(--accent)">Direct Update</text>
      </g>

      {/* Sequential Path */}
      <g className="flow-paths">
        <path className="flow-path" d="M 400 400 H 600" stroke="var(--primary)" strokeWidth="4" marker-end="url(#arrow)" />
        <path className="flow-path" d="M 600 400 V 500" stroke="var(--primary)" strokeWidth="4" marker-end="url(#arrow)" />
        <path className="flow-path" d="M 600 500 H 400" stroke="var(--primary)" strokeWidth="4" marker-end="url(#arrow)" />
        <circle cx="600" cy="400" r="24" fill="var(--primary)" filter="url(#shadow)" className="node-hover">
          <title>State n-1: First intermediate state in sequential update</title>
        </circle>
        <text x="600" y="400" textAnchor="middle" dominantBaseline="central" fontSize="18" fill="var(--header-footer)">n-1</text>
        <circle cx="600" cy="500" r="24" fill="var(--primary)" filter="url(#shadow)" className="node-hover">
          <title>State n-2: Second intermediate state in sequential update</title>
        </circle>
        <text x="600" y="500" textAnchor="middle" dominantBaseline="central" fontSize="18" fill="var(--header-footer)">n-2</text>
        <text x="500" y="380" fontSize="18" fill="var(--primary)">Sequential Updates</text>
      </g>

      {/* Indirect Path */}
      <g className="flow-paths">
        <path className="flow-path" d="M 400 400 H 200" stroke="var(--secondary)" strokeWidth="4" marker-end="url(#arrow)" />
        <path className="flow-path" d="M 200 400 V 500" stroke="var(--secondary)" strokeWidth="4" marker-end="url(#arrow)" />
        <path className="flow-path" d="M 200 500 H 400" stroke="var(--secondary)" strokeWidth="4" marker-end="url(#arrow)" />
        <circle cx="200" cy="400" r="24" fill="var(--secondary)" filter="url(#shadow)" className="node-hover">
          <title>Hop 1: First intermediary in indirect update</title>
        </circle>
        <text x="200" y="400" textAnchor="middle" dominantBaseline="central" fontSize="18" fill="var(--header-footer)">Hop 1</text>
        <circle cx="200" cy="500" r="24" fill="var(--secondary)" filter="url(#shadow)" className="node-hover">
          <title>Hop 2: Second intermediary in indirect update</title>
        </circle>
        <text x="200" y="500" textAnchor="middle" dominantBaseline="central" fontSize="18" fill="var(--header-footer)">Hop 2</text>
        <text x="300" y="380" fontSize="18" fill="var(--secondary)">Indirect Updates via Hops</text>
      </g>

      {/* Legend */}
      <g transform="translate(600,700)">
        <rect width="180" height="80" fill="var(--header-footer)" stroke="var(--text)" strokeWidth="1" />
        <text x="10" y="20" fontSize="16" fill="var(--text)">Legend:</text>
        <text x="10" y="40" fontSize="14" fill="var(--accent)">Green: Direct Update</text>
        <text x="10" y="60" fontSize="14" fill="var(--primary)">Blue: Sequential Updates</text>
        <text x="10" y="80" fontSize="14" fill="var(--secondary)">Orange: Indirect Updates</text>
      </g>

      {/* Footer Text */}
      <text x="400" y="700" textAnchor="middle" fontSize="28" fontFamily="Arial, sans-serif" fontWeight="600" fill="var(--accent)" paintOrder="stroke" stroke="var(--background)" strokeWidth="2">Matrix of Flexible Off-Chain Payments</text>
    </svg>
  );
}