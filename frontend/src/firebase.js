import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace this with your actual Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCHLCLhD5t2mxYOxVMlRqUTr_Ju-qCftMw",
  authDomain: "ninty-nine-global.firebaseapp.com",
  projectId: "ninty-nine-global",
  storageBucket: "ninty-nine-global.firebasestorage.app",
  messagingSenderId: "1050513777562",
  appId: "1:1050513777562:web:c65e1e3c97c31dc4389023",
  measurementId: "G-507W8TJFPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
