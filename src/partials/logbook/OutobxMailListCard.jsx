import React, { useEffect, useState } from "react";
import { getAllMailsApi } from "../../api/logbook";
import toast from "react-hot-toast";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";
import DeleteMailConfirmCard from "./DeleteMailConfirmCard";
import ViewMailCard from "./ViewMailCard";
import EditMailCard from "./EditMailCard";

export default function OutboxMailListCard() {
  const { user } = useAuth();
  const [outboxMails, setOutboxMails] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchOutboxMails = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllMailsApi({ page, limit: 10, search });
      const outboxOnly = res.data.documents.filter(
        (doc) => doc.type.toLowerCase() === "outbox"
      );
      setOutboxMails(outboxOnly);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error("Gagal memuat surat keluar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutboxMails();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOutboxMails(1);
  };

  return (
    <>
      {editTarget && (
        <EditMailCard
          mailId={editTarget.id}
          type="outbox"
          onClose={() => setEditTarget(null)}
          onUpdated={() => {
            setEditTarget(null);
            fetchOutboxMails(pagination.page);
          }}
        />
      )}

      {!editTarget && (
        <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl">
          {/* Header */}
          <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between items-center">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Daftar Surat Keluar
            </h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari Surat Keluar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1.5 rounded-md text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
              />
            </form>
          </header>

          {/* Table */}
          <div className="p-3 overflow-x-auto">
            <table className="min-w-full table-fixed dark:text-gray-300">
              <thead className="text-sm uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="p-2 w-10 text-left font-semibold">No.</th>
                  <th className="p-2 text-left font-semibold">Tanggal</th>
                  <th className="p-2 text-left font-semibold">Nomor Surat</th>
                  <th className="p-2 text-left font-semibold">Tujuan</th>
                  <th className="p-2 text-left font-semibold">Ringkasan</th>
                  <th className="p-2 text-center font-semibold">Lampiran</th>
                  <th className="p-2 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500 dark:text-gray-400">
                      Memuat data...
                    </td>
                  </tr>
                ) : outboxMails.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500 dark:text-gray-400">
                      Tidak ada surat keluar ditemukan
                    </td>
                  </tr>
                ) : (
                  outboxMails.map((doc, index) => (
                    <tr key={doc._id}>
                      <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                        {(pagination.page - 1) * 10 + index + 1}
                      </td>
                      <td className="p-2 text-[15px] font-medium text-gray-800 dark:text-gray-100">
                        {new Date(doc.date).toLocaleDateString("id-ID")}
                      </td>
                      <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                        {doc.number}
                      </td>
                      <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300">
                        {doc.from}
                      </td>
                      <td className="p-2 text-[15px] text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                        {doc.summary}
                      </td>
                      <td className="p-2 text-center">
                        {doc.attachment || 0} Berkas
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() =>
                              setViewTarget({
                                id: doc._id,
                                type: "outbox",
                              })
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 hover:bg-violet-700 text-white"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          {user?.role === "superadmin" && (
                            <>
                              <button
                                onClick={() =>
                                  setEditTarget({
                                    id: doc._id,
                                    type: "outbox",
                                  })
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(doc)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
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
                    onClick={() => fetchOutboxMails(pagination.page - 1)}
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
                        onClick={() => fetchOutboxMails(page)}
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
                    onClick={() => fetchOutboxMails(pagination.page + 1)}
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
      )}

      {/* View Mail Modal */}
      {viewTarget && (
        <ViewMailCard
          mailId={viewTarget.id}
          type="outbox"
          onClose={() => setViewTarget(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <DeleteMailConfirmCard
          mail={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => {
            setDeleteTarget(null);
            fetchOutboxMails(pagination.page);
          }}
        />
      )}
    </>
  );
}
