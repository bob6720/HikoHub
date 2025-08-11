import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 shadow-inner p-6 mt-16 text-center text-white text-sm font-semibold tracking-wide select-none">
      &copy; {year} Waikato COMPX374 Group C. All rights reserved.
    </footer>
  );
}
