import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

import {
  HomeIcon,
  BookOpenIcon,
  EnvelopeIcon,
  UserIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  TagIcon,
  PencilIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:flex! flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:w-64! shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } ${
          variant === "v2"
            ? "border-r border-gray-200 dark:border-gray-700/60"
            : "rounded-r-2xl shadow-xs"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink
            end
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-100"
          >
            <div className="bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 p-2 rounded-full">
              <EnvelopeIcon className="w-6 h-6" />
            </div>
            <span className="ms-2 font-bold lg:sidebar-expanded:inline 2xl:inline transition-opacity duration-200">
              E-ARSIP
            </span>
          </NavLink>
        </div>

        {/* Profile section */}
        <div className="flex items-center gap-3 px-3 py-4 rounded-lg bg-gray-50 dark:bg-gray-900/40 mb-4">
          <img
            src="https://fotomhs.amikom.ac.id/2022/22_01_4840.jpg"
            alt="User"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Rusdi Shyt
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Member Ngawi
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Menu
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard asli */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("/dashboard") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("/")
                      ? "/dashboard"
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <HomeIcon
                      className={`shrink-0 h-5 w-5 ${
                        pathname === "/dashboard"
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Buku Agenda */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/logbook" || pathname.includes("logbook")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname === "/logbook" ||
                          pathname.includes("logbook")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpenIcon
                              className={`shrink-0 h-5 w-5 ${
                                pathname === "/logbook" ||
                                pathname.includes("logbook")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Buku Agenda
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-2 ${!open && "hidden"}`}>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/logbook/all"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Semua Dokumen
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/logbook/inbox"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Surat Masuk
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/logbook/outbox"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Surat Keluar
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Persuratan */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/mail" || pathname.includes("mail")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname === "/mail" || pathname.includes("mail")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <EnvelopeIcon
                              className={`shrink-0 w-5 h-5 ${
                                pathname === "/mail" ||
                                pathname.includes("mail")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Persuratan
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-2 ${!open && "hidden"}`}>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/inbox"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Surat Masuk
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/outbox"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Surat Keluar
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* Profile */}
              <SidebarLinkGroup
                activecondition={
                  pathname === "/profile" || pathname.includes("profile")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                          pathname === "/profile" ||
                          pathname.includes("profile")
                            ? ""
                            : "hover:text-gray-900 dark:hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <UserIcon
                              className={`shrink-0 h-5 w-5 ${
                                pathname === "/profile" ||
                                pathname.includes("profile")
                                  ? "text-violet-500"
                                  : "text-gray-400 dark:text-gray-500"
                              }`}
                            />
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Profil
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && "rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-8 mt-2 ${!open && "hidden"}`}>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/data"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Diri
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-2 last:mb-0">
                            <NavLink
                              end
                              to="/password"
                              className={({ isActive }) =>
                                "block transition duration-150 truncate " +
                                (isActive
                                  ? "text-violet-500"
                                  : "text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200")
                              }
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Ganti Kata Sandi
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                SUPERADMIN
              </span>
            </h3>
            <ul className="mt-3">
              {/* Disposisi */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("disposisi") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/disposisi"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("disposisi")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <CheckBadgeIcon
                      className={`shrink-0 h-5 w-5 ${
                        pathname.includes("disposisi")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Disposisi
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Anggota */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("anggota") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/anggota"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("anggota")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <UserGroupIcon
                      className={`shrink-0 h-5 w-5 ${
                        pathname.includes("anggota")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Anggota
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Data Organisasi */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("organization") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/organization"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("organization")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <BuildingOffice2Icon
                      className={`shrink-0 h-5 w-5 ${
                        pathname.includes("organization")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Profil Organisasi
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Kategori Surat Keluar */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-linear-to-r ${
                  pathname.includes("kategori") &&
                  "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                <NavLink
                  end
                  to="/kategori"
                  className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                    pathname.includes("kategori")
                      ? ""
                      : "hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <TagIcon
                      className={`shrink-0 h-5 w-5 ${
                        pathname.includes("kategori")
                          ? "text-violet-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Kategori Surat Keluar
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="w-12 pl-4 pr-3 py-2">
            <button
              className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path d="M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
