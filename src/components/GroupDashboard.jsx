import React, { useState, useContext } from "react";
import { Users, CheckCircle } from "lucide-react";
import { GroupsContext } from "../context/GroupContext";

const GroupDashboard = () => {
  const { groups, toggleTaskStatus } = useContext(GroupsContext);
  const [filter, setFilter] = useState("All");

  const getFilteredTasks = () => {
    let tasks = [];
    groups.forEach((group) => {
      group.tasks.forEach((task) => {
        tasks.push({
          ...task,
          groupId: group.id, // ✅ store groupId for toggling
          groupName: group.name,
        });
      });
    });

    if (filter === "All") return tasks;
    return tasks.filter((task) =>
      filter === "Completed" ? task.completed : !task.completed
    );
  };

  const filteredTasks = getFilteredTasks();

  return (
    <section className="mt-6 bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg animate-[slideIn_1s_ease-out]">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Users size={24} /> Group Tasks
      </h2>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {["All", "Pending", "Completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
              filter === status
                ? "bg-purple-600/50"
                : "bg-gray-700/50 hover:bg-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-400">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-gray-700/70 p-4 rounded-lg shadow-md hover:shadow-[0_0_5px_#7c3aed] hover:scale-[1.02] transition-all duration-300 animate-[fadeIn_0.8s_ease-out]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-lg font-bold text-purple-400">{task.title}</h3>
              <p className="text-gray-300 text-sm mb-1">Group: {task.groupName}</p>
              <p className="text-gray-300 text-sm mb-2">
                Status: {task.completed ? "Completed ✅" : "Pending ⏳"}
              </p>
              
              {/* Toggle status button */}
              <button
                onClick={() => toggleTaskStatus(task.groupId, task.id)}
                className={`mt-2 w-full px-4 py-2 rounded-lg text-sm font-semibold ${
                  task.completed
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } transition-all duration-300`}
              >
                Mark as {task.completed ? "Pending" : "Completed"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GroupDashboard;
