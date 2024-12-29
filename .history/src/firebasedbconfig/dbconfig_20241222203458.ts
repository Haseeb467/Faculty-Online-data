// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



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
const  = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { txtDB, imgDB, db, auth, app, getFirestore };