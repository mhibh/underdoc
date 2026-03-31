import { supabase } from "@/lib/supabase";
import { Case } from "@/types/case";

export const KATEGORI_OPTIONS = [
  "Semua Kategori",
  "Kekerasan & Penyalahgunaan Kekuasaan",
  "Kriminalitas Aparat",
  "Impunitas & Gagal Akuntabilitas",
  "Demokrasi & Kebebasan Sipil",
  "Diskriminasi & Kekerasan terhadap Perempuan dan Kaum Rentan",
];

export const AKTOR_OPTIONS = ["Semua Aktor", "POLISI", "TNI"];

export async function getAllCases(): Promise<Case[]> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .order("tanggal", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data as Case[];
}

export async function getCaseById(id: string): Promise<Case | null> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id_kasus", id)
    .single();

  if (error) return null;
  return data as Case;
}
