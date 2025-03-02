// // RootLayout.tsx
// 'use client';
// import "./globals.css";
// import "@rainbow-me/rainbowkit/styles.css";
// import {
//   getDefaultConfig,
//   RainbowKitProvider,
//   darkTheme,
//   lightTheme,
// } from "@rainbow-me/rainbowkit";
// import { mainnet, polygon, optimism, arbitrum, base, sepolia } from "wagmi/chains";
// import { WagmiProvider } from "wagmi";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ThemeProvider } from "./context/themeContext"; // Import the ThemeProvider

// // Define the Citrea testnet configuration
// const citreaTestnet = {
//   id: 5115,
//   name: "Citrea Testnet",
//   network: "Citrea Testnet",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Citrea",
//     symbol: "cBTC",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://rpc.testnet.citrea.xyz"],
//     },
//   },
//   blockExplorers: {
//     default: { name: "Citrea Explorer", url: "https://explorer.testnet.citrea.xyz" },
//   },
//   testnet: true,
// } as const;

// const config = getDefaultConfig({
//   appName: "My RainbowKit App",
//   projectId: "YOUR_PROJECT_ID",
//   chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, citreaTestnet],
//   ssr: true,
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const queryClient = new QueryClient();

//   return (
//     <html lang="en">
//       <head>
//         <link
//           href="https://fonts.googleapis.com/icon?family=Material+Icons"
//           rel="stylesheet"
//         ></link>
//       </head>
//       <body>
//         <ThemeProvider> {/* Wrap the application with ThemeProvider */}
//           <WagmiProvider config={config}>
//             <QueryClientProvider client={queryClient}>
//               <RainbowKitProvider
//                 theme={theme === "light" ? lightTheme({
//                   accentColor: "#7b3fe4",
//                   accentColorForeground: "white",
//                   borderRadius: "small",
//                   fontStack: "system",
//                   overlayBlur: "small",
//                 }) : darkTheme({
//                   accentColor: "#7b3fe4",
//                   accentColorForeground: "black",
//                   borderRadius: "small",
//                   fontStack: "system",
//                   overlayBlur: "small",
//                 })}
//               >
//                 {children}
//               </RainbowKitProvider>
//             </QueryClientProvider>
//           </WagmiProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


// RootLayout.tsx
'use client';
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "./context/themeContext"; // Import the ThemeProvider
import ThemeWrapper from "./context/themeWrapper"; // Import the ThemeWrapper

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <ThemeProvider> {/* Wrap the application with ThemeProvider */}
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

