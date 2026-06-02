// src/lib/firebase/auth.js
// Firebase Authentication service functions

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./config";

/**
 * Login dengan email & password
 */
export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/**
 * Logout user yang sedang aktif
 */
export const logout = () => signOut(auth);

/**
 * Kirim email reset password
 */
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

/**
 * Subscribe ke perubahan auth state
 * @param {Function} callback - dipanggil dengan user object atau null
 */
export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);
