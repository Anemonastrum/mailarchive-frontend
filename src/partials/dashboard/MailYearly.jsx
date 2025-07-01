import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';
import { getCssVariable } from '../../utils/Utils';
import { getMailMonthly } from '../../api/stats';

import { BeatLoader } from 'react-spinners';

function MailYearly() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const res = await getMailMonthly(currentYear);
        const stats = res.data.data;

        const labels = Array.from({ length: 12 }, (_, i) => {
          const month = String(i + 1).padStart(2, '0');
          return `${month}-01-${currentYear}`;
        });

        const inboxData = stats.map(item => item.inboxCount || 0);
        const outboxData = stats.map(item => item.outboxCount || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Surat Masuk',
              data: inboxData,
              backgroundColor: getCssVariable('--color-sky-500'),
              hoverBackgroundColor: getCssVariable('--color-sky-600'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
            {
              label: 'Surat Keluar',
              data: outboxData,
              backgroundColor: getCssVariable('--color-violet-500'),
              hoverBackgroundColor: getCssVariable('--color-violet-600'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Gagal memuat data statistik:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [currentYear]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Statistik Surat Masuk & Surat Keluar</h2>
      </header>
      {loading || !chartData ? (
        <div className="p-5 text-center text-gray-500 dark:text-gray-400">\
          <BeatLoader size={12} color="#a6e3a1" />
        </div>
      ) : (
        <BarChart data={chartData} width={595} height={248} />
      )}
    </div>
  );
}

export default MailYearly;
