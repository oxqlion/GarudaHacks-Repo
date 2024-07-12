// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz79QK8ho_YYncCJYsH9rX1PHIYAIdUW8",
  authDomain: "garuda-hacks-e088c.firebaseapp.com",
  projectId: "garuda-hacks-e088c",
  storageBucket: "garuda-hacks-e088c.appspot.com",
  messagingSenderId: "554948209594",
  appId: "1:554948209594:web:8efb85145688aa5cc2cb83",
  measurementId: "G-XZ27VTYPFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fb_auth = getAuth(app);
const storage = getStorage(app)

export { db, fb_auth, storage };
