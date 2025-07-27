import { useState, useEffect, useRef } from "react";
import { GameState } from "../types/game";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

export const useWebSocket = (playerId: string | null) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [hasBet, setHasBet] = useState<boolean>(false);
  const wsRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!playerId) {
      toast.error("Player ID is required to connect to WebSocket");
      console.error("Player ID is required to connect to WebSocket");
      return;
    }
    const socket = io(import.meta.env.VITE_API_URL);
    wsRef.current = socket;

    //Connect to WebSocket server
    socket.on("connect", () => {
      setIsConnected(true);
    });

    if (playerId) {
      socket.emit("balance_request", { player_id: playerId });
    }
    //Round Start GameState
    socket.on("round_start", (data) => {
      const { id, status, multiplier, isActive, players } = data;
      setGameState({
        currentRound: { id, status, players },
        multiplier,
        isActive,
      });
    });

    //Multipler Update
    socket.on("multiplier_update", (data) => {
      setGameState((prev) =>
        prev
          ? {
              ...prev,
              multiplier: data.multiplier,
            }
          : null
      );
    });

    //On Crash
    socket.on("round_crash", (data) => {
      const { crash_point, status, id } = data;
      setGameState({
        currentRound: { id, status, players: [] },
        multiplier: crash_point,
        isActive: false,
      });
      setHasBet(false);
    });

    //10s timer
    socket.on("countdown_tick", (data) => {
      const { nextRoundIn } = data;
      setGameState((prev) =>
        prev
          ? {
              ...prev,
              nextRoundIn,
            }
          : null
      );
    });

    socket.on("cashout_result", ({ success, payout, error }) => {
      if (!success) {
        toast.error(error || "Cashout failed");
        setHasBet(false); // <-- Reset if user missed cashout
      } else if (success) {
        toast.success("Successfully cashed out for $" + payout);
        setHasBet(false); // <-- Reset on successful cashout too
      }
    });

    //Bet Result
    socket.on("bet_result", ({ success, message }) => {
      if (!success) {
        toast.error(message);
        setHasBet(false);
      } else {
        toast.success(message);
      }
    });

    socket.on("balance_update", ({ success, currency, wallet, error }) => {
      if (success) {
        setWalletBalance(wallet);
      } else {
        console.error("❌ Balance update failed:", error);
      }
    });

    //Error
    socket.on("error_detected", (message) => {
      toast.error(message || "An error occurred");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const placeBet = (usd_amount: number, currency: "BTC" | "ETH") => {
    // Simulate placing a bet

    if (wsRef.current) {
      wsRef.current.emit("place_bet", {
        player_id: playerId,
        usd_amount,
        currency,
      });
      setHasBet(true);
    }
  };
  const cashOut = () => {
    if (!playerId || !wsRef.current) return;

    wsRef.current.emit("cashout", { player_id: playerId });
  };

  return {
    gameState,
    isConnected,
    placeBet,
    hasBet,
    setHasBet,
    playerId,
    cashOut,
    walletBalance,
  };
};
