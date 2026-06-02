// src/lib/firebase/content.js
// Firestore CRUD operations untuk koleksi "articles"
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const COL = "articles";
const ref = () => collection(db, COL);

/**
 * Ambil semua artikel, diurutkan dari terbaru.
 * @returns {Promise<Array>}
 */
export async function getArticles({ status, limitCount } = {}) {
  let q = query(ref(), orderBy("createdAt", "desc"));
  if (status) q = query(ref(), where("status", "==", status), orderBy("createdAt", "desc"));
  if (limitCount) q = query(q, limit(limitCount));

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Ambil satu artikel berdasarkan ID.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getArticle(id) {
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/**
 * Buat artikel baru.
 * @param {Object} data - { title, category, content, status, author }
 * @returns {Promise<string>} ID artikel baru
 */
export async function createArticle(data) {
  const docRef = await addDoc(ref(), {
    ...data,
    views: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Update artikel yang sudah ada.
 * @param {string} id
 * @param {Object} data
 */
export async function updateArticle(id, data) {
  await updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Hapus artikel.
 * @param {string} id
 */
export async function deleteArticle(id) {
  await deleteDoc(doc(db, COL, id));
}

/**
 * Toggle status: published ↔ draft
 * @param {string} id
 * @param {string} currentStatus
 */
export async function toggleArticleStatus(id, currentStatus) {
  const next = currentStatus === "published" ? "draft" : "published";
  await updateDoc(doc(db, COL, id), { status: next, updatedAt: serverTimestamp() });
  return next;
}
