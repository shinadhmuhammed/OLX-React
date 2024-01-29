import { initializeApp } from "firebase/app"; 
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCjqPi9VbTBBTrFfc2Rw24NxLRLo3FFqvA",
    authDomain: "sample-project-14b93.firebaseapp.com",
    projectId: "sample-project-14b93",
    storageBucket: "sample-project-14b93.appspot.com",
    messagingSenderId: "35935402138",
    appId: "1:35935402138:web:b4fb37740d800745a94723",
    measurementId: "G-WQ8KHSPWR6"
  };

  const Firebase = initializeApp(firebaseConfig); 
 
  export { Firebase }