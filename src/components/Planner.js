import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";

function Planner({ user }) {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const addTask = async () => {
    if (task && deadline) {
      await addDoc(collection(db, "tasks"), {
        userId: user.uid,
        task,
        deadline,
        completed: false,
      });
      setTask("");
      setDeadline("");
    }
  };

  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Study Planner</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task"
        className="p-2 rounded-lg mb-4 w-full border"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="p-2 rounded-lg mb-4 w-full border"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Add Task
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Your Tasks</h3>
        <ul>
          {tasks.map((t) => (
            <li key={t.id} className="p-2 bg-gray-100 rounded-lg my-2">
              {t.task} - Due: {t.deadline}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default Planner;
