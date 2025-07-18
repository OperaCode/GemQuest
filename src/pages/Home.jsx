import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import GroupDashboard from "../components/GroupDashboard";
import CreateTaskForm from "../components/CreateTaskForm";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null; // or loading spinner later

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-purple-800">
          👋 Welcome, {user.displayName}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </header>
    <CreateTaskForm/>
      <GroupDashboard user={user} />
    </div>
  );
};

export default Home;
