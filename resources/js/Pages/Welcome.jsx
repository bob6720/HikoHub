import React from "react";
import Layout from "../Layouts/MainLayout";
import { Link } from '@inertiajs/react';

export default function Welcome() {
  return (
    <Layout>
      <main className="flex-grow container mx-auto px-6 md:px-10 py-12 text-center bg-gradient-to-tr from-purple-900 via-pink-900 to-purple-900 rounded-lg shadow-lg border border-pink-600">
        <h2 className="text-5xl font-extrabold mb-6 text-pink-400 drop-shadow-lg neon-text animate-pulse">
          Welcome to Hiko Hub
        </h2>
        <p className="text-lg text-pink-300 mb-8">Be strong and courageous. Do not be afraid; do not be discouraged. — Joshua 1:9</p>
        <Link
          href="/login"
          className="inline-block bg-pink-500 hover:bg-pink-600 btn-pulse text-white font-bold px-8 py-4 rounded-full shadow-lg transition duration-300"
        >
          Get Started
        </Link>
      </main>
    </Layout>
  );
}
