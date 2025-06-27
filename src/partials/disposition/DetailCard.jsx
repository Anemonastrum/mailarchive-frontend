import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInboxByIdApi, updateInboxActionApi } from "../../api/inbox";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DetailCard({ inboxId, onClose }) {
  const [inbox, setInbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleActionSubmit = async () => {
    if (!action) return toast.error("Pilih tindakan terlebih dahulu");

    try {
      setSubmitting(true);
      await updateInboxActionApi(inboxId, { action });
      toast.success("Tindakan berhasil dikirim");
      onClose(); // close after action
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim tindakan");
    } finally {
      setSubmitting(false);
    }
  };

  if (!inboxId) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-3xl sm:w-[90%] md:w-[700px] overflow-hidden relative">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
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
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-4 text-sm text-gray-700 dark:text-gray-200">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Memuat data...
            </p>
          ) : inbox ? (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <span className="font-semibold">Nomor Surat:</span>{" "}
                {inbox.number}
              </div>
              <div>
                <span className="font-semibold">Asal Surat:</span>{" "}
                {inbox.origin}
              </div>
              <div>
                <span className="font-semibold">Tanggal Terima:</span>{" "}
                {new Date(inbox.recievedDate).toLocaleDateString("id-ID")}
              </div>
              <div>
                <span className="font-semibold">Ringkasan:</span>{" "}
                {inbox.summary}
              </div>
              {inbox.attachments?.length > 0 && (
                <div>
                  <span className="font-semibold block mb-1">Lampiran:</span>
                  <ul className="list-disc ml-6">
                    {inbox.attachments.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {file.originalname || `File ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {inbox.attachmentUrls?.length > 0 && (
                <div>
                  <span className="font-semibold block mb-1">
                    Lampiran URL:
                  </span>
                  <ul className="list-disc ml-6">
                    {inbox.attachmentUrls.map((url, index) => (
                      <li key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Lampiran {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {inbox.content && (
                <div>
                  <span className="font-semibold block mb-1">Isi Surat:</span>
                  <div
                    className="prose dark:prose-invert max-w-full"
                    dangerouslySetInnerHTML={{ __html: inbox.content }}
                  />
                </div>
              )}
              {inbox.attachments?.length > 0 && (
                <div>
                  <span className="font-semibold block mb-1">Lampiran:</span>
                  <ul className="list-disc ml-6">
                    {inbox.attachments.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {file.originalname || `File ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {inbox.status === "wait" && (
                <div>
                  <label className="block font-semibold mb-1">Tindakan:</label>
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100"
                  >
                    <option value="">Pilih tindakan</option>
                    <option value="Tindak lanjuti">Tindak lanjuti</option>
                    <option value="Setuju">Setuju</option>
                    <option value="Tolak">Tolak</option>
                    <option value="Teliti & pendapat">Teliti & pendapat</option>
                    <option value="Untuk diketahui">Untuk diketahui</option>
                    <option value="Selesaikan">Selesaikan</option>
                    <option value="Sesuai catatan">Sesuai catatan</option>
                    <option value="Untuk Diperhatikan">
                      Untuk Diperhatikan
                    </option>
                    <option value="Edarkan">Edarkan</option>
                  </select>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-red-500">Surat tidak ditemukan</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Tutup
          </button>
          {inbox?.status === "wait" && (
            <button
              onClick={handleActionSubmit}
              disabled={submitting}
              className="px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700 transition disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Kirim Tindakan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
