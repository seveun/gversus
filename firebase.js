import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCeEYYII_8MxoaHPePUcpRFkVTFziiJRoI",
  authDomain: "g-versus.firebaseapp.com",
  databaseURL:
    "https://g-versus-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "g-versus",
  storageBucket: "g-versus.appspot.com",
  messagingSenderId: "795012472842",
  appId: "1:795012472842:web:6a222d0d17880bd067bff3",
  measurementId: "G-QTWDP5ZR65",
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth();
export const firestore = getFirestore(app);
export const database = getDatabase(app);
