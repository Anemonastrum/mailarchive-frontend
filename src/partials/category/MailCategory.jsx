import { useEffect, useState } from "react";
import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../../api/category";
import toast from "react-hot-toast";
import {
  TagIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function MailCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch (err) {
        toast.error("Gagal mengambil data kategori");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await createCategoryApi(newCategory.trim());
      setCategories([...categories, res.data.category]);
      setNewCategory("");
      toast.success("Kategori berhasil ditambahkan");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menambah kategori");
    }
  };

  const handleEdit = async (id) => {
    if (!editName.trim()) return;
    try {
      const res = await updateCategoryApi(id, editName.trim());
      setCategories(
        categories.map((cat) => (cat._id === id ? res.data.category : cat))
      );
      setEditId(null);
      setEditName("");
      toast.success("Kategori berhasil diubah");
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal mengedit kategori");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus kategori ini?")) return;
    try {
      await deleteCategoryApi(id);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Kategori berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus kategori");
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 shadow-xs rounded-xl p-6">
      {/* Form Tambah */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Kategori baru"
          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded-md transition"
        >
          Tambah
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Memuat data...
        </div>
      ) : (
        <div className="rounded-lg divide-y dark:divide-gray-700">
          {categories.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              Belum ada kategori.
            </div>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-3 px-4 py-3 my-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
              >
                <div className="p-2 bg-sky-500 text-white rounded-full">
                  <TagIcon className="w-5 h-5" />
                </div>

                {editId === cat._id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none"
                    />
                    <button
                      onClick={() => handleEdit(cat._id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 text-white"
                      title="Simpan"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setEditName("");
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white"
                      title="Batal"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-gray-800 dark:text-gray-100 font-medium">
                      {cat.name}
                    </span>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                      title="Edit"
                      onClick={() => {
                        setEditId(cat._id);
                        setEditName(cat.name);
                      }}
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white"
                      title="Hapus"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
