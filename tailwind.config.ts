import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-hover': 'var(--primary-hover)',
        secondary: 'var(--secondary)',
        'secondary-hover': 'var(--secondary-hover)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        card: 'var(--card)',
        // Light theme colors
        light: {
          background: "#F3F4F6", // Light gray background (better than plain white)
          text: "#333333", // Darker text for better readability
          accent: "#34D399", // Vibrant mint green for accent
          button: "#FB923C", // Vibrant orange button color
          headerFooter: "#FFFFFF", // White header/footer
          primary: "#1D4ED8", // Deep blue for primary call-to-actions
          secondary: "#F97316", // Bright orange for secondary actions
          lightMint: "#A7F3D0", // Soft mint green
          mutedGray: "#E5E7EB", // Light gray
          darkGray: "#6B7280", // Dark gray for secondary text
        },
        // Dark theme colors
        dark: {
          background: "#2D3748", // Darker teal background
          text: "#E2E8F0", // Light text for dark mode (light mint green)
          accent: "#34D399", // Vibrant mint green
          button: "#FB923C", // Orange button color
          headerFooter: "#1A202C", // Dark grayish header/footer
          primary: "#3182CE", // Lighter blue for primary in dark mode
          secondary: "#F97316", // Bright orange for secondary in dark mode
          lightMint: "#A7F3D0", // Soft mint green
          mutedGray: "#4A5568", // Gray for dark mode
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font family
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Add more custom spacing, breakpoints, etc., as needed
    },
  },
  plugins: [],
} satisfies Config;
