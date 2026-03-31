"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import s from "./home.module.css";
import { Case } from "@/types/case";

// ── Tag component ────────────────────────────────────────────────────────────
// Severity/status badge. Variant class is chosen from the CSS module.
function Tag({
  type,
  children,
}: {
  type: "critical" | "high" | "ongoing";
  children: React.ReactNode;
}) {
  const variantClass = {
    critical: s.tagCritical,
    high: s.tagHigh,
    ongoing: s.tagOngoing,
  }[type];
  return <span className={`${s.tagBase} ${variantClass}`}>{children}</span>;
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
// Animates a number from 0 to `target` when the element enters the viewport.
function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  duration = 1800,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target).toLocaleString("id-ID");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, target, duration]);
}

// ── StatNumber component ──────────────────────────────────────────────────────
// Renders an animated count-up figure. `color` is dynamic (per-item data) so
// it stays as an inline style; everything else comes from the CSS module.
function StatNumber({ value, color }: { value: number; color?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref as React.RefObject<HTMLElement>, value);
  return (
    <span
      ref={ref}
      className={s.statNum}
      style={{ color: color ?? "var(--ink)" }}
    >
      {value.toLocaleString("id-ID")}
    </span>
  );
}

// ── SectionDivider component ──────────────────────────────────────────────────
// Horizontal label + rule divider between page sections.
function SectionDivider({
  title,
  linkHref,
  linkLabel,
}: {
  title: string;
  linkHref?: string;
  linkLabel?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className={s.divider}>
      <span className={s.dividerTitle}>{title}</span>
      <div className={s.dividerLine} />
      {linkHref && linkLabel && (
        <Link href={linkHref} className={s.dividerLink}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}

// ── Urgensi → tag type mapping ────────────────────────────────────────────────
function urgensiToTagType(
  urgensi: Case["urgensi"],
): "critical" | "high" | "ongoing" {
  if (urgensi === "Kritis") return "critical";
  if (urgensi === "Tinggi") return "high";
  return "ongoing";
}

// ── HomeClient ────────────────────────────────────────────────────────────────
export default function HomeClient({ recentCases }: { recentCases: Case[] }) {
  return (
    /* Page wrapper — "home-wrapper" kept for globals.css responsive rules */
    <div className={`home-wrapper ${s.pageWrapper}`}>
      {/* ── HERO SECTION ────────────────────────────────────────────────────
          Newspaper-style hero: Kundera quote on the left, live stats on the
          right. The two-column grid is controlled by "hero-grid" in globals.css
          for responsive collapse.
      ── ───────────────────────────────────────────────────────────────── */}
      <section className={s.heroSection}>
        {/* "hero-grid" kept for responsive override in globals.css */}
        <div className={`hero-grid ${s.heroInner}`}>
          {/* Left column — kicker, quote, description, CTAs */}
          {/* "hero-left" kept for responsive override */}
          <div className={`hero-left ${s.heroLeft}`}>
            <div className={s.heroKicker}>
              <span className={s.kickerDash} />
              Platform Monitoring Pelanggaran HAM di Indonesia
            </div>

            <blockquote className={s.heroQuote}>
              <p className={s.quoteText}>
                Perjuangan manusia melawan kekuasaan adalah perjuangan ingatan
                melawan lupa.
              </p>
              <footer className={s.quoteFooter}>
                — <cite className={s.quoteAuthor}>Milan Kundera</cite>
              </footer>
            </blockquote>

            <p className={s.heroDesc}>
              Platform independen pemantauan pelanggaran HAM, kesewenangan
              aparat, dan kriminalisasi aktivis di seluruh Indonesia.
            </p>

            {/* "hero-ctas" kept for responsive override */}
            <div className={`hero-ctas ${s.heroCtaRow}`}>
              <Link href="/cases" className={s.heroCta}>
                Lihat Semua Kasus →
              </Link>
              <Link href="/violations" className={s.heroCtaOutline}>
                Peta Pelanggaran
              </Link>
            </div>
          </div>

          {/* Right column — live stats sidebar */}
          {/* "hero-stats" kept for responsive override */}
          <div className={`hero-stats ${s.heroStatsSidebar}`}>
            {/* "hero-stats-label" kept for responsive override */}
            <div className={`hero-stats-label ${s.statsLabel}`}>
              Data Terkini
            </div>

            {/* TODO: replace with Supabase query */}
            {[
              {
                value: 1248,
                label: "kasus terverifikasi",
                color: "var(--red)",
              },
              { value: 34, label: "provinsi dipantau", color: undefined },
              { value: 412, label: "laporan mitra", color: undefined },
              {
                value: 40,
                label: "kasus aktif 48 jam ini",
                color: "var(--red)",
              },
            ].map(({ value, label, color }, i) => (
              /* "hero-stat-item" kept for responsive override */
              <div
                key={i}
                className={`hero-stat-item ${s.statItem} ${i === 0 ? s.statItemFirst : ""}`}
              >
                <StatNumber value={value} color={color} />
                <div className={s.statNumLabel}>{label}</div>
              </div>
            ))}

            {/* "hero-stats-live" kept for responsive override */}
            <div className={`hero-stats-live ${s.statsLive}`}>
              <span className={s.statsPulse} />
              Data diperbarui real-time
            </div>
          </div>
        </div>
      </section>

      {/* ── BREAKING BAR ────────────────────────────────────────────────────
          Compact strip of urgent headline alerts below the hero.
          "breaking-bar" kept for responsive hide in globals.css.
      ── ───────────────────────────────────────────────────────────────── */}
      <div className={`breaking-bar ${s.breakingBar}`}>
        <div className={s.breakingInner}>
          <div className={s.breakingLabel}>Terbaru</div>
          <div className={s.breakingItems}>
            {/* TODO: replace with Supabase query */}
            {[
              "⬤ 3 kasus berstatus KRITIS membutuhkan perhatian",
              "12 laporan masuk minggu ini",
              "2 kasus baru diverifikasi hari ini",
              "40 kasus aktif dalam 48 jam terakhir",
            ].map((item, i) => (
              <span
                key={i}
                className={`${s.breakingItem} ${i === 0 ? s.breakingItemAlert : ""}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KASUS TERBARU ────────────────────────────────────────────────────
          Three most recent verified cases in a card grid, with a sidebar
          showing aggregate statistics.
          "home-cases-grid" kept for responsive override.
      ── ───────────────────────────────────────────────────────────────── */}
      <SectionDivider
        title="Kasus Terbaru"
        linkHref="/cases"
        linkLabel="Lihat semua →"
      />
      <div className={`home-cases-grid ${s.casesGrid}`}>
        {recentCases.slice(0, 3).map((kasus) => {
          const tag = urgensiToTagType(kasus.urgensi);
          const cat = kasus.kategori_utama;
          const title = kasus.judul;
          const excerpt =
            kasus.keterangan.length > 120
              ? kasus.keterangan.slice(0, 120) + "..."
              : kasus.keterangan;
          const loc = kasus.lokasi_provinsi;
          const status =
            kasus.terverifikasi === "Ya" ? "Terverifikasi" : "Dalam Verifikasi";
          const id = kasus.id_kasus;
          return (
            <Link key={id} href={`/cases/${id}`} className={s.caseLink}>
              <div className={s.caseCard}>
                <div className={s.caseTagRow}>
                  <Tag type={tag}>
                    {tag === "critical"
                      ? "Kritis"
                      : tag === "high"
                        ? "Tinggi"
                        : "Berlangsung"}
                  </Tag>
                  <span className={s.caseCat}>{cat}</span>
                </div>
                <div className={s.caseTitle}>{title}</div>
                <div className={s.caseExcerpt}>{excerpt}</div>
                <div className={s.caseMeta}>
                  <span>📍 {loc}</span>
                  <span>·</span>
                  <span>{status}</span>
                  <span>·</span>
                  <span>{id}</span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Cases sidebar — aggregate stats */}
        <div className={s.caseSidebar}>
          {/* TODO: replace with Supabase query */}
          {[
            {
              num: "2,105",
              label: "Kasus Kepolisian",
              sub: "↑ 12% bulan ini",
              accent: false,
            },
            {
              num: "1,945",
              label: "Pelanggaran Militer",
              sub: "Pola berulang teridentifikasi",
              accent: true,
            },
            {
              num: "89%",
              label: "Tingkat Verifikasi",
              sub: null,
              accent: false,
            },
          ].map(({ num, label, sub, accent }, i) => (
            <div key={i} className={s.sidebarItem}>
              <div
                className={`${s.sidebarNum} ${accent ? s.sidebarNumAccent : ""}`}
              >
                {num}
              </div>
              <div className={s.sidebarLabel}>{label}</div>
              {sub && <div className={s.sidebarSub}>{sub}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── PETA INSIDEN ─────────────────────────────────────────────────────
          Dark full-width section with an SVG outline of Indonesia overlaid
          with positioned incident dots, plus a province ranking sidebar.
          "map-grid", "map-svg-container", "map-legend" kept for globals.css.
      ── ───────────────────────────────────────────────────────────────── */}
      <section className={s.mapSection}>
        {/* "map-grid" kept for responsive override */}
        <div className={`map-grid ${s.mapInner}`}>
          {/* Left column — SVG map with incident dots */}
          <div className={s.mapLeft}>
            <div className={s.mapEyebrow}>Distribusi Geografis</div>
            <div className={s.mapTitle}>Peta Insiden Aktif</div>
            <div className={s.mapDesc}>
              Pemantauan insiden lintas wilayah untuk mengidentifikasi klaster
              dan pola berulang pelanggaran negara.
            </div>

            {/* "map-svg-container" kept for responsive hide */}
            <div className="map-svg-container" style={{ position: "relative" }}>
              <svg
                viewBox="0 0 800 320"
                xmlns="http://www.w3.org/2000/svg"
                className={s.mapSvg}
              >
                <path
                  d="M95,140 Q120,115 155,110 Q185,105 205,120 Q225,135 215,155 Q200,175 175,180 Q145,185 120,170 Q98,158 95,140Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M220,185 Q255,175 300,172 Q340,170 380,175 Q415,180 430,190 Q420,202 390,205 Q350,208 310,205 Q270,202 240,198 Q222,195 220,185Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M320,100 Q355,85 395,82 Q440,80 470,95 Q490,110 485,140 Q480,168 460,178 Q435,188 400,185 Q365,182 340,165 Q318,148 320,100Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M500,110 Q518,100 532,108 Q540,120 535,135 Q530,148 520,155 Q510,148 505,135 Q498,122 500,110Z M522,140 Q535,148 545,162 Q548,175 540,180 Q530,175 525,162 Q520,150 522,140Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M610,130 Q650,115 695,120 Q730,128 745,145 Q748,162 730,170 Q700,178 665,172 Q635,165 615,150 Q608,142 610,130Z"
                  fill="rgba(255,255,255,0.12)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                />
                <path
                  d="M575,150 Q582,145 588,150 Q590,158 585,162 Q578,162 575,155Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
                <path
                  d="M440,200 Q450,197 458,200 Q462,207 456,210 Q448,211 440,207Z M465,202 Q474,199 482,202 Q485,208 480,212 Q472,213 465,208Z"
                  fill="rgba(255,255,255,0.1)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
              </svg>

              {/* Incident dots — left/top/width/height and per-dot color/boxShadow
                  are all computed from data, so they stay as inline styles. */}
              {/* TODO: replace with Supabase query */}
              {[
                {
                  x: "25.5%",
                  y: "57%",
                  size: 14,
                  type: "critical",
                  label: "Jakarta",
                },
                {
                  x: "44%",
                  y: "59%",
                  size: 11,
                  type: "high",
                  label: "Surabaya",
                },
                {
                  x: "42%",
                  y: "42%",
                  size: 12,
                  type: "critical",
                  label: "Kalimantan Barat",
                },
                { x: "82%", y: "46%", size: 13, type: "high", label: "Papua" },
                {
                  x: "16%",
                  y: "38%",
                  size: 10,
                  type: "ongoing",
                  label: "Sumatra Utara",
                },
                {
                  x: "64%",
                  y: "43%",
                  size: 9,
                  type: "ongoing",
                  label: "Sulawesi",
                },
              ].map(({ x, y, size, type, label }) => (
                <div
                  key={label}
                  title={label}
                  className={s.incidentDot}
                  style={{
                    left: x,
                    top: y,
                    width: `${size}px`,
                    height: `${size}px`,
                    background:
                      type === "critical"
                        ? "var(--red)"
                        : type === "high"
                          ? "#e67e22"
                          : "#27ae60",
                    boxShadow:
                      type === "critical"
                        ? "0 0 0 4px rgba(192,57,43,0.3)"
                        : type === "high"
                          ? "0 0 0 4px rgba(230,126,34,0.3)"
                          : "none",
                  }}
                />
              ))}
            </div>

            {/* "map-legend" kept for responsive hide */}
            <div className={`map-legend ${s.mapLegend}`}>
              {[
                ["var(--red)", "Kritis"],
                ["#e67e22", "Tinggi"],
                ["#27ae60", "Berlangsung"],
              ].map(([color, label]) => (
                <div key={label} className={s.legendItem}>
                  <span className={s.legendDot} style={{ background: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — province ranking sidebar */}
          <div className={s.mapRight}>
            <div className={s.regionEyebrow}>Wilayah Tertinggi</div>

            {/* TODO: replace with Supabase query */}
            {[
              { name: "Jakarta", count: 284, pct: 100, top: true },
              { name: "Papua", count: 231, pct: 81, top: true },
              { name: "Kalimantan Barat", count: 178, pct: 63, top: false },
              { name: "Jawa Barat", count: 165, pct: 58, top: false },
              { name: "Sulawesi Tengah", count: 142, pct: 50, top: false },
              { name: "Sumatra Utara", count: 118, pct: 42, top: false },
            ].map(({ name, count, pct, top }) => (
              <div key={name} className={s.regionRow}>
                <span className={s.regionName}>{name}</span>
                <span className={s.regionCount}>{count}</span>
                <div className={s.regionBarTrack}>
                  {/* width percentage is computed from data — kept as inline style */}
                  <div
                    className={`${s.regionBarFill} ${top ? s.regionBarFillTop : ""}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}

            <div className={s.mapLinkWrap}>
              <Link href="/violations" className={s.mapLink}>
                Lihat Peta Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── POLA TERIDENTIFIKASI ──────────────────────────────────────────────
          Six-column grid of identified systemic violation patterns with
          aggregate counts.
          "concerns-grid" kept for responsive column collapse.
      ── ───────────────────────────────────────────────────────────────── */}
      <SectionDivider title="Pola yang Teridentifikasi" />
      <div className={`concerns-grid ${s.polaGrid}`}>
        {/* TODO: replace with Supabase query */}
        {[
          { tag: "kriminalisasi-aksi", name: "Kriminalisasi Aksi", count: 312 },
          { tag: "konflik-lahan", name: "Konflik Lahan", count: 241 },
          {
            tag: "penahanan-sewenang-wenang",
            name: "Penahanan Sewenang-wenang",
            count: 487,
          },
          { tag: "penyiksaan", name: "Penyiksaan", count: 198 },
          { tag: "impunitas", name: "Impunitas", count: 289 },
          { tag: "pembungkaman-pers", name: "Pembungkaman Pers", count: 156 },
        ].map(({ tag, name, count }, i) => (
          <Link key={tag} href={`/cases?tag=${tag}`} className={s.polaLink}>
            {/* Last cell has no right border; all others get polaCellBordered */}
            <div className={`${s.polaCell} ${i < 5 ? s.polaCellBordered : ""}`}>
              <div className={s.polaName}>{name}</div>
              <div className={s.polaCount}>{count}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── MANIFESTO SECTION ────────────────────────────────────────────────
          Teal editorial section with a decorative giant quote mark, manifesto
          copy, and two CTAs.
          "manifesto-section", "manifesto-grid", "manifesto-quote",
          "manifesto-ctas" kept for responsive overrides.
      ── ───────────────────────────────────────────────────────────────── */}
      <section className={`manifesto-section ${s.manifesto}`}>
        <div className={s.manifestoDecor} aria-hidden="true">
          &ldquo;
        </div>

        {/* "manifesto-grid" kept for responsive override */}
        <div className={`manifesto-grid ${s.manifestoInner}`}>
          {/* Left — pull quote */}
          {/* "manifesto-quote" kept for responsive font-size override */}
          <blockquote className={`manifesto-quote ${s.manifestoQuote}`}>
            &ldquo;Setiap pelanggaran yang tercatat adalah satu langkah menuju{" "}
            <strong className={s.manifestoUnderline}>akuntabilitas</strong>{" "}
            aparat!&rdquo;
          </blockquote>

          {/* Right — body copy and CTAs */}
          <div className={s.manifestoBody}>
            <p className={s.manifestoText}>
              Lanskap hukum seringkali bersifat volatil dan sementara. Pasal
              bisa diubah,pelaku bisa dipindahtugaskan, kasus bisa dihentikan
              atau bahkan dilupakan.
            </p>
            <p className={s.manifestoText}>
              Tapi di balik setiap data ada nama, ada cerita, ada mereka-mereka
              yang menunggu keadilan. Kami Mencoba mengarsipkan setiap
              pelanggaran agar tak terlupakan.
            </p>

            {/* "manifesto-ctas" kept for responsive override */}
            <div className={`manifesto-ctas ${s.manifestoCtas}`}>
              <Link href="/submit" className={s.manifestoCtaPrimary}>
                Laporkan Pelanggaran
              </Link>
              <Link href="/about" className={s.manifestoCtaOutline}>
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
