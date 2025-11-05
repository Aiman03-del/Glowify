"use client";

// Firebase client initialization
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Config is read from public env vars so it can be used on the client
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

// Optional: basic runtime validation to help during local dev
if (typeof window !== "undefined") {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    console.warn("Firebase config missing envs:", missing.join(", "));
  }
}

// Ensure we only initialize on the client
let appInstance = getApps().length ? getApp() : undefined;
if (!appInstance) {
  // In extremely rare tooling paths, guard against non-browser init
  if (typeof window !== "undefined") {
    appInstance = initializeApp(firebaseConfig);
  }
}

// Export typed singletons for client usage
export const app = appInstance as ReturnType<typeof initializeApp>;
export const auth = typeof window !== "undefined" && app ? getAuth(app) : (undefined as unknown as ReturnType<typeof getAuth>);
