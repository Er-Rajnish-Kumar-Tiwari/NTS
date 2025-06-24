// === firebase.js ===
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBciUQlzzyNNZeJIvW9Ja6Xln_4gHRYmqQ",
  authDomain: "kaamigo-b5778.firebaseapp.com",
  projectId: "kaamigo-b5778",
  storageBucket: "kaamigo-b5778.appspot.com", // Corrected the bucket domain
  messagingSenderId: "481300716481",
  appId: "1:481300716481:web:4525990e3e5db375132d40"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // ✅ Added
export const db = getFirestore(app);
export const storage = getStorage(app);
