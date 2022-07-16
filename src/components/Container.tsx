import React from "react";
import Navbar from "./Navbar";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-900 min-h-screen min-w-screen text-white">
      <Navbar />
      <main className="px-12">{children}</main>
    </div>
  );
};

export default Container;
