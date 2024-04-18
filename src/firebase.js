// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDPlzCGd_esvVlSmjsPdgAeqTKoUCAOqrA",
  authDomain: "healthy-innovations.firebaseapp.com",
  projectId: "healthy-innovations",
  storageBucket: "healthy-innovations.appspot.com",
  messagingSenderId: "1037456057516",
  appId: "1:1037456057516:web:ea212f21ce4c0700c46b09",
  measurementId: "G-SP3BT6DH0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); 
export const provider = new GoogleAuthProvider(); 
