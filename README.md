# 📁 E-ARSIP - PCA Mojotengah (Frontend)

Aplikasi manajemen arsip digital untuk PCA Mojotengah. Proyek ini adalah bagian frontend dari sistem E-ARSIP, dibangun dengan React.js dan Tailwind CSS untuk mendukung pengelolaan surat masuk dan keluar secara efisien.

## 🚀 Teknologi yang Digunakan

- ⚛️ React.js
- 🎨 Tailwind CSS
- 🧭 React Router DOM
- 🔐 Context API (Autentikasi)
- 🔔 react-hot-toast (Notifikasi)

## 🖥️ Tampilan Login

Tampilan login terdiri dari dua bagian:
- Kiri: Logo & identitas organisasi
- Kanan: Form login dengan validasi dan ikon

![Tampilan Login](https://user-images.githubusercontent.com/.../login-preview.png)

## 📦 Instalasi & Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/Anemonastrum/mailarchive-frontend.git
cd mailarchive-frontend
2. Install Dependencies
bash
Salin
Edit
npm install
3. Jalankan Aplikasi
bash
Salin
Edit
npm run dev
# atau
npm start
4. Akses di Browser
bash
Salin
Edit
http://localhost:5173
🔐 Autentikasi
Sistem login akan memeriksa kredensial ke backend.

Menggunakan Context API untuk manajemen sesi.

Jika login berhasil, pengguna diarahkan ke halaman dashboard.

🧱 Struktur Direktori Utama
csharp
Salin
Edit
mailarchive-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   ├── context/            # Auth context
│   ├── pages/              # Halaman aplikasi
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
└── tailwind.config.js      # Konfigurasi Tailwind
✨ Fitur yang Sudah Diimplementasikan
✅ Tampilan login responsif

✅ Mode terang & gelap (bg-white dark:bg-gray-800)

✅ Autentikasi user (dengan Context API)

✅ Validasi form dengan notifikasi

✅ Desain UI bersih dan modern

🛠️ Rencana Pengembangan Selanjutnya
 Integrasi halaman dashboard

 CRUD surat masuk/keluar

 Upload dokumen arsip

 Manajemen user & peran

 Statistik arsip dan laporan

🤝 Kontribusi
Silakan fork dan kirim pull request jika ingin berkontribusi. Pastikan perubahan telah diuji dengan baik.

📄 Lisensi
MIT © 2025 - PCA Mojotengah
