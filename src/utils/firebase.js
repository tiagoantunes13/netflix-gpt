// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9nQ-_oUr1f8-MStOy1WHd2IKbhC9FheY",
  authDomain: "netflixgpt-7e5b7.firebaseapp.com",
  projectId: "netflixgpt-7e5b7",
  storageBucket: "netflixgpt-7e5b7.firebasestorage.app",
  messagingSenderId: "200932540170",
  appId: "1:200932540170:web:1f532ebf4bee8108b284f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;
