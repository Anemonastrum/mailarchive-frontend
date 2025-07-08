import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const logoUrl = "https://minio.warungmicky.shop/aisyiyah/assets/Aisyiyah.png";

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.username, form.password);
      toast.success("Berhasil masuk!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Username atau Password Salah");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow max-w-4xl w-full md:flex overflow-hidden">
        {/* Logo / Info Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gray-50 dark:bg-violet-600/10 p-8 w-1/2">
          <img
            src={logoUrl}
            alt="E-ARSIP Logo"
            className="w-40 h-40 object-contain rounded-full mb-4 shadow"
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
            E-ARSIP
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 text-center">
            Sistem Arsip Digital 2025
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <form className="p-6 md:p-8 space-y-4" onSubmit={handleSubmit}>
            {/* Mobile Logo */}
            <div className="flex items-center justify-center mb-6 md:hidden">
              <img
                src={logoUrl}
                alt="E-ARSIP Logo"
                className="w-32 h-32 object-contain rounded-full shadow"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              >
                Nama Pengguna
              </label>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md">
                <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama pengguna"
                  className="bg-transparent focus:outline-none w-full ml-2 text-sm text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
              >
                Kata Sandi
              </label>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md">
                <LockClosedIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="bg-transparent focus:outline-none w-full ml-2 text-sm text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-md text-sm transition disabled:opacity-50"
            >
              {submitting ? "Masuk..." : "Masuk"}
            </button>

            {/* Footer Text */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              E-ARSIP 2025
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
