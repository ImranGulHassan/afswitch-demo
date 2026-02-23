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
  greenGlow:"rgba(10,104,71,0.12)",
};

const agent = { name:"Sarafi Noor Exchange", id:"AGT-0042", area:"Mandawi, Kabul", phone:"+93 70 555 0001", tier:"Gold", floatAFN:850000, floatUSD:9878.50, commToday:2820, commWeek:18450, commMonth:72300, txnToday:47, usersRegistered:3, status:"Active" };

const recentTxns = [
  { id:"TXN-9001", type:"cash-in", user:"Ahmad Noori", phone:"+93 70 123 4567", amtAFN:10000, amtUSD:116.20, time:"10:23 AM", comm:60, status:"Completed" },
  { id:"TXN-9002", type:"cash-out", user:"Fatima Rahimi", phone:"+93 79 987 6543", amtAFN:5000, amtUSD:58.10, time:"10:05 AM", comm:30, status:"Completed" },
  { id:"TXN-9003", type:"cash-in", user:"Khalid Wardak", phone:"+93 72 555 8901", amtAFN:20000, amtUSD:232.40, time:"9:42 AM", comm:120, status:"Completed" },
  { id:"TXN-9004", type:"registration", user:"Zahra Ahmadi", phone:"+93 78 234 5678", amtAFN:0, amtUSD:0, time:"9:15 AM", comm:0, status:"Completed" },
  { id:"TXN-9005", type:"cash-out", user:"Mohammad Karimi", phone:"+93 70 876 5432", amtAFN:8000, amtUSD:92.96, time:"8:50 AM", comm:48, status:"Completed" },
  { id:"TXN-9006", type:"cash-in", user:"Mariam Stanikzai", phone:"+93 73 111 2233", amtAFN:3000, amtUSD:34.86, time:"8:31 AM", comm:18, status:"Completed" },
  { id:"TXN-9007", type:"cash-out", user:"Nawid Sadat", phone:"+93 77 444 3322", amtAFN:15000, amtUSD:174.30, time:"Yesterday", comm:90, status:"Completed" },
  { id:"TXN-9008", type:"cash-in", user:"Shogofa Yari", phone:"+93 78 999 1122", amtAFN:7000, amtUSD:81.34, time:"Yesterday", comm:42, status:"Completed" },
  { id:"TXN-9009", type:"cash-out", user:"Faisal Nazari", phone:"+93 70 222 3344", amtAFN:25000, amtUSD:290.50, time:"Yesterday", comm:150, status:"Completed" },
  { id:"TXN-9010", type:"cash-in", user:"Laila Habibi", phone:"+93 79 888 7766", amtAFN:4000, amtUSD:46.48, time:"2 days ago", comm:24, status:"Completed" },
];

const dailyVolume = [
  { day:"Mon", vol:320000, txns:28 }, { day:"Tue", vol:480000, txns:42 },
  { day:"Wed", vol:390000, txns:35 }, { day:"Thu", vol:560000, txns:51 },
  { day:"Fri", vol:710000, txns:63 }, { day:"Sat", vol:420000, txns:38 },
  { day:"Sun", vol:280000, txns:22 },
];

const topUpHistory = [
  { id:"TU-301", amt:500000, date:"Feb 22", status:"Completed", method:"Bank Transfer" },
  { id:"TU-300", amt:300000, date:"Feb 18", status:"Completed", method:"Cash Collection" },
  { id:"TU-299", amt:400000, date:"Feb 14", status:"Completed", method:"Bank Transfer" },
];

const alerts = [
  { id:1, type:"warning", msg:"Float balance below ؋ 1,000,000 — consider requesting top-up", time:"1 hr ago" },
  { id:2, type:"success", msg:"Daily reconciliation passed — all balances match", time:"6 hr ago" },
  { id:3, type:"info", msg:"New feature: USD cash-out now available for your tier", time:"Yesterday" },
];

/* ─── Components ─── */
const Sidebar = ({ active, onNav, isMobile }) => {
  const items = [
    { id:"home", icon:"⊞", l:"Dashboard" },
    { id:"cashIn", icon:"↙", l:"Cash-In" },
    { id:"cashOut", icon:"↗", l:"Cash-Out" },
    { id:"register", icon:"+", l:"Register" },
    { id:"txnLog", icon:"☰", l:"Txns" },
    { id:"earnings", icon:"◈", l:"Earnings" },
    { id:"float", icon:"◎", l:"Float" },
    { id:"settings", icon:"⚙", l:"Settings" },
  ];
  if(isMobile){
    return (
      <div style={{ display:"flex", background:C.navy, borderBottom:`1px solid rgba(255,255,255,0.06)`, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        {items.map(it=>(
          <div key={it.id} onClick={()=>onNav(it.id)} style={{
            display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"10px 12px",
            cursor:"pointer", flexShrink:0, minWidth:56,
            background:active===it.id?"rgba(10,104,71,0.25)":"transparent",
            color:active===it.id?C.green400:"rgba(255,255,255,0.45)",
          }}>
            <span style={{ fontSize:16 }}>{it.icon}</span>
            <span style={{ fontSize:9, fontWeight:active===it.id?700:500, whiteSpace:"nowrap" }}>{it.l}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ width:220, background:C.navy, minHeight:"100%", display:"flex", flexDirection:"column", borderRight:`1px solid rgba(255,255,255,0.06)` }}>
      <div style={{ padding:"20px 18px 16px", borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
          <div style={{ background:C.deepGreen, color:C.white, padding:"5px 10px", borderRadius:8, fontWeight:900, fontSize:13, letterSpacing:1 }}>AF</div>
          <div><div style={{ color:C.white, fontSize:14, fontWeight:700 }}>AFSWITCH</div><div style={{ color:C.g500, fontSize:10, fontWeight:500 }}>Agent Portal</div></div>
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"10px 12px" }}>
          <div style={{ fontSize:12, fontWeight:600, color:C.white }}>{agent.name}</div>
          <div style={{ fontSize:10, color:C.g400, marginTop:2 }}>{agent.id} • {agent.area}</div>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green400 }}/>
            <span style={{ fontSize:10, fontWeight:600, color:C.green400 }}>Online</span>
            <span style={{ fontSize:9, color:C.gold, background:"rgba(200,162,78,0.15)", padding:"1px 8px", borderRadius:4, marginLeft:4, fontWeight:600 }}>{agent.tier}</span>
          </div>
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
            <span style={{ fontSize:16, width:20, textAlign:"center" }}>{it.icon}</span>
            <span style={{ fontSize:13, fontWeight:active===it.id?700:500 }}>{it.l}</span>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 12px 16px", borderTop:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ fontSize:10, color:C.g500, marginBottom:4 }}>Today's Limits</div>
        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:6, height:6, overflow:"hidden" }}>
          <div style={{ width:"62%", height:"100%", background:`linear-gradient(90deg,${C.deepGreen},${C.green400})`, borderRadius:6 }}/>
        </div>
        <div style={{ fontSize:10, color:C.g400, marginTop:4 }}>؋ 850,000 / ؋ 1,500,000 daily</div>
      </div>
    </div>
  );
};

const TopBar = ({ title, subtitle }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 28px", background:C.white, borderBottom:`1px solid ${C.g200}` }}>
    <div>
      <div style={{ fontSize:20, fontWeight:800, color:C.navy }}>{title}</div>
      {subtitle&&<div style={{ fontSize:12, color:C.g400, marginTop:2 }}>{subtitle}</div>}
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ fontSize:12, color:C.g500 }}>Mon, Feb 23, 2026</div>
      <div style={{ width:1, height:20, background:C.g200 }}/>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:12, fontWeight:700 }}>SN</div>
        <div style={{ fontSize:12, fontWeight:600, color:C.g700 }}>Noor Exchange</div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, sub, icon, color=C.deepGreen, bgColor=C.greenLight }) => (
  <div style={{ background:C.white, borderRadius:14, padding:"18px 20px", border:`1px solid ${C.g200}`, flex:1, minWidth:0 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:11, color:C.g400, fontWeight:600, marginBottom:6 }}>{label}</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy }}>{value}</div>
        {sub&&<div style={{ fontSize:11, color:C.g400, marginTop:4 }}>{sub}</div>}
      </div>
      <div style={{ width:40, height:40, borderRadius:12, background:bgColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:color }}>{icon}</div>
    </div>
  </div>
);

const Btn = ({ children, onClick, variant="primary", style={} }) => {
  const s = { primary:{background:C.deepGreen,color:C.white}, gold:{background:C.gold,color:C.navy}, outline:{background:"transparent",color:C.deepGreen,border:`2px solid ${C.deepGreen}`}, ghost:{background:C.g100,color:C.g700}, danger:{background:C.redLight,color:C.red} };
  return <div onClick={onClick} style={{ padding:"12px 24px", borderRadius:10, textAlign:"center", fontSize:14, fontWeight:700, cursor:"pointer", transition:"opacity 0.15s", ...s[variant], ...style }}>{children}</div>;
};

/* ═══ LOGIN ═══ */
const LoginScreen = ({ onLogin }) => (
  <div style={{ minHeight:"calc(100vh - 56px)", background:`linear-gradient(165deg,${C.navy} 0%,#0a1a2e 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ width:380, background:C.white, borderRadius:20, padding:"40px 36px", boxShadow:"0 20px 60px rgba(0,0,0,0.3)" }}>
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <div style={{ background:C.deepGreen, color:C.white, padding:"6px 12px", borderRadius:8, fontWeight:900, fontSize:14 }}>AF</div>
          <span style={{ fontSize:18, fontWeight:800, color:C.navy }}>AFSWITCH</span>
        </div>
        <div style={{ fontSize:22, fontWeight:800, color:C.navy }}>Agent Portal</div>
        <div style={{ fontSize:13, color:C.g500, marginTop:4 }}>Sign in to your agent dashboard</div>
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Phone Number</div>
        <div style={{ display:"flex", border:`2px solid ${C.g200}`, borderRadius:10, overflow:"hidden" }}>
          <div style={{ padding:"12px", background:C.g50, borderRight:`1px solid ${C.g200}`, fontSize:13, fontWeight:600, color:C.g700 }}>🇦🇫 +93</div>
          <input defaultValue="70 555 0001" style={{ flex:1, border:"none", outline:"none", padding:"12px", fontSize:14, fontFamily:"inherit" }}/>
        </div>
      </div>
      <div style={{ marginBottom:16 }}>
        <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Agent PIN</div>
        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{ width:40, height:44, borderRadius:8, border:`2px solid ${i<4?C.deepGreen:C.g200}`, background:i<4?C.greenLight:C.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:C.navy }}>{i<4?"•":""}</div>)}
        </div>
      </div>
      <div style={{ background:C.goldLight, borderRadius:8, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:14 }}>📱</span>
        <span style={{ fontSize:11, color:C.gold, lineHeight:1.4 }}>Device binding active: Samsung Galaxy A54 — Mandawi, Kabul</span>
      </div>
      <Btn onClick={onLogin} style={{ width:"100%" }}>Sign In</Btn>
      <div style={{ textAlign:"center", marginTop:16, fontSize:12, color:C.g400 }}>Need help? <span style={{ color:C.deepGreen, fontWeight:600, cursor:"pointer" }}>Contact Support</span></div>
    </div>
  </div>
);

/* ═══ DASHBOARD HOME ═══ */
const DashboardHome = ({ go, isMobile }) => (
  <div>
    <TopBar title="Dashboard" subtitle="Welcome back, Noor Exchange"/>
    <div style={{ padding:isMobile?12:24 }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"repeat(2,1fr)":"repeat(4,1fr)", gap:isMobile?8:16, marginBottom:isMobile?16:24 }}>
        <StatCard label="FLOAT BALANCE" value={`؋ ${agent.floatAFN.toLocaleString()}`} sub={`≈ $ ${agent.floatUSD.toLocaleString()} USD`} icon="◎" />
        <StatCard label="TODAY'S TRANSACTIONS" value={agent.txnToday} sub="22 cash-in · 25 cash-out" icon="↕" color={C.blue} bgColor={C.blueLight}/>
        <StatCard label="TODAY'S COMMISSION" value={`؋ ${agent.commToday.toLocaleString()}`} sub={`≈ $ ${(agent.commToday*0.01162).toFixed(2)}`} icon="◈" color={C.gold} bgColor={C.goldLight}/>
        <StatCard label="USERS REGISTERED" value={agent.usersRegistered} sub="This week: 12" icon="+" color={C.green500} bgColor={C.greenLight}/>
      </div>

      {/* Quick Actions */}
      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)", gap:12, marginBottom:isMobile?16:24 }}>
        {[
          { l:"Cash-In", desc:"Deposit cash to user wallet", icon:"↙", color:C.deepGreen, bg:C.greenLight, act:"cashIn" },
          { l:"Cash-Out", desc:"Withdraw cash from wallet", icon:"↗", color:C.gold, bg:C.goldLight, act:"cashOut" },
          { l:"Register User", desc:"Onboard a new AFSWITCH user", icon:"+", color:C.blue, bg:C.blueLight, act:"register" },
        ].map(a=>(
          <div key={a.l} onClick={()=>go(a.act)} style={{ background:C.white, borderRadius:14, padding:"20px 18px", border:`1px solid ${C.g200}`, cursor:"pointer", transition:"transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.06)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
            <div style={{ width:44, height:44, borderRadius:12, background:a.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:a.color, fontWeight:700, marginBottom:12 }}>{a.icon}</div>
            <div style={{ fontSize:15, fontWeight:700, color:C.navy }}>{a.l}</div>
            <div style={{ fontSize:12, color:C.g400, marginTop:4 }}>{a.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:16 }}>
        {/* Recent Transactions */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.g100}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>Recent Transactions</span>
            <span onClick={()=>go("txnLog")} style={{ fontSize:12, color:C.deepGreen, fontWeight:600, cursor:"pointer" }}>View All</span>
          </div>
          {recentTxns.slice(0,5).map((t,i)=>(
            <div key={t.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 18px", borderBottom:i<4?`1px solid ${C.g50}`:"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:t.type==="cash-in"?C.greenLight:t.type==="cash-out"?C.goldLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>
                  {t.type==="cash-in"?"↙":t.type==="cash-out"?"↗":"+"}
                </div>
                <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{t.user}</div><div style={{ fontSize:10, color:C.g400 }}>{t.time}</div></div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.g700:C.blue }}>
                  {t.type==="registration"?"New User":`${t.type==="cash-in"?"+":"−"}؋ ${t.amtAFN.toLocaleString()}`}
                </div>
                {t.comm>0&&<div style={{ fontSize:10, color:C.gold }}>+؋{t.comm} comm</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Alerts + Volume Chart */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Alerts */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"14px 18px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Alerts</div>
            {alerts.map(a=>(
              <div key={a.id} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.g50}` }}>
                <div style={{ width:8, height:8, borderRadius:"50%", marginTop:5, flexShrink:0, background:a.type==="warning"?C.orange:a.type==="success"?C.green400:C.blue }}/>
                <div><div style={{ fontSize:12, color:C.g700, lineHeight:1.4 }}>{a.msg}</div><div style={{ fontSize:10, color:C.g400, marginTop:2 }}>{a.time}</div></div>
              </div>
            ))}
          </div>

          {/* Mini Volume Chart */}
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"14px 18px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:12 }}>Weekly Volume</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:80 }}>
              {dailyVolume.map((d,i)=>{
                const maxV = Math.max(...dailyVolume.map(x=>x.vol));
                const h = (d.vol/maxV)*100;
                return (
                  <div key={i} style={{ flex:1, textAlign:"center" }}>
                    <div style={{ height:70, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                      <div style={{ width:"100%", height:`${h}%`, background:i===4?C.deepGreen:`${C.deepGreen}30`, borderRadius:"4px 4px 0 0", transition:"height 0.3s" }}/>
                    </div>
                    <div style={{ fontSize:9, color:C.g400, marginTop:4, fontWeight:i===4?700:400 }}>{d.day}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize:11, color:C.g400, marginTop:8, textAlign:"center" }}>Total: ؋ {dailyVolume.reduce((s,d)=>s+d.vol,0).toLocaleString()} this week</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ═══ CASH-IN ═══ */
const CashInScreen = ({ go }) => {
  const [step,setStep]=useState(0);const [phone,setPhone]=useState("");const [user,setUser]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");
  const conv = cur==="AFN"?`$ ${(Number(amt)*0.01162).toFixed(2)} USD`:`؋ ${Math.round(Number(amt)/0.01162).toLocaleString()} AFN`;
  const foundUser = { name:"Ahmad Noori", phone:"+93 70 123 4567", verified:true, balance:"؋ 12,500" };

  if(step===3) return (
    <div><TopBar title="Cash-In" subtitle="Deposit Complete"/>
      <div style={{ maxWidth:500, margin:"40px auto", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.greenLight, margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>✓</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy, marginBottom:4 }}>Deposit Successful</div>
        <div style={{ fontSize:14, color:C.g500, marginBottom:24 }}>Digits credited to user's wallet</div>
        <div style={{ background:C.g50, borderRadius:14, padding:20, textAlign:"left", marginBottom:24 }}>
          {[{l:"User",v:foundUser.name},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Equivalent",v:conv},{l:"Commission Earned",v:`؋ ${Math.round(Number(amt||0)*0.006).toLocaleString()}`,color:C.gold},{l:"Receipt No.",v:"RCP-2026-0223-047",mono:true},{l:"Time",v:"10:24 AM, Feb 23, 2026"}].map((r,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<5?`1px solid ${C.g200}`:"none" }}>
              <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:600, color:r.color||C.g800, fontFamily:r.mono?"monospace":"inherit" }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <Btn onClick={()=>setStep(0)} variant="outline" style={{ padding:"12px 28px" }}>New Deposit</Btn>
          <Btn onClick={()=>go("home")} style={{ padding:"12px 28px" }}>Back to Dashboard</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div><TopBar title="Cash-In (Deposit)" subtitle="Credit digits to a user's wallet"/>
      <div style={{ maxWidth:520, margin:"24px auto", padding:"0 24px" }}>
        {/* Progress */}
        <div style={{ display:"flex", gap:4, marginBottom:28 }}>
          {["Find User","Enter Amount","Confirm"].map((s,i)=>(
            <div key={i} style={{ flex:1 }}>
              <div style={{ height:4, borderRadius:2, background:i<=step?C.deepGreen:C.g200, transition:"background 0.3s" }}/>
              <div style={{ fontSize:10, fontWeight:600, color:i<=step?C.deepGreen:C.g400, marginTop:4 }}>{s}</div>
            </div>
          ))}
        </div>

        {step===0&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Find User</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>User Phone Number</div>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ display:"flex", flex:1, border:`2px solid ${C.g200}`, borderRadius:10, overflow:"hidden" }}>
                <div style={{ padding:"12px", background:C.g50, borderRight:`1px solid ${C.g200}`, fontSize:13, fontWeight:600, color:C.g700 }}>+93</div>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="70 123 4567" style={{ flex:1, border:"none", outline:"none", padding:"12px", fontSize:14, fontFamily:"inherit" }}/>
              </div>
              <Btn onClick={()=>setUser(foundUser)} style={{ padding:"12px 20px", whiteSpace:"nowrap" }}>Search</Btn>
            </div>
            <div style={{ fontSize:11, color:C.g400, marginTop:6 }}>Or scan user's QR code</div>

            {user&&(
              <div style={{ marginTop:20, background:C.greenLight, borderRadius:12, padding:"16px 18px", border:`1px solid ${C.deepGreen}20` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:14, fontWeight:700 }}>AN</div>
                    <div><div style={{ fontSize:15, fontWeight:700, color:C.navy }}>{user.name}</div><div style={{ fontSize:12, color:C.g500 }}>{user.phone}</div></div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:C.green400 }}/><span style={{ fontSize:11, fontWeight:600, color:C.deepGreen }}>Verified</span>
                  </div>
                </div>
                <div style={{ marginTop:12 }}>
                  <Btn onClick={()=>setStep(1)}>Proceed to Deposit</Btn>
                </div>
              </div>
            )}
          </div>
        )}

        {step===1&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, padding:"12px 14px", background:C.g50, borderRadius:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:12, fontWeight:700 }}>AN</div>
              <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{foundUser.name}</div><div style={{ fontSize:11, color:C.g400 }}>{foundUser.phone}</div></div>
            </div>
            <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>Cash Amount Received</div>
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16 }}>
              {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"6px 20px", borderRadius:8, fontSize:13, fontWeight:700, background:cur===c?C.deepGreen:C.g100, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
            </div>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <input value={amt} onChange={e=>setAmt(e.target.value.replace(/[^0-9.]/g,""))} placeholder="0" style={{ fontSize:40, fontWeight:900, border:"none", outline:"none", textAlign:"center", width:"100%", color:C.navy, fontFamily:"inherit" }}/>
              <div style={{ fontSize:11, color:C.g400 }}>{cur==="AFN"?"؋":"$"} {amt||"0"} {amt?`≈ ${conv}`:""}</div>
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:20 }}>
              {(cur==="AFN"?[1000,5000,10000,20000,50000]:[10,50,100,200,500]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"6px 10px", borderRadius:6, fontSize:11, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${(a/1000)}k`:`$${a}`}</div>)}
            </div>
            {amt&&<div style={{ background:C.goldLight, borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:12, color:C.gold }}>Commission: ؋ {Math.round(Number(amt)*0.006).toLocaleString()} (0.6%)</div>}
            <Btn onClick={()=>amt&&setStep(2)} variant={amt?"primary":"ghost"}>Review Deposit</Btn>
          </div>
        )}

        {step===2&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Confirm Deposit</div>
            <div style={{ background:C.g50, borderRadius:12, padding:16, marginBottom:20 }}>
              {[{l:"User",v:foundUser.name},{l:"Phone",v:foundUser.phone},{l:"Deposit Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`,bold:true},{l:"Equivalent",v:conv},{l:"Your Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold},{l:"Net Float Deduction",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}].map((r,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<5?`1px solid ${C.g200}`:"none" }}>
                  <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:r.bold?800:600, color:r.color||C.g800 }}>{r.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:C.greenLight, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <span>🔒</span><span style={{ fontSize:11, color:C.deepGreen, lineHeight:1.4 }}>This deposit will be recorded on the immutable ledger and cannot be reversed without admin approval.</span>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={()=>setStep(1)} variant="ghost" style={{ flex:1 }}>Back</Btn>
              <Btn onClick={()=>setStep(3)} variant="gold" style={{ flex:2 }}>Confirm Deposit</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══ CASH-OUT ═══ */
const CashOutScreen = ({ go }) => {
  const [step,setStep]=useState(0);const [phone,setPhone]=useState("");const [user,setUser]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");
  const conv = cur==="AFN"?`$ ${(Number(amt)*0.01162).toFixed(2)} USD`:`؋ ${Math.round(Number(amt)/0.01162).toLocaleString()} AFN`;
  const foundUser = { name:"Fatima Rahimi", phone:"+93 79 987 6543", verified:true, balance:"؋ 8,200", balUSD:"$ 95.28" };

  if(step===3) return (
    <div><TopBar title="Cash-Out" subtitle="Withdrawal Complete"/>
      <div style={{ maxWidth:500, margin:"40px auto", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.goldLight, margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>✓</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy, marginBottom:4 }}>Withdrawal Complete</div>
        <div style={{ fontSize:14, color:C.g500, marginBottom:8 }}>Please hand the cash to the user</div>
        <div style={{ display:"inline-block", background:C.navy, color:C.gold, padding:"8px 24px", borderRadius:8, fontSize:22, fontWeight:800, marginBottom:24, fontFamily:"monospace", letterSpacing:2 }}>
          {cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}
        </div>
        <div style={{ background:C.g50, borderRadius:14, padding:20, textAlign:"left", marginBottom:24 }}>
          {[{l:"User",v:foundUser.name},{l:"Amount Disbursed",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Commission Earned",v:`؋ ${Math.round(Number(amt||0)*0.006).toLocaleString()}`,color:C.gold},{l:"Receipt No.",v:"RCP-2026-0223-048",mono:true}].map((r,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<3?`1px solid ${C.g200}`:"none" }}>
              <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:600, color:r.color||C.g800, fontFamily:r.mono?"monospace":"inherit" }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <Btn onClick={()=>setStep(0)} variant="outline" style={{ padding:"12px 28px" }}>New Withdrawal</Btn>
          <Btn onClick={()=>go("home")} style={{ padding:"12px 28px" }}>Dashboard</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div><TopBar title="Cash-Out (Withdrawal)" subtitle="Debit digits from user's wallet and give cash"/>
      <div style={{ maxWidth:520, margin:"24px auto", padding:"0 24px" }}>
        <div style={{ display:"flex", gap:4, marginBottom:28 }}>
          {["Find User","Enter Amount","Confirm"].map((s,i)=>(<div key={i} style={{ flex:1 }}><div style={{ height:4, borderRadius:2, background:i<=step?C.gold:C.g200 }}/><div style={{ fontSize:10, fontWeight:600, color:i<=step?C.gold:C.g400, marginTop:4 }}>{s}</div></div>))}
        </div>

        {step===0&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Find User</div>
            <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>User Phone Number or Withdrawal Code</div>
            <div style={{ display:"flex", gap:8 }}>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone or code (e.g. WDR-3291)" style={{ flex:1, border:`2px solid ${C.g200}`, borderRadius:10, padding:"12px", fontSize:14, fontFamily:"inherit", outline:"none" }}/>
              <Btn onClick={()=>setUser(foundUser)} style={{ padding:"12px 20px" }}>Search</Btn>
            </div>
            {user&&(
              <div style={{ marginTop:20, background:C.goldLight, borderRadius:12, padding:"16px 18px", border:`1px solid ${C.gold}20` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${C.gold},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:14, fontWeight:700 }}>FR</div>
                    <div><div style={{ fontSize:15, fontWeight:700, color:C.navy }}>{user.name}</div><div style={{ fontSize:12, color:C.g500 }}>{user.phone}</div></div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color:C.g400 }}>Balance</div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{user.balance}</div>
                    <div style={{ fontSize:10, color:C.g400 }}>{user.balUSD}</div>
                  </div>
                </div>
                <div style={{ marginTop:12 }}><Btn onClick={()=>setStep(1)} variant="gold" style={{ background:C.gold }}>Proceed to Withdrawal</Btn></div>
              </div>
            )}
          </div>
        )}

        {step===1&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, padding:"12px 14px", background:C.g50, borderRadius:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`linear-gradient(135deg,${C.gold},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:12, fontWeight:700 }}>FR</div>
              <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{foundUser.name}</div><div style={{ fontSize:11, color:C.g400 }}>{foundUser.phone}</div></div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:10, color:C.g400 }}>Available</div><div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{foundUser.balance}</div></div>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16 }}>
              {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"6px 20px", borderRadius:8, fontSize:13, fontWeight:700, background:cur===c?C.gold:C.g100, color:cur===c?C.navy:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
            </div>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <input value={amt} onChange={e=>setAmt(e.target.value.replace(/[^0-9.]/g,""))} placeholder="0" style={{ fontSize:40, fontWeight:900, border:"none", outline:"none", textAlign:"center", width:"100%", color:C.navy, fontFamily:"inherit" }}/>
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:20 }}>
              {(cur==="AFN"?[1000,2000,5000,8200]:[10,50,95]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"6px 10px", borderRadius:6, fontSize:11, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
            </div>
            <div style={{ background:C.orangeLight, borderRadius:8, padding:"8px 12px", marginBottom:16, fontSize:12, color:C.orange }}>⚠ User must confirm this withdrawal on their phone with PIN</div>
            <Btn onClick={()=>amt&&setStep(2)} variant={amt?"gold":"ghost"}>Review Withdrawal</Btn>
          </div>
        )}

        {step===2&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Confirm Withdrawal</div>
            <div style={{ background:C.g50, borderRadius:12, padding:16, marginBottom:20 }}>
              {[{l:"User",v:foundUser.name},{l:"Withdrawal Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`,bold:true},{l:"Equivalent",v:conv},{l:"Cash to Disburse",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`,color:C.gold,bold:true},{l:"Your Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold}].map((r,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<4?`1px solid ${C.g200}`:"none" }}>
                  <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:r.bold?800:600, color:r.color||C.g800 }}>{r.v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:C.orangeLight, borderRadius:10, padding:"10px 14px", marginBottom:20, fontSize:11, color:C.orange, lineHeight:1.4 }}>⚠ Awaiting user PIN confirmation on their device. Do NOT hand cash until status shows "Confirmed".</div>
            <div style={{ background:C.greenLight, borderRadius:10, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:C.green400 }}/><span style={{ fontSize:12, fontWeight:600, color:C.deepGreen }}>User has confirmed with PIN ✓</span>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={()=>setStep(1)} variant="ghost" style={{ flex:1 }}>Back</Btn>
              <Btn onClick={()=>setStep(3)} variant="gold" style={{ flex:2 }}>Complete & Disburse Cash</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══ REGISTER USER ═══ */
const RegisterScreen = ({ go }) => {
  const [step,setStep]=useState(0);
  if(step===2) return (
    <div><TopBar title="Register User" subtitle="Registration Complete"/>
      <div style={{ maxWidth:500, margin:"40px auto", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:C.blueLight, margin:"0 auto 16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>✓</div>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy, marginBottom:4 }}>User Registered!</div>
        <div style={{ fontSize:14, color:C.g500, marginBottom:24 }}>OTP sent to user's phone for activation</div>
        <div style={{ background:C.g50, borderRadius:14, padding:20, textAlign:"left", marginBottom:24 }}>
          {[{l:"Name",v:"Zahra Ahmadi"},{l:"Phone",v:"+93 78 234 5678"},{l:"District",v:"Karte-4, Kabul"},{l:"KYC Status",v:"Basic (Tazkira submitted)",color:C.blue},{l:"Wallet Status",v:"Pending OTP verification",color:C.orange}].map((r,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<4?`1px solid ${C.g200}`:"none" }}>
              <span style={{ fontSize:13, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:600, color:r.color||C.g800 }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
          <Btn onClick={()=>setStep(0)} variant="outline" style={{ padding:"12px 28px" }}>Register Another</Btn>
          <Btn onClick={()=>go("home")} style={{ padding:"12px 28px" }}>Dashboard</Btn>
        </div>
      </div>
    </div>
  );

  return (
    <div><TopBar title="Register New User" subtitle="Onboard a walk-in user to AFSWITCH"/>
      <div style={{ maxWidth:520, margin:"24px auto", padding:"0 24px" }}>
        <div style={{ display:"flex", gap:4, marginBottom:28 }}>
          {["User Info","Identity (KYC)"].map((s,i)=>(<div key={i} style={{ flex:1 }}><div style={{ height:4, borderRadius:2, background:i<=step?C.blue:C.g200 }}/><div style={{ fontSize:10, fontWeight:600, color:i<=step?C.blue:C.g400, marginTop:4 }}>{s}</div></div>))}
        </div>

        {step===0&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:20 }}>Basic Information</div>
            {[{l:"Full Name",ph:"Enter user's full name",def:"Zahra Ahmadi"},{l:"Phone Number",ph:"+93 7X XXX XXXX",def:"+93 78 234 5678"},{l:"District / Area",ph:"e.g. Karte-4, Kabul",def:"Karte-4, Kabul"}].map((f,i)=>(
              <div key={i} style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>{f.l}</div>
                <input defaultValue={f.def} placeholder={f.ph} style={{ width:"100%", boxSizing:"border-box", border:`2px solid ${C.g200}`, borderRadius:10, padding:"12px 14px", fontSize:14, fontFamily:"inherit", outline:"none" }}/>
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Gender</div>
              <div style={{ display:"flex", gap:8 }}>
                {["Male","Female"].map((g,i)=><div key={g} style={{ flex:1, padding:"10px", borderRadius:8, textAlign:"center", fontSize:13, fontWeight:600, background:i===1?C.deepGreen:C.g100, color:i===1?C.white:C.g600, cursor:"pointer", border:`1px solid ${i===1?C.deepGreen:C.g200}` }}>{g}</div>)}
              </div>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Preferred Language</div>
              <div style={{ display:"flex", gap:8 }}>
                {["دری","پښتو","English"].map((l,i)=><div key={l} style={{ flex:1, padding:"10px", borderRadius:8, textAlign:"center", fontSize:13, fontWeight:600, background:i===0?C.deepGreen:C.g100, color:i===0?C.white:C.g600, cursor:"pointer" }}>{l}</div>)}
              </div>
            </div>
            <Btn onClick={()=>setStep(1)}>Next: Identity Verification</Btn>
          </div>
        )}

        {step===1&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:20 }}>Identity Verification (KYC)</div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>Tazkira (National ID) — Front</div>
              <div style={{ border:`2px dashed ${C.g300}`, borderRadius:12, padding:"28px 20px", textAlign:"center", cursor:"pointer", background:C.g50 }}>
                <div style={{ fontSize:32, marginBottom:8 }}>📷</div>
                <div style={{ fontSize:13, fontWeight:600, color:C.g600 }}>Tap to capture or upload</div>
                <div style={{ fontSize:11, color:C.g400, marginTop:4 }}>Clear photo of Tazkira front side</div>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>Tazkira — Back (Optional)</div>
              <div style={{ border:`2px dashed ${C.g300}`, borderRadius:12, padding:"20px", textAlign:"center", cursor:"pointer", background:C.g50 }}>
                <div style={{ fontSize:24, marginBottom:4 }}>📷</div>
                <div style={{ fontSize:12, fontWeight:600, color:C.g600 }}>Tap to capture</div>
              </div>
            </div>
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>User Photo (Selfie)</div>
              <div style={{ border:`2px dashed ${C.blue}40`, borderRadius:12, padding:"20px", textAlign:"center", cursor:"pointer", background:C.blueLight }}>
                <div style={{ fontSize:24, marginBottom:4 }}>🤳</div>
                <div style={{ fontSize:12, fontWeight:600, color:C.blue }}>Capture user photo</div>
              </div>
            </div>
            <div style={{ background:C.blueLight, borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:11, color:C.blue, lineHeight:1.4 }}>ℹ Basic KYC enables Tier 1 access (؋ 20,000/day limit). Full verification unlocks higher tiers.</div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={()=>setStep(0)} variant="ghost" style={{ flex:1 }}>Back</Btn>
              <Btn onClick={()=>setStep(2)} style={{ flex:2 }}>Submit Registration</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══ TRANSACTION LOG ═══ */
const TxnLogScreen = () => {
  const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?recentTxns:recentTxns.filter(t=>t.type===filter);
  return (
    <div><TopBar title="Transaction Log" subtitle={`${recentTxns.length} transactions processed`}/>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
          {[{id:"all",l:"All"},{id:"cash-in",l:"Cash-In"},{id:"cash-out",l:"Cash-Out"},{id:"registration",l:"Registrations"}].map(f=>(
            <div key={f.id} onClick={()=>setFilter(f.id)} style={{ padding:"6px 16px", borderRadius:8, fontSize:12, fontWeight:600, background:filter===f.id?C.deepGreen:C.white, color:filter===f.id?C.white:C.g500, cursor:"pointer", border:`1px solid ${filter===f.id?C.deepGreen:C.g200}` }}>{f.l}</div>
          ))}
          <div style={{ marginLeft:"auto", display:"flex", gap:8 }}>
            <div style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, background:C.white, color:C.g600, border:`1px solid ${C.g200}`, cursor:"pointer" }}>📅 Date Range</div>
            <div style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, background:C.white, color:C.g600, border:`1px solid ${C.g200}`, cursor:"pointer" }}>📥 Export CSV</div>
          </div>
        </div>

        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 0.8fr", padding:"10px 18px", background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
            {["User","Type","Amount","Commission","Time","Status"].map(h=><div key={h} style={{ fontSize:11, fontWeight:700, color:C.g400, letterSpacing:0.5 }}>{h}</div>)}
          </div>
          {filtered.map((t,i)=>(
            <div key={t.id} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr 1fr 0.8fr", padding:"12px 18px", borderBottom:i<filtered.length-1?`1px solid ${C.g100}`:"none", alignItems:"center" }}>
              <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{t.user}</div><div style={{ fontSize:10, color:C.g400 }}>{t.phone}</div></div>
              <div><span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:6, background:t.type==="cash-in"?C.greenLight:t.type==="cash-out"?C.goldLight:C.blueLight, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>{t.type==="cash-in"?"Cash-In":t.type==="cash-out"?"Cash-Out":"Registration"}</span></div>
              <div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{t.amtAFN?`؋ ${t.amtAFN.toLocaleString()}`:"—"}</div>
              <div style={{ fontSize:13, fontWeight:600, color:t.comm?C.gold:C.g300 }}>{t.comm?`؋ ${t.comm}`:  "—"}</div>
              <div style={{ fontSize:12, color:C.g500 }}>{t.time}</div>
              <div><div style={{ width:6, height:6, borderRadius:"50%", background:C.green400, display:"inline-block", marginRight:4 }}/><span style={{ fontSize:11, color:C.g500 }}>{t.status}</span></div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0" }}>
          <span style={{ fontSize:12, color:C.g400 }}>Showing {filtered.length} of {recentTxns.length} transactions</span>
          <div style={{ display:"flex", gap:4 }}>
            {[1,2,3].map(p=><div key={p} style={{ width:30, height:30, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, background:p===1?C.deepGreen:C.white, color:p===1?C.white:C.g500, cursor:"pointer", border:`1px solid ${C.g200}` }}>{p}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══ EARNINGS ═══ */
const EarningsScreen = () => (
  <div><TopBar title="Earnings & Commission" subtitle="Track your income from AFSWITCH"/>
    <div style={{ padding:"16px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
        <StatCard label="TODAY" value={`؋ ${agent.commToday.toLocaleString()}`} sub={`≈ $ ${(agent.commToday*0.01162).toFixed(2)}`} icon="◈" color={C.gold} bgColor={C.goldLight}/>
        <StatCard label="THIS WEEK" value={`؋ ${agent.commWeek.toLocaleString()}`} sub={`≈ $ ${(agent.commWeek*0.01162).toFixed(2)}`} icon="📊" color={C.deepGreen} bgColor={C.greenLight}/>
        <StatCard label="THIS MONTH" value={`؋ ${agent.commMonth.toLocaleString()}`} sub={`≈ $ ${(agent.commMonth*0.01162).toFixed(2)}`} icon="📈" color={C.blue} bgColor={C.blueLight}/>
      </div>

      {/* Commission breakdown */}
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px", marginBottom:16 }}>
        <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>Commission Breakdown (Today)</div>
        {[{l:"Cash-In commissions (22 txns)",v:"؋ 1,560",pct:"55%"},{l:"Cash-Out commissions (25 txns)",v:"؋ 1,260",pct:"45%"},{l:"Registration bonuses (3 users)",v:"؋ 0",pct:"—"}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<2?`1px solid ${C.g100}`:"none" }}>
            <span style={{ fontSize:13, color:C.g600 }}>{r.l}</span>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}><span style={{ fontSize:11, color:C.g400 }}>{r.pct}</span><span style={{ fontSize:14, fontWeight:700, color:C.navy }}>{r.v}</span></div>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, padding:"18px 22px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:C.navy, marginBottom:16 }}>Daily Commission (This Week)</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:120, marginBottom:8 }}>
          {[1680,2520,2100,3060,3780,2520,1680].map((v,i)=>{
            const max=3780;const h=(v/max)*100;
            return(<div key={i} style={{ flex:1, textAlign:"center" }}>
              <div style={{ height:100, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <div style={{ width:"70%", height:`${h}%`, background:i===4?`linear-gradient(to top,${C.gold},${C.deepGreen})`:C.deepGreen+"30", borderRadius:"4px 4px 0 0" }}/>
              </div>
              <div style={{ fontSize:10, color:i===4?C.deepGreen:C.g400, marginTop:6, fontWeight:i===4?700:400 }}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
              <div style={{ fontSize:9, color:C.g400 }}>؋{(v/1000).toFixed(1)}k</div>
            </div>);
          })}
        </div>
        <div style={{ textAlign:"center", fontSize:12, color:C.g500, marginTop:8 }}>Week total: <span style={{ fontWeight:700, color:C.navy }}>؋ {agent.commWeek.toLocaleString()}</span> (≈ $ {(agent.commWeek*0.01162).toFixed(2)} USD)</div>
      </div>
    </div>
  </div>
);

/* ═══ FLOAT MANAGEMENT ═══ */
const FloatScreen = () => {
  const [showRequest,setShowRequest]=useState(false);
  return (
    <div><TopBar title="Float Management" subtitle="Monitor and manage your agent liquidity"/>
      <div style={{ padding:"16px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
          <div style={{ background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, borderRadius:16, padding:"24px 22px", color:C.white }}>
            <div style={{ fontSize:12, opacity:0.7, marginBottom:4 }}>Current Float (AFN)</div>
            <div style={{ fontSize:32, fontWeight:900 }}>؋ {agent.floatAFN.toLocaleString()}</div>
            <div style={{ marginTop:12, background:"rgba(255,255,255,0.1)", borderRadius:6, height:8, overflow:"hidden" }}>
              <div style={{ width:"57%", height:"100%", background:C.green400, borderRadius:6 }}/>
            </div>
            <div style={{ fontSize:11, opacity:0.5, marginTop:6 }}>57% of ؋ 1,500,000 daily limit</div>
          </div>
          <div style={{ background:`linear-gradient(135deg,${C.navy700},${C.navy})`, borderRadius:16, padding:"24px 22px", color:C.white }}>
            <div style={{ fontSize:12, opacity:0.7, marginBottom:4 }}>Current Float (USD)</div>
            <div style={{ fontSize:32, fontWeight:900 }}>$ {agent.floatUSD.toLocaleString()}</div>
            <div style={{ marginTop:12 }}>
              <div style={{ fontSize:11, opacity:0.5 }}>Today's usage</div>
              <div style={{ fontSize:14, fontWeight:700, marginTop:2 }}>؋ 93,000 disbursed · ؋ 75,000 collected</div>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", gap:12, marginBottom:24 }}>
          <Btn onClick={()=>setShowRequest(!showRequest)} variant={showRequest?"ghost":"gold"} style={{ flex:1 }}>{showRequest?"Cancel":"Request Float Top-Up"}</Btn>
          <Btn variant="outline" style={{ flex:1 }}>Set Low Float Alert</Btn>
        </div>

        {showRequest&&(
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.gold}40`, padding:24, marginBottom:24 }}>
            <div style={{ fontSize:16, fontWeight:700, color:C.navy, marginBottom:16 }}>Request Float Top-Up</div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Amount Needed</div>
              <input defaultValue="500000" style={{ width:"100%", boxSizing:"border-box", border:`2px solid ${C.g200}`, borderRadius:10, padding:"12px 14px", fontSize:16, fontWeight:700, fontFamily:"inherit", outline:"none" }}/>
            </div>
            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:6 }}>Preferred Method</div>
              <div style={{ display:"flex", gap:8 }}>
                {["Bank Transfer","Cash Collection","Other Agent"].map((m,i)=><div key={m} style={{ flex:1, padding:"10px", borderRadius:8, textAlign:"center", fontSize:12, fontWeight:600, background:i===0?C.deepGreen:C.g100, color:i===0?C.white:C.g600, cursor:"pointer" }}>{m}</div>)}
              </div>
            </div>
            <Btn onClick={()=>setShowRequest(false)} variant="gold">Submit Request</Btn>
          </div>
        )}

        {/* Top-up history */}
        <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.g100}` }}>
            <span style={{ fontSize:14, fontWeight:700, color:C.navy }}>Top-Up History</span>
          </div>
          {topUpHistory.map((t,i)=>(
            <div key={t.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 18px", borderBottom:i<topUpHistory.length-1?`1px solid ${C.g100}`:"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:C.deepGreen, fontWeight:700 }}>+</div>
                <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>؋ {t.amt.toLocaleString()}</div><div style={{ fontSize:11, color:C.g400 }}>{t.method}</div></div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, fontWeight:600, color:C.deepGreen }}>{t.status}</div>
                <div style={{ fontSize:10, color:C.g400 }}>{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══ SETTINGS ═══ */
const SettingsScreen = () => (
  <div><TopBar title="Settings" subtitle="Agent account configuration"/>
    <div style={{ padding:"16px 24px", maxWidth:640 }}>
      {[
        {s:"Account",items:[{icon:"🏪",l:"Agent Profile",v:agent.name},{icon:"📱",l:"Linked Device",v:"Samsung Galaxy A54"},{icon:"🔒",l:"Change PIN",v:""},{icon:"🌐",l:"Language",v:"English (دری • پښتو)"}]},
        {s:"Operations",items:[{icon:"⚡",l:"Daily Transaction Limit",v:`؋ ${(1500000).toLocaleString()}`},{icon:"💰",l:"Commission Rate",v:"0.6% per transaction"},{icon:"🔔",l:"Low Float Alert",v:"؋ 200,000 threshold"},{icon:"📊",l:"Auto-Reports",v:"Daily at 10:00 PM"}]},
        {s:"Security",items:[{icon:"🛡️",l:"Device Binding",v:"Active"},{icon:"📍",l:"GPS Verification",v:"Enabled"},{icon:"🔐",l:"Two-Factor Auth",v:"SMS + PIN"}]},
        {s:"Support",items:[{icon:"❓",l:"Help Center",v:""},{icon:"💬",l:"Contact Platform Support",v:""},{icon:"📋",l:"Terms of Service",v:""},{icon:"ℹ️",l:"About",v:"Agent Portal v1.0.0"}]},
      ].map(s=>(
        <div key={s.s}>
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, padding:"16px 0 8px", letterSpacing:1 }}>{s.s.toUpperCase()}</div>
          <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden", marginBottom:8 }}>
            {s.items.map((item,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:i<s.items.length-1?`1px solid ${C.g100}`:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}><span style={{ fontSize:18 }}>{item.icon}</span><span style={{ fontSize:14, fontWeight:500, color:C.g800 }}>{item.l}</span></div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>{item.v&&<span style={{ fontSize:12, color:C.g400 }}>{item.v}</span>}<span style={{ color:C.g300 }}>›</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ margin:"16px 0", padding:"14px", borderRadius:12, background:C.redLight, textAlign:"center", fontSize:14, fontWeight:600, color:C.red, cursor:"pointer" }}>Sign Out</div>
    </div>
  </div>
);

/* ═══ MAIN APP ═══ */
export default function AgentDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{const check=()=>setIsMobile(window.innerWidth<768);check();window.addEventListener("resize",check);return()=>window.removeEventListener("resize",check);},[]);

  if(!loggedIn) return <LoginScreen onLogin={()=>setLoggedIn(true)}/>;

  return (
    <div style={{ display:"flex", flexDirection:isMobile?"column":"row", minHeight:"calc(100vh - 56px)", background:C.off, fontFamily:"'Outfit',sans-serif" }}>
      <Sidebar active={screen} onNav={setScreen} isMobile={isMobile}/>
      <div style={{ flex:1, overflowY:"auto", maxHeight:"100vh" }}>
        {screen==="home"&&<DashboardHome go={setScreen} isMobile={isMobile}/>}
        {screen==="cashIn"&&<CashInScreen go={setScreen}/>}
        {screen==="cashOut"&&<CashOutScreen go={setScreen}/>}
        {screen==="register"&&<RegisterScreen go={setScreen}/>}
        {screen==="txnLog"&&<TxnLogScreen/>}
        {screen==="earnings"&&<EarningsScreen/>}
        {screen==="float"&&<FloatScreen/>}
        {screen==="settings"&&<SettingsScreen/>}
      </div>
    </div>
  );
}
