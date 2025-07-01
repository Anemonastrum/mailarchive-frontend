import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getInboxByIdApi, updateInboxApi } from "../../api/inbox";
import { getOutboxByIdApi, updateOutboxApi } from "../../api/outbox";
import { getCategoriesApi } from "../../api/category";
import { getOrganizationApi } from "../../api/organization";
import { Editor } from "@tinymce/tinymce-react";

import { BeatLoader } from 'react-spinners';

export default function EditMailCard({ mailId, type, onClose, onUpdated }) {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, orgRes] = await Promise.all([
          getCategoriesApi(),
          getOrganizationApi(),
        ]);
        setCategories(catRes.data);
        setOrganization(orgRes.data);

        if (type === "inbox") {
          const res = await getInboxByIdApi(mailId);
          const inbox = res.data.inbox;
          setForm({
            number: inbox.number,
            category: inbox.category,
            date: inbox.date?.substring(0, 10),
            recievedDate: inbox.recievedDate?.substring(0, 10),
            origin: inbox.origin,
            summary: inbox.summary,
            attachments: [],
            mailPic: null,
          });
        } else {
          const res = await getOutboxByIdApi(mailId);
          const outbox = res.data.outbox;
          setForm({
            number: outbox.number,
            category: outbox.category,
            date: outbox.date?.substring(0, 10),
            destination: outbox.destination,
            summary: outbox.summary,
            attachments: [],
          });
          setEditorContent(outbox.content || "");
        }
      } catch (err) {
        toast.error("Gagal memuat data surat");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [mailId, type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "attachments" ? files : name === "mailPic" ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    for (const [key, value] of Object.entries(form)) {
      if (key === "attachments") {
        Array.from(value).forEach((file) => data.append("attachments", file));
      } else if (key !== "mailPic") {
        data.append(key, value);
      }
    }

    if (form.mailPic) {
      data.append("mailPic", form.mailPic);
    }

    if (type === "outbox") {
      if (!editorContent) return toast.error("Isi surat tidak boleh kosong!");
      data.append("content", editorContent);

      if (organization) {
        data.append("orgName", organization.name);
        data.append("orgNumber", organization.number);
        data.append("orgAddress", organization.address);
        data.append("orgEmail", organization.email);
        if (organization.logo) data.append("orgLogoUrl", organization.logo);
      }
    }

    try {
      setSubmitting(true);
      if (type === "inbox") {
        await updateInboxApi(mailId, data);
      } else {
        await updateOutboxApi(mailId, data);
      }
      toast.success("Surat berhasil diperbarui");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal memperbarui surat");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow flex justify-center items-center min-h-[300px] bg-white dark:bg-gray-800 rounded-xl shadow">
      <BeatLoader size={12} color="#a6e3a1" />
    </div>
  );

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Edit {type === "inbox" ? "Surat Masuk" : "Surat Keluar"}
        </h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="number"
          label="Nomor Surat"
          value={form.number}
          onChange={handleChange}
        />
        <Select
          name="category"
          label="Kategori"
          value={form.category}
          onChange={handleChange}
          options={categories}
        />

        <Input
          type="date"
          name="date"
          label="Tanggal Surat"
          value={form.date}
          onChange={handleChange}
        />

        {type === "inbox" ? (
          <>
            <Input
              type="date"
              name="recievedDate"
              label="Tanggal Diterima"
              value={form.recievedDate}
              onChange={handleChange}
            />
            <Input
              name="origin"
              label="Asal Surat"
              value={form.origin}
              onChange={handleChange}
            />
            <TextArea
              name="summary"
              label="Ringkasan Isi"
              value={form.summary}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Foto Surat Baru
              </label>
              <input
                type="file"
                name="mailPic"
                accept="image/*"
                onChange={handleChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          </>
        ) : (
          <>
            <Input
              name="destination"
              label="Tujuan Surat"
              value={form.destination}
              onChange={handleChange}
            />
            <TextArea
              name="summary"
              label="Ringkasan Isi"
              value={form.summary}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Isi Surat
              </label>
              <Editor
                apiKey={import.meta.env.VITE_TINYMCE_APIKEY}
                value={editorContent}
                onEditorChange={setEditorContent}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: "lists table advlist",
                  toolbar:
                    "undo redo | formatselect | bold italic underline | bullist numlist | table | removeformat",
                  content_style:
                    "body { font-family:Times New Roman,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Penandatangan
              </label>
              <select
                name="sign"
                value={form.sign}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
              >
                <option value="">Pilih penandatangan</option>
                <option value="Hj. Marfu’ah, S.Pd.SD">
                  Ketua - Hj. Marfu’ah, S.Pd.SD
                </option>
              </select>
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Lampiran Baru
          </label>
          <input
            type="file"
            name="attachments"
            multiple
            onChange={handleChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700/60 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white px-5 py-2 rounded-md text-sm font-semibold"
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md text-sm font-semibold disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

// Reusable components
const Input = ({ name, label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
    />
  </div>
);

const Select = ({ name, label, value, onChange, options }) => (
  <div>
    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
    >
      <option value="">Pilih kategori</option>
      {options.map((opt) => (
        <option key={opt._id} value={opt.name}>
          {opt.name}
        </option>
      ))}
    </select>
  </div>
);

const TextArea = ({ name, label, value, onChange }) => (
  <div className="md:col-span-2">
    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value || ""}
      onChange={onChange}
      rows="3"
      className="w-full bg-gray-100 dark:bg-gray-700 px-3 py-3 rounded-md text-sm text-gray-800 dark:text-gray-100"
    />
  </div>
);
