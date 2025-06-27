import React, { useEffect, useState } from 'react';
import {
  getOrganizationApi,
  createOrganizationApi,
  updateOrganizationApi,
} from '../../api/organization';
import toast from 'react-hot-toast';

export default function OrganizationCard() {
  const [org, setOrg] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', number: '', email: '', logo: null });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await getOrganizationApi();
        setOrg(res.data);
        setForm({
          name: res.data.name,
          address: res.data.address,
          number: res.data.number,
          email: res.data.email,
          logo: null,
        });
      } catch (err) {
        setOrg(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setForm({ ...form, logo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('address', form.address);
      data.append('number', form.number);
      data.append('email', form.email);
      if (form.logo) data.append('logo', form.logo);

      let res;
      if (org) {
        res = await updateOrganizationApi(data);
        toast.success('Data organisasi diperbarui');
      } else {
        res = await createOrganizationApi(data);
        toast.success('Data organisasi dibuat');
      }
      setOrg(res.data.organization || res.data);
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  if (loading) {
    return (
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profil Organisasi</h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-violet-600 font-semibold hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {org?.logo && !editing && (
          <div className="flex justify-center">
            <img src={org.logo} alt="Logo" className="h-48 w-48 rounded-full border object-contain" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              disabled={!editing}
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">No. Telp</label>
            <input
              type="text"
              name="number"
              value={form.number}
              onChange={handleInput}
              disabled={!editing}
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Alamat</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInput}
              disabled={!editing}
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInput}
              disabled={!editing}
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
          {editing && (
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Logo</label>
              <input
                type="file"
                name="logo"
                onChange={handleInput}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {editing && (
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end gap-2">
          <button
            onClick={() => setEditing(false)}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md font-semibold transition"
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  );
}
