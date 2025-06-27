import React, { useEffect, useState } from 'react';
import { getUserListApi } from '../../api/user';
import toast from 'react-hot-toast';
import {
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  EyeIcon,
  WrenchScrewdriverIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import ManageUserCard from './ManageUserCard';
import UserDetailCard from './UserDetailCard';

export default function UserListCard() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailUserId, setDetailUserId] = useState(null);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getUserListApi({ page, limit: 10, search });
      setUsers(res.data.users);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  return (
    <>
      <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        {/* Header */}
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Daftar Pengguna
          </h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cari Anggota"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
            />
          </form>
        </header>

        {/* Table */}
        <div className="p-3 overflow-x-auto">
          <table className="min-w-full table-fixed dark:text-gray-300">
            <thead className="text-sm uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 w-10 text-left font-semibold">No.</th>
                <th className="p-2 text-left font-semibold">Nama</th>
                <th className="p-2 text-left font-semibold">No. Telp</th>
                <th className="p-2 text-center font-semibold">Role</th>
                <th className="p-2 text-center font-semibold">Status</th>
                <th className="p-2 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                    Memuat data...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                    Tidak ada pengguna ditemukan
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {(pagination.page - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 text-[15px] font-medium text-gray-800 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {user.number}
                    </td>
                    <td className="p-2 text-center text-[15px] font-medium text-yellow-600 dark:text-yellow-400">
                      {user.role}
                    </td>
                    <td className="p-2 text-center text-[15px] font-medium">
                      {user.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircleIcon className="w-5 h-5" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-500 dark:text-red-400">
                          <XCircleIcon className="w-5 h-5" />
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => setDetailUserId(user._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-600 hover:bg-sky-700 text-white"
                          title="Lihat Detail"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white"
                          title="Kelola"
                        >
                          <WrenchScrewdriverIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700/60 pt-4 px-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={() => fetchUsers(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                {[...Array(pagination.pages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchUsers(page)}
                      className={`px-4 py-2 rounded-md ${
                        pagination.page === page
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchUsers(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedUser && (
        <ManageUserCard
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            fetchUsers(pagination.page);
          }}
        />
      )}
      {detailUserId && (
        <UserDetailCard
          userId={detailUserId}
          onClose={() => setDetailUserId(null)}
        />
      )}
    </>
  );
}
