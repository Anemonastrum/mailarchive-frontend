import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createInboxApi } from '../../api/inbox'; // Adjust this path based on your setup

export default function CreateInboxCard() {
  const [form, setForm] = useState({
    number: '',
    category: '',
    date: '',
    recievedDate: '',
    origin: '',
    summary: '',
    attachments: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachments') {
      setForm({ ...form, attachments: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!form.number || !form.category || !form.date || !form.origin || !form.summary) {
      toast.error('Semua kolom wajib diisi!');
      return;
    }

    const data = new FormData();
    data.append('number', form.number);
    data.append('category', form.category);
    data.append('date', form.date);
    data.append('recievedDate', form.recievedDate);
    data.append('origin', form.origin);
    data.append('summary', form.summary);

    Array.from(form.attachments).forEach((file) => {
      data.append('attachments', file);
    });

    try {
      setSubmitting(true);
      await createInboxApi(data);
      toast.success('Surat masuk berhasil dibuat');
      setForm({
        number: '',
        category: '',
        date: '',
        recievedDate: '',
        origin: '',
        summary: '',
        attachments: [],
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal membuat surat masuk');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tambah Surat Masuk</h2>
      </div>

      {/* Body */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tanggal Surat</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tanggal Diterima</label>
          <input
            type="date"
            name="recievedDate"
            value={form.recievedDate}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Asal Surat</label>
          <input
            type="text"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Ringkasan Isi</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows="3"
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">Lampiran (jika ada)</label>
          <input
            type="file"
            name="attachments"
            onChange={handleChange}
            multiple
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold transition disabled:opacity-50"
        >
          {submitting ? 'Menyimpan...' : 'Simpan Surat'}
        </button>
      </div>
    </div>
  );
}
