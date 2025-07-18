import React, { createContext, useState, useEffect } from "react";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load groups from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("tasktribe_groups");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setGroups(parsed);
        //   console.log("Loaded groups from storage:", parsed);
        }
      } catch (err) {
        console.error("Failed to parse groups from storage", err);
      }
    }
    setLoaded(true);
  }, []);

  // Save groups to localStorage only after initial load
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasktribe_groups", JSON.stringify(groups));
    //   console.log("Saved groups to storage:", groups);
    }
  }, [groups, loaded]);

  const addGroup = (groupName, participants = []) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      participants,
      tasks: [],
      createdAt: new Date().toISOString(),
    };
    setGroups(prev => [...prev, newGroup]);
  };

  const addTaskToGroup = (groupId, task) => {
    const updatedGroups = groups.map((group) =>
      group.id === parseInt(groupId)
        ? { ...group, tasks: [...group.tasks, task] }
        : group
    );
    setGroups(updatedGroups);
  };

  const toggleTaskStatus = (groupId, taskId) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === parseInt(groupId)) {
        const updatedTasks = group.tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
        );
        return { ...group, tasks: updatedTasks };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  const value = {
    groups,
    addGroup,
    addTaskToGroup,
    toggleTaskStatus,
  };

  return (
    <GroupsContext.Provider value={value}>
      {children}
    </GroupsContext.Provider>
  );
};
