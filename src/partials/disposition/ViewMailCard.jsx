import React, { useEffect, useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { getOutboxByIdApi, updateOutboxStatus } from '../../api/outbox';
import toast from 'react-hot-toast';

export default function ViewMailCard({ mailId, type, onClose }) {
  const [outbox, setOutbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getOutboxByIdApi(mailId);
        setOutbox(res.data.outbox);
      } catch (err) {
        toast.error('Gagal memuat detail surat');
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mailId]);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      await updateOutboxStatus(mailId);
      toast.success('Surat berhasil diverifikasi');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal verifikasi surat');
    } finally {
      setVerifying(false);
    }
  };

  if (loading || !outbox) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Detail Surat Keluar
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto text-sm text-gray-700 dark:text-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Nomor Surat
              </label>
              <div>{outbox.number}</div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Kategori
              </label>
              <div>{outbox.category}</div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Tanggal
              </label>
              <div>
                {new Date(outbox.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Tujuan
              </label>
              <div>{outbox.destination}</div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                Ringkasan
              </label>
              <div>{outbox.summary}</div>
            </div>
          </div>

          {outbox.pdfUrl && (
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Preview PDF
              </label>
              <div className="border rounded-md overflow-hidden">
                <iframe
                  src={outbox.pdfUrl}
                  title="PDF Preview"
                  className="w-full h-[600px]"
                ></iframe>
              </div>
            </div>
          )}

          {outbox.attachmentUrls?.length > 0 && (
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Lampiran ({outbox.attachment} file)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {outbox.attachmentUrls.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={url}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700/60 flex justify-end gap-2">
          {outbox.status === 'wait' && (
            <button
              onClick={handleVerify}
              disabled={verifying}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 transition disabled:opacity-50"
            >
              <CheckCircleIcon className="h-5 w-5" />
              {verifying ? 'Memverifikasi...' : 'Verifikasi Surat'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
