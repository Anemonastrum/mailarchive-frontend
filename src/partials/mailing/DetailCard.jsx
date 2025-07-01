import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInboxByIdApi } from "../../api/inbox";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DetailCard({ inboxId, onClose }) {
  const [inbox, setInbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await getInboxByIdApi(inboxId);
        setInbox(res.data.inbox);
      } catch (err) {
        toast.error(err.response?.data?.message || "Gagal memuat data surat");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchInbox();
  }, [inboxId, onClose]);

  if (!inboxId || loading || !inbox) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Detail Surat Masuk
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
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Nomor Surat
              </label>
              <div>{inbox.number}</div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Perihal
              </label>
              <div>{inbox.category}</div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Tanggal Surat
              </label>
              <div>{new Date(inbox.date).toLocaleDateString("id-ID")}</div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Tanggal Diterima
              </label>
              <div>{new Date(inbox.recievedDate).toLocaleDateString("id-ID")}</div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Asal Surat
              </label>
              <div>{inbox.origin}</div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Ringkasan Isi
              </label>
              <div>{inbox.summary}</div>
            </div>
          </div>

          {inbox.mailUrl && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Preview Foto Surat
              </label>
              <div className="flex justify-center">
                <a
                  href={inbox.mailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={inbox.mailUrl}
                    alt="Foto Surat"
                    className="max-h-64 rounded-md border"
                  />
                </a>
              </div>
            </div>
          )}

          {inbox.attachmentUrls?.length > 0 && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Lampiran ({inbox.attachmentUrls.length} file)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {inbox.attachmentUrls.map((url, index) => (
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
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
