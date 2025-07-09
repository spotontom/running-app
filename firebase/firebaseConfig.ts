// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV_m0hhWDqz0dJbsnrd5ohHEnCQUXC-34",
  authDomain: "capstone-running-app.firebaseapp.com",
  projectId: "capstone-running-app",
  storageBucket: "capstone-running-app.firebasestorage.app",
  messagingSenderId: "872904712413",
  appId: "1:872904712413:web:bc2de0176c5d19907b3b34",
  measurementId: "G-S0S3Q9V2Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});