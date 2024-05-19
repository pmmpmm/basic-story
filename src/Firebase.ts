import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBAnqaemo21d8uBHDrUS3tc8FA7E-oO2CU",
  authDomain: "basic-story.firebaseapp.com",
  projectId: "basic-story",
  storageBucket: "basic-story.appspot.com",
  messagingSenderId: "780647936665",
  appId: "1:780647936665:web:15cd975acff71d81307e08",
  measurementId: "G-SW9VR99W7X"
  // databaseURL: "https://basic-story-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authService = getAuth();

export { app, auth, db, authService };
