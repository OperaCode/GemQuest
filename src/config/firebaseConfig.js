// Import Firebase core functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with your project's actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAKfviGBuU1r1VLEpfsr--ibhMkc5MR_7U",
  authDomain: "tasktribe-294db.firebaseapp.com",
  projectId: "tasktribe-294db",
  storageBucket: "tasktribe-294db.firebasestorage.app",
  messagingSenderId: "474356127543",
  appId: "1:474356127543:web:259523e68b28ab6f6aacb2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
