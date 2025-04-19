// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../../assets/img/Logo.png";
// import LoginImage from "../../assets/img/LoginImage.png";
// import Fb from "../../assets/img/Fb.svg";
// import google from "../../assets/img/google.svg";
// import apple from "../../assets/img/apple.svg";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [firstName, setFirstName] = useState(""); 
//   const [lastName, setLastName] = useState("");   
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/register", {
//         firstName,
//         lastName,
//         email,
//         password,
//       });

//       const data = res.data;

   
//       localStorage.setItem("token", data.token);

//       console.log("Signup Successful:", data);
//       navigate("/");
//     } catch (error) {
//       console.error("Signup Error:", error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <img src={logo} alt="Golobe Logo" className="login-logo" />
//       </div>

//       <div className="login-form">
//         <h2 className="login-heading">SignUp</h2>
//         <p className="login-subtext">SignUp to Register your Golobe account</p>

//         <form className="login-form-content" onSubmit={submitHandler}>
//           <label className="login-label">First Name</label>
//           <input 
//               type="text" 
//               placeholder="John" 
//               value={firstName} 
//               onChange={(e) => setFirstName(e.target.value)} 
//               required 
//               className="login-input" 
//           />

//           <label className="login-label">Last Name</label>
//           <input 
//               type="text" 
//               placeholder="Doe" 
//               value={lastName} 
//               onChange={(e) => setLastName(e.target.value)} 
//               required 
//               className="login-input" 
//           />

//           <label className="login-label">Email</label>
//           <input  
//                type="email"
//                placeholder="john.doe@gmail.com"
//                value={email}
//                onChange={(e) => setEmail(e.target.value)}
//                required
//                className="login-input" 
//           />

//           <label className="login-label">Password</label>
//           <div className="password-container">
//             <input className="login-input" 
//                type={showPassword ? "text" : "password"}
//                placeholder="Password"
//                value={password}
//                onChange={(e) => setPassword(e.target.value)}
//                required
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//                {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
//             </span>
//           </div>

//           <div className="login-options">
//             <label className="remember-me">
//               <input type="checkbox" /> I agree to all the Terms and Privacy Policies
//             </label>
//           </div>
//           <button type="submit" className="login-btn">Register</button>

//           <p className="signup-text">
//             Already have an account? <a href="/login" className="signup-link">Login</a>
//           </p>

//           <p className="or-login">Or SignUp with</p>

//           <div className="social-login">
//             <div className="social-btn">
//               <img src={Fb} alt="Facebook" />
//             </div>
//             <div className="social-btn">
//               <img src={google} alt="Google" />
//             </div>
//             <div className="social-btn">
//               <img src={apple} alt="Apple" />
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="login-image">
//         <img src={LoginImage} alt="Resort" className="background-image" />
//       </div>
//     </div>
//   );
// };

// export default Signup;





import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/img/Logo.png";
import LoginImage from "../../assets/img/LoginImage.png";
import Fb from "../../assets/img/Fb.svg";
import google from "../../assets/img/google.svg";
import apple from "../../assets/img/apple.svg";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP with user data (but don’t register yet)
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/send-otp", {
        firstName,
        lastName,
        email,
        password,
      });

      setShowOtpScreen(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Step 2: Verify OTP and register user
  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/verify-otp", {
        email,
        otp,
      });

      alert("OTP Verified & Account Created!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Golobe Logo" className="login-logo" />
      </div>

      {!showOtpScreen ? (
        <div className="login-form">
          <h2 className="login-heading">SignUp</h2>
          <p className="login-subtext">SignUp to Register your Golobe account</p>
          <form className="login-form-content" onSubmit={sendOtpHandler}>
            <label className="login-label">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="login-input" />
            <label className="login-label">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="login-input" />
            <label className="login-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="login-input" />
            <label className="login-label">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
              </span>
            </div>
            <label className="remember-me">
              <input type="checkbox" required /> I agree to all the Terms and Privacy Policies
            </label>
            <button type="submit" className="login-btn">Next</button>
            <p className="signup-text">
             Already have an account? <a href="/login" className="signup-link">Login</a>
         </p>
         <p className="or-login">Or SignUp with</p>

           <div className="social-login">
             <div className="social-btn">
               <img src={Fb} alt="Facebook" />
             </div>
            <div className="social-btn">
               <img src={google} alt="Google" />
             </div>
             <div className="social-btn">
               <img src={apple} alt="Apple" />
             </div>
           </div>
          </form>

        </div>
      ) : (
        <div className="login-form">
          <h2 className="login-heading">Enter OTP</h2>
          <p className="login-subtext">We’ve sent an OTP to <strong>{email}</strong></p>
          <form onSubmit={verifyOtpHandler} className="login-form-content">
            <label className="login-label">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              className="login-input"
              required
            />
            <button type="submit" className="login-btn">Verify & Register</button>
          </form>
        </div>
      )}

      <div className="login-image">
        <img src={LoginImage} alt="Resort" className="background-image" />
      </div>
    </div>
  );
};

export default Signup;
