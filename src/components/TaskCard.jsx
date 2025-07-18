import React from "react";
import { db } from "../config/firebaseConfig";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";

const TaskCard = ({ task, user }) => {
  const handleComplete = async () => {
    const taskRef = doc(db, "tasks", task.id);

    try {
      await updateDoc(taskRef, {
        completions: arrayUnion({
          userId: user.uid,
          displayName: user.displayName,
          timestamp: new Date().toISOString(),
          gemContributed: true,
        }),
        totalGems: increment(1),
      });
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className="text-purple-700 mb-2">💎 Gems: {task.totalGems || 0}</p>
      <button
        onClick={handleComplete}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        ✅ Mark as Done & Drop Gem
      </button>
    </div>
  );
};

export default TaskCard;
