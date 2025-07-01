import React, { useEffect, useState } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import { getCssVariable } from '../../utils/Utils';
import { getMailCategoryStats } from '../../api/stats';

import { BeatLoader } from 'react-spinners';

function MailCategory() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const res = await getMailCategoryStats();
        const data = res.data.data;

        const labels = data.map(item => item.category);
        const values = data.map(item => item.count);

        const baseColors = [
          '--color-violet-500',
          '--color-sky-500',
          '--color-orange-500',
          '--color-cyan-500',
          '--color-yellow-500',
          '--color-indigo-500',
          '--color-rose-500',
          '--color-teal-500',
        ];

        const chartColors = baseColors.slice(0, labels.length);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Kategori Surat Keluar',
              data: values,
              backgroundColor: chartColors.map(getCssVariable),
              hoverBackgroundColor: chartColors.map(color =>
                getCssVariable(color.replace('500', '600'))
              ),
              borderWidth: 0,
            },
          ],
        });
      } catch (error) {
        console.error('Gagal memuat kategori surat:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-4 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Kategori Surat Keluar
        </h2>
      </header>

      {loading || !chartData ? (
        <div className="p-5 text-center text-gray-500 dark:text-gray-400">
          <BeatLoader size={12} color="#a6e3a1" />
        </div>
      ) : (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default MailCategory;
