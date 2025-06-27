import React, { useEffect, useState } from "react";
import { getInboxByIdApi } from "../../api/inbox";
import { getOutboxByIdApi } from "../../api/outbox";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";

export default function ViewMailCard({ mailId, type, onClose }) {
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMail = async () => {
      try {
        setLoading(true);
        console.log("Fetching mail", mailId, type); // 👈 debug log
        const res =
          type === "inbox"
            ? await getInboxByIdApi(mailId)
            : await getOutboxByIdApi(mailId);
        console.log("Mail fetched", res.data);
        setMail(type === "inbox" ? res.data.inbox : res.data.outbox);
      } catch (err) {
        console.error("Gagal memuat surat", err);
      } finally {
        setLoading(false);
      }
    };

    if (mailId && type) {
      fetchMail();
    }
  }, [mailId, type]);

  if (!mailId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg sm:w-[90%] md:w-[600px] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Detail Surat
            </h3>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                type === "inbox"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-700/20 dark:text-blue-300"
                  : "bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-300"
              }`}
            >
              {type === "inbox" ? "Surat Masuk" : "Surat Keluar"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-300 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-gray-700 dark:text-gray-200">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Memuat data...
            </p>
          ) : mail ? (
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Nomor:</span> {mail.number}
              </div>
              <div>
                <span className="font-semibold">Kategori:</span> {mail.category}
              </div>
              <div>
                <span className="font-semibold">Tanggal:</span>{" "}
                {new Date(mail.date).toLocaleDateString("id-ID")}
              </div>

              {type === "inbox" ? (
                <>
                  <div>
                    <span className="font-semibold">Tanggal Diterima:</span>{" "}
                    {new Date(mail.recievedDate).toLocaleDateString("id-ID")}
                  </div>
                  <div>
                    <span className="font-semibold">Asal:</span> {mail.origin}
                  </div>
                  <div>
                    <span className="font-semibold">Ringkasan:</span>{" "}
                    {mail.summary}
                  </div>
                  <div>
                    <span className="font-semibold">Tindakan:</span>{" "}
                    {mail.action || "-"}
                  </div>
                  <div>
                    <span className="font-semibold">Dibuat Oleh:</span>{" "}
                    {mail.createdBy || "-"}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="font-semibold">Tujuan:</span>{" "}
                    {mail.destination}
                  </div>
                  <div>
                    <span className="font-semibold">Ringkasan:</span>{" "}
                    {mail.summary}
                  </div>
                  <div>
                    <span className="font-semibold">Dibuat Oleh:</span>{" "}
                    {mail.createdBy || "-"}
                  </div>

                  {/* PDF section */}
                  {mail.pdfUrl && (
                    <div className="space-y-2">
                      <span className="font-semibold">Dokumen PDF:</span>
                      <div className="flex gap-2 items-center">
                        <a
                          href={mail.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700 transition"
                        >
                          <EyeIcon className="w-4 h-4" />
                          Lihat
                        </a>
                        <a
                          href={mail.pdfUrl}
                          download
                          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4" />
                          Unduh
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Attachment list */}
              {mail.attachmentUrls?.length > 0 && (
                <div>
                  <div className="font-semibold mb-1">Lampiran:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {mail.attachmentUrls.map((url, idx) => (
                      <li key={idx}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all inline-flex items-center gap-1"
                        >
                          <PaperClipIcon className="w-4 h-4" />
                          {decodeURIComponent(url.split("/").pop())}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-red-500">Surat tidak ditemukan</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
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
