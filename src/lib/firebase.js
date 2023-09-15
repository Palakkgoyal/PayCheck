import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage"

import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pay--check.firebaseapp.com",
  projectId: "pay--check",
  storageBucket: "pay--check.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
});

const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);
const googleProvider = new firebase.auth.GoogleAuthProvider();

// export default db;
export { db, auth, storage, googleProvider }