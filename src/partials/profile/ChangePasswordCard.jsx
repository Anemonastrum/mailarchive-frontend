import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { changePasswordApi } from '../../api/user'; // adjust the path as needed

export default function ChangePasswordCard() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
      return toast.error('Semua kolom wajib diisi');
    }

    if (form.newPassword !== form.confirmNewPassword) {
      return toast.error('Konfirmasi password tidak cocok');
    }

    try {
      setLoading(true);
      await changePasswordApi({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      toast.success('Password berhasil diubah');
      setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mengganti password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ubah Password</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Password Saat Ini</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleInput}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Password Baru</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleInput}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Konfirmasi Password Baru</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={form.confirmNewPassword}
            onChange={handleInput}
            className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100"
          />
        </div>
      </form>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </div>
  );
}
