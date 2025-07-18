import React, { useState, useContext } from "react";
import { GroupsContext } from "../context/GroupContext";

const GroupCreation = () => {
  const { groups, addGroup } = useContext(GroupsContext);
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    addGroup(groupName.trim());
    setGroupName("");
  };

  return (
    <section className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">➕ Create New Group</h2>
      <form onSubmit={handleCreateGroup} className="space-y-4">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 hover:animate-pulse transition-all duration-300"
        >
          Create Group
        </button>
      </form>
      {groups.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Your Groups</h3>
          <ul className="space-y-2">
            {groups.map((group) => (
              <li
                key={group.id}
                className="bg-gray-700/70 px-4 py-2 rounded-lg text-white shadow-md"
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default GroupCreation;
