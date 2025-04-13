import { useState, useEffect } from "react";
import { signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import { auth, googleProvider, facebookProvider, RecaptchaVerifier } from "../firebase";
import { motion } from "framer-motion";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.error("Phone login error:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      setOtp("");
    } catch (error) {
      console.error("OTP verification error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <h1 className="text-4xl font-bold text-white mb-8">StudySync</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-white text-black p-3 rounded-lg mb-4 w-64"
      >
        Login with Google
      </button>
      <button
        onClick={handleFacebookLogin}
        className="bg-blue-600 text-white p-3 rounded-lg mb-4 w-64"
      >
        Login with Facebook
      </button>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91 Phone Number"
        className="p-3 rounded-lg mb-4 w-64 text-black"
      />
      <button
        onClick={handlePhoneLogin}
        className="bg-green-500 text-white p-3 rounded-lg mb-4 w-64"
      >
        Send OTP
      </button>
      {confirmationResult && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="p-3 rounded-lg mb-4 w-64 text-black"
          />
          <button
            onClick={verifyOtp}
            className="bg-purple-500 text-white p-3 rounded-lg w-64"
          >
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </motion.div>
  );
}

export default Login;
