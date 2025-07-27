import { Header } from "./components/Header";
import { MultiplierDisplay } from "./components/MultiplierDisplay";
import { BettingPanel } from "./components/BettingPanel";
import { useWebSocket } from "./hooks/useWebSocket";
import { Toaster } from "react-hot-toast";

interface Props {
  playerId: string;
}

function MainApp({ playerId }: Props) {
  const {
    gameState,
    hasBet,
    setHasBet,

    placeBet,
    cashOut,
    walletBalance,
  } = useWebSocket(playerId); // ✅ Safe hook call

  return (
    <div className="min-h-screen bg-[#0f1419]">
      <Header WalletBalance={walletBalance} playerId={playerId} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MultiplierDisplay gameState={gameState} />
          </div>
          <div>
            <BettingPanel
              gameState={gameState}
              onPlaceBet={placeBet}
              onCashOut={cashOut}
              hasBet={hasBet}
              setHasBet={setHasBet}
            />
          </div>
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
}

export default MainApp;
