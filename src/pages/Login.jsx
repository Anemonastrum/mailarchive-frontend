import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // 👈 use login function from context

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Update form state
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.username, form.password);
      toast.success('Berhasil masuk!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Username atau Password Salah');
    }
  };

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
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Pengguna
            </label>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-3">
              <UserIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Masukkan nama pengguna"
                className="bg-transparent focus:outline-none w-full ml-2 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

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
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="bg-transparent focus:outline-none w-full ml-2 text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-md transition duration-200"
          >
            Masuk
          </button>

          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            E-ARSIP 2025
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
