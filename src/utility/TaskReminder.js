
export const getUpcomingTasks = (groups, hoursBefore = 24) => {
  const now = new Date();
  const threshold = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);

  const upcoming = [];

  groups.forEach(group => {
    group.tasks.forEach(task => {
      if (!task.dueDate || task.completed) return;

      const due = new Date(task.dueDate);
      if (due > now && due <= threshold) {
        upcoming.push({
          ...task,
          groupName: group.name
        });
      }
    });
  });

  return upcoming;
};
