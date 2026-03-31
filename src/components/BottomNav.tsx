"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

const svgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS = {
  home: (
    <svg {...svgProps}>
      {/* Roof */}
      <polyline points="3 10.5 12 3 21 10.5" />
      {/* Walls */}
      <rect x="5" y="10.5" width="14" height="10.5" rx="0.5" />
      {/* Door */}
      <rect x="9.5" y="15" width="5" height="6" rx="0.5" />
    </svg>
  ),
  cases: (
    <svg {...svgProps}>
      {/* Document outline */}
      <rect x="4" y="2" width="16" height="20" rx="1.5" />
      {/* Three content lines */}
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  ),
  map: (
    <svg {...svgProps}>
      {/* Teardrop pin shape */}
      <path d="M12 2C8.686 2 6 4.686 6 8c0 5 6 14 6 14s6-9 6-14c0-3.314-2.686-6-6-6z" />
      {/* Dot inside */}
      <circle cx="12" cy="8" r="2" />
    </svg>
  ),
  info: (
    <svg {...svgProps}>
      {/* Circle */}
      <circle cx="12" cy="12" r="10" />
      {/* i dot */}
      <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth={2} strokeLinecap="round" />
      {/* i stem */}
      <line x1="12" y1="11" x2="12" y2="16" />
    </svg>
  ),
};

const NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: ICONS.home, exact: true },
  { href: "/cases", label: "Kasus", icon: ICONS.cases, exact: false },
  { href: "/violations", label: "Peta", icon: ICONS.map, exact: false },
  { href: "/about", label: "Tentang", icon: ICONS.info, exact: false },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={`bottom-nav ${styles.nav}`}>
      {NAV_ITEMS.map(({ href, label, icon, exact }) => {
        const isActive = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.item} ${isActive ? styles.active : styles.inactive}`}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
