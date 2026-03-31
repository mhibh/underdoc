"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { AKTOR_OPTIONS, KATEGORI_OPTIONS } from "@/data/cases";
import { Case } from "@/types/case";
import styles from "./violations.module.css";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--mid)",
        background: "var(--paper-dark)",
      }}
    >
      Memuat peta...
    </div>
  ),
});

export default function ViolationsClient({ initialCases }: { initialCases: Case[] }) {
  const [filterAktor, setFilterAktor] = useState("Semua Aktor");
  const [filterKategori, setFilterKategori] = useState("Semua Kategori");
  const [filterProvinsi, setFilterProvinsi] = useState("Semua Provinsi");

  const provinsiOptions = useMemo(() => {
    const unique = Array.from(new Set(initialCases.map((c) => c.lokasi_provinsi))).sort();
    return ["Semua Provinsi", ...unique];
  }, [initialCases]);

  const filteredCases = useMemo(() => {
    return initialCases.filter((c) => {
      const matchAktor =
        filterAktor === "Semua Aktor" || c.aktor.includes(filterAktor);
      const matchKategori =
        filterKategori === "Semua Kategori" || c.kategori_utama === filterKategori;
      const matchProvinsi =
        filterProvinsi === "Semua Provinsi" || c.lokasi_provinsi === filterProvinsi;
      return matchAktor && matchKategori && matchProvinsi;
    });
  }, [filterAktor, filterKategori, filterProvinsi, initialCases]);

  return (
    <div className={styles.page}>

      <main className={`detail-main ${styles.main}`}>
        <div className={styles.pageHeader}>
          <p className={styles.pageEyebrow}>Peta Pelanggaran</p>
          <h1 className={styles.pageTitle}>Peta Pelanggaran Indonesia</h1>
          <p className={styles.pageSubtitle}>
            {initialCases.length} insiden terdokumentasi · {filteredCases.length} ditampilkan
          </p>
        </div>

        <div className={styles.filterBar}>
          <div className="select-wrapper">
            <select
              className={styles.filterSelect}
              value={filterAktor}
              onChange={(e) => setFilterAktor(e.target.value)}
            >
              {AKTOR_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              className={styles.filterSelect}
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
            >
              {KATEGORI_OPTIONS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              className={styles.filterSelect}
              value={filterProvinsi}
              onChange={(e) => setFilterProvinsi(e.target.value)}
            >
              {provinsiOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <MapClient
          filteredCases={filteredCases}
          allCases={initialCases}
          activeFilters={{ aktor: filterAktor, kategori: filterKategori, provinsi: filterProvinsi }}
        />
      </main>
    </div>
  );
}
