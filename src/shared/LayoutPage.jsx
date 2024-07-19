import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutPage({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-16 flex-1">{children}</div>
      <Footer />
    </div>
  );
}
