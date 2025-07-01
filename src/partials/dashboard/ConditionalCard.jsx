import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowPathIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { getDisposisiTotal } from '../../api/stats';
import { useAuth } from '../../context/AuthContext';

function ConditionalCard() {
  const { user } = useAuth();
  const [totalWaitingInbox, setTotalWaitingInbox] = useState(0);

  useEffect(() => {
    if (user?.role === 'superadmin' || user?.role === 'admin') {
      const fetchStats = async () => {
        try {
          const res = await getDisposisiTotal();
          setTotalWaitingInbox(res.data.totalWaitingInbox || 0);
        } catch (error) {
          console.error('Gagal memuat statistik:', error);
        }
      };
      fetchStats();
    }
  }, [user]);

  if (!user) return null;

  const isUser = user.role === 'user';
  const title = isUser ? 'Kelola Profil' : 'Disposisi Menunggu';
  const linkTo =
    user.role === 'superadmin'
      ? '/disposisi'
      : user.role === 'admin'
      ? '/mail/disposisi'
      : '/profile';
  const footerLabel = isUser ? 'Buka Profil →' : 'Lihat Selengkapnya →';

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {title}
          </h2>
          <div
            className={`p-2 ${
              isUser ? 'bg-violet-100 dark:bg-violet-500/10' : 'bg-sky-100 dark:bg-sky-500/10'
            } rounded-full`}
          >
            {isUser ? (
              <UserCircleIcon className="w-5 h-5 text-violet-500 dark:text-violet-400" />
            ) : (
              <ArrowPathIcon className="w-5 h-5 text-sky-500 dark:text-sky-400" />
            )}
          </div>
        </header>

        {isUser ? (
          <div className="flex items-center gap-3">
            <img
              src={user.pictureUrl}
              alt="Foto Profil"
              className="w-14 h-14 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
            <div>
              <div className="text-md font-semibold text-gray-800 dark:text-gray-100">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {user.position || 'Member'}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
              Total
            </div>
            <div className="flex items-center">
              <div className="text-5xl font-bold text-gray-800 dark:text-gray-100 mr-2">
                {totalWaitingInbox}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="px-5 pb-5 mt-auto flex justify-end">
        <Link
          to={linkTo}
          className={`text-sm font-medium ${
            isUser
              ? 'text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300'
              : 'text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300'
          }`}
        >
          {footerLabel}
        </Link>
      </div>
    </div>
  );
}

export default ConditionalCard;
