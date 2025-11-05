// Firebase client initialization
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// NOTE: These are public client config values provided by the user.
const firebaseConfig = {
  apiKey: "AIzaSyCW9KK0f4KnDbhvcBCQJ8cuUz1wZTPCvqE",
  authDomain: "glowify-b5874.firebaseapp.com",
  projectId: "glowify-b5874",
  storageBucket: "glowify-b5874.firebasestorage.app",
  messagingSenderId: "79301082061",
  appId: "1:79301082061:web:199c8bb93942ce52d12284",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
