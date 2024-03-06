// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDsv-eeVFZ3A0JQHUyJHIMUNwLoSjeYQw",
  authDomain: "ubc-smartcity-smartparking.firebaseapp.com",
  databaseURL: "https://ubc-smartcity-smartparking-default-rtdb.firebaseio.com",
  projectId: "ubc-smartcity-smartparking",
  storageBucket: "ubc-smartcity-smartparking.appspot.com",
  messagingSenderId: "107690191982",
  appId: "1:107690191982:web:34486f29f1149e8a770a7f",
  measurementId: "G-R2VWKEC0MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
