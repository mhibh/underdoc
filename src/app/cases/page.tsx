// src/app/cases/page.tsx
import { getAllCases } from "@/data/cases";
import CasesClient from "./CasesClient";

export default async function CasesPage() {
  const cases = await getAllCases();
  return <CasesClient initialCases={cases} />;
}
