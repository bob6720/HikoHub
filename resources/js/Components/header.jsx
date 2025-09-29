import React from "react";
import logo from "../../images/HIKOHub.svg";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from '@inertiajs/react';

export default function Header({ isAuthenticated, onLogout }) {
  return (
    <nav className="rounded-b-lg sticky top-0 z-50 w-screen h-32 bg-[#690A32] bg-opacity-95 shadow-inner backdrop-blur-lg py-10">
      <div className="h-16 px-4 flex items-center w-full">
      
        {/* Logo */}
        <div className="flex-1 flex items-center justify-start gap-3">
          <Link href="/" className="group">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>

        {/* Center column */}
        <div className="flex-1 flex items-center justify-center gap-6"></div>

        {/* Right column */}
        <div className="flex-1 flex items-center justify-end gap-4"> 
          {isAuthenticated ? (
            <div className="font-semibold text-purple-400">
              <Link href="/booking" className="hover:text-pink-400 neon-text transition">Bookings</Link>
              <Link href="/calendar" className="hover:text-pink-400 neon-text transition">Calendar</Link>
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
              <Link href={route('login')} className="group">
                <UserCircleIcon className="w-20 h-20 text-[#F7C5C4] transition-transform duration-300 ease-in-out group-hover:scale-110"/>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
