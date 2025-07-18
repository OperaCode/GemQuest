import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const TaskCard = ({ task, user }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [showGem, setShowGem] = useState(false);

  const hasCompleted = task.completions.some(
    (c) => c.userId === user.uid
  );

  const isParticipant =
    task.creatorId === user.uid || task.participants.includes(user.uid);

  // Fetch all user profiles
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserProfiles(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleComplete = async () => {
    if (!isParticipant) {
      toast.error("You are not part of this task.");
      return;
    }

    if (hasCompleted) {
      toast.info("You have already completed this task.");
      return;
    }

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
      setShowGem(true);
      setTimeout(() => setShowGem(false), 1500);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Calculate progress
  const totalParticipants = task.participants.length + 1; // +1 for creator
  const completedCount = task.completions.length;
  const progress = Math.min((completedCount / totalParticipants) * 100, 100);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <p className="text-purple-700 mb-2">💎 Gems: {task.totalGems || 0}</p>

      {/* Progress bar */}
      <div className="mb-2">
        <p className="text-gray-600 text-sm mb-1">
          Progress: {completedCount}/{totalParticipants} completed
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Participant list */}
      <div className="mt-2 mb-2">
        <p className="text-gray-600 text-sm mb-1">Participants:</p>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li className={task.creatorId === user.uid ? "font-semibold" : ""}>
            👑 {task.creatorId === user.uid ? "You (Creator)" : "Creator"}
          </li>
          {task.participants.map((p) => {
            const participant = userProfiles.find((u) => u.id === p);
            return (
              <li key={p}>
                {participant
                  ? participant.displayName || participant.email
                  : p}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Gem animation + complete button */}
      <div className="mt-4">
        <AnimatePresence>
          {showGem && (
            <motion.div
              key="gem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="text-3xl text-yellow-400 text-center"
            >
              💎
            </motion.div>
          )}
        </AnimatePresence>

        {hasCompleted ? (
          <p className="text-green-600 font-semibold text-center mt-2">
            ✅ Completed
          </p>
        ) : (
          <button
          
          className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition mt-2"
          onClick={handleComplete}
          >
            ✅ Mark as Done 
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
