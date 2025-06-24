import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-6">
        {/* Logo and App Name */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-violet-100 dark:bg-violet-500/20 rounded-full">
            <EnvelopeIcon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">E-ARSIP</h1>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Pengguna */}
          <div>
            <label htmlFor="pengguna" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pengguna
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-3">
              <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                id="pengguna"
                name="pengguna"
                type="pengguna"
                required
                placeholder="Masukkan nama pengguna"
                className="bg-transparent focus:outline-none w-full ml-2 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kata Sandi
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-3">
              <LockClosedIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="bg-transparent focus:outline-none w-full ml-2 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-md transition duration-200"
          >
            Masuk
          </button>

          {/* Footer */}
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            E-ARSIP 2025
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
