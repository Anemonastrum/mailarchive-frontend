import React, { useState } from 'react';
import { manageUserApi } from '../../api/user'; // Adjust path
import toast from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ManageUserCard({ user, onClose }) {
  const [form, setForm] = useState({
    name: user.name || '',
    address: user.address || '',
    position: user.position || '',
    number: user.number || '',
    role: user.role || 'user',
    status: user.status || 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await manageUserApi(user._id, form);
      toast.success('User berhasil diperbarui');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memperbarui user');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Kelola Pengguna</h3>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-300 hover:text-red-500">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {['name', 'address', 'position', 'number'].map((field) => (
            <div key={field}>
              <label className="block text-sm mb-1 capitalize text-gray-700 dark:text-gray-300">{field}</label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white focus:outline-none"
            >
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
