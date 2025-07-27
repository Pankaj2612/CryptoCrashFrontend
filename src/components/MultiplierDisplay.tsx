import React from "react";
import { GameState } from "../types/game";

interface MultiplierDisplayProps {
  gameState: GameState | null;
}

export const MultiplierDisplay: React.FC<MultiplierDisplayProps> = ({
  gameState,
}) => {
  if (!gameState) return null;

  const getMultiplierColor = () => {
    if (!gameState.isActive) {
      return gameState.currentRound.status === "crashed"
        ? "text-red-500"
        : "text-gray-400";
    }

    if (gameState.multiplier < 2) return "text-[#00d4aa]";
    if (gameState.multiplier < 5) return "text-yellow-400";
    if (gameState.multiplier < 10) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
      {/* Game Canvas Area */}
      <div className="relative h-96 bg-gradient-to-br from-[#0f1419] to-[#1a1a1a] flex items-center justify-center">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0, 212, 170, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 170, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "20px 20px",
            }}></div>
        </div>

        {/* Multiplier Display */}
        <div className="relative z-10 text-center">
          <div>
            <div
              className={`text-9xl font-bold mb-4 transition-all duration-100 ${getMultiplierColor()}`}>
              {gameState.multiplier.toFixed(2)}x
            </div>
            {gameState.currentRound.status === "crashed" && (
              <div className="text-4xl text-red-500 font-bold animate-pulse">
                CRASHED!
                <div className="text-4xl text-blue-300 font-bold ">
                  Next Round in {gameState.nextRoundIn} s
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Crash line animation */}
        {gameState.isActive && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00d4aa] to-transparent animate-pulse"></div>
        )}
      </div>

      {/* Bottom stats bar */}
      <div className="bg-[#2a2a2a] px-4 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-gray-400">Players: </span>
            <span className="text-white font-medium">24</span>
          </div>
          <div>
            <span className="text-gray-400">Total Bet: </span>
            <span className="text-white font-medium">$2,450.00</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              gameState.isActive ? "bg-[#00d4aa]" : "bg-gray-500"
            }`}></div>
          <span className="text-gray-400 text-xs">
            {gameState.isActive ? "LIVE" : "WAITING"}
          </span>
        </div>
      </div>
    </div>
  );
};
