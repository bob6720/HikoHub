import React from "react";
import Header from "../Components/header";
import Footer from "../Components/footer";
import "../../css/app.css";
import { Head } from "@inertiajs/react";

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/fav.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>

      <div className="bg-gradient-to-br from-black via-purple-900 to-black text-white font-hanken-grotesk min-h-screen flex">
        {/* Sidebar header on the left */}
        <aside className="w-64 flex-shrink-0">
          <Header />
        </aside>

        {/* Main content area */}
        <div className="flex flex-col flex-grow">
          <main className="flex-grow px-6 md:px-10 mt-12 w-full max-w-[986px] mx-auto text-center">
            {children}
          </main>

          {/* Footer spans content width (not full width) */}
          <Footer />
        </div>
      </div>
    </>
  );
}
