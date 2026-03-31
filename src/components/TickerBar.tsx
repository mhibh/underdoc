"use client";

import styles from "./TickerBar.module.css";

const TICKER_ITEMS = [
  "6 kasus baru dalam 30 hari terakhir",
  "3 kasus berstatus KRITIS membutuhkan perhatian",
  "Underdoc — dokumentasi independen pelanggaran HAM aparat Indonesia",
  "Data diperbarui secara berkala — laporkan kasus di halaman Submit",
];

export default function TickerBar() {
  const text = TICKER_ITEMS.join("   ·   ");

  return (
    <div className={styles.ticker}>
      <div className={styles.track}>{text}</div>
    </div>
  );
}
