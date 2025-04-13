import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Yahan apna Firebase config daal dena (Firebase Console se copy kar)
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const phoneProvider = new PhoneAuthProvider(auth);
export const db = getFirestore(app);
export { RecaptchaVerifier };
