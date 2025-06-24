import React from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon, PaperAirplaneIcon, BookOpenIcon } from '@heroicons/react/24/solid';

function QuickActionsCard() {
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Aksi Cepat
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Surat Masuk */}
        <Link
          to="/surat-masuk/tambah"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-800 transition-colors"
        >
          <div className="p-2 bg-violet-500 text-white rounded-full">
            <InboxIcon className='h-5 w-5' />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Tambah Surat Masuk
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Input surat yang diterima
            </div>
          </div>
        </Link>

        {/* Surat Keluar */}
        <Link
          to="/surat-keluar/tambah"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-800 transition-colors"
        >
          <div className="p-2 bg-sky-500 text-white rounded-full">
            <PaperAirplaneIcon className='h-5 w-5' />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Tambah Surat Keluar
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Input surat yang dikirim
            </div>
          </div>
        </Link>

        {/* Buku Agenda */}
        <Link
          to="/buku-agenda"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors"
        >
          <div className="p-2 bg-yellow-500 text-white rounded-full">
            <BookOpenIcon className='h-5 w-5' />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Lihat Buku Agenda
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Ringkasan dokumen
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default QuickActionsCard;
