"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const isSticky = pathname.startsWith("/cases") || pathname.startsWith("/violations") || pathname.startsWith("/about") || pathname.startsWith("/submit");

  return (
    <nav className={`top-nav ${styles.nav} ${isSticky ? styles.navSticky : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          UNDERDOC
        </Link>

        <ul className={styles.navList}>
          {[
            { href: "/cases", label: "Monitoring Kasus" },
            { href: "/violations", label: "Peta Pelanggaran" },
            { href: "/about", label: "Tentang" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.navLink}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.ctaArea}>
          <Link href="/submit" className={styles.reportBtn}>
            ⚑ Laporkan
          </Link>
          <Link href="/cases" className={styles.dbBtn}>
            Akses Database
          </Link>
        </div>
      </div>
    </nav>
  );
}
