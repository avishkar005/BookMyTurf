import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQZV1pjuPElloTeqAevtyxPCsF2NvlOUE",
  authDomain: "bookmyturf-11a73.firebaseapp.com",
  projectId: "bookmyturf-11a73",
  storageBucket: "bookmyturf-11a73.firebasestorage.app",
  messagingSenderId: "818071333556",
  appId: "1:818071333556:web:56614ff04b48df53ea85e1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;