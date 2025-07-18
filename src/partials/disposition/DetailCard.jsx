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
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengirim tindakan");
    } finally {
      setSubmitting(false);
    }
  };

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
                Asal Surat
              </label>
              <div>{inbox.origin}</div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Tanggal Terima
              </label>
              <div>{new Date(inbox.recievedDate).toLocaleDateString("id-ID")}</div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                Ringkasan
              </label>
              <div>{inbox.summary}</div>
            </div>
          </div>

          {/* mailUrl Image Preview */}
          {inbox.mailUrl && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Foto Surat
              </label>
              <div className="flex justify-center">
                <a
                  href={inbox.mailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={inbox.mailUrl}
                    alt="Foto Surat"
                    className="max-h-64 object-contain rounded-md border"
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
                      alt={`Lampiran ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {inbox.content && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Isi Surat
              </label>
              <div
                className="prose dark:prose-invert max-w-full"
                dangerouslySetInnerHTML={{ __html: inbox.content }}
              />
            </div>
          )}

          {inbox.status === "wait" && (
            <div>
              <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                Tindakan
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
              >
                <option value="">Pilih tindakan</option>
                <option value="Tindak lanjuti">Tindak lanjuti</option>
                <option value="Setuju">Setuju</option>
                <option value="Tolak">Tolak</option>
                <option value="Teliti & pendapat">Teliti & pendapat</option>
                <option value="Untuk diketahui">Untuk diketahui</option>
                <option value="Selesaikan">Selesaikan</option>
                <option value="Sesuai catatan">Sesuai catatan</option>
                <option value="Untuk Diperhatikan">Untuk Diperhatikan</option>
                <option value="Edarkan">Edarkan</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-700/60 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white px-4 py-2 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition"
          >
            Tutup
          </button>
          {inbox.status === "wait" && (
            <button
              onClick={handleActionSubmit}
              disabled={submitting}
              className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm transition disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Kirim Tindakan"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
