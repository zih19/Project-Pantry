// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpqqJiTVQ9jfFg42FiJWg1mC2HimH0QWs",
  authDomain: "inventory-management-9e70a.firebaseapp.com",
  projectId: "inventory-management-9e70a",
  storageBucket: "inventory-management-9e70a.appspot.com",
  messagingSenderId: "79364152109",
  appId: "1:79364152109:web:3582773e1c94048b88d1a4",
  measurementId: "G-58244ELJE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export {firestore};