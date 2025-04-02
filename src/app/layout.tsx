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

