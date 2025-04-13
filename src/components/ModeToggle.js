import { useState } from "react";
import { motion } from "framer-motion";

function ModeToggle() {
  const [mode, setMode] = useState("chill");

  const handleModeChange = (newMode) => {
    setMode(newMode);
    document.body.className = newMode;
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="p-4 bg-white rounded-lg shadow-lg mb-6"
    >
      <button
        onClick={() => handleModeChange("focus")}
        className="p-2 mx-2 bg-red-500 text-white rounded"
      >
        Focus
      </button>
      <button
        onClick={() => handleModeChange("chill")}
        className="p-2 mx-2 bg-blue-500 text-white rounded"
      >
        Chill
      </button>
      <button
        onClick={() => handleModeChange("night")}
        className="p-2 mx-2 bg-purple-500 text-white rounded"
      >
        Night
      </button>
    </motion.div>
  );
}

export default ModeToggle;
