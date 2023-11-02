// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtP4mTd1u_HUXQVWsSV1BdnVjLGhWXHpQ",
  authDomain: "project-palning.firebaseapp.com",
  projectId: "project-palning",
  storageBucket: "project-palning.appspot.com",
  messagingSenderId: "58209331296",
  appId: "1:58209331296:web:417c30f73d4bc6f7fb7b05",
  measurementId: "G-YZMTPQH0H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
