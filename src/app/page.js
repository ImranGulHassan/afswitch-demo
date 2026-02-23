"use client";
import { useRouter } from "next/navigation";

const cards = [
  {
    path: "/admin", title: "Admin Console", icon: "⊞",
    desc: "Platform-wide overview: user & agent management, transaction monitoring, ledger, risk engine, analytics, settings.",
    color: "#0A6847", bg: "#ECFDF5",
  },
  {
    path: "/agent", title: "Agent Portal", icon: "🏪",
    desc: "Field agent dashboard: cash-in, cash-out, user registration, float management, earnings tracking.",
    color: "#C8A24E", bg: "#FEF9EE",
  },
  {
    path: "/wallet", title: "User Wallet", icon: "📱",
    desc: "Mobile wallet experience: onboarding, send/receive, deposit/withdraw, QR payments, agent locator.",
    color: "#3B82F6", bg: "#EFF6FF",
  },
  {
    path: "/agent-mobile", title: "Agent Mobile", icon: "📲",
    desc: "Mobile agent experience: phone-frame view of cash-in, cash-out, registration, float management, and earnings.",
    color: "#8B5CF6", bg: "#F5F3FF",
  },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "calc(100vh - 56px)",
      background: "linear-gradient(165deg, #0F1B2D 0%, #0A6847 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "60px 24px 40px",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{
            background: "#0A6847", color: "#fff", padding: "8px 16px",
            borderRadius: 12, fontWeight: 900, fontSize: 20, letterSpacing: 2,
            boxShadow: "0 4px 20px rgba(10,104,71,0.4)",
          }}>AF</div>
          <span style={{ color: "#fff", fontSize: 28, fontWeight: 800 }}>AFSWITCH</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, fontWeight: 500 }}>
          Afghanistan's Digital Financial Network
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 900, width: "100%" }}>
        {cards.map(c => (
          <div key={c.path} onClick={() => router.push(c.path)} style={{
            background: "#fff", borderRadius: 20, padding: "32px 24px",
            cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 16, background: c.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginBottom: 16,
            }}>{c.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0F1B2D", marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{c.desc}</div>
            <div style={{
              marginTop: 16, fontSize: 12, fontWeight: 700, color: c.color,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              Open view <span style={{ fontSize: 14 }}>→</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 48, color: "rgba(255,255,255,0.25)", fontSize: 12, fontWeight: 500,
        letterSpacing: 1,
      }}>
        Investor Demo — February 2026
      </div>
    </div>
  );
}
