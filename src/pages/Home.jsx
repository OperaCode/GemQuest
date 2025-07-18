import React, { useState, useEffect } from "react";
import { LogOut, Users } from "lucide-react";

import CreateTaskForm from "../components/CreateTaskForm";
import GroupDashboard from "../components/GroupDashboard";
import GroupCreation from "../components/GroupCreation";

const Home = () => {
  const [groups, setGroups] = useState([]);

  // Load groups on mount
  useEffect(() => {
    const storedGroups =
      JSON.parse(localStorage.getItem("tasktribe_groups")) || [];
    setGroups(storedGroups);
  }, []);

  // Refresh groups when group is created
  const handleGroupCreated = () => {
    const storedGroups =
      JSON.parse(localStorage.getItem("tasktribe_groups")) || [];
    setGroups(storedGroups);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-amber-800">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-900/10 backdrop-blur-md shadow-lg z-20 animate-[headerPulse_1.5s_ease-in-out]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-300">
          TaskTribe
        </h1>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          <a
            href="/"
            className=" flex items-center gap-2 cursor-pointer font-bold text-gray-200 px-3 py-2 rounded-lg hover:text-white hover:shadow-[0_0_5px_#7c3aed,0_0_10px_#7c3aed] transition-all duration-300"
          >
            <LogOut/>
            Exit App
          </a>
        </nav>
      </header>

      {/* Welcome Banner */}
      <section className="max-w-7xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="relative bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-[0_0_10px_#7c3aed] animate-[slideIn_1s_ease-out]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Users size={28} /> Welcome to TaskTribe
          </h2>
          <p className="text-gray-200 mt-2">
            Create your personal groups and keep track of your tasks seamlessly.
          </p>
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-xl animate-[pulse_3s_infinite]"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-full">
          <GroupCreation onGroupCreated={handleGroupCreated} />
        </div>
        <div className="md:w-1/2">
          <CreateTaskForm groups={groups} />
        </div>
       
      </main>
      <section className="max-w-7xl mx-auto mt-6 px-4 sm:px-6 pb-8">
         <div className="w-full">
          <GroupDashboard groups={groups} />
        </div>
      </section>
    </div>
  );
};

export default Home;
