// import { useState, React } from "react"; 
// import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { app } from "./Firebase";
// import "../../styles/login.css";
// import logo from "../../assets/img/Logo.png";
// import LoginImage from "../../assets/img/LoginImage.png";
// import Fb from "../../assets/img/Fb.svg";
// import google from "../../assets/img/google.svg";
// import apple from "../../assets/img/apple.svg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [passwordError, setPasswordError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const submitHandler = (event) => {
//     event.preventDefault();
//     setEmailError(false);
//     setPasswordError(false);
//     setErrorMessage("");

//     if (!email.trim()) {
//       setEmailError(true);
//       setErrorMessage("Email is required.");
//       return;
//     }

//     if (!password.trim()) {
//       setPasswordError(true);
//       setErrorMessage("Password is required.");
//       return;
//     }

//     const auth = getAuth(app);
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userData) => {
//         console.log(userData.user);
//         navigate("/");
//       })
//       .catch((err) => {
//         if (err.code === "auth/invalid-email") {
//           setEmailError(true);
//           setErrorMessage("Invalid email format.");
//         } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
//           setPasswordError(true);
//           setErrorMessage("Incorrect email or password.");
//         } else {
//           setErrorMessage("Login failed. Please try again.");
//         }
//         console.log(err);
//       });
//   };

//   const loginWithGoogle = ()=>{
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider()
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log(result);
//         navigate('/')
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   return (
//     <div className="login-container">

//       <div className="login-form">
//         <img src={logo} alt="Golobe" className="logo-login" />
//         <h2>Login</h2>
//         <p>Login to access your Golobe account</p>

//         <form className="login-form" onSubmit={submitHandler}>
//           <div className="input-groups">
//             <label>Email</label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="john.doe@gmail.com"
//               required
//               className={`input ${emailError ? "error" : ""}`}
//             />
//           </div>

//           <div className="input-groups password-groups">
//             <label>Password</label>
//             <input
//               className={`p-input ${passwordError ? "error" : ""}`}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <FaEyeSlash className="eye" /> : <FaEye className="eye" />}
//             </span>
//           </div>

//           <div className="options">
//             <label><input type="checkbox" /> Remember me</label>
//             <a href="#">Forgot Password</a>
//           </div>
//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           <button type="submit" className="login-btn">Login</button>

//           <p className="signup-text">Don’t have an account? <a href="/signup">Sign up</a></p>
//           <div className="divider">Or login with</div>

//           <div className="social-buttons">
//             <button type="button" className="social-btn"><img src={Fb} alt="Facebook" /></button>
//             <button onClick = {loginWithGoogle} type="button" className="social-btn"><img src={google} alt="Google" /></button>
//             <button type="button" className="social-btn"><img src={apple} alt="Apple" /></button>
//           </div>
//         </form>
//       </div>

   
//       <div className="image-section"><img src={LoginImage} alt="Hotel" className="side-image" /></div>
//     </div>
//   );
// };

// export default Login;










// import React, { useState } from "react";
// import axios from "axios";
// import "../../styles/login.css";
// import logo from "../../assets/img/Logo.png";
// import LoginImage from "../../assets/img/LoginImage.png";
// import Fb from "../../assets/img/Fb.svg";
// import google from "../../assets/img/google.svg";
// import apple from "../../assets/img/apple.svg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setErrorMessage("");

//     if (!email.trim()) {
//       setErrorMessage("Email is required.");
//       return;
//     }

//     if (!password.trim()) {
//       setErrorMessage("Password is required.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email,
//         password,
//       });

//       const data = res.data;

//       // Save JWT Token to localStorage
//       localStorage.setItem("token", data.token);

//       console.log("Login successful:", data);
//       navigate("/");
//     } catch (error) {
//       const message = error.response?.data?.message || "Login failed. Please try again.";
//       setErrorMessage(message);
//       console.error("Login Error:", message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <img src={logo} alt="Golobe Logo" className="login-logo" />
//       </div>

//       <div className="login-form">
//         <h2 className="login-heading">Login</h2>
//         <p className="login-subtext">Login to access your Golobe account</p>

//         <form className="login-form-content" onSubmit={submitHandler}>
//           <label className="login-label">Email</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="john.doe@gmail.com"
//             required
//             className="login-input"
//           />

//           <label className="login-label">Password</label>
//           <div className="password-container">
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//               className="login-input"
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
//             </span>
//           </div>

//           <div className="login-options">
//             <label className="remember-me">
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="/reset" className="forgot-password">Forgot Password</a>
//           </div>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}

//           <button type="submit" className="login-btn">Login</button>

//           <p className="signup-text">
//             Don’t have an account? <a href="/signup" className="signup-link">Sign up</a>
//           </p>

//           <p className="or-login">Or login with</p>

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

// export default Login;



// import React, { useState } from "react";
// import axios from "axios";
// import "../../styles/login.css";
// import logo from "../../assets/img/Logo.png";
// import LoginImage from "../../assets/img/LoginImage.png";
// import Fb from "../../assets/img/Fb.svg";
// import google from "../../assets/img/google.svg";
// import apple from "../../assets/img/apple.svg";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [role, setRole] = useState("user"); // ✅ Role state

//   const navigate = useNavigate();

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setErrorMessage("");

//     if (!email.trim()) return setErrorMessage("Email is required.");
//     if (!password.trim()) return setErrorMessage("Password is required.");

//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         email,
//         password,
//         role,
//       });

//       const { token, role: userRole } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", userRole);

      
//       if (userRole === "partner") {
//         navigate("/partner/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || "Login failed. Please try again.";
//       setErrorMessage(msg);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-header">
//         <img src={logo} alt="Golobe Logo" className="login-logo" />
//       </div>

//       <div className="login-form">
//         <h2 className="login-heading">Login</h2>
//         <p className="login-subtext">Login to access your Golobe account</p>

  
//         <div className="role-toggle">
//           <button
//             type="button"
//             className={role === "user" ? "active" : ""}
//             onClick={() => setRole("user")}
//           >
//             Login as User
//           </button>
//           <button
//             type="button"
//             className={role === "partner" ? "active" : ""}
//             onClick={() => setRole("partner")}
//           >
//             Login as Partner
//           </button>
//         </div>

//         <form className="login-form-content" onSubmit={submitHandler}>
//           <label className="login-label">Email</label>
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             placeholder="john.doe@gmail.com"
//             required
//             className="login-input"
//           />

//           <label className="login-label">Password</label>
//           <div className="password-container">
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               required
//               className="login-input"
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
//             </span>
//           </div>

//           <div className="login-options">
//             <label className="remember-me">
//               <input type="checkbox" /> Remember me
//             </label>
//             <a href="/reset" className="forgot-password">Forgot Password</a>
//           </div>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}

//           <button type="submit" className="login-btn">Login</button>

//           <p className="signup-text">
//             Don’t have an account? <a href="/signup" className="signup-link">Sign up</a>
//           </p>

//           <p className="or-login">Or login with</p>

//           <div className="social-login">
//             <div className="social-btn"><img src={Fb} alt="Facebook" /></div>
//             <div className="social-btn"><img src={google} alt="Google" /></div>
//             <div className="social-btn"><img src={apple} alt="Apple" /></div>
//           </div>
//         </form>
//       </div>

//       <div className="login-image">
//         <img src={LoginImage} alt="Resort" className="background-image" />
//       </div>
//     </div>
//   );
// };

// export default Login;   




import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import logo from "../../assets/img/Logo.png";
import LoginImage from "../../assets/img/LoginImage.png";
import Fb from "../../assets/img/Fb.svg";
import google from "../../assets/img/google.svg";
import apple from "../../assets/img/apple.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("user"); // ✅ Role state

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim()) return setErrorMessage("Email is required.");
    if (!password.trim()) return setErrorMessage("Password is required.");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
        role,
      });

      // ✅ Destructure and store in localStorage
      const { token, role: userRole, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Added line

      // ✅ Redirect based on role
      if (userRole === "partner") {
        navigate("/partner/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Golobe Logo" className="login-logo" />
      </div>

      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <p className="login-subtext">Login to access your Golobe account</p>

        {/* Role toggle */}
        <div className="role-toggle">
          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            Login as User
          </button>
          <button
            type="button"
            className={role === "partner" ? "active" : ""}
            onClick={() => setRole("partner")}
          >
            Login as Partner
          </button>
        </div>

        <form className="login-form-content" onSubmit={submitHandler}>
          <label className="login-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="john.doe@gmail.com"
            required
            className="login-input"
          />

          <label className="login-label">Password</label>
          <div className="password-container">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="login-input"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash className="eye-icon" /> : <FaEye className="eye-icon" />}
            </span>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/reset" className="forgot-password">Forgot Password</a>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="login-btn">Login</button>

          <p className="signup-text">
            Don’t have an account? <a href="/signup" className="signup-link">Sign up</a>
          </p>

          <p className="or-login">Or login with</p>

          <div className="social-login">
            <div className="social-btn"><img src={Fb} alt="Facebook" /></div>
            <div className="social-btn"><img src={google} alt="Google" /></div>
            <div className="social-btn"><img src={apple} alt="Apple" /></div>
          </div>
        </form>
      </div>

      <div className="login-image">
        <img src={LoginImage} alt="Resort" className="background-image" />
      </div>
    </div>
  );
};

export default Login;
