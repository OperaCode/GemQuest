import React, { useState, useEffect, useContext } from "react";
import { CheckCircle } from "lucide-react";
import { GroupsContext } from "../context/GroupContext";

const CreateTaskForm = () => {
 const { groups, addTaskToGroup } = useContext(GroupsContext);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Update selectedGroup whenever groups change
  useEffect(() => {
    if (groups.length > 0) {
      setSelectedGroup(groups[groups.length - 1].id);
    } else {
      setSelectedGroup("");
    }
  }, [groups]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedGroup || !title || !description) {
      alert("Please fill all fields and select a group.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTaskToGroup(selectedGroup, newTask);

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <section className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg animate-[fadeIn_0.8s_ease-out]">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <CheckCircle size={24} /> Create Task
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Group */}
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        >
          {groups.length === 0 ? (
            <option value="">No groups available</option>
          ) : (
            groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))
          )}
        </select>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
          rows="4"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300"
        >
          Add Task
        </button>
      </form>
    </section>
  );
};

export default CreateTaskForm;
