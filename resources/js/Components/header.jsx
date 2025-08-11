import React from "react";
import logo from "../../images/HIKOHub.png"; // adjust path if needed

export default function Header({ isAuthenticated, onLogout }) {
  return (
    <nav className="sticky top-0 left-0 h-screen w-64 z-50 bg-black/90 backdrop-blur-lg border-r border-purple-700/50 flex flex-col p-6 space-y-6">
      
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <a href="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Logo"
            className="rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-4 font-semibold text-lg text-purple-300">
        <a href="/" className="hover:text-pink-400 neon-text transition">Home</a>
        <a href="/events" className="hover:text-pink-400 neon-text transition">Events</a>
        <a href="/booking" className="hover:text-pink-400 neon-text transition">Make a Booking</a>
        <a href="/calendar" className="hover:text-pink-400 neon-text transition">Calendar</a>
        <a href="/contactus" className="hover:text-pink-400 neon-text transition">Contact Us</a>
      </div>

      {/* Authenticated User */}
      {isAuthenticated ? (
        <div className="flex flex-col space-y-4 font-semibold text-purple-400">
          <a href="/spaces/create" className="hover:text-pink-400 neon-text transition">
            Post a new space
          </a>
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
        <div className="flex flex-col space-y-4 font-semibold text-purple-400">
          <a href="/login" className="hover:text-pink-400 neon-text transition">Log In</a>
        </div>
      )}
    </nav>
  );
}
