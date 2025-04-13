import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr7d-eliT9ntsWnSw-CXsRJ1B8PyH9l9w",
  authDomain: "studysync-f3aa3.firebaseapp.com",
  projectId: "studysync-f3aa3",
  storageBucket: "studysync-f3aa3.firebasestorage.app",
  messagingSenderId: "634403512040",
  appId: "1:634403512040:web:fafad981469b07389db35d",
  measurementId: "G-6QXPEP15XX"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const phoneProvider = new PhoneAuthProvider(auth);
export const db = getFirestore(app);
export { RecaptchaVerifier };
