import React from "react";
import logo from "../../images/HIKOHub.svg";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, usePage, router } from "@inertiajs/react";

export default function Header({ onLogout }) {
  const { auth } = usePage().props;
  const isAuthenticated = !!auth?.user;
  const handleLogout = () => {
    router.post(route("logout"));
  };

  return (
    <nav className="rounded-b-lg sticky top-0 z-50 w-screen h-32 bg-[#690A32] bg-opacity-95 shadow-inner backdrop-blur-lg py-10">
      <div className="h-16 px-4 flex items-center justify-between w-full">

        {/* Left: Logo (keep full size) */}
        <div className="flex items-center justify-start h-full">
          <Link href="/" className="group h-full">
            <img
              src={logo}
              alt="Logo"
              className="h-full w-auto rounded-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </Link>
        </div>

        {/* Center: Navigation links */}
        <div className="flex items-center justify-center gap-10 text-lg font-semibold">
          {isAuthenticated ? (
            <>
              <Link
                href="/booking"
                className="text-purple-200 hover:text-pink-400 transition"
              >
                Bookings
              </Link>
              <Link
                href="/calendar"
                className="text-purple-200 hover:text-pink-400 transition"
              >
                Calendar
              </Link>
              <Link
                href="/events-list"
                className="text-purple-200 hover:text-pink-400 transition"
              >
                Events
              </Link>
            </>
          ) : (
            <>
              <a
                href="https://www.hikohub.co.nz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-200 hover:text-pink-400 transition"
              >
                About
              </a>
              <Link
                href="/contact"
                className="text-purple-200 hover:text-pink-400 transition"
              >
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Right: Auth icon / Logout button */}
        <div className="flex items-center justify-end h-full">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              type="button"
              className="text-purple-200 hover:text-pink-400 font-semibold transition"
            >
              Log Out
            </button>
          ) : (
            <Link href={route("login")} className="group px-10">
              <UserCircleIcon className="w-20 h-20 text-[#F7C5C4] transition-transform duration-300 ease-in-out group-hover:scale-110" />
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}