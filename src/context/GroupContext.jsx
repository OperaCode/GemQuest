import React, { createContext, useState, useEffect } from "react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  // Load groups from localStorage on mount
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("tasktribe_groups")) || [];
    setGroups(storedGroups);
  }, []);

  // Save groups to localStorage when updated
  useEffect(() => {
    localStorage.setItem("tasktribe_groups", JSON.stringify(groups));
  }, [groups]);

  const addGroup = (groupName) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setGroups([...groups, newGroup]);
  };

  const addTaskToGroup = (groupId, task) => {
    const updatedGroups = groups.map((group) =>
      group.id === groupId
        ? { ...group, tasks: [...group.tasks, task] }
        : group
    );
    setGroups(updatedGroups);
  };

  const value = {
    groups,
    addGroup,
    addTaskToGroup,
  };

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};
