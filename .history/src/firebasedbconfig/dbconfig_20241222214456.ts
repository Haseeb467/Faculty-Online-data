import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7sC13osQQuH8FW6NbAOxiqcHPACF2Vng",
  authDomain: "fms-4-ts.firebaseapp.com",
  databaseURL: "https://fms-4-ts-default-rtdb.firebaseio.com",
  projectId: "fms-4-ts",
  storageBucket: "fms-4-ts.firebasestorage.app",
  messagingSenderId: "776841904816",
  appId: "1:776841904816:web:9f7a8edcb1471ac64eb175",
  measurementId: "G-92RN4N49NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const txtDB = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { txtDB, storage, db, auth, app, getFirestore };