import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { registerUserApi } from '../../api/user';

export default function RegisterUserCard() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    address: '',
    number: '',
    position: '',
    role: 'user',
    status: 'active',
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await registerUserApi(form);
      toast.success(res.data.message || 'User registered successfully');
      setForm({
        name: '',
        username: '',
        password: '',
        address: '',
        number: '',
        position: '',
        role: 'user',
        status: 'active',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal mendaftarkan pengguna');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Tambah Pengguna Baru
        </h2>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Nama', name: 'name', type: 'text' },
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'No. Telepon', name: 'number', type: 'text' },
            { label: 'Alamat', name: 'address', type: 'text' },
            { label: 'Jabatan', name: 'position', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleInput}
                className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleInput}
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleInput}
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Daftarkan Pengguna'}
        </button>
      </div>
    </div>
  );
}
