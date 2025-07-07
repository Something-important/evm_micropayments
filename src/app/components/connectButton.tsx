// ConnectWallet.tsx
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "../context/themeContext";

const CustomConnectButton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-end p-4">
      <ConnectButton
        showBalance={false}
        accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
        chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
      />
    </div>
  );
};

export default CustomConnectButton;
