"use client";

import Link from "next/link";
import styles from "./about.module.css";

const VERIFICATION_STEPS = [
  {
    number: "01",
    title: "INTAKE",
    description:
      "Laporan masuk melalui kanal aman dari korban, saksi, atau pemantauan media.",
  },
  {
    number: "02",
    title: "VERIFIKASI",
    description:
      "Setiap kasus diverifikasi silang dari minimal 2 sumber independen. Bila memungkinkan, dikonfirmasi langsung ke korban atau saksi.",
  },
  {
    number: "03",
    title: "KLASIFIKASI",
    description:
      "Kasus dikategorikan berdasarkan jenis pelanggaran, aktor, wilayah, dan tingkat urgensi.",
  },
  {
    number: "04",
    title: "PUBLIKASI",
    description:
      "Kasus yang terverifikasi dipublikasikan ke database publik. Yang belum terverifikasi ditandai eksplisit.",
  },
];

const PRINCIPLES = [
  {
    title: "BERBASIS BUKTI",
    description:
      "Tidak ada data yang masuk tanpa bukti sekunder yang dapat diverifikasi — baik berupa pemberitaan media, dokumen resmi, maupun rekaman digital.",
  },
  {
    title: "BERPIHAK PADA KORBAN",
    description:
      "Keselamatan dan otonomi mereka yang terdampak adalah prioritas utama. Prinsip Do No Harm adalah inti dari setiap keputusan editorial kami.",
  },
  {
    title: "INDEPENDEN",
    description:
      "Underdoc tidak berafiliasi dengan partai politik, pemerintah, atau lembaga donor manapun. Kami tidak menerima iklan.",
  },
  {
    title: "TRANSPARAN",
    description:
      "Metodologi kami terbuka untuk dikritisi. Setiap keputusan kategorisasi dapat dipertanyakan dan diperbaiki.",
  },
];

const MONITORING_SCOPE = [
  {
    title: "Kekerasan & Penyalahgunaan Kekuasaan",
    description: "Penyiksaan, kekerasan fisik, intimidasi, dan tindakan koersif aparat.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 19h12" />
        <path d="M8 15l4-10 4 10" />
        <path d="M9.5 11h5" />
      </svg>
    ),
  },
  {
    title: "Kriminalitas Aparat",
    description: "Pemerasan, penganiayaan, perdagangan pengaruh, dan tindak pidana lain.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="4" width="14" height="16" rx="1.5" />
        <path d="M9 9h6" />
        <path d="M9 13h6" />
        <path d="M9 17h3" />
      </svg>
    ),
  },
  {
    title: "Impunitas & Gagal Akuntabilitas",
    description: "Mandeknya proses hukum, pengaburan tanggung jawab, dan pembiaran institusional.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v8l5 3" />
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
  {
    title: "Demokrasi & Kebebasan Sipil",
    description: "Pembubaran aksi, kriminalisasi ekspresi, sensor, dan represi politik.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 20V8" />
        <path d="M6 8c4-3 8 3 12 0v8c-4 3-8-3-12 0" />
      </svg>
    ),
  },
  {
    title: "Diskriminasi & Kekerasan terhadap Perempuan dan Kaum Rentan",
    description: "Pelanggaran berbasis gender, identitas, kerentanan sosial, dan stigma.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v8" />
        <path d="M8.5 17.5h7" />
      </svg>
    ),
  },
  {
    title: "Konflik Lahan & Hak Masyarakat Adat",
    description: "Perampasan ruang hidup, intimidasi komunitas, dan kekerasan dalam sengketa lahan.",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 16l8-10 8 10" />
        <path d="M7 16v4h10v-4" />
        <path d="M12 10v10" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>

      <main className={`cases-main ${styles.main}`}>
        {/* ── HEADER SECTION ─────────────────────────────── */}
        {/* Pembuka halaman: kicker, headline manifesto, dan deskripsi singkat posisi Underdoc. */}
        <section className={styles.heroSection}>
          <p className={styles.heroKicker}>Tentang Underdoc</p>
          <h1 className={styles.heroTitle}>Dokumentasi adalah Perlawanan</h1>
          <p className={styles.heroSubtitle}>
            Underdoc adalah inisiatif independen yang didedikasikan untuk mencatat,
            memverifikasi, dan mengarsipkan pelanggaran HAM yang dilakukan oleh aparat
            negara di Indonesia.
          </p>
        </section>

        {/* ── KEBERADAAN KAMI ───────────────────────────── */}
        {/* Dua kolom editorial untuk menjelaskan alasan dan posisi keberadaan platform. */}
        <section className={styles.reasonSection}>
          <div className={styles.sectionLabel}>Keberadaan Kami</div>
          <div className={styles.reasonGrid}>
            <div>
              <h2 className={styles.sectionTitle}>Mengapa Kami Ada</h2>
            </div>
            <div className={styles.reasonBody}>
              <p>
                Underdoc lahir dari kesadaran bahwa banyak kasus pelanggaran aparat yang
                tidak pernah sampai ke pengadilan — bukan karena tidak terjadi, tetapi
                karena tidak tercatat. Impunitas tumbuh subur di atas kelupaan.
              </p>
              <p>
                Dengan mendokumentasikan pola-pola kesewenangan secara sistematis, kami
                melampaui insiden terisolasi dan mengungkap mesin kriminalisasi yang
                bekerja di baliknya.
              </p>
            </div>
          </div>
        </section>

        {/* ── METODOLOGI VERIFIKASI ─────────────────────── */}
        {/* Empat langkah kerja inti dari laporan masuk hingga publikasi ke database. */}
        <section id="methodology" className={styles.methodSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Metodologi Verifikasi</p>
            <h2 className={styles.sectionTitle}>Bagaimana Kami Memverifikasi</h2>
          </div>

          <div className={styles.stepsGrid}>
            {VERIFICATION_STEPS.map((step) => (
              <article key={step.number} className={styles.stepCard}>
                <div className={styles.stepMeta}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                </div>
                <p className={styles.stepText}>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── PRINSIP KERJA ─────────────────────────────── */}
        {/* Grid prinsip editorial dan etika yang menjadi dasar pengambilan keputusan. */}
        <section id="principles" className={styles.principlesSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Prinsip Kerja</p>
            <h2 className={styles.sectionTitle}>Prinsip yang Kami Pegang</h2>
          </div>

          <div className={styles.principlesGrid}>
            {PRINCIPLES.map((principle) => (
              <article key={principle.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleText}>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── RUANG LINGKUP PEMANTAUAN ──────────────────── */}
        {/* Daftar kategori pelanggaran yang dipantau, dilengkapi ikon garis sederhana. */}
        <section className={styles.scopeSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Apa yang Kami Catat</p>
            <h2 className={styles.sectionTitle}>Ruang Lingkup Pemantauan</h2>
          </div>

          <div className={styles.scopeGrid}>
            {MONITORING_SCOPE.map((item) => (
              <article key={item.title} className={styles.scopeItem}>
                <div className={styles.scopeIcon}>{item.icon}</div>
                <div>
                  <h3 className={styles.scopeTitle}>{item.title}</h3>
                  <p className={styles.scopeText}>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CLOSING CTA ───────────────────────────────── */}
        {/* Penutup bernuansa manifesto untuk mengarahkan pengguna ke database dan kanal pelaporan. */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaDecor} aria-hidden="true">
            &ldquo;
          </div>
          <div className={styles.ctaInner}>
            <blockquote className={styles.ctaQuote}>
              Kami tidak menyimpan nama. Kami menyimpan fakta.
            </blockquote>

            <div className={styles.ctaActions}>
              <Link href="/cases" className={styles.ctaPrimary}>
                Lihat Database Kasus
              </Link>
              <Link href="/submit" className={styles.ctaSecondary}>
                Laporkan Pelanggaran
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
