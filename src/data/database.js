// src/data/database.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAyQwqJShKbX7fx5vjB6H_y57IU-L05nUk",
  authDomain: "toylist-3a2ab.firebaseapp.com",
  projectId: "toylist-3a2ab",
  storageBucket: "toylist-3a2ab.firebasestorage.app",
  messagingSenderId: "962153191259",
  appId: "1:962153191259:web:8b0504a18af1531827ac7e",
  measurementId: "G-CXGSWF2GCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
