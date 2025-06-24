import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";
import AllDocuments from "../partials/dashboard/AllDocuments";
import InboxTotal from "../partials/dashboard/InboxTotal";
import OutboxTotal from "../partials/dashboard/OutboxTotal";
import QuickActions from "../partials/dashboard/QuickActions";
import MailYearly from "../partials/dashboard/MailYearly";
import MailCategory from "../partials/dashboard/MailCategory";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <div className="mb-4 sm:mb-0">
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
                    Dashboard
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
              <AllDocuments />
              <InboxTotal />
              <OutboxTotal />
              <MailYearly />
              <MailCategory />
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
