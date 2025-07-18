import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false)
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

//   useEffect(() => {
//     // Check if user is already logged in
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       if (currentUser) navigate("/home");
//     });
//     return () => unsubscribe();
//   }, [navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200 p-6">
    //   <h1 className="text-3xl font-bold mb-6 text-purple-800">Login to GemQuest</h1>
    //   <button
    //     onClick={handleGoogleLogin}
    //     className="bg-white text-purple-700 border border-purple-700 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 hover:text-white transition"
    //   >
    //     <img
    //       src="https://www.svgrepo.com/show/355037/google.svg"
    //       alt="Google"
    //       className="w-5 h-5"
    //     />
    //     Sign in with Google
    //   </button>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-amber-800">
      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-900/10 backdrop-blur-md shadow-lg z-20 animate-[loginPulse_1.5s_ease-in-out]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-purple-300">TaskTribe</h1>
        <nav className="flex flex-wrap gap-2 sm:gap-4">
          {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
            <a
              key={index}
              href={`/${item.toLowerCase()}`}
              className="text-gray-200 px-3 py-2 rounded-lg hover:text-white hover:shadow-[0_0_5px_#7c3aed,0_0_10px_#7c3aed] transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Login Section */}
      <section className="min-h-screen flex items-center justify-center p-6 pt-20 sm:pt-24">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-md p-8 rounded-xl shadow-[0_0_10px_#7c3aed] animate-[loginPulse_1.5s_ease-in-out] relative">
          <div className="absolute inset-0 border-2 border-purple-400/30 rounded-xl animate-[pulse_3s_infinite]"></div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-4">Login to TaskTribe</h1>
          <p className="text-gray-200 text-center mb-6">Unite with your tribe to conquer tasks!</p>
          {error && (
            <p className="text-red-400 text-center mb-4 animate-[shake_0.5s_ease-out]">{error}</p>
          )}
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-purple-400 border-t-amber-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-white">Signing in...</p>
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-purple-700 border border-purple-700 px-6 sm:px-8 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 hover:text-white hover:animate-pulse hover:shadow-[0_0_5px_#7c3aed] transition-all duration-300"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
              <a
                href="/email-login"
                className="block text-center text-purple-400 mt-4 hover:text-purple-300 transition-all duration-300"
              >
                Sign in with Email (Coming Soon)
              </a>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Login;
