import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Quote from "./pages/quote";
import PackagesDeals from "./pages/packages-deals";
import PackagesDealsForm from "./pages/packages-deals-form";

const Layout = () => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  return (
    <div
      className={`${
        isDarkModeActive ? "dark:bg-darkMode-dark950" : "bg-main-bg"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <Header setIsDarkModeActive={setIsDarkModeActive} />
      <div className="min-h-[80vh] my-10">
        <Routes>
          <Route
            path="/"
            element={<Quote isDarkModeActive={isDarkModeActive} />}
          />
          <Route
            path="/packages-deals"
            element={<PackagesDeals isDarkModeActive={isDarkModeActive} />}
          />
          <Route
            path="/packages-deals-form"
            element={<PackagesDealsForm isDarkModeActive={isDarkModeActive} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
