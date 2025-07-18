import React, { useState, useContext } from "react";
import { GroupsContext } from "../context/GroupContext";

const GroupCreation = () => {
  const { groups, addGroup } = useContext(GroupsContext);
  const [groupName, setGroupName] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);

  const handleCreateGroup = (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      toast.info("Please enter a group name.");
      return;
    }

    addGroup(groupName.trim(), participants);
    setGroupName("");
    setParticipants([]);
    setParticipantInput("");
  };

  const handleAddParticipant = () => {
    if (participantInput.trim() !== "") {
      setParticipants([...participants, participantInput.trim()]);
      setParticipantInput("");
    }
  };

  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
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

        {/* Participants input */}
        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add participant (name or email)"
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-purple-500 text-white placeholder-gray-400/70"
            />
            <button
              type="button"
              onClick={handleAddParticipant}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
            >
              Add
            </button>
          </div>

          {/* Display added participants */}
          {participants.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {participants.map((p, index) => (
                <span
                  key={index}
                  className="bg-purple-600/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {p}
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(index)}
                    className="text-red-300 hover:text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

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
                <strong>{group.name}</strong>
                {group.participants && group.participants.length > 0 && (
                  <ul className="ml-4 mt-1 text-sm text-gray-300 list-disc">
                    {group.participants.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default GroupCreation;
