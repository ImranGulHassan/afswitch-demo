"use client";
import { useState, useEffect } from "react";

const C = {
  deepGreen:"#0A6847", green500:"#10B981", green400:"#34D399", green100:"#D1FAE5",
  greenLight:"#ECFDF5", navy:"#0F1B2D", navy700:"#1B2A4A", navy600:"#243556",
  gold:"#C8A24E", goldLight:"#FEF9EE", white:"#FFFFFF", off:"#F8FAFB",
  g50:"#F9FAFB", g100:"#F3F4F6", g200:"#E5E7EB", g300:"#D1D5DB", g400:"#9CA3AF",
  g500:"#6B7280", g600:"#4B5563", g700:"#374151", g800:"#1F2937",
  red:"#EF4444", redLight:"#FEF2F2", red100:"#FEE2E2",
  blue:"#3B82F6", blueLight:"#EFF6FF", orange:"#F59E0B", orangeLight:"#FFFBEB",
  purple:"#8B5CF6", purpleLight:"#F5F3FF",
};

const kpi = { totalUsers:4823, activeToday:1247, totalAgents:156, activeAgents:142, txnToday:3891, txnVolumeAFN:47200000, txnVolumeUSD:548384, revenueToday:188800, revenueMonth:4120000, pendingKYC:23, flaggedTxns:7, systemUptime:"99.97%" };

const agentsList = [
  { id:"AGT-0042", name:"Sarafi Noor Exchange", area:"Mandawi, Kabul", tier:"Gold", status:"active", float:850000, txnToday:47, commToday:2820, users:342, rating:4.8, joined:"Oct 2025" },
  { id:"AGT-0015", name:"Herat Money Services", area:"Char-suq, Herat", tier:"Gold", status:"active", float:1200000, txnToday:63, commToday:3780, users:518, rating:4.9, joined:"Sep 2025" },
  { id:"AGT-0028", name:"Kabul Trust Money", area:"Shar-e-Naw, Kabul", tier:"Silver", status:"active", float:420000, txnToday:28, commToday:1680, users:187, rating:4.5, joined:"Nov 2025" },
  { id:"AGT-0033", name:"Pamir Exchange", area:"Karte-4, Kabul", tier:"Silver", status:"active", float:310000, txnToday:22, commToday:1320, users:156, rating:4.6, joined:"Dec 2025" },
  { id:"AGT-0051", name:"Afghan Star Sarafi", area:"Deh Afghanan, Kabul", tier:"Bronze", status:"suspended", float:0, txnToday:0, commToday:0, users:89, rating:4.2, joined:"Jan 2026" },
  { id:"AGT-0067", name:"Balkh Trust Exchange", area:"Central Bazaar, Mazar", tier:"Gold", status:"active", float:980000, txnToday:55, commToday:3300, users:445, rating:4.7, joined:"Oct 2025" },
  { id:"AGT-0074", name:"Jalalabad Quick Pay", area:"Main Bazaar, Jalalabad", tier:"Silver", status:"active", float:560000, txnToday:34, commToday:2040, users:231, rating:4.4, joined:"Nov 2025" },
  { id:"AGT-0089", name:"Kandahar Central Sarafi", area:"Old City, Kandahar", tier:"Silver", status:"review", float:180000, txnToday:12, commToday:720, users:104, rating:4.1, joined:"Jan 2026" },
];

const usersList = [
  { id:"USR-00001", name:"Ahmad Noori", phone:"+93 70 123 4567", city:"Kabul", kyc:"Full", balance:12500, status:"active", txns:47, joined:"Nov 2025" },
  { id:"USR-00002", name:"Fatima Rahimi", phone:"+93 79 987 6543", city:"Kabul", kyc:"Full", balance:8200, status:"active", txns:32, joined:"Nov 2025" },
  { id:"USR-00003", name:"Khalid Wardak", phone:"+93 72 555 8901", city:"Kabul", kyc:"Full", balance:15800, status:"active", txns:61, joined:"Oct 2025" },
  { id:"USR-00004", name:"Zahra Ahmadi", phone:"+93 78 234 5678", city:"Kabul", kyc:"Basic", balance:3200, status:"active", txns:8, joined:"Feb 2026" },
  { id:"USR-00005", name:"Mohammad Karimi", phone:"+93 70 876 5432", city:"Herat", kyc:"Full", balance:22000, status:"active", txns:89, joined:"Sep 2025" },
  { id:"USR-00006", name:"Mariam Stanikzai", phone:"+93 73 111 2233", city:"Mazar", kyc:"Pending", balance:500, status:"pending", txns:2, joined:"Feb 2026" },
  { id:"USR-00007", name:"Nawid Sadat", phone:"+93 77 444 3322", city:"Jalalabad", kyc:"Full", balance:6700, status:"active", txns:28, joined:"Dec 2025" },
  { id:"USR-00008", name:"Shogofa Yari", phone:"+93 78 999 1122", city:"Herat", kyc:"Basic", balance:4100, status:"frozen", txns:15, joined:"Jan 2026" },
];

const txnMonitor = [
  { id:"TXN-2026-0223-4F8A", type:"P2P", from:"Ahmad Noori", to:"Fatima Rahimi", amtAFN:5000, time:"10:23 AM", status:"completed", risk:"low", agent:"-" },
  { id:"TXN-2026-0223-3B21", type:"Cash-In", from:"Agent: Noor Exchange", to:"Ahmad Noori", amtAFN:10000, time:"10:05 AM", status:"completed", risk:"low", agent:"AGT-0042" },
  { id:"TXN-2026-0223-1C09", type:"P2P", from:"Khalid Wardak", to:"Ahmad Noori", amtAFN:2500, time:"9:42 AM", status:"completed", risk:"low", agent:"-" },
  { id:"TXN-2026-0223-9X01", type:"Cash-Out", from:"User: Nawid Sadat", to:"Agent: Balkh Trust", amtAFN:45000, time:"9:38 AM", status:"flagged", risk:"high", agent:"AGT-0067" },
  { id:"TXN-2026-0223-9D44", type:"P2P", from:"Zahra Ahmadi", to:"Unknown +93 77 000 9999", amtAFN:19500, time:"9:30 AM", status:"flagged", risk:"medium", agent:"-" },
  { id:"TXN-2026-0223-7E32", type:"Cash-Out", from:"User: Fatima Rahimi", to:"Agent: Herat Money", amtAFN:8000, time:"9:15 AM", status:"completed", risk:"low", agent:"AGT-0015" },
  { id:"TXN-2026-0223-5A11", type:"Cash-In", from:"Agent: Pamir Exchange", to:"Mohammad Karimi", amtAFN:50000, time:"9:01 AM", status:"review", risk:"medium", agent:"AGT-0033" },
  { id:"TXN-2026-0223-2F87", type:"P2P", from:"Mariam Stanikzai", to:"Shogofa Yari", amtAFN:600, time:"8:50 AM", status:"completed", risk:"low", agent:"-" },
];

const fraudAlerts = [
  { id:1, severity:"critical", title:"Velocity Breach — AGT-0067", desc:"Agent Balkh Trust processed 3 cash-outs totaling ؋ 125,000 in 8 minutes. Exceeds velocity threshold.", time:"9:38 AM", status:"open" },
  { id:2, severity:"high", title:"New User Large Transfer", desc:"USR-00004 (Zahra Ahmadi, Basic KYC) attempted ؋ 19,500 P2P transfer — exceeds Basic tier limit of ؋ 20,000/day.", time:"9:30 AM", status:"open" },
  { id:3, severity:"high", title:"SIM Swap Detected — USR-00008", desc:"Shogofa Yari's phone number shows carrier change. Account auto-frozen pending verification.", time:"8:15 AM", status:"mitigated" },
  { id:4, severity:"medium", title:"Unusual Pattern — AGT-0089", desc:"Agent Kandahar Central showing 85% cash-out vs 15% cash-in ratio. Possible float manipulation.", time:"Yesterday", status:"investigating" },
  { id:5, severity:"low", title:"Device Change — USR-00003", desc:"Khalid Wardak logged in from a new device (iPhone 14). Previous: Samsung A14.", time:"Yesterday", status:"resolved" },
];

const ledgerEntries = [
  { id:"LED-00001", debit:"USR-00001 (Ahmad)", credit:"USR-00002 (Fatima)", amtAFN:5000, type:"P2P Transfer", time:"10:23 AM", balanced:true },
  { id:"LED-00002", debit:"AGT-0042 Float", credit:"USR-00001 (Ahmad)", amtAFN:10000, type:"Cash-In", time:"10:05 AM", balanced:true },
  { id:"LED-00003", debit:"USR-00003 (Khalid)", credit:"USR-00001 (Ahmad)", amtAFN:2500, type:"P2P Transfer", time:"9:42 AM", balanced:true },
  { id:"LED-00004", debit:"USR-00007 (Nawid)", credit:"AGT-0067 Float", amtAFN:45000, type:"Cash-Out", time:"9:38 AM", balanced:true },
  { id:"LED-00005", debit:"Commission Pool", credit:"AGT-0042", amtAFN:60, type:"Agent Commission", time:"10:05 AM", balanced:true },
  { id:"LED-00006", debit:"Commission Pool", credit:"Platform Revenue", amtAFN:40, type:"Platform Fee", time:"10:05 AM", balanced:true },
];

/* ─── COMPONENTS ─── */
const Sidebar = ({ active, onNav }) => {
  const items = [
    { id:"overview", icon:"⊞", l:"Overview" },
    { id:"agents", icon:"🏪", l:"Agents" },
    { id:"users", icon:"👥", l:"Users" },
    { id:"transactions", icon:"↕", l:"Transactions" },
    { id:"ledger", icon:"📒", l:"Ledger" },
    { id:"fraud", icon:"🛡️", l:"Risk & Fraud" },
    { id:"analytics", icon:"📊", l:"Analytics" },
    { id:"settings", icon:"⚙", l:"Settings" },
  ];
  return (
    <div style={{ width:220, background:C.navy, minHeight:"100vh", display:"flex", flexDirection:"column", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ padding:"20px 18px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <div style={{ background:C.deepGreen, color:C.white, padding:"5px 10px", borderRadius:8, fontWeight:900, fontSize:13, letterSpacing:1 }}>AF</div>
          <div><div style={{ color:C.white, fontSize:14, fontWeight:700 }}>AFSWITCH</div><div style={{ color:C.gold, fontSize:10, fontWeight:600 }}>Admin Console</div></div>
        </div>
      </div>
      <div style={{ flex:1, padding:"10px 8px" }}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>onNav(it.id)} style={{
            display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8,
            cursor:"pointer", marginBottom:2, transition:"all 0.15s",
            background:active===it.id?"rgba(10,104,71,0.25)":"transparent",
            color:active===it.id?C.green400:"rgba(255,255,255,0.45)",
          }}>
            <span style={{ fontSize:15, width:22, textAlign:"center" }}>{it.icon}</span>
            <span style={{ fontSize:13, fontWeight:active===it.id?700:500 }}>{it.l}</span>
            {it.id==="fraud"&&<div style={{ marginLeft:"auto", width:18, height:18, borderRadius:"50%", background:C.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:C.white }}>2</div>}
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:8, background:C.deepGreen, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:10, fontWeight:700 }}>SA</div>
          <div><div style={{ fontSize:11, fontWeight:600, color:C.white }}>Super Admin</div><div style={{ fontSize:9, color:C.g500 }}>admin@afswitch.af</div></div>
        </div>
      </div>
    </div>
  );
};

const TopBar = ({ title, sub, right }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 28px", background:C.white, borderBottom:`1px solid ${C.g200}` }}>
    <div><div style={{ fontSize:20, fontWeight:800, color:C.navy }}>{title}</div>{sub&&<div style={{ fontSize:12, color:C.g400, marginTop:2 }}>{sub}</div>}</div>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      {right}
      <div style={{ fontSize:12, color:C.g500 }}>Feb 23, 2026 — 10:41 AM</div>
    </div>
  </div>
);

const Stat = ({ label, value, sub, icon, color=C.deepGreen, bg=C.greenLight, trend }) => (
  <div style={{ background:C.white, borderRadius:14, padding:"18px 20px", border:`1px solid ${C.g200}`, flex:1, minWidth:0 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:11, color:C.g400, fontWeight:600, marginBottom:6, letterSpacing:0.3 }}>{label}</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy }}>{value}</div>
        {sub&&<div style={{ fontSize:11, color:C.g400, marginTop:4 }}>{sub}</div>}
        {trend&&<div style={{ fontSize:11, fontWeight:600, color:trend.startsWith("+") ? C.green500 : C.red, marginTop:4 }}>{trend} vs yesterday</div>}
      </div>
      <div style={{ width:40, height:40, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{icon}</div>
    </div>
  </div>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:6, background:bg, color }}>{text}</span>
);

/* ═══ OVERVIEW ═══ */
const OverviewScreen = ({ go }) => {
  const hourlyData = [120,89,45,28,22,35,156,342,521,680,745,712,634,589,520,478,512,601,445,320,210,156,98,67];
  const maxH = Math.max(...hourlyData);
  return (
    <div><TopBar title="Platform Overview" sub="Real-time system health and metrics"/>
      <div style={{ padding:24 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:24 }}>
          <Stat label="TOTAL USERS" value={kpi.totalUsers.toLocaleString()} sub={`${kpi.activeToday} active today`} icon="👥" trend="+3.2%" />
          <Stat label="ACTIVE AGENTS" value={`${kpi.activeAgents}/${kpi.totalAgents}`} sub="91% online rate" icon="🏪" color={C.gold} bg={C.goldLight} />
          <Stat label="TODAY'S TRANSACTIONS" value={kpi.txnToday.toLocaleString()} sub="P2P: 2,340 · Agent: 1,551" icon="↕" color={C.blue} bg={C.blueLight} trend="+12.4%" />
          <Stat label="DAILY VOLUME" value={`؋ ${(kpi.txnVolumeAFN/1000000).toFixed(1)}M`} sub={`≈ $ ${(kpi.txnVolumeUSD/1000).toFixed(0)}K USD`} icon="📈" color={C.purple} bg={C.purpleLight} />
          <Stat label="PLATFORM REVENUE" value={`؋ ${(kpi.revenueToday/1000).toFixed(0)}K`} sub={`Month: ؋ ${(kpi.revenueMonth/1000000).toFixed(1)}M`} icon="◈" color={C.gold} bg={C.goldLight} trend="+8.1%" />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:24 }}>
          {/* Hourly volume chart */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>Transaction Volume (Today, Hourly)</div>
              <div style={{ display:"flex", gap:4 }}>
                {["1H","6H","24H","7D"].map((p,i)=><div key={p} style={{ padding:"4px 10px", borderRadius:6, fontSize:10, fontWeight:600, background:i===2?C.deepGreen:C.g100, color:i===2?C.white:C.g500, cursor:"pointer" }}>{p}</div>)}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:120 }}>
              {hourlyData.map((v,i)=>(
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ width:"100%", height:`${(v/maxH)*100}%`, minHeight:2, background:i<=10?`${C.deepGreen}`:`${C.deepGreen}40`, borderRadius:"2px 2px 0 0", transition:"height 0.3s" }}/>
                  {i%4===0&&<div style={{ fontSize:8, color:C.g400, marginTop:4 }}>{i}:00</div>}
                </div>
              ))}
            </div>
          </div>

          {/* System health */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>System Health</div>
            {[
              { l:"API Uptime", v:kpi.systemUptime, color:C.green500, pct:99.97 },
              { l:"Avg Response Time", v:"142ms", color:C.green500, pct:92 },
              { l:"Ledger Sync", v:"Real-time", color:C.green500, pct:100 },
              { l:"SMS Delivery", v:"97.3%", color:C.green500, pct:97.3 },
              { l:"Fraud Engine", v:"Active", color:C.green500, pct:100 },
            ].map((s,i)=>(
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color:C.g600 }}>{s.l}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:s.color }}>{s.v}</span>
                </div>
                <div style={{ height:4, borderRadius:2, background:C.g100 }}>
                  <div style={{ width:`${s.pct}%`, height:"100%", background:s.pct>95?C.green500:s.pct>80?C.orange:C.red, borderRadius:2 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          {/* Pending actions */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Pending Actions</div>
            {[
              { l:"KYC Reviews", v:kpi.pendingKYC, color:C.blue, act:()=>go("users") },
              { l:"Flagged Transactions", v:kpi.flaggedTxns, color:C.red, act:()=>go("fraud") },
              { l:"Agent Applications", v:3, color:C.gold, act:()=>go("agents") },
              { l:"Float Top-Up Requests", v:5, color:C.orange },
            ].map((p,i)=>(
              <div key={i} onClick={p.act} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<3?`1px solid ${C.g100}`:"none", cursor:p.act?"pointer":"default" }}>
                <span style={{ fontSize:13, color:C.g700 }}>{p.l}</span>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:p.color }}>{p.v}</span>
                  {p.act&&<span style={{ fontSize:12, color:C.g300 }}>›</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Top agents */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Top Agents Today</div>
            {agentsList.filter(a=>a.status==="active").sort((a,b)=>b.txnToday-a.txnToday).slice(0,4).map((a,i)=>(
              <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:i<3?`1px solid ${C.g100}`:"none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:i===0?C.goldLight:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:i===0?C.gold:C.g500 }}>{i+1}</div>
                  <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{a.name}</div><div style={{ fontSize:10, color:C.g400 }}>{a.area}</div></div>
                </div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{a.txnToday} txns</div><div style={{ fontSize:10, color:C.gold }}>؋ {a.commToday.toLocaleString()}</div></div>
              </div>
            ))}
          </div>

          {/* City distribution */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Volume by City</div>
            {[
              { city:"Kabul", pct:52, vol:"؋ 24.5M" },
              { city:"Herat", pct:22, vol:"؋ 10.4M" },
              { city:"Mazar-i-Sharif", pct:14, vol:"؋ 6.6M" },
              { city:"Jalalabad", pct:8, vol:"؋ 3.8M" },
              { city:"Kandahar", pct:4, vol:"؋ 1.9M" },
            ].map((c,i)=>(
              <div key={i} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:12, color:C.g700 }}>{c.city}</span>
                  <span style={{ fontSize:11, color:C.g400 }}>{c.vol} ({c.pct}%)</span>
                </div>
                <div style={{ height:6, borderRadius:3, background:C.g100 }}>
                  <div style={{ width:`${c.pct}%`, height:"100%", background:`linear-gradient(90deg, ${C.deepGreen}, ${C.green400})`, borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ AGENTS ═══ */
const AgentsScreen = () => {
  const [filter,setFilter]=useState("all");
  const [detail,setDetail]=useState(null);
  const filtered = filter==="all"?agentsList:agentsList.filter(a=>a.status===filter);

  if(detail) return (
    <div><TopBar title="Agent Detail" sub={detail.id} right={<div onClick={()=>setDetail(null)} style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, background:C.g100, color:C.g600, cursor:"pointer" }}>← Back</div>}/>
      <div style={{ padding:24, maxWidth:900 }}>
        <div style={{ display:"flex", gap:20, marginBottom:24 }}>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24, flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div><div style={{ fontSize:22, fontWeight:800, color:C.navy }}>{detail.name}</div><div style={{ fontSize:13, color:C.g500, marginTop:4 }}>{detail.area} • {detail.id}</div></div>
              <Badge text={detail.status} color={detail.status==="active"?C.deepGreen:detail.status==="suspended"?C.red:C.orange} bg={detail.status==="active"?C.greenLight:detail.status==="suspended"?C.redLight:C.orangeLight}/>
            </div>
            {[{l:"Tier",v:detail.tier},{l:"Float Balance",v:`؋ ${detail.float.toLocaleString()}`},{l:"Today's Transactions",v:detail.txnToday},{l:"Today's Commission",v:`؋ ${detail.commToday.toLocaleString()}`},{l:"Registered Users",v:detail.users},{l:"Rating",v:`⭐ ${detail.rating}`},{l:"Joined",v:detail.joined}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:i<6?`1px solid ${C.g100}`:"none" }}>
                <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{r.v}</span>
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:16 }}>
              {detail.status==="active"&&<div style={{ padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:C.redLight, color:C.red, cursor:"pointer" }}>Suspend Agent</div>}
              {detail.status==="suspended"&&<div style={{ padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:C.greenLight, color:C.deepGreen, cursor:"pointer" }}>Reactivate</div>}
              <div style={{ padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:C.g100, color:C.g600, cursor:"pointer" }}>Adjust Limits</div>
              <div style={{ padding:"8px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:C.goldLight, color:C.gold, cursor:"pointer" }}>Change Tier</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div><TopBar title="Agent Management" sub={`${agentsList.length} total agents`}/>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:16 }}>
          {[{id:"all",l:"All"},{id:"active",l:"Active"},{id:"suspended",l:"Suspended"},{id:"review",l:"Under Review"}].map(f=>(
            <div key={f.id} onClick={()=>setFilter(f.id)} style={{ padding:"6px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:filter===f.id?C.deepGreen:C.white, color:filter===f.id?C.white:C.g500, cursor:"pointer", border:`1px solid ${filter===f.id?C.deepGreen:C.g200}` }}>{f.l}</div>
          ))}
          <div style={{ marginLeft:"auto", padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, background:C.deepGreen, color:C.white, cursor:"pointer" }}>+ Add Agent</div>
        </div>
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 1fr 0.8fr", padding:"10px 18px", background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
            {["Agent","Tier","Status","Float","Txns Today","Commission",""].map(h=><div key={h} style={{ fontSize:11, fontWeight:700, color:C.g400, letterSpacing:0.5 }}>{h}</div>)}
          </div>
          {filtered.map((a,i)=>(
            <div key={a.id} onClick={()=>setDetail(a)} style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr 1fr 1fr 0.8fr", padding:"12px 18px", borderBottom:i<filtered.length-1?`1px solid ${C.g100}`:"none", alignItems:"center", cursor:"pointer", transition:"background 0.1s" }}
              onMouseEnter={e=>e.currentTarget.style.background=C.g50} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{a.name}</div><div style={{ fontSize:10, color:C.g400 }}>{a.area} • {a.id}</div></div>
              <div><Badge text={a.tier} color={a.tier==="Gold"?C.gold:a.tier==="Silver"?C.g600:C.g400} bg={a.tier==="Gold"?C.goldLight:C.g100}/></div>
              <div><Badge text={a.status} color={a.status==="active"?C.deepGreen:a.status==="suspended"?C.red:C.orange} bg={a.status==="active"?C.greenLight:a.status==="suspended"?C.redLight:C.orangeLight}/></div>
              <div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>؋ {a.float.toLocaleString()}</div>
              <div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{a.txnToday}</div>
              <div style={{ fontSize:13, fontWeight:600, color:C.gold }}>؋ {a.commToday.toLocaleString()}</div>
              <div style={{ fontSize:12, color:C.g300, textAlign:"right" }}>›</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ USERS ═══ */
const UsersScreen = () => (
  <div><TopBar title="User Management" sub={`${usersList.length} registered users`}/>
    <div style={{ padding:"16px 24px" }}>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <div style={{ display:"flex", flex:1, border:`1px solid ${C.g200}`, borderRadius:8, overflow:"hidden", background:C.white }}>
          <div style={{ padding:"8px 12px", color:C.g400 }}>🔍</div>
          <input placeholder="Search by name, phone, or ID" style={{ flex:1, border:"none", outline:"none", fontSize:13, fontFamily:"inherit" }}/>
        </div>
        <div style={{ padding:"8px 14px", borderRadius:8, fontSize:12, fontWeight:600, background:C.white, color:C.g600, border:`1px solid ${C.g200}`, cursor:"pointer" }}>📥 Export</div>
      </div>
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 1fr 0.8fr", padding:"10px 18px", background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
          {["User","Phone","City","KYC","Balance","Status","Txns"].map(h=><div key={h} style={{ fontSize:11, fontWeight:700, color:C.g400 }}>{h}</div>)}
        </div>
        {usersList.map((u,i)=>(
          <div key={u.id} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 1fr 0.8fr", padding:"12px 18px", borderBottom:i<usersList.length-1?`1px solid ${C.g100}`:"none", alignItems:"center" }}>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{u.name}</div><div style={{ fontSize:10, color:C.g400 }}>{u.id}</div></div>
            <div style={{ fontSize:12, color:C.g600 }}>{u.phone}</div>
            <div style={{ fontSize:12, color:C.g600 }}>{u.city}</div>
            <div><Badge text={u.kyc} color={u.kyc==="Full"?C.deepGreen:u.kyc==="Basic"?C.blue:C.orange} bg={u.kyc==="Full"?C.greenLight:u.kyc==="Basic"?C.blueLight:C.orangeLight}/></div>
            <div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>؋ {u.balance.toLocaleString()}</div>
            <div><Badge text={u.status} color={u.status==="active"?C.deepGreen:u.status==="frozen"?C.red:C.orange} bg={u.status==="active"?C.greenLight:u.status==="frozen"?C.redLight:C.orangeLight}/></div>
            <div style={{ fontSize:13, color:C.g600 }}>{u.txns}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ TRANSACTIONS ═══ */
const TransactionsScreen = () => (
  <div><TopBar title="Transaction Monitor" sub="Real-time transaction surveillance"/>
    <div style={{ padding:"16px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        <Stat label="TOTAL TODAY" value={kpi.txnToday.toLocaleString()} icon="↕" color={C.blue} bg={C.blueLight}/>
        <Stat label="VOLUME" value={`؋ ${(kpi.txnVolumeAFN/1000000).toFixed(1)}M`} icon="📈"/>
        <Stat label="FLAGGED" value={kpi.flaggedTxns} icon="⚠" color={C.red} bg={C.redLight}/>
        <Stat label="AVG SIZE" value={`؋ ${Math.round(kpi.txnVolumeAFN/kpi.txnToday).toLocaleString()}`} icon="◎" color={C.purple} bg={C.purpleLight}/>
      </div>
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 0.8fr 1.5fr 1.5fr 1fr 0.8fr 0.7fr", padding:"10px 18px", background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
          {["Txn ID","Type","From → To","Amount","Time","Status","Risk"].map(h=><div key={h} style={{ fontSize:11, fontWeight:700, color:C.g400 }}>{h}</div>)}
        </div>
        {txnMonitor.map((t,i)=>(
          <div key={t.id} style={{ display:"grid", gridTemplateColumns:"1.5fr 0.8fr 1.5fr 1.5fr 1fr 0.8fr 0.7fr", padding:"12px 18px", borderBottom:i<txnMonitor.length-1?`1px solid ${C.g100}`:"none", alignItems:"center", background:t.risk==="high"?"rgba(239,68,68,0.03)":t.risk==="medium"?"rgba(245,158,11,0.03)":"transparent" }}>
            <div style={{ fontSize:11, fontWeight:500, color:C.g600, fontFamily:"monospace" }}>{t.id}</div>
            <div><Badge text={t.type} color={t.type==="P2P"?C.blue:t.type==="Cash-In"?C.deepGreen:C.gold} bg={t.type==="P2P"?C.blueLight:t.type==="Cash-In"?C.greenLight:C.goldLight}/></div>
            <div style={{ fontSize:12, color:C.g700 }}>{t.from} → {t.to}</div>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>؋ {t.amtAFN.toLocaleString()}</div><div style={{ fontSize:10, color:C.g400 }}>≈ $ {(t.amtAFN*0.01162).toFixed(2)}</div></div>
            <div style={{ fontSize:12, color:C.g500 }}>{t.time}</div>
            <div><Badge text={t.status} color={t.status==="completed"?C.deepGreen:t.status==="flagged"?C.red:C.orange} bg={t.status==="completed"?C.greenLight:t.status==="flagged"?C.redLight:C.orangeLight}/></div>
            <div><Badge text={t.risk} color={t.risk==="low"?C.g500:t.risk==="medium"?C.orange:C.red} bg={t.risk==="low"?C.g100:t.risk==="medium"?C.orangeLight:C.redLight}/></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ LEDGER ═══ */
const LedgerScreen = () => (
  <div><TopBar title="Central Ledger" sub="Double-entry immutable transaction record"/>
    <div style={{ padding:"16px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:24 }}>
        <div style={{ background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, borderRadius:14, padding:"20px 22px", color:C.white }}>
          <div style={{ fontSize:11, opacity:0.7, marginBottom:4 }}>Total Ledger Entries (Today)</div>
          <div style={{ fontSize:28, fontWeight:900 }}>{(kpi.txnToday*2).toLocaleString()}</div>
          <div style={{ fontSize:11, opacity:0.5, marginTop:4 }}>{kpi.txnToday} transactions × 2 (debit + credit)</div>
        </div>
        <div style={{ background:C.white, borderRadius:14, padding:"20px 22px", border:`1px solid ${C.g200}` }}>
          <div style={{ fontSize:11, color:C.g400, marginBottom:4 }}>Reconciliation Status</div>
          <div style={{ fontSize:28, fontWeight:900, color:C.deepGreen }}>✓ Balanced</div>
          <div style={{ fontSize:11, color:C.g400, marginTop:4 }}>Last check: 2 minutes ago</div>
        </div>
        <div style={{ background:C.white, borderRadius:14, padding:"20px 22px", border:`1px solid ${C.g200}` }}>
          <div style={{ fontSize:11, color:C.g400, marginBottom:4 }}>Net Platform Position</div>
          <div style={{ fontSize:28, fontWeight:900, color:C.navy }}>؋ 0</div>
          <div style={{ fontSize:11, color:C.deepGreen, marginTop:4 }}>All debits = all credits ✓</div>
        </div>
      </div>

      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.g200}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>Ledger Entries (Double-Entry)</span>
          <div style={{ display:"flex", gap:6 }}>
            <div style={{ padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:C.g100, color:C.g600, cursor:"pointer" }}>🔍 Audit Trail</div>
            <div style={{ padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:C.g100, color:C.g600, cursor:"pointer" }}>📥 Export</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr 1.5fr 1fr 1.2fr 0.8fr 0.6fr", padding:"10px 18px", background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
          {["Entry ID","Debit (From)","Credit (To)","Amount","Type","Time","✓"].map(h=><div key={h} style={{ fontSize:11, fontWeight:700, color:C.g400 }}>{h}</div>)}
        </div>
        {ledgerEntries.map((e,i)=>(
          <div key={e.id} style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr 1.5fr 1fr 1.2fr 0.8fr 0.6fr", padding:"12px 18px", borderBottom:i<ledgerEntries.length-1?`1px solid ${C.g100}`:"none", alignItems:"center" }}>
            <div style={{ fontSize:11, fontFamily:"monospace", color:C.g500 }}>{e.id}</div>
            <div style={{ fontSize:12, color:C.red, fontWeight:500 }}>⊖ {e.debit}</div>
            <div style={{ fontSize:12, color:C.deepGreen, fontWeight:500 }}>⊕ {e.credit}</div>
            <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>؋ {e.amtAFN.toLocaleString()}</div>
            <div style={{ fontSize:11, color:C.g500 }}>{e.type}</div>
            <div style={{ fontSize:11, color:C.g400 }}>{e.time}</div>
            <div style={{ fontSize:14, color:e.balanced?C.green500:C.red }}>{e.balanced?"✓":"✗"}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ FRAUD & RISK ═══ */
const FraudScreen = () => (
  <div><TopBar title="Risk & Fraud Detection" sub="AI-powered transaction monitoring"/>
    <div style={{ padding:"16px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        <Stat label="OPEN ALERTS" value="2" icon="🔴" color={C.red} bg={C.redLight}/>
        <Stat label="INVESTIGATING" value="1" icon="🔍" color={C.orange} bg={C.orangeLight}/>
        <Stat label="RESOLVED TODAY" value="4" icon="✓" color={C.green500} bg={C.greenLight}/>
        <Stat label="FALSE POSITIVE RATE" value="8.2%" icon="📊" color={C.blue} bg={C.blueLight}/>
      </div>

      <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Active Alerts</div>
      {fraudAlerts.map((a,i)=>(
        <div key={a.id} style={{
          background:C.white, borderRadius:14, border:`1px solid ${a.severity==="critical"?C.red+"40":a.severity==="high"?C.orange+"40":C.g200}`,
          padding:"16px 20px", marginBottom:10,
          borderLeft:`4px solid ${a.severity==="critical"?C.red:a.severity==="high"?C.orange:a.severity==="medium"?C.blue:C.g400}`,
        }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <Badge text={a.severity} color={a.severity==="critical"?C.red:a.severity==="high"?C.orange:a.severity==="medium"?C.blue:C.g500} bg={a.severity==="critical"?C.redLight:a.severity==="high"?C.orangeLight:a.severity==="medium"?C.blueLight:C.g100}/>
                <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>{a.title}</span>
              </div>
              <div style={{ fontSize:13, color:C.g600, lineHeight:1.5, marginBottom:8 }}>{a.desc}</div>
              <div style={{ fontSize:11, color:C.g400 }}>{a.time}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginLeft:16 }}>
              <Badge text={a.status} color={a.status==="open"?C.red:a.status==="mitigated"?C.green500:a.status==="investigating"?C.orange:C.g500} bg={a.status==="open"?C.redLight:a.status==="mitigated"?C.greenLight:a.status==="investigating"?C.orangeLight:C.g100}/>
              {a.status==="open"&&<div style={{ padding:"6px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:C.deepGreen, color:C.white, cursor:"pointer", textAlign:"center" }}>Investigate</div>}
            </div>
          </div>
        </div>
      ))}

      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px", marginTop:16 }}>
        <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Active Detection Rules</div>
        {[
          { rule:"Velocity Check", desc:"Max 3 transactions of same type within 10 minutes per user/agent", status:"Active" },
          { rule:"Amount Threshold", desc:"Auto-flag single transactions > ؋ 40,000 for review", status:"Active" },
          { rule:"KYC Tier Limits", desc:"Enforce daily limits: Basic ؋ 20K, Full ؋ 100K, Premium ؋ 500K", status:"Active" },
          { rule:"SIM Swap Detection", desc:"Auto-freeze account on carrier change, require re-verification", status:"Active" },
          { rule:"Device Fingerprinting", desc:"Alert on unrecognized device login, require PIN + OTP", status:"Active" },
          { rule:"Pattern Analysis", desc:"AI detection of unusual cash-in/out ratios per agent", status:"Beta" },
        ].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<5?`1px solid ${C.g100}`:"none" }}>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{r.rule}</div><div style={{ fontSize:11, color:C.g400, marginTop:2 }}>{r.desc}</div></div>
            <Badge text={r.status} color={r.status==="Active"?C.deepGreen:C.blue} bg={r.status==="Active"?C.greenLight:C.blueLight}/>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══ ANALYTICS ═══ */
const AnalyticsScreen = () => {
  const months = ["Sep","Oct","Nov","Dec","Jan","Feb"];
  const userGrowth = [120, 580, 1450, 2800, 3900, 4823];
  const volumeGrowth = [2.1, 8.5, 18.2, 31.0, 39.5, 47.2];
  const maxU = Math.max(...userGrowth);
  const maxV = Math.max(...volumeGrowth);
  return (
    <div><TopBar title="Analytics & Insights" sub="Platform growth and performance metrics"/>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>User Growth (Cumulative)</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:140 }}>
              {userGrowth.map((v,i)=>(
                <div key={i} style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:C.deepGreen, marginBottom:4 }}>{v>=1000?`${(v/1000).toFixed(1)}K`:v}</div>
                  <div style={{ height:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                    <div style={{ width:"70%", height:`${(v/maxU)*100}%`, background:`linear-gradient(to top,${C.deepGreen},${C.green400})`, borderRadius:"4px 4px 0 0" }}/>
                  </div>
                  <div style={{ fontSize:10, color:C.g400, marginTop:4 }}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>Monthly Volume (؋ Millions)</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:140 }}>
              {volumeGrowth.map((v,i)=>(
                <div key={i} style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:10, fontWeight:600, color:C.gold, marginBottom:4 }}>؋{v}M</div>
                  <div style={{ height:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                    <div style={{ width:"70%", height:`${(v/maxV)*100}%`, background:`linear-gradient(to top,${C.gold},${C.orange})`, borderRadius:"4px 4px 0 0" }}/>
                  </div>
                  <div style={{ fontSize:10, color:C.g400, marginTop:4 }}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Key Ratios</div>
            {[{l:"Avg Txns per User (Daily)",v:"3.1"},{l:"Avg Transaction Size",v:"؋ 12,130"},{l:"Cash-In vs Cash-Out Ratio",v:"54% / 46%"},{l:"P2P vs Agent-Mediated",v:"60% / 40%"},{l:"User Retention (30-day)",v:"78%"},{l:"Agent Utilization Rate",v:"91%"}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<5?`1px solid ${C.g100}`:"none" }}>
                <span style={{ fontSize:12, color:C.g500 }}>{r.l}</span><span style={{ fontSize:12, fontWeight:700, color:C.navy }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Revenue Breakdown (MTD)</div>
            {[{l:"Transaction Fees (0.4%)",v:"؋ 3,290,000",pct:80},{l:"Premium Agent Tiers",v:"؋ 412,000",pct:10},{l:"Enterprise API Fees",v:"؋ 247,200",pct:6},{l:"Other Revenue",v:"؋ 170,800",pct:4}].map((r,i)=>(
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                  <span style={{ fontSize:12, color:C.g600 }}>{r.l}</span><span style={{ fontSize:12, fontWeight:600, color:C.navy }}>{r.v}</span>
                </div>
                <div style={{ height:6, borderRadius:3, background:C.g100 }}>
                  <div style={{ width:`${r.pct}%`, height:"100%", background:C.gold, borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Projections (Next 6mo)</div>
            {[{l:"Users",from:"4.8K",to:"25K",growth:"+420%"},{l:"Agents",from:"156",to:"500",growth:"+220%"},{l:"Monthly Volume",from:"؋ 47M",to:"؋ 200M",growth:"+325%"},{l:"Monthly Revenue",from:"؋ 4.1M",to:"؋ 18M",growth:"+339%"}].map((r,i)=>(
              <div key={i} style={{ padding:"10px 0", borderBottom:i<3?`1px solid ${C.g100}`:"none" }}>
                <div style={{ fontSize:12, color:C.g500, marginBottom:4 }}>{r.l}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, color:C.g400 }}>{r.from}</span>
                  <span style={{ fontSize:11, color:C.g300 }}>→</span>
                  <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>{r.to}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:C.green500 }}>{r.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ SETTINGS ═══ */
const SettingsScreen = () => (
  <div><TopBar title="System Settings" sub="Platform configuration and controls"/>
    <div style={{ padding:"16px 24px", maxWidth:700 }}>
      {[
        {s:"Transaction Rules",items:[{l:"P2P Transfer Fee",v:"1.0% (Agent: 0.6% / Platform: 0.4%)"},{l:"Cash-In Fee",v:"1.0%"},{l:"Cash-Out Fee",v:"1.0%"},{l:"Daily Limit (Basic KYC)",v:"؋ 20,000"},{l:"Daily Limit (Full KYC)",v:"؋ 100,000"},{l:"Daily Limit (Premium)",v:"؋ 500,000"}]},
        {s:"Agent Configuration",items:[{l:"Agent Daily Float Limit",v:"؋ 1,500,000"},{l:"Commission Rate",v:"0.6% per transaction"},{l:"Registration Bonus",v:"؋ 0 (Beta period)"},{l:"Minimum Float Alert",v:"؋ 200,000"}]},
        {s:"Security Policies",items:[{l:"PIN Attempts Before Lock",v:"3 attempts"},{l:"Session Timeout",v:"15 minutes"},{l:"OTP Expiry",v:"5 minutes"},{l:"SIM Swap Auto-Freeze",v:"Enabled"},{l:"Device Binding",v:"Required for all agents"}]},
        {s:"Supported Currencies",items:[{l:"Primary Currency",v:"AFN (Afghan Afghani ؋)"},{l:"Secondary Currency",v:"USD (US Dollar $)"},{l:"Exchange Rate Source",v:"Da Afghanistan Bank (DAB)"},{l:"Rate Update Frequency",v:"Every 15 minutes"}]},
      ].map(s=>(
        <div key={s.s}>
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, padding:"16px 0 8px", letterSpacing:1 }}>{s.s.toUpperCase()}</div>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden", marginBottom:8 }}>
            {s.items.map((item,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:i<s.items.length-1?`1px solid ${C.g100}`:"none" }}>
                <span style={{ fontSize:13, fontWeight:500, color:C.g700 }}>{item.l}</span>
                <span style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ═══ MAIN ═══ */
export default function AdminPanel() {
  const [screen, setScreen] = useState("overview");
  return (
    <div style={{ display:"flex", minHeight:"calc(100vh - 56px)", background:C.off, fontFamily:"'Outfit',sans-serif" }}>
      <Sidebar active={screen} onNav={setScreen}/>
      <div style={{ flex:1, overflowY:"auto", maxHeight:"100vh" }}>
        {screen==="overview"&&<OverviewScreen go={setScreen}/>}
        {screen==="agents"&&<AgentsScreen/>}
        {screen==="users"&&<UsersScreen/>}
        {screen==="transactions"&&<TransactionsScreen/>}
        {screen==="ledger"&&<LedgerScreen/>}
        {screen==="fraud"&&<FraudScreen/>}
        {screen==="analytics"&&<AnalyticsScreen/>}
        {screen==="settings"&&<SettingsScreen/>}
      </div>
    </div>
  );
}
