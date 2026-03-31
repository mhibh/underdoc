# UNDERDOC — Project Brief v2

_Diperbarui: 31 Maret 2026_

Paste dokumen ini sebagai konteks pertama ketika membuka chat baru atau sesi Claude Code baru.

---

## Tentang Project

**Nama:** Underdoc
**Tagline:** _"Perjuangan manusia melawan kekuasaan adalah perjuangan ingatan melawan lupa."_ — Milan Kundera
**Misi:** Platform independen pemantauan pelanggaran HAM, kesewenangan aparat (Polisi & TNI), dan kriminalisasi aktivis di Indonesia — berbasis data terverifikasi.
**Model data:** Kombinasi scraping media + laporan manual dari aktivis/korban
**Target user:** Aktivis & LSM, Masyarakat umum, Jurnalis & peneliti

---

## Status Project

### ✅ Sudah Selesai

**Halaman:**

- `/` — Homepage dengan quote Kundera, statistik sidebar (count-up animation), breaking bar, kasus terbaru, peta SVG mini, pola teridentifikasi, manifesto, footer
- `/cases` — Daftar kasus dengan filter kategori, aktor, search real-time, badge urgensi, reset filter, empty state
- `/cases/[id]` — Detail kasus dengan metadata card, kronologi, tags, sumber berita
- `/violations` — Peta pelanggaran interaktif dengan Leaflet.js, filter aktor/kategori/provinsi, panel provinsi
- `/about` — Metodologi verifikasi (4 langkah), prinsip kerja (4 prinsip), ruang lingkup pemantauan (6 kategori + ikon SVG), CTA manifesto

**Komponen:**

- `Navbar.tsx` — sticky di `/cases` dan `/cases/[id]`, tidak sticky di homepage
- `TickerBar.tsx` — animasi scrolling, data monitoring status
- `BottomNav.tsx` — bottom navigation bar untuk mobile, 4 item dengan SVG icon flat
- `UrgencyBadge.tsx` — badge Kritis/Tinggi/Berlangsung
- `Footer.tsx` — footer global

**Arsitektur kode:**

- CSS dipisah ke CSS Modules per halaman/komponen
- Setiap file CSS punya komentar section
- Setiap section di `page.tsx` punya komentar JSX
- Hardcoded data ditandai dengan `{/* TODO: replace with Supabase query */}`
- Homepage menggunakan `useCountUp` hook dengan IntersectionObserver untuk animasi angka statistik

### 🔄 Sedang Dikerjakan

- Koneksi ke Supabase (masih pakai data hardcode)

### ⏳ Belum Dikerjakan (Fase 2)

- Koneksi ke Supabase (masih pakai data hardcode di `src/data/cases.ts`)
- Migrasi data dari Google Sheet ke Supabase
- Dashboard admin (login, CRUD kasus, upload bukti)
- Form `/submit` untuk laporan publik (3 langkah)
- Halaman `/data` — open data, export CSV
- Strip metadata EXIF otomatis saat upload foto
- Deploy ke Vercel

### ⏳ Belum Dikerjakan (Fase 3)

- Scraping pipeline (Python + Scrapy)
- Antrian verifikasi otomatis
- API publik untuk jurnalis
- Halaman monitoring TNI terpisah

---

## Stack Teknologi

| Layer            | Teknologi                                                 | Keterangan                                      |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------- |
| Frontend         | Next.js (App Router) + TypeScript                         | SSR/SSG hybrid                                  |
| Styling          | Tailwind CSS + CSS Modules                                | Tailwind untuk layout, CSS Modules untuk visual |
| Peta             | Leaflet.js + react-leaflet                                | Open source, tidak perlu API key                |
| Database         | Supabase (PostgreSQL)                                     | Belum dikoneksi, masih hardcode                 |
| Storage bukti    | Supabase Storage (publik) + Google Drive (arsip internal) | Dua lapis                                       |
| Hosting          | Vercel                                                    | Belum di-deploy                                 |
| Scraper (Fase 3) | Python + Scrapy/Playwright                                | Belum dimulai                                   |

---

## Struktur Folder

```
underdoc/
├── src/
│   ├── app/
│   │   ├── globals.css              ← CSS variables, reset, base typography
│   │   ├── home.module.css          ← Styles khusus homepage
│   │   ├── layout.tsx               ← Root layout, font imports
│   │   ├── page.tsx                 ← Homepage (client component)
│   │   ├── cases/
│   │   │   ├── cases.module.css
│   │   │   ├── page.tsx             ← Server component, passes data ke CasesClient
│   │   │   ├── CasesClient.tsx      ← Client component (filter, search, state)
│   │   │   └── [id]/
│   │   │       ├── case-detail.module.css
│   │   │       └── page.tsx
│   │   ├── violations/
│   │   │   ├── violations.module.css
│   │   │   ├── page.tsx
│   │   │   ├── ViolationsClient.tsx ← Client component (filter state)
│   │   │   └── MapClient.tsx        ← Dynamic import, Leaflet (ssr: false)
│   │   └── about/
│   │       ├── about.module.css
│   │       └── page.tsx             ← Static, metodologi + prinsip + ruang lingkup
│   ├── components/
│   │   ├── Navbar.tsx + Navbar.module.css
│   │   ├── TickerBar.tsx + TickerBar.module.css
│   │   ├── BottomNav.tsx + BottomNav.module.css
│   │   ├── Footer.tsx + footer.module.css
│   │   └── UrgencyBadge.tsx
│   ├── data/
│   │   └── cases.ts                 ← 6 kasus hardcode, akan diganti Supabase
│   ├── lib/
│   │   └── supabase.ts              ← Supabase client (belum digunakan)
│   └── types/
│       └── case.ts                  ← TypeScript interfaces
├── public/
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Arsitektur Halaman

```
/                    → Homepage ✅
/cases               → Daftar & filter semua kasus ✅
/cases/[id]          → Detail kasus individual ✅
/violations          → Peta pelanggaran interaktif ✅
/about               → Tentang, metodologi, prinsip ✅
/submit              → Form laporan bertahap (Fase 2)
/data                → Open data, export CSV (Fase 3)
```

---

## Struktur Database (Tabel: `cases`)

```sql
id_kasus          TEXT PRIMARY KEY     -- AK-0001, AK-0002
tanggal           DATE
judul             TEXT
aktor             TEXT                 -- 'POLISI' | 'TNI' | 'POLISI,TNI'
satuan            TEXT                 -- Polda Metro, Kodam Jaya, dll
kategori_utama    TEXT                 -- lihat enum di bawah
tag_tambahan      TEXT                 -- multi-tag, pisah koma
keterangan        TEXT                 -- narasi kejadian
lokasi_kota       TEXT
lokasi_provinsi   TEXT
lat               FLOAT                -- koordinat untuk peta
lng               FLOAT                -- koordinat untuk peta
sumber_berita_1   TEXT                 -- URL artikel
sumber_berita_2   TEXT                 -- URL artikel tambahan
bukti_arsip       TEXT                 -- Link Google Drive (internal)
bukti_publik      TEXT                 -- URL Supabase Storage (publik)
jenis_bukti       TEXT                 -- foto | video | screenshot | dokumen
catatan_bukti     TEXT                 -- misal: "wajah sudah diblur"
status_penanganan TEXT                 -- Tidak ada respons | Proses | Selesai
urgensi           TEXT                 -- Kritis | Tinggi | Berlangsung
terverifikasi     TEXT                 -- Ya | Tidak | Proses
dibuat_pada       TIMESTAMP DEFAULT now()
diperbarui_pada   TIMESTAMP DEFAULT now()
```

### Enum Kategori Utama

1. Kekerasan & Penyalahgunaan Kekuasaan
2. Kriminalitas Aparat
3. Impunitas & Gagal Akuntabilitas
4. Demokrasi & Kebebasan Sipil
5. Diskriminasi & Kekerasan terhadap Perempuan dan Kaum Rentan

### Logika Aktor

Satu tabel, filter di level query:

```javascript
// Halaman polisi
supabase.from("cases").select("*").like("aktor", "%POLISI%");

// Halaman TNI
supabase.from("cases").select("*").like("aktor", "%TNI%");

// Kasus kolaborasi 'POLISI,TNI' → muncul di kedua halaman
```

---

## Design System

### Palet Warna

```css
--ink: #0f0f0e; /* primary text & backgrounds */
--paper: #f4f0e8; /* main background, like newsprint */
--paper-dark: #ede8dc; /* secondary surfaces */
--red: #c0392b; /* Kritis badge, alerts */
--teal: #1a6b6b; /* accent, verified, links, active nav */
--gold: #b8860b; /* Tinggi badge */
--mid: #6b6557; /* secondary text */
--rule: #ccc5b5; /* borders, dividers */
```

### Tipografi

```css
--font-serif: "Playfair Display" /* headline, quote — editorial */
  --font-mono: "DM Mono" /* label, metadata, badge — data credibility */
  --font-sans: "DM Sans" /* body text — readability */;
```

### Tone Visual

Editorial investigatif — seperti front page surat kabar investigasi kelas dunia. Bukan tech startup, bukan NGO generik. Serius, kredibel, berkarakter.

### Konvensi CSS

- Tailwind untuk layout (flex, grid, padding, margin, breakpoint)
- CSS Modules untuk visual (warna, tipografi, border, animasi, hover)
- Setiap file CSS punya komentar section dengan format:

```css
/* ── NAMA SECTION ──────────────────────────────
   Penjelasan singkat apa yang di-style di sini
   dan kenapa keputusan tertentu dibuat.
── ────────────────────────────────────────── */
```

### Konvensi JSX

Setiap section besar di page.tsx punya komentar:

```tsx
{
  /* ── NAMA SECTION ──────────────────────────────
    Penjelasan layout dan behavior section ini.
── ────────────────────────────────────────── */
}
```

Data hardcode ditandai:

```tsx
{
  /* TODO: replace with Supabase query */
}
```

---

## Keputusan Design yang Sudah Final

### Homepage

- **Headline:** Quote Milan Kundera — _"Perjuangan manusia melawan kekuasaan adalah perjuangan ingatan melawan lupa."_ (bukan headline biasa)
- **Breaking bar:** Data monitoring status (bukan daftar kasus) — jumlah kritis, laporan masuk, kasus aktif
- **Section kasus terbaru:** Dipertahankan meski ada /cases
- **Section peta mini:** Dipertahankan — kesan dashboard monitoring
- **Section "Pola yang Teridentifikasi":** Tag-based (bukan kategori), klik tag → filter di /cases
- **Section "Kasus Pilihan":** Dihapus — terlalu kompleks untuk di-maintain
- **Manifesto:** Dipertahankan — penting untuk kredibilitas

### Navigasi

- **Desktop:** Navbar horizontal, tidak sticky di homepage, sticky di /cases dan /cases/[id]
- **Mobile:** Bottom navigation bar (seperti aplikasi mobile), 4 item, SVG icon flat (bukan emoji)
- **Bottom nav items:** Beranda, Kasus, Peta, Tentang
- **Active state:** warna var(--teal), inactive rgba(255,255,255,0.5)

### Peta (/violations)

- Library: Leaflet.js (open source, tidak perlu API key)
- Tile: OpenStreetMap dengan filter grayscale
- Marker: CircleMarker, warna berdasarkan urgensi
- Klik marker: popup dengan judul + link ke detail kasus
- Panel kanan: top provinsi + kasus terbaru di area
- Export: tombol unduh peta sebagai PNG dengan watermark Underdoc

---

## Catatan Keamanan

1. **Metadata foto** — semua foto harus di-strip EXIF sebelum publish
2. **Identitas pelapor** — tidak disimpan bersama data kasus di database publik
3. **Bukti sensitif** — file mentah di Google Drive, versi bersih di Supabase Storage
4. **Anonimitas** — form submit Fase 2 harus mendukung pelaporan anonim

---

## Koordinat Kasus Hardcode (untuk Peta)

```typescript
AK-0001 Jakarta:  [-6.2088, 106.8456]
AK-0002 Morowali: [-2.9857, 121.8548]
AK-0003 Bekasi:   [-6.2383, 107.0000]
AK-0004 Jakarta:  [-6.1944, 106.8229]
AK-0005 Papua:    [-4.2699, 138.0804]
AK-0006 Jakarta:  [-6.2615, 106.8106]
```

---

## Next Steps (Prioritas)

1. **Setup Supabase** — buat tabel `cases`, koneksi ke Next.js (client sudah ada di `src/lib/supabase.ts`)
2. **Migrasi data** — input data nyata dari Google Sheet ke Supabase, ganti data hardcode
3. **Deploy ke Vercel** — biar bisa diakses publik
4. **Form /submit** — laporan publik bertahap (3 langkah)
5. **Halaman /data** — open data, export CSV

---

## Referensi File Penting

- `src/data/cases.ts` — data hardcode, referensi struktur untuk Supabase
- `src/types/case.ts` — TypeScript interfaces
- `src/app/globals.css` — CSS variables dan design tokens
- `public/` — aset statis
