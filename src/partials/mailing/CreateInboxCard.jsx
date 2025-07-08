import React, { useState } from "react";
import toast from "react-hot-toast";
import { createInboxApi } from "../../api/inbox";

import { SyncLoader } from "react-spinners";

export default function CreateInboxCard() {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    number: "",
    category: "",
    date: "",
    recievedDate: "",
    origin: "",
    summary: "",
    mailPic: null,
    attachments: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setForm({ ...form, attachments: files });
    } else if (name === "mailPic") {
      setForm({ ...form, mailPic: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!form.number) newErrors.number = "Nomor surat wajib diisi";
    if (!form.category) newErrors.category = "Perihal wajib diisi";
    if (!form.date) newErrors.date = "Tanggal surat wajib diisi";
    if (!form.recievedDate)
      newErrors.recievedDate = "Tanggal diterima wajib diisi";
    if (!form.origin) newErrors.origin = "Asal surat wajib diisi";
    if (!form.summary) newErrors.summary = "Ringkasan isi wajib diisi";
    if (!form.mailPic) newErrors.mailPic = "File surat wajib diunggah";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Harap isi semua kolom wajib!");
      return;
    }

    setErrors({});
    const data = new FormData();
    data.append("number", form.number);
    data.append("category", form.category);
    data.append("date", form.date);
    data.append("recievedDate", form.recievedDate);
    data.append("origin", form.origin);
    data.append("summary", form.summary);
    data.append("mailPic", form.mailPic);
    Array.from(form.attachments).forEach((file) => {
      data.append("attachments", file);
    });

    try {
      setSubmitting(true);
      await createInboxApi(data);
      toast.success("Surat masuk berhasil dibuat");
      setForm({
        number: "",
        category: "",
        date: "",
        recievedDate: "",
        origin: "",
        summary: "",
        mailPic: null,
        attachments: [],
      });
      document.getElementById("mailPic").value = null;
      document.getElementById("attachments").value = null;
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal membuat surat masuk");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Tambah Surat Masuk
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Nomor Surat
          </label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.number ? "border border-red-500" : ""
            }`}
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Perihal
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.category ? "border border-red-500" : ""
            }`}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Tanggal Surat
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.date ? "border border-red-500" : ""
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Tanggal Diterima
          </label>
          <input
            type="date"
            name="recievedDate"
            value={form.recievedDate}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.recievedDate ? "border border-red-500" : ""
            }`}
          />
          {errors.recievedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.recievedDate}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Asal Surat
          </label>
          <input
            type="text"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.origin ? "border border-red-500" : ""
            }`}
          />
          {errors.origin && (
            <p className="text-red-500 text-sm mt-1">{errors.origin}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Ringkasan Isi
          </label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${
              errors.summary ? "border border-red-500" : ""
            }`}
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            File Surat (Wajib)
          </label>
          <input
            type="file"
            id="mailPic"
            name="mailPic"
            accept="image/*"
            onChange={handleChange}
            required
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Lampiran (opsional)
          </label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleChange}
            multiple
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition disabled:opacity-50"
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <SyncLoader size={6} color="#ffffff" />
              <span>Menyimpan...</span>
            </div>
          ) : (
            "Simpan Surat"
          )}
        </button>
      </div>
    </div>
  );
}
