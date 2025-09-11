import React from "react";
import logo from "../../images/HIKOHub.png"; // adjust path if needed
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header({ isAuthenticated, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 w-screen h-32 bg-black/30 backdrop-blur-lg border-b border-purple-700/50 py-10">
      <div className="h-16 px-4 flex items-center w-full">
      
      {/* Logo */}
      <div className="flex-1 flex items-center justify-start gap-3">

        <a href="/" className="group" >
          <img
            src={logo}
            alt="Logo"
            className="rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </a>
        
      </div>

      {/* Center column */}
      <div className="flex-1 flex items-center justify-center gap-6">  </div>

      <div className="flex-1 flex items-center justify-end gap-4"> 

        {isAuthenticated ? (
        <div className="font-semibold text-purple-400">
        <a href="/booking" className="hover:text-pink-400 neon-text transition">Bookings</a>
        <a href="/calendar" className="hover:text-pink-400 neon-text transition">Calendar</a>
          <button
            onClick={onLogout}
            className="hover:text-pink-400 neon-text transition text-left"
            type="button"
          >
            Log Out
          </button>
        </div>
        ) : (

        // Guest
        <div className="px-10">
          <a href="/login" className="group"> 
            <UserCircleIcon className= "w-20 h-20 text-purple-400 transition-transform duration-300 ease-in-out group-hover:scale-110"/>
          </a>
        </div>
      )}

      </div>

      </div>

    </nav>

  );
}
