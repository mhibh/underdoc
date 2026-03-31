import { getAllCases } from "@/data/cases";
import ViolationsClient from "./ViolationsClient";

export default async function ViolationsPage() {
  const cases = await getAllCases();
  return <ViolationsClient initialCases={cases} />;
}
