import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "react-chat-93f9a.firebaseapp.com",
    projectId: "react-chat-93f9a",
    storageBucket: "react-chat-93f9a.appspot.com",
    messagingSenderId: "86168105982",
    appId: "1:86168105982:web:4cd004c8a508ea479bc6af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getFirestore()

export const storage = getStorage()