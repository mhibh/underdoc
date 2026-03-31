import { getAllCases } from "@/data/cases";
import { Case } from "@/types/case";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const recentCases: Case[] = await getAllCases();
  return <HomeClient recentCases={recentCases} />;
}
