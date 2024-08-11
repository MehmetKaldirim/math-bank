// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "math-estate.firebaseapp.com",
  projectId: "math-estate",
  storageBucket: "math-estate.appspot.com",
  messagingSenderId: "599663731040",
  appId: "1:599663731040:web:d72df4726b930f953d3e05",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
