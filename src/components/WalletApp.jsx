"use client";
import { useState, useEffect } from "react";

const C = {
  deepGreen: "#0A6847", green500: "#10B981", green400: "#34D399", green100: "#D1FAE5",
  greenLight: "#ECFDF5", navy: "#0F1B2D", navy700: "#1B2A4A", gold: "#C8A24E",
  goldLight: "#FEF9EE", white: "#FFFFFF", off: "#F8FAFB", g50: "#F9FAFB",
  g100: "#F3F4F6", g200: "#E5E7EB", g300: "#D1D5DB", g400: "#9CA3AF",
  g500: "#6B7280", g600: "#4B5563", g700: "#374151", g800: "#1F2937",
  red: "#EF4444", redLight: "#FEF2F2", blue: "#3B82F6", blueLight: "#EFF6FF",
  greenGlow: "rgba(10,104,71,0.15)",
};

const me = { name: "Ahmad Noori", phone: "+93 70 123 4567", balAFN: 12500, balUSD: 145.35, city: "Kabul" };

const contacts = [
  { name: "Fatima Rahimi", phone: "+93 79 987 6543", avatar: "FR", recent: true },
  { name: "Khalid Wardak", phone: "+93 72 555 8901", avatar: "KW", recent: true },
  { name: "Zahra Ahmadi", phone: "+93 78 234 5678", avatar: "ZA", recent: false },
  { name: "Mohammad Karimi", phone: "+93 70 876 5432", avatar: "MK", recent: false },
  { name: "Mariam Stanikzai", phone: "+93 73 111 2233", avatar: "MS", recent: false },
];

const transactions = [
  { id: "TXN-2026-0223-4F8A", type: "sent", name: "Fatima Rahimi", amtAFN: -5000, amtUSD: -58.10, time: "2 min ago", date: "Today", status: "Completed", phone: "+93 79 987 6543" },
  { id: "TXN-2026-0223-3B21", type: "deposit", name: "Agent: Noor Exchange", amtAFN: 10000, amtUSD: 116.20, time: "1 hr ago", date: "Today", status: "Completed", phone: "Mandawi, Kabul" },
  { id: "TXN-2026-0223-1C09", type: "received", name: "Khalid Wardak", amtAFN: 2500, amtUSD: 29.05, time: "3 hr ago", date: "Today", status: "Completed", phone: "+93 72 555 8901" },
  { id: "TXN-2026-0222-9D44", type: "sent", name: "Zahra Ahmadi", amtAFN: -1200, amtUSD: -13.94, time: "Yesterday", date: "Yesterday", status: "Completed", phone: "+93 78 234 5678" },
  { id: "TXN-2026-0222-7E32", type: "withdraw", name: "Agent: Herat Money", amtAFN: -8000, amtUSD: -92.96, time: "Yesterday", date: "Yesterday", status: "Completed", phone: "Char-suq, Herat" },
  { id: "TXN-2026-0221-5A11", type: "received", name: "Mohammad Karimi", amtAFN: 3000, amtUSD: 34.86, time: "2 days ago", date: "Feb 21", status: "Completed", phone: "+93 70 876 5432" },
  { id: "TXN-2026-0220-2F87", type: "sent", name: "Mariam Stanikzai", amtAFN: -600, amtUSD: -6.97, time: "3 days ago", date: "Feb 20", status: "Completed", phone: "+93 73 111 2233" },
  { id: "TXN-2026-0219-8C55", type: "deposit", name: "Agent: Balkh Trust", amtAFN: 15000, amtUSD: 174.30, time: "4 days ago", date: "Feb 19", status: "Completed", phone: "Central Bazaar, Mazar" },
];

const agents = [
  { id: 1, name: "Sarafi Noor Exchange", area: "Mandawi, Kabul", dist: "0.8 km", status: "open", hours: "8:00 AM – 8:00 PM", phone: "+93 70 555 0001", services: ["Cash-In", "Cash-Out", "Registration"], rating: 4.8, txnToday: 142, lat: "34.5281", lng: "69.1723" },
  { id: 2, name: "Kabul Trust Money", area: "Shar-e-Naw, Kabul", dist: "1.2 km", status: "open", hours: "9:00 AM – 6:00 PM", phone: "+93 70 555 0002", services: ["Cash-In", "Cash-Out"], rating: 4.5, txnToday: 87, lat: "34.5353", lng: "69.1721" },
  { id: 3, name: "Pamir Exchange", area: "Karte-4, Kabul", dist: "2.5 km", status: "open", hours: "8:00 AM – 7:00 PM", phone: "+93 70 555 0003", services: ["Cash-In", "Cash-Out", "Registration"], rating: 4.6, txnToday: 63, lat: "34.5189", lng: "69.1578" },
  { id: 4, name: "Afghan Star Sarafi", area: "Deh Afghanan, Kabul", dist: "3.1 km", status: "closed", hours: "Opens 8:00 AM", phone: "+93 70 555 0004", services: ["Cash-In", "Cash-Out"], rating: 4.2, txnToday: 0, lat: "34.5155", lng: "69.1810" },
  { id: 5, name: "Herat Money Services", area: "Char-suq, Herat", dist: "340 km", status: "open", hours: "7:00 AM – 9:00 PM", phone: "+93 70 555 0005", services: ["Cash-In", "Cash-Out", "Registration", "USD Exchange"], rating: 4.9, txnToday: 203, lat: "34.3482", lng: "62.1997" },
];

const notifications = [
  { id: 1, type: "received", title: "Money Received", desc: "Khalid Wardak sent you ؋ 2,500", time: "3 hr ago", read: false },
  { id: 2, type: "deposit", title: "Deposit Successful", desc: "؋ 10,000 loaded at Noor Exchange", time: "1 hr ago", read: false },
  { id: 3, type: "security", title: "New Device Login", desc: "Your account was accessed from Samsung A14", time: "Yesterday", read: true },
  { id: 4, type: "promo", title: "Welcome to AFSWITCH!", desc: "Your first 10 transfers are fee-free 🎉", time: "2 days ago", read: true },
  { id: 5, type: "sent", title: "Transfer Complete", desc: "؋ 1,200 sent to Zahra Ahmadi", time: "Yesterday", read: true },
];

const faqItems = [
  { q: "How do I deposit cash?", a: "Visit any AFSWITCH agent, give them cash, and they will credit digits to your wallet instantly. You'll receive a notification when done." },
  { q: "How do I withdraw cash?", a: "Visit any agent, tell them the amount, confirm with your PIN on your phone, and receive physical cash." },
  { q: "Is my money safe?", a: "Every transaction is recorded on an immutable ledger. Your PIN and device binding ensure only you can authorize transactions." },
  { q: "What currencies are supported?", a: "AFSWITCH supports Afghan Afghani (AFN) and US Dollar (USD). You can toggle between them in the app." },
  { q: "What are the transaction fees?", a: "P2P transfers are currently free during beta. Standard fee is 1% per transaction, with 0.6% going to the agent." },
  { q: "How do I change my language?", a: "Go to Profile → Language. You can switch between English, دری (Dari), and پښتو (Pashto) at any time." },
  { q: "What if I lose my phone?", a: "Contact support immediately. Your account is device-bound for security. We can freeze your wallet and help you recover access." },
];

/* ─── Shared Components ─── */
const StatusBar = () => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 20px 4px", fontSize: 11, fontWeight: 600, color: C.white, background: C.deepGreen }}>
    <span>9:41</span>
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      <span style={{ fontSize: 9 }}>LTE</span>
      <div style={{ display: "flex", gap: 1 }}>{[8,11,14,17].map((h,i)=><div key={i} style={{ width:3, height:h, background:C.white, borderRadius:1 }}/>)}</div>
      <div style={{ width:20, height:10, border:`1px solid ${C.white}`, borderRadius:3, position:"relative", marginLeft:2 }}>
        <div style={{ position:"absolute", left:1, top:1, bottom:1, width:"70%", background:C.green400, borderRadius:1 }}/>
      </div>
    </div>
  </div>
);

const BottomNav = ({ active, onNav }) => (
  <div style={{ display:"flex", justifyContent:"space-around", padding:"8px 0 12px", background:C.white, borderTop:`1px solid ${C.g100}` }}>
    {[{id:"home",icon:"⌂",l:"Home"},{id:"history",icon:"☰",l:"History"},{id:"qr",icon:"⊞",l:"QR"},{id:"agents",icon:"◎",l:"Agents"},{id:"profile",icon:"○",l:"Profile"}].map(n=>(
      <div key={n.id} onClick={()=>onNav(n.id)} style={{ textAlign:"center", cursor:"pointer", minWidth:48 }}>
        <div style={{ fontSize:18, color:active===n.id?C.deepGreen:C.g400, fontWeight:active===n.id?700:400, lineHeight:1 }}>{n.icon}</div>
        <div style={{ fontSize:9, marginTop:2, fontWeight:600, color:active===n.id?C.deepGreen:C.g400 }}>{n.l}</div>
      </div>
    ))}
  </div>
);

const BackHeader = ({ title, onBack, right }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 16px", background:C.deepGreen, color:C.white }}>
    <div onClick={onBack} style={{ cursor:"pointer", fontSize:18, padding:"0 4px", width:30 }}>←</div>
    <div style={{ fontSize:15, fontWeight:700 }}>{title}</div>
    <div style={{ width:30, textAlign:"right" }}>{right||""}</div>
  </div>
);

const Btn = ({ children, onClick, variant="primary", style={} }) => {
  const s = { primary:{background:C.deepGreen,color:C.white}, gold:{background:C.gold,color:C.navy}, outline:{background:"transparent",color:C.deepGreen,border:`2px solid ${C.deepGreen}`}, ghost:{background:C.g100,color:C.g700}, danger:{background:C.redLight,color:C.red} };
  return <div onClick={onClick} style={{ padding:"14px 24px", borderRadius:12, textAlign:"center", fontSize:14, fontWeight:700, cursor:"pointer", width:"100%", boxSizing:"border-box", transition:"opacity 0.15s", ...s[variant], ...style }}>{children}</div>;
};

const Numpad = ({ onKey }) => (
  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, padding:"0 8px" }}>
    {[1,2,3,4,5,6,7,8,9,".",0,"⌫"].map((n,i)=>(
      <div key={i} onClick={()=>onKey(n==="⌫"?"del":n===""?null:String(n))} style={{
        height:44, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:n==="⌫"?18:20, fontWeight:500, color:C.g800, cursor:n===""?"default":"pointer", background:n===""?"transparent":C.g50,
      }}>{n}</div>
    ))}
  </div>
);

const PinOverlay = ({ onComplete, title="Enter PIN to confirm" }) => {
  const [pins, setPins] = useState([]);
  const tap = (n) => {
    if(n==="del"){setPins(p=>p.slice(0,-1));return;}
    if(n===null)return;
    if(pins.length<4){const np=[...pins,n];setPins(np);if(np.length===4)setTimeout(()=>onComplete(),400);}
  };
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(15,27,45,0.95)", zIndex:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", borderRadius:28 }}>
      <div style={{ fontSize:16, fontWeight:700, color:C.white, marginBottom:4 }}>{title}</div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:24 }}>4-digit transaction PIN</div>
      <div style={{ display:"flex", gap:12, marginBottom:32 }}>
        {[0,1,2,3].map(i=><div key={i} style={{ width:14, height:14, borderRadius:"50%", background:i<pins.length?C.green400:"rgba(255,255,255,0.2)", transition:"all 0.15s" }}/>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, width:220 }}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=>(
          <div key={i} onClick={()=>{if(n==="")return;tap(n==="⌫"?"del":String(n));}} style={{
            height:48, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:n==="⌫"?18:22, fontWeight:600, color:C.white, cursor:n===""?"default":"pointer",
            background:n===""?"transparent":"rgba(255,255,255,0.08)",
          }}>{n}</div>
        ))}
      </div>
    </div>
  );
};

const SuccessScreen = ({ title, subtitle, details, onDone }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white, alignItems:"center", justifyContent:"center", padding:24 }}>
    <div style={{ width:72, height:72, borderRadius:"50%", background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, marginBottom:20, animation:"pop 0.4s ease" }}>✓</div>
    <div style={{ fontSize:22, fontWeight:800, color:C.navy, marginBottom:4 }}>{title}</div>
    <div style={{ fontSize:14, color:C.g500, marginBottom:24, textAlign:"center" }}>{subtitle}</div>
    {details && (
      <div style={{ background:C.g50, borderRadius:14, padding:20, width:"100%", marginBottom:24 }}>
        {details.map((d,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<details.length-1?`1px solid ${C.g200}`:"none" }}>
            <span style={{ fontSize:12, color:C.g400 }}>{d.l}</span>
            <span style={{ fontSize:12, fontWeight:d.bold?700:500, color:d.color||C.g800, fontFamily:d.mono?"monospace":"inherit" }}>{d.v}</span>
          </div>
        ))}
      </div>
    )}
    <Btn onClick={onDone}>Done</Btn>
    <style>{`@keyframes pop{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}`}</style>
  </div>
);

/* ═══════════ SCREENS ═══════════ */

const SplashScreen = ({ onNext }) => {
  useEffect(()=>{const t=setTimeout(onNext,1800);return()=>clearTimeout(t);},[]);
  return (
    <div style={{ height:"100%", minHeight:580, background:`linear-gradient(165deg,${C.deepGreen} 0%,${C.navy700} 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"rgba(255,255,255,0.12)", width:72, height:72, borderRadius:20, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, animation:"pulseS 1.5s ease infinite" }}>
        <span style={{ color:C.white, fontSize:26, fontWeight:900, letterSpacing:1 }}>AF</span>
      </div>
      <div style={{ color:C.white, fontSize:24, fontWeight:800, letterSpacing:1.5 }}>AFSWITCH</div>
      <div style={{ color:"rgba(255,255,255,0.5)", fontSize:11, marginTop:6, letterSpacing:2 }}>DIGITAL FINANCIAL NETWORK</div>
      <div style={{ marginTop:40, width:32, height:3, borderRadius:2, background:"rgba(255,255,255,0.15)", overflow:"hidden" }}>
        <div style={{ width:"100%", height:"100%", background:C.gold, animation:"loadB 1.5s ease forwards" }}/>
      </div>
      <style>{`@keyframes pulseS{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@keyframes loadB{0%{transform:translateX(-100%)}100%{transform:translateX(0)}}`}</style>
    </div>
  );
};

const OnboardingScreen = ({ onNext }) => {
  const [s, setS] = useState(0);
  const sl = [
    { icon:"↗↙", t:"Send & Receive Instantly", d:"Transfer digits to anyone using just their phone number. Instant, secure, tracked." },
    { icon:"🏪", t:"Cash-In & Cash-Out", d:"Deposit or withdraw physical cash at any sarafi agent in the AFSWITCH network." },
    { icon:"🔒", t:"Safe & Transparent", d:"Every transaction is recorded on an immutable ledger. Your money, your history, always." },
  ];
  return (
    <div style={{ height:"100%", minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"16px 16px 0" }}>
        {["English","دری","پښتو"].map((l,i)=>(
          <div key={l} style={{ fontSize:11, fontWeight:600, padding:"5px 14px", borderRadius:100, background:i===0?C.deepGreen:C.g100, color:i===0?C.white:C.g500, cursor:"pointer" }}>{l}</div>
        ))}
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 28px" }}>
        <div style={{ width:80, height:80, borderRadius:24, margin:"0 auto 24px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:C.white }}>{sl[s].icon}</div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:800, color:C.navy, marginBottom:8 }}>{sl[s].t}</div>
          <div style={{ fontSize:13, color:C.g500, lineHeight:1.6 }}>{sl[s].d}</div>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:20 }}>
        {sl.map((_,i)=><div key={i} style={{ width:i===s?24:8, height:8, borderRadius:4, background:i===s?C.deepGreen:C.g200, transition:"all 0.3s" }}/>)}
      </div>
      <div style={{ padding:"0 20px 24px" }}>
        {s<2?<div style={{ display:"flex", gap:10 }}><Btn variant="ghost" onClick={onNext} style={{ flex:1,padding:"12px" }}>Skip</Btn><Btn onClick={()=>setS(x=>x+1)} style={{ flex:2,padding:"12px" }}>Next</Btn></div>:<Btn onClick={onNext}>Get Started</Btn>}
      </div>
    </div>
  );
};

const SignupScreen = ({ onNext }) => {
  const [ph,setPh]=useState("");
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ padding:"40px 24px 0" }}>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy, marginBottom:4 }}>Welcome</div>
        <div style={{ fontSize:14, color:C.g500, marginBottom:32 }}>Enter your phone number to get started</div>
        <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>Phone Number</div>
        <div style={{ display:"flex", alignItems:"center", border:`2px solid ${ph.length>0?C.deepGreen:C.g200}`, borderRadius:12, overflow:"hidden" }}>
          <div style={{ padding:"14px 12px", background:C.g50, borderRight:`1px solid ${C.g200}`, fontSize:14, fontWeight:600, color:C.g700, display:"flex", alignItems:"center", gap:6 }}>🇦🇫 +93</div>
          <input value={ph} onChange={e=>setPh(e.target.value.replace(/[^0-9]/g,"").slice(0,9))} placeholder="70 123 4567" style={{ flex:1, border:"none", outline:"none", padding:"14px 12px", fontSize:16, fontWeight:500, fontFamily:"inherit", color:C.g800 }}/>
        </div>
        <div style={{ fontSize:11, color:C.g400, marginTop:8 }}>We'll send you a verification code via SMS</div>
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ padding:"0 24px 24px" }}>
        <div style={{ fontSize:11, color:C.g400, textAlign:"center", marginBottom:12, lineHeight:1.5 }}>By continuing, you agree to AFSWITCH's Terms of Service and Privacy Policy</div>
        <Btn onClick={onNext} variant={ph.length>=9?"primary":"ghost"}>Send Verification Code</Btn>
      </div>
    </div>
  );
};

const OTPScreen = ({ onNext }) => {
  const [code,setCode]=useState(["","","","","",""]);
  const [timer,setTimer]=useState(47);
  useEffect(()=>{const t=setInterval(()=>setTimer(s=>s>0?s-1:0),1000);return()=>clearInterval(t);},[]);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ padding:"40px 24px 0" }}>
        <div style={{ fontSize:24, fontWeight:800, color:C.navy, marginBottom:4 }}>Verify Number</div>
        <div style={{ fontSize:14, color:C.g500, marginBottom:32 }}>Enter the 6-digit code sent to <span style={{ fontWeight:600, color:C.g800 }}>+93 70 123 4567</span></div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:24 }}>
          {code.map((d,i)=><div key={i} onClick={()=>{const nc=[...code];if(!nc[i]){nc[i]=String(Math.floor(Math.random()*10));setCode(nc);}}} style={{ width:44, height:52, borderRadius:10, border:`2px solid ${d?C.deepGreen:C.g200}`, background:d?C.greenLight:C.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:C.navy, cursor:"pointer" }}>{d||""}</div>)}
        </div>
        <div style={{ textAlign:"center" }}>{timer>0?<span style={{ fontSize:13, color:C.g400 }}>Resend code in <span style={{ fontWeight:600, color:C.g700 }}>{timer}s</span></span>:<span style={{ fontSize:13, color:C.deepGreen, fontWeight:600, cursor:"pointer" }}>Resend Code</span>}</div>
      </div>
      <div style={{ flex:1 }}/>
      <div style={{ padding:"0 24px 24px" }}><Btn onClick={onNext} variant={code.every(d=>d)?"primary":"ghost"}>Verify</Btn></div>
    </div>
  );
};

const PINSetScreen = ({ onNext }) => {
  const [pins,setPins]=useState([]);
  const tap=(n)=>{if(n==="del"){setPins(p=>p.slice(0,-1));return;}if(n===null)return;if(pins.length<4){const np=[...pins,n];setPins(np);if(np.length===4)setTimeout(onNext,400);}};
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <div style={{ padding:"48px 24px 0", textAlign:"center" }}>
        <div style={{ width:56, height:56, borderRadius:16, margin:"0 auto 16px", background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🔒</div>
        <div style={{ fontSize:20, fontWeight:800, color:C.navy, marginBottom:4 }}>Set Your PIN</div>
        <div style={{ fontSize:13, color:C.g500, marginBottom:32 }}>This 4-digit PIN protects every transaction</div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:40 }}>
          {[0,1,2,3].map(i=><div key={i} style={{ width:16, height:16, borderRadius:"50%", background:i<pins.length?C.deepGreen:C.g200, transition:"all 0.15s", transform:i<pins.length?"scale(1.2)":"scale(1)" }}/>)}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, padding:"0 40px" }}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=><div key={i} onClick={()=>{if(n==="")return;tap(n==="⌫"?"del":String(n));}} style={{ height:52, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:n===""?"transparent":C.g50, fontSize:n==="⌫"?18:20, fontWeight:600, color:C.g800, cursor:n===""?"default":"pointer" }}>{n}</div>)}
      </div>
    </div>
  );
};

/* ─── HOME ─── */
const HomeScreen = ({ onNav, go }) => {
  const [showUSD,setShowUSD]=useState(false);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/>
      <div style={{ padding:"12px 20px 0", background:C.deepGreen, color:C.white }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div><div style={{ fontSize:12, opacity:0.7 }}>سلام ،</div><div style={{ fontSize:18, fontWeight:700 }}>Ahmad Noori</div></div>
          <div onClick={()=>go("notifications")} style={{ width:36, height:36, borderRadius:12, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, cursor:"pointer", position:"relative" }}>
            🔔<div style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:C.red, border:`2px solid ${C.deepGreen}` }}/>
          </div>
        </div>
      </div>
      <div style={{ margin:"0 16px", padding:"18px 20px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, borderRadius:"0 0 20px 20px", color:C.white, boxShadow:"0 8px 24px rgba(10,104,71,0.25)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <span style={{ fontSize:11, opacity:0.6 }}>Available Balance</span>
          <div onClick={()=>setShowUSD(!showUSD)} style={{ fontSize:10, fontWeight:600, padding:"3px 10px", borderRadius:6, background:"rgba(255,255,255,0.12)", cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}>
            {showUSD?"$ USD":"؋ AFN"} <span style={{ opacity:0.5 }}>↔</span>
          </div>
        </div>
        <div style={{ fontSize:32, fontWeight:900, letterSpacing:-1, margin:"2px 0" }}>{showUSD?`$ ${me.balUSD.toLocaleString()}`:`؋ ${me.balAFN.toLocaleString()}`}</div>
        <div style={{ fontSize:11, opacity:0.45 }}>{showUSD?`≈ ؋ ${me.balAFN.toLocaleString()} AFN`:`≈ $ ${me.balUSD.toLocaleString()} USD`}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-around", padding:"18px 12px 8px" }}>
        {[{icon:"↗",l:"Send",c:C.deepGreen,bg:C.greenLight,act:()=>go("send")},{icon:"↙",l:"Receive",c:C.blue,bg:C.blueLight,act:()=>go("qr")},{icon:"+",l:"Deposit",c:C.gold,bg:C.goldLight,act:()=>go("deposit")},{icon:"−",l:"Withdraw",c:C.g600,bg:C.g100,act:()=>go("withdraw")}].map(a=>(
          <div key={a.l} onClick={a.act} style={{ textAlign:"center", cursor:"pointer" }}>
            <div style={{ width:48, height:48, borderRadius:14, margin:"0 auto 6px", background:a.bg, color:a.c, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700 }}>{a.icon}</div>
            <div style={{ fontSize:11, fontWeight:600, color:C.g600 }}>{a.l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:"8px 16px 0" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:14, fontWeight:700, color:C.g800 }}>Recent Transactions</span>
          <span onClick={()=>onNav("history")} style={{ fontSize:12, color:C.deepGreen, fontWeight:600, cursor:"pointer" }}>See All</span>
        </div>
        <div style={{ background:C.white, borderRadius:14, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
          {transactions.slice(0,4).map((t,i)=>(
            <div key={t.id} onClick={()=>go("txnDetail",{txn:t})} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderBottom:i<3?`1px solid ${C.g100}`:"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:t.amtAFN>0?C.greenLight:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:t.amtAFN>0?C.deepGreen:C.g500 }}>
                  {t.type==="deposit"?"+":t.type==="withdraw"?"−":t.amtAFN>0?"↙":"↗"}
                </div>
                <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{t.name}</div><div style={{ fontSize:10, color:C.g400 }}>{t.time}</div></div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:700, color:t.amtAFN>0?C.deepGreen:C.g800 }}>{t.amtAFN>0?"+":""}؋ {Math.abs(t.amtAFN).toLocaleString()}</div>
                <div style={{ fontSize:10, color:C.g400 }}>{t.amtUSD>0?"+":""}$ {Math.abs(t.amtUSD).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" onNav={onNav}/>
    </div>
  );
};

/* ─── SEND ─── */
const SendScreen = ({ onBack, onComplete }) => {
  const [step,setStep]=useState(0);const [sel,setSel]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");const [showPin,setShowPin]=useState(false);const [search,setSearch]=useState("");
  const conv = cur==="AFN"? `$ ${(Number(amt)*0.01162).toFixed(2)} USD` : `؋ ${Math.round(Number(amt)/0.01162).toLocaleString()} AFN`;

  if(step===3) return <SuccessScreen title="Transfer Successful!" subtitle="Digits have been sent securely" details={[{l:"To",v:sel?.name},{l:"Phone",v:sel?.phone},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Equivalent",v:conv},{l:"Fee",v:"؋ 0 (Free)",color:C.deepGreen},{l:"Transaction ID",v:"TXN-2026-0223-4F8A",mono:true}]} onDone={onComplete}/>;

  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white, position:"relative" }}>
      {showPin && <PinOverlay onComplete={()=>{setShowPin(false);setStep(3);}}/>}
      <StatusBar/><BackHeader title={["Send To","Enter Amount","Confirm Transfer"][step]} onBack={()=>step===0?onBack():setStep(s=>s-1)}/>
      {step===0&&(
        <div style={{ flex:1, padding:"12px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:C.g50, borderRadius:10, marginBottom:16 }}>
            <span style={{ color:C.g400 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or number" style={{ border:"none", outline:"none", flex:1, fontSize:13, background:"transparent", fontFamily:"inherit" }}/>
          </div>
          {contacts.filter(c=>c.recent).length>0&&<><div style={{ fontSize:11, fontWeight:700, color:C.g400, marginBottom:8, letterSpacing:1 }}>RECENT</div><div style={{ display:"flex", gap:14, marginBottom:20 }}>{contacts.filter(c=>c.recent).map(c=>(<div key={c.phone} onClick={()=>{setSel(c);setStep(1);}} style={{ textAlign:"center", cursor:"pointer" }}><div style={{ width:44, height:44, borderRadius:14, margin:"0 auto 4px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:13, fontWeight:700 }}>{c.avatar}</div><div style={{ fontSize:10, color:C.g600, fontWeight:500 }}>{c.name.split(" ")[0]}</div></div>))}</div></>}
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, marginBottom:8, letterSpacing:1 }}>ALL CONTACTS</div>
          {contacts.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())).map(c=>(
            <div key={c.phone} onClick={()=>{setSel(c);setStep(1);}} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:`1px solid ${C.g100}`, cursor:"pointer" }}>
              <div style={{ width:40, height:40, borderRadius:12, background:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:C.g600 }}>{c.avatar}</div>
              <div><div style={{ fontSize:14, fontWeight:600, color:C.g800 }}>{c.name}</div><div style={{ fontSize:11, color:C.g400 }}>{c.phone}</div></div>
            </div>
          ))}
        </div>
      )}
      {step===1&&(
        <div style={{ flex:1, padding:"20px 20px", display:"flex", flexDirection:"column" }}>
          <div style={{ textAlign:"center", marginBottom:16 }}>
            <div style={{ width:44, height:44, borderRadius:14, margin:"0 auto 8px", background:`linear-gradient(135deg,${C.deepGreen},${C.navy700})`, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:14, fontWeight:700 }}>{sel?.avatar}</div>
            <div style={{ fontSize:14, fontWeight:600, color:C.g800 }}>{sel?.name}</div>
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:16 }}>
            {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"6px 20px", borderRadius:8, fontSize:13, fontWeight:700, background:cur===c?C.deepGreen:C.g100, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
          </div>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <span style={{ fontSize:42, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
            {amt&&<div style={{ fontSize:12, color:C.g400, marginTop:4 }}>≈ {conv}</div>}
          </div>
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:12 }}>
            {(cur==="AFN"?[500,1000,5000,10000]:[5,10,50,100]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"6px 12px", borderRadius:8, fontSize:11, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
          </div>
          <Numpad onKey={k=>{if(!k)return;if(k==="del")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+k);}}/>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>amt&&setStep(2)} variant={amt?"primary":"ghost"}>Continue</Btn>
        </div>
      )}
      {step===2&&(
        <div style={{ flex:1, padding:"20px 20px", display:"flex", flexDirection:"column" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontSize:14, color:C.g400, marginBottom:4 }}>You're sending</div>
            <div style={{ fontSize:36, fontWeight:900, color:C.navy }}>{cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}</div>
            <div style={{ fontSize:12, color:C.g400 }}>≈ {conv}</div>
          </div>
          <div style={{ background:C.g50, borderRadius:14, padding:16, marginBottom:16 }}>
            {[{l:"To",v:sel?.name},{l:"Phone",v:sel?.phone},{l:"Fee",v:"؋ 0 (Free beta)"},{l:"Total",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<3?`1px solid ${C.g200}`:"none" }}>
                <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:i===3?700:500, color:i===2?C.deepGreen:C.g800 }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ background:C.greenLight, borderRadius:10, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:16 }}>🔒</span><span style={{ fontSize:11, color:C.deepGreen, lineHeight:1.4 }}>Secured by PIN verification and immutable ledger recording.</span>
          </div>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>setShowPin(true)} variant="gold">Confirm & Send</Btn>
        </div>
      )}
    </div>
  );
};

/* ─── DEPOSIT ─── */
const DepositScreen = ({ onBack, go }) => {
  const [step,setStep]=useState(0);const [agent,setAgent]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");
  const openAgents = agents.filter(a=>a.status==="open");

  if(step===2) return <SuccessScreen title="Deposit Initiated!" subtitle="Show this code to your agent to complete the deposit" details={[{l:"Agent",v:agent?.name},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Deposit Code",v:"DEP-8472",bold:true,color:C.deepGreen,mono:true},{l:"Expires in",v:"30 minutes",color:C.gold},{l:"Status",v:"Awaiting Agent Confirmation",color:C.gold}]} onDone={onBack}/>;

  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><BackHeader title={step===0?"Deposit Cash":"Enter Amount"} onBack={()=>step===0?onBack():setStep(0)}/>
      {step===0&&(
        <div style={{ flex:1, padding:"12px 16px" }}>
          <div style={{ background:C.greenLight, borderRadius:12, padding:"12px 16px", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:20 }}>💡</span>
            <div style={{ fontSize:12, color:C.deepGreen, lineHeight:1.5 }}>Select an agent below, then visit them physically with your cash. You can also walk in to any agent directly.</div>
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, marginBottom:8, letterSpacing:1 }}>NEARBY OPEN AGENTS</div>
          {openAgents.map(a=>(
            <div key={a.id} onClick={()=>{setAgent(a);setStep(1);}} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:`1px solid ${C.g100}`, cursor:"pointer" }}>
              <div style={{ width:42, height:42, borderRadius:12, background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏪</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{a.name}</div>
                <div style={{ fontSize:11, color:C.g400 }}>{a.area} • {a.dist}</div>
              </div>
              <div style={{ fontSize:11, fontWeight:600, color:C.deepGreen }}>Select</div>
            </div>
          ))}
        </div>
      )}
      {step===1&&(
        <div style={{ flex:1, padding:"16px 20px", display:"flex", flexDirection:"column" }}>
          <div style={{ background:C.g50, borderRadius:12, padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:C.greenLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏪</div>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{agent?.name}</div><div style={{ fontSize:11, color:C.g400 }}>{agent?.area}</div></div>
          </div>
          <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:8 }}>How much are you depositing?</div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:16 }}>
            {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"6px 20px", borderRadius:8, fontSize:13, fontWeight:700, background:cur===c?C.deepGreen:C.g100, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
          </div>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <span style={{ fontSize:40, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
          </div>
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:12 }}>
            {(cur==="AFN"?[1000,5000,10000,20000]:[10,50,100,200]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"6px 12px", borderRadius:8, fontSize:11, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
          </div>
          <Numpad onKey={k=>{if(!k)return;if(k==="del")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+k);}}/>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>amt&&setStep(2)} variant={amt?"gold":"ghost"}>Generate Deposit Code</Btn>
        </div>
      )}
    </div>
  );
};

/* ─── WITHDRAW ─── */
const WithdrawScreen = ({ onBack }) => {
  const [step,setStep]=useState(0);const [agent,setAgent]=useState(null);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");const [showPin,setShowPin]=useState(false);
  const openAgents=agents.filter(a=>a.status==="open");

  if(step===3) return <SuccessScreen title="Withdrawal Confirmed!" subtitle="Show this to your agent to receive cash" details={[{l:"Agent",v:agent?.name},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Withdrawal Code",v:"WDR-3291",bold:true,color:C.gold,mono:true},{l:"Expires in",v:"15 minutes",color:C.gold},{l:"Status",v:"Ready for Cash Collection",color:C.deepGreen}]} onDone={onBack}/>;

  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white, position:"relative" }}>
      {showPin&&<PinOverlay title="Enter PIN to withdraw" onComplete={()=>{setShowPin(false);setStep(3);}}/>}
      <StatusBar/><BackHeader title={step===0?"Withdraw Cash":step===1?"Enter Amount":"Confirm Withdrawal"} onBack={()=>step===0?onBack():setStep(s=>s-1)}/>
      {step===0&&(
        <div style={{ flex:1, padding:"12px 16px" }}>
          <div style={{ background:C.goldLight, borderRadius:12, padding:"12px 16px", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:20 }}>💡</span>
            <div style={{ fontSize:12, color:C.gold, lineHeight:1.5 }}>Select an agent to withdraw from. You'll receive a withdrawal code to show the agent.</div>
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, marginBottom:8, letterSpacing:1 }}>NEARBY OPEN AGENTS</div>
          {openAgents.map(a=>(
            <div key={a.id} onClick={()=>{setAgent(a);setStep(1);}} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:`1px solid ${C.g100}`, cursor:"pointer" }}>
              <div style={{ width:42, height:42, borderRadius:12, background:C.goldLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏪</div>
              <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{a.name}</div><div style={{ fontSize:11, color:C.g400 }}>{a.area} • {a.dist}</div></div>
              <div style={{ fontSize:11, fontWeight:600, color:C.gold }}>Select</div>
            </div>
          ))}
        </div>
      )}
      {step===1&&(
        <div style={{ flex:1, padding:"16px 20px", display:"flex", flexDirection:"column" }}>
          <div style={{ background:C.g50, borderRadius:12, padding:"12px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:C.goldLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏪</div>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{agent?.name}</div><div style={{ fontSize:11, color:C.g400 }}>{agent?.area}</div></div>
          </div>
          <div style={{ fontSize:12, fontWeight:600, color:C.g600, marginBottom:4 }}>Withdrawal amount</div>
          <div style={{ fontSize:11, color:C.g400, marginBottom:12 }}>Balance: ؋ {me.balAFN.toLocaleString()} ($ {me.balUSD.toFixed(2)})</div>
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:16 }}>
            {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"6px 20px", borderRadius:8, fontSize:13, fontWeight:700, background:cur===c?C.deepGreen:C.g100, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
          </div>
          <div style={{ textAlign:"center", marginBottom:12 }}>
            <span style={{ fontSize:40, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
          </div>
          <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:12 }}>
            {(cur==="AFN"?[1000,5000,10000]:[10,50,100]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"6px 12px", borderRadius:8, fontSize:11, fontWeight:600, background:C.g50, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
          </div>
          <Numpad onKey={k=>{if(!k)return;if(k==="del")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+k);}}/>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>amt&&setStep(2)} variant={amt?"primary":"ghost"}>Continue</Btn>
        </div>
      )}
      {step===2&&(
        <div style={{ flex:1, padding:"20px 20px", display:"flex", flexDirection:"column" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <div style={{ fontSize:14, color:C.g400, marginBottom:4 }}>Withdrawing</div>
            <div style={{ fontSize:36, fontWeight:900, color:C.navy }}>{cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`}</div>
          </div>
          <div style={{ background:C.g50, borderRadius:14, padding:16, marginBottom:16 }}>
            {[{l:"From Agent",v:agent?.name},{l:"Location",v:agent?.area},{l:"Amount",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()}`:`$ ${amt}`},{l:"Fee",v:"؋ 0 (Free beta)"},{l:"You'll receive",v:cur==="AFN"?`؋ ${Number(amt).toLocaleString()} cash`:`$ ${amt} cash`}].map((r,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:i<4?`1px solid ${C.g200}`:"none" }}>
                <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span><span style={{ fontSize:13, fontWeight:i===4?700:500, color:i===3?C.deepGreen:C.g800 }}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{ flex:1 }}/>
          <Btn onClick={()=>setShowPin(true)} variant="gold">Confirm Withdrawal</Btn>
        </div>
      )}
    </div>
  );
};

/* ─── TRANSACTION DETAIL ─── */
const TxnDetailScreen = ({ onBack, data }) => {
  const t = data?.txn || transactions[0];
  const typeLabel = {sent:"Sent",received:"Received",deposit:"Deposit",withdraw:"Withdrawal"}[t.type];
  const typeColor = t.amtAFN>0?C.deepGreen:C.g700;
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><BackHeader title="Transaction Details" onBack={onBack}/>
      <div style={{ padding:"24px 20px", textAlign:"center" }}>
        <div style={{ width:56, height:56, borderRadius:16, margin:"0 auto 12px", background:t.amtAFN>0?C.greenLight:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:typeColor }}>
          {t.type==="deposit"?"+":t.type==="withdraw"?"−":t.amtAFN>0?"↙":"↗"}
        </div>
        <div style={{ fontSize:11, fontWeight:600, color:typeColor, textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>{typeLabel}</div>
        <div style={{ fontSize:32, fontWeight:900, color:C.navy }}>{t.amtAFN>0?"+":""}؋ {Math.abs(t.amtAFN).toLocaleString()}</div>
        <div style={{ fontSize:14, color:C.g400 }}>{t.amtUSD>0?"+":""}$ {Math.abs(t.amtUSD).toFixed(2)} USD</div>
      </div>
      <div style={{ margin:"0 20px", background:C.g50, borderRadius:14, padding:16 }}>
        {[
          {l:t.amtAFN>0?"From":"To",v:t.name},
          {l:"Contact",v:t.phone},
          {l:"Date & Time",v:`${t.date}, ${t.time}`},
          {l:"Status",v:t.status},
          {l:"Transaction ID",v:t.id},
          {l:"Type",v:typeLabel},
        ].map((r,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:i<5?`1px solid ${C.g200}`:"none" }}>
            <span style={{ fontSize:12, color:C.g400 }}>{r.l}</span>
            <span style={{ fontSize:12, fontWeight:r.l==="Transaction ID"?500:600, color:r.l==="Status"?C.deepGreen:C.g800, fontFamily:r.l==="Transaction ID"?"monospace":"inherit" }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div style={{ padding:"16px 20px", display:"flex", gap:10 }}>
        <Btn variant="outline" style={{ padding:"10px" }}>Report Issue</Btn>
        <Btn variant="ghost" style={{ padding:"10px" }}>Share Receipt</Btn>
      </div>
    </div>
  );
};

/* ─── AGENT DETAIL + DIRECTIONS ─── */
const AgentDetailScreen = ({ onBack, data }) => {
  const a = data?.agent || agents[0];
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/><BackHeader title="Agent Details" onBack={onBack}/>
      {/* Map placeholder */}
      <div style={{ height:160, background:`linear-gradient(135deg,${C.navy700},${C.navy})`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.1, backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize:"20px 20px" }}/>
        <div style={{ textAlign:"center", zIndex:1 }}>
          <div style={{ width:48, height:48, borderRadius:14, background:C.deepGreen, margin:"0 auto 8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, boxShadow:`0 4px 16px rgba(0,0,0,0.3)` }}>📍</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{a.lat}°N, {a.lng}°E</div>
        </div>
      </div>
      <div style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:700, color:C.navy }}>{a.name}</div>
            <div style={{ fontSize:13, color:C.g500, marginTop:2 }}>{a.area}</div>
          </div>
          <div style={{ padding:"4px 10px", borderRadius:6, fontSize:11, fontWeight:700, background:a.status==="open"?C.greenLight:C.redLight, color:a.status==="open"?C.deepGreen:C.red, textTransform:"uppercase" }}>{a.status}</div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
          {[{l:"Distance",v:a.dist,ic:"📏"},{l:"Rating",v:`⭐ ${a.rating}`,ic:""},{l:"Today",v:`${a.txnToday} txns`,ic:"📊"}].map(s=>(
            <div key={s.l} style={{ background:C.white, borderRadius:10, padding:"10px 12px", border:`1px solid ${C.g200}`, textAlign:"center" }}>
              <div style={{ fontSize:10, color:C.g400, marginBottom:2 }}>{s.l}</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.g800 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <div style={{ background:C.white, borderRadius:12, padding:14, border:`1px solid ${C.g200}`, marginBottom:12 }}>
          {[{l:"Hours",v:a.hours,ic:"🕐"},{l:"Phone",v:a.phone,ic:"📞"},{l:"Services",v:a.services.join(", "),ic:"✓"}].map((r,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"8px 0", borderBottom:i<2?`1px solid ${C.g100}`:"none" }}>
              <span style={{ fontSize:14, marginTop:1 }}>{r.ic}</span>
              <div><div style={{ fontSize:11, color:C.g400 }}>{r.l}</div><div style={{ fontSize:13, fontWeight:500, color:C.g800 }}>{r.v}</div></div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <Btn onClick={()=>{}} variant="primary" style={{ padding:"12px", flex:1 }}>
            🧭 Get Directions
          </Btn>
          <Btn onClick={()=>{}} variant="outline" style={{ padding:"12px", flex:1 }}>
            📞 Call Agent
          </Btn>
        </div>

        <div style={{ background:C.greenLight, borderRadius:10, padding:"10px 14px", marginTop:12, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:14 }}>💡</span>
          <span style={{ fontSize:11, color:C.deepGreen, lineHeight:1.4 }}>Walk in for cash-in or cash-out. No appointment needed. Bring your phone and PIN.</span>
        </div>
      </div>
    </div>
  );
};

/* ─── HISTORY ─── */
const HistoryScreen = ({ onNav, go }) => {
  const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?transactions:transactions.filter(t=>t.type===filter);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/><div style={{ padding:"12px 20px", background:C.deepGreen, color:C.white }}><div style={{ fontSize:18, fontWeight:700 }}>Transaction History</div></div>
      <div style={{ display:"flex", gap:6, padding:"12px 16px", overflowX:"auto" }}>
        {[{id:"all",l:"All"},{id:"sent",l:"Sent"},{id:"received",l:"Received"},{id:"deposit",l:"Deposits"},{id:"withdraw",l:"Withdrawals"}].map(f=>(
          <div key={f.id} onClick={()=>setFilter(f.id)} style={{ padding:"6px 14px", borderRadius:8, fontSize:11, fontWeight:600, background:filter===f.id?C.deepGreen:C.white, color:filter===f.id?C.white:C.g500, cursor:"pointer", whiteSpace:"nowrap", border:`1px solid ${filter===f.id?C.deepGreen:C.g200}` }}>{f.l}</div>
        ))}
      </div>
      <div style={{ flex:1, padding:"0 16px", overflowY:"auto" }}>
        {["Today","Yesterday","Feb 21","Feb 20","Feb 19"].map(date=>{
          const items=filtered.filter(t=>t.date===date);if(!items.length)return null;
          return (<div key={date}><div style={{ fontSize:11, fontWeight:700, color:C.g400, padding:"12px 0 6px", letterSpacing:0.5 }}>{date}</div><div style={{ background:C.white, borderRadius:12, overflow:"hidden", marginBottom:8 }}>{items.map((t,i)=>(
            <div key={t.id} onClick={()=>go("txnDetail",{txn:t})} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderBottom:i<items.length-1?`1px solid ${C.g100}`:"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:t.amtAFN>0?C.greenLight:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:t.amtAFN>0?C.deepGreen:C.g500 }}>{t.amtAFN>0?"↙":"↗"}</div>
                <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{t.name}</div><div style={{ fontSize:10, color:C.g400, textTransform:"capitalize" }}>{t.type} • {t.time}</div></div>
              </div>
              <div style={{ textAlign:"right" }}><div style={{ fontSize:13, fontWeight:700, color:t.amtAFN>0?C.deepGreen:C.g800 }}>{t.amtAFN>0?"+":""}؋ {Math.abs(t.amtAFN).toLocaleString()}</div><div style={{ fontSize:10, color:C.g400 }}>{t.amtUSD>0?"+":""}$ {Math.abs(t.amtUSD).toFixed(2)}</div></div>
            </div>
          ))}</div></div>);
        })}
      </div>
      <BottomNav active="history" onNav={onNav}/>
    </div>
  );
};

/* ─── QR WITH SET AMOUNT ─── */
const QRScreen = ({ onNav }) => {
  const [showAmount,setShowAmount]=useState(false);const [amt,setAmt]=useState("");const [cur,setCur]=useState("AFN");
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><div style={{ padding:"12px 20px", background:C.deepGreen, color:C.white, textAlign:"center" }}><div style={{ fontSize:18, fontWeight:700 }}>My QR Code</div></div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
        <div style={{ width:200, height:200, borderRadius:20, padding:16, background:C.white, boxShadow:"0 4px 24px rgba(0,0,0,0.08)", border:`2px solid ${C.g200}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", flexDirection:"column" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(11,1fr)", gap:2, width:154, height:154 }}>
            {Array.from({length:121},(_,i)=>{const r=Math.floor(i/11),c=i%11;const corner=(r<3&&c<3)||(r<3&&c>7)||(r>7&&c<3);return <div key={i} style={{ background:corner||Math.random()>0.45?C.navy:C.white, borderRadius:1 }}/>;
            })}
          </div>
          <div style={{ position:"absolute", width:36, height:36, borderRadius:8, background:C.deepGreen, display:"flex", alignItems:"center", justifyContent:"center", color:C.white, fontSize:12, fontWeight:900 }}>AF</div>
        </div>
        {amt&&<div style={{ marginTop:12, padding:"6px 16px", borderRadius:8, background:C.greenLight, fontSize:14, fontWeight:700, color:C.deepGreen }}>{cur==="AFN"?"؋":"$"} {Number(amt).toLocaleString()} requested</div>}
        <div style={{ marginTop:16, textAlign:"center" }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.navy }}>Ahmad Noori</div>
          <div style={{ fontSize:13, color:C.g400, marginTop:2 }}>+93 70 123 4567</div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:16 }}>
          <div style={{ padding:"10px 20px", borderRadius:10, background:C.greenLight, color:C.deepGreen, fontSize:13, fontWeight:600, cursor:"pointer" }}>📤 Share</div>
          <div onClick={()=>setShowAmount(!showAmount)} style={{ padding:"10px 20px", borderRadius:10, background:showAmount?C.deepGreen:C.g100, color:showAmount?C.white:C.g600, fontSize:13, fontWeight:600, cursor:"pointer" }}>💰 {showAmount?"Close":"Set Amount"}</div>
        </div>

        {showAmount&&(
          <div style={{ marginTop:16, width:"100%", background:C.g50, borderRadius:14, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:12 }}>
              {["AFN","USD"].map(c=><div key={c} onClick={()=>setCur(c)} style={{ padding:"5px 16px", borderRadius:6, fontSize:12, fontWeight:700, background:cur===c?C.deepGreen:C.white, color:cur===c?C.white:C.g500, cursor:"pointer" }}>{c==="AFN"?"؋ AFN":"$ USD"}</div>)}
            </div>
            <div style={{ textAlign:"center", marginBottom:12 }}>
              <span style={{ fontSize:32, fontWeight:900, color:amt?C.navy:C.g300 }}>{cur==="AFN"?"؋":"$"} {amt||"0"}</span>
            </div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:8 }}>
              {(cur==="AFN"?[500,1000,5000]:[5,10,50]).map(a=><div key={a} onClick={()=>setAmt(String(a))} style={{ padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:600, background:C.white, color:C.g600, cursor:"pointer", border:`1px solid ${C.g200}` }}>{cur==="AFN"?`؋${a.toLocaleString()}`:`$${a}`}</div>)}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:4 }}>
              {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=><div key={i} onClick={()=>{if(n==="")return;if(n==="⌫")setAmt(a=>a.slice(0,-1));else setAmt(a=>a+n);}} style={{ height:36, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:500, color:C.g800, cursor:n===""?"default":"pointer", background:n===""?"transparent":C.white }}>{n==="⌫"?"⌫":n}</div>)}
            </div>
            {amt&&<div onClick={()=>setShowAmount(false)} style={{ marginTop:8, padding:"10px", borderRadius:8, background:C.deepGreen, color:C.white, textAlign:"center", fontSize:13, fontWeight:700, cursor:"pointer" }}>Apply Amount</div>}
          </div>
        )}
      </div>
      <BottomNav active="qr" onNav={onNav}/>
    </div>
  );
};

/* ─── AGENTS LIST ─── */
const AgentsScreen = ({ onNav, go }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/><div style={{ padding:"12px 20px", background:C.deepGreen, color:C.white }}><div style={{ fontSize:18, fontWeight:700 }}>Nearby Agents</div></div>
    <div style={{ padding:"12px 16px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", background:C.white, borderRadius:10, border:`1px solid ${C.g200}` }}>
        <span style={{ color:C.g400 }}>🔍</span><input placeholder="Search agents or area" style={{ border:"none", outline:"none", flex:1, fontSize:13, background:"transparent", fontFamily:"inherit", color:C.g800 }}/>
      </div>
    </div>
    <div style={{ flex:1, padding:"0 16px", overflowY:"auto" }}>
      {agents.map(a=>(
        <div key={a.id} onClick={()=>go("agentDetail",{agent:a})} style={{ background:C.white, borderRadius:14, padding:"14px 16px", marginBottom:10, border:`1px solid ${C.g200}`, cursor:"pointer" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:a.status==="open"?C.greenLight:C.g100, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{a.status==="open"?"🏪":"🔒"}</div>
              <div><div style={{ fontSize:14, fontWeight:600, color:C.g800 }}>{a.name}</div><div style={{ fontSize:11, color:C.g400 }}>{a.area}</div></div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:6, background:a.status==="open"?C.greenLight:C.redLight, color:a.status==="open"?C.deepGreen:C.red, textTransform:"uppercase" }}>{a.status}</div>
              <div style={{ fontSize:10, color:C.g400, marginTop:4 }}>{a.dist}</div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10, paddingTop:10, borderTop:`1px solid ${C.g100}` }}>
            <span style={{ fontSize:11, color:C.g400 }}>🕐 {a.hours}</span>
            <span style={{ fontSize:11, fontWeight:600, color:C.deepGreen }}>View Details →</span>
          </div>
        </div>
      ))}
    </div>
    <BottomNav active="agents" onNav={onNav}/>
  </div>
);

/* ─── NOTIFICATIONS ─── */
const NotificationsScreen = ({ onBack }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/><BackHeader title="Notifications" onBack={onBack}/>
    <div style={{ flex:1, padding:"8px 16px" }}>
      {notifications.map(n=>(
        <div key={n.id} style={{ background:C.white, borderRadius:12, padding:"12px 14px", marginBottom:8, border:`1px solid ${n.read?C.g200:C.deepGreen+"30"}`, position:"relative" }}>
          {!n.read&&<div style={{ position:"absolute", top:14, right:14, width:8, height:8, borderRadius:"50%", background:C.deepGreen }}/>}
          <div style={{ display:"flex", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:n.type==="received"||n.type==="deposit"?C.greenLight:n.type==="security"?C.goldLight:C.blueLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
              {n.type==="received"?"↙":n.type==="deposit"?"+":n.type==="security"?"🔒":n.type==="sent"?"↗":"🎉"}
            </div>
            <div><div style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{n.title}</div><div style={{ fontSize:12, color:C.g500, marginTop:2 }}>{n.desc}</div><div style={{ fontSize:10, color:C.g400, marginTop:4 }}>{n.time}</div></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── CHANGE PIN ─── */
const ChangePINScreen = ({ onBack }) => {
  const [step,setStep]=useState(0);const [pins,setPins]=useState([]);
  const tap=(n)=>{if(n==="del"){setPins(p=>p.slice(0,-1));return;}if(n===null)return;if(pins.length<4){const np=[...pins,n];setPins(np);if(np.length===4){setTimeout(()=>{if(step<2){setStep(s=>s+1);setPins([]);}else{setStep(3);}},400);}}};
  if(step===3)return <SuccessScreen title="PIN Changed!" subtitle="Your new transaction PIN is now active" onDone={onBack}/>;
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.white }}>
      <StatusBar/><BackHeader title="Change PIN" onBack={onBack}/>
      <div style={{ padding:"40px 24px 0", textAlign:"center" }}>
        <div style={{ fontSize:18, fontWeight:700, color:C.navy, marginBottom:4 }}>{["Enter Current PIN","Enter New PIN","Confirm New PIN"][step]}</div>
        <div style={{ fontSize:13, color:C.g500, marginBottom:32 }}>{["Verify your identity","Choose a new 4-digit PIN","Re-enter your new PIN"][step]}</div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:40 }}>
          {[0,1,2,3].map(i=><div key={i} style={{ width:16, height:16, borderRadius:"50%", background:i<pins.length?C.deepGreen:C.g200, transition:"all 0.15s" }}/>)}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, padding:"0 40px" }}>
        {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((n,i)=><div key={i} onClick={()=>{if(n==="")return;tap(n==="⌫"?"del":String(n));}} style={{ height:52, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", background:n===""?"transparent":C.g50, fontSize:n==="⌫"?18:20, fontWeight:600, color:C.g800, cursor:n===""?"default":"pointer" }}>{n}</div>)}
      </div>
      <div style={{ display:"flex", justifyContent:"center", gap:6, padding:"20px 0" }}>
        {[0,1,2].map(i=><div key={i} style={{ width:i===step?24:8, height:6, borderRadius:3, background:i<=step?C.deepGreen:C.g200, transition:"all 0.3s" }}/>)}
      </div>
    </div>
  );
};

/* ─── HELP / FAQ ─── */
const HelpScreen = ({ onBack }) => {
  const [open,setOpen]=useState(null);
  return (
    <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
      <StatusBar/><BackHeader title="Help & FAQ" onBack={onBack}/>
      <div style={{ padding:"12px 16px" }}>
        <div style={{ background:C.deepGreen, borderRadius:14, padding:"16px 18px", marginBottom:16, color:C.white }}>
          <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>Need help?</div>
          <div style={{ fontSize:12, opacity:0.7, marginBottom:12 }}>Our support team speaks English, دری, and پښتو</div>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ padding:"8px 16px", borderRadius:8, background:"rgba(255,255,255,0.15)", fontSize:12, fontWeight:600, cursor:"pointer" }}>💬 Live Chat</div>
            <div style={{ padding:"8px 16px", borderRadius:8, background:"rgba(255,255,255,0.15)", fontSize:12, fontWeight:600, cursor:"pointer" }}>📞 Call Us</div>
          </div>
        </div>
        <div style={{ fontSize:11, fontWeight:700, color:C.g400, marginBottom:8, letterSpacing:1 }}>FREQUENTLY ASKED</div>
        {faqItems.map((f,i)=>(
          <div key={i} style={{ background:C.white, borderRadius:10, marginBottom:6, border:`1px solid ${C.g200}`, overflow:"hidden" }}>
            <div onClick={()=>setOpen(open===i?null:i)} style={{ padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}>
              <span style={{ fontSize:13, fontWeight:600, color:C.g800 }}>{f.q}</span>
              <span style={{ fontSize:14, color:C.g400, transition:"transform 0.2s", transform:open===i?"rotate(180deg)":"none" }}>▾</span>
            </div>
            {open===i&&<div style={{ padding:"0 14px 12px", fontSize:12, color:C.g500, lineHeight:1.6, borderTop:`1px solid ${C.g100}`, paddingTop:10 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── PROFILE ─── */
const ProfileScreen = ({ onNav, go }) => (
  <div style={{ minHeight:580, display:"flex", flexDirection:"column", background:C.off }}>
    <StatusBar/>
    <div style={{ padding:"20px 20px 16px", background:C.deepGreen, color:C.white, textAlign:"center" }}>
      <div style={{ width:56, height:56, borderRadius:18, margin:"0 auto 10px", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800 }}>AN</div>
      <div style={{ fontSize:18, fontWeight:700 }}>Ahmad Noori</div>
      <div style={{ fontSize:12, opacity:0.6, marginTop:2 }}>+93 70 123 4567</div>
      <div style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:8, background:"rgba(52,211,153,0.2)", padding:"3px 12px", borderRadius:6 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:C.green400 }}/><span style={{ fontSize:11, fontWeight:600, color:C.green400 }}>Verified</span>
      </div>
    </div>
    <div style={{ padding:"12px 16px" }}>
      {[
        {s:"Account",items:[{icon:"🌐",l:"Language",v:"English",sub:"پښتو • دری • English"},{icon:"💱",l:"Default Currency",v:"AFN ؋ / USD $"},{icon:"🔒",l:"Change PIN",v:"",act:()=>go("changePin")},{icon:"📱",l:"Linked Device",v:"Samsung A14"}]},
        {s:"Preferences",items:[{icon:"🔔",l:"Notifications",v:"On"},{icon:"🌙",l:"Dark Mode",v:"Off"}]},
        {s:"Support",items:[{icon:"❓",l:"Help & FAQ",v:"",act:()=>go("help")},{icon:"💬",l:"Contact Support",v:"",act:()=>go("help")},{icon:"ℹ️",l:"About AFSWITCH",v:"v1.0.0"}]},
      ].map(s=>(
        <div key={s.s}>
          <div style={{ fontSize:11, fontWeight:700, color:C.g400, padding:"12px 0 6px", letterSpacing:1 }}>{s.s.toUpperCase()}</div>
          <div style={{ background:C.white, borderRadius:12, overflow:"hidden", marginBottom:8 }}>
            {s.items.map((item,i)=>(
              <div key={i} onClick={item.act} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", borderBottom:i<s.items.length-1?`1px solid ${C.g100}`:"none", cursor:item.act?"pointer":"default" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:16 }}>{item.icon}</span>
                  <div><div style={{ fontSize:13, fontWeight:500, color:C.g800 }}>{item.l}</div>{item.sub&&<div style={{ fontSize:10, color:C.g400 }}>{item.sub}</div>}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>{item.v&&<span style={{ fontSize:12, color:C.g400 }}>{item.v}</span>}<span style={{ color:C.g300, fontSize:14 }}>›</span></div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ margin:"12px 0", padding:"12px", borderRadius:12, background:C.redLight, textAlign:"center", fontSize:14, fontWeight:600, color:C.red, cursor:"pointer" }}>Log Out</div>
    </div>
    <BottomNav active="profile" onNav={onNav}/>
  </div>
);

/* ═══════════ MAIN SHELL ═══════════ */
export default function WalletApp() {
  const [screen, setScreen] = useState("splash");
  const [screenData, setScreenData] = useState(null);
  const [history, setHistory] = useState([]);

  const go = (to, data=null) => { setHistory(h=>[...h,{screen,data:screenData}]); setScreen(to); setScreenData(data); };
  const goBack = () => { if(history.length){const prev=history[history.length-1]; setHistory(h=>h.slice(0,-1)); setScreen(prev.screen); setScreenData(prev.data);} else setScreen("home"); };
  const handleNav = (id) => { setHistory([]); setScreen(id==="home"?"home":id); setScreenData(null); };

  const screenList = [
    {id:"splash",l:"1. Splash"},{id:"onboarding",l:"2. Onboarding"},{id:"signup",l:"3. Sign Up"},{id:"otp",l:"4. OTP Verify"},
    {id:"pin",l:"5. Set PIN"},{id:"home",l:"6. Home"},{id:"send",l:"7. Send Money"},{id:"deposit",l:"8. Deposit"},
    {id:"withdraw",l:"9. Withdraw"},{id:"history",l:"10. History"},{id:"txnDetail",l:"11. Txn Detail"},
    {id:"qr",l:"12. QR / Receive"},{id:"agents",l:"13. Agents List"},{id:"agentDetail",l:"14. Agent Detail"},
    {id:"notifications",l:"15. Notifications"},{id:"changePin",l:"16. Change PIN"},{id:"help",l:"17. Help & FAQ"},{id:"profile",l:"18. Settings"},
  ];

  const descs = {
    splash:"App launch — brand identity animation", onboarding:"Value prop slides + language selector (English, دری, پښتو)", signup:"Phone input with 🇦🇫 +93 prefix",
    otp:"6-digit SMS code verification", pin:"4-digit transaction PIN setup", home:"Balance (AFN↔USD toggle), quick actions, recent transactions — tap any transaction for detail",
    send:"Full 3-step flow: contact → amount (AFN/USD) → PIN confirm → success", deposit:"Select agent → enter amount (AFN/USD) → get deposit code to show agent",
    withdraw:"Select agent → enter amount → PIN confirm → get withdrawal code", history:"Full history with filters — tap any transaction for detail",
    txnDetail:"Complete transaction breakdown with ID, status, amounts in both currencies", qr:"Personal QR code + Set Amount feature with numpad for payment requests",
    agents:"All agents with status, distance, hours — tap for detail", agentDetail:"Agent profile: map, rating, services, directions, call button",
    notifications:"All notifications — transfers, security, promotions", changePin:"3-step: verify current → new PIN → confirm new PIN",
    help:"Live chat/call support (trilingual) + expandable FAQ", profile:"Account settings, language, currency, device, support links",
  };

  return (
    <div style={{ minHeight:"calc(100vh - 56px)", background:`linear-gradient(135deg,#0c1220 0%,${C.navy} 100%)`, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ display:"flex", gap:60, alignItems:"center", maxWidth:900 }}>
        {/* Sidebar */}
        <div style={{ width:210, flexShrink:0, color:C.white }}>
          <div style={{ fontSize:12, fontWeight:600, color:C.gold, letterSpacing:2, marginBottom:8 }}>AFSWITCH WALLET</div>
          <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>
            {screenList.find(s=>s.id===screen)?.l.replace(/^\d+\.\s*/,"") || screen}
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.6, marginBottom:20, minHeight:60 }}>{descs[screen]||""}</div>
          <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,0.2)", marginBottom:8, letterSpacing:1 }}>ALL SCREENS ({screenList.length})</div>
          <div style={{ display:"flex", flexDirection:"column", gap:2, maxHeight:420, overflowY:"auto" }}>
            {screenList.map(s=>(
              <div key={s.id} onClick={()=>{setHistory([]);setScreen(s.id);setScreenData(s.id==="txnDetail"?{txn:transactions[0]}:s.id==="agentDetail"?{agent:agents[0]}:null);}} style={{
                padding:"5px 10px", borderRadius:6, fontSize:11, cursor:"pointer",
                fontWeight:screen===s.id?700:400,
                background:screen===s.id?"rgba(10,104,71,0.3)":"transparent",
                color:screen===s.id?C.green400:"rgba(255,255,255,0.3)",
                transition:"all 0.15s",
              }}>{s.l}</div>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div style={{ width:300, background:"#1a1a2e", borderRadius:36, padding:8, boxShadow:`0 30px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.05),0 0 60px ${C.greenGlow}`, position:"relative" }}>
          <div style={{ width:100, height:6, background:"#2a2a4a", borderRadius:3, position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", zIndex:5 }}/>
          <div style={{ marginTop:14, borderRadius:28, overflow:"hidden", background:C.white, minHeight:580, maxHeight:620, overflowY:"auto", position:"relative" }}>
            {screen==="splash"&&<SplashScreen onNext={()=>go("onboarding")}/>}
            {screen==="onboarding"&&<OnboardingScreen onNext={()=>go("signup")}/>}
            {screen==="signup"&&<SignupScreen onNext={()=>go("otp")}/>}
            {screen==="otp"&&<OTPScreen onNext={()=>go("pin")}/>}
            {screen==="pin"&&<PINSetScreen onNext={()=>go("home")}/>}
            {screen==="home"&&<HomeScreen onNav={handleNav} go={go}/>}
            {screen==="send"&&<SendScreen onBack={goBack} onComplete={()=>{setHistory([]);setScreen("home");}}/>}
            {screen==="deposit"&&<DepositScreen onBack={goBack} go={go}/>}
            {screen==="withdraw"&&<WithdrawScreen onBack={goBack}/>}
            {screen==="history"&&<HistoryScreen onNav={handleNav} go={go}/>}
            {screen==="txnDetail"&&<TxnDetailScreen onBack={goBack} data={screenData}/>}
            {screen==="qr"&&<QRScreen onNav={handleNav}/>}
            {screen==="agents"&&<AgentsScreen onNav={handleNav} go={go}/>}
            {screen==="agentDetail"&&<AgentDetailScreen onBack={goBack} data={screenData}/>}
            {screen==="notifications"&&<NotificationsScreen onBack={goBack}/>}
            {screen==="changePin"&&<ChangePINScreen onBack={goBack}/>}
            {screen==="help"&&<HelpScreen onBack={goBack}/>}
            {screen==="profile"&&<ProfileScreen onNav={handleNav} go={go}/>}
          </div>
          <div style={{ width:100, height:4, background:"rgba(255,255,255,0.15)", borderRadius:2, margin:"8px auto 4px" }}/>
        </div>
      </div>
    </div>
  );
}
