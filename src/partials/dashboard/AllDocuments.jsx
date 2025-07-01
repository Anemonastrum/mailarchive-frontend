import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InboxStackIcon } from '@heroicons/react/24/solid';
import { getTotalMail } from '../../api/stats';

function AllDocuments() {
  const [totalMail, setTotalMail] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getTotalMail();
        setTotalMail(res.data.totalMail || 0); // Safe fallback
      } catch (err) {
        console.error('Gagal memuat statistik:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Semua Dokumen
          </h2>
          <div className="p-2 bg-violet-100 dark:bg-violet-500/10 rounded-full">
            <InboxStackIcon className="w-5 h-5 text-violet-500 dark:text-violet-400" />
          </div>
        </header>
        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1">
          Total
        </div>
        <div className="flex items-center">
          <div className="text-5xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {totalMail || 0}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 mt-auto flex justify-end">
        <Link
          to="/logbook/all"
          className="text-sm font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300"
        >
          Lihat Selengkapnya &rarr;
        </Link>
      </div>
    </div>
  );
}

export default AllDocuments;
