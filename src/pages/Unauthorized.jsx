// src/pages/Unauthorized.jsx
import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

function Unauthorized() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <nav
                className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                aria-label="Breadcrumb"
              >
                <a
                  href="/"
                  className="hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Home
                </a>
                <svg
                  className="h-4 w-4 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Unauthorized
                </span>
              </nav>
            </div>

            {/* Unauthorized message */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
              <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
                403 - Akses Ditolak
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Anda tidak memiliki izin untuk mengakses halaman ini. Silakan
                hubungi administrator jika Anda merasa ini adalah sebuah kesalahan.
              </p>
              <a
                href="/"
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded transition"
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Unauthorized;
