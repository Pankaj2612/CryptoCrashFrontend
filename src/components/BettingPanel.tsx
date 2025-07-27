import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { GameState } from "../types/game";

interface BettingPanelProps {
  gameState: GameState | null;
  onPlaceBet: (amount: number, crypto: "BTC") => void;
  onCashOut: (player_id: string) => void;
  hasBet: boolean;
  setHasBet: (hasBet: boolean) => void;
}

export const BettingPanel: React.FC<BettingPanelProps> = ({
  gameState,
  onPlaceBet,
  onCashOut,
  hasBet,
  setHasBet,
}) => {
  const [betAmount, setBetAmount] = useState<string>("1.00");

  const canBet = gameState?.currentRound.status === "crashed" && !hasBet;
  const canCashOut = gameState?.isActive && hasBet;

  const quickAmounts = ["0.10", "1.00", "10.00", "100.00"];
  const handlePlaceBet = () => {
    const amount = parseFloat(betAmount);
    console.log("betAmount" + betAmount);

    if (amount > 0 && canBet) {
      onPlaceBet(amount, "BTC"); // Replace "player_id" with actual player ID
      setHasBet(true);
    }
  };

  const handleCashOut = () => {
    if (canCashOut) {
      onCashOut("68837238502dd64d2116b80a"); // Replace "player_id" with actual player ID
      setHasBet(false);
    }
  };

  const adjustAmount = (increment: boolean) => {
    const current = parseFloat(betAmount) || 0;
    const newAmount = increment ? current + 1 : Math.max(0.1, current - 1);
    setBetAmount(newAmount.toFixed(2));
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] p-4">
      <div className="space-y-4">
        {/* Bet Amount */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Bet Amount</label>
          <div className="flex items-center">
            <button
              onClick={() => adjustAmount(false)}
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded-l-lg px-3 py-2 text-gray-400 hover:text-white transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                $
              </span>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full bg-[#2a2a2a] border-t border-b border-[#3a3a3a] px-8 py-2 text-white text-center focus:outline-none focus:border-[#00d4aa]"
                step="0.01"
                min="0.01"
              />
            </div>
            <button
              onClick={() => adjustAmount(true)}
              className="bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded-r-lg px-3 py-2 text-gray-400 hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick amount buttons */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setBetAmount(amount)}
                className="bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors">
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!hasBet ? (
            <button
              onClick={handlePlaceBet}
              disabled={!canBet || parseFloat(betAmount) <= 0}
              className="w-full py-3 px-4 rounded-lg font-bold text-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#00d4aa] hover:bg-[#00c49a] focus:ring-2 focus:ring-[#00d4aa] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]">
              {canBet ? "Place Bet for next Round" : "Waiting for Round End..."}
            </button>
          ) : (
            <button
              onClick={handleCashOut}
              disabled={!canCashOut}
              className="w-full py-3 px-4 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] animate-pulse">
              {canCashOut
                ? `Cash Out ${gameState?.multiplier.toFixed(2)}x`
                : "Waiting..."}
            </button>
          )}
        </div>

        {/* Potential Payout */}
        {hasBet && gameState?.isActive && (
          <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#3a3a3a]">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Potential Payout:</span>
              <span className="text-[#00d4aa] font-bold">
                ${(parseFloat(betAmount) * gameState.multiplier).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
