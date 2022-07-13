// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkuu6Fxx-GomzAb5T35Pe7YcKKmUayDi4",
  authDomain: "ddc-dementia-toolkit.firebaseapp.com",
  projectId: "ddc-dementia-toolkit",
  storageBucket: "ddc-dementia-toolkit.appspot.com",
  messagingSenderId: "766430082871",
  appId: "1:766430082871:web:f320d2541145688c944cb2",
  measurementId: "G-WHSWXBEDSK"
};



// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app; 
