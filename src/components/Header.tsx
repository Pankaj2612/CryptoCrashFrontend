import React from "react";
import { DollarSign, Bitcoin } from "lucide-react";

interface HeaderProps {
  WalletBalance: number;
  playerId: string;
}

export const Header: React.FC<HeaderProps> = ({ WalletBalance, playerId }) => {
  return (
    <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#00d4aa] rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-xl">Stake</span>
          </div>
        </div>

        {/* Center - Game Title */}
        <div className="flex-1 text-center">
          <h1 className="text-[#00d4aa] font-bold text-xl">Crash</h1>
        </div>

        {/* Right side - Wallet */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#2a2a2a] rounded-lg px-3 py-2">
            <span className="text-white font-medium">{playerId}</span>
            <Bitcoin className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-white font-medium">{WalletBalance}</span>
            <DollarSign className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-white font-medium">
              {(WalletBalance * 119145.4).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
