"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import UrgencyBadge from "@/components/UrgencyBadge";
import { KATEGORI_OPTIONS, AKTOR_OPTIONS } from "@/data/cases";
import { Case } from "@/types/case";
import styles from "./cases.module.css";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CaseCard({ kasus }: { kasus: Case }) {
  return (
    <Link href={`/cases/${kasus.id_kasus}`} className={styles.cardLink}>
      <article className={`case-card ${styles.card}`}>
        <div>
          <div className={styles.cardMeta}>
            <span className={styles.caseId}>{kasus.id_kasus}</span>
            <UrgencyBadge urgensi={kasus.urgensi} />
            <span className={styles.actorBadge}>{kasus.aktor}</span>
          </div>
          <h2 className={styles.cardTitle}>{kasus.judul}</h2>
          <p className={styles.cardDesc}>{kasus.keterangan}</p>
          <div className={styles.cardFooter}>
            <span className={styles.cardMono}>{formatDate(kasus.tanggal)}</span>
            <span className={styles.cardMono}>
              {kasus.lokasi_kota ? `${kasus.lokasi_kota}, ` : ""}
              {kasus.lokasi_provinsi}
            </span>
            <span className={styles.cardMono}>{kasus.kategori_utama}</span>
            <span className={styles.cardCta}>Buka Kasus →</span>
          </div>
        </div>
        <div className={`case-card-right ${styles.cardRight}`}>
          <span
            className={
              kasus.terverifikasi === "Ya"
                ? styles.verifiedYa
                : kasus.terverifikasi === "Proses"
                  ? styles.verifiedProses
                  : styles.verifiedBelum
            }
          >
            {kasus.terverifikasi === "Ya"
              ? "✓ Terverifikasi"
              : kasus.terverifikasi === "Proses"
                ? "⏳ Proses"
                : "Belum"}
          </span>
          <span className={styles.cardStatus}>{kasus.status_penanganan}</span>
        </div>
      </article>
    </Link>
  );
}

export default function CasesClient({
  initialCases,
}: {
  initialCases: Case[];
}) {
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("Semua Kategori");
  const [filterAktor, setFilterAktor] = useState("Semua Aktor");

  const filtered = useMemo(() => {
    return initialCases.filter((c) => {
      const matchSearch =
        !search ||
        c.judul.toLowerCase().includes(search.toLowerCase()) ||
        c.keterangan.toLowerCase().includes(search.toLowerCase()) ||
        (c.lokasi_kota ?? "").toLowerCase().includes(search.toLowerCase());

      const matchKategori =
        filterKategori === "Semua Kategori" ||
        c.kategori_utama === filterKategori;

      const matchAktor =
        filterAktor === "Semua Aktor" || c.aktor.includes(filterAktor);

      return matchSearch && matchKategori && matchAktor;
    });
  }, [search, filterKategori, filterAktor, initialCases]);

  return (
    <div className={styles.page}>
      <main className={`cases-main ${styles.main}`}>
        <div className={styles.pageHeader}>
          <p className={styles.pageSection}>Database Kasus</p>
          <h1 className={styles.pageTitle}>Kasus Tercatat</h1>
          <p className={styles.pageSubtitle}>
            {initialCases.length} kasus terdokumentasi · diperbarui berkala
          </p>
        </div>

        <div className={`cases-filters ${styles.filterBar}`}>
          <input
            className={`cases-search ${styles.searchInput}`}
            type="text"
            placeholder="Cari kasus, lokasi, deskripsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filter-selects">
            <div className="select-wrapper">
              <select
                className={styles.select}
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
              >
                {KATEGORI_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-wrapper">
              <select
                className={styles.select}
                value={filterAktor}
                onChange={(e) => setFilterAktor(e.target.value)}
              >
                {AKTOR_OPTIONS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(search ||
            filterKategori !== "Semua Kategori" ||
            filterAktor !== "Semua Aktor") && (
            <button
              className={styles.resetBtn}
              onClick={() => {
                setSearch("");
                setFilterKategori("Semua Kategori");
                setFilterAktor("Semua Aktor");
              }}
            >
              Reset filter
            </button>
          )}
        </div>

        <p className={styles.resultsCount}>
          Menampilkan {filtered.length} dari {initialCases.length} kasus
        </p>

        <div>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              Tidak ada kasus yang sesuai filter.
            </div>
          ) : (
            filtered.map((kasus) => (
              <CaseCard key={kasus.id_kasus} kasus={kasus} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
