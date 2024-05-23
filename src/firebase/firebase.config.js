// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvYLRk4VzgSnT54_DrgiU-4_k1toxVb2A",
    authDomain: "help-desk-app-2e25d.firebaseapp.com",
    projectId: "help-desk-app-2e25d",
    storageBucket: "help-desk-app-2e25d.appspot.com",
    messagingSenderId: "988392568701",
    appId: "1:988392568701:web:5aaceef352e6cd44083e14",
    measurementId: "G-FZWERSVVL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;