// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ZEt_D0ML7UOSYCr26UvwCAhPj9yr2Ww",
  authDomain: "convy-565c5.firebaseapp.com",
  projectId: "convy-565c5",
  storageBucket: "convy-565c5.appspot.com",
  messagingSenderId: "906417436548",
  appId: "1:906417436548:web:b84062e5655f83f0270fd1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fb_auth = getAuth(app);
const storage = getStorage(app);

export { db, fb_auth, storage };
