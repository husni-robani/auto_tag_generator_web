import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main className="mb-auto bg-white xl:px-56 md:px-20 px-10 py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
