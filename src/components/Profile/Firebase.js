import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyAqjbQ1N3QWKCMQ8Ke6nAvQk1lZ-Bm3PEc",
    authDomain: "expenseapp-d0be1.firebaseapp.com",
    projectId: "expenseapp-d0be1",
    storageBucket: "expenseapp-d0be1.appspot.com",
    messagingSenderId: "592769359154",
    appId: "1:592769359154:web:f7955d12a1f12231718b2b",
    measurementId: "G-ESWE3TG88H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser + '.png');
  
    setLoading(true);
    
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    
    setLoading(false);
    alert("Uploaded file!");
  }