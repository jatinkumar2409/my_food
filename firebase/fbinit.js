import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDFIyiDZJuOVxRF1z4Usz1beAQjhqbny74",
  authDomain: "myfood-fcde0.firebaseapp.com",
  projectId: "myfood-fcde0",
  storageBucket: "myfood-fcde0.firebasestorage.app",
  messagingSenderId: "292323756301",
  appId: "1:292323756301:web:73ac06d18bf7552d434844"
};
 export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);