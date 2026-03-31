export type Urgensi = "Kritis" | "Tinggi" | "Berlangsung";
export type Aktor = "POLISI" | "TNI" | "POLISI,TNI";
export type StatusPenanganan =
  | "Tidak ada respons"
  | "Proses"
  | "Selesai"
  | "Ditahan"
  | "Dipecat"
  | "Penyidikan"
  | "Hanya Etik"
  | "Tidak Jelas";
export type Terverifikasi = "Ya" | "Tidak" | "Proses";

export interface Case {
  id_kasus: string;
  tanggal: string;
  judul: string;
  aktor: Aktor;
  satuan?: string;
  kategori_utama: string;
  tag_tambahan?: string;
  keterangan: string;
  lokasi_kota?: string;
  lokasi_provinsi: string;
  sumber_berita_1?: string;
  sumber_berita_2?: string;
  bukti_publik?: string;
  jenis_bukti?: string;
  catatan_bukti?: string;
  status_penanganan: StatusPenanganan;
  urgensi: Urgensi;
  terverifikasi: Terverifikasi;
  lat?: number;
  lng?: number;
}
