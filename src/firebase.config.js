// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZwMgD6v94TIPS5Un5orKM_TnmmmgeGEc",
  authDomain: "deakin-at-dev.firebaseapp.com",
  projectId: "deakin-at-dev",
  storageBucket: "deakin-at-dev.appspot.com",
  messagingSenderId: "532975884449",
  appId: "1:532975884449:web:c84b99b9b43b55423278e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
