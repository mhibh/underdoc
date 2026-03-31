"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { Case } from "@/types/case";
import UrgencyBadge from "@/components/UrgencyBadge";
import styles from "./violations.module.css";

// ── Marker colors keyed by urgensi ─────────────────────────
const URGENSI_COLOR: Record<string, string> = {
  Kritis:      "#c0392b",
  Tinggi:      "#b8860b",
  Berlangsung: "#1a6b6b",
};

// ── Category labels shortened for the stats grid ───────────
const KATEGORI_SHORT: Record<string, string> = {
  "Kekerasan & Penyalahgunaan Kekuasaan":                        "Kekerasan & Kekuasaan",
  "Demokrasi & Kebebasan Sipil":                                 "Kebebasan Sipil",
  "Impunitas & Gagal Akuntabilitas":                             "Impunitas",
  "Diskriminasi & Kekerasan terhadap Perempuan dan Kaum Rentan": "Diskriminasi Gender",
  "Kriminalitas Aparat":                                         "Kriminalitas Aparat",
};

// ── Custom zoom buttons using Leaflet's useMap hook ────────
function ZoomControls() {
  const map = useMap();
  return (
    <div className={styles.zoomControls}>
      <button className={styles.zoomBtn} onClick={() => map.zoomIn()} aria-label="Zoom in">+</button>
      <button className={styles.zoomBtn} onClick={() => map.zoomOut()} aria-label="Zoom out">−</button>
    </div>
  );
}

// ── Province stats derived from all cases ─────────────────
function buildProvinceStats(allCases: Case[]) {
  const counts: Record<string, number> = {};
  allCases.forEach((c) => {
    counts[c.lokasi_provinsi] = (counts[c.lokasi_provinsi] ?? 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}

// ── Category stats derived from all cases ─────────────────
function buildKategoriStats(allCases: Case[]) {
  const counts: Record<string, number> = {};
  allCases.forEach((c) => {
    counts[c.kategori_utama] = (counts[c.kategori_utama] ?? 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

// ── Download icon SVG ──────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M12 3v13M7 11l5 5 5-5" />
      <rect x="3" y="18" width="18" height="3" rx="0.5" />
    </svg>
  );
}

// ── Props ──────────────────────────────────────────────────
interface Props {
  filteredCases: Case[];
  allCases: Case[];
  activeFilters: { aktor: string; kategori: string; provinsi: string };
}

export default function MapClient({ filteredCases, allCases, activeFilters }: Props) {
  // State UI untuk memilih kasus aktif dan status ekspor gambar.
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [exporting, setExporting] = useState(false);

  // Referensi ke area peta yang akan ditangkap saat pengguna mengekspor tampilan ke PNG.
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  // Hanya kasus yang memiliki koordinat yang bisa ditampilkan sebagai marker pada peta.
  const mappableCases = filteredCases.filter(
    (c): c is Case & { lat: number; lng: number } =>
      c.lat !== undefined && c.lng !== undefined
  );

  // Data turunan untuk panel statistik dan visualisasi ringkas di bawah peta.
  const provinceStats = buildProvinceStats(allCases);
  const maxProvinceCount = provinceStats[0]?.[1] ?? 1;
  const kategoriStats = buildKategoriStats(allCases);

  // ── Export map as PNG using html2canvas ─────────────────
  const handleExport = useCallback(async () => {
    if (!mapWrapperRef.current || exporting) return;
    setExporting(true);

    try {
      const html2canvas = (await import("html2canvas")).default;

      // Build active filter label string
      const filterParts: string[] = [];
      if (activeFilters.aktor !== "Semua Aktor") filterParts.push(`Aktor: ${activeFilters.aktor}`);
      if (activeFilters.kategori !== "Semua Kategori") filterParts.push(`Kategori: ${activeFilters.kategori}`);
      if (activeFilters.provinsi !== "Semua Provinsi") filterParts.push(`Provinsi: ${activeFilters.provinsi}`);
      const filterLabel = filterParts.length ? filterParts.join(" · ") : "Semua Insiden";
      const dateLabel = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

      // Capture the map area
      const canvas = await html2canvas(mapWrapperRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#f4f0e8",
        scale: 2,
        ignoreElements: (el) => el.classList.contains(styles.zoomControls),
      });

      // Create final canvas with watermark header + footer
      const W = canvas.width;
      const HEADER = 80;
      const FOOTER = 44;
      const final = document.createElement("canvas");
      final.width  = W;
      final.height = canvas.height + HEADER + FOOTER;
      const ctx = final.getContext("2d")!;

      // Background fill
      ctx.fillStyle = "#f4f0e8";
      ctx.fillRect(0, 0, final.width, final.height);

      // Header — logo + title
      ctx.fillStyle = "#0f0f0e";
      ctx.font = `bold 22px Georgia, serif`;
      ctx.fillText("UNDERDOC", 32, 38);
      ctx.fillStyle = "#6b6557";
      ctx.font = `12px monospace`;
      ctx.fillText("Peta Pelanggaran Indonesia", 32, 58);
      // Active filter label (right-aligned)
      ctx.textAlign = "right";
      ctx.fillStyle = "#6b6557";
      ctx.font = `11px monospace`;
      ctx.fillText(filterLabel, W - 32, 48);
      ctx.textAlign = "left";

      // Header rule
      ctx.strokeStyle = "#0f0f0e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, HEADER - 2);
      ctx.lineTo(W, HEADER - 2);
      ctx.stroke();

      // Map image
      ctx.drawImage(canvas, 0, HEADER);

      // Footer rule
      const footerY = HEADER + canvas.height;
      ctx.strokeStyle = "#ccc5b5";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, footerY);
      ctx.lineTo(W, footerY);
      ctx.stroke();

      // Footer — date left, source right
      ctx.fillStyle = "#6b6557";
      ctx.font = `10px monospace`;
      ctx.fillText(dateLabel, 32, footerY + 26);
      ctx.textAlign = "right";
      ctx.fillText("underdoc.id", W - 32, footerY + 26);
      ctx.textAlign = "left";

      // Download
      const link = document.createElement("a");
      link.download = `underdoc-peta-${Date.now()}.png`;
      link.href = final.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }, [exporting, activeFilters]);

  return (
    <>
      {/* ── EXPORT BUTTON ────────────────────────────────── */}
      {/* Tombol untuk menyimpan tampilan peta saat ini sebagai gambar PNG. */}
      <div className={styles.exportRow}>
        <button
          className={styles.exportBtn}
          onClick={handleExport}
          disabled={exporting}
        >
          <DownloadIcon />
          {exporting ? "Mengekspor..." : "Unduh Peta"}
        </button>
      </div>

      {/* ── MAP + PANEL ──────────────────────────────────── */}
      {/* Layout desktop: peta di kiri dan panel ringkasan kasus di kanan. */}
      <div className={styles.mapLayout}>
        {/* Peta utama dengan tile OpenStreetMap dan marker untuk setiap kasus berkoordinat. */}
        <div className={styles.mapWrapper} ref={mapWrapperRef}>
          <MapContainer
            center={[-2.5489, 118.0149]}
            zoom={5}
            zoomControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <ZoomControls />

            {/* Marker menampilkan persebaran kasus; klik marker akan memilih kasus aktif. */}
            {mappableCases.map((kasus) => (
              <CircleMarker
                key={kasus.id_kasus}
                center={[kasus.lat, kasus.lng]}
                radius={10}
                pathOptions={{
                  fillColor: URGENSI_COLOR[kasus.urgensi] ?? "#6b6557",
                  fillOpacity: 0.85,
                  color: "white",
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => setSelectedCase(kasus),
                }}
              >
                <Popup>
                  <div className={styles.popup}>
                    <div className={styles.popupMeta}>
                      <span className={styles.popupId}>{kasus.id_kasus}</span>
                      <UrgencyBadge urgensi={kasus.urgensi} />
                    </div>
                    <div className={styles.popupTitle}>{kasus.judul}</div>
                    <div className={styles.popupLoc}>
                      {kasus.lokasi_kota}, {kasus.lokasi_provinsi}
                    </div>
                    <Link href={`/cases/${kasus.id_kasus}`} className={styles.popupLink}>
                      Buka Kasus →
                    </Link>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Panel samping: provinsi (static) + daftar kasus (scrollable, max 10). */}
        <aside className={styles.panel}>
          {/* ── Province stats: tidak ikut scroll ── */}
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>Top Provinsi berdasarkan kasus</div>
          </div>
          {provinceStats.map(([provinsi, count]) => (
            <div key={provinsi} className={styles.provinceRow}>
              <div className={styles.provinceLabel}>
                <span>{provinsi}</span>
                <span className={styles.provinceCount}>{count} kasus</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(count / maxProvinceCount) * 100}%` }}
                />
              </div>
            </div>
          ))}

          {/* ── Cases list: hanya bagian ini yang scroll ── */}
          <div className={styles.panelCasesHeader}>
            <div className={styles.panelTitle}>
              {filteredCases.length} kasus ditampilkan
            </div>
          </div>
          <div className={styles.panelScroll}>
            {filteredCases.slice(0, 10).map((kasus) => (
              <Link
                key={kasus.id_kasus}
                href={`/cases/${kasus.id_kasus}`}
                className={styles.panelCard}
              >
                <div className={styles.panelCardMeta}>
                  <span className={styles.panelCaseId}>{kasus.id_kasus}</span>
                  <UrgencyBadge urgensi={kasus.urgensi} />
                </div>
                <div className={styles.panelCardTitle}>{kasus.judul}</div>
              </Link>
            ))}
            {filteredCases.length > 10 && (
              <Link
                href={activeFilters.kategori !== "Semua Kategori"
                  ? `/cases?kategori=${encodeURIComponent(activeFilters.kategori)}`
                  : "/cases"}
                className={styles.panelViewMore}
              >
                Lihat {filteredCases.length - 10} kasus lainnya di Monitoring →
              </Link>
            )}
          </div>
        </aside>
      </div>

      {/* ── MOBILE: TOP PROVINCES (always visible, no toggle) ── */}
      <div className={styles.mobileProvinces}>
        <div className={styles.mobileSectionHeader}>
          <span className={styles.mobileSectionTitle}>Top Provinsi</span>
        </div>
        <div className={styles.mobileProvincesList}>
          {provinceStats.map(([provinsi, count]) => (
            <div key={provinsi} className={styles.mobileProvinceRow}>
              <span className={styles.mobileProvinceName}>{provinsi}</span>
              <span className={styles.mobileProvinceCount}>{count} kasus</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: CASES LIST (max 10 + link to monitoring) ── */}
      <div className={styles.mobileCases}>
        <div className={styles.mobileCasesHeader}>
          <span className={styles.mobileCasesTitle}>{filteredCases.length} kasus ditampilkan</span>
        </div>
        <div className={styles.mobileCasesScroll}>
          {filteredCases.slice(0, 10).map((kasus) => (
            <Link
              key={kasus.id_kasus}
              href={`/cases/${kasus.id_kasus}`}
              className={styles.panelCard}
            >
              <div className={styles.panelCardMeta}>
                <span className={styles.panelCaseId}>{kasus.id_kasus}</span>
                <UrgencyBadge urgensi={kasus.urgensi} />
              </div>
              <div className={styles.panelCardTitle}>{kasus.judul}</div>
            </Link>
          ))}
          {filteredCases.length > 10 && (
            <Link
              href={activeFilters.kategori !== "Semua Kategori"
                ? `/cases?kategori=${encodeURIComponent(activeFilters.kategori)}`
                : "/cases"}
              className={styles.panelViewMore}
            >
              Lihat {filteredCases.length - 10} kasus lainnya di Monitoring →
            </Link>
          )}
        </div>
      </div>

      {/* ── STATS GRID ───────────────────────────────────── */}
      {/* Ringkasan jumlah kasus per kategori utama untuk memberi gambaran cepat distribusi kasus. */}
      <div className={styles.statsSection}>
        <div className={styles.statsSectionHeader}>
          <div className={styles.statsSectionTitle}>Kasus per Kategori</div>
        </div>
        <div className={styles.statsGrid}>
          {kategoriStats.map(([kat, count]) => (
            <div key={kat} className={styles.statCell}>
              <div className={styles.statCount}>{count}</div>
              <div className={styles.statLabel}>{KATEGORI_SHORT[kat] ?? kat}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE BOTTOM SHEET ──────────────────────────── */}
      {/* Saat marker dipilih di mobile, detail singkat kasus muncul sebagai bottom sheet. */}
      {selectedCase && (
        <div className={styles.bottomSheet}>
          <button
            className={styles.bottomSheetClose}
            onClick={() => setSelectedCase(null)}
          >
            Tutup ✕
          </button>
          <div className={styles.popupMeta} style={{ marginBottom: 8 }}>
            <span className={styles.popupId}>{selectedCase.id_kasus}</span>
            <UrgencyBadge urgensi={selectedCase.urgensi} />
          </div>
          <div className={styles.popupTitle}>{selectedCase.judul}</div>
          <div className={styles.popupLoc}>
            {selectedCase.lokasi_kota}, {selectedCase.lokasi_provinsi}
          </div>
          <Link href={`/cases/${selectedCase.id_kasus}`} className={styles.popupLink}>
            Buka Kasus →
          </Link>
        </div>
      )}
    </>
  );
}
