"use client";
import { useState } from "react";

const C = {
  deepGreen:"#0A6847", green500:"#10B981", green400:"#34D399", green100:"#D1FAE5",
  greenLight:"#ECFDF5", navy:"#0F1B2D", navy700:"#1B2A4A",
  gold:"#C8A24E", goldLight:"#FEF9EE", white:"#FFFFFF", off:"#F8FAFB",
  g50:"#F9FAFB", g100:"#F3F4F6", g200:"#E5E7EB", g300:"#D1D5DB", g400:"#9CA3AF",
  g500:"#6B7280", g600:"#4B5563", g700:"#374151", g800:"#1F2937",
  red:"#EF4444", redLight:"#FEF2F2", blue:"#3B82F6", blueLight:"#EFF6FF",
  orange:"#F59E0B", orangeLight:"#FFFBEB", purple:"#8B5CF6", purpleLight:"#F5F3FF",
};

const agent = { name:"Sarafi Noor Exchange", id:"AGT-0042", area:"Mandawi, Kabul", tier:"Gold", floatAFN:850000, floatUSD:9878.50, commToday:2820, commWeek:18450, commMonth:72300, txnToday:47 };

const recentTxns = [
  { id:"TXN-9001", type:"cash-in", user:"Ahmad Noori", phone:"+93 70 123 4567", amtAFN:10000, amtUSD:116.20, time:"10:23 AM", comm:60 },
  { id:"TXN-9002", type:"cash-out", user:"Fatima Rahimi", phone:"+93 79 987 6543", amtAFN:5000, amtUSD:58.10, time:"10:05 AM", comm:30 },
  { id:"TXN-9003", type:"cash-in", user:"Khalid Wardak", phone:"+93 72 555 8901", amtAFN:20000, amtUSD:232.40, time:"9:42 AM", comm:120 },
  { id:"TXN-9004", type:"registration", user:"Zahra Ahmadi", phone:"+93 78 234 5678", amtAFN:0, amtUSD:0, time:"9:15 AM", comm:0 },
  { id:"TXN-9005", type:"cash-out", user:"Mohammad Karimi", phone:"+93 70 876 5432", amtAFN:8000, amtUSD:92.96, time:"8:50 AM", comm:48 },
  { id:"TXN-9006", type:"cash-in", user:"Mariam Stanikzai", phone:"+93 73 111 2233", amtAFN:3000, amtUSD:34.86, time:"8:31 AM", comm:18 },
  { id:"TXN-9007", type:"cash-out", user:"Nawid Sadat", phone:"+93 77 444 3322", amtAFN:15000, amtUSD:174.30, time:"Yesterday", comm:90 },
  { id:"TXN-9008", type:"cash-in", user:"Shogofa Yari", phone:"+93 78 999 1122", amtAFN:7000, amtUSD:81.34, time:"Yesterday", comm:42 },
];

const agents_list = [
  { id:1, name:"Sarafi Noor Exchange", area:"Mandawi, Kabul", dist:"0.8 km", status:"open", hours:"8AM–8PM" },
  { id:2, name:"Kabul Trust Money", area:"Shar-e-Naw, Kabul", dist:"1.2 km", status:"open", hours:"9AM–6PM" },
  { id:3, name:"Pamir Exchange", area:"Karte-4, Kabul", dist:"2.5 km", status:"open", hours:"8AM–7PM" },
];

const topUpHistory = [
  { amt:500000, date:"Feb 22", method:"Bank Transfer" },
  { amt:300000, date:"Feb 18", method:"Cash Collection" },
  { amt:400000, date:"Feb 14", method:"Bank Transfer" },
];

const alerts = [
  { type:"warning", msg:"Float below ؋ 1,000,000 — request top-up", time:"1 hr ago" },
  { type:"success", msg:"Daily reconciliation passed ✓", time:"6 hr ago" },
  { type:"info", msg:"USD cash-out now available for Gold tier", time:"Yesterday" },
];

const dailyComm = [1680,2520,2100,3060,3780,2520,1680];
const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

/* ─── Shared ─── */
const StatusBar = () => (
  <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 20px 4px", fontSize:11, fontWeight:600, color:C.white, background:C.navy }}>
    <span>9:41</span>
    <div style={{ display:"flex", gap:4, alignItems:"center" }}>
      <span style={{ fontSize:9 }}>LTE</span>
      <div style={{ display:"flex", gap:1 }}>{[8,11,14,17].map((h,i)=><div key={i} style={{ width:3, height:h, background:C.white, borderRadius:1 }}/>)}</div>
      <div style={{ width:20, height:10, border:"1px solid white", borderRadius:3, position:"relative", marginLeft:2 }}><div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:C.green400, borderRadius:1 }}/></div>
    </div>
  </div>
);

const Header = ({ title, sub, onMenu, right }) => (
  <div style={{ padding:"10px 16px", background:C.navy, color:C.white }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {onMenu && <div onClick={onMenu} style={{ fontSize:16, cursor:"pointer", padding:"0 4px" }}>←</div>}
        <div><div style={{ fontSize:16, fontWeight:700 }}>{title}</div>{sub&&<div style={{ fontSize:10, opacity:0.5 }}>{sub}</div>}</div>
      </div>
      {right}
    </div>
  </div>
);

const BottomNav = ({ active, onNav }) => (
  <div style={{ display:"flex", justifyContent:"space-around", padding:"8px 0 12px", background:C.white, borderTop:`1px solid ${C.g100}` }}>
    {[{id:"home",icon:"⊞",l:"Home"},{id:"cashIn",icon:"↙",l:"Cash-In"},{id:"cashOut",icon:"↗",l:"Cash-Out"},{id:"txnLog",icon:"☰",l:"Log"},{id:"more",icon:"···",l:"More"}].map(n=>(
      <div key={n.id} onClick={()=>onNav(n.id)} style={{ textAlign:"center", cursor:"pointer", minWidth:48 }}>
        <div style={{ fontSize:17, color:active===n.id?C.deepGreen:C.g400, fontWeight:active===n.id?700:400, lineHeight:1 }}>{n.icon}</div>
        <div style={{ fontSize:9, marginTop:2, fontWeight:600, color:active===n.id?C.deepGreen:C.g400 }}>{n.l}</div>
      </div>
    ))}
  </div>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:5, background:bg, color }}>{text}</span>
);

const Btn = ({ children, onClick, variant="primary", style:s={} }) => {
  const st = { primary:{background:C.deepGreen,color:C.white}, gold:{background:C.gold,color:C.navy}, outline:{background:"transparent",color:C.deepGreen,border:`2px solid ${C.deepGreen}`}, ghost:{background:C.g100,color:C.g700} };
  return <div onClick={onClick} style={{ padding:"12px 20px", borderRadius:10, textAlign:"center", fontSize:14, fontWeight:700, cursor:"pointer", width:"100%", boxSizing:"border-box", ...st[variant], ...s }}>{children}</div>;
};

const MiniStat = ({ label, value, sub, color=C.deepGreen, bg=C.greenLight, icon }) => (
  <div style={{ background:C.white, borderRadius:12, padding:"12px 14px", border:`1px solid ${C.g200}`, flex:1, minWidth:0 }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div><div style={{ fontSize:10, color:C.g400, fontWeight:600, marginBottom:3 }}>{label}</div><div style={{ fontSize:18, fontWeight:800, color:C.navy }}>{value}</div>{sub&&<div style={{ fontSize:10, color:C.g400, marginTop:2 }}>{sub}</div>}</div>
      {icon&&<div style={{ width:30, height:30, borderRadius:8, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>{icon}</div>}
    </div>
  </div>
);

const Numpad = ({ onKey }) => (
  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, padding:"0 4px" }}>
    {[1,2,3,4,5,6,7,8,9,".",0,"⌫"].map((n,i)=>(
      <div key={i} onClick={()=>{if(n==="⌫")onKey("del");else if(n!=="")onKey(String(n));}} style={{ height:40, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:n==="⌫"?16:18, fontWeight:500, color:C.g800, cursor:"pointer", background:C.g50 }}>{n}</div>
    ))}
  </div>
);

const PinOverlay = ({ title="Enter Agent PIN", onComplete }) => {
  const [pins,setPins]=useState([]);
  const tap=(n)=>{if(n==="del"){setPins(p=>p.slice(0,-1));return;}if(pins.length<6){const np=[...pins,n];setPins(np);if(np.length===6)setTimeout(onComplete,400);}};
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(15,27,45,0.97)", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:28 }}>
      <div style={{ fontSize:15, fontWeight:700, color:C.white, marginBottom:4 }}>{title}</div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:20 }}>6-digit agent PIN</div>
      <div style={{ display:"flex", gap:8, marginBottom:28 }}>
        {[0,1,2,3,4,5].map(i=><div key={i} style={{ width:12, height:12, borderRadius:"50%", background:i<pins.length?C.green400:"rgba(255,255,255,0.2)" }}/>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, width:200 }}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=>(
          <div key={i} onClick={()=>{if(n==="")return;tap(n==="⌫"?"del":String(n));}} style={{ height:44, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:n==="⌫"?16:20, fontWeight:600, color:C.white, cursor:n===""?"default":"pointer", background:n===""?"transparent":"rgba(255,255,255,0.08)" }}>{n}</div>
        ))}
      </div>
    </div>
  );
};

const SuccessView = ({ title, subtitle, details, bigValue, onDone, onAnother, anotherLabel }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white, alignItems:"center", justifyContent:"center", padding:20 }}>
    <div style={{ width:64, height:64, borderRadius:"50%", background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, marginBottom:16, animation:"pop 0.4s ease" }}>✓</div>
    <div style={{ fontSize:20, fontWeight:800, color:C.navy, marginBottom:4 }}>{title}</div>
    <div style={{ fontSize:13, color:C.g500, marginBottom:8, textAlign:"center" }}>{subtitle}</div>
    {bigValue&&<div style={{ background:C.navy, color:C.gold, padding:"8px 24px", borderRadius:8, fontSize:20, fontWeight:800, fontFamily:"monospace", letterSpacing:1, marginBottom:16 }}>{bigValue}</div>}
    {details&&(
      <div style={{ background:C.g50, borderRadius:12, padding:16, width:"100%", marginBottom:20 }}>
        {details.map((d,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:i<details.length-1?`1px solid ${C.g200}`:"none" }}>
            <span style={{ fontSize:12, color:C.g400 }}>{d.l}</span><span style={{ fontSize:12, fontWeight:d.bold?700:500, color:d.color||C.g800, fontFamily:d.mono?"monospace":"inherit" }}>{d.v}</span>
          </div>
        ))}
      </div>
    )}
    <div style={{ display:"flex", gap:10, width:"100%" }}>
      {onAnother&&<Btn onClick={onAnother} variant="outline" style={{ flex:1, padding:"10px" }}>{anotherLabel||"New"}</Btn>}
      <Btn onClick={onDone} style={{ flex:onAnother?1.5:1, padding:"10px" }}>Done</Btn>
    </div>
    <style>{`@keyframes pop{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}`}</style>
  </div>
);

/* ═══════════ SCREENS ═══════════ */

/* ─── LOGIN ─── */
const LoginScreen = ({ onLogin }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:`linear-gradient(165deg,${C.navy} 0%,#0a1a2e 100%)`, padding:0 }}>
    <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:24 }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:12 }}>
          <div style={{ background:C.deepGreen, color:C.white, padding:"5px 10px", borderRadius:8, fontWeight:900, fontSize:13 }}>AF</div>
          <span style={{ fontSize:16, fontWeight:800, color:C.white }}>AFSWITCH</span>
        </div>
        <div style={{ fontSize:20, fontWeight:800, color:C.white }}>Agent Portal</div>
        <div style={{ fontSize:12, color:C.g400, marginTop:4 }}>Sign in to your dashboard</div>
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:600, color:C.g400, marginBottom:5 }}>Phone Number</div>
        <div style={{ display:"flex", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, overflow:"hidden", background:"rgba(255,255,255,0.04)" }}>
          <div style={{ padding:"12px 10px", borderRight:"1px solid rgba(255,255,255,0.08)", fontSize:13, fontWeight:600, color:C.g400 }}>+93</div>
          <input defaultValue="70 555 0001" style={{ flex:1, border:"none", outline:"none", padding:"12px 10px", fontSize:14, fontFamily:"inherit", background:"transparent", color:C.white }}/>
        </div>
      </div>
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:600, color:C.g400, marginBottom:5 }}>Agent PIN</div>
        <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{ width:36, height:40, borderRadius:8, border:`1px solid ${i<4?"rgba(10,104,71,0.5)":"rgba(255,255,255,0.1)"}`, background:i<4?"rgba(10,104,71,0.15)":"rgba(255,255,255,0.03)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:C.white }}>{i<4?"•":""}</div>)}
        </div>
      </div>
      <div style={{ background:"rgba(200,162,78,0.1)", borderRadius:8, padding:"8px 12px", marginBottom:20, display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ fontSize:12 }}>📱</span><span style={{ fontSize:10, color:C.gold }}>Device bound: Samsung A54 — Mandawi</span>
      </div>
      <Btn onClick={onLogin}>Sign In</Btn>
    </div>
  </div>
);

/* ─── HOME ─── */
const HomeScreen = ({ onNav, go }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/>
    <div style={{ padding:"10px 16px", background:C.navy, color:C.white }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:10, opacity:0.5 }}>Agent Dashboard</div>
          <div style={{ fontSize:16, fontWeight:700 }}>{agent.name}</div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green400 }}/>
            <span style={{ fontSize:10, color:C.green400 }}>Online</span>
            <span style={{ fontSize:9, color:C.gold, background:"rgba(200,162,78,0.15)", padding:"1px 8px", borderRadius:4, fontWeight:600 }}>{agent.tier}</span>
          </div>
        </div>
        <div onClick={()=>go("alerts")} style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", position:"relative" }}>
          🔔<div style={{ position:"absolute", top:4, right:4, width:7, height:7, borderRadius:"50%", background:C.orange, border:`1.5px solid ${C.navy}` }}/>
        </div>
      </div>
    </div>

    {/* Float card */}
    <div style={{ margin:"0 12px", padding:"14px 16px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, borderRadius:"0 0 16px 16px", color:C.white, boxShadow:"0 6px 20px rgba(10,104,71,0.2)" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:2 }}>
        <span style={{ fontSize:10, opacity:0.6 }}>Float Balance</span>
        <span style={{ fontSize:9, opacity:0.4 }}>{agent.id}</span>
      </div>
      <div style={{ fontSize:26, fontWeight:900 }}>؋ {agent.floatAFN.toLocaleString()}</div>
      <div style={{ fontSize:10, opacity:0.45 }}>≈ $ {agent.floatUSD.toLocaleString()} USD</div>
      <div style={{ marginTop:10, background:"rgba(255,255,255,0.1)", borderRadius:4, height:6, overflow:"hidden" }}>
        <div style={{ width:"57%", height:"100%", background:C.green400, borderRadius:4 }}/>
      </div>
      <div style={{ fontSize:9, opacity:0.4, marginTop:4 }}>57% of ؋ 1,500,000 daily limit</div>
    </div>

    {/* Stats row */}
    <div style={{ display:"flex", gap:8, padding:"14px 12px 6px" }}>
      <MiniStat label="TRANSACTIONS" value={agent.txnToday} sub="Today" icon="↕" color={C.blue} bg={C.blueLight}/>
      <MiniStat label="COMMISSION" value={`؋ ${agent.commToday.toLocaleString()}`} sub="Today" icon="◈" color={C.gold} bg={C.goldLight}/>
    </div>

    {/* Quick actions */}
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, padding:"8px 12px" }}>
      {[
        { l:"Cash-In", icon:"↙", color:C.deepGreen, bg:C.greenLight, act:"cashIn" },
        { l:"Cash-Out", icon:"↗", color:C.gold, bg:C.goldLight, act:"cashOut" },
        { l:"Register", icon:"+", color:C.blue, bg:C.blueLight, act:"register" },
      ].map(a=>(
        <div key={a.l} onClick={()=>go(a.act)} style={{ background:C.white, borderRadius:12, padding:"14px 10px", border:`1px solid ${C.g200}`, textAlign:"center", cursor:"pointer" }}>
          <div style={{ width:36, height:36, borderRadius:10, margin:"0 auto 6px", background:a.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:a.color }}>{a.icon}</div>
          <div style={{ fontSize:12, fontWeight:600, color:C.g700 }}>{a.l}</div>
        </div>
      ))}
    </div>

    {/* Recent */}
    <div style={{ flex:1, padding:"8px 12px 0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
        <span style={{ fontSize:13, fontWeight:700, color:C.g800 }}>Recent</span>
        <span onClick={()=>onNav("txnLog")} style={{ fontSize:11, color:C.deepGreen, fontWeight:600, cursor:"pointer" }}>See All</span>
      </div>
      <div style={{ background:C.white, borderRadius:12, overflow:"hidden", border:`1px solid ${C.g200}` }}>
        {recentTxns.slice(0,4).map((t,i)=>(
          <div key={t.id} onClick={()=>go("txnDetail",{txn:t})} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderBottom:i<3?`1px solid ${C.g100}`:"none", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:t.type==="cash-in"?C.greenLight:t.type==="cash-out"?C.goldLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>
                {t.type==="cash-in"?"↙":t.type==="cash-out"?"↗":"+"}
              </div>
              <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{t.user}</div><div style={{ fontSize:9, color:C.g400 }}>{t.time}</div></div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="registration"?C.blue:C.g700 }}>
                {t.type==="registration"?"New User":`${t.type==="cash-in"?"+":"−"}؋ ${t.amtAFN.toLocaleString()}`}
              </div>
              {t.comm>0&&<div style={{ fontSize:9, color:C.gold }}>+؋{t.comm}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
    <BottomNav active="home" onNav={onNav}/>
  </div>
);

/* ─── CASH-IN ─── */
const CashInScreen = ({ onNav, goBack }) => {
  const [step,setStep]=useState(0);const [phone,setPhone]=useState("");const [user,setUser]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");
  const foundUser = { name:"Ahmad Noori", phone:"+93 70 123 4567", verified:true };
  const conv = cur==="AFN"?`$ ${(Number(amt||0)*0.01162).toFixed(2)}`:`؋ ${Math.round(Number(amt||0)/0.01162).toLocaleString()}`;

  if(step===3) return <SuccessView title="Deposit Successful" subtitle="Digits credited to user's wallet" details={[{l:"User",v:foundUser.name},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold},{l:"Receipt",v:"RCP-2026-0223-047",mono:true}]} onDone={goBack} onAnother={()=>setStep(0)} anotherLabel="New Deposit"/>;

  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><Header title="Cash-In (Deposit)" sub="Credit digits to user's wallet" onMenu={goBack}/>
      {/* Progress */}
      <div style={{ display:"flex", gap:3, padding:"10px 16px 0" }}>
        {["Find User","Amount","Confirm"].map((s,i)=>(<div key={i} style={{ flex:1 }}><div style={{ height:3, borderRadius:2, background:i<=step?C.deepGreen:C.g200 }}/><div style={{ fontSize:9, fontWeight:600, color:i<=step?C.deepGreen:C.g400, marginTop:3 }}>{s}</div></div>))}
      </div>

      {step===0&&(
        <div style={{ flex:1, padding:"12px 16px" }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:5 }}>User Phone Number</div>
          <div style={{ display:"flex", gap:6 }}>
            <div style={{ display:"flex", flex:1, border:`2px solid ${C.g200}`, borderRadius:10, overflow:"hidden" }}>
              <div style={{ padding:"10px 8px", background:C.g50, borderRight:`1px solid ${C.g200}`, fontSize:12, fontWeight:600, color:C.g700 }}>+93</div>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="70 123 4567" style={{ flex:1, border:"none", outline:"none", padding:"10px", fontSize:14, fontFamily:"inherit" }}/>
            </div>
            <Btn onClick={()=>setUser(foundUser)} style={{ padding:"10px 16px", width:"auto" }}>Find</Btn>
          </div>
          {user&&(
            <div style={{ marginTop:16, background:C.greenLight, borderRadius:12, padding:"14px 16px", border:`1px solid ${C.deepGreen}20` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:13, fontWeight:700 }}>AN</div>
                <div><div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{user.name}</div><div style={{ fontSize:11, color:C.g500 }}>{user.phone}</div></div>
                <Badge text="Verified" color={C.deepGreen} bg={C.green100}/>
              </div>
              <Btn onClick={()=>setStep(1)}>Proceed</Btn>
            </div>
          )}
        </div>
      )}

      {step===1&&(
        <div style={{ flex:1, padding:"12px 16px", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, padding:"8px 10px", background:C.g50, borderRadius:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:10, fontWeight:700 }}>AN</div>
            <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{foundUser.name}</div><div style={{ fontSize:10, color:C.g400 }}>{foundUser.phone}</div></div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:12 }}>
            {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"5px 18px", borderRadius:8, fontSize:12, fontWeight:700, background:cur===c?C.deepGreen:C.g100, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
          </div>
          <div style={{ textAlign:"center", marginBottom:8 }}>
            <span style={{ fontSize:36, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
            {amt&&<div style={{ fontSize:11, color:C.g400 }}>≈ {conv}</div>}
          </div>
          <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:8 }}>
            {(cur==="AFN"?[1000,5000,10000,20000]:[10,50,100,200]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"5px 10px", borderRadius:6, fontSize:10, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${(a/1000)}k`:`$${a}`}</div>)}
          </div>
          {amt&&<div style={{ background:C.goldLight, borderRadius:6, padding:"6px 10px", marginBottom:8, fontSize:11, color:C.gold, textAlign:"center" }}>Commission: ؋ {Math.round(Number(amt)*0.006).toLocaleString()} (0.6%)</div>}
          <Numpad onKey={k=>{if(k==="del")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+k);}}/>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>amt&&setStep(2)} variant={amt?"primary":"ghost"}>Review</Btn>
        </div>
      )}

      {step===2&&(
        <div style={{ flex:1, padding:"12px 16px", display:"flex", flexDirection:"column" }}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:12, color:C.g400 }}>Depositing</div>
            <div style={{ fontSize:32, fontWeight:900, color:C.navy }}>{cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}</div>
            <div style={{ fontSize:11, color:C.g400 }}>≈ {conv}</div>
          </div>
          <div style={{ background:C.g50, borderRadius:12, padding:14, marginBottom:12 }}>
            {[{l:"User",v:foundUser.name},{l:"Phone",v:foundUser.phone},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold},{l:"Float After",v:`؋ ${(agent.floatAFN-Number(amt)).toLocaleString()}`}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:i<4?`1px solid ${C.g200}`:"none" }}>
                <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span><span style={{ fontSize:12, fontWeight:600, color:r.color||C.g800 }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.greenLight, borderRadius:8, padding:"8px 10px", marginBottom:12, fontSize:10, color:C.deepGreen, lineHeight:1.4 }}>🔒 Recorded on immutable ledger. Cannot be reversed without admin approval.</div>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>setStep(3)} variant="gold">Confirm Deposit</Btn>
        </div>
      )}
    </div>
  );
};

/* ─── CASH-OUT ─── */
const CashOutScreen = ({ onNav, goBack }) => {
  const [step,setStep]=useState(0);const [phone,setPhone]=useState("");const [user,setUser]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");const [showPin,setShowPin]=useState(false);
  const foundUser = { name:"Fatima Rahimi", phone:"+93 79 987 6543", balance:"؋ 8,200", balUSD:"$ 95.28" };
  const conv = cur==="AFN"?`$ ${(Number(amt||0)*0.01162).toFixed(2)}`:`؋ ${Math.round(Number(amt||0)/0.01162).toLocaleString()}`;

  if(step===3) return <SuccessView title="Withdrawal Complete" subtitle="Please hand the cash to the user" bigValue={cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`} details={[{l:"User",v:foundUser.name},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold},{l:"Receipt",v:"RCP-2026-0223-048",mono:true}]} onDone={goBack} onAnother={()=>setStep(0)} anotherLabel="New Withdrawal"/>;

  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white, position:"relative" }}>
      {showPin&&<PinOverlay title="Confirm Cash-Out" onComplete={()=>{setShowPin(false);setStep(3);}}/>}
      <StatusBar/><Header title="Cash-Out (Withdrawal)" sub="Debit digits & give cash" onMenu={goBack}/>
      <div style={{ display:"flex", gap:3, padding:"10px 16px 0" }}>
        {["Find User","Amount","Confirm"].map((s,i)=>(<div key={i} style={{ flex:1 }}><div style={{ height:3, borderRadius:2, background:i<=step?C.gold:C.g200 }}/><div style={{ fontSize:9, fontWeight:600, color:i<=step?C.gold:C.g400, marginTop:3 }}>{s}</div></div>))}
      </div>

      {step===0&&(
        <div style={{ flex:1, padding:"12px 16px" }}>
          <div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:5 }}>Phone or Withdrawal Code</div>
          <div style={{ display:"flex", gap:6 }}>
            <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone or WDR code" style={{ flex:1, border:`2px solid ${C.g200}`, borderRadius:10, padding:"10px 12px", fontSize:14, fontFamily:"inherit", outline:"none" }}/>
            <Btn onClick={()=>setUser(foundUser)} variant="gold" style={{ padding:"10px 16px", width:"auto" }}>Find</Btn>
          </div>
          {user&&(
            <div style={{ marginTop:16, background:C.goldLight, borderRadius:12, padding:"14px 16px", border:`1px solid ${C.gold}20` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`linear-gradient(135deg,${C.gold},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:13, fontWeight:700 }}>FR</div>
                  <div><div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{user.name}</div><div style={{ fontSize:11, color:C.g500 }}>{user.phone}</div></div>
                </div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:10, color:C.g400 }}>Balance</div><div style={{ fontSize:14, fontWeight:700, color:C.navy }}>{user.balance}</div></div>
              </div>
              <Btn onClick={()=>setStep(1)} variant="gold">Proceed</Btn>
            </div>
          )}
        </div>
      )}

      {step===1&&(
        <div style={{ flex:1, padding:"12px 16px", display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, padding:"8px 10px", background:C.g50, borderRadius:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:`linear-gradient(135deg,${C.gold},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:10, fontWeight:700 }}>FR</div>
            <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{foundUser.name}</div><div style={{ fontSize:10, color:C.g400 }}>{foundUser.phone}</div></div>
            <div style={{ textAlign:"right" }}><div style={{ fontSize:9, color:C.g400 }}>Available</div><div style={{ fontSize:12, fontWeight:700, color:C.navy }}>{foundUser.balance}</div></div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:12 }}>
            {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"5px 18px", borderRadius:8, fontSize:12, fontWeight:700, background:cur===c?C.gold:C.g100, color:cur===c?C.navy:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
          </div>
          <div style={{ textAlign:"center", marginBottom:8 }}>
            <span style={{ fontSize:36, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
          </div>
          <div style={{ display:"flex", gap:5, justifyContent:"center", marginBottom:8 }}>
            {(cur==="AFN"?[1000,2000,5000,8200]:[10,50,95]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"5px 10px", borderRadius:6, fontSize:10, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
          </div>
          <div style={{ background:C.orangeLight, borderRadius:6, padding:"6px 10px", marginBottom:8, fontSize:10, color:C.orange, textAlign:"center" }}>⚠ User must confirm with PIN on their phone</div>
          <Numpad onKey={k=>{if(k==="del")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+k);}}/>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>amt&&setStep(2)} variant={amt?"gold":"ghost"}>Review</Btn>
        </div>
      )}

      {step===2&&(
        <div style={{ flex:1, padding:"12px 16px", display:"flex", flexDirection:"column" }}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ fontSize:12, color:C.g400 }}>Withdrawing</div>
            <div style={{ fontSize:32, fontWeight:900, color:C.navy }}>{cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}</div>
          </div>
          <div style={{ background:C.g50, borderRadius:12, padding:14, marginBottom:12 }}>
            {[{l:"User",v:foundUser.name},{l:"Cash to Disburse",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`,bold:true},{l:"Commission",v:`؋ ${Math.round(Number(amt)*0.006).toLocaleString()}`,color:C.gold},{l:"Float After",v:`؋ ${(agent.floatAFN+Number(amt)).toLocaleString()}`}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:i<3?`1px solid ${C.g200}`:"none" }}>
                <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span><span style={{ fontSize:12, fontWeight:r.bold?700:600, color:r.color||C.g800 }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.greenLight, borderRadius:8, padding:"8px 10px", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:C.green400 }}/><span style={{ fontSize:11, fontWeight:600, color:C.deepGreen }}>User confirmed with PIN ✓</span>
          </div>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>setShowPin(true)} variant="gold">Confirm & Disburse Cash</Btn>
        </div>
      )}
    </div>
  );
};

/* ─── REGISTER USER ─── */
const RegisterScreen = ({ goBack }) => {
  const [step,setStep]=useState(0);
  if(step===2) return <SuccessView title="User Registered!" subtitle="OTP sent to +93 78 234 5678" details={[{l:"Name",v:"Zahra Ahmadi"},{l:"Phone",v:"+93 78 234 5678"},{l:"District",v:"Karte-4, Kabul"},{l:"KYC",v:"Basic",color:C.blue},{l:"Status",v:"Pending OTP",color:C.orange}]} onDone={goBack} onAnother={()=>setStep(0)} anotherLabel="Register Another"/>;
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><Header title="Register User" sub="Onboard a new AFSWITCH user" onMenu={goBack}/>
      <div style={{ display:"flex", gap:3, padding:"10px 16px 0" }}>
        {["Info","KYC"].map((s,i)=>(<div key={i} style={{ flex:1 }}><div style={{ height:3, borderRadius:2, background:i<=step?C.blue:C.g200 }}/><div style={{ fontSize:9, fontWeight:600, color:i<=step?C.blue:C.g400, marginTop:3 }}>{s}</div></div>))}
      </div>
      <div style={{ flex:1, padding:"12px 16px" }}>
        {step===0&&<>
          {[{l:"Full Name",v:"Zahra Ahmadi"},{l:"Phone Number",v:"+93 78 234 5678"},{l:"District",v:"Karte-4, Kabul"}].map((f,i)=>(
            <div key={i} style={{ marginBottom:12 }}><div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:4 }}>{f.l}</div>
            <input defaultValue={f.v} style={{ width:"100%", boxSizing:"border-box", border:`2px solid ${C.g200}`, borderRadius:10, padding:"10px 12px", fontSize:13, fontFamily:"inherit", outline:"none" }}/></div>
          ))}
          <div style={{ marginBottom:12 }}><div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:4 }}>Gender</div>
            <div style={{ display:"flex", gap:6 }}>{["Male","Female"].map((g,i)=><div key={g} style={{ flex:1, padding:"8px", borderRadius:8, textAlign:"center", fontSize:12, fontWeight:600, background:i===1?C.deepGreen:C.g100, color:i===1?C.white:C.g600, cursor:"pointer" }}>{g}</div>)}</div>
          </div>
          <div style={{ marginBottom:12 }}><div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:4 }}>Language</div>
            <div style={{ display:"flex", gap:6 }}>{["دری","پښتو","English"].map((l,i)=><div key={l} style={{ flex:1, padding:"8px", borderRadius:8, textAlign:"center", fontSize:12, fontWeight:600, background:i===0?C.deepGreen:C.g100, color:i===0?C.white:C.g600, cursor:"pointer" }}>{l}</div>)}</div>
          </div>
          <Btn onClick={()=>setStep(1)}>Next: Identity</Btn>
        </>}
        {step===1&&<>
          <div style={{ marginBottom:14 }}><div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:6 }}>Tazkira (National ID)</div>
            <div style={{ border:`2px dashed ${C.g300}`, borderRadius:12, padding:"24px 16px", textAlign:"center", cursor:"pointer", background:C.g50 }}><div style={{ fontSize:28, marginBottom:6 }}>📷</div><div style={{ fontSize:12, fontWeight:600, color:C.g600 }}>Tap to capture</div></div>
          </div>
          <div style={{ marginBottom:14 }}><div style={{ fontSize:11, fontWeight:600, color:C.g600, marginBottom:6 }}>User Selfie</div>
            <div style={{ border:`2px dashed ${C.blue}40`, borderRadius:12, padding:"20px 16px", textAlign:"center", cursor:"pointer", background:C.blueLight }}><div style={{ fontSize:24, marginBottom:4 }}>🤳</div><div style={{ fontSize:12, fontWeight:600, color:C.blue }}>Capture photo</div></div>
          </div>
          <div style={{ background:C.blueLight, borderRadius:8, padding:"8px 10px", marginBottom:14, fontSize:10, color:C.blue, lineHeight:1.4 }}>ℹ Basic KYC = Tier 1 (؋ 20,000/day). Full verification unlocks higher tiers.</div>
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={()=>setStep(0)} variant="ghost" style={{ flex:1, padding:"10px" }}>Back</Btn>
            <Btn onClick={()=>setStep(2)} style={{ flex:2, padding:"10px" }}>Submit</Btn>
          </div>
        </>}
      </div>
    </div>
  );
};

/* ─── TXN LOG ─── */
const TxnLogScreen = ({ onNav, go }) => {
  const [filter,setFilter]=useState("all");
  const filtered = filter==="all"?recentTxns:recentTxns.filter(t=>t.type===filter);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/><Header title="Transactions" sub={`${recentTxns.length} processed`}/>
      <div style={{ display:"flex", gap:5, padding:"10px 12px", overflowX:"auto" }}>
        {[{id:"all",l:"All"},{id:"cash-in",l:"Cash-In"},{id:"cash-out",l:"Cash-Out"},{id:"registration",l:"New Users"}].map(f=>(
          <div key={f.id} onClick={()=>setFilter(f.id)} style={{ padding:"5px 12px", borderRadius:8, fontSize:10, fontWeight:600, background:filter===f.id?C.deepGreen:C.white, color:filter===f.id?C.white:C.g500, cursor:"pointer", whiteSpace:"nowrap", border:`1px solid ${filter===f.id?C.deepGreen:C.g200}` }}>{f.l}</div>
        ))}
      </div>
      <div style={{ flex:1, padding:"0 12px", overflowY:"auto" }}>
        <div style={{ background:C.white, borderRadius:12, overflow:"hidden", border:`1px solid ${C.g200}` }}>
          {filtered.map((t,i)=>(
            <div key={t.id} onClick={()=>go("txnDetail",{txn:t})} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderBottom:i<filtered.length-1?`1px solid ${C.g100}`:"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:t.type==="cash-in"?C.greenLight:t.type==="cash-out"?C.goldLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>
                  {t.type==="cash-in"?"↙":t.type==="cash-out"?"↗":"+"}
                </div>
                <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>{t.user}</div><div style={{ fontSize:9, color:C.g400 }}>{t.type} • {t.time}</div></div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:12, fontWeight:700, color:t.type==="cash-in"?C.deepGreen:t.type==="registration"?C.blue:C.g700 }}>
                  {t.type==="registration"?"Registered":`${t.type==="cash-in"?"+":"−"}؋ ${t.amtAFN.toLocaleString()}`}
                </div>
                {t.comm>0&&<div style={{ fontSize:9, color:C.gold }}>+؋{t.comm} comm</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="txnLog" onNav={onNav}/>
    </div>
  );
};

/* ─── TXN DETAIL ─── */
const TxnDetailScreen = ({ goBack, data }) => {
  const t = data?.txn || recentTxns[0];
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><Header title="Transaction Detail" onMenu={goBack}/>
      <div style={{ padding:"20px 16px", textAlign:"center" }}>
        <div style={{ width:48, height:48, borderRadius:14, margin:"0 auto 10px", background:t.type==="cash-in"?C.greenLight:t.type==="cash-out"?C.goldLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>
          {t.type==="cash-in"?"↙":t.type==="cash-out"?"↗":"+"}
        </div>
        <div style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", letterSpacing:1, color:t.type==="cash-in"?C.deepGreen:t.type==="cash-out"?C.gold:C.blue }}>{t.type.replace("-"," ")}</div>
        {t.amtAFN>0?<div style={{ fontSize:28, fontWeight:900, color:C.navy, margin:"4px 0" }}>؋ {t.amtAFN.toLocaleString()}</div>:<div style={{ fontSize:28, fontWeight:900, color:C.navy }}>New User</div>}
        {t.amtUSD>0&&<div style={{ fontSize:12, color:C.g400 }}>≈ $ {t.amtUSD.toFixed(2)} USD</div>}
      </div>
      <div style={{ margin:"0 16px", background:C.g50, borderRadius:12, padding:14 }}>
        {[{l:"User",v:t.user},{l:"Phone",v:t.phone},{l:"Time",v:t.time},{l:"Commission",v:t.comm?`؋ ${t.comm}`:"-",color:t.comm?C.gold:C.g400},{l:"Transaction ID",v:t.id,mono:true},{l:"Status",v:"Completed",color:C.deepGreen}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<5?`1px solid ${C.g200}`:"none" }}>
            <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span><span style={{ fontSize:12, fontWeight:600, color:r.color||C.g800, fontFamily:r.mono?"monospace":"inherit" }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div style={{ padding:"12px 16px", display:"flex", gap:8 }}>
        <Btn variant="outline" style={{ padding:"10px" }}>Print Receipt</Btn>
        <Btn variant="ghost" style={{ padding:"10px" }}>Report Issue</Btn>
      </div>
    </div>
  );
};

/* ─── EARNINGS ─── */
const EarningsScreen = ({ goBack }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/><Header title="Earnings" sub="Commission tracking" onMenu={goBack}/>
    <div style={{ padding:"12px 12px 0" }}>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <MiniStat label="TODAY" value={`؋ ${agent.commToday.toLocaleString()}`} icon="◈" color={C.gold} bg={C.goldLight}/>
        <MiniStat label="THIS WEEK" value={`؋ ${agent.commWeek.toLocaleString()}`} icon="📊"/>
      </div>
      <MiniStat label="THIS MONTH" value={`؋ ${agent.commMonth.toLocaleString()}`} sub={`≈ $ ${(agent.commMonth*0.01162).toFixed(2)} USD`} icon="📈" color={C.blue} bg={C.blueLight}/>
    </div>
    <div style={{ padding:"12px 12px" }}>
      <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.g200}`, padding:"14px 16px", marginBottom:12 }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.navy, marginBottom:10 }}>Daily Commission</div>
        <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
          {dailyComm.map((v,i)=>{const max=Math.max(...dailyComm);return(
            <div key={i} style={{ flex:1, textAlign:"center" }}>
              <div style={{ height:60, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                <div style={{ width:"80%", height:`${(v/max)*100}%`, background:i===4?`linear-gradient(to top,${C.gold},${C.deepGreen})`:C.deepGreen+"30", borderRadius:"3px 3px 0 0" }}/>
              </div>
              <div style={{ fontSize:8, color:i===4?C.deepGreen:C.g400, marginTop:3, fontWeight:i===4?700:400 }}>{weekDays[i]}</div>
              <div style={{ fontSize:7, color:C.g400 }}>؋{(v/1000).toFixed(1)}k</div>
            </div>
          );})}
        </div>
      </div>
      <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.g200}`, padding:"14px 16px" }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.navy, marginBottom:8 }}>Breakdown (Today)</div>
        {[{l:"Cash-In (22 txns)",v:"؋ 1,560"},{l:"Cash-Out (25 txns)",v:"؋ 1,260"},{l:"Registrations (3)",v:"؋ 0"}].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<2?`1px solid ${C.g100}`:"none" }}>
            <span style={{ fontSize:12, color:C.g600 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:700, color:C.navy }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── FLOAT ─── */
const FloatScreen = ({ goBack }) => {
  const [showReq,setShowReq]=useState(false);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/><Header title="Float Management" sub="Agent liquidity" onMenu={goBack}/>
      <div style={{ padding:"0 12px" }}>
        <div style={{ margin:"12px 0", padding:"16px 18px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, borderRadius:14, color:C.white }}>
          <div style={{ fontSize:10, opacity:0.6 }}>Current Float (AFN)</div>
          <div style={{ fontSize:28, fontWeight:900 }}>؋ {agent.floatAFN.toLocaleString()}</div>
          <div style={{ fontSize:10, opacity:0.45 }}>≈ $ {agent.floatUSD.toLocaleString()} USD</div>
          <div style={{ marginTop:10, background:"rgba(255,255,255,0.1)", borderRadius:4, height:6 }}><div style={{ width:"57%", height:"100%", background:C.green400, borderRadius:4 }}/></div>
          <div style={{ fontSize:9, opacity:0.4, marginTop:4 }}>57% of daily limit</div>
        </div>

        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          <Btn onClick={()=>setShowReq(!showReq)} variant={showReq?"ghost":"gold"} style={{ padding:"10px", flex:1 }}>{showReq?"Cancel":"Request Top-Up"}</Btn>
          <Btn variant="outline" style={{ padding:"10px", flex:1 }}>Set Alert</Btn>
        </div>

        {showReq&&(
          <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.gold}40`, padding:14, marginBottom:12 }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.navy, marginBottom:10 }}>Top-Up Request</div>
            <input defaultValue="500000" style={{ width:"100%", boxSizing:"border-box", border:`2px solid ${C.g200}`, borderRadius:8, padding:"10px 12px", fontSize:14, fontWeight:700, fontFamily:"inherit", outline:"none", marginBottom:10 }}/>
            <div style={{ display:"flex", gap:6, marginBottom:10 }}>
              {["Bank","Cash Collect","Other Agent"].map((m,i)=><div key={m} style={{ flex:1, padding:"8px 4px", borderRadius:6, textAlign:"center", fontSize:10, fontWeight:600, background:i===0?C.deepGreen:C.g100, color:i===0?C.white:C.g600, cursor:"pointer" }}>{m}</div>)}
            </div>
            <Btn onClick={()=>setShowReq(false)} variant="gold" style={{ padding:"10px" }}>Submit</Btn>
          </div>
        )}

        <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
          <div style={{ padding:"10px 14px", borderBottom:`1px solid ${C.g100}`, fontSize:13, fontWeight:700, color:C.navy }}>Top-Up History</div>
          {topUpHistory.map((t,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", borderBottom:i<topUpHistory.length-1?`1px solid ${C.g100}`:"none" }}>
              <div><div style={{ fontSize:12, fontWeight:600, color:C.g800 }}>؋ {t.amt.toLocaleString()}</div><div style={{ fontSize:10, color:C.g400 }}>{t.method}</div></div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:11, fontWeight:600, color:C.deepGreen }}>Completed</div><div style={{ fontSize:10, color:C.g400 }}>{t.date}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── ALERTS ─── */
const AlertsScreen = ({ goBack }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/><Header title="Alerts" onMenu={goBack}/>
    <div style={{ flex:1, padding:"8px 12px" }}>
      {alerts.map((a,i)=>(
        <div key={i} style={{ background:C.white, borderRadius:10, padding:"10px 12px", marginBottom:8, border:`1px solid ${C.g200}`, display:"flex", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", marginTop:5, flexShrink:0, background:a.type==="warning"?C.orange:a.type==="success"?C.green400:C.blue }}/>
          <div><div style={{ fontSize:12, color:C.g700, lineHeight:1.4 }}>{a.msg}</div><div style={{ fontSize:10, color:C.g400, marginTop:3 }}>{a.time}</div></div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── MORE (MENU) ─── */
const MoreScreen = ({ onNav, go }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/>
    <div style={{ padding:"16px 16px 10px", background:C.navy, color:C.white }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:44, height:44, borderRadius:14, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800 }}>SN</div>
        <div><div style={{ fontSize:15, fontWeight:700 }}>{agent.name}</div><div style={{ fontSize:10, opacity:0.5 }}>{agent.id} • {agent.area}</div>
          <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}><div style={{ width:5, height:5, borderRadius:"50%", background:C.green400 }}/><span style={{ fontSize:9, color:C.green400 }}>Online</span><span style={{ fontSize:9, color:C.gold, background:"rgba(200,162,78,0.15)", padding:"1px 6px", borderRadius:3, marginLeft:3 }}>{agent.tier}</span></div>
        </div>
      </div>
    </div>
    <div style={{ padding:"8px 12px" }}>
      {[
        {s:"Operations",items:[{icon:"◈",l:"Earnings & Commission",act:()=>go("earnings")},{icon:"◎",l:"Float Management",act:()=>go("float")},{icon:"↙",l:"Cash-In",act:()=>go("cashIn")},{icon:"↗",l:"Cash-Out",act:()=>go("cashOut")},{icon:"+",l:"Register User",act:()=>go("register")}]},
        {s:"Account",items:[{icon:"🔒",l:"Change PIN"},{icon:"📱",l:"Linked Device",sub:"Samsung A54"},{icon:"🌐",l:"Language",sub:"English"},{icon:"⚡",l:"Daily Limit",sub:"؋ 1,500,000"}]},
        {s:"Support",items:[{icon:"❓",l:"Help Center"},{icon:"💬",l:"Contact Support"},{icon:"ℹ️",l:"About",sub:"v1.0.0"}]},
      ].map(s=>(
        <div key={s.s}>
          <div style={{ fontSize:10, fontWeight:700, color:C.g400, padding:"10px 0 5px", letterSpacing:1 }}>{s.s.toUpperCase()}</div>
          <div style={{ background:C.white, borderRadius:10, overflow:"hidden", marginBottom:6 }}>
            {s.items.map((item,i)=>(
              <div key={i} onClick={item.act} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 12px", borderBottom:i<s.items.length-1?`1px solid ${C.g100}`:"none", cursor:item.act?"pointer":"default" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:14, width:20, textAlign:"center" }}>{item.icon}</span>
                  <span style={{ fontSize:13, fontWeight:500, color:C.g800 }}>{item.l}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>{item.sub&&<span style={{ fontSize:11, color:C.g400 }}>{item.sub}</span>}<span style={{ color:C.g300, fontSize:12 }}>›</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ margin:"10px 0", padding:"10px", borderRadius:10, background:C.redLight, textAlign:"center", fontSize:13, fontWeight:600, color:C.red, cursor:"pointer" }}>Sign Out</div>
    </div>
    <BottomNav active="more" onNav={onNav}/>
  </div>
);

/* ─── SETTINGS (from more) ─── */

/* ═══════════ MAIN SHELL ═══════════ */
export default function AgentMobile() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [screen,setScreen]=useState("home");
  const [screenData,setScreenData]=useState(null);
  const [history,setHistory]=useState([]);

  const go = (to,data=null)=>{setHistory(h=>[...h,{screen,data:screenData}]);setScreen(to);setScreenData(data);};
  const goBack = ()=>{if(history.length){const p=history[history.length-1];setHistory(h=>h.slice(0,-1));setScreen(p.screen);setScreenData(p.data);}else{setScreen("home");setScreenData(null);}};
  const handleNav = (id)=>{setHistory([]);setScreenData(null);setScreen(id);};

  const screenList = [
    {id:"login",l:"1. Login"},{id:"home",l:"2. Dashboard"},{id:"cashIn",l:"3. Cash-In"},
    {id:"cashOut",l:"4. Cash-Out"},{id:"register",l:"5. Register User"},{id:"txnLog",l:"6. Transaction Log"},
    {id:"txnDetail",l:"7. Txn Detail"},{id:"earnings",l:"8. Earnings"},{id:"float",l:"9. Float Mgmt"},
    {id:"alerts",l:"10. Alerts"},{id:"more",l:"11. Settings/More"},
  ];

  const descs = {
    login:"Agent authentication — phone + 6-digit PIN + device binding",
    home:"Float balance, stats, quick actions (cash-in/out/register), recent transactions",
    cashIn:"3-step deposit: find user → enter amount (AFN/USD) → confirm → receipt with commission",
    cashOut:"3-step withdrawal: find user → amount → PIN confirm → disburse cash to user",
    register:"2-step: user info (name, phone, gender, language) → KYC (Tazkira photo, selfie)",
    txnLog:"All transactions — filterable by type. Tap any for detail.",
    txnDetail:"Full breakdown: user, amount (AFN+USD), commission, ID, status",
    earnings:"Today/week/month commission stats + daily chart + breakdown by type",
    float:"Float balance with limit bar, top-up request form, top-up history",
    alerts:"System alerts — float warnings, reconciliation, feature updates",
    more:"Full settings: operations links, account config, support, sign out",
  };

  if(!loggedIn){
    return (
      <div style={{ minHeight:"calc(100vh - 56px)", background:`linear-gradient(135deg,#0c1220,${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'Outfit',sans-serif" }}>
        <div style={{ display:"flex", gap:60, alignItems:"center" }}>
          <div style={{ width:210, color:C.white }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.gold, letterSpacing:2, marginBottom:8 }}>AGENT PORTAL</div>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>Login</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>Agent authentication — phone + 6-digit PIN + device binding</div>
          </div>
          <div style={{ width:300, background:"#1a1a2e", borderRadius:36, padding:8, boxShadow:`0 30px 80px rgba(0,0,0,0.5)`, position:"relative" }}>
            <div style={{ width:100, height:6, background:"#2a2a4a", borderRadius:3, position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", zIndex:5 }}/>
            <div style={{ marginTop:14, borderRadius:28, overflow:"hidden", background:C.white, minHeight:580, maxHeight:620, overflowY:"auto" }}>
              <LoginScreen onLogin={()=>setLoggedIn(true)}/>
            </div>
            <div style={{ width:100, height:4, background:"rgba(255,255,255,0.15)", borderRadius:2, margin:"8px auto 4px" }}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"calc(100vh - 56px)", background:`linear-gradient(135deg,#0c1220,${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ display:"flex", gap:60, alignItems:"center", maxWidth:900 }}>
        {/* Sidebar */}
        <div style={{ width:210, flexShrink:0, color:C.white }}>
          <div style={{ fontSize:12, fontWeight:600, color:C.gold, letterSpacing:2, marginBottom:8 }}>AGENT PORTAL</div>
          <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>
            {screenList.find(s=>s.id===screen)?.l.replace(/^\d+\.\s*/,"")||screen}
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.6, marginBottom:20, minHeight:50 }}>{descs[screen]||""}</div>
          <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.2)", marginBottom:8, letterSpacing:1 }}>ALL SCREENS ({screenList.length})</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {screenList.map(s=>(
              <div key={s.id} onClick={()=>{setHistory([]);setScreen(s.id);setScreenData(s.id==="txnDetail"?{txn:recentTxns[0]}:null);}} style={{
                padding:"5px 10px", borderRadius:6, fontSize:11, cursor:"pointer",
                fontWeight:screen===s.id?700:400,
                background:screen===s.id?"rgba(10,104,71,0.3)":"transparent",
                color:screen===s.id?C.green400:"rgba(255,255,255,0.3)",
              }}>{s.l}</div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div style={{ width:300, background:"#1a1a2e", borderRadius:36, padding:8, boxShadow:`0 30px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05)`, position:"relative" }}>
          <div style={{ width:100, height:6, background:"#2a2a4a", borderRadius:3, position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", zIndex:5 }}/>
          <div style={{ marginTop:14, borderRadius:28, overflow:"hidden", background:C.white, minHeight:580, maxHeight:620, overflowY:"auto", position:"relative" }}>
            {screen==="home"&&<HomeScreen onNav={handleNav} go={go}/>}
            {screen==="cashIn"&&<CashInScreen onNav={handleNav} goBack={goBack}/>}
            {screen==="cashOut"&&<CashOutScreen onNav={handleNav} goBack={goBack}/>}
            {screen==="register"&&<RegisterScreen goBack={goBack}/>}
            {screen==="txnLog"&&<TxnLogScreen onNav={handleNav} go={go}/>}
            {screen==="txnDetail"&&<TxnDetailScreen goBack={goBack} data={screenData}/>}
            {screen==="earnings"&&<EarningsScreen goBack={goBack}/>}
            {screen==="float"&&<FloatScreen goBack={goBack}/>}
            {screen==="alerts"&&<AlertsScreen goBack={goBack}/>}
            {screen==="more"&&<MoreScreen onNav={handleNav} go={go}/>}
          </div>
          <div style={{ width:100, height:4, background:"rgba(255,255,255,0.15)", borderRadius:2, margin:"8px auto 4px" }}/>
        </div>
      </div>
    </div>
  );
}
