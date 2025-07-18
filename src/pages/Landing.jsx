import React from "react";
import { Users, CheckCircle, Trophy } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-amber-800">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-lg z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-300">
          TaskTribe
        </h1>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          <a
            href="#top" 
            className="text-gray-200 px-3 py-2 rounded-lg hover:text-white hover:shadow-[0_0_5px_#7c3aed,0_0_10px_#7c3aed] transition-all duration-300"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-gray-200 px-3 py-2 rounded-lg hover:text-white hover:shadow-[0_0_5px_#7c3aed,0_0_10px_#7c3aed] transition-all duration-300"
          >
            Features
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="min-h-screen flex flex-col items-center justify-center p-6 pt-20 sm:pt-24 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-[heroPulse_1.5s_ease-in-out]">
          TaskTribe
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg animate-[heroPulse_1.5s_ease-in-out]">
          Join your tribe, tackle daily tasks, and thrive together. Every task
          completed strengthens your community!
        </p>
        {/* Task Preview */}
        <div className="relative mb-8 animate-[pulse_2s_infinite] max-w-sm w-full">
          <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-[0_0_10px_#7c3aed] border border-purple-400">
            <h3 className="text-lg font-bold text-white">
              Sample Task: Team Check-in
            </h3>
            <p className="text-gray-300 text-sm">
              Collaborate with your tribe daily to stay connected.
            </p>
            <span className="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-full animate-ping"></span>
          </div>
        </div>
        <a href="/home">
          <button className="bg-purple-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-purple-700 hover:shadow-[0_0_5px_#7c3aed] transition-all duration-300 text-lg font-semibold">
            Get Started
          </button>
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-900/30">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Why TaskTribe?
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Users size={40} className="text-purple-400" />,
              title: "Build Your Tribe",
              desc: "Connect with your community to share and conquer tasks together.",
            },
            {
              icon: <CheckCircle size={40} className="text-purple-400" />,
              title: "Complete Tasks",
              desc: "Turn daily goals into wins with collaborative task tracking.",
            },
            {
              icon: <Trophy size={40} className="text-purple-400" />,
              title: "Earn Rewards",
              desc: "Celebrate milestones with your tribe and unlock achievements.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-[0_0_10px_#7c3aed] transition-all duration-300 animate-[featureSlide_0.8s_ease-out]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-16 px-6 bg-gray-900/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          What Our Tribe Says
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              quote:
                "TaskTribe made our team unstoppable. We complete tasks faster together!",
              author: "Sarah, Team Lead",
            },
            {
              quote:
                "I love how TaskTribe brings us closer. Every task feels like a group win!",
              author: "James, Community Member",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-md p-6 rounded-xl shadow-lg animate-[featureSlide_0.8s_ease-out]"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <p className="text-gray-200 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-purple-400 font-semibold">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 px-6 bg-gray-900/70 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-amber-600 animate-[wave_3s_infinite]"></div>
        <p className="text-gray-200 mb-4">
          Join the TaskTribe community today!
        </p>
    
        <p className="text-gray-400 text-sm">
          © 2025 TaskTribe. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
