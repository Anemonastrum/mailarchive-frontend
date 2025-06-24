import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function MailYearly() {

  const chartData = {
    labels: [
      '01-01-2025', '02-01-2025', '03-01-2025',
      '04-01-2025', '05-01-2025', '06-01-2025',
      '07-01-2025', '08-01-2025', '09-01-2025',
      '10-01-2025', '11-01-2025', '12-01-2025',
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Surat Masuk',
        data: [
          11, 5, 1, 2, 5, 9, 11, 5, 1, 2, 5, 9,
        ],
        backgroundColor: getCssVariable('--color-sky-500'),
        hoverBackgroundColor: getCssVariable('--color-sky-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Blue bars
      {
        label: 'Surat Keluar',
        data: [
          12, 10, 5, 4, 2, 1, 12, 10, 5, 4, 2, 1,
        ],
        backgroundColor: getCssVariable('--color-violet-500'),
        hoverBackgroundColor: getCssVariable('--color-violet-600'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Statistik Surat Masuk & Surat Keluar</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default MailYearly;
