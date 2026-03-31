import { notFound } from "next/navigation";
import Link from "next/link";
import UrgencyBadge from "@/components/UrgencyBadge";
import { getAllCases, getCaseById } from "@/data/cases";
import styles from "./case-detail.module.css";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const cases = await getAllCases();
  return cases.map((c) => ({ id: c.id_kasus }));
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kasus = await getCaseById(id);
  if (!kasus) notFound();

  return (
    <div className={styles.page}>
      <main className={`detail-main ${styles.main}`}>
        <div className={styles.breadcrumb}>
          <Link href="/cases" className={styles.breadcrumbLink}>
            ← Kembali ke Daftar Kasus
          </Link>
        </div>

        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.caseId}>{kasus.id_kasus}</span>
            <UrgencyBadge urgensi={kasus.urgensi} />
            <span className={styles.actorTag}>{kasus.aktor}</span>
          </div>
          <h1 className={styles.title}>{kasus.judul}</h1>
          <div className={styles.headerDates}>
            <span className={styles.headerDate}>
              {formatDate(kasus.tanggal)}
            </span>
            <span className={styles.headerDate}>
              {kasus.lokasi_kota ? `${kasus.lokasi_kota}, ` : ""}
              {kasus.lokasi_provinsi}
            </span>
          </div>
        </div>

        <div className={`detail-grid ${styles.grid}`}>
          <div>
            <h2 className={styles.sectionLabel}>Kronologi &amp; Keterangan</h2>
            <p className={styles.narrative}>{kasus.keterangan}</p>

            {kasus.tag_tambahan && (
              <div className={styles.tagsSection}>
                <p className={styles.metaLabel}>Tag</p>
                <div className={styles.tagList}>
                  {kasus.tag_tambahan.split(",").map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(kasus.sumber_berita_1 || kasus.sumber_berita_2) && (
              <div className={styles.sourcesSection}>
                <p className={styles.metaLabel}>Sumber Berita</p>
                <div className={styles.sourceList}>
                  {kasus.sumber_berita_1 && (
                    <a
                      href={kasus.sumber_berita_1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      Sumber 1 ↗
                    </a>
                  )}
                  {kasus.sumber_berita_2 && (
                    <a
                      href={kasus.sumber_berita_2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      Sumber 2 ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className={styles.sidebar}>
              <div>
                <p className={styles.metaLabel}>Kategori</p>
                <p className={styles.metaValue}>{kasus.kategori_utama}</p>
              </div>
              {kasus.satuan && (
                <div className={styles.metaRow}>
                  <p className={styles.metaLabel}>Satuan / Instansi</p>
                  <p className={styles.metaValue}>{kasus.satuan}</p>
                </div>
              )}
              <div className={styles.metaRow}>
                <p className={styles.metaLabel}>Status Penanganan</p>
                <p className={styles.metaValue}>{kasus.status_penanganan}</p>
              </div>
              <div className={styles.metaRow}>
                <p className={styles.metaLabel}>Verifikasi</p>
                <p
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
                      ? "Sedang diverifikasi"
                      : "Belum terverifikasi"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
