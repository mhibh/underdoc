import Link from "next/link";

export const metadata = {
  title: "Belum Ada — Underdoc",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "72vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px 80px",
        textAlign: "center",
      }}
    >
      <style>{`
        @keyframes ud-float1 {
          0%,100% { transform: translateY(0) rotate(-6deg); }
          50%      { transform: translateY(-20px) rotate(9deg); }
        }
        @keyframes ud-float2 {
          0%,100% { transform: translateY(0) rotate(12deg); }
          50%      { transform: translateY(-26px) rotate(-7deg); }
        }
        @keyframes ud-float3 {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-15px) rotate(14deg); }
        }
        @keyframes ud-wobble {
          0%,100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        @keyframes ud-march {
          0%,100% { transform: translateX(0); }
          25%     { transform: translateX(5px) rotate(2deg); }
          75%     { transform: translateX(-5px) rotate(-2deg); }
        }
        @keyframes ud-scribble {
          0%,100% { transform: rotate(0deg); }
          33%     { transform: rotate(-6deg); }
          66%     { transform: rotate(6deg); }
        }
        @keyframes ud-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.2; }
        }
        @keyframes ud-tape {
          0%,100% { opacity: 0.9; }
          50%      { opacity: 0.6; }
        }
      `}</style>

      {/* ─── SVG ILLUSTRATION ─────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 560 310"
        width="560"
        height="310"
        style={{ maxWidth: "100%", marginBottom: "36px" }}
        aria-label="Ilustrasi polisi dan tentara bingung di depan lemari arsip kosong"
        role="img"
      >
        {/* background paper */}
        <rect width="560" height="310" fill="#f4f0e8" />

        {/* ground */}
        <line x1="40" y1="278" x2="520" y2="278" stroke="#0f0f0e" strokeWidth="2" />

        {/* ── FLYING PAPERS ──────────────────────────────── */}
        <g style={{ transformOrigin: "155px 118px", animation: "ud-float1 3.2s ease-in-out infinite" }}>
          <rect x="140" y="98" width="30" height="38" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.5" />
          <line x1="147" y1="110" x2="163" y2="110" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="147" y1="118" x2="163" y2="118" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="147" y1="126" x2="157" y2="126" stroke="#ccc5b5" strokeWidth="1.2" />
        </g>
        <g style={{ transformOrigin: "340px 88px", animation: "ud-float2 3.9s ease-in-out infinite" }}>
          <rect x="325" y="68" width="30" height="38" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.5" />
          <line x1="332" y1="80" x2="348" y2="80" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="332" y1="88" x2="348" y2="88" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="332" y1="96" x2="340" y2="96" stroke="#ccc5b5" strokeWidth="1.2" />
        </g>
        <g style={{ transformOrigin: "248px 72px", animation: "ud-float3 2.6s ease-in-out infinite" }}>
          <rect x="233" y="52" width="30" height="38" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.5" />
          <line x1="240" y1="64" x2="256" y2="64" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="240" y1="72" x2="256" y2="72" stroke="#ccc5b5" strokeWidth="1.2" />
          <line x1="240" y1="80" x2="248" y2="80" stroke="#ccc5b5" strokeWidth="1.2" />
        </g>

        {/* ── FILING CABINET (center) ─────────────────────── */}
        <g transform="translate(222,152)">
          {/* body */}
          <rect x="0" y="0" width="116" height="126" rx="4" fill="#ede8dc" stroke="#0f0f0e" strokeWidth="2" />
          {/* drawer 1 */}
          <rect x="8" y="10" width="100" height="29" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.5" />
          <rect x="45" y="22" width="26" height="6" rx="3" fill="#6b6557" />
          {/* drawer 2 */}
          <rect x="8" y="47" width="100" height="29" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.5" />
          <rect x="45" y="59" width="26" height="6" rx="3" fill="#6b6557" />
          {/* drawer 3 — open, empty */}
          <rect x="8" y="84" width="100" height="34" rx="2" fill="#e0d8c8" stroke="#0f0f0e" strokeWidth="1.5" />
          <rect x="45" y="96" width="26" height="6" rx="3" fill="#6b6557" />
          <text x="58" y="110" textAnchor="middle" fontSize="9" fill="#6b6557" fontFamily="monospace">— kosong —</text>
          {/* blinking question mark */}
          <text
            x="58" y="-8"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fill="#c0392b"
            fontFamily="Georgia, serif"
            style={{ animation: "ud-blink 1.8s ease-in-out infinite" }}
          >?</text>
        </g>

        {/* ── POLICE OFFICER (left, wobble) ──────────────── */}
        <g style={{ transformOrigin: "128px 236px", animation: "ud-wobble 2.4s ease-in-out infinite" }}>
          {/* legs */}
          <rect x="112" y="252" width="15" height="26" rx="3" fill="#1a3a6b" />
          <rect x="130" y="252" width="15" height="26" rx="3" fill="#1a3a6b" />
          {/* shoes */}
          <ellipse cx="119" cy="278" rx="10" ry="5" fill="#0a0a0a" />
          <ellipse cx="138" cy="278" rx="10" ry="5" fill="#0a0a0a" />
          {/* torso */}
          <rect x="106" y="195" width="56" height="60" rx="6" fill="#1a3a6b" />
          {/* rank stripes */}
          <rect x="114" y="204" width="14" height="3" rx="1" fill="#c8a400" />
          <rect x="114" y="210" width="14" height="3" rx="1" fill="#c8a400" />
          {/* belt */}
          <rect x="106" y="232" width="56" height="8" fill="#0d2244" />
          <rect x="125" y="234" width="18" height="5" rx="1" fill="#c8a400" />
          {/* left arm — shrug up */}
          <line x1="108" y1="212" x2="90" y2="200" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="88" cy="198" r="7" fill="#f5d5a8" />
          {/* right arm — baton */}
          <line x1="160" y1="212" x2="178" y2="196" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round" />
          {/* baton */}
          <rect x="176" y="183" width="9" height="28" rx="4.5" fill="#5a3a1a" transform="rotate(20 180 197)" />
          {/* head */}
          <circle cx="134" cy="184" r="23" fill="#f5d5a8" />
          {/* hat brim */}
          <rect x="110" y="172" width="48" height="5" rx="2" fill="#1a3a6b" />
          {/* hat top */}
          <rect x="116" y="156" width="36" height="18" rx="3" fill="#1a3a6b" />
          {/* hat badge */}
          <circle cx="134" cy="164" r="6" fill="#c8a400" />
          <text x="134" y="167" textAnchor="middle" fontSize="6" fill="#1a3a6b" fontWeight="bold">★</text>
          {/* eyes — wide, confused */}
          <circle cx="125" cy="183" r="5" fill="white" />
          <circle cx="143" cy="183" r="5" fill="white" />
          <circle cx="126" cy="184" r="2.5" fill="#1a1a1a" />
          <circle cx="144" cy="184" r="2.5" fill="#1a1a1a" />
          {/* eyebrows raised */}
          <path d="M121 176 Q125 172 129 176" stroke="#5a3a00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M139 176 Q143 172 147 176" stroke="#5a3a00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* mouth — O shape */}
          <ellipse cx="134" cy="195" rx="5" ry="4" fill="none" stroke="#5a3a00" strokeWidth="1.5" />
          {/* sweat drop */}
          <path d="M152 172 Q157 162 162 172 Q162 180 157 181 Q152 180 152 172Z" fill="#88bbdd" />
        </g>

        {/* ── SOLDIER (right, marching) ───────────────────── */}
        <g style={{ transformOrigin: "408px 236px", animation: "ud-march 2s ease-in-out infinite" }}>
          {/* legs */}
          <rect x="394" y="252" width="15" height="26" rx="3" fill="#4a5c2a" />
          <rect x="412" y="252" width="15" height="26" rx="3" fill="#4a5c2a" />
          {/* boots */}
          <ellipse cx="401" cy="278" rx="10" ry="5" fill="#2a1f0a" />
          <ellipse cx="420" cy="278" rx="10" ry="5" fill="#2a1f0a" />
          {/* torso */}
          <rect x="388" y="195" width="56" height="60" rx="6" fill="#4a5c2a" />
          {/* pockets */}
          <rect x="394" y="204" width="14" height="14" rx="2" fill="#3a4c1a" stroke="#2a3c0a" strokeWidth="1" />
          <rect x="422" y="204" width="14" height="14" rx="2" fill="#3a4c1a" stroke="#2a3c0a" strokeWidth="1" />
          {/* belt */}
          <rect x="388" y="232" width="56" height="8" fill="#2a1a06" />
          <rect x="407" y="234" width="18" height="5" rx="1" fill="#8b7355" />
          {/* left arm — shrug */}
          <line x1="390" y1="214" x2="372" y2="200" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="370" cy="198" r="7" fill="#f5d5a8" />
          {/* right arm — shrug other side */}
          <line x1="442" y1="214" x2="460" y2="200" stroke="#f5d5a8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="462" cy="198" r="7" fill="#f5d5a8" />
          {/* head */}
          <circle cx="416" cy="184" r="23" fill="#f5d5a8" />
          {/* helmet */}
          <ellipse cx="416" cy="174" rx="24" ry="16" fill="#4a5c2a" />
          <path d="M392 176 Q416 190 440 176" stroke="#3a4c1a" strokeWidth="1.5" fill="none" />
          {/* eyes — spirals / dizzy */}
          <circle cx="407" cy="183" r="5" fill="white" />
          <circle cx="425" cy="183" r="5" fill="white" />
          {/* dizzy spiral left eye */}
          <path d="M407 180 Q410 183 407 186 Q404 183 407 180" stroke="#1a1a1a" strokeWidth="1.2" fill="none" />
          {/* dizzy spiral right eye */}
          <path d="M425 180 Q428 183 425 186 Q422 183 425 180" stroke="#1a1a1a" strokeWidth="1.2" fill="none" />
          {/* eyebrows — furrowed */}
          <path d="M402 177 Q407 174 412 177" stroke="#5a3a00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M420 177 Q425 174 430 177" stroke="#5a3a00" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* mouth — flat confused */}
          <path d="M409 195 Q416 192 423 195" stroke="#5a3a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* stars (dizzy) around head */}
          <text x="396" y="164" fontSize="10" fill="#c8a400">★</text>
          <text x="432" y="162" fontSize="8" fill="#c8a400">★</text>
        </g>

        {/* ── ARCHIVIST / DOKUMENTATOR (small, determined) ── */}
        <g style={{ transformOrigin: "193px 254px", animation: "ud-scribble 1.6s ease-in-out infinite" }}>
          {/* legs */}
          <rect x="184" y="264" width="8" height="14" rx="2" fill="#1a6b6b" />
          <rect x="196" y="264" width="8" height="14" rx="2" fill="#1a6b6b" />
          <ellipse cx="188" cy="278" rx="7" ry="4" fill="#2a1f0a" />
          <ellipse cx="200" cy="278" rx="7" ry="4" fill="#2a1f0a" />
          {/* torso */}
          <rect x="180" y="235" width="28" height="32" rx="4" fill="#1a6b6b" />
          {/* head */}
          <circle cx="194" cy="226" r="15" fill="#f5d5a8" />
          {/* hair */}
          <path d="M179 221 Q194 212 209 221" fill="#2a1f0a" />
          {/* glasses */}
          <circle cx="189" cy="226" r="4.5" fill="none" stroke="#0f0f0e" strokeWidth="1.3" />
          <circle cx="199" cy="226" r="4.5" fill="none" stroke="#0f0f0e" strokeWidth="1.3" />
          <line x1="193.5" y1="226" x2="194.5" y2="226" stroke="#0f0f0e" strokeWidth="1.3" />
          <line x1="184.5" y1="226" x2="182" y2="224" stroke="#0f0f0e" strokeWidth="1.3" />
          <line x1="203.5" y1="226" x2="206" y2="224" stroke="#0f0f0e" strokeWidth="1.3" />
          {/* mouth — determined line */}
          <line x1="189" y1="234" x2="199" y2="234" stroke="#5a3a00" strokeWidth="1.3" />
          {/* left arm + notepad */}
          <line x1="181" y1="246" x2="166" y2="258" stroke="#f5d5a8" strokeWidth="6" strokeLinecap="round" />
          <rect x="153" y="250" width="20" height="26" rx="2" fill="white" stroke="#0f0f0e" strokeWidth="1.3" />
          <line x1="158" y1="259" x2="170" y2="259" stroke="#ccc5b5" strokeWidth="1" />
          <line x1="158" y1="265" x2="170" y2="265" stroke="#ccc5b5" strokeWidth="1" />
          <line x1="158" y1="271" x2="165" y2="271" stroke="#ccc5b5" strokeWidth="1" />
          {/* right arm + pen writing */}
          <line x1="207" y1="246" x2="220" y2="256" stroke="#f5d5a8" strokeWidth="6" strokeLinecap="round" />
          <line x1="218" y1="254" x2="228" y2="266" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="222" y1="258" x2="232" y2="270" stroke="#c0392b" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
        </g>

        {/* ── CAUTION TAPE across cabinet ─────────────────── */}
        <g style={{ animation: "ud-tape 2.2s ease-in-out infinite" }}>
          <rect x="214" y="244" width="132" height="11" rx="2" fill="#f5c518" />
          <text x="221" y="253" fontSize="7" fill="#1a1a1a" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
            ⚠ DALAM PENGEMBANGAN ⚠
          </text>
        </g>

        {/* small label bottom right */}
        <text x="540" y="295" textAnchor="end" fontSize="9" fill="#ccc5b5" fontFamily="monospace">underdoc</text>
      </svg>

      {/* ─── TITLE ─────────────────────────────────────────────────────────── */}
      <h1
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(20px, 4vw, 30px)",
          fontWeight: 700,
          fontStyle: "italic",
          lineHeight: 1.3,
          color: "#0f0f0e",
          maxWidth: "520px",
          marginBottom: "14px",
        }}
      >
        Halaman belum dibuat, atau mungkin belum dipikirkan
      </h1>

      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "15px",
          color: "#6b6557",
          maxWidth: "380px",
          lineHeight: 1.65,
          marginBottom: "36px",
        }}
      >
        Kami sedang mengarsipkan segalanya. Sementara itu, database kasus tetap bisa diakses.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "11px 24px",
            background: "#0f0f0e",
            color: "#f4f0e8",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          ← Beranda
        </Link>
        <Link
          href="/cases"
          style={{
            display: "inline-block",
            padding: "11px 24px",
            background: "transparent",
            color: "#0f0f0e",
            border: "1px solid #0f0f0e",
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          Lihat Kasus
        </Link>
      </div>
    </main>
  );
}
