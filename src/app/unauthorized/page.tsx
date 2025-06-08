"use client";

import "../../styles/globals.css";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-red-400 to-red-700 font-sans px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-8">
          Sorry, you don&apos;t have permission to view this page.
        </p>
        <a
          href="/auth"
          className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
