import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import Planner from "./components/Planner";
import Timer from "./components/Timer";
import ModeToggle from "./components/ModeToggle";
import { motion } from "framer-motion";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
      {user ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Welcome, {user.displayName}
          </h1>
          <ModeToggle />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Planner user={user} />
            <Timer />
          </div>
        </motion.div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
