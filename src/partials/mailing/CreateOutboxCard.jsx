import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createOutboxApi } from '../../api/outbox';
import { getCategoriesApi } from '../../api/category';
import { getOrganizationApi } from '../../api/organization';
import { Editor } from '@tinymce/tinymce-react';

import { SyncLoader } from "react-spinners";

export default function CreateOutboxCard() {
  const [form, setForm] = useState({
    number: '',
    category: '',
    date: '',
    destination: '',
    summary: '',
    sign: '',
    attachments: [],
  });

  const [categories, setCategories] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesApi();
        setCategories(res.data);
      } catch {
        toast.error('Gagal memuat kategori');
      }
    };

    const fetchOrganization = async () => {
      try {
        const res = await getOrganizationApi();
        setOrganization(res.data);
      } catch {
        toast.error('Gagal memuat data organisasi');
      }
    };

    fetchCategories();
    fetchOrganization();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachments') {
      setForm({ ...form, attachments: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    const numberRegex = /^\d{1,4}\/[A-Z]{2,5}\/[A-Z]\/(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\/\d{4}$/;

    if (!form.number) {
      newErrors.number = "Nomor surat wajib diisi";
    } else if (!numberRegex.test(form.number)) {
      newErrors.number = "Format nomor surat salah.";
    }
    if (!form.category) newErrors.category = 'Kategori wajib dipilih';
    if (!form.date) newErrors.date = 'Tanggal surat wajib diisi';
    if (!form.destination) newErrors.destination = 'Tujuan wajib diisi';
    if (!form.summary) newErrors.summary = 'Ringkasan isi wajib diisi';
    if (!editorContent) newErrors.content = 'Isi surat wajib diisi';

    if (!organization) {
      toast.error('Data organisasi belum dimuat');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Harap isi semua kolom wajib!');
      return;
    }

    setErrors({});
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'attachments') {
        Array.from(value).forEach((file) => data.append('attachments', file));
      } else {
        data.append(key, value);
      }
    });
    data.append('content', editorContent);
    data.append('orgName', organization.name);
    data.append('orgNumber', organization.number);
    data.append('orgAddress', organization.address);
    data.append('orgEmail', organization.email);
    if (organization.logo) data.append('orgLogoUrl', organization.logo);

    try {
      setSubmitting(true);
      await createOutboxApi(data);
      toast.success('Surat keluar berhasil dibuat');
      setForm({
        number: '',
        category: '',
        date: '',
        destination: '',
        summary: '',
        sign: '',
        attachments: [],
      });
      setEditorContent('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Gagal membuat surat keluar');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tambah Surat Keluar</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Nomor Surat</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${errors.number ? 'border border-red-500' : ''}`}
          />
          {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${errors.category ? 'border border-red-500' : ''}`}
          >
            <option value="">Pilih kategori surat</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tanggal Surat</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${errors.date ? 'border border-red-500' : ''}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Tujuan</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${errors.destination ? 'border border-red-500' : ''}`}
          />
          {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Ringkasan Isi</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows="3"
            className={`w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100 ${errors.summary ? 'border border-red-500' : ''}`}
          />
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Isi Surat</label>
          <div className={`bg-white dark:bg-gray-700 border ${errors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md overflow-hidden text-sm`}>
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
              value={editorContent}
              onEditorChange={setEditorContent}
              init={{
                height: 500,
                menubar: false,
                plugins: 'lists table advlist',
                toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist | table | removeformat',
                content_style: 'body { font-family:Times New Roman,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Penandatangan</label>
          <select
            name="sign"
            value={form.sign}
            onChange={handleChange}
            className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
          >
            <option value="Hj. Marfu’ah, S.Pd.SD">Ketua - Hj. Marfu’ah, S.Pd.SD</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">Lampiran (opsional)</label>
          <input
            type="file"
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
            "Buat Surat"
          )}
        </button>
      </div>
    </div>
  );
}
