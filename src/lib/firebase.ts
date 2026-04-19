// firebase.ts — safe for SSR: initialises only in the browser
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  if (_app) return _app;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey || apiKey.length < 10) return null;

  const { initializeApp, getApps } = require("firebase/app");
  _app = getApps().length
    ? getApps()[0]
    : initializeApp({
        apiKey,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });
  return _app;
}

export function getAuthInstance(): Auth | null {
  if (typeof window === "undefined") return null;
  if (_auth) return _auth;
  const app = getFirebaseApp();
  if (!app) return null;
  const { getAuth } = require("firebase/auth");
  _auth = getAuth(app);
  return _auth;
}

// Legacy named export kept for backwards compat — may be null on SSR
export const auth = typeof window !== "undefined" ? null : null; // overridden at runtime
export default null;
