import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";

import RegisterUserCard from "../partials/member/RegisterUserCard";
import UserListCard from "../partials/member/UserListCard";

function Member() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sub } = useParams();

  const renderCard = () => {
    switch (sub) {
      case "list":
        return <UserListCard />;
      case "add":
        return <RegisterUserCard />;
      default:
        return <Navigate to="/users/list" replace />;
    }
  };

  const renderBreadcrumbText = () => {
    switch (sub) {
      case "list":
        return "Data Anggota";
      case "add":
        return "Tambah Anggota";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Breadcrumbs as Title */}
              <div className="ms-1 mb-4 sm:mb-0">
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
                  <a
                    href="/"
                    className="hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Anggota
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
                    {renderBreadcrumbText()}
                  </span>
                </nav>
              </div>
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Datepicker built with React Day Picker */}
                <Datepicker align="right" />
                {/* Add view button */}
              </div>
            </div>
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
                {renderCard()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Member;
