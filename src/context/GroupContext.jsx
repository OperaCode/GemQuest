import React, { createContext, useState, useEffect } from "react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load groups from localStorage on mount
  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("tasktribe_groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }
    setIsLoaded(true); // Mark as loaded
  }, []);

  // Save groups to localStorage only after initial load
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("tasktribe_groups", JSON.stringify(groups));
    }
  }, [groups, isLoaded]);

  const addGroup = (groupName) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const addTaskToGroup = (groupId, task) => {
    const updatedGroups = groups.map((group) =>
      group.id === parseInt(groupId)
        ? { ...group, tasks: [...group.tasks, task] }
        : group
    );
    setGroups(updatedGroups);
  };

  return (
    <GroupsContext.Provider value={{ groups, addGroup, addTaskToGroup }}>
      {children}
    </GroupsContext.Provider>
  );
};
