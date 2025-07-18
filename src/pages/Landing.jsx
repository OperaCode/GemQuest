import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-6">
      <h1 className="text-4xl font-bold mb-4 text-purple-800">
        💎 GemQuest
      </h1>
      <p className="text-center text-gray-700 mb-8 max-w-md">
        Unite your community to complete daily tasks, collect gems, and grow together. Tasks become wins when everyone contributes their gem!
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
