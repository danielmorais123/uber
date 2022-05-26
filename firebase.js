// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaLV8xakQxhAhAV2_CfGeGQcaxfZjnT6g",
  authDomain: "uber-f1e4a.firebaseapp.com",
  projectId: "uber-f1e4a",
  storageBucket: "uber-f1e4a.appspot.com",
  messagingSenderId: "706762363454",
  appId: "1:706762363454:web:85ec60aa146f9e15b2f76f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default app;

export { auth };
