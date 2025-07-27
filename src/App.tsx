import  { useState, useEffect } from "react";
import MainApp from "./MainApp";

const playerIds = ["688672747146bb9446514640", "68837238502dd64d2116b80a", "688672687146bb944651463f"];

function App() {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = sessionStorage.getItem("player_id");
    if (storedId) setPlayerId(storedId);
  }, []);

  if (!playerId) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="bg-[#1a1a1a] p-8 rounded-lg text-white space-y-4 w-full max-w-md">
          <h2 className="text-2xl font-bold">Select Player ID</h2>
          <input
            type="text"
            placeholder="Enter your player ID"
            className="w-full p-2 rounded bg-[#2a2a2a] border border-[#444] focus:outline-none"
            onChange={(e) => setPlayerId(e.target.value)}
          />
          <div className="flex-col space-y-2">
            {playerIds.map((id) => (
              <button
                key={id}
                onClick={() => {
                  sessionStorage.setItem("player_id", id);
                  setPlayerId(id);
                }}
                className="bg-[#00d4aa] text-black px-4 py-2 rounded hover:bg-[#00c49f]"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ✅ Always return a component that calls hooks
  return <MainApp playerId={playerId} />;
}

export default App;
