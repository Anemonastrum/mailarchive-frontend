import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getUserApi, updateUserSelfApi } from '../../api/user';
import { BeatLoader } from 'react-spinners';

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: '',
    address: '',
    position: '',
    number: '',
    nbm: '',
    picture: null,
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchSelf = async () => {
      try {
        const res = await getUserApi();
        setUser(res.data.user);
        setForm({
          name: res.data.user.name || '',
          address: res.data.user.address || '',
          position: res.data.user.position || '',
          number: res.data.user.number || '',
          nbm: res.data.user.nbm || '',
          picture: null,
        });
      } catch (err) {
        toast.error('Gagal mengambil data profil');
      } finally {
        setLoading(false);
      }
    };
    fetchSelf();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      const file = files[0];
      setForm((prev) => ({ ...prev, picture: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('address', form.address);
      data.append('position', form.position);
      data.append('number', form.number);
      data.append('nbm', form.nbm);
      if (form.picture) data.append('picture', form.picture);

      const res = await updateUserSelfApi(data);
      setUser(res.data.user);
      setEditing(false);
      setPreview(null);
      toast.success('Profil berhasil diperbarui');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal memperbarui profil');
    }
  };

  if (loading) {
    return (
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center text-gray-500">
          <BeatLoader size={12} color="#a6e3a1" />
      </div>
    );
  }

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Profil Saya</h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-violet-600 font-semibold hover:underline"
          >
            Edit
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {(user?.pictureUrl || preview) && (
          <div className="flex justify-center">
            <img
              src={preview || user.pictureUrl}
              alt="Foto Profil"
              className="h-48 w-48 rounded-full border object-cover"
            />
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
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Posisi</label>
            <input
              type="text"
              name="position"
              value={form.position}
              disabled // <-- Always disabled
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">NBM</label>
            <input
              type="text"
              name="nbm"
              value={form.nbm}
              onChange={handleInput}
              disabled={!editing}
              className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">No. Telepon</label>
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
          {editing && (
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Foto Profil</label>
              <input
                type="file"
                name="picture"
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
            onClick={() => {
              setEditing(false);
              setPreview(null);
            }}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  );
}
