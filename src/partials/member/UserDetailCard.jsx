import React, { useEffect, useState } from 'react';
import { getUserByIdApi } from '../../api/user';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function UserDetailCard({ userId, onClose }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserByIdApi(userId);
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg sm:w-[90%] md:w-[600px] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Detail Pengguna</h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-gray-700 dark:text-gray-200">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Memuat data...</p>
          ) : user ? (
            <div className="flex flex-col items-center space-y-4">
              {user.pictureUrl && (
                <img
                  src={user.pictureUrl}
                  alt="Foto Pengguna"
                  className="h-32 w-32 rounded-full object-cover border shadow"
                />
              )}
              <div className="w-full grid grid-cols-1 gap-3">
                <div><span className="font-semibold">Nama:</span> {user.name}</div>
                <div><span className="font-semibold">NBM:</span> {user.nbm}</div>
                <div><span className="font-semibold">Alamat:</span> {user.address || '-'}</div>
                <div><span className="font-semibold">Posisi:</span> {user.position || '-'}</div>
                <div><span className="font-semibold">No. Telepon:</span> {user.number}</div>
                <div><span className="font-semibold">Email:</span> {user.email}</div>
                <div><span className="font-semibold">Role:</span> {user.role}</div>
                <div><span className="font-semibold">Status:</span> {user.status}</div>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Pengguna tidak ditemukan</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
