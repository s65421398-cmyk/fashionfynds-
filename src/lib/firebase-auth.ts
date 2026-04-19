"use client";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getAuthInstance } from "./firebase";

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");

const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");

function requireAuth() {
  const auth = getAuthInstance();
  if (!auth) throw new Error("Firebase Auth is not configured. Add your Firebase env vars.");
  return auth;
}

export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(requireAuth(), email, password);
  return cred.user;
}

export async function registerWithEmail(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(requireAuth(), email, password);
  await updateProfile(cred.user, { displayName: name });
  return cred.user;
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(requireAuth(), googleProvider);
  return cred.user;
}

export async function loginWithFacebook() {
  const cred = await signInWithPopup(requireAuth(), facebookProvider);
  return cred.user;
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(requireAuth(), email);
}

export async function logout() {
  const auth = getAuthInstance();
  if (!auth) return;
  await signOut(auth);
}

export function onSessionChange(cb: (user: User | null) => void): () => void {
  const auth = getAuthInstance();
  if (!auth) { cb(null); return () => {}; }
  return onAuthStateChanged(auth, cb);
}

export async function getIdToken(): Promise<string | null> {
  const auth = getAuthInstance();
  if (!auth?.currentUser) return null;
  return auth.currentUser.getIdToken();
}
