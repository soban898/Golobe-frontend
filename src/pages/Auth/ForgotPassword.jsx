// import { useState } from "react"; 
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
// import { app } from "./Firebase";
// import "../../styles/login.css";
// import logo from "../../assets/img/Logo.png";
// import LoginImage from "../../assets/img/LoginImage.png";
// import Fb from "../../assets/img/Fb.svg";
// import google from "../../assets/img/google.svg";
// import apple from "../../assets/img/apple.svg";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const [messageSent, setMessageSent] = useState(false);
//     const navigate = useNavigate(); 

//     const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     const resetPasswordHandler = async (event) => {
//         event.preventDefault();
//         setError("");

//         if (!validateEmail(email)) {
//             setError("Please enter a valid email address.");
//             return;
//         }

//         const auth = getAuth(app);

//         try {
//             await sendPasswordResetEmail(auth, email);
//             setMessageSent(true);
//         } catch (error) {
//             if (error.code === "auth/user-not-found") {
//                 setError("No account found with this email.");
//             } else if (error.code === "auth/invalid-email") {
//                 setError("Invalid email format.");
//             } else {
//                 setError("Something went wrong. Try again later.");
//             }
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-header">
//                 <img src={logo} alt="Golobe Logo" className="login-logo" />
//             </div>

//             <div className="login-form">
//                 {messageSent ? (
//                     <div className="confirmation-box">
//                         <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="Success" className="success-icon" />
//                         <h2 className="confirmation-heading">Check Your Inbox 📩</h2>
//                         <p className="confirmation-text">
//                             If an account is registered with <strong>{email}</strong>, we’ve sent a password reset link.  
//                         </p>
//                         <p className="confirmation-text">
//                             Please check your email (including spam folder) and follow the instructions to reset your password.
//                         </p>
//                         <button className="login-btn" onClick={() => navigate("/login")}>Back to Login</button>
//                     </div>
//                 ) : (
//                     <>
//                         <h2 className="login-heading">Forgot your password?</h2>
//                         <p className="login-subtext">Don’t worry, happens to all of us. Enter your email below to recover your password.</p>

//                         <form className="login-form-content" onSubmit={resetPasswordHandler}>
//                             <label className="login-label">Email</label>
//                             <input
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 type="email"
//                                 placeholder="john.doe@gmail.com"
//                                 className="login-input"
//                             />

//                             {error && <p className="error-message">{error}</p>}

//                             <button type="submit" className="login-btn">Submit</button>

//                             <p className="or-login">Or login with</p>

//                             <div className="social-login">
//                                 <div className="social-btn">
//                                     <img src={Fb} alt="Facebook" />
//                                 </div>
//                                 <div className="social-btn">
//                                     <img src={google} alt="Google" />
//                                 </div>
//                                 <div className="social-btn">
//                                     <img src={apple} alt="Apple" />
//                                 </div>
//                             </div>
//                         </form>
//                     </>
//                 )}
//             </div>

//             <div className="login-image">
//                 <img src={LoginImage} alt="Resort" className="background-image" />
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;










import { useState } from "react";
import "../../styles/login.css";
import logo from "../../assets/img/Logo.png";
import LoginImage from "../../assets/img/LoginImage.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Fb from "../../assets/img/Fb.svg";
import google from "../../assets/img/google.svg";
import apple from "../../assets/img/apple.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // email → otp → reset
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/users/forgot-password", { email });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/users/verify-reset-otp", { email, otp });
      setStep("reset");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      await axios.post("/api/users/reset-password", {
        email,
        otp,
        newPassword,
      });
      setSuccessMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Golobe Logo" className="login-logo" />
      </div>

      <div className="login-form">
        {successMsg ? (
          <div className="confirmation-box">
            <img src="https://cdn-icons-png.flaticon.com/512/5610/5610944.png" alt="Success" className="success-icon" />
            <h2 className="confirmation-heading">Success ✅</h2>
            <p className="confirmation-text">{successMsg}</p>
          </div>
        ) : (
          <>
            {step === "email" && (
              <>
                <h2 className="login-heading">Forgot your password?</h2>
                <p className="login-subtext">Enter your registered email to receive an OTP.</p>
                <form className="login-form-content" onSubmit={handleSendOtp}>
                  <label className="login-label">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="john.doe@gmail.com"
                    className="login-input"
                  />
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="login-btn">Send OTP</button>
                </form>
              </>
            )}

            {step === "otp" && (
              <>
                <h2 className="login-heading">Enter OTP</h2>
                <p className="login-subtext">Check your email for the OTP sent to <strong>{email}</strong>.</p>
                <form className="login-form-content" onSubmit={handleVerifyOtp}>
                  <label className="login-label">OTP</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    required
                    placeholder="Enter OTP"
                    className="login-input"
                  />
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="login-btn">Verify OTP</button>
                </form>
              </>
            )}

            {step === "reset" && (
              <>
                <h2 className="login-heading">Reset Password</h2>
                <form className="login-form-content" onSubmit={handleResetPassword}>
                  <label className="login-label">New Password</label>
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    required
                    placeholder="New Password"
                    className="login-input"
                  />
                   <span onClick={() => setShowPassword1(!showPassword)}>
                                  {showPassword1 ? <FaEyeSlash className="eye-icon1" /> : <FaEye className="eye-icon1" />}
                                </span>
                  <label className="login-label">Confirm Password</label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    required
                    placeholder="Confirm Password"
                    className="login-input"
                  />
                   <span onClick={() => setShowPassword2(!showPassword)}>
                                  {showPassword2 ? <FaEyeSlash className="eye-icon2" /> : <FaEye className="eye-icon2" />}
                                </span>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="login-btn">Reset Password</button>
                </form>
              </>
            )}
          </>
        )}

        {step === "email" && (
          <>
            <p className="or-login">Or login with</p>
            <div className="social-login">
              <div className="social-btn"><img src={Fb} alt="Facebook" /></div>
              <div className="social-btn"><img src={google} alt="Google" /></div>
              <div className="social-btn"><img src={apple} alt="Apple" /></div>
            </div>
          </>
        )}
      </div>

      <div className="login-image">
        <img src={LoginImage} alt="Resort" className="background-image" />
      </div>
    </div>
  );
};

export default ForgotPassword;
