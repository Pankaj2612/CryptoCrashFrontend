import React, { useState } from "react";

interface PlayerIdOverlayProps {
  onSetPlayerId: (id: string) => void;
}

export const PlayerIdOverlay: React.FC<PlayerIdOverlayProps> = ({
  onSetPlayerId,
}) => {
  const [inputId, setInputId] = useState("");

  const randomIds = ["68837238502dd64d2116b80a", "688672687146bb944651463f", "688672747146bb9446514640"];

  const handleSubmit = () => {
    if (!inputId.trim()) return;
    sessionStorage.setItem("player_id", inputId);
    onSetPlayerId(inputId);
  };

  const handleClick = (id: string) => {
    sessionStorage.setItem("player_id", id);
    onSetPlayerId(id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-white text-xl font-bold mb-4">Enter Player ID</h2>
        <input
          type="text"
          placeholder="Your player ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-[#2a2a2a] text-white outline-none"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#00d4aa] text-black py-2 rounded font-semibold mb-4 hover:bg-opacity-80"
        >
          Continue
        </button>

        <p className="text-gray-400 text-sm mb-2">Or select a random ID</p>
        <div className="flex-col justify-center gap-2">
          {randomIds.map((id) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className="bg-[#2a2a2a] text-[#00d4aa] px-3 py-1 rounded text-sm hover:bg-[#00d4aa]/20"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
