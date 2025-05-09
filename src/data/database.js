// src/data/database.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "toylist-3a2ab.firebaseapp.com",
  projectId: "toylist-3a2ab",
  storageBucket: "toylist-3a2ab.firebasestorage.app",
  messagingSenderId: "962153191259",
  appId: "1:962153191259:web:8b0504a18af1531827ac7e",
  measurementId: "G-CXGSWF2GCG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);





