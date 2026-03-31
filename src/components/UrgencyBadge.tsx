import { Urgensi } from "@/types/case";

const URGENSI_STYLES: Record<Urgensi, { background: string; color: string }> = {
  Kritis: { background: "#c0392b", color: "#fff" },
  Tinggi: { background: "#b8860b", color: "#fff" },
  Berlangsung: { background: "#1a6b6b", color: "#fff" },
};

export default function UrgencyBadge({ urgensi }: { urgensi: Urgensi }) {
  const style = URGENSI_STYLES[urgensi];
  return (
    <span
      style={{
        ...style,
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "2px 8px",
        display: "inline-block",
      }}
    >
      {urgensi}
    </span>
  );
}
