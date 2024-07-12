// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_KEY}`,
  authDomain: "convy-a06d9.firebaseapp.com",
  projectId: "convy-a06d9",
  storageBucket: "convy-a06d9.appspot.com",
  messagingSenderId: "177776972521",
  appId: "1:177776972521:web:84955025e5cb02dd751678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fb_auth = getAuth(app);

export { fb_auth };
