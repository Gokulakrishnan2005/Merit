// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-first-project-6eebf.firebaseapp.com",
  projectId: "my-first-project-6eebf",
  storageBucket: "my-first-project-6eebf.appspot.com",
  messagingSenderId: "1010692245718",
  appId: "1:1010692245718:web:2906c0523917847dc52177"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

export { app, storage };
