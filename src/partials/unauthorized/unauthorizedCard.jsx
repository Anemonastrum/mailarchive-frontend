import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/solid';

export default function UnauthorizedCard() {
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full p-4">
          <LockClosedIcon className="h-10 w-10" />
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Akses Ditolak
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Anda tidak memiliki izin untuk melihat halaman ini. Silakan hubungi administrator jika Anda yakin ini adalah kesalahan.
      </p>
    </div>
  );
}
