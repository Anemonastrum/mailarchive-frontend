import React, { useState } from 'react';
import { deleteInboxApi } from '../../api/inbox';
import { deleteOutboxApi } from '../../api/outbox';
import toast from 'react-hot-toast';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function DeleteMailConfirmCard({ mail, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (mail.type === 'inbox') {
        await deleteInboxApi(mail._id);
      } else if (mail.type === 'outbox') {
        await deleteOutboxApi(mail._id);
      }
      toast.success('Surat berhasil dihapus');
      onDeleted();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal menghapus surat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm sm:w-[90%] md:w-[500px] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Hapus Surat</h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 flex gap-3 items-start">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
          <p>
            Anda yakin ingin menghapus surat{' '}
            <span className="font-medium">{mail.number}</span> dari{' '}
            <span className="capitalize">
              {mail.type === 'inbox' ? 'Surat Masuk' : 'Surat Keluar'}
            </span>
            ?
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex flex-col sm:flex-row justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}
