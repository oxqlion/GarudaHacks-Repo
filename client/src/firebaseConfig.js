// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "convy-a06d9.firebaseapp.com",
  projectId: "convy-a06d9",
  storageBucket: "convy-a06d9.appspot.com",
  messagingSenderId: "177776972521",
  appId: "1:177776972521:web:0748e08d36629122751678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fb_auth = getAuth(app);

export { db, fb_auth };
