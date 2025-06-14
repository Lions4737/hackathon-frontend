// src/utils/firebaseAuth.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { fireAuth } from "./firebase";

export const loginWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(fireAuth, email, password);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(fireAuth, email, password);

export const logout = () => signOut(fireAuth);
