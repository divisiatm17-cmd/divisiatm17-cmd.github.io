# AngkutAja — Pusat Kendali Admin & Mitra Pabrik

Aplikasi operasional resmi **AngkutAja** untuk **Admin** dan **Mitra Pabrik / Daur Ulang**.
Terhubung **real-time dua arah** dengan website warga lewat Supabase (backend yang sama).

> **Pembagian peran**
> - **Website** (`https://divisiatm17-cmd.github.io/`) → khusus **warga** yang memesan jasa. Tidak ada login admin.
> - **Aplikasi ini** → khusus **Admin** dan **Mitra Pabrik**. Tidak ada pemesanan warga di sini.

---

## 1. Alamat aplikasi

| Platform | Cara pasang | Alamat |
|---|---|---|
| Android | APK `AngkutAja-Admin.apk` | — |
| Android (tanpa APK) | Chrome → menu ⋮ → **Tambahkan ke layar utama** | https://divisiatm17-cmd.github.io/angkutaja-admin/ |
| iPhone / iPad | Safari → **Bagikan** → **Tambahkan ke Layar Utama** | https://divisiatm17-cmd.github.io/angkutaja-admin/ |
| iPhone (otomatis) | Buka **`AngkutAja-Admin-iOS.mobileconfig`** → Pengaturan → Profil → Pasang | — |

## 2. Akun

| Peran | Email | Kata sandi | Akses |
|---|---|---|---|
| **Admin** | `admin@angkutaja.id` | `admin123` | Pesanan, Inventori, Notifikasi, Profil |
| **Mitra Pabrik** | `mitra@angkutaja.id` | `mitra123` | Pasokan mitra, Booking perusahaan, Notifikasi, Profil |

Ganti kata sandi di `app.js` bagian `ACCOUNTS` bila perlu.

## 3. Fitur

- **Pesanan warga** — daftar real-time, filter per status, statistik (menunggu / berjalan / selesai / nilai selesai).
- **Detail & ubah status** — `Menunggu → Dikonfirmasi → Dijemput → Selesai / Dibatalkan` + catatan admin, langsung tersinkron ke website.
- **Notifikasi pesanan baru** — popup + suara + badge, otomatis saat warga memesan di website.
- **Chat WhatsApp** — tombol langsung ke nomor warga dari kartu pesanan.
- **Inventori daur ulang** — stok pasokan, berat, harga/kg, estimasi nilai.
- **Mitra pabrik** — daftar pasokan siap dijemput + booking perusahaan.
- **PWA** — bisa dipasang di layar utama Android & iPhone, tetap jalan saat offline (shell), data selalu dari jaringan.

## 4. Sinkronisasi (cara kerjanya)

Kedua aplikasi memakai **satu project Supabase**:

```
Website warga ──tulis──▶  Supabase (tabel orders)  ──realtime──▶  Aplikasi Admin
Aplikasi Admin ─tulis──▶  Supabase (tabel orders)  ──realtime──▶  Website warga
```

Tabel yang dipakai bersama:

| Tabel | Isi | Dipakai oleh |
|---|---|---|
| `orders` | Pesanan warga | Website tulis · Admin baca/ubah |
| `users_warga` | Akun warga | Website tulis · Admin baca |
| `app_notifications` | Pemberitahuan | Keduanya |
| `waste_inventory` | Stok pasokan daur ulang | Admin tulis · Mitra baca |
| `company_bookings` | Pengajuan perusahaan | Mitra baca |

Konfigurasi Supabase tertanam di `app.js` (`SUPA_URL`, `SUPA_KEY`) — diambil dari `.env` website agar tidak ada salah sambung.

## 5. Struktur berkas

```
admin-app/
├── index.html              # shell aplikasi + form login
├── styles.css              # desain gelap, ikon SVG (tanpa emoji)
├── app.js                  # logika, realtime Supabase, semua peran
├── manifest.webmanifest    # PWA
├── sw.js                   # service worker
├── icons/                  # ikon 192/512 + maskable
├── assets/supabase.js      # Supabase JS (vendored, jalan tanpa CDN)
└── AngkutAja-Admin-iOS.mobileconfig
```

## 6. Menjalankan lokal

```bash
cd admin-app
python3 -m http.server 4180
# buka http://127.0.0.1:4180
```

## 7. Deploy

Aplikasi ini adalah berkas statis. Salin seluruh isi folder ke hosting apa pun
(GitHub Pages, Netlify, Vercel, EdgeOne). Sudah terpasang di:

```
https://divisiatm17-cmd.github.io/angkutaja-admin/
```

## 8. Android (APK)

Source di `../android-admin/` (Java + AndroidX WebView). Build:

```bash
cd ../android-admin
export JAVA_HOME=~/.local/toolchain/jdk17
export ANDROID_HOME=~/android-sdk
./gradlew assembleRelease
# hasil: app/build/outputs/apk/release/app-release.apk
```

Keystore: `../keystore/angkutaja-release.jks` (alias `angkutaja`).
**Simpan keystore ini** — tanpa itu aplikasi tidak bisa diperbarui di perangkat yang sama.

---

Dikembangkan oleh **Rizqillah** — AngkutAja, Sidoarjo.
