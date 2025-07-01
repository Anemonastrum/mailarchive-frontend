import React, { useEffect, useState } from "react";
import { getInboxDisposisiApi } from "../../api/inbox";
import { getOutboxVerificationApi } from "../../api/outbox";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import DetailCard from "./DetailCard";
import ViewMailCard from "./ViewMailCard";
import { BeatLoader } from "react-spinners";

export default function DispositionListCard() {
  const [dispositions, setDispositions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null);

  const fetchDispositions = async (page = 1) => {
    try {
      setLoading(true);
      const [inboxRes, outboxRes] = await Promise.all([
        getInboxDisposisiApi({ page, limit: 10 }),
        getOutboxVerificationApi({ page, limit: 10 }),
      ]);

      const inboxItems = inboxRes.data.data.map((item) => ({
        ...item,
        type: "inbox",
      }));
      const outboxItems = outboxRes.data.data.map((item) => ({
        ...item,
        type: "outbox",
      }));

      const merged = [...inboxItems, ...outboxItems];

      setDispositions(merged);
      setPagination({
        page,
        pages: Math.max(
          inboxRes.data.totalPages || 1,
          outboxRes.data.totalPages || 1
        ),
      });
    } catch (err) {
      toast.error("Gagal memuat data disposisi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispositions();
  }, []);

  return (
    <>
      <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Daftar Surat Menunggu
          </h2>
        </div>

        {/* Table */}
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-700 dark:text-gray-200">
            <thead className="uppercase text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left px-3 py-2">No.</th>
                <th className="text-center px-3 py-2">Tipe</th>
                <th className="text-left px-3 py-2">Nomor</th>
                <th className="text-left px-3 py-2">Asal/Tujuan</th>
                <th className="text-left px-3 py-2">Ringkasan</th>
                <th className="text-left px-3 py-2">Tanggal</th>
                <th className="text-left px-3 py-2">Penginput</th>
                <th className="text-center px-3 py-2">Lampiran</th>
                <th className="text-center px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 font-medium">
              {loading ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex justify-center items-center">
                        <BeatLoader size={12} color="#a6e3a1" />
                      </div>
                  </td>
                </tr>
              ) : dispositions.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data disposisi
                  </td>
                </tr>
              ) : (
                dispositions.map((item, index) => (
                  <tr key={item._id}>
                    <td className="px-3 py-3">
                      {(pagination.page - 1) * 10 + index + 1}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.type.toLowerCase() === "inbox"
                            ? "bg-blue-100 whitespace-nowrap text-blue-800 dark:bg-blue-700/20 dark:text-blue-300"
                            : "bg-green-100 whitespace-nowrap text-green-800 dark:bg-green-700/20 dark:text-green-300"
                        }`}
                      >
                        {item.type.toLowerCase() === "inbox"
                          ? "Surat Masuk"
                          : "Surat Keluar"}
                      </span>
                    </td>
                    <td className="px-3 py-3">{item.number}</td>
                    <td className="px-3 py-3">
                      {item.type === "inbox" ? item.origin : item.destination}
                    </td>
                    <td className="px-3 py-3 truncate max-w-[200px]">
                      {item.summary}
                    </td>
                    <td className="px-3 py-3">
                      {new Date(
                        item.date || item.recievedDate
                      ).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-3 py-3">{item.createdBy}</td>
                    <td className="px-3 py-3 text-center">
                      {item.attachment || 0} Berkas
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                          item.status === "wait"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-300"
                            : "bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-300"
                        }`}
                      >
                        {item.status === "wait" ? "Menunggu" : item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center items-center">
                      <button
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white transition"
                        onClick={() => setSelectedMail(item)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 border-t border-gray-100 dark:border-gray-700/60 pt-4 text-sm">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => fetchDispositions(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              {[...Array(pagination.pages)].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => fetchDispositions(page)}
                    className={`px-4 py-2 rounded-md ${
                      pagination.page === page
                        ? "bg-violet-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => fetchDispositions(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
              >
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modals */}
      {selectedMail?.type === "inbox" && (
        <DetailCard
          inboxId={selectedMail._id}
          onClose={() => {
            setSelectedMail(null);
            fetchDispositions(pagination.page);
          }}
        />
      )}

      {selectedMail?.type === "outbox" && (
        <ViewMailCard
          mailId={selectedMail._id}
          type="outbox"
          onClose={() => {
            setSelectedMail(null);
            fetchDispositions(pagination.page);
          }}
        />
      )}
    </>
  );
}
