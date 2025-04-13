import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Timer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(25 * 60);
    setIsActive(false);
  };

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">
        {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? "0" : ""}
        {seconds % 60}
      </h2>
      <button
        onClick={toggleTimer}
        className="bg-green-500 text-white p-2 rounded-lg mr-2"
      >
        {isActive ? "Pause" : "Start"}
      </button>
      <button
        onClick={resetTimer}
        className="bg-red-500 text-white p-2 rounded-lg"
      >
        Reset
      </button>
    </motion.div>
  );
}

export default Timer;
