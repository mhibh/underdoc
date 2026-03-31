import Link from "next/link";
import s from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footerEl}>
      <div className={`footer-grid ${s.footerInner}`}>
        <div>
          <div className={s.footerBrandName}>UNDERDOC</div>
          <p className={s.footerBrandDesc}>Platform independen pencatatan pelanggaran HAM oleh negara di Indonesia.</p>
        </div>

        {[
          { title: "Navigasi",     links: [{ href: "/cases",              label: "Monitoring Kasus"    }, { href: "/violations",        label: "Peta Pelanggaran" }, { href: "/submit",           label: "Laporkan Insiden"  }, { href: "/data",     label: "Akses Data"          }] },
          { title: "Organisasi",   links: [{ href: "/about",              label: "Tentang Kami"        }, { href: "/contact",  label: "Kontak"              }] },
          { title: "Data & Arsip", links: [{ href: "/data",               label: "Open Data"           }, { href: "/archive",           label: "Arsip Kasus"      }, { href: "/privacy",          label: "Kebijakan Privasi" }, { href: "/security", label: "Keamanan Pelapor"    }] },
        ].map(({ title, links }) => (
          <div key={title}>
            <div className={s.footerNavTitle}>{title}</div>
            <ul className={s.footerNavList}>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={s.footerLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`footer-copyright ${s.footerCopyright}`}>
        <span>© 2025 Underdoc. Seluruh hak cipta dilindungi.</span>
        <span>Kebenaran tidak bisa dibungkam.</span>
      </div>
    </footer>
  );
}
