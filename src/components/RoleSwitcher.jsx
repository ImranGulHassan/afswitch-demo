"use client";
import { usePathname, useRouter } from "next/navigation";

const roles = [
  { path: "/admin", label: "Admin Console" },
  { path: "/agent", label: "Agent Portal" },
  { path: "/wallet", label: "User Wallet" },
];

export default function RoleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 9999,
      background: "#0F1B2D", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 20px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => router.push("/")}>
        <div style={{
          background: "#0A6847", color: "#fff", padding: "4px 10px",
          borderRadius: 8, fontWeight: 900, fontSize: 13, letterSpacing: 1,
        }}>AF</div>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>AFSWITCH</span>
        <span style={{
          fontSize: 10, fontWeight: 600, color: "#C8A24E",
          background: "rgba(200,162,78,0.12)", padding: "3px 10px",
          borderRadius: 20, letterSpacing: 0.5,
        }}>Investor Demo</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {roles.map(r => {
          const active = pathname === r.path;
          return (
            <div key={r.path} onClick={() => router.push(r.path)} style={{
              padding: "7px 18px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s",
              background: active ? "#0A6847" : "rgba(255,255,255,0.06)",
              color: active ? "#fff" : "rgba(255,255,255,0.45)",
            }}>{r.label}</div>
          );
        })}
      </div>
    </div>
  );
}
