import { useState } from "react";

const CATALOG = {
  "Fiat": {
    "500 Abarth": [
      // EuroCompulsion
      { brand: "EuroCompulsion", category: "Intake — V4.1 Full System", part: "V4.1 Full Intake System", note: "Complete intake system replacement. Full system from turbo to airbox." },
      { brand: "EuroCompulsion", category: "Intake — V3 Pipe Upgrade", part: "V3 Turbo-to-Filter Pipe", note: "Replaces the pipe from turbo to stock filter with a larger diameter hose. Keeps your stock air filter." },
      { brand: "EuroCompulsion", category: "Intake — V2.1 Air Injection", part: "V2.1 Direct Air Injection", note: "Removes stock filter entirely. Hot air intake that runs up the motor and draws air from the engine bay." },
      { brand: "EuroCompulsion", category: "Front Mount Intercooler", part: "FMIC Kit", note: "Relocates from side-mount (stock) to front of condenser. Full repiping required — not a direct swap." },
      { brand: "EuroCompulsion", category: "Wastegate Actuator", part: "Upgraded Wastegate Actuator" },
      { brand: "EuroCompulsion", category: "Downpipe / Hi-Flow Cat", part: "Catted Downpipe" },
      { brand: "EuroCompulsion", category: "Performance Tune", part: "ECU Flash / Stage Tune" },
      { brand: "EuroCompulsion", category: "Oil Catch Can", part: "Oil Catch Can Kit" },

      // Forge Motorsports
      { brand: "Forge Motorsports", category: "Front Mount Intercooler", part: "FMIC Kit", note: "Relocates from side-mount (stock) to front of condenser. Full repiping required — not a direct swap." },
      { brand: "Forge Motorsports", category: "Blow-Off / Diverter Valve", part: "Blow-Off Valve (BOV)" },
      { brand: "Forge Motorsports", category: "Wastegate Actuator", part: "Upgraded Wastegate Actuator" },

      // Bosch
      { brand: "Bosch", category: "Fuel Injectors", part: "Upgraded Fuel Injectors" },

      // Ignition Projects
      { brand: "Ignition Projects", category: "Ignition Coils", part: "Upgraded Ignition Coils", note: "Replaces coil packs — separate from spark plugs." },

      // NGK
      { brand: "NGK", category: "Spark Plugs", part: "Iridium IX Spark Plugs", note: "Stage 1 gap: 0.028\". Stage 2 with bigger injectors: 0.024\"." },
      { brand: "NGK", category: "Spark Plugs", part: "Laser Iridium Spark Plugs", note: "OEM-style replacement. Stage 1 gap: 0.028\". Stage 2: 0.024\"." },

      // Ragazzon
      { brand: "Ragazzon", category: "Full Turbo-Back Exhaust", part: "Full Turbo-Back System", note: "Runs from turbo all the way to exit. If you have an EC downpipe already, check compatibility before buying." },
      { brand: "Ragazzon", category: "Mid Pipe", part: "Mid Pipe Section" },
      { brand: "Ragazzon", category: "Axleback Exhaust", part: "Axleback System" },

      // Magnaflow
      { brand: "Magnaflow", category: "Downpipe / Hi-Flow Cat", part: "Catted Downpipe" },

      // Neuspeed
      { brand: "Neuspeed", category: "Intake — P-Flo", part: "P-Flo Intake Kit", note: "Direct air injection style, similar to EC V2.1. Removes stock filter setup." },
      { brand: "Neuspeed", category: "Axleback Exhaust", part: "Axleback Exhaust", note: "Listed for 500 series — verify Abarth fitment before purchasing." },
      { brand: "Neuspeed", category: "Mid Pipe", part: "Performance Mid Pipe", note: "Listed for 500 series — verify Abarth fitment before purchasing." },
      { brand: "Neuspeed", category: "Suspension / Lowering Springs", part: "Lowering Springs" },
      { brand: "Neuspeed", category: "Sway Bars", part: "Front Sway Bar" },
      { brand: "Neuspeed", category: "Brake Lines", part: "Stainless Steel Brake Lines" },

      // EBC Brakes
      { brand: "EBC Brakes", category: "Brake Pads", part: "Yellowstuff Performance Pads", note: "Street/track compound. Great bite from cold. Good for spirited driving." },
      { brand: "EBC Brakes", category: "Brake Pads", part: "Redstuff Performance Pads", note: "Low-dust street compound. Smooth and quiet for daily use." },
      { brand: "EBC Brakes", category: "Brake Rotors", part: "Slotted Rotors", note: "Slots help clear gas and debris from pad surface. Good for performance driving." },
      { brand: "EBC Brakes", category: "Brake Rotors", part: "Standard Rotors", note: "Direct OEM replacement with EBC quality. Good upgrade from worn stock rotors." },

      // Wilwood
      { brand: "Wilwood", category: "Brake Pads", part: "Front Brake Pads" },
      { brand: "Wilwood", category: "Brake Pads", part: "Rear Brake Pads" },
      { brand: "Wilwood", category: "Front Rotors", part: "Black Front Rotor — Plain" },
      { brand: "Wilwood", category: "Front Rotors", part: "Black Front Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Front Rotors", part: "Red Front Rotor — Plain" },
      { brand: "Wilwood", category: "Front Rotors", part: "Red Front Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Black Rear Rotor — Plain" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Black Rear Rotor — Slotted/Drilled" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Red Rear Rotor — Plain" },
      { brand: "Wilwood", category: "Rear Rotors", part: "Red Rear Rotor — Slotted/Drilled", note: "Budget ~$1,500 per axle for full Wilwood setup. Verify wheel clearance — typically needs 17\"+ wheels." },

      // Cravenspeed
      { brand: "Cravenspeed", category: "Short Shifter", part: "Short Throw Shifter" },
      { brand: "Cravenspeed", category: "Antenna", part: "Stubby Antenna" },

      // Mishimoto
      { brand: "Mishimoto", category: "Intercooler Hoses", part: "Silicone Intercooler Hose Kit", note: "Works with stock side-mount intercooler setup. Not applicable if you've already gone FMIC." },
      { brand: "Mishimoto", category: "Oil Catch Can", part: "Oil Catch Can Kit" },
    ],
  },
};

const BRAND_COLORS = {
  "EuroCompulsion": "#E8401C",
  "Forge Motorsports": "#4A8FE8",
  "Ragazzon": "#2E8B57",
  "Magnaflow": "#9B59B6",
  "Neuspeed": "#E8B01C",
  "Bosch": "#E81C4A",
  "Ignition Projects": "#1CE8D4",
  "NGK": "#E86B1C",
  "EBC Brakes": "#E8E040",
  "Wilwood": "#1CE84A",
  "Cravenspeed": "#E81CB0",
  "Mishimoto": "#1C9AE8",
};

const MAKES = {
  "Fiat": {
    "500 Abarth": ["2012","2013","2014","2015","2016","2017","2018","2019"],
    "500X": ["2016","2017","2018","2019","2020","2021","2022"],
  },
  "Subaru": {
    "WRX": ["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
    "BRZ": ["2013","2014","2015","2016","2017","2021","2022","2023"],
  },
  "Volkswagen": {
    "Golf GTI": ["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
    "Golf R": ["2015","2016","2017","2018","2019","2022","2023"],
  },
  "Ford": {
    "Fiesta ST": ["2014","2015","2016","2017","2018","2019"],
    "Mustang GT": ["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
  },
  "Honda": {
    "Civic Si": ["2017","2018","2019","2020","2021","2022","2023"],
    "Civic Type R": ["2017","2018","2019","2020","2021","2022","2023"],
  },
  "Mazda": {
    "MX-5 Miata": ["2016","2017","2018","2019","2020","2021","2022","2023"],
    "Mazda3": ["2019","2020","2021","2022","2023"],
  },
};

const labelStyle = { color:"#FF6B2B", fontFamily:"'Bebas Neue', sans-serif", fontSize:"11px", letterSpacing:"3px", marginBottom:"8px", display:"block" };
const selectStyle = { background:"#1C1C1C", border:"1px solid #333", color:"#E8E4DC", padding:"12px 16px", borderRadius:"4px", fontSize:"15px", width:"100%", fontFamily:"Inter, sans-serif", cursor:"pointer", appearance:"none", WebkitAppearance:"none" };
const btnPrimary = (on) => ({ background: on?"#FF6B2B":"#1C1C1C", color: on?"#0D0D0D":"#444", border:"none", padding:"16px 40px", fontFamily:"'Bebas Neue', sans-serif", fontSize:"18px", letterSpacing:"3px", cursor: on?"pointer":"not-allowed", borderRadius:"4px", width:"100%", transition:"all 0.2s" });

function Section({ title, content, delay }) {
  return (
    <div style={{ animation:"fadeSlide 0.4s ease forwards", animationDelay:`${delay}s`, opacity:0, borderLeft:"3px solid #FF6B2B", paddingLeft:"20px", marginBottom:"32px" }}>
      <div style={{ color:"#FF6B2B", fontFamily:"'Bebas Neue', sans-serif", fontSize:"13px", letterSpacing:"3px", marginBottom:"8px" }}>{title}</div>
      <div style={{ color:"#C8C4BC", lineHeight:"1.8", fontSize:"15px", whiteSpace:"pre-wrap" }}>{content}</div>
    </div>
  );
}

function ModChip({ label, selected, onClick }) {
  return (
    <div onClick={onClick} style={{ padding:"8px 14px", borderRadius:"4px", border: selected?"1px solid #FF6B2B":"1px solid #2A2A2A", background: selected?"rgba(255,107,43,0.12)":"#1C1C1C", color: selected?"#FF6B2B":"#666", fontSize:"13px", cursor:"pointer", userSelect:"none", transition:"all 0.15s", display:"flex", alignItems:"center", gap:"6px" }}>
      {selected && <span style={{ fontSize:"10px" }}>✓</span>}{label}
    </div>
  );
}

function BrandDot({ brand, size=8 }) {
  return <span style={{ display:"inline-block", width:`${size}px`, height:`${size}px`, borderRadius:"50%", background: BRAND_COLORS[brand]||"#666", marginRight:"6px", flexShrink:0 }} />;
}

function CarCard({ car, onSelect, onDelete }) {
  const brands = [...new Set(car.build.map(b=>b.brand))];
  return (
    <div style={{ background:"#1C1C1C", border:"1px solid #2A2A2A", borderRadius:"6px", padding:"20px 24px", cursor:"pointer", transition:"border-color 0.2s", position:"relative" }}
      onMouseEnter={e=>e.currentTarget.style.borderColor="#FF6B2B"}
      onMouseLeave={e=>e.currentTarget.style.borderColor="#2A2A2A"}
      onClick={()=>onSelect(car)}
    >
      <button onClick={e=>{e.stopPropagation();onDelete(car.id);}} style={{ position:"absolute", top:"12px", right:"12px", background:"none", border:"none", color:"#444", cursor:"pointer", fontSize:"18px" }}>×</button>
      <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:"22px", color:"#E8E4DC", marginBottom:"4px" }}>{car.year} {car.make} {car.model}</div>
      {car.build.length > 0 ? (
        <div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"12px" }}>
            {car.build.map((item,i) => (
              <span key={i} style={{ background:"rgba(255,107,43,0.08)", border:"1px solid rgba(255,107,43,0.2)", color:"#C8C4BC", fontSize:"11px", padding:"3px 8px", borderRadius:"3px", fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"1px", display:"flex", alignItems:"center" }}>
                <BrandDot brand={item.brand} size={6} />{item.part}
              </span>
            ))}
          </div>
          <div style={{ display:"flex", gap:"10px", marginTop:"10px", flexWrap:"wrap" }}>
            {brands.map(b=>(
              <span key={b} style={{ display:"flex", alignItems:"center", fontSize:"11px", color:"#555" }}>
                <BrandDot brand={b} />{b}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ color:"#444", fontSize:"13px", marginTop:"8px" }}>Stock — no mods logged yet</div>
      )}
      <div style={{ marginTop:"14px", color:"#FF6B2B", fontSize:"12px", fontFamily:"'Bebas Neue', sans-serif", letterSpacing:"2px" }}>TAP TO OPEN →</div>
    </div>
  );
}

export default function ModGuide() {
  const [view, setView] = useState("garage");
  const [garage, setGarage] = useState([]);
  const [activeCar, setActiveCar] = useState(null);
  const [activeTab, setActiveTab] = useState("brands");
  const [fMake, setFMake] = useState("");
  const [fModel, setFModel] = useState("");
  const [fYear, setFYear] = useState("");
  const [activeBrand, setActiveBrand] = useState(null);
  const [selectedMod, setSelectedMod] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState(null);
  const [error, setError] = useState("");

  const fModels = fMake ? Object.keys(MAKES[fMake]) : [];
  const fYears = fModel && fMake ? MAKES[fMake][fModel] || [] : [];

  const saveCar = () => {
    if (!fMake||!fModel||!fYear) return;
    setGarage(prev=>[...prev,{id:Date.now(),make:fMake,model:fModel,year:fYear,build:[]}]);
    setFMake(""); setFModel(""); setFYear("");
    setView("garage");
  };

  const openCar = (car) => {
    setActiveCar(car); setActiveBrand(null); setSections(null); setSelectedMod(""); setActiveTab("brands"); setView("car-detail");
  };

  const syncCar = (updated) => {
    setGarage(prev=>prev.map(c=>c.id===updated.id?updated:c));
    setActiveCar(updated);
  };

  const toggleBuildItem = (item) => {
    const exists = activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);
    syncCar({ ...activeCar, build: exists ? activeCar.build.filter(b=>!(b.brand===item.brand&&b.part===item.part)) : [...activeCar.build,item] });
  };

  const getCatalog = (car) => CATALOG[car.make]?.[car.model] || [];
  const getBrands = (car) => [...new Set(getCatalog(car).map(i=>i.brand))];

  const getCategoriesForBrand = () => {
    if (!activeCar||!activeBrand) return {};
    const cats = {};
    getCatalog(activeCar).filter(i=>i.brand===activeBrand).forEach(i=>{ if(!cats[i.category]) cats[i.category]=[]; cats[i.category].push(i); });
    return cats;
  };

  const guideCategories = activeCar ? [...new Set(getCatalog(activeCar).map(i=>i.category))] : [];

  const generate = async () => {
    if (!activeCar||!selectedMod) return;
    setLoading(true); setSections(null); setError("");
    const buildContext = activeCar.build.length>0
      ? `Car already has: ${activeCar.build.map(b=>`${b.brand} ${b.part}`).join(", ")}. Factor these in — compatibility, diagnostics, what works together.`
      : "";
    const prompt = `You are a real-world automotive mod expert. User has a ${activeCar.year} ${activeCar.make} ${activeCar.model}. Guide for: ${selectedMod}. ${buildContext}

Return ONLY this JSON, no markdown:
{
  "overview": "2-3 sentence honest summary. What it does, realistic expectations, interaction with existing mods.",
  "tools": "Exact tools, one per line with a dash. Socket sizes, torque specs where critical.",
  "location": "Where on this specific car. What needs to come off to reach it.",
  "install": "Numbered steps. Real details — bolt sizes, harness clips, torque values.",
  "gotchas": "What nobody tells you. Fitment surprises, scary-but-normal sounds, fixes that actually work. Most important section.",
  "diagnostic": "If something seems off after install — what to check first, second, third.",
  "verdict": "Honest take. Worth it? Pairs well with? Anything to watch for?"
}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const raw = data.content.map(b=>b.text||"").join("");
      setSections(JSON.parse(raw.replace(/```json|```/g,"").trim()));
      setView("guide");
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  };

  const SECTION_MAP = [
    {key:"overview",title:"OVERVIEW"},{key:"tools",title:"TOOLS & PARTS"},
    {key:"location",title:"WHERE TO FIND IT ON YOUR CAR"},{key:"install",title:"INSTALL WALKTHROUGH"},
    {key:"gotchas",title:"WHAT NOBODY TELLS YOU"},{key:"diagnostic",title:"POST-INSTALL DIAGNOSTIC"},
    {key:"verdict",title:"VERDICT"},
  ];

  const Tab = ({id,label}) => (
    <button onClick={()=>setActiveTab(id)} style={{ background:"none", border:"none", borderBottom:activeTab===id?"2px solid #FF6B2B":"2px solid transparent", color:activeTab===id?"#FF6B2B":"#555", fontFamily:"'Bebas Neue', sans-serif", fontSize:"14px", letterSpacing:"3px", padding:"12px 20px", cursor:"pointer", transition:"all 0.15s" }}>{label}</button>
  );

  const SelectWrapper = ({label, val, set, opts, placeholder, disabled}) => (
    <div>
      <span style={labelStyle}>{label}</span>
      <div style={{position:"relative"}}>
        <select style={{...selectStyle, opacity:disabled?0.4:1}} value={val} onChange={e=>set(e.target.value)} disabled={disabled}>
          <option value="">{placeholder}</option>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
        <div style={{position:"absolute",right:"12px",top:"50%",transform:"translateY(-50%)",color:"#FF6B2B",pointerEvents:"none",fontSize:"10px"}}>▼</div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"Inter, sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');
        @keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes loadBar{0%{transform:translateX(-100%)}100%{transform:translateX(350%)}}
        select option{background:#1C1C1C}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D0D0D}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
        select:focus{outline:1px solid #FF6B2B}
      `}</style>

      {/* Header */}
      <div style={{borderBottom:"1px solid #1C1C1C",padding:"18px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>setView("garage")}>
          <div style={{width:"8px",height:"8px",background:"#FF6B2B",borderRadius:"50%"}}/>
          <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"4px"}}>MODGUIDE</span>
        </div>
        <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
          {view==="car-detail"&&activeCar&&<span style={{color:"#444",fontSize:"13px"}}>{activeCar.year} {activeCar.make} {activeCar.model}</span>}
          {view!=="garage"&&<button onClick={()=>{view==="guide"?setView("car-detail"):setView("garage");}} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px"}}>{view==="guide"?"← Back":"← Garage"}</button>}
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 24px"}}>

        {/* GARAGE */}
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
                  {garage.map(car=><CarCard key={car.id} car={car} onSelect={openCar} onDelete={id=>setGarage(prev=>prev.filter(c=>c.id!==id))}/>)}
                </div>
                <button onClick={()=>setView("add-car")} style={{background:"transparent",color:"#FF6B2B",border:"1px solid #FF6B2B",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px",width:"100%"}}>+ ADD ANOTHER CAR</button>
              </div>
            )}
          </div>
        )}

        {/* ADD CAR */}
        {view==="add-car"&&(
          <div style={{paddingTop:"48px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(32px,6vw,52px)",color:"#E8E4DC",marginBottom:"8px"}}>ADD A CAR</div>
            <p style={{color:"#555",fontSize:"14px",marginBottom:"36px"}}>Pick your make, model, and year — then start building.</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"16px",marginBottom:"36px"}}>
              <SelectWrapper label="MAKE" val={fMake} set={v=>{setFMake(v);setFModel("");setFYear("");}} opts={Object.keys(MAKES)} placeholder="Select make" disabled={false}/>
              <SelectWrapper label="MODEL" val={fModel} set={v=>{setFModel(v);setFYear("");}} opts={fModels} placeholder="Select model" disabled={!fMake}/>
              <SelectWrapper label="YEAR" val={fYear} set={setFYear} opts={fYears} placeholder="Select year" disabled={!fModel}/>
            </div>
            <button onClick={saveCar} disabled={!fMake||!fModel||!fYear} style={btnPrimary(fMake&&fModel&&fYear)}>SAVE TO GARAGE</button>
          </div>
        )}

        {/* CAR DETAIL */}
        {view==="car-detail"&&activeCar&&(
          <div style={{paddingTop:"40px",paddingBottom:"80px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(28px,5vw,44px)",color:"#E8E4DC",marginBottom:"4px"}}>{activeCar.year} {activeCar.make} {activeCar.model}</div>
            <div style={{color:"#555",fontSize:"13px",marginBottom:"24px"}}>{activeCar.build.length} mod{activeCar.build.length!==1?"s":""} logged</div>

            <div style={{borderBottom:"1px solid #1C1C1C",marginBottom:"32px",display:"flex"}}>
              <Tab id="brands" label="SHOP BY BRAND"/>
              <Tab id="guides" label="GET A GUIDE"/>
              <Tab id="build" label="MY BUILD"/>
            </div>

            {/* SHOP BY BRAND */}
            {activeTab==="brands"&&(
              <div>
                {!activeBrand?(
                  <div>
                    <span style={labelStyle}>SELECT A BRAND</span>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                      {getBrands(activeCar).map(brand=>(
                        <button key={brand} onClick={()=>setActiveBrand(brand)} style={{background:"#1C1C1C",border:`1px solid ${BRAND_COLORS[brand]||"#333"}`,color:"#E8E4DC",padding:"12px 20px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"2px",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.background=`${BRAND_COLORS[brand]}22`}}
                          onMouseLeave={e=>{e.currentTarget.style.background="#1C1C1C"}}
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
                          const owned=activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);
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

            {/* GET A GUIDE */}
            {activeTab==="guides"&&(
              <div>
                {activeCar.build.length>0&&(
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
                <span style={labelStyle}>WHAT DO YOU WANT A GUIDE FOR?</span>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px"}}>
                  {guideCategories.map(cat=><ModChip key={cat} label={cat} selected={selectedMod===cat} onClick={()=>setSelectedMod(selectedMod===cat?"":cat)}/>)}
                </div>
                {error&&<div style={{color:"#FF6B2B",marginBottom:"12px",fontSize:"14px"}}>{error}</div>}
                {loading&&(
                  <div style={{marginBottom:"24px"}}>
                    <div style={{height:"2px",background:"#1C1C1C",borderRadius:"2px",overflow:"hidden"}}>
                      <div style={{height:"100%",background:"#FF6B2B",animation:"loadBar 2s ease infinite",width:"40%"}}/>
                    </div>
                    <div style={{color:"#444",fontSize:"13px",marginTop:"10px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>PULLING FROM THE COLLECTIVE KNOWLEDGE...</div>
                  </div>
                )}
                <button onClick={generate} disabled={!selectedMod||loading} style={btnPrimary(selectedMod&&!loading)}>{loading?"GENERATING...":"GENERATE GUIDE"}</button>
              </div>
            )}

            {/* MY BUILD */}
            {activeTab==="build"&&(
              <div>
                {activeCar.build.length===0?(
                  <div style={{textAlign:"center",padding:"48px 0"}}>
                    <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",marginBottom:"8px"}}>BUILD SHEET IS EMPTY</div>
                    <div style={{color:"#444",fontSize:"14px",marginBottom:"20px"}}>Go to Shop by Brand and start adding parts</div>
                    <button onClick={()=>setActiveTab("brands")} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"12px 28px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>BROWSE BRANDS</button>
                  </div>
                ):(
                  <div>
                    <span style={labelStyle}>YOUR BUILD — {activeCar.year} {activeCar.make} {activeCar.model}</span>
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

        {/* GUIDE */}
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
    </div>
  );
}