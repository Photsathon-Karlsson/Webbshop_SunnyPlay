// This code is used to connect to Firebase Firestore, which is Firebase's database.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebaseConfig: An object that stores settings for connecting to Firebase.
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

// initializeApp: Starts Firebase.
// getFirestore: Connects to Firestore.
// export const db: Makes Firestore usable in other files.



