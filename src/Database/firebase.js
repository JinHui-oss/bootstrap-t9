// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDldEg-qMV4JsxObrUtwG1XtEp3CCxL4_M",
  authDomain: "yecc-library-3.firebaseapp.com",
  projectId: "yecc-library-3",
  storageBucket: "yecc-library-3.appspot.com",
  messagingSenderId: "447975206398",
  appId: "1:447975206398:web:9d45cf1603bcb9a9cde4af",
  measurementId: "G-H2XM9JQLKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app 
