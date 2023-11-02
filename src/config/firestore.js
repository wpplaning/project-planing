// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyxgFzQrnhdKmQvtL4Tc6-Ls8L7wiTiqg",
  authDomain: "ministry-test-ecfc8.firebaseapp.com",
  projectId: "ministry-test-ecfc8",
  storageBucket: "ministry-test-ecfc8.appspot.com",
  messagingSenderId: "124707917389",
  appId: "1:124707917389:web:795e5f444c4e3ebf825604",
  measurementId: "G-RDLFV26QDN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
