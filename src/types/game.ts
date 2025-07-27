export interface Player {
  id: string;
  username: string;
  balance: {
    btc: number;
    eth: number;
    usd: number;
  };
}

export interface CryptoPrices {
  btc: number;
  eth: number;
  lastUpdated: number;
}

export interface GameRound {
  id: string;
  status: "waiting" | "active" | "crashed" | "preparing";
  players: PlayerBet[];
}

export interface PlayerBet {
  playerId: string;
  username: string;
  usdAmount: number;
  cryptoAmount: number;
  cryptocurrency: "btc" | "eth";
  cashedOutAt?: number;
  payout?: number;
  timestamp: number;
}

export interface Transaction {
  id: string;
  playerId: string;
  type: "bet" | "cashout";
  usdAmount: number;
  cryptoAmount: number;
  cryptocurrency: "btc" | "eth";
  multiplier?: number;
  timestamp: number;
  hash: string;
}

export interface GameState {
  currentRound: GameRound;
  nextRoundIn?: number | 10; // Time until next round starts in milliseconds
  multiplier: number;
  isActive: boolean;
}
