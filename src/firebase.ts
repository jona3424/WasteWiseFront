import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGUFLCdu2wEyY88rpoSa3TzFIq6neM-0g",
  authDomain: "kolotechina-cd96e.firebaseapp.com",
  projectId: "kolotechina-cd96e",
  storageBucket: "kolotechina-cd96e.appspot.com",
  messagingSenderId: "429417534019",
  appId: "1:429417534019:web:fb3150418fa20f99ad7af6"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);