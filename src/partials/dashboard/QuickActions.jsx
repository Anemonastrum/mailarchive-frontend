import React from 'react';
import { Link } from 'react-router-dom';
import { InboxIcon, PaperAirplaneIcon, BookOpenIcon } from '@heroicons/react/24/solid';

function QuickActionsCard() {
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Aksi Cepat
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Surat Masuk */}
        <Link
          to="/mail/inbox"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-800 transition-colors"
        >
          <div className="p-2 bg-violet-500 text-white rounded-full">
            <InboxIcon className="h-5 w-5" />
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
          to="/mail/outbox"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sky-50 dark:bg-sky-900/20 hover:bg-sky-100 dark:hover:bg-sky-800 transition-colors"
        >
          <div className="p-2 bg-sky-500 text-white rounded-full">
            <PaperAirplaneIcon className="h-5 w-5" />
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
          to="/logbook"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors"
        >
          <div className="p-2 bg-orange-500 text-white rounded-full">
            <BookOpenIcon className="h-5 w-5" />
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
