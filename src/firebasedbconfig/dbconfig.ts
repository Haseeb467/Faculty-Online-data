import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const txtDB = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { txtDB, storage, db, auth, app, getFirestore };
