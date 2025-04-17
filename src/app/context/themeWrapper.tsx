// ThemeWrapper.tsx
import React from "react";
import { useTheme } from "./themeContext"; // Import useTheme hook
import { lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from "wagmi/chains";

// Define the Citrea testnet configuration
const citreaTestnet = {
  id: 5115,
  name: "Citrea Testnet",
  network: "citrea-testnet",
  nativeCurrency: {
    name: "Citrea Test BTC",
    symbol: "cBTC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.citrea.xyz"] },
    public: { http: ["https://rpc.testnet.citrea.xyz"] },
  },
  blockExplorers: {
    default: {
      name: "Citrea Explorer",
      url: "https://explorer.testnet.citrea.xyz",
    },
  },
};

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, citreaTestnet],
  ssr: true,
});

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme(); // Use the useTheme hook
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
  theme={theme === "light" 
    ? lightTheme({
        accentColor: "#7b3fe4", // Consistent purple accent color
        accentColorForeground: "white", // White foreground in light mode
        borderRadius: "medium", // Medium for rounded corners
        fontStack: "system", // Default system font stack
        overlayBlur: "small", // Small blur effect for subtle depth
      })
    : darkTheme({
        accentColor: "#7b3fe4", // Consistent purple accent color
        accentColorForeground: "black", // Black foreground in dark mode
        borderRadius: "medium", // Medium for rounded corners
        fontStack: "system", // Default system font stack
        overlayBlur: "small", // Small blur effect for subtle depth
      })
  }
>
  {children}
</RainbowKitProvider>

      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ThemeWrapper;
