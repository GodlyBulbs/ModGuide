import { useState, useEffect } from "react";
import { supabase } from "./supabase";

// ── OEM COLORS ────────────────────────────────────────────
const OEM_COLORS = {
  "Fiat": {
    "500 Abarth": [
      { name: "Argento (Silver)", hex: "#C0C0C0" },
      { name: "Azzurro (Blue)", hex: "#1E4B8E" },
      { name: "Bianco / Bianco Gelato (White)", hex: "#F5F5F5" },
      { name: "Espresso (Dark Brown)", hex: "#3B2314" },
      { name: "Giallo / Giallo Sole (Yellow)", hex: "#F5C800" },
      { name: "Granito Lucente (Granite Crystal)", hex: "#6B6B6B" },
      { name: "Luce Blu (Light Blue)", hex: "#6BA3D6" },
      { name: "Nero / Nero Puro (Straight Black)", hex: "#111111" },
      { name: "Rame (Copper)", hex: "#B87333" },
      { name: "Rosso / Rosso Brillante (Red)", hex: "#C8102E" },
      { name: "Verde Azzurro (Blue-Green)", hex: "#2E8B78" },
      { name: "Verde Chiaro (Light Green)", hex: "#7EC850" },
      { name: "Verde Oliva (Olive Green)", hex: "#6B7C3A" },
      { name: "Grigio Campovolo (Grey) — Abarth Exclusive", hex: "#8A8D8F" },
      { name: "Grigio Nuvolari (Metallic Grey) — Abarth Exclusive", hex: "#5A5F63" },
    ],
    "500X": [
      { name: "Bianco (White)", hex: "#F5F5F5" },
      { name: "Nero (Black)", hex: "#111111" },
      { name: "Rosso (Red)", hex: "#C8102E" },
      { name: "Grigio (Grey)", hex: "#8A8D8F" },
      { name: "Azzurro (Blue)", hex: "#1E4B8E" },
    ],
  },
  "Mazda": {
    "Mazda3": [
      { name: "Soul Red Crystal Metallic (Red)", hex: "#9B1B30" },
      { name: "Machine Gray Metallic (Gray)", hex: "#6B6E6F" },
      { name: "Polymetal Gray Metallic (Dark Gray)", hex: "#4A4E52" },
      { name: "Snowflake White Pearl Mica (White)", hex: "#F0F0F0" },
      { name: "Deep Crystal Blue Mica (Blue)", hex: "#1B3A6B" },
      { name: "Jet Black Mica (Black)", hex: "#1A1A1A" },
    ],
    "MX-5 Miata": [
      { name: "Soul Red Crystal Metallic (Red)", hex: "#9B1B30" },
      { name: "Jet Black Mica (Black)", hex: "#1A1A1A" },
      { name: "Snowflake White Pearl Mica (White)", hex: "#F0F0F0" },
      { name: "Machine Gray Metallic (Gray)", hex: "#6B6E6F" },
      { name: "Deep Crystal Blue Mica (Blue)", hex: "#1B3A6B" },
      { name: "Ceramic Metallic (Silver)", hex: "#C8C8C8" },
    ],
  },
  "Subaru": {
    "WRX": [
      { name: "WR Blue Pearl (Blue)", hex: "#003893" },
      { name: "Crystal Black Silica (Black)", hex: "#1A1A1A" },
      { name: "Ice Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Crystal White Pearl (White)", hex: "#F5F5F5" },
      { name: "Magnetite Gray Metallic (Gray)", hex: "#5A5F63" },
    ],
    "BRZ": [
      { name: "World Rally Blue Pearl (Blue)", hex: "#003893" },
      { name: "Crystal Black Silica (Black)", hex: "#1A1A1A" },
      { name: "Ice Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Crystal White Pearl (White)", hex: "#F5F5F5" },
      { name: "Magnetite Gray Metallic (Gray)", hex: "#5A5F63" },
    ],
    "Forester XT": [
      { name: "Crystal Black Silica (Black)", hex: "#1A1A1A" },
      { name: "Ice Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Crystal White Pearl (White)", hex: "#F5F5F5" },
      { name: "Wilderness Green Metallic (Green)", hex: "#3B5A3A" },
    ],
  },
  "Volkswagen": {
    "Golf GTI": [
      { name: "Deep Black Pearl (Black)", hex: "#1A1A1A" },
      { name: "Pure White (White)", hex: "#F5F5F5" },
      { name: "Tornado Red (Red)", hex: "#C8102E" },
      { name: "Reflex Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Lapiz Blue Metallic (Blue)", hex: "#1E4B8E" },
    ],
    "Golf R": [
      { name: "Deep Black Pearl (Black)", hex: "#1A1A1A" },
      { name: "Pure White (White)", hex: "#F5F5F5" },
      { name: "Lapiz Blue Metallic (Blue)", hex: "#1E4B8E" },
      { name: "Reflex Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Ravenna Green Metallic (Green)", hex: "#2E5A3A" },
    ],
    "Jetta GLI": [
      { name: "Deep Black Pearl (Black)", hex: "#1A1A1A" },
      { name: "Pure White (White)", hex: "#F5F5F5" },
      { name: "Tornado Red (Red)", hex: "#C8102E" },
      { name: "Platinum Gray Metallic (Gray)", hex: "#8A8D8F" },
    ],
  },
  "Ford": {
    "Fiesta ST": [
      { name: "Molten Orange (Orange)", hex: "#E8601C" },
      { name: "Oxford White (White)", hex: "#F5F5F5" },
      { name: "Performance Blue (Blue)", hex: "#1E4B8E" },
      { name: "Shadow Black (Black)", hex: "#1A1A1A" },
      { name: "Race Red (Red)", hex: "#C8102E" },
    ],
    "Mustang GT": [
      { name: "Race Red (Red)", hex: "#C8102E" },
      { name: "Shadow Black (Black)", hex: "#1A1A1A" },
      { name: "Oxford White (White)", hex: "#F5F5F5" },
      { name: "Grabber Blue (Blue)", hex: "#1E4B8E" },
      { name: "Iconic Silver (Silver)", hex: "#C0C0C0" },
      { name: "Grabber Yellow (Yellow)", hex: "#F5C800" },
    ],
  },
  "Honda": {
    "Civic Si": [
      { name: "Rallye Red (Red)", hex: "#C8102E" },
      { name: "Sonic Gray Pearl (Gray)", hex: "#8A8D8F" },
      { name: "Aegean Blue Metallic (Blue)", hex: "#1E4B8E" },
      { name: "Platinum White Pearl (White)", hex: "#F5F5F5" },
      { name: "Crystal Black Pearl (Black)", hex: "#1A1A1A" },
    ],
    "Civic Type R": [
      { name: "Championship White (White)", hex: "#F5F5F5" },
      { name: "Rallye Red (Red)", hex: "#C8102E" },
      { name: "Sonic Gray Pearl (Gray)", hex: "#8A8D8F" },
      { name: "Crystal Black Pearl (Black)", hex: "#1A1A1A" },
      { name: "Boost Blue Pearl (Blue)", hex: "#1E4B8E" },
    ],
    "Accord Sport": [
      { name: "Platinum White Pearl (White)", hex: "#F5F5F5" },
      { name: "Crystal Black Pearl (Black)", hex: "#1A1A1A" },
      { name: "Sonic Gray Pearl (Gray)", hex: "#8A8D8F" },
      { name: "Radiant Red Metallic (Red)", hex: "#C8102E" },
    ],
  },
  "BMW": {
    "M3": [
      { name: "Alpine White (White)", hex: "#F5F5F5" },
      { name: "Black Sapphire Metallic (Black)", hex: "#1A1A1A" },
      { name: "Portimao Blue Metallic (Blue)", hex: "#1E4B8E" },
      { name: "Isle of Man Green Metallic (Green)", hex: "#2E5A3A" },
      { name: "Sao Paulo Yellow (Yellow)", hex: "#F5C800" },
    ],
    "M235i / M240i": [
      { name: "Alpine White (White)", hex: "#F5F5F5" },
      { name: "Black Sapphire Metallic (Black)", hex: "#1A1A1A" },
      { name: "Estoril Blue Metallic (Blue)", hex: "#1E4B8E" },
      { name: "Melbourne Red Metallic (Red)", hex: "#C8102E" },
      { name: "Mineral Grey Metallic (Gray)", hex: "#8A8D8F" },
    ],
    "328i / 330i": [
      { name: "Alpine White (White)", hex: "#F5F5F5" },
      { name: "Black Sapphire Metallic (Black)", hex: "#1A1A1A" },
      { name: "Mineral Silver Metallic (Silver)", hex: "#C0C0C0" },
      { name: "Estoril Blue Metallic (Blue)", hex: "#1E4B8E" },
      { name: "Melbourne Red Metallic (Red)", hex: "#C8102E" },
    ],
  },
};

// ── PARTS CATALOG ─────────────────────────────────────────
const CATALOG = {
  "Fiat": {
    "500 Abarth": [
      { brand: "EuroCompulsion", category: "Intake — V4.1 Full System", part: "V4.1 Full Intake System", note: "Complete intake system replacement. Full system from turbo to airbox." },
      { brand: "EuroCompulsion", category: "Intake — V3 Pipe Upgrade", part: "V3 Turbo-to-Filter Pipe", note: "Replaces the pipe from turbo to stock filter with a larger diameter hose. Keeps your stock air filter." },
      { brand: "EuroCompulsion", category: "Intake — V2.1 Air Injection", part: "V2.1 Direct Air Injection", note: "Removes stock filter entirely. Hot air intake that runs up the motor and draws air from the engine bay." },
      { brand: "EuroCompulsion", category: "Front Mount Intercooler", part: "FMIC Kit", note: "Relocates from side-mount (stock) to front of condenser. Full repiping required — not a direct swap." },
      { brand: "EuroCompulsion", category: "Wastegate Actuator", part: "Upgraded Wastegate Actuator" },
      { brand: "EuroCompulsion", category: "Downpipe / Hi-Flow Cat", part: "Catted Downpipe" },
      { brand: "EuroCompulsion", category: "Performance Tune", part: "ECU Flash / Stage Tune" },
      { brand: "EuroCompulsion", category: "Oil Catch Can", part: "Oil Catch Can Kit" },
      { brand: "Forge Motorsports", category: "Front Mount Intercooler", part: "FMIC Kit", note: "Relocates from side-mount (stock) to front of condenser. Full repiping required — not a direct swap." },
      { brand: "Forge Motorsports", category: "Blow-Off / Diverter Valve", part: "Blow-Off Valve (BOV)" },
      { brand: "Forge Motorsports", category: "Wastegate Actuator", part: "Upgraded Wastegate Actuator" },
      { brand: "Bosch", category: "Fuel Injectors", part: "Upgraded Fuel Injectors" },
      { brand: "Ignition Projects", category: "Ignition Coils", part: "Upgraded Ignition Coils", note: "Replaces coil packs — separate from spark plugs." },
      { brand: "NGK", category: "Spark Plugs", part: "Iridium IX Spark Plugs", note: "Stage 1 gap: 0.028\". Stage 2 with bigger injectors: 0.024\"." },
      { brand: "NGK", category: "Spark Plugs", part: "Laser Iridium Spark Plugs", note: "OEM-style replacement. Stage 1 gap: 0.028\". Stage 2: 0.024\"." },
      { brand: "Ragazzon", category: "Full Turbo-Back Exhaust", part: "Full Turbo-Back System", note: "Runs from turbo all the way to exit. If you have an EC downpipe already, check compatibility before buying." },
      { brand: "Ragazzon", category: "Mid Pipe", part: "Mid Pipe Section" },
      { brand: "Ragazzon", category: "Axleback Exhaust", part: "Axleback System" },
      { brand: "Magnaflow", category: "Downpipe / Hi-Flow Cat", part: "Catted Downpipe" },
      { brand: "Neuspeed", category: "Intake — P-Flo", part: "P-Flo Intake Kit", note: "Direct air injection style, similar to EC V2.1. Removes stock filter setup." },
      { brand: "Neuspeed", category: "Axleback Exhaust", part: "Axleback Exhaust", note: "Listed for 500 series — verify Abarth fitment before purchasing." },
      { brand: "Neuspeed", category: "Mid Pipe", part: "Performance Mid Pipe", note: "Listed for 500 series — verify Abarth fitment before purchasing." },
      { brand: "Neuspeed", category: "Suspension / Lowering Springs", part: "Lowering Springs" },
      { brand: "Neuspeed", category: "Sway Bars", part: "Front Sway Bar" },
      { brand: "Neuspeed", category: "Brake Lines", part: "Stainless Steel Brake Lines" },
      { brand: "EBC Brakes", category: "Brake Pads", part: "Yellowstuff Performance Pads", note: "Street/track compound. Great bite from cold." },
      { brand: "EBC Brakes", category: "Brake Pads", part: "Redstuff Performance Pads", note: "Low-dust street compound. Smooth and quiet for daily use." },
      { brand: "EBC Brakes", category: "Brake Rotors", part: "Slotted Rotors" },
      { brand: "EBC Brakes", category: "Brake Rotors", part: "Standard Rotors" },
      { brand: "Wilwood", category: "Brake Pads", part: "Front Brake Pads" },
      { brand: "Wilwood", category: "Brake Pads", part: "Rear Brake Pads" },
      { brand: "Wilwood", category: "Front Rotors", part: "Black Front Rotor — Plain" },
      { brand: "Wilwood", category: "Front Rotors", part: "Black Front Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Front Rotors", part: "Red Front Rotor — Plain" },
      { brand: "Wilwood", category: "Front Rotors", part: "Red Front Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Black Rear Rotor — Plain" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Black Rear Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Red Rear Rotor — Plain" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Red Rear Rotor — Slotted/Drilled", note: "Budget ~$1,500 per axle. Verify wheel clearance — typically needs 17\"+ wheels." },
      { brand: "Cravenspeed", category: "Short Shifter", part: "Short Throw Shifter" },
      { brand: "Cravenspeed", category: "Antenna", part: "Stubby Antenna" },
      { brand: "Mishimoto", category: "Intercooler Hoses", part: "Silicone Intercooler Hose Kit", note: "Works with stock side-mount intercooler. Not applicable if you've gone FMIC." },
      { brand: "Mishimoto", category: "Oil Catch Can", part: "Oil Catch Can Kit" },
    ],
  },
};

const BRAND_COLORS = {
  "EuroCompulsion":"#E8401C","Forge Motorsports":"#4A8FE8","Ragazzon":"#2E8B57",
  "Magnaflow":"#9B59B6","Neuspeed":"#E8B01C","Bosch":"#E81C4A",
  "Ignition Projects":"#1CE8D4","NGK":"#E86B1C","EBC Brakes":"#E8E040",
  "Wilwood":"#1CE84A","Cravenspeed":"#E81CB0","Mishimoto":"#1C9AE8",
};

const MAKES = {
  "Fiat":{"500 Abarth":["2012","2013","2014","2015","2016","2017","2018","2019"],"500X":["2016","2017","2018","2019","2020","2021","2022"]},
  "Subaru":{"WRX":["2015","2016","2017","2018","2019","2020","2021","2022","2023"],"BRZ":["2013","2014","2015","2016","2017","2021","2022","2023"],"Forester XT":["2014","2015","2016","2017","2018"]},
  "Volkswagen":{"Golf GTI":["2015","2016","2017","2018","2019","2020","2021","2022","2023"],"Golf R":["2015","2016","2017","2018","2019","2022","2023"],"Jetta GLI":["2019","2020","2021","2022","2023"]},
  "Ford":{"Fiesta ST":["2014","2015","2016","2017","2018","2019"],"Mustang GT":["2015","2016","2017","2018","2019","2020","2021","2022","2023"]},
  "Honda":{"Civic Si":["2017","2018","2019","2020","2021","2022","2023"],"Civic Type R":["2017","2018","2019","2020","2021","2022","2023"],"Accord Sport":["2018","2019","2020","2021","2022","2023"]},
  "Mazda":{"MX-5 Miata":["2016","2017","2018","2019","2020","2021","2022","2023"],"Mazda3":["2019","2020","2021","2022","2023"]},
  "BMW":{"M3":["2015","2016","2017","2018","2019","2021","2022","2023"],"M235i / M240i":["2014","2015","2016","2017","2018","2019","2021","2022"],"328i / 330i":["2012","2013","2014","2015","2016","2017","2018","2019"]},
};

// ── Helpers ───────────────────────────────────────────────
const roundToTen = (n) => Math.round(n / 10) * 10;
const isLight = (hex) => {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r*299+g*587+b*114)/1000 > 160;
};

// ── Shared Styles ─────────────────────────────────────────
const LS = { color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px",display:"block" };
const SS = { background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",cursor:"pointer",appearance:"none",WebkitAppearance:"none" };
const IS = { background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",boxSizing:"border-box" };
const BP = (on) => ({ background:on?"#FF6B2B":"#1C1C1C",color:on?"#0D0D0D":"#444",border:"none",padding:"16px 40px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"3px",cursor:on?"pointer":"not-allowed",borderRadius:"4px",width:"100%",transition:"all 0.2s" });

function Section({ title, content, delay }) {
  return (
    <div style={{animation:"fadeSlide 0.4s ease forwards",animationDelay:`${delay}s`,opacity:0,borderLeft:"3px solid #FF6B2B",paddingLeft:"20px",marginBottom:"32px"}}>
      <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"3px",marginBottom:"8px"}}>{title}</div>
      <div style={{color:"#C8C4BC",lineHeight:"1.8",fontSize:"15px",whiteSpace:"pre-wrap"}}>{content}</div>
    </div>
  );
}

function ModChip({ label, selected, onClick }) {
  return (
    <div onClick={onClick} style={{padding:"8px 14px",borderRadius:"4px",border:selected?"1px solid #FF6B2B":"1px solid #2A2A2A",background:selected?"rgba(255,107,43,0.12)":"#1C1C1C",color:selected?"#FF6B2B":"#666",fontSize:"13px",cursor:"pointer",userSelect:"none",transition:"all 0.15s",display:"flex",alignItems:"center",gap:"6px"}}>
      {selected&&<span style={{fontSize:"10px"}}>✓</span>}{label}
    </div>
  );
}

function BrandDot({ brand, size=8 }) {
  return <span style={{display:"inline-block",width:`${size}px`,height:`${size}px`,borderRadius:"50%",background:BRAND_COLORS[brand]||"#666",marginRight:"6px",flexShrink:0}}/>;
}

// ── Status color ──────────────────────────────────────────
function statusColor(item, mileage) {
  if (!item.lastMiles && !item.lastDate) return "unset";
  const milesDue = (item.lastMiles||0) + item.mileInterval;
  const diff = milesDue - mileage;
  if (diff <= 0) return "red";
  if (diff <= 500) return "yellow";
  return "green";
}

const STATUS_COLORS = { green:"#1CE84A", yellow:"#F5C800", red:"#FF3B3B", unset:"#444" };

// ── Maintenance Setup ─────────────────────────────────────
async function generateMaintenanceItems(year, make, model) {
  const prompt = `You are an automotive expert. Generate a maintenance schedule for a ${year} ${make} ${model}.
Return ONLY a JSON array, no markdown:
[
  { "name": "Engine Oil & Filter", "mileInterval": 5000, "monthInterval": 6, "notes": "Use 5W-40 full synthetic" },
  ...
]
Include: Engine Oil & Filter, Tire Rotation, Air Filter, Cabin Air Filter, Spark Plugs, Brake Fluid, Coolant, Transmission Fluid, Power Steering Fluid (if applicable), Differential Fluid (if applicable), Brake Pads Check, Battery Check, Timing Belt/Chain (if applicable).
Be specific to this exact car — correct oil spec, correct intervals, correct fluid types. Return ONLY the JSON array.`;

  const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
  const data = await res.json();
  const raw = data.content.map(b=>b.text||"").join("");
  return JSON.parse(raw.replace(/```json|```/g,"").trim());
}

// ── Car Card ──────────────────────────────────────────────
function CarCard({ car, onSelect, onDelete, hasAlerts }) {
  const colorHex = car.colorHex || "#1C1C1C";
  const textColor = isLight(colorHex) ? "#111" : "#fff";
  const maintenanceSetup = car.maintenance && car.maintenance.length > 0;

  return (
    <div style={{background:`linear-gradient(135deg, ${colorHex}CC, ${colorHex}66)`,border:`1px solid ${colorHex}`,borderRadius:"8px",padding:"20px 24px",cursor:"pointer",transition:"transform 0.2s, box-shadow 0.2s",position:"relative",boxShadow:`0 4px 20px ${colorHex}44`}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 30px ${colorHex}66`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 4px 20px ${colorHex}44`;}}
      onClick={()=>onSelect(car)}
    >
      <button onClick={e=>{e.stopPropagation();onDelete(car.id);}} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.3)",border:"none",color:textColor,cursor:"pointer",fontSize:"16px",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7}}>×</button>

      {!maintenanceSetup && (
        <div style={{position:"absolute",top:"12px",right:"44px",color:"#FF3B3B",fontSize:"18px"}} title="Maintenance not set up">❗</div>
      )}
      {maintenanceSetup && hasAlerts && (
        <div style={{position:"absolute",top:"12px",right:"44px",color:"#F5C800",fontSize:"16px"}} title="Service needed">⚠️</div>
      )}

      <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"24px",color:textColor,marginBottom:"2px",textShadow:"0 1px 3px rgba(0,0,0,0.3)"}}>{car.year} {car.make} {car.model}</div>
      <div style={{color:textColor,fontSize:"13px",opacity:0.8,marginBottom:"12px"}}>{car.colorName || "Color not set"} · {(car.mileage||0).toLocaleString()} mi</div>

      {car.build && car.build.length > 0 && (
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"8px"}}>
          {car.build.slice(0,4).map((item,i)=>(
            <span key={i} style={{background:"rgba(0,0,0,0.3)",color:textColor,fontSize:"10px",padding:"2px 6px",borderRadius:"3px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px"}}>{item.part}</span>
          ))}
          {car.build.length > 4 && <span style={{background:"rgba(0,0,0,0.3)",color:textColor,fontSize:"10px",padding:"2px 6px",borderRadius:"3px"}}>+{car.build.length-4} more</span>}
        </div>
      )}

      <div style={{color:textColor,fontSize:"11px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px",opacity:0.7,marginTop:"8px"}}>TAP TO OPEN →</div>
    </div>
  );
}

// ── Auth Screen ───────────────────────────────────────────
function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true); setError("");
    try {
      const { error } = mode==="login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
    } catch { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"Inter, sans-serif",display:"flex",flexDirection:"column"}}>
      <div style={{borderBottom:"1px solid #1C1C1C",padding:"18px 24px",display:"flex",alignItems:"center",gap:"10px"}}>
        <div style={{width:"8px",height:"8px",background:"#FF6B2B",borderRadius:"50%"}}/>
        <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"4px"}}>MODGUIDE</span>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
        <div style={{width:"100%",maxWidth:"400px"}}>
          <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(36px,7vw,56px)",lineHeight:"1",color:"#E8E4DC",marginBottom:"8px"}}>{mode==="login"?"WELCOME BACK":"JOIN MODGUIDE"}</div>
          <p style={{color:"#555",fontSize:"14px",marginBottom:"36px"}}>{mode==="login"?"Log in to access your garage.":"Create an account to save your garage."}</p>
          <div style={{marginBottom:"16px"}}><span style={LS}>EMAIL</span><input style={IS} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com"/></div>
          <div style={{marginBottom:"24px"}}><span style={LS}>PASSWORD</span><input style={IS} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handle()}/></div>
          {error&&<div style={{color:"#FF6B2B",fontSize:"13px",marginBottom:"16px"}}>{error}</div>}
          <button onClick={handle} disabled={!email||!password||loading} style={BP(email&&password&&!loading)}>{loading?"...":mode==="login"?"LOG IN":"SIGN UP"}</button>
          <div style={{textAlign:"center",marginTop:"20px"}}>
            <span style={{color:"#444",fontSize:"13px"}}>{mode==="login"?"Don't have an account? ":"Already have an account? "}
              <span onClick={()=>{setMode(mode==="login"?"signup":"login");setError("");}} style={{color:"#FF6B2B",cursor:"pointer"}}>{mode==="login"?"Sign up":"Log in"}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────
export default function ModGuide() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState("garage");
  const [garage, setGarage] = useState([]);
  const [activeCar, setActiveCar] = useState(null);
  const [activeTab, setActiveTab] = useState("maintenance");
  const [fMake, setFMake] = useState("");
  const [fModel, setFModel] = useState("");
  const [fYear, setFYear] = useState("");
  const [fColor, setFColor] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const [selectedMod, setSelectedMod] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null);
  const [genError, setGenError] = useState("");
  const [showBell, setShowBell] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [editMileage, setEditMileage] = useState(false);
  const [tempMileage, setTempMileage] = useState("");
  const [doneItem, setDoneItem] = useState(null);
  const [doneMileageInput, setDoneMileageInput] = useState("");

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setSession(session);setAuthLoading(false);});
    return ()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if (!session) return;
    const load = async()=>{
      const {data,error}=await supabase.from("garages").select("*").eq("user_id",session.user.id);
      if (!error&&data) setGarage(data.map(row=>({...row.car_data,id:row.id})));
    };
    load();
  },[session]);

  const allAlerts = garage.filter(car=>{
    if (!car.maintenance||car.maintenance.length===0) return true;
    return car.maintenance.some(item=>statusColor(item,car.mileage||0)==="red"||statusColor(item,car.mileage||0)==="yellow");
  });

  const saveGarageItem = async(car)=>{
    const {data,error}=await supabase.from("garages").insert([{user_id:session.user.id,car_data:car}]).select();
    if (!error&&data) return data[0].id;
    return null;
  };
  const updateGarageItem = async(car)=>{ await supabase.from("garages").update({car_data:car}).eq("id",car.id); };
  const deleteGarageItem = async(id)=>{ await supabase.from("garages").delete().eq("id",id); setGarage(prev=>prev.filter(c=>c.id!==id)); };

  const fModels = fMake?Object.keys(MAKES[fMake]):[];
  const fYears = fModel&&fMake?MAKES[fMake][fModel]||[]:[];
  const fColors = fMake&&fModel?OEM_COLORS[fMake]?.[fModel]||[]:[];

  const saveCar = async()=>{
    if (!fMake||!fModel||!fYear||!fColor) return;
    const car={make:fMake,model:fModel,year:fYear,colorName:fColor.name,colorHex:fColor.hex,mileage:0,build:[],maintenance:[]};
    const id=await saveGarageItem(car);
    if (id){setGarage(prev=>[...prev,{...car,id}]);setFMake("");setFModel("");setFYear("");setFColor(null);setView("garage");}
  };

  const openCar=(car)=>{setActiveCar(car);setActiveBrand(null);setSections(null);setSelectedMod("");setActiveTab("maintenance");setView("car-detail");};

  const syncCar=async(updated)=>{setGarage(prev=>prev.map(c=>c.id===updated.id?updated:c));setActiveCar(updated);await updateGarageItem(updated);};

  const toggleBuildItem=(item)=>{
    const exists=activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);
    syncCar({...activeCar,build:exists?activeCar.build.filter(b=>!(b.brand===item.brand&&b.part===item.part)):[...activeCar.build,item]});
  };

  const setupMaintenance=async()=>{
    setMaintenanceLoading(true);
    try {
      const items=await generateMaintenanceItems(activeCar.year,activeCar.make,activeCar.model);
      const enriched=items.map(item=>({...item,lastMiles:null,lastDate:null}));
      syncCar({...activeCar,maintenance:enriched});
    } catch(e){console.error(e);}
    finally{setMaintenanceLoading(false);}
  };

  const markDone=(item)=>{ setDoneItem(item); setDoneMileageInput(String(activeCar.mileage||0)); };

  const confirmDone=()=>{
    const miles=roundToTen(parseInt(doneMileageInput)||0);
    const updated=activeCar.maintenance.map(i=>i.name===doneItem.name?{...i,lastMiles:miles,lastDate:new Date().toISOString()}:i);
    syncCar({...activeCar,maintenance:updated,mileage:miles});
    setDoneItem(null);
  };

  const updateMileage=()=>{
    const miles=roundToTen(parseInt(tempMileage)||0);
    syncCar({...activeCar,mileage:miles});
    setEditMileage(false);
  };

  const getCatalog=(car)=>CATALOG[car.make]?.[car.model]||[];
  const getBrands=(car)=>[...new Set(getCatalog(car).map(i=>i.brand))];
  const getCategoriesForBrand=()=>{
    if (!activeCar||!activeBrand) return {};
    const cats={};
    getCatalog(activeCar).filter(i=>i.brand===activeBrand).forEach(i=>{if(!cats[i.category])cats[i.category]=[];cats[i.category].push(i);});
    return cats;
  };
  const guideCategories=activeCar?[...new Set(getCatalog(activeCar).map(i=>i.category))]:[];

  const generate=async()=>{
    if (!activeCar||!selectedMod) return;
    setLoading(true);setSections(null);setGenError("");
    const buildContext=activeCar.build&&activeCar.build.length>0?`Car already has: ${activeCar.build.map(b=>`${b.brand} ${b.part}`).join(", ")}. Factor these in.`:"";
    const prompt=`You are a real-world automotive mod expert. User has a ${activeCar.year} ${activeCar.make} ${activeCar.model}. Guide for: ${selectedMod}. ${buildContext}
Return ONLY this JSON, no markdown:
{"overview":"2-3 sentence honest summary.","tools":"Exact tools, one per line with a dash.","location":"Where on this specific car.","install":"Numbered steps with real details.","gotchas":"What nobody tells you — most important section.","diagnostic":"What to check if something seems off after install.","verdict":"Honest take. Worth it?"}`;
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const raw=data.content.map(b=>b.text||"").join("");
      setSections(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setView("guide");
    } catch{setGenError("Something went wrong. Try again.");}
    finally{setLoading(false);}
  };

  const SECTION_MAP=[
    {key:"overview",title:"OVERVIEW"},{key:"tools",title:"TOOLS & PARTS"},
    {key:"location",title:"WHERE TO FIND IT ON YOUR CAR"},{key:"install",title:"INSTALL WALKTHROUGH"},
    {key:"gotchas",title:"WHAT NOBODY TELLS YOU"},{key:"diagnostic",title:"POST-INSTALL DIAGNOSTIC"},
    {key:"verdict",title:"VERDICT"},
  ];

  const Tab=({id,label})=>(
    <button onClick={()=>setActiveTab(id)} style={{background:"none",border:"none",borderBottom:activeTab===id?"2px solid #FF6B2B":"2px solid transparent",color:activeTab===id?"#FF6B2B":"#555",fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"2px",padding:"10px 14px",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}>{label}</button>
  );

  const SW=({label,val,set,opts,placeholder,disabled})=>(
    <div><span style={LS}>{label}</span>
      <div style={{position:"relative"}}>
        <select style={{...SS,opacity:disabled?0.4:1}} value={val} onChange={e=>set(e.target.value)} disabled={disabled}>
          <option value="">{placeholder}</option>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
        <div style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#FF6B2B",pointerEvents:"none",fontSize:"10px"}}>▼</div>
      </div>
    </div>
  );

  if (authLoading) return <div style={{minHeight:"100vh",background:"#0D0D0D",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"4px"}}>LOADING...</div></div>;
  if (!session) return <AuthScreen/>;

  const carColor = activeCar?.colorHex || "#1C1C1C";

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"Inter, sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes loadBar{0%{transform:translateX(-100%)}100%{transform:translateX(350%)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        select option{background:#1C1C1C}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D0D0D}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
        select:focus,input:focus{outline:1px solid #FF6B2B}
      `}</style>

      {/* Header */}
      <div style={{borderBottom:"1px solid #1C1C1C",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#0D0D0D",zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>setView("garage")}>
          <div style={{width:"8px",height:"8px",background:"#FF6B2B",borderRadius:"50%"}}/>
          <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"4px"}}>MODGUIDE</span>
        </div>
        <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
          {/* Bell */}
          <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setShowBell(!showBell)}>
            <span style={{fontSize:"18px"}}>🔔</span>
            {allAlerts.length>0&&<div style={{position:"absolute",top:"-2px",right:"-2px",width:"8px",height:"8px",background:"#FF3B3B",borderRadius:"50%"}}/>}
            {showBell&&(
              <div style={{position:"absolute",top:"30px",right:0,background:"#1C1C1C",border:"1px solid #2A2A2A",borderRadius:"6px",padding:"12px",minWidth:"240px",zIndex:200}}>
                {allAlerts.length===0?(
                  <div style={{color:"#555",fontSize:"13px"}}>All good — nothing due</div>
                ):allAlerts.map(car=>(
                  <div key={car.id} style={{marginBottom:"8px"}}>
                    <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"12px",letterSpacing:"2px"}}>{car.year} {car.make} {car.model}</div>
                    {!car.maintenance||car.maintenance.length===0?(
                      <div style={{color:"#FF3B3B",fontSize:"12px"}}>❗ Maintenance not set up</div>
                    ):car.maintenance.filter(i=>statusColor(i,car.mileage||0)!=="green"&&statusColor(i,car.mileage||0)!=="unset").map(i=>(
                      <div key={i.name} style={{color:STATUS_COLORS[statusColor(i,car.mileage||0)],fontSize:"12px"}}>• {i.name}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          {view!=="garage"&&<button onClick={()=>{view==="guide"?setView("car-detail"):setView("garage");}} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px"}}>{view==="guide"?"← Back":"← Garage"}</button>}
          <button onClick={()=>supabase.auth.signOut()} style={{background:"none",border:"1px solid #2A2A2A",color:"#555",padding:"6px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px"}}>LOG OUT</button>
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 24px"}}>

        {/* ══ GARAGE ══ */}
        {view==="garage"&&(
          <div style={{paddingTop:"48px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(36px,7vw,60px)",lineHeight:"1",color:"#E8E4DC",marginBottom:"8px"}}>MY GARAGE</div>
            <p style={{color:"#555",fontSize:"15px",marginBottom:"36px"}}>Your cars. Your build. Your guide.</p>
            {garage.length===0?(
              <div style={{border:"1px dashed #2A2A2A",borderRadius:"6px",padding:"48px",textAlign:"center"}}>
                <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"3px",marginBottom:"8px"}}>GARAGE IS EMPTY</div>
                <div style={{color:"#444",fontSize:"14px",marginBottom:"24px"}}>Add your first car to get started</div>
                <button onClick={()=>setView("add-car")} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>+ ADD A CAR</button>
              </div>
            ):(
              <div>
                <div style={{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"}}>
                  {garage.map(car=>(
                    <CarCard key={car.id} car={car} onSelect={openCar} onDelete={deleteGarageItem}
                      hasAlerts={car.maintenance&&car.maintenance.some(i=>statusColor(i,car.mileage||0)==="red"||statusColor(i,car.mileage||0)==="yellow")}
                    />
                  ))}
                </div>
                <button onClick={()=>setView("add-car")} style={{background:"transparent",color:"#FF6B2B",border:"1px solid #FF6B2B",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px",width:"100%"}}>+ ADD ANOTHER CAR</button>
              </div>
            )}
          </div>
        )}

        {/* ══ ADD CAR ══ */}
        {view==="add-car"&&(
          <div style={{paddingTop:"48px",paddingBottom:"80px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(32px,6vw,52px)",color:"#E8E4DC",marginBottom:"8px"}}>ADD A CAR</div>
            <p style={{color:"#555",fontSize:"14px",marginBottom:"36px"}}>Pick your car and choose your color.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"16px",marginBottom:"32px"}}>
              <SW label="MAKE" val={fMake} set={v=>{setFMake(v);setFModel("");setFYear("");setFColor(null);}} opts={Object.keys(MAKES)} placeholder="Select make" disabled={false}/>
              <SW label="MODEL" val={fModel} set={v=>{setFModel(v);setFYear("");setFColor(null);}} opts={fModels} placeholder="Select model" disabled={!fMake}/>
              <SW label="YEAR" val={fYear} set={v=>{setFYear(v);setFColor(null);}} opts={fYears} placeholder="Select year" disabled={!fModel}/>
            </div>

            {fYear&&fColors.length>0&&(
              <div style={{marginBottom:"32px",animation:"fadeSlide 0.3s ease forwards"}}>
                <span style={LS}>SELECT YOUR COLOR</span>
                <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                  {fColors.map(color=>(
                    <div key={color.name} onClick={()=>setFColor(color)} style={{display:"flex",alignItems:"center",gap:"8px",padding:"10px 14px",borderRadius:"4px",border:fColor?.name===color.name?"1px solid #FF6B2B":"1px solid #2A2A2A",background:fColor?.name===color.name?"rgba(255,107,43,0.1)":"#1C1C1C",cursor:"pointer",transition:"all 0.15s"}}>
                      <div style={{width:"20px",height:"20px",borderRadius:"50%",background:color.hex,border:"1px solid rgba(255,255,255,0.2)",flexShrink:0}}/>
                      <span style={{color:fColor?.name===color.name?"#FF6B2B":"#C8C4BC",fontSize:"13px"}}>{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fColor&&(
              <div style={{marginBottom:"32px",padding:"16px",background:`linear-gradient(135deg, ${fColor.hex}44, ${fColor.hex}22)`,borderRadius:"6px",border:`1px solid ${fColor.hex}66`,animation:"fadeSlide 0.3s ease forwards"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <div style={{width:"32px",height:"32px",borderRadius:"50%",background:fColor.hex,border:"2px solid rgba(255,255,255,0.3)"}}/>
                  <div>
                    <div style={{color:"#E8E4DC",fontSize:"14px"}}>{fYear} {fMake} {fModel}</div>
                    <div style={{color:"#888",fontSize:"12px"}}>{fColor.name}</div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={saveCar} disabled={!fMake||!fModel||!fYear||!fColor} style={BP(fMake&&fModel&&fYear&&fColor)}>SAVE TO GARAGE</button>
          </div>
        )}

        {/* ══ CAR DETAIL ══ */}
        {view==="car-detail"&&activeCar&&(
          <div style={{paddingTop:"32px",paddingBottom:"80px"}}>
            {/* Car header with color */}
            <div style={{background:`linear-gradient(135deg, ${carColor}44, ${carColor}11)`,borderRadius:"8px",padding:"20px 24px",marginBottom:"24px",border:`1px solid ${carColor}33`}}>
              <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(24px,5vw,40px)",color:"#E8E4DC",lineHeight:"1",marginBottom:"4px"}}>{activeCar.year} {activeCar.make} {activeCar.model}</div>
              <div style={{color:"#888",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"12px",height:"12px",borderRadius:"50%",background:carColor,border:"1px solid rgba(255,255,255,0.2)"}}/>
                {activeCar.colorName}
                <span style={{color:"#555"}}>·</span>
                {editMileage?(
                  <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <input style={{...IS,width:"100px",padding:"4px 8px",fontSize:"13px"}} type="number" value={tempMileage} onChange={e=>setTempMileage(e.target.value)} autoFocus/>
                    <button onClick={updateMileage} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"4px 10px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px"}}>SAVE</button>
                    <button onClick={()=>setEditMileage(false)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:"13px"}}>✕</button>
                  </div>
                ):(
                  <span style={{cursor:"pointer",color:"#C8C4BC"}} onClick={()=>{setEditMileage(true);setTempMileage(String(activeCar.mileage||0));}}>
                    {(activeCar.mileage||0).toLocaleString()} mi <span style={{color:"#FF6B2B",fontSize:"11px"}}>✏</span>
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div style={{borderBottom:"1px solid #1C1C1C",marginBottom:"32px",display:"flex",overflowX:"auto"}}>
              <Tab id="maintenance" label="MAINTENANCE"/>
              <Tab id="guides" label="GUIDES"/>
              <Tab id="mods" label="MODS"/>
              <Tab id="build" label="MY BUILD"/>
            </div>

            {/* ── MAINTENANCE TAB ── */}
            {activeTab==="maintenance"&&(
              <div>
                {!activeCar.maintenance||activeCar.maintenance.length===0?(
                  <div style={{textAlign:"center",padding:"48px 24px"}}>
                    <div style={{fontSize:"48px",marginBottom:"16px"}}>❗</div>
                    <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"22px",color:"#E8E4DC",letterSpacing:"3px",marginBottom:"8px"}}>SET UP MAINTENANCE TRACKER</div>
                    <div style={{color:"#555",fontSize:"14px",marginBottom:"32px",maxWidth:"360px",margin:"0 auto 32px"}}>
                      We'll generate a maintenance schedule specific to your {activeCar.year} {activeCar.make} {activeCar.model} — correct intervals, correct fluids, correct specs.
                    </div>
                    {maintenanceLoading?(
                      <div>
                        <div style={{height:"2px",background:"#1C1C1C",borderRadius:"2px",overflow:"hidden",marginBottom:"12px"}}>
                          <div style={{height:"100%",background:"#FF6B2B",animation:"loadBar 2s ease infinite",width:"40%"}}/>
                        </div>
                        <div style={{color:"#444",fontSize:"13px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>GENERATING YOUR MAINTENANCE SCHEDULE...</div>
                      </div>
                    ):(
                      <button onClick={setupMaintenance} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>
                        GENERATE SCHEDULE
                      </button>
                    )}
                  </div>
                ):(
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
                      <span style={LS}>SERVICE TRACKER</span>
                      <div style={{display:"flex",gap:"12px",fontSize:"12px"}}>
                        <span style={{color:"#1CE84A"}}>● Good</span>
                        <span style={{color:"#F5C800"}}>● Soon</span>
                        <span style={{color:"#FF3B3B"}}>● Overdue</span>
                      </div>
                    </div>

                    {activeCar.maintenance.map((item,i)=>{
                      const sc=statusColor(item,activeCar.mileage||0);
                      const milesDue=(item.lastMiles||0)+item.mileInterval;
                      return(
                        <div key={i} style={{background:"#1C1C1C",border:`1px solid ${sc==="unset"?"#2A2A2A":STATUS_COLORS[sc]+"44"}`,borderRadius:"6px",padding:"16px",marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:STATUS_COLORS[sc],flexShrink:0}}/>
                              <span style={{color:"#E8E4DC",fontSize:"14px",fontWeight:"500"}}>{item.name}</span>
                            </div>
                            <div style={{color:"#555",fontSize:"12px",paddingLeft:"16px"}}>
                              Every {item.mileInterval.toLocaleString()} mi
                              {item.lastMiles?` · Last: ${item.lastMiles.toLocaleString()} mi · Next: ${milesDue.toLocaleString()} mi`:" · Not logged yet"}
                            </div>
                            {item.notes&&<div style={{color:"#666",fontSize:"11px",paddingLeft:"16px",marginTop:"2px"}}>{item.notes}</div>}
                          </div>
                          <button onClick={()=>markDone(item)} style={{background:"rgba(28,232,74,0.1)",border:"1px solid rgba(28,232,74,0.3)",color:"#1CE84A",padding:"6px 14px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",whiteSpace:"nowrap",flexShrink:0}}>✓ DONE</button>
                        </div>
                      );
                    })}

                    <button onClick={()=>syncCar({...activeCar,maintenance:[]})} style={{background:"transparent",border:"1px solid #2A2A2A",color:"#444",padding:"10px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",width:"100%",marginTop:"16px"}}>
                      RESET & REGENERATE SCHEDULE
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── GUIDES TAB ── */}
            {activeTab==="guides"&&(
              <div>
                {activeCar.build&&activeCar.build.length>0&&(
                  <div style={{marginBottom:"24px",padding:"14px 18px",background:"#1C1C1C",borderRadius:"4px",borderLeft:"3px solid #FF6B2B"}}>
                    <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px"}}>YOUR BUILD WILL BE FACTORED IN</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                      {activeCar.build.map((item,i)=>(
                        <span key={i} style={{background:"rgba(255,107,43,0.08)",border:"1px solid rgba(255,107,43,0.2)",color:"#C8C4BC",fontSize:"11px",padding:"3px 8px",borderRadius:"3px",display:"flex",alignItems:"center"}}>
                          <BrandDot brand={item.brand} size={6}/>{item.brand} {item.part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <span style={LS}>WHAT DO YOU WANT A GUIDE FOR?</span>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px"}}>
                  {guideCategories.map(cat=><ModChip key={cat} label={cat} selected={selectedMod===cat} onClick={()=>setSelectedMod(selectedMod===cat?"":cat)}/>)}
                </div>
                {genError&&<div style={{color:"#FF6B2B",marginBottom:"12px",fontSize:"14px"}}>{genError}</div>}
                {loading&&(
                  <div style={{marginBottom:"24px"}}>
                    <div style={{height:"2px",background:"#1C1C1C",borderRadius:"2px",overflow:"hidden"}}>
                      <div style={{height:"100%",background:"#FF6B2B",animation:"loadBar 2s ease infinite",width:"40%"}}/>
                    </div>
                    <div style={{color:"#444",fontSize:"13px",marginTop:"10px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>PULLING FROM THE COLLECTIVE KNOWLEDGE...</div>
                  </div>
                )}
                <button onClick={generate} disabled={!selectedMod||loading} style={BP(selectedMod&&!loading)}>{loading?"GENERATING...":"GENERATE GUIDE"}</button>
              </div>
            )}

            {/* ── MODS TAB ── */}
            {activeTab==="mods"&&(
              <div>
                {!activeBrand?(
                  <div>
                    <span style={LS}>SELECT A BRAND</span>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                      {getBrands(activeCar).map(brand=>(
                        <button key={brand} onClick={()=>setActiveBrand(brand)} style={{background:"#1C1C1C",border:`1px solid ${BRAND_COLORS[brand]||"#333"}`,color:"#E8E4DC",padding:"12px 20px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"2px",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.background=`${BRAND_COLORS[brand]}22`;}}
                          onMouseLeave={e=>{e.currentTarget.style.background="#1C1C1C";}}
                        >
                          <BrandDot brand={brand}/>{brand}
                        </button>
                      ))}
                    </div>
                  </div>
                ):(
                  <div>
                    <button onClick={()=>setActiveBrand(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px",marginBottom:"20px",padding:0}}>← All Brands</button>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px"}}>
                      <BrandDot brand={activeBrand} size={10}/>
                      <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"28px",color:"#E8E4DC",letterSpacing:"2px"}}>{activeBrand}</span>
                    </div>
                    {Object.entries(getCategoriesForBrand()).map(([cat,items])=>(
                      <div key={cat} style={{marginBottom:"28px"}}>
                        <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"10px"}}>{cat}</div>
                        {items.map((item,i)=>{
                          const owned=activeCar.build&&activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);
                          return(
                            <div key={i} style={{background:owned?"rgba(255,107,43,0.07)":"#1C1C1C",border:owned?"1px solid rgba(255,107,43,0.4)":"1px solid #2A2A2A",borderRadius:"4px",padding:"14px 16px",marginBottom:"8px"}}>
                              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"12px"}}>
                                <div style={{flex:1}}>
                                  <div style={{color:"#E8E4DC",fontSize:"14px",marginBottom:item.note?"6px":"0"}}>{item.part}</div>
                                  {item.note&&<div style={{color:"#666",fontSize:"12px",lineHeight:"1.5"}}>⚠ {item.note}</div>}
                                </div>
                                <button onClick={()=>toggleBuildItem(item)} style={{background:owned?"rgba(255,107,43,0.15)":"#2A2A2A",border:owned?"1px solid #FF6B2B":"1px solid #333",color:owned?"#FF6B2B":"#555",padding:"6px 14px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",whiteSpace:"nowrap",flexShrink:0}}>
                                  {owned?"✓ ADDED":"+ ADD"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── MY BUILD TAB ── */}
            {activeTab==="build"&&(
              <div>
                {!activeCar.build||activeCar.build.length===0?(
                  <div style={{textAlign:"center",padding:"48px 0"}}>
                    <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",marginBottom:"8px"}}>BUILD SHEET IS EMPTY</div>
                    <div style={{color:"#444",fontSize:"14px",marginBottom:"20px"}}>Go to Mods and start adding parts</div>
                    <button onClick={()=>setActiveTab("mods")} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"12px 28px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>BROWSE MODS</button>
                  </div>
                ):(
                  <div>
                    <span style={LS}>YOUR BUILD — {activeCar.year} {activeCar.make} {activeCar.model}</span>
                    {(()=>{
                      const byBrand={};
                      activeCar.build.forEach(item=>{if(!byBrand[item.brand])byBrand[item.brand]=[];byBrand[item.brand].push(item);});
                      return Object.entries(byBrand).map(([brand,items])=>(
                        <div key={brand} style={{marginBottom:"24px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
                            <BrandDot brand={brand} size={10}/>
                            <span style={{color:"#E8E4DC",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"2px"}}>{brand}</span>
                          </div>
                          {items.map((item,i)=>(
                            <div key={i} style={{background:"#1C1C1C",border:"1px solid rgba(255,107,43,0.2)",borderRadius:"4px",padding:"12px 16px",marginBottom:"6px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                              <div>
                                <div style={{color:"#C8C4BC",fontSize:"14px"}}>{item.part}</div>
                                <div style={{color:"#555",fontSize:"11px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>{item.category}</div>
                              </div>
                              <button onClick={()=>toggleBuildItem(item)} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:"18px"}}>×</button>
                            </div>
                          ))}
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══ GUIDE OUTPUT ══ */}
        {view==="guide"&&sections&&activeCar&&(
          <div style={{paddingTop:"48px",paddingBottom:"80px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"3px",color:"#444",marginBottom:"6px"}}>GUIDE FOR</div>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(24px,5vw,40px)",color:"#E8E4DC",lineHeight:"1.1",marginBottom:"40px"}}>
              {activeCar.year} {activeCar.make} {activeCar.model}<br/>
              <span style={{color:"#FF6B2B"}}>— {selectedMod}</span>
            </div>
            {SECTION_MAP.map(({key,title},i)=>sections[key]&&<Section key={key} title={title} content={sections[key]} delay={i*0.15}/>)}
            <div style={{marginTop:"48px",padding:"20px",background:"#1C1C1C",borderRadius:"4px",fontSize:"13px",color:"#555",lineHeight:"1.6"}}>
              AI-generated from community knowledge. Always verify torque specs with your factory service manual. Mod at your own risk — you already knew that.
            </div>
            <button onClick={()=>setView("car-detail")} style={{marginTop:"24px",background:"transparent",color:"#FF6B2B",border:"1px solid #FF6B2B",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px",width:"100%"}}>
              ← BACK TO {activeCar.year} {activeCar.make} {activeCar.model}
            </button>
          </div>
        )}
      </div>

      {/* ── Done Modal ── */}
      {doneItem&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:"24px"}}>
          <div style={{background:"#1C1C1C",border:"1px solid #2A2A2A",borderRadius:"8px",padding:"28px",maxWidth:"360px",width:"100%"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"3px",marginBottom:"4px"}}>MARK AS DONE</div>
            <div style={{color:"#555",fontSize:"13px",marginBottom:"20px"}}>{doneItem.name}</div>
            <span style={LS}>CURRENT MILEAGE</span>
            <input style={{...IS,marginBottom:"8px"}} type="number" value={doneMileageInput} onChange={e=>setDoneMileageInput(e.target.value)} placeholder="Enter mileage"/>
            <div style={{color:"#555",fontSize:"12px",marginBottom:"20px"}}>Will be rounded to nearest 10 — saved as {roundToTen(parseInt(doneMileageInput)||0).toLocaleString()} mi</div>
            <div style={{display:"flex",gap:"10px"}}>
              <button onClick={confirmDone} style={{flex:1,background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"12px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"2px",cursor:"pointer",borderRadius:"4px"}}>CONFIRM</button>
              <button onClick={()=>setDoneItem(null)} style={{flex:1,background:"transparent",color:"#555",border:"1px solid #2A2A2A",padding:"12px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"2px",cursor:"pointer",borderRadius:"4px"}}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}