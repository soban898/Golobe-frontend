import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrolltoTop from "./components/Scroll/ScrolltoTop";
import Layout from "./Layout/Layout";
import Landing from "./pages/Landing";
import Results from "./pages/Results";
import Bookingpage from "./pages/Bookingpage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Payment from "./pages/Payment";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthRedirect from "./components/ProtectedRoute/AuthRedirect";
import UserRoute from "./components/ProtectedRoute/UserRoute";

// ✅ Partner-specific
import PartnerLayout from "./pages/partner/PartnerLayout";
import Dashboard from "./pages/partner/Dashboard";
import Hotels from "./pages/partner/Hotels";
import Bookings from "./pages/partner/Bookings";
import PartnerRoute from "./components/ProtectedRoute/PartnerRoute";

// ✅ Smart Redirect Component
import RedirectHome from "./pages/RedirectHome";
import Success from "./components/Success/Success";

function App() {
  return (
    <Router>
      <ScrolltoTop />
      <Routes>
        {/* ✅ Smart Root Redirect */}
        <Route path="/" element={<RedirectHome />} />

        {/* ✅ Regular User Layout */}
        <Route element={<Layout />}>
          <Route
            path="/landing"
            element={
              <UserRoute>
                <Landing />
              </UserRoute>
            }
          />
          <Route
            path="/results"
            element={
              <UserRoute>
                <Results />
              </UserRoute>
            }
          />
          <Route
            path="/booking"
            element={
              <UserRoute>
                <Bookingpage />
              </UserRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <UserRoute>
                <Payment />
              </UserRoute>
            }
          />
          <Route
            path="/myprofile"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            }
          />
          <Route
            path="/reset"
            element={
              <AuthRedirect>
                <ForgotPassword />
              </AuthRedirect>
            }
          />
        </Route>

        {/* ✅ Partner Layout with PartnerRoute */}
        <Route
          path="/partner"
          element={
            <PartnerRoute>
              <PartnerLayout />
            </PartnerRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


