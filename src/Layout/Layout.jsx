import React from 'react'
import { useLocation } from "react-router-dom";
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  const location = useLocation();
  
  // Check if the current route is login or signup
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup"  || location.pathname === "/reset";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}

export default Layout
