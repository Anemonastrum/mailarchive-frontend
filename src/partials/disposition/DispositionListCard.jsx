import React, { useEffect, useState } from "react";
import { getInboxDisposisiApi } from "../../api/inbox";
import toast from "react-hot-toast";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import DetailCard from "./DetailCard"; // 👈 Import your detail view component

export default function DispositionListCard() {
  const [dispositions, setDispositions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [selectedInboxId, setSelectedInboxId] = useState(null); // 👈 new state

  const fetchDispositions = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getInboxDisposisiApi({ page, limit: 10 });
      setDispositions(res.data.data);
      setPagination({
        page: res.data.currentPage,
        pages: res.data.totalPages,
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
      <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        {/* Header */}
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">
            Daftar Disposisi
          </h2>
        </header>

        {/* Table */}
        <div className="p-3 overflow-x-auto">
          <table className="min-w-full table-fixed dark:text-gray-300">
            <thead className="text-sm uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-2 w-10 text-left font-semibold">No.</th>
                <th className="p-2 text-left font-semibold">Nomor Surat</th>
                <th className="p-2 text-left font-semibold">Asal Surat</th>
                <th className="p-2 text-left font-semibold">Ringkasan</th>
                <th className="p-2 text-left font-semibold">Tanggal Terima</th>
                <th className="p-2 text-left font-semibold">Penginput</th>
                <th className="p-2 text-center font-semibold">Lampiran</th>{" "}
                {/* New column */}
                <th className="p-2 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    Memuat data...
                  </td>
                </tr>
              ) : dispositions.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    Tidak ada data disposisi
                  </td>
                </tr>
              ) : (
                dispositions.map((item, index) => (
                  <tr key={item._id}>
                    <td className="p-2 text-[15px] font-medium text-gray-700 dark:text-gray-300">
                      {(pagination.page - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 text-[15px] font-medium text-gray-800 dark:text-gray-100">
                      {item.number}
                    </td>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {item.origin}
                    </td>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {item.summary}
                    </td>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {new Date(item.recievedDate).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                      {item.createdBy}
                    </td>
                    <td className="p-2 text-center text-[15px] text-gray-800 dark:text-gray-200">
                      {item.attachment || 1} Berkas
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="text-sm px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition"
                        onClick={() => setSelectedInboxId(item._id)}
                      >
                        Tindak
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700/60 pt-4 px-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={() => fetchDispositions(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>

                {[...Array(pagination.pages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchDispositions(page)}
                      className={`px-4 py-2 rounded-md ${
                        pagination.page === page
                          ? "bg-violet-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
      </div>

      {/* DetailCard Modal */}
      {selectedInboxId && (
        <DetailCard
          inboxId={selectedInboxId}
          onClose={() => {
            setSelectedInboxId(null);
            fetchDispositions(pagination.page); // Refresh data after action
          }}
        />
      )}
    </>
  );
}
