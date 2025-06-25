import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();

  // Routes where layout (Navbar & Footer) should be hidden
  const hiddenRoutes = ["/login", "/signup", "/reset"];
  const shouldHideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!shouldHideLayout && <Footer />}
    </>
  );
};

export default Layout;
