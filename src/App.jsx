import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const VEHICLES = {
  "Abarth": {
    "500 Abarth": {
      generations:{
        "Pre-Facelift (2012-2015)":{
          years:["2012","2013","2014","2015"],
          trims:{
            "Base":         { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Competizione": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Turismo":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Argento (Silver)",hex:"#C0C0C0"},
            {name:"Azzurro (Blue)",hex:"#1E4B8E"},
            {name:"Bianco / Bianco Gelato (White)",hex:"#F5F5F5"},
            {name:"Espresso (Dark Brown)",hex:"#3B2314"},
            {name:"Giallo / Giallo Sole (Yellow)",hex:"#F5C800"},
            {name:"Granito Lucente (Granite Crystal)",hex:"#6B6B6B"},
            {name:"Nero / Nero Puro (Straight Black)",hex:"#111111"},
            {name:"Rosso / Rosso Brillante (Red)",hex:"#C8102E"},
            {name:"Grigio Campovolo (Grey) — Abarth Exclusive",hex:"#8A8D8F"},
            {name:"Grigio Nuvolari (Metallic Grey) — Abarth Exclusive",hex:"#5A5F63"},
          ],
        },
        "Facelift (2016-2019)":{
          years:["2016","2017","2018","2019"],
          trims:{
            "Base":         { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Competizione": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Turismo":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Argento (Silver)",hex:"#C0C0C0"},
            {name:"Azzurro (Blue)",hex:"#1E4B8E"},
            {name:"Bianco / Bianco Gelato (White)",hex:"#F5F5F5"},
            {name:"Espresso (Dark Brown)",hex:"#3B2314"},
            {name:"Giallo / Giallo Sole (Yellow)",hex:"#F5C800"},
            {name:"Granito Lucente (Granite Crystal)",hex:"#6B6B6B"},
            {name:"Nero / Nero Puro (Straight Black)",hex:"#111111"},
            {name:"Rosso / Rosso Brillante (Red)",hex:"#C8102E"},
            {name:"Grigio Campovolo (Grey) — Abarth Exclusive",hex:"#8A8D8F"},
            {name:"Grigio Nuvolari (Metallic Grey) — Abarth Exclusive",hex:"#5A5F63"},
          ],
        },
      },
    },
    "124 Spider Abarth": {
      years:["2017","2018","2019","2020"],
      trims:{
        "Abarth": { engine:"1.4L Turbocharged 4-cylinder (164hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
      },
      colors:[
        {name:"Rosso / Hypnotique Red (Red)",hex:"#C8102E"},
        {name:"Nero Cinema / Forte Black Metallic (Black)",hex:"#111111"},
        {name:"Bianco Gelato / Brillante White (White)",hex:"#F5F5F5"},
        {name:"Grigio Argento / Chiaro Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Blu Scuro / Mare Blue Metallic (Dark Blue)",hex:"#1E3A6B"},
      ],
    },
  },
  "Acura": {
    "TLX": {
      generations:{
        "First Generation (2015-2017)":{
          years:["2015","2016","2017"],
          trims:{
            "Base": { engine:"2.4L 4-cylinder (206hp)", drivetrain:"FWD", transmission:"Automatic (DCT)" },
            "V6":   { engine:"3.5L V6 (290hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Bellanova White Pearl (White)",hex:"#F5F5F5"},
            {name:"Basque Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Slate Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"San Marino Red (Red)",hex:"#C8102E"},
          ],
        },
        "First Generation Facelift (2018-2020)":{
          years:["2018","2019","2020"],
          trims:{
            "Base":   { engine:"2.4L 4-cylinder (206hp)", drivetrain:"FWD", transmission:"Automatic (DCT)" },
            "V6":     { engine:"3.5L V6 (290hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "A-Spec": { engine:"3.5L V6 (290hp)", drivetrains:["FWD","AWD"], transmission:"Automatic", note:"Sport appearance trim added for 2018 — new bumpers, wheels, and interior trim, no power increase over the standard V6." },
          },
          colors:[
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Basque Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Lunar Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Modern Steel Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
        "Second Generation (2021-2026)":{
          years:["2021","2022","2023","2024","2025","2026"],
          trims:{
            "Base":       { engine:"2.0L Turbocharged 4-cylinder (272hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Technology": { engine:"2.0L Turbocharged 4-cylinder (272hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "A-Spec":     { engine:"2.0L Turbocharged 4-cylinder (272hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Advance":    { engine:"2.0L Turbocharged 4-cylinder (272hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Type S":     { engine:"3.0L Turbocharged V6 (355hp)", drivetrain:"AWD", transmission:"Automatic", note:"First Type S badge on any Acura in over a decade. SH-AWD is standard, not optional, on this trim." },
          },
          colors:[
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Majestic Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Apex Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Performance Red Pearl (Red)",hex:"#C8102E"},
            {name:"Fathom Blue Pearl (Blue)",hex:"#1B2A4A"},
            {name:"Lunar Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
      },
    },
  },
  "BMW": {
    "328i / 330i": {
      years:["2012","2013","2014","2015","2016","2017","2018","2019"],
      trims:{
        "Sedan":        { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD", transmission:"Automatic" },
        "xDrive":       { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Gran Turismo": { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD", transmission:"Automatic" },
        "Touring":      { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD", transmission:"Automatic" },
      },
      colors:[
        {name:"Alpine White (White)",hex:"#F5F5F5"},
        {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
        {name:"Mineral Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Estoril Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Melbourne Red Metallic (Red)",hex:"#C8102E"},
      ],
    },
    "M235i / M240i": {
      years:["2014","2015","2016","2017","2018","2019","2021","2022"],
      trims:{
        "Coupe":       { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
        "Convertible": { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"RWD", transmission:"Automatic" },
        "xDrive":      { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"AWD", transmission:"Automatic" },
      },
      colors:[
        {name:"Alpine White (White)",hex:"#F5F5F5"},
        {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
        {name:"Estoril Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Melbourne Red Metallic (Red)",hex:"#C8102E"},
        {name:"Mineral Grey Metallic (Gray)",hex:"#8A8D8F"},
      ],
    },
    "M3": {
      generations:{
        "E30 (1988-1991)":{
          years:["1988","1989","1990","1991"],
          trims:{
            "Coupe": { engine:"2.3L 4-cylinder (192hp)", drivetrain:"RWD", transmission:"Manual", note:"US-spec was detuned vs the European version. Coupe only in the US — no sedan or convertible M3 offered here this generation." },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Diamond Black Metallic (Black)",hex:"#1A1A1A"},
            {name:"Brilliant Red (Red)",hex:"#C8102E"},
            {name:"Macao Blue Metallic (Blue)",hex:"#1E4B8E"},
          ],
        },
        "E36 (1995-1999)":{
          years:["1995","1996","1997","1998","1999"],
          trims:{
            "Coupe":      { engine:"3.0L/3.2L 6-cylinder (240hp)", drivetrain:"RWD", transmission:"Manual", note:"US models were detuned compared to Euro-spec, which made up to 321hp on the 3.2L. US always stayed at 240hp." },
            "Sedan":      { engine:"3.0L/3.2L 6-cylinder (240hp)", drivetrain:"RWD", transmission:"Manual" },
            "Convertible":{ engine:"3.0L/3.2L 6-cylinder (240hp)", drivetrain:"RWD", transmission:"Manual" },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Cosmos Black Metallic (Black)",hex:"#1A1A1A"},
            {name:"Estoril Blue (Blue)",hex:"#1E4B8E"},
            {name:"Boston Green Metallic (Green)",hex:"#2E5A3A"},
            {name:"Arctic Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "E46 (2001-2006)":{
          years:["2001","2002","2003","2004","2005","2006"],
          trims:{
            "Coupe":       { engine:"3.2L 6-cylinder (333hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (SMG)"] },
            "Convertible": { engine:"3.2L 6-cylinder (333hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (SMG)"] },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
            {name:"Laguna Seca Blue (Blue)",hex:"#1E4B8E"},
            {name:"Imola Red (Red)",hex:"#C8102E"},
            {name:"Titanium Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "E90/E92/E93 (2008-2013)":{
          years:["2008","2009","2010","2011","2012","2013"],
          trims:{
            "Sedan (E90)":       { engine:"4.0L V8 (414hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (DCT)"] },
            "Coupe (E92)":       { engine:"4.0L V8 (414hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (DCT)"] },
            "Convertible (E93)":{ engine:"4.0L V8 (414hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (DCT)"], note:"The only M3 generation ever built with a V8 — every other generation uses an inline-6." },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Jet Black (Black)",hex:"#1A1A1A"},
            {name:"Interlagos Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Melbourne Red Metallic (Red)",hex:"#C8102E"},
            {name:"Space Gray Metallic (Gray)",hex:"#5A5F63"},
          ],
        },
        "F80 (2014-2018)":{
          years:["2014","2015","2016","2017","2018"],
          trims:{
            "Sedan":                 { engine:"3.0L Twin-Turbo 6-cylinder (425hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (DCT)"], note:"First turbocharged M3 in the nameplate's history." },
            "Competition Package":   { engine:"3.0L Twin-Turbo 6-cylinder (444hp)", drivetrain:"RWD", transmissions:["Manual","Automatic (DCT)"] },
            "CS":                    { engine:"3.0L Twin-Turbo 6-cylinder (453hp)", drivetrain:"RWD", transmission:"Automatic (DCT)", note:"2018 limited-production special edition." },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
            {name:"Yas Marina Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Austin Yellow Metallic (Yellow)",hex:"#F5C800"},
            {name:"Mineral Grey Metallic (Gray)",hex:"#8A8D8F"},
          ],
        },
        "G80 (2021-2026)":{
          years:["2021","2022","2023","2024","2025","2026"],
          trims:{
            "Sedan":       { engine:"3.0L Twin-Turbo 6-cylinder (473hp)", drivetrain:"RWD", transmission:"Manual" },
            "Competition": { engine:"3.0L Twin-Turbo 6-cylinder (503hp)", drivetrains:["RWD","AWD"], transmission:"Automatic (DCT)", note:"AWD (M xDrive) became available starting the 2022 model year — the first time an M3 has offered anything other than RWD." },
            "CS":          { engine:"3.0L Twin-Turbo 6-cylinder (543hp)", drivetrain:"RWD", transmission:"Automatic (DCT)" },
          },
          colors:[
            {name:"Alpine White (White)",hex:"#F5F5F5"},
            {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
            {name:"Portimao Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Isle of Man Green Metallic (Green)",hex:"#2E5A3A"},
            {name:"Sao Paulo Yellow (Yellow)",hex:"#F5C800"},
          ],
        },
      },
    },
  },
  "Dodge": {
    "Caliber": {
      years:["2007","2008","2009","2010","2011","2012"],
      trims:{
        "SE":   { engine:"1.8L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
        "SXT":  { engine:"2.0L 4-cylinder (158hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
        "R/T":  { engine:"2.4L 4-cylinder (172hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "SRT4": { engine:"2.4L Turbocharged 4-cylinder (285hp)", drivetrain:"FWD", transmission:"Manual" },
      },
      colors:[
        {name:"Black Clearcoat (Black)",hex:"#111111"},
        {name:"Bright Silver Metallic Clearcoat (Silver)",hex:"#C0C0C0"},
        {name:"Inferno Red Crystal Pearlcoat (Red)",hex:"#C8102E"},
        {name:"Light Khaki Metallic Clearcoat (Khaki)",hex:"#B8A878"},
        {name:"Marine Blue Pearlcoat (Blue)",hex:"#1E4B8E"},
        {name:"Solar Yellow Clearcoat (Yellow)",hex:"#F5C800"},
        {name:"Steel Blue Metallic Clearcoat (Steel Blue)",hex:"#4A7B9D"},
        {name:"Stone White Clearcoat (White)",hex:"#F0F0F0"},
        {name:"Sunburst Orange Pearlcoat (Orange)",hex:"#E8601C"},
        {name:"Brilliant Black Pearlcoat (Black)",hex:"#1A1A1A"},
      ],
    },
    "Ram 2500": {
      generations:{
        "1st Gen (1990-1993)":{
          years:["1990","1991","1992","1993"],
          trims:{
            "Base": { engines:["5.2L V8 (170hp)","5.9L V8 (230hp)","5.9L Cummins 12-Valve Diesel (160-180hp)"], transmissions:["Manual","Automatic"] },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#111111"},
            {name:"Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "2nd Gen (1994-2002)":{
          years:["1994","1995","1996","1997","1998","1999","2000","2001","2002"],
          trims:{
            "Base": { engines:["3.9L V6 (175hp)","5.2L V8 (220hp)","5.9L V8 (230hp)","8.0L V10 (300hp)","5.9L Cummins Diesel (160-245hp)"], transmissions:["Manual","Automatic"], note:"The 'big-rig' redesign — famous for its 12-valve Cummins through 1998, then 24-valve from 1998.5 on." },
            "SLT":  { engines:["5.9L V8 (230hp)","8.0L V10 (300hp)","5.9L Cummins Diesel (160-245hp)"], transmissions:["Manual","Automatic"] },
            "Laramie": { engines:["5.9L V8 (230hp)","8.0L V10 (300hp)","5.9L Cummins Diesel (215-245hp)"], transmission:"Automatic" },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#111111"},
            {name:"Deep Amethyst Pearl (Purple)",hex:"#4A2E5A"},
            {name:"Forest Green Pearl (Green)",hex:"#2E5A3A"},
            {name:"Bright Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "3rd Gen (2003-2009)":{
          years:["2003","2004","2005","2006","2007","2008","2009"],
          trims:{
            "ST":      { engines:["5.7L HEMI V8 (345hp)","5.9L Cummins Diesel (305-325hp)","6.7L Cummins Diesel (350hp)"], transmissions:["Manual","Automatic"], note:"The new 5.7L HEMI replaces the old Magnum V8s this generation. 6.7L Cummins arrives mid-2007 (2007.5), replacing the 5.9L." },
            "SLT":     { engines:["5.7L HEMI V8 (345hp)","5.9L Cummins Diesel (305-325hp)","6.7L Cummins Diesel (350hp)"], transmissions:["Manual","Automatic"] },
            "Laramie": { engines:["5.7L HEMI V8 (345hp)","6.7L Cummins Diesel (350hp)"], transmission:"Automatic", note:"Mega Cab introduced this generation — the longest cab Ram ever offered." },
          },
          drivetrainOptions:["2WD","4WD (Part-Time)","4WD (Full-Time)"],
          colors:[
            {name:"Brilliant Black Crystal Pearl (Black)",hex:"#111111"},
            {name:"Bright Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Bright White / White Knuckle (White)",hex:"#F5F5F5"},
            {name:"Flame Red / Poppy Red (Red)",hex:"#C8102E"},
            {name:"Patriot Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Mineral Gray Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
        "4th Gen (2010-2018)":{
          years:["2010","2011","2012","2013","2014","2015","2016","2017","2018"],
          trims:{
            "Tradesman": { engines:["5.7L HEMI V8 (383hp)","6.7L Cummins Diesel (350-370hp)"], transmission:"Automatic", note:"Ram split from Dodge as its own brand starting this generation — no more 'Dodge Ram' badging." },
            "SLT":       { engines:["5.7L HEMI V8 (383hp)","6.7L Cummins Diesel (350-370hp)"], transmission:"Automatic" },
            "Laramie":   { engines:["5.7L HEMI V8 (383hp)","6.4L HEMI V8 (410hp)","6.7L Cummins Diesel (350-370hp)"], transmission:"Automatic" },
          },
          drivetrainOptions:["2WD","4WD (Part-Time)","4WD (Full-Time)"],
          colors:[
            {name:"Brilliant Black Crystal Pearl (Black)",hex:"#111111"},
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Granite Crystal Metallic (Gray)",hex:"#6B6B6B"},
            {name:"True Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "5th Gen (2019-2026)":{
          years:["2019","2020","2021","2022","2023","2024","2025","2026"],
          trims:{
            "Tradesman": { engines:["6.4L HEMI V8 (410hp)","6.7L Cummins Diesel (370-420hp)"], transmission:"Automatic" },
            "Big Horn":  { engines:["6.4L HEMI V8 (410hp)","6.7L Cummins Diesel (370-420hp)"], transmission:"Automatic" },
            "Laramie":   { engines:["6.4L HEMI V8 (410hp)","6.7L Cummins Diesel (370-420hp)"], transmission:"Automatic" },
            "Limited":   { engines:["6.4L HEMI V8 (410hp)","6.7L Cummins Diesel (370-420hp)"], transmission:"Automatic" },
          },
          drivetrainOptions:["2WD","4WD (Part-Time)","4WD (Full-Time)"],
          colors:[
            {name:"Diamond Black Crystal Pearl (Black)",hex:"#111111"},
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Billet Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Patriot Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Hydro Blue Pearl (Blue)",hex:"#4A7B9D"},
          ],
        },
      },
    },
  },
  "Fiat": {
    "124 Spider": {
      years:["2017","2018","2019","2020"],
      trims:{
        "Classica": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
        "Lusso":    { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
      },
      colors:[
        {name:"Rosso / Hypnotique Red (Red)",hex:"#C8102E"},
        {name:"Nero Cinema / Forte Black Metallic (Black)",hex:"#111111"},
        {name:"Bianco Gelato / Brillante White (White)",hex:"#F5F5F5"},
        {name:"Bianco Perla / Puro White Tri-Coat Pearl (Pearl White)",hex:"#F0F0F0"},
        {name:"Grigio Argento / Chiaro Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Grigio Moda / Moda Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Bronzo Magnetico / Magnetico Bronze Metallic (Bronze)",hex:"#B87333"},
        {name:"Blu Scuro / Mare Blue Metallic (Dark Blue)",hex:"#1E3A6B"},
        {name:"Ceramica Gray Metallic (Gray) — 2019+",hex:"#9A9A8A"},
      ],
    },
    "500": {
      generations:{
        "Pre-Facelift (2012-2016)":{
          years:["2012","2013","2014","2015","2016"],
          trims:{
            "Pop":   { engine:"1.4L 4-cylinder (101hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Sport": { engine:"1.4L 4-cylinder (101hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Lounge":{ engine:"1.4L 4-cylinder (101hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Turbo": { engine:"1.4L Turbocharged 4-cylinder (135hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Bianco (White)",hex:"#F5F5F5"},
            {name:"Nero (Black)",hex:"#111111"},
            {name:"Rosso (Red)",hex:"#C8102E"},
            {name:"Verde Chiaro (Light Green)",hex:"#7EC850"},
            {name:"Azzurro (Blue)",hex:"#1E4B8E"},
          ],
        },
        "Facelift (2017-2019)":{
          years:["2017","2018","2019"],
          trims:{
            "Pop":    { engine:"1.4L 4-cylinder (101hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Lounge": { engine:"1.4L 4-cylinder (101hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"For 2018+ this got upgraded to the turbo 1.4L MultiAir as standard — the last two years dropped the naturally-aspirated engine entirely on this trim." },
          },
          colors:[
            {name:"Bianco (White)",hex:"#F5F5F5"},
            {name:"Nero (Black)",hex:"#111111"},
            {name:"Rosso (Red)",hex:"#C8102E"},
            {name:"Grigio (Grey)",hex:"#8A8D8F"},
          ],
        },
      },
    },
    "500e": {
      generations:{
        "First Generation (2013-2019)":{
          years:["2013","2014","2015","2016","2017","2018","2019"],
          trims:{
            "Base": { engine:"Electric Motor (111hp)", drivetrain:"FWD", transmission:"Automatic (Single-Speed)", note:"Sold only in California (and later Oregon) — a compliance car, never available nationwide. About 87 miles of EPA-rated range." },
          },
          colors:[
            {name:"Bianco (White)",hex:"#F5F5F5"},
            {name:"Nero (Black)",hex:"#111111"},
            {name:"Azzurro (Blue)",hex:"#1E4B8E"},
            {name:"Verde Chiaro (Light Green)",hex:"#7EC850"},
          ],
        },
        "Second Generation (2024-2026)":{
          years:["2024","2025","2026"],
          trims:{
            "Base":     { engine:"Electric Motor (117hp)", drivetrain:"FWD", transmission:"Automatic (Single-Speed)", note:"Returned to the US in 2024 after a 5-year absence, this time available nationwide instead of California-only." },
            "(RED)":    { engine:"Electric Motor (117hp)", drivetrain:"FWD", transmission:"Automatic (Single-Speed)" },
            "La Prima": { engine:"Electric Motor (117hp)", drivetrain:"FWD", transmission:"Automatic (Single-Speed)" },
          },
          colors:[
            {name:"Celestial Blue (Blue)",hex:"#1E4B8E"},
            {name:"Mineral Grey (Gray)",hex:"#6B6E6F"},
            {name:"Ocean Green (Green)",hex:"#3B8A5A"},
            {name:"Rosso (Red)",hex:"#C8102E"},
          ],
        },
      },
    },
    "500L": {
      years:["2014","2015","2016","2017","2018","2019","2020"],
      trims:{
        "Pop":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "Easy":     { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "Trekking": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "Lounge":   { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
      },
      colors:[
        {name:"Bianco (White)",hex:"#F5F5F5"},
        {name:"Nero (Black)",hex:"#111111"},
        {name:"Rosso (Red)",hex:"#C8102E"},
        {name:"Verde Chiaro (Light Green)",hex:"#7EC850"},
        {name:"Bronzo (Bronze)",hex:"#B87333"},
      ],
    },
    "500X": {
      years:["2016","2017","2018","2019","2020","2021","2022"],
      trims:{
        "Pop":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD", transmission:"Automatic" },
        "Trekking": { engine:"2.4L 4-cylinder (180hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Lounge":   { engine:"2.4L 4-cylinder (180hp)", drivetrain:"AWD", transmission:"Automatic" },
      },
      colors:[
        {name:"Bianco (White)",hex:"#F5F5F5"},
        {name:"Nero (Black)",hex:"#111111"},
        {name:"Rosso (Red)",hex:"#C8102E"},
        {name:"Grigio (Grey)",hex:"#8A8D8F"},
        {name:"Azzurro (Blue)",hex:"#1E4B8E"},
      ],
    },
  },
  "Ford": {
    "Fiesta ST": {
      generations:{
        "Mk7 (2014-2019)":{
          years:["2014","2015","2016","2017","2018","2019"],
          trims:{
            "Base": { engine:"1.6L EcoBoost Turbocharged 4-cylinder (197hp)", drivetrain:"FWD", transmission:"Manual", note:"The only generation of Fiesta ST ever sold in the US — Ford never brought an earlier or later ST here." },
          },
          colors:[
            {name:"Molten Orange (Orange)",hex:"#E8601C"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Performance Blue (Blue)",hex:"#1E4B8E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Race Red (Red)",hex:"#C8102E"},
          ],
        },
      },
    },
    "Mustang GT": {
      generations:{
        "Fox Body (1990-1993)":{
          years:["1990","1991","1992","1993"],
          trims:{
            "Coupe":      { engine:"5.0L V8 (225hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Hatchback":  { engine:"5.0L V8 (225hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Convertible":{ engine:"5.0L V8 (225hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Vibrant Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Titanium Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Deep Emerald Green Metallic (Green)",hex:"#2E5A3A"},
          ],
        },
        "SN95 (1994-1998)":{
          years:["1994","1995","1996","1997","1998"],
          trims:{
            "Coupe":      { engine:"5.0L/4.6L V8 (215hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"1994-95 used the old pushrod 5.0L V8. 1996-98 switched to the new 4.6L SOHC modular V8 — output stayed about the same, but it's a completely different engine architecture." },
            "Convertible":{ engine:"5.0L/4.6L V8 (215hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Rio Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Pacific Green Metallic (Green)",hex:"#2E5A3A"},
            {name:"Laser Red Metallic (Red)",hex:"#9B1B30"},
          ],
        },
        "New Edge (1999-2004)":{
          years:["1999","2000","2001","2002","2003","2004"],
          trims:{
            "Coupe":      { engine:"4.6L SOHC V8 (260hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Convertible":{ engine:"4.6L SOHC V8 (260hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Bullitt":    { engine:"4.6L SOHC V8 (265hp)", drivetrain:"RWD", transmission:"Manual", note:"2001 only — special edition inspired by the 1968 movie car." },
            "Mach 1":     { engine:"4.6L DOHC V8 (305hp)", drivetrain:"RWD", transmission:"Manual", note:"2003-2004 only." },
          },
          colors:[
            {name:"Performance Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Zinc Yellow (Yellow)",hex:"#F5C800"},
            {name:"True Blue Metallic (Blue)",hex:"#1E4B8E"},
          ],
        },
        "S197 (2005-2010)":{
          years:["2005","2006","2007","2008","2009","2010"],
          trims:{
            "Coupe":      { engine:"4.6L 3-valve V8 (300hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Convertible":{ engine:"4.6L 3-valve V8 (300hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Torch Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Performance White (White)",hex:"#F5F5F5"},
            {name:"Vista Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Grabber Orange (Orange)",hex:"#E8601C"},
          ],
        },
        "S197 Facelift / Coyote (2011-2014)":{
          years:["2011","2012","2013","2014"],
          trims:{
            "Coupe":      { engine:"5.0L Coyote V8 (412hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"First year of the 5.0 Coyote V8 — a huge jump from the outgoing 4.6L's 315hp." },
            "Convertible":{ engine:"5.0L Coyote V8 (412hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "California Special":{ engine:"5.0L Coyote V8 (412hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Performance White (White)",hex:"#F5F5F5"},
            {name:"Grabber Blue (Blue)",hex:"#1E4B8E"},
            {name:"Yellow Blaze Metallic (Yellow)",hex:"#F5C800"},
          ],
        },
        "S550 (2015-2017)":{
          years:["2015","2016","2017"],
          trims:{
            "Fastback":           { engine:"5.0L Coyote V8 (435hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"First S550-generation GT — independent rear suspension standard for the first time in Mustang history." },
            "Convertible":        { engine:"5.0L Coyote V8 (435hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Competition Orange (Orange)",hex:"#E8601C"},
            {name:"Grabber Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
        "S550 Facelift (2018-2023)":{
          years:["2018","2019","2020","2021","2022","2023"],
          trims:{
            "Fastback":           { engine:"5.0L Coyote V8 (460hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Convertible":        { engine:"5.0L Coyote V8 (460hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Premium Fastback":   { engine:"5.0L Coyote V8 (460hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Premium Convertible":{ engine:"5.0L Coyote V8 (460hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "California Special": { engine:"5.0L Coyote V8 (460hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Bullitt":            { engine:"5.0L Coyote V8 (480hp)", drivetrain:"RWD", transmission:"Manual" },
          },
          colors:[
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Grabber Blue (Blue)",hex:"#1E4B8E"},
            {name:"Iconic Silver (Silver)",hex:"#C0C0C0"},
            {name:"Grabber Yellow (Yellow)",hex:"#F5C800"},
          ],
        },
        "S650 (2024-2026)":{
          years:["2024","2025","2026"],
          trims:{
            "Fastback":    { engine:"5.0L Coyote V8 (480hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Up to 486hp with the optional active exhaust package." },
            "Convertible": { engine:"5.0L Coyote V8 (480hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Dark Horse":  { engine:"5.0L Coyote V8 (500hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Track-focused trim sitting above the standard GT — unique suspension tuning and aero." },
          },
          colors:[
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Grabber Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Vapor Blue Metallic (Light Blue)",hex:"#4A7B9D"},
          ],
        },
      },
    },
    "Ranger": {
      generations:{
        "1st Gen (1990-1992)":{
          years:["1990","1991","1992"],
          trims:{
            "XL":  { engines:["2.3L 4-cylinder (100hp)","2.9L V6 (140hp)","4.0L V6 (160hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "XLT": { engines:["2.3L 4-cylinder (100hp)","2.9L V6 (140hp)","4.0L V6 (160hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "STX": { engines:["2.9L V6 (140hp)","4.0L V6 (160hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Colonial White (White)",hex:"#F5F5F5"},
            {name:"Bright Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Deep Wedgewood Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
        "2nd Gen (1993-1997)":{
          years:["1993","1994","1995","1996","1997"],
          trims:{
            "XL":     { engine:"2.3L 4-cylinder (112hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "XLT":    { engines:["3.0L V6 (145hp)","4.0L V6 (160hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Splash": { engines:["3.0L V6 (145hp)","4.0L V6 (160hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Lowered sport trim with a Flareside bed and monochromatic exterior." },
            "STX":    { engine:"4.0L V6 (160hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Bright Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Pacific Green Metallic (Green)",hex:"#2E5A3A"},
          ],
        },
        "3rd Gen (1998-2011)":{
          years:["1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"],
          trims:{
            "XL":  { engines:["2.3L Duratec 4-cylinder (135hp)","2.5L 4-cylinder (119hp)","3.0L V6 (145hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "XLT": { engines:["3.0L V6 (145hp)","4.0L V6 (207hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "FX4": { engine:"4.0L V6 (207hp)", drivetrain:"4WD", transmission:"Manual", note:"Off-road focused trim with skid plates and locking rear differential." },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Torch Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"True Blue Metallic (Blue)",hex:"#1E4B8E"},
          ],
        },
        "4th Gen (2019-2022)":{
          years:["2019","2020","2021","2022"],
          trims:{
            "XL":     { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic", note:"Returned to the US after an 8-year absence — this time as a midsize truck instead of the old compact." },
            "XLT":    { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic" },
            "Lariat": { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Lightning Blue (Blue)",hex:"#1E4B8E"},
            {name:"Saber (Orange)",hex:"#E8601C"},
          ],
        },
        "5th Gen (2023-2026)":{
          years:["2023","2024","2025","2026"],
          trims:{
            "XL":     { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic" },
            "XLT":    { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic" },
            "Lariat": { engine:"2.3L Turbocharged 4-cylinder (270hp)", drivetrains:["RWD","4WD"], transmission:"Automatic" },
            "Raptor": { engine:"3.0L Twin-Turbo EcoBoost V6 (405hp)", drivetrain:"4WD", transmission:"Automatic", note:"First-ever Ranger Raptor sold in the US." },
          },
          colors:[
            {name:"Oxford White (White)",hex:"#F5F5F5"},
            {name:"Race Red (Red)",hex:"#C8102E"},
            {name:"Shadow Black (Black)",hex:"#1A1A1A"},
            {name:"Code Orange (Orange)",hex:"#E8601C"},
            {name:"Carbonized Gray (Gray)",hex:"#5A5F63"},
          ],
        },
      },
    },
  },
  "Honda": {
    "Accord": {
      generations:{
        "4th Generation (1990-1993)":{
          years:["1990","1991","1992","1993"],
          trims:{
            "LX": { engine:"2.2L 4-cylinder (125hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX": { engine:"2.2L 4-cylinder (125hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Frost White (White)",hex:"#F5F5F5"},
            {name:"Bordeaux Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Sage Green Metallic (Green)",hex:"#5A7A5A"},
          ],
        },
        "5th Generation (1994-1997)":{
          years:["1994","1995","1996","1997"],
          trims:{
            "LX": { engine:"2.2L 4-cylinder (130hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX": { engine:"2.2L 4-cylinder (145hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "V6": { engine:"2.7L V6 (170hp)", drivetrain:"FWD", transmission:"Automatic", note:"First V6 ever offered in an Accord — added for the 1995 model year." },
          },
          colors:[
            {name:"Frost White (White)",hex:"#F5F5F5"},
            {name:"Milano Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Heather Mist Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "6th Generation (1998-2002)":{
          years:["1998","1999","2000","2001","2002"],
          trims:{
            "LX": { engine:"2.3L 4-cylinder (150hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX": { engine:"2.3L 4-cylinder (150hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "V6": { engine:"3.0L V6 (200hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Taffeta White (White)",hex:"#F5F5F5"},
            {name:"San Marino Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Naples Gold Metallic (Gold)",hex:"#B8A050"},
          ],
        },
        "7th Generation (2003-2007)":{
          years:["2003","2004","2005","2006","2007"],
          trims:{
            "LX": { engine:"2.4L 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX": { engine:"2.4L 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX V6": { engine:"3.0L V6 (240hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"First Accord ever offered with a 6-speed manual transmission." },
          },
          colors:[
            {name:"Satin Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Nighthawk Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"San Marino Red (Red)",hex:"#C8102E"},
            {name:"Redrock Pearl (Red)",hex:"#6B1A1A"},
          ],
        },
        "8th Generation (2008-2012)":{
          years:["2008","2009","2010","2011","2012"],
          trims:{
            "LX":      { engine:"2.4L 4-cylinder (177hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX":      { engine:"2.4L 4-cylinder (190hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX-L V6": { engine:"3.5L V6 (271hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Taffeta White (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Alabaster Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"San Marino Red (Red)",hex:"#C8102E"},
          ],
        },
        "9th Generation (2013-2017)":{
          years:["2013","2014","2015","2016","2017"],
          trims:{
            "LX":      { engine:"2.4L 4-cylinder (185hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Sport":   { engine:"2.4L 4-cylinder (189hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
            "EX-L":    { engine:"2.4L 4-cylinder (185hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "EX-L V6": { engine:"3.5L V6 (278hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Touring": { engine:"3.5L V6 (278hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Basque Red Pearl II (Red)",hex:"#9B1B1B"},
            {name:"Champagne Frost Pearl (Champagne)",hex:"#D8C9A8"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Kona Coffee Metallic (Brown)",hex:"#4A3728"},
            {name:"Lunar Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Modern Steel Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Obsidian Blue Pearl (Blue)",hex:"#1B2A4A"},
            {name:"White Orchid Pearl (White)",hex:"#F5F5F0"},
          ],
        },
        "10th Generation (2018-2022)":{
          years:["2018","2019","2020","2021","2022"],
          trims:{
            "LX":                    { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Sport":                 { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
            "Sport Special Edition": { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "EX-L":                  { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Sport 2.0T":            { engine:"2.0L Turbocharged 4-cylinder (252hp)", drivetrain:"FWD", transmission:"Automatic", note:"Shares much of its engine design with the 2017 Civic Type R." },
            "Touring":               { engine:"2.0L Turbocharged 4-cylinder (252hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
            {name:"Radiant Red Metallic (Red)",hex:"#C8102E"},
          ],
        },
        "11th Generation (2023-2026)":{
          years:["2023","2024","2025","2026"],
          trims:{
            "LX":      { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "EX-L":    { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Sport-L": { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Touring": { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Hybrid":  { engine:"2.0L Hybrid 4-cylinder (204hp)", drivetrain:"FWD", transmission:"Automatic (e-CVT)", note:"No more 2.0T high-output option this generation — Hybrid is now the top-performance choice." },
          },
          colors:[
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
            {name:"Radiant Red Metallic (Red)",hex:"#C8102E"},
            {name:"Canyon River Blue Metallic (Blue)",hex:"#1E4B8E"},
          ],
        },
      },
    },
    "Civic": {
      generations:{
        "5th Gen EG — Si Hatchback (1992-1995)":{
          years:["1992","1993","1994","1995"],
          trims:{
            "CX":  { engine:"1.5L 4-cylinder (70hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Base hatchback trim, no VTEC." },
            "DX":  { engine:"1.5L 4-cylinder (102hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX":  { engine:"1.6L SOHC VTEC 4-cylinder (125hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Si":  { engine:"1.6L SOHC VTEC 4-cylinder (125hp)", drivetrain:"FWD", transmission:"Manual", note:"Hatchback only — this is the classic 90s EG hatch." },
          },
          colors:[
            {name:"Frost White (White)",hex:"#F5F5F5"},
            {name:"Milano Red (Red)",hex:"#C8102E"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Cyber Green Pearl (Green)",hex:"#3B8A5A"},
          ],
        },
        "6th Gen EK/EM1 — Si Coupe (1996-2000)":{
          years:["1996","1997","1998","1999","2000"],
          trims:{
            "CX":  { engine:"1.6L 4-cylinder (106hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "DX":  { engine:"1.6L 4-cylinder (106hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX":  { engine:"1.6L SOHC VTEC 4-cylinder (127hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Si":  { engine:"1.6L DOHC VTEC 4-cylinder (160hp)", drivetrain:"FWD", transmission:"Manual", note:"The US didn't get a Si for the 1996-98 model years — it returned for '99-'00 only, as a 2-door coupe (EM1), not a hatchback." },
          },
          colors:[
            {name:"Electron Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Championship White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Milano Red (Red)",hex:"#C8102E"},
          ],
        },
        "7th Gen EP3 — Si Hatchback (2001-2005)":{
          years:["2001","2002","2003","2004","2005"],
          trims:{
            "DX":  { engine:"1.7L 4-cylinder (115hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "LX":  { engine:"1.7L 4-cylinder (115hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX":  { engine:"1.7L VTEC 4-cylinder (127hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Si":  { engine:"2.0L 4-cylinder (160hp)", drivetrain:"FWD", transmission:"Manual", note:"Hatchback returns. This shares its EP3 platform with the Euro/JDM Civic Type R of the same generation, though the US never got that Type R." },
          },
          colors:[
            {name:"Nighthawk Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Satin Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Rallye Red (Red)",hex:"#C8102E"},
            {name:"Vivid Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "8th Gen FG/FA — Si Coupe/Sedan (2006-2011)":{
          years:["2006","2007","2008","2009","2010","2011"],
          trims:{
            "DX":       { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "LX":       { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "EX":       { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Si Coupe": { engine:"2.0L 4-cylinder (197hp)", drivetrain:"FWD", transmission:"Manual" },
            "Si Sedan": { engine:"2.0L 4-cylinder (197hp)", drivetrain:"FWD", transmission:"Manual" },
          },
          colors:[
            {name:"Rallye Red (Red)",hex:"#C8102E"},
            {name:"Nighthawk Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Taffeta White (White)",hex:"#F5F5F5"},
            {name:"Vivid Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "9th Gen FB/FG — Si Coupe/Sedan (2012-2015)":{
          years:["2012","2013","2014","2015"],
          trims:{
            "LX":       { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmission:"Automatic" },
            "EX":       { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmission:"Automatic" },
            "EX-L":     { engine:"1.8L 4-cylinder (140hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Si Coupe": { engine:"2.4L 4-cylinder (201hp)", drivetrain:"FWD", transmission:"Manual" },
            "Si Sedan": { engine:"2.4L 4-cylinder (201hp)", drivetrain:"FWD", transmission:"Manual" },
          },
          colors:[
            {name:"Rallye Red (Red)",hex:"#C8102E"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Taffeta White (White)",hex:"#F5F5F5"},
            {name:"Dyno Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "10th Gen FC/FK — Si & Type R (2016-2021)":{
          years:["2016","2017","2018","2019","2020","2021"],
          trims:{
            "LX":             { engine:"2.0L 4-cylinder (158hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "EX":             { engine:"1.5L Turbocharged 4-cylinder (174hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "EX-L":           { engine:"1.5L Turbocharged 4-cylinder (174hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Touring":        { engine:"1.5L Turbocharged 4-cylinder (174hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Si Sedan":       { engine:"1.5L Turbocharged 4-cylinder (205hp)", drivetrain:"FWD", transmission:"Manual", note:"Si and Type R joined the lineup for 2017 — the regular trims launched a year earlier for 2016." },
            "Si Coupe":       { engine:"1.5L Turbocharged 4-cylinder (205hp)", drivetrain:"FWD", transmission:"Manual" },
            "Type R":         { engine:"2.0L Turbocharged 4-cylinder (306hp)", drivetrain:"FWD", transmission:"Manual", note:"The first Civic Type R ever officially sold in the US — every prior Type R generation was JDM or Euro-only." },
            "Type R Limited": { engine:"2.0L Turbocharged 4-cylinder (306hp)", drivetrain:"FWD", transmission:"Manual" },
          },
          colors:[
            {name:"Rallye Red (Red)",hex:"#C8102E"},
            {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
            {name:"Aegean Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Championship White (White)",hex:"#F0F0F0"},
            {name:"Boost Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "11th Gen FE/FL — Si & Type R (2022-2026)":{
          years:["2022","2023","2024","2025","2026"],
          trims:{
            "LX":     { engine:"2.0L 4-cylinder (158hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Sport":  { engine:"2.0L 4-cylinder (158hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
            "EX-L":   { engine:"1.5L Turbocharged 4-cylinder (180hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Touring":{ engine:"1.5L Turbocharged 4-cylinder (180hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Si":     { engine:"1.5L Turbocharged 4-cylinder (200hp)", drivetrain:"FWD", transmission:"Manual", note:"Sedan only this generation — the Si coupe was discontinued." },
            "Type R": { engine:"2.0L Turbocharged 4-cylinder (315hp)", drivetrain:"FWD", transmission:"Manual" },
          },
          colors:[
            {name:"Rallye Red (Red)",hex:"#C8102E"},
            {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
            {name:"Boost Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Championship White (White)",hex:"#F0F0F0"},
          ],
        },
      },
    },
  },
  "Mazda": {
    "CX-5": {
      years:["2021","2022","2023","2024","2025"],
      trims:{
        "Sport":               { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Touring":             { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Carbon Edition":      { engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Carbon Edition Turbo":{ engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Grand Touring":       { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Grand Touring Reserve":{ engine:"2.5L Turbocharged 4-cylinder (227hp)", drivetrain:"AWD", transmission:"Automatic" },
        "Signature":           { engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD", transmission:"Automatic" },
      },
      colors:[
        {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
        {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
        {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
        {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Polymetal Gray Metallic (Dark Gray)",hex:"#4A4E52"},
        {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
        {name:"Eternal Blue Mica (Blue)",hex:"#1E4B8E"},
        {name:"Rhodium White Metallic (White)",hex:"#E8E8E8"},
      ],
    },
    "Mazda3": {
      years:["2019","2020","2021","2022","2023"],
      trims:{
        "2.5 S Sedan":                  { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD", transmission:"Automatic" },
        "Select Sedan":                 { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
        "Preferred Sedan":              { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
        "Premium Sedan":                { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
        "2.5 Turbo Sedan":              { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic" },
        "2.5 Turbo Premium Plus Sedan": { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic" },
        "2.5 S Hatchback":                  { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD", transmission:"Automatic" },
        "Select Hatchback":                 { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
        "Preferred Hatchback":              { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
        "Premium Hatchback":                { engine:"2.5L 4-cylinder (186hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"] },
        "2.5 Turbo Hatchback":              { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic" },
        "2.5 Turbo Premium Plus Hatchback": { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic" },
      },
      colors:[
        {name:"Black Mica (Black)",hex:"#1A1A1A"},
        {name:"Rally White (White)",hex:"#F5F5F5"},
        {name:"Sunlight Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Titanium Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Strato Blue Mica (Blue)",hex:"#1B3A6B"},
        {name:"Winning Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Velocity Red Mica (Red)",hex:"#9B1B30"},
        {name:"Lava Orange Mica (Orange)",hex:"#C85A1E"},
        {name:"Solar Yellow Mica (Yellow)",hex:"#F5C800"},
        {name:"Nordic Green Mica (Green)",hex:"#2E5A3A"},
        {name:"Starlight Green Mica (Light Green)",hex:"#7EC850"},
        {name:"Shimmering Sand Metallic (Sand)",hex:"#C8B89A"},
        {name:"Sherbet Green Metallic (Green)",hex:"#5A8A5A"},
        {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
        {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Polymetal Gray Metallic (Dark Gray)",hex:"#4A4E52"},
        {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
        {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
        {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
      ],
    },
    "Mazda3 (2004-2009)": {
      years:["2004","2005","2006","2007","2008","2009"],
      trims:{
        "i Sedan":     { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "s Sedan":     { engine:"2.3L 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "i Hatchback": { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "s Hatchback": { engine:"2.3L 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
      },
      colors:[
        {name:"Black Mica (Black)",hex:"#1A1A1A"},
        {name:"Rally White (White)",hex:"#F5F5F5"},
        {name:"Sunlight Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Titanium Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Strato Blue Mica (Blue)",hex:"#1B3A6B"},
        {name:"Winning Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Velocity Red Mica (Red)",hex:"#9B1B30"},
      ],
    },
    "MX-5 Miata": {
      generations:{
        "NA6 (1990-1993)":{
          years:["1990","1991","1992","1993"],
          trims:{
            "Base":    { engine:"1.6L 4-cylinder (115hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Classic Red (Red)",hex:"#C8102E"},
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Montego Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"Silver Stone Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "NA8 (1994-1997)":{
          years:["1994","1995","1996","1997"],
          trims:{
            "Base":      { engine:"1.8L 4-cylinder (130hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "R Package": { engine:"1.8L 4-cylinder (133hp)", drivetrain:"RWD", transmission:"Manual" },
          },
          colors:[
            {name:"Classic Red (Red)",hex:"#C8102E"},
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Montego Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"Marina Green Mica (Green)",hex:"#2E5A3A"},
            {name:"Merlot Mica (Dark Red)",hex:"#5A1B2E"},
          ],
        },
        "NB1 (1999-2000)":{
          years:["1999","2000"],
          trims:{
            "Base": { engine:"1.8L 4-cylinder (140hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "LS":   { engine:"1.8L 4-cylinder (140hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Classic Red (Red)",hex:"#C8102E"},
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Emerald Mica (Green)",hex:"#2E5A3A"},
            {name:"Montego Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"Sunburst Yellow (Yellow)",hex:"#F5C800"},
          ],
        },
        "NB2 (2001-2005)":{
          years:["2001","2002","2003","2004","2005"],
          trims:{
            "Base":       { engine:"1.8L 4-cylinder (142hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "LS":         { engine:"1.8L 4-cylinder (142hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Mazdaspeed": { engine:"1.8L Turbocharged 4-cylinder (178hp)", drivetrain:"RWD", transmission:"Manual", note:"2004 only — one of only two factory turbo Miatas ever made." },
          },
          colors:[
            {name:"Classic Red (Red)",hex:"#C8102E"},
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Titanium Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Velocity Red Mica (Red)",hex:"#9B1B30"},
            {name:"Winning Blue Metallic (Blue)",hex:"#1E4B8E"},
          ],
        },
        "NC1 (2006-2008)":{
          years:["2006","2007","2008"],
          trims:{
            "Sport":         { engine:"2.0L 4-cylinder (170hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Touring":       { engine:"2.0L 4-cylinder (170hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Grand Touring": { engine:"2.0L 4-cylinder (170hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"True Red (Red)",hex:"#C8102E"},
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Titanium Gray Mica (Gray)",hex:"#6B6E6F"},
            {name:"Velocity Red Mica (Red)",hex:"#9B1B30"},
            {name:"Galaxy Gray Mica (Gray)",hex:"#5A5F63"},
          ],
        },
        "NC2 (2009-2015)":{
          years:["2009","2010","2011","2012","2013","2014","2015"],
          trims:{
            "Sport":         { engine:"2.0L 4-cylinder (167hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Club":          { engine:"2.0L 4-cylinder (167hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Touring":       { engine:"2.0L 4-cylinder (167hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Grand Touring": { engine:"2.0L 4-cylinder (167hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"True Red (Red)",hex:"#C8102E"},
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Crystal White Pearl (White)",hex:"#F0F0F0"},
            {name:"Dolphin Gray Mica (Gray)",hex:"#8A8D8F"},
            {name:"Liquid Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "ND1 (2016-2018)":{
          years:["2016","2017","2018"],
          trims:{
            "Sport":         { engine:"2.0L 4-cylinder (155hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Club":          { engine:"2.0L 4-cylinder (155hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Grand Touring": { engine:"2.0L 4-cylinder (155hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Ceramic Metallic (Silver)",hex:"#C8C8C8"},
          ],
        },
        "ND2 (2019-2023)":{
          years:["2019","2020","2021","2022","2023"],
          trims:{
            "Sport":         { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Club":          { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Grand Touring": { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Ceramic Metallic (Silver)",hex:"#C8C8C8"},
            {name:"Zircon Sand Metallic (Tan)",hex:"#C8B89A"},
          ],
        },
      },
    },
  },
  "Scion": {
    "tC": {
      generations:{
        "First Generation (2005-2010)":{
          years:["2005","2006","2007","2008","2009","2010"],
          trims:{
            "Base": { engine:"2.4L 4-cylinder (161hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Spec": { engine:"2.4L 4-cylinder (161hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"2007-2008 only — stripped-down trim aimed at the tuner market, steel wheels instead of alloys, fewer standard features." },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black Sand Pearl (Black)",hex:"#1A1A1A"},
            {name:"Flint Mica (Gray)",hex:"#5A5F63"},
            {name:"Classic Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Sizzling Crimson Mica (Red)",hex:"#9B1B30"},
          ],
        },
        "Second Generation (2011-2013)":{
          years:["2011","2012","2013"],
          trims:{
            "Base": { engine:"2.5L 4-cylinder (180hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black Sand Pearl (Black)",hex:"#1A1A1A"},
            {name:"Nautical Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Magnetic Gray Mica (Gray)",hex:"#6B6E6F"},
            {name:"Barcelona Red Metallic (Red)",hex:"#C8102E"},
          ],
        },
        "Facelift (2014-2016)":{
          years:["2014","2015","2016"],
          trims:{
            "Base": { engine:"2.5L 4-cylinder (179hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Revised front end with a more aggressive grille, LED accent lighting, and an available 6-speed sequential sport-shift automatic borrowed from the Scion FR-S. Final generation before Scion was folded into Toyota after 2016." },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black Sand Pearl (Black)",hex:"#1A1A1A"},
            {name:"Blizzard Pearl (White)",hex:"#F0F0F0"},
            {name:"Cosmic Gray Mica (Gray)",hex:"#5A5F63"},
            {name:"Hot Lava (Orange)",hex:"#E8601C"},
          ],
        },
      },
    },
  },
  "Subaru": {
    "Ascent": {
      years:["2019","2020","2021","2022","2023","2024","2025"],
      trims:{
        "Base":         { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "Premium":      { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "Limited":      { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "Touring":      { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "Onyx Edition": { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
      },
      colors:[
        {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
        {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
        {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Magnetite Gray Metallic (Gray)",hex:"#5A5F63"},
        {name:"Crimson Red Pearl (Red)",hex:"#9B1B30"},
        {name:"Abyss Blue Pearl (Blue)",hex:"#1B2A4A"},
        {name:"Autumn Green Metallic (Green)",hex:"#3B5A3A"},
        {name:"Brilliant Bronze Metallic (Bronze)",hex:"#B87333"},
      ],
    },
    "BRZ": {
      years:["2013","2014","2015","2016","2017","2021","2022","2023"],
      trims:{
        "Premium": { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
        "Limited": { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
        "tS":      { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD", transmission:"Manual" },
      },
      colors:[
        {name:"World Rally Blue Pearl (Blue)",hex:"#003893"},
        {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
        {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
        {name:"Magnetite Gray Metallic (Gray)",hex:"#5A5F63"},
      ],
    },
    "Forester XT": {
      years:["2014","2015","2016","2017","2018"],
      trims:{
        "Premium": { engine:"2.0L Turbocharged 4-cylinder (250hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
        "Touring": { engine:"2.0L Turbocharged 4-cylinder (250hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
      },
      colors:[
        {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
        {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
        {name:"Wilderness Green Metallic (Green)",hex:"#3B5A3A"},
      ],
    },
    "WRX": {
      generations:{
        "Bugeye (2002-2003)":{
          years:["2002","2003"],
          trims:{
            "WRX": { engine:"2.0L Turbocharged 4-cylinder (227hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Aspen White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Steel Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "Blobeye (2004-2005)":{
          years:["2004","2005"],
          trims:{
            "WRX": { engine:"2.0L Turbocharged 4-cylinder (227hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "STI": { engine:"2.5L Turbocharged 4-cylinder (300hp)", drivetrain:"AWD", transmission:"Manual", note:"First WRX STI officially sold in the US market." },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Aspen White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Titanium Gray Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
        "Hawkeye (2006-2007)":{
          years:["2006","2007"],
          trims:{
            "WRX": { engine:"2.5L Turbocharged 4-cylinder (230hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "STI": { engine:"2.5L Turbocharged 4-cylinder (293hp)", drivetrain:"AWD", transmission:"Manual" },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Aspen White (White)",hex:"#F5F5F5"},
            {name:"Obsidian Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Spark Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "GE/GH/GR (2008-2014)":{
          years:["2008","2009","2010","2011","2012","2013","2014"],
          trims:{
            "WRX Sedan":     { engine:"2.5L Turbocharged 4-cylinder (265hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "WRX Hatchback": { engine:"2.5L Turbocharged 4-cylinder (265hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "STI":           { engine:"2.5L Turbocharged 4-cylinder (305hp)", drivetrain:"AWD", transmission:"Manual", note:"Hatchback-only until the 2011 facelift added a widebody STI sedan." },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Lightning Red (Red)",hex:"#C8102E"},
            {name:"Dark Gray Metallic (Gray)",hex:"#5A5F63"},
          ],
        },
        "VA (2015-2021)":{
          years:["2015","2016","2017","2018","2019","2020","2021"],
          trims:{
            "Base":        { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "Premium":     { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "Limited":     { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "STI":         { engine:"2.5L Turbocharged 4-cylinder (310hp)", drivetrain:"AWD", transmission:"Manual" },
            "STI Limited": { engine:"2.5L Turbocharged 4-cylinder (310hp)", drivetrain:"AWD", transmission:"Manual" },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Magnetite Gray Metallic (Gray)",hex:"#5A5F63"},
          ],
        },
        "VB (2022-2026)":{
          years:["2022","2023","2024","2025","2026"],
          trims:{
            "Base":       { engine:"2.4L Turbocharged 4-cylinder (271hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "Premium":    { engine:"2.4L Turbocharged 4-cylinder (271hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "Limited":    { engine:"2.4L Turbocharged 4-cylinder (271hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (CVT)"] },
            "GT":         { engine:"2.4L Turbocharged 4-cylinder (271hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
            "tS":         { engine:"2.4L Turbocharged 4-cylinder (271hp)", drivetrain:"AWD", transmission:"Manual", note:"Performance-focused trim with Brembo brakes and adaptive suspension — the closest thing to an STI successor since Subaru discontinued the STI nameplate in the US after the 2021 model year." },
          },
          colors:[
            {name:"WR Blue Pearl (Blue)",hex:"#003893"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Magnetite Gray Metallic (Gray)",hex:"#5A5F63"},
            {name:"Solar Orange Pearl (Orange)",hex:"#E8601C"},
          ],
        },
      },
    },
  },
  "Toyota": {
    "4Runner": {
      generations:{
        "3rd Gen (1996-2002)":{
          years:["1996","1997","1998","1999","2000","2001","2002"],
          trims:{
            "SR5":           { engines:["3.4L V6 (183hp)","2.7L 4-cylinder (150hp)"], transmission:"Automatic" },
            "Limited":       { engine:"3.4L V6 (183hp)", transmission:"Automatic" },
            "Sport Edition": { engine:"3.4L V6 (183hp)", transmission:"Automatic" },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Millennium Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Imperial Jade Mica (Green)",hex:"#2E5A3A"},
            {name:"Horizon Blue Metallic (Blue)",hex:"#4A7B9D"},
            {name:"Radiant Red (Red)",hex:"#C8102E"},
            {name:"Black / Black Onyx (Black)",hex:"#111111"},
            {name:"Natural White (White)",hex:"#F5F5F5"},
          ],
        },
        "4th Gen (2003-2009)":{
          years:["2003","2004","2005","2006","2007","2008","2009"],
          trims:{
            "SR5":     { engine:"4.0L V6 (236hp)", transmission:"Automatic" },
            "Sport":   { engine:"4.0L V6 (236hp)", transmission:"Automatic" },
            "Limited": { engine:"4.0L V6 (236hp)", transmission:"Automatic", note:"A 4.7L V8 (235hp) was optional on Limited — less power than the V6 but far more low-end torque for towing." },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Titanium Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Salsa Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Shoreline Blue Pearl (Blue)",hex:"#4A7B9D"},
            {name:"Black (Black)",hex:"#111111"},
            {name:"Natural White (White)",hex:"#F5F5F5"},
          ],
        },
        "5th Gen (2010-2024)":{
          years:["2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"],
          trims:{
            "SR5":       { engine:"4.0L V6 (270hp)", transmission:"Automatic" },
            "Trail":     { engine:"4.0L V6 (270hp)", transmission:"Automatic", note:"Off-road focused trim with a locking rear differential and Crawl Control — typically 4WD only." },
            "Limited":   { engine:"4.0L V6 (270hp)", transmission:"Automatic" },
            "TRD Pro":   { engine:"4.0L V6 (270hp)", transmission:"Automatic", note:"Added for the 2010 model year — Fox internal-bypass shocks, unique styling, off-road focused, typically 4WD only." },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Classic Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Barcelona Red Metallic (Red)",hex:"#9B1B30"},
            {name:"Magnetic Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Nautical Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Black (Black)",hex:"#111111"},
            {name:"Super White (White)",hex:"#F5F5F5"},
          ],
        },
        "6th Gen (2025-2026)":{
          years:["2025","2026"],
          trims:{
            "SR5":         { engine:"2.4L Turbocharged 4-cylinder (278hp)", transmission:"Automatic", note:"All-new generation on Toyota's TNGA-F platform — first major redesign since 2010, and the first ever turbo 4Runner." },
            "TRD Off-Road":{ engine:"2.4L Turbocharged 4-cylinder (278hp)", transmission:"Automatic" },
            "Limited":     { engine:"2.4L Turbocharged 4-cylinder (278hp)", transmission:"Automatic" },
            "TRD Pro":     { engine:"2.4L Hybrid Turbocharged 4-cylinder (326hp)", transmission:"Automatic", note:"i-FORCE MAX hybrid powertrain — most power ever offered in a 4Runner. Typically 4WD only." },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Blueprint (Blue)",hex:"#1E4B8E"},
            {name:"Terra (Orange-Brown)",hex:"#B87333"},
            {name:"Solar Octane (Orange)",hex:"#E8601C"},
            {name:"Midnight Black Metallic (Black)",hex:"#111111"},
            {name:"Wind Chill Pearl (White)",hex:"#F0F0F0"},
          ],
        },
      },
    },
  },
  "Volkswagen": {
    "Golf GTI": {
      years:["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "S":        { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
        "SE":       { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
        "Autobahn": { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
        "Rabbit":   { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
      },
      colors:[
        {name:"Deep Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Pure White (White)",hex:"#F5F5F5"},
        {name:"Tornado Red (Red)",hex:"#C8102E"},
        {name:"Reflex Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Lapiz Blue Metallic (Blue)",hex:"#1E4B8E"},
      ],
    },
    "Golf R": {
      years:["2015","2016","2017","2018","2019","2022","2023"],
      trims:{
        "Base":      { engine:"2.0L Turbocharged 4-cylinder (292hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (DSG)"] },
        "DCC & Nav": { engine:"2.0L Turbocharged 4-cylinder (292hp)", drivetrain:"AWD", transmissions:["Manual","Automatic (DSG)"] },
      },
      colors:[
        {name:"Deep Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Pure White (White)",hex:"#F5F5F5"},
        {name:"Lapiz Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Reflex Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Ravenna Green Metallic (Green)",hex:"#2E5A3A"},
      ],
    },
    "Jetta GLI": {
      years:["2019","2020","2021","2022","2023"],
      trims:{
        "S":                { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
        "Autobahn":         { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
        "35th Anniversary": { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (DSG)"] },
      },
      colors:[
        {name:"Deep Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Pure White (White)",hex:"#F5F5F5"},
        {name:"Tornado Red (Red)",hex:"#C8102E"},
        {name:"Platinum Gray Metallic (Gray)",hex:"#8A8D8F"},
      ],
    },
  },
};


// Torque specs — same pattern as CATALOG, populated car by car once verified.
// Shape once filled in: { partName: "Oil Drain Plug", spec: "18", unit: "ft-lbs", notes: "..." }
const TORQUE_SPECS = {};

const CATALOG = {
  "Fiat": {
    "500 Abarth": [
      {brand:"EuroCompulsion",category:"Intake — V4.1 Full System",part:"V4.1 Full Intake System",note:"Complete intake system replacement. Full system from turbo to airbox."},
      {brand:"EuroCompulsion",category:"Intake — V3 Pipe Upgrade",part:"V3 Turbo-to-Filter Pipe",note:"Replaces the pipe from turbo to stock filter with a larger diameter hose. Keeps your stock air filter."},
      {brand:"EuroCompulsion",category:"Intake — V2.1 Air Injection",part:"V2.1 Direct Air Injection",note:"Removes stock filter entirely. Hot air intake that runs up the motor and draws air from the engine bay."},
      {brand:"EuroCompulsion",category:"Front Mount Intercooler",part:"FMIC Kit",note:"Relocates from side-mount (stock) to front of condenser. Full repiping required — not a direct swap."},
      {brand:"EuroCompulsion",category:"Wastegate Actuator",part:"Upgraded Wastegate Actuator"},
      {brand:"EuroCompulsion",category:"Downpipe / Hi-Flow Cat",part:"Catted Downpipe"},
      {brand:"EuroCompulsion",category:"Performance Tune",part:"ECU Flash / Stage Tune"},
      {brand:"EuroCompulsion",category:"Oil Catch Can",part:"Oil Catch Can Kit"},
      {brand:"Forge Motorsports",category:"Front Mount Intercooler",part:"FMIC Kit",note:"Relocates from side-mount (stock) to front of condenser. Full repiping required."},
      {brand:"Forge Motorsports",category:"Blow-Off / Diverter Valve",part:"Blow-Off Valve (BOV)"},
      {brand:"Forge Motorsports",category:"Wastegate Actuator",part:"Upgraded Wastegate Actuator"},
      {brand:"Bosch",category:"Fuel Injectors",part:"Upgraded Fuel Injectors"},
      {brand:"Ignition Projects",category:"Ignition Coils",part:"Upgraded Ignition Coils",note:"Replaces coil packs — separate from spark plugs."},
      {brand:"NGK",category:"Spark Plugs",part:"Iridium IX Spark Plugs",note:"Stage 1 gap: 0.028\". Stage 2 with bigger injectors: 0.024\"."},
      {brand:"NGK",category:"Spark Plugs",part:"Laser Iridium Spark Plugs"},
      {brand:"Ragazzon",category:"Full Turbo-Back Exhaust",part:"Full Turbo-Back System",note:"Runs from turbo all the way to exit."},
      {brand:"Ragazzon",category:"Mid Pipe",part:"Mid Pipe Section"},
      {brand:"Ragazzon",category:"Axleback Exhaust",part:"Axleback System"},
      {brand:"Magnaflow",category:"Downpipe / Hi-Flow Cat",part:"Catted Downpipe"},
      {brand:"Neuspeed",category:"Intake — P-Flo",part:"P-Flo Intake Kit",note:"Direct air injection style, similar to EC V2.1."},
      {brand:"Neuspeed",category:"Axleback Exhaust",part:"Axleback Exhaust",note:"Listed for 500 series — verify Abarth fitment."},
      {brand:"Neuspeed",category:"Mid Pipe",part:"Performance Mid Pipe",note:"Listed for 500 series — verify Abarth fitment."},
      {brand:"Neuspeed",category:"Suspension / Lowering Springs",part:"Lowering Springs"},
      {brand:"Neuspeed",category:"Sway Bars",part:"Front Sway Bar"},
      {brand:"Neuspeed",category:"Brake Lines",part:"Stainless Steel Brake Lines"},
      {brand:"EBC Brakes",category:"Brake Pads",part:"Yellowstuff Performance Pads",note:"Street/track compound."},
      {brand:"EBC Brakes",category:"Brake Pads",part:"Redstuff Performance Pads",note:"Low-dust street compound."},
      {brand:"EBC Brakes",category:"Brake Rotors",part:"Slotted Rotors"},
      {brand:"EBC Brakes",category:"Brake Rotors",part:"Standard Rotors"},
      {brand:"Wilwood",category:"Brake Pads",part:"Front Brake Pads"},
      {brand:"Wilwood",category:"Brake Pads",part:"Rear Brake Pads"},
      {brand:"Wilwood",category:"Front Rotors",part:"Black Front Rotor — Plain"},
      {brand:"Wilwood",category:"Front Rotors",part:"Black Front Rotor — Slotted/Drilled"},
      {brand:"Wilwood",category:"Front Rotors",part:"Red Front Rotor — Plain"},
      {brand:"Wilwood",category:"Front Rotors",part:"Red Front Rotor — Slotted/Drilled"},
      {brand:"Wilwood",category:"Rear Rotors",part:"Black Rear Rotor — Plain"},
      {brand:"Wilwood",category:"Rear Rotors",part:"Black Rear Rotor — Slotted/Drilled"},
      {brand:"Wilwood",category:"Rear Rotors",part:"Red Rear Rotor — Plain"},
      {brand:"Wilwood",category:"Rear Rotors",part:"Red Rear Rotor — Slotted/Drilled",note:"Budget ~$1,500 per axle. Verify wheel clearance — typically needs 17\"+ wheels."},
      {brand:"Cravenspeed",category:"Short Shifter",part:"Short Throw Shifter"},
      {brand:"Cravenspeed",category:"Antenna",part:"Stubby Antenna"},
      {brand:"Mishimoto",category:"Intercooler Hoses",part:"Silicone Intercooler Hose Kit",note:"Works with stock side-mount intercooler only."},
      {brand:"Mishimoto",category:"Oil Catch Can",part:"Oil Catch Can Kit"},
    ],
  },
};

const BRAND_COLORS = {
  "EuroCompulsion":"#E8401C","Forge Motorsports":"#4A8FE8","Ragazzon":"#2E8B57",
  "Magnaflow":"#9B59B6","Neuspeed":"#E8B01C","Bosch":"#E81C4A",
  "Ignition Projects":"#1CE8D4","NGK":"#E86B1C","EBC Brakes":"#E8E040",
  "Wilwood":"#1CE84A","Cravenspeed":"#E81CB0","Mishimoto":"#1C9AE8",
};

const OWNER_EMAIL="mattjustice1999@gmail.com";
const roundToTen=(n)=>Math.round(n/10)*10;
const isLight=(hex)=>{const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return(r*299+g*587+b*114)/1000>160;};

const LS={color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px",display:"block"};
const SS={background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",cursor:"pointer",appearance:"none",WebkitAppearance:"none"};
const IS={background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",boxSizing:"border-box"};
const BP=(on)=>({background:on?"#FF6B2B":"#1C1C1C",color:on?"#0D0D0D":"#444",border:"none",padding:"16px 40px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"3px",cursor:on?"pointer":"not-allowed",borderRadius:"4px",width:"100%",transition:"all 0.2s"});

function BrandDot({brand,size=8}){
  return <span style={{display:"inline-block",width:`${size}px`,height:`${size}px`,borderRadius:"50%",background:BRAND_COLORS[brand]||"#666",marginRight:"6px",flexShrink:0}}/>;
}

function statusColor(item,mileage){
  if(!item.lastMiles&&!item.lastDate) return "unset";
  const diff=((item.lastMiles||0)+item.mileInterval)-mileage;
  if(diff<=0) return "red";
  if(diff<=500) return "yellow";
  return "green";
}
const STATUS_COLORS={green:"#1CE84A",yellow:"#F5C800",red:"#FF3B3B",unset:"#444"};

const rotationNote=(drivetrain)=>{
  if(drivetrain==="FWD") return "Front tires wear faster on FWD cars. Rotate front-to-back: fronts move straight back, rears cross forward to the opposite front position.";
  if(drivetrain==="RWD") return "Rear tires wear faster on RWD cars. Rotate rear-to-front: rears move straight forward, fronts cross backward to the opposite rear position.";
  if(drivetrain&&drivetrain.includes("AWD")) return "AWD cars wear tires evenly. Use the X-pattern: all four tires cross diagonally to the opposite corner.";
  if(drivetrain&&drivetrain.includes("4WD")) return "4WD trucks typically use the X-pattern: all four tires cross diagonally to the opposite corner. Check your owner's manual — some 4WD trucks recommend front-to-back only.";
  return "Rotation pattern depends on drivetrain — check your owner's manual for the recommended pattern.";
};

const MAINTENANCE_ITEMS=[
  {
    key:"oil",
    name:"Engine Oil & Filter",
    mileInterval:5000,
    monthInterval:6,
    notes:(car)=>{
      const turbo=car.engine&&/turbo/i.test(car.engine);
      return turbo?"Turbocharged engine — use full synthetic oil, don't stretch the interval.":"Full synthetic recommended. Check your owner's manual for exact spec.";
    },
  },
  {
    key:"tires",
    name:"Tire Rotation",
    mileInterval:6000,
    monthInterval:6,
    notes:(car)=>rotationNote(car.drivetrain),
  },
  {
    key:"airfilter",
    name:"Engine Air Filter",
    mileInterval:15000,
    monthInterval:12,
    notes:()=>"Check sooner if you drive in dusty or dirty conditions.",
  },
  {
    key:"cabinfilter",
    name:"Cabin Air Filter",
    mileInterval:15000,
    monthInterval:12,
    notes:()=>"Replace sooner if you notice weak airflow or odors from the vents. Usually behind the glovebox.",
  },
  {
    key:"brakepads",
    name:"Brake Pads",
    mileInterval:25000,
    monthInterval:12,
    notes:()=>"Wear varies a lot with driving style — this is a rough interval, not a hard rule. Check pad thickness through the wheel spokes if you can, or have it checked at a tire rotation.",
  },
  {
    key:"brakerotors",
    name:"Brake Rotors",
    mileInterval:50000,
    monthInterval:24,
    notes:()=>"Usually inspected (and resurfaced or replaced if scored/warped) whenever the pads are done. Don't need to be swapped on their own schedule most of the time.",
  },
  {
    key:"coolant",
    name:"Coolant / Antifreeze",
    mileInterval:30000,
    monthInterval:24,
    notes:()=>"Interval depends heavily on coolant type — conventional green coolant is usually ~30k mi, long-life (pink/orange, Dex-Cool style) can run 100k+. Check your owner's manual before assuming.",
  },
  {
    key:"transfluid",
    name:"Transmission Fluid",
    mileInterval:30000,
    monthInterval:24,
    notes:(car)=>{
      if(car.transmission&&/manual/i.test(car.transmission)) return "Manual transmission — typically wants fluid changed every 30-60k mi. Check your owner's manual for the exact spec (some manuals want gear oil, not ATF).";
      if(car.transmission&&/cvt/i.test(car.transmission)) return "CVT — these are pickier about fluid than a traditional automatic. Use the exact CVT fluid your manufacturer specifies, not generic ATF. Many manufacturers say \"lifetime\" but a change around 60k mi is cheap insurance.";
      return "Many automatics list \"lifetime\" fluid, but plenty of mechanics still recommend a change around 60k mi for longevity. Check your owner's manual for the official word.";
    },
  },
];

function CarCard({car,onSelect,onDelete,hasAlerts}){
  const colorHex=car.colorHex||"#1C1C1C";
  const textColor=isLight(colorHex)?"#111":"#fff";
  const maintenanceSetup=car.maintenance&&car.maintenance.length>0;
  return(
    <div style={{background:`linear-gradient(135deg, ${colorHex}CC, ${colorHex}66)`,border:`1px solid ${colorHex}`,borderRadius:"8px",padding:"20px 24px",cursor:"pointer",transition:"transform 0.2s, box-shadow 0.2s",position:"relative",boxShadow:`0 4px 20px ${colorHex}44`}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 30px ${colorHex}66`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 4px 20px ${colorHex}44`;}}
      onClick={()=>onSelect(car)}
    >
      <button onClick={e=>{e.stopPropagation();onDelete(car.id);}} style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.3)",border:"none",color:textColor,cursor:"pointer",fontSize:"16px",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.7}}>×</button>
      {!maintenanceSetup&&<div style={{position:"absolute",top:"12px",right:"44px",color:"#FF3B3B",fontSize:"18px"}}>❗</div>}
      {maintenanceSetup&&hasAlerts&&<div style={{position:"absolute",top:"12px",right:"44px",color:"#F5C800",fontSize:"16px"}}>⚠️</div>}
      <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"24px",color:textColor,marginBottom:"2px",textShadow:"0 1px 3px rgba(0,0,0,0.3)"}}>{car.year} {car.make} {car.model}</div>
      <div style={{color:textColor,fontSize:"12px",opacity:0.85,marginBottom:"2px"}}>{[car.generation,car.trim,car.engine,car.transmission,car.drivetrain].filter(Boolean).join(" · ")}</div>
      <div style={{color:textColor,fontSize:"12px",opacity:0.7,marginBottom:"12px"}}>{car.colorName||"Color not set"} · {(car.mileage||0).toLocaleString()} mi</div>
      {car.build&&car.build.length>0&&(
        <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"8px"}}>
          {car.build.slice(0,4).map((item,i)=><span key={i} style={{background:"rgba(0,0,0,0.3)",color:textColor,fontSize:"10px",padding:"2px 6px",borderRadius:"3px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px"}}>{item.part}</span>)}
          {car.build.length>4&&<span style={{background:"rgba(0,0,0,0.3)",color:textColor,fontSize:"10px",padding:"2px 6px",borderRadius:"3px"}}>+{car.build.length-4} more</span>}
        </div>
      )}
      <div style={{color:textColor,fontSize:"11px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px",opacity:0.7,marginTop:"8px"}}>TAP TO OPEN →</div>
    </div>
  );
}

function AuthScreen(){
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const handle=async()=>{
    setLoading(true);setError("");
    try{const{error}=mode==="login"?await supabase.auth.signInWithPassword({email,password}):await supabase.auth.signUp({email,password});if(error)setError(error.message);}
    catch{setError("Something went wrong.");}finally{setLoading(false);}
  };
  return(
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

function AddCarForm({onSave,onCancel}){
  const [fMake,setFMake]=useState("");
  const [fModel,setFModel]=useState("");
  const [fGeneration,setFGeneration]=useState("");
  const [fYear,setFYear]=useState("");
  const [fTrim,setFTrim]=useState("");
  const [fEngine,setFEngine]=useState("");
  const [fDrivetrain,setFDrivetrain]=useState("");
  const [fTransmission,setFTransmission]=useState("");
  const [fColor,setFColor]=useState(null);

  const makes=Object.keys(VEHICLES);
  const models=fMake?Object.keys(VEHICLES[fMake]):[];
  const rawModelData=fMake&&fModel?VEHICLES[fMake][fModel]:null;
  const hasGenerations=!!rawModelData?.generations;
  const generations=hasGenerations?Object.keys(rawModelData.generations):[];
  const vData=hasGenerations?(fGeneration?rawModelData.generations[fGeneration]:null):rawModelData;

  const years=vData?vData.years:[];
  const trims=vData?Object.keys(vData.trims):[];
  const autoEngine=fTrim&&vData?vData.trims[fTrim]?.engine:"";
  const engineOptions=fTrim&&vData?vData.trims[fTrim]?.engines||[]:[];
  const needsEnginePicker=engineOptions.length>0;
  const autoDrivetrain=fTrim&&vData?vData.trims[fTrim]?.drivetrain:"";
  const trimDrivetrainOptions=fTrim&&vData?vData.trims[fTrim]?.drivetrains||[]:[];
  const modelDrivetrainOptions=vData?.drivetrainOptions||[];
  const drivetrainOptions=trimDrivetrainOptions.length>0?trimDrivetrainOptions:modelDrivetrainOptions;
  const needsDrivetrainPicker=drivetrainOptions.length>0;
  const autoTransmission=fTrim&&vData?vData.trims[fTrim]?.transmission:"";
  const transmissionOptions=fTrim&&vData?vData.trims[fTrim]?.transmissions||[]:[];
  const needsTransmissionPicker=transmissionOptions.length>0;
  const colors=vData?vData.colors:[];
  const canSave=fMake&&fModel&&(hasGenerations?fGeneration:true)&&fYear&&fTrim&&(needsEnginePicker?fEngine:true)&&(needsDrivetrainPicker?fDrivetrain:true)&&(needsTransmissionPicker?fTransmission:true)&&fColor;

  const resetDownstream=()=>{setFGeneration("");setFYear("");setFTrim("");setFEngine("");setFDrivetrain("");setFTransmission("");setFColor(null);};

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

  const InfoBox=({label,value})=>(
    <div style={{marginBottom:"24px",padding:"12px 16px",background:"rgba(255,107,43,0.08)",borderRadius:"4px",borderLeft:"3px solid #FF6B2B",animation:"fadeSlide 0.3s ease forwards"}}>
      <span style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px"}}>{label}</span>
      <div style={{color:"#E8E4DC",fontSize:"14px",marginTop:"4px"}}>{value}</div>
    </div>
  );

  return(
    <div style={{paddingTop:"48px",paddingBottom:"80px"}}>
      <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(32px,6vw,52px)",color:"#E8E4DC",marginBottom:"8px"}}>ADD A CAR</div>
      <p style={{color:"#555",fontSize:"14px",marginBottom:"36px"}}>Pick your car, trim, and color.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"16px",marginBottom:"24px"}}>
        <SW label="MAKE" val={fMake} set={v=>{setFMake(v);setFModel("");resetDownstream();}} opts={makes} placeholder="Select make" disabled={false}/>
        <SW label="MODEL" val={fModel} set={v=>{setFModel(v);resetDownstream();}} opts={models} placeholder="Select model" disabled={!fMake}/>
        {hasGenerations?(
          <SW label="GENERATION" val={fGeneration} set={v=>{setFGeneration(v);setFYear("");setFTrim("");setFEngine("");setFDrivetrain("");setFTransmission("");}} opts={generations} placeholder="Select generation" disabled={!fModel}/>
        ):(
          <SW label="YEAR" val={fYear} set={v=>{setFYear(v);setFTrim("");setFEngine("");setFDrivetrain("");setFTransmission("");}} opts={years} placeholder="Select year" disabled={!fModel}/>
        )}
      </div>
      {hasGenerations&&fGeneration&&(
        <div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}>
          <SW label="YEAR" val={fYear} set={v=>{setFYear(v);setFTrim("");setFEngine("");setFDrivetrain("");setFTransmission("");}} opts={years} placeholder="Select year" disabled={false}/>
        </div>
      )}
      {fYear&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="TRIM" val={fTrim} set={v=>{setFTrim(v);setFEngine("");setFDrivetrain("");setFTransmission("");}} opts={trims} placeholder="Select trim" disabled={false}/></div>}
      {fTrim&&autoEngine&&(
        <InfoBox label="ENGINE" value={autoEngine}/>
      )}
      {fTrim&&needsEnginePicker&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="ENGINE" val={fEngine} set={setFEngine} opts={engineOptions} placeholder="Select engine" disabled={false}/></div>}
      {fTrim&&autoTransmission&&(
        <InfoBox label="TRANSMISSION" value={autoTransmission}/>
      )}
      {fTrim&&needsTransmissionPicker&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="TRANSMISSION" val={fTransmission} set={setFTransmission} opts={transmissionOptions} placeholder="Select transmission" disabled={false}/></div>}
      {fTrim&&autoDrivetrain&&(
        <InfoBox label="DRIVETRAIN" value={autoDrivetrain}/>
      )}
      {fTrim&&needsDrivetrainPicker&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="DRIVETRAIN" val={fDrivetrain} set={setFDrivetrain} opts={drivetrainOptions} placeholder="Select drivetrain" disabled={false}/></div>}
      {fTrim&&colors.length>0&&(
        <div style={{marginBottom:"32px",animation:"fadeSlide 0.3s ease forwards"}}>
          <span style={LS}>SELECT YOUR COLOR</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
            {colors.map(color=>(
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
              <div style={{color:"#E8E4DC",fontSize:"14px"}}>{fYear} {fMake} {fModel} {fGeneration?`(${fGeneration}) `:""}{fTrim}</div>
              <div style={{color:"#888",fontSize:"12px"}}>{fColor.name}{(autoEngine||fEngine)?` · ${autoEngine||fEngine}`:""}{(autoTransmission||fTransmission)?` · ${autoTransmission||fTransmission}`:""}{(autoDrivetrain||fDrivetrain)?` · ${autoDrivetrain||fDrivetrain}`:""}</div>
            </div>
          </div>
        </div>
      )}
      <button onClick={()=>onSave({make:fMake,model:fModel,generation:fGeneration,year:fYear,trim:fTrim,engine:autoEngine||fEngine,transmission:autoTransmission||fTransmission,drivetrain:autoDrivetrain||fDrivetrain,colorName:fColor?.name,colorHex:fColor?.hex,mileage:0,build:[],maintenance:[]})} disabled={!canSave} style={BP(canSave)}>SAVE TO GARAGE</button>
      <button onClick={onCancel} style={{background:"transparent",color:"#555",border:"none",padding:"14px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"14px",letterSpacing:"2px",cursor:"pointer",width:"100%",marginTop:"8px"}}>CANCEL</button>
    </div>
  );
}

export default function ModGuide(){
  const [session,setSession]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [view,setView]=useState("garage");
  const [garage,setGarage]=useState([]);
  const [activeCar,setActiveCar]=useState(null);
  const [activeTab,setActiveTab]=useState("maintenance");
  const [activeBrand,setActiveBrand]=useState(null);
  const [showBell,setShowBell]=useState(false);
  const [editMileage,setEditMileage]=useState(false);
  const [tempMileage,setTempMileage]=useState("");
  const [doneItem,setDoneItem]=useState(null);
  const [doneMileageInput,setDoneMileageInput]=useState("");
  const [wizardStep,setWizardStep]=useState(-1);
  const [wizardMileage,setWizardMileage]=useState("");
  const [wizardAnswers,setWizardAnswers]=useState({});

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setSession(session);setAuthLoading(false);});
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setSession(session);setAuthLoading(false);});
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!session)return;
    supabase.from("garages").select("*").eq("user_id",session.user.id).then(({data,error})=>{
      if(!error&&data)setGarage(data.map(row=>({...row.car_data,id:row.id})));
    });
  },[session]);

  const allAlerts=garage.filter(car=>!car.maintenance||car.maintenance.length===0||car.maintenance.some(i=>statusColor(i,car.mileage||0)==="red"||statusColor(i,car.mileage||0)==="yellow"));

  const saveGarageItem=async(car)=>{const{data,error}=await supabase.from("garages").insert([{user_id:session.user.id,car_data:car}]).select();if(!error&&data)return data[0].id;return null;};
  const updateGarageItem=async(car)=>await supabase.from("garages").update({car_data:car}).eq("id",car.id);
  const deleteGarageItem=async(id)=>{await supabase.from("garages").delete().eq("id",id);setGarage(prev=>prev.filter(c=>c.id!==id));};
  const addCar=async(carData)=>{const id=await saveGarageItem(carData);if(id){setGarage(prev=>[...prev,{...carData,id}]);setView("garage");}};
  const openCar=(car)=>{setActiveCar(car);setActiveBrand(null);setActiveTab("maintenance");setWizardStep(-1);setExpandedHistory(null);setView("car-detail");};
  const syncCar=async(updated)=>{setGarage(prev=>prev.map(c=>c.id===updated.id?updated:c));setActiveCar(updated);await updateGarageItem(updated);};
  const toggleBuildItem=(item)=>{const exists=activeCar.build&&activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);syncCar({...activeCar,build:exists?activeCar.build.filter(b=>!(b.brand===item.brand&&b.part===item.part)):[...(activeCar.build||[]),item]});};

  const startWizard=()=>{setWizardStep(0);setWizardMileage("");setWizardAnswers({});};

  const wizardNext=(skip)=>{
    const item=MAINTENANCE_ITEMS[wizardStep];
    const miles=skip?null:roundToTen(parseInt(wizardMileage)||0);
    setWizardAnswers(prev=>({...prev,[item.key]:miles}));
    setWizardMileage("");
    if(wizardStep<MAINTENANCE_ITEMS.length-1){
      setWizardStep(wizardStep+1);
    }else{
      finishWizard({...wizardAnswers,[item.key]:miles});
    }
  };

  const finishWizard=(answers)=>{
    const maintenance=MAINTENANCE_ITEMS.map(item=>({
      name:item.name,
      mileInterval:item.mileInterval,
      monthInterval:item.monthInterval,
      notes:item.notes(activeCar),
      lastMiles:answers[item.key]||null,
      lastDate:answers[item.key]?new Date().toISOString():null,
      history:answers[item.key]?[{miles:answers[item.key],date:new Date().toISOString()}]:[],
    }));
    const enteredMiles=Object.values(answers).filter(v=>v!==null&&v!==undefined);
    const highestEntered=enteredMiles.length>0?Math.max(...enteredMiles):0;
    const newMileage=Math.max(activeCar.mileage||0,highestEntered);
    syncCar({...activeCar,maintenance,mileage:newMileage});
    setWizardStep(-1);
  };

  const markDone=(item)=>{setDoneItem(item);setDoneMileageInput(String(activeCar.mileage||0));};
  const confirmDone=()=>{
    const miles=roundToTen(parseInt(doneMileageInput)||0);
    const entry={miles,date:new Date().toISOString()};
    syncCar({...activeCar,maintenance:activeCar.maintenance.map(i=>i.name===doneItem.name?{...i,lastMiles:miles,lastDate:entry.date,history:[entry,...(i.history||[])]}:i),mileage:miles});
    setDoneItem(null);
  };
  const [expandedHistory,setExpandedHistory]=useState(null);
  const updateMileage=()=>{syncCar({...activeCar,mileage:roundToTen(parseInt(tempMileage)||0)});setEditMileage(false);};

  const getCatalog=(car)=>CATALOG[car.make]?.[car.model]||[];
  const getTorqueSpecs=(car)=>TORQUE_SPECS[car.make]?.[car.model]||[];
  const getBrands=(car)=>[...new Set(getCatalog(car).map(i=>i.brand))];
  const getCategoriesForBrand=()=>{if(!activeCar||!activeBrand)return{};const cats={};getCatalog(activeCar).filter(i=>i.brand===activeBrand).forEach(i=>{if(!cats[i.category])cats[i.category]=[];cats[i.category].push(i);});return cats;};

  const Tab=({id,label})=>(<button onClick={()=>setActiveTab(id)} style={{background:"none",border:"none",borderBottom:activeTab===id?"2px solid #FF6B2B":"2px solid transparent",color:activeTab===id?"#FF6B2B":"#555",fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"2px",padding:"10px 14px",cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}>{label}</button>);

  if(authLoading)return<div style={{minHeight:"100vh",background:"#0D0D0D",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"4px"}}>LOADING...</div></div>;
  if(!session)return<AuthScreen/>;
  const carColor=activeCar?.colorHex||"#1C1C1C";

  return(
    <div style={{minHeight:"100vh",background:"#0D0D0D",fontFamily:"Inter, sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');@keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes loadBar{0%{transform:translateX(-100%)}100%{transform:translateX(350%)}}select option{background:#1C1C1C}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0D0D0D}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}select:focus,input:focus{outline:1px solid #FF6B2B}`}</style>

      <div style={{borderBottom:"1px solid #1C1C1C",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#0D0D0D",zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}} onClick={()=>setView("garage")}>
          <div style={{width:"8px",height:"8px",background:"#FF6B2B",borderRadius:"50%"}}/>
          <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"4px"}}>MODGUIDE</span>
        </div>
        <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
          <div style={{position:"relative",cursor:"pointer"}} onClick={()=>setShowBell(!showBell)}>
            <span style={{fontSize:"18px"}}>🔔</span>
            {allAlerts.length>0&&<div style={{position:"absolute",top:"-2px",right:"-2px",width:"8px",height:"8px",background:"#FF3B3B",borderRadius:"50%"}}/>}
            {showBell&&(
              <div style={{position:"absolute",top:"30px",right:0,background:"#1C1C1C",border:"1px solid #2A2A2A",borderRadius:"6px",padding:"12px",minWidth:"240px",zIndex:200}}>
                {allAlerts.length===0?<div style={{color:"#555",fontSize:"13px"}}>All good — nothing due</div>:allAlerts.map(car=>(
                  <div key={car.id} style={{marginBottom:"8px"}}>
                    <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"12px",letterSpacing:"2px"}}>{car.year} {car.make} {car.model}</div>
                    {!car.maintenance||car.maintenance.length===0?<div style={{color:"#FF3B3B",fontSize:"12px"}}>❗ Maintenance not set up</div>:car.maintenance.filter(i=>statusColor(i,car.mileage||0)!=="green"&&statusColor(i,car.mileage||0)!=="unset").map(i=><div key={i.name} style={{color:STATUS_COLORS[statusColor(i,car.mileage||0)],fontSize:"12px"}}>• {i.name}</div>)}
                  </div>
                ))}
              </div>
            )}
          </div>
          {view!=="garage"&&view!=="add-car"&&<button onClick={()=>setView("garage")} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px"}}>← Garage</button>}
          {session?.user?.email?.toLowerCase()===OWNER_EMAIL&&(
            <span style={{background:"rgba(255,107,43,0.12)",border:"1px solid #FF6B2B",color:"#FF6B2B",padding:"5px 12px",borderRadius:"4px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"10px",letterSpacing:"2px"}}>OWNER</span>
          )}
          <button onClick={()=>supabase.auth.signOut()} style={{background:"none",border:"1px solid #2A2A2A",color:"#555",padding:"6px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px"}}>LOG OUT</button>
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 24px"}}>
        {view==="garage"&&(
          <div style={{paddingTop:"48px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(36px,7vw,60px)",lineHeight:"1",color:"#E8E4DC",marginBottom:"8px"}}>MY GARAGE</div>
            <p style={{color:"#555",fontSize:"15px",marginBottom:"36px"}}>Your cars. Your build. Your maintenance.</p>
            {garage.length===0?(
              <div style={{border:"1px dashed #2A2A2A",borderRadius:"6px",padding:"48px",textAlign:"center"}}>
                <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"3px",marginBottom:"8px"}}>GARAGE IS EMPTY</div>
                <div style={{color:"#444",fontSize:"14px",marginBottom:"24px"}}>Add your first car to get started</div>
                <button onClick={()=>setView("add-car")} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>+ ADD A CAR</button>
              </div>
            ):(
              <div>
                <div style={{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"24px"}}>
                  {garage.map(car=><CarCard key={car.id} car={car} onSelect={openCar} onDelete={deleteGarageItem} hasAlerts={car.maintenance&&car.maintenance.some(i=>statusColor(i,car.mileage||0)==="red"||statusColor(i,car.mileage||0)==="yellow")}/>)}
                </div>
                <button onClick={()=>setView("add-car")} style={{background:"transparent",color:"#FF6B2B",border:"1px solid #FF6B2B",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px",width:"100%"}}>+ ADD ANOTHER CAR</button>
              </div>
            )}
          </div>
        )}

        {view==="add-car"&&<AddCarForm onSave={addCar} onCancel={()=>setView("garage")}/>}

        {view==="car-detail"&&activeCar&&(
          <div style={{paddingTop:"32px",paddingBottom:"80px"}}>
            <div style={{background:`linear-gradient(135deg, ${carColor}44, ${carColor}11)`,borderRadius:"8px",padding:"20px 24px",marginBottom:"24px",border:`1px solid ${carColor}33`}}>
              <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(22px,4vw,36px)",color:"#E8E4DC",lineHeight:"1.1",marginBottom:"4px"}}>{activeCar.year} {activeCar.make} {activeCar.model}</div>
              <div style={{color:"#888",fontSize:"13px",marginBottom:"4px"}}>{[activeCar.generation,activeCar.trim,activeCar.engine,activeCar.transmission,activeCar.drivetrain].filter(Boolean).join(" · ")}</div>
              <div style={{color:"#888",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
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

            <div style={{borderBottom:"1px solid #1C1C1C",marginBottom:"32px",display:"flex",overflowX:"auto"}}>
              <Tab id="maintenance" label="MAINTENANCE"/>
              <Tab id="specs" label="TORQUE SPECS"/>
              <Tab id="mods" label="MODS"/>
              <Tab id="build" label="MY BUILD"/>
            </div>

            {activeTab==="maintenance"&&(
              <div>
                {!activeCar.maintenance||activeCar.maintenance.length===0?(
                  wizardStep>=0?(
                    <div style={{padding:"24px 0"}}>
                      <div style={{display:"flex",gap:"6px",marginBottom:"28px"}}>
                        {MAINTENANCE_ITEMS.map((_,i)=>(
                          <div key={i} style={{flex:1,height:"4px",borderRadius:"2px",background:i<=wizardStep?"#FF6B2B":"#2A2A2A"}}/>
                        ))}
                      </div>
                      <div style={{color:"#555",fontSize:"12px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px",marginBottom:"8px"}}>STEP {wizardStep+1} OF {MAINTENANCE_ITEMS.length}</div>
                      <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"28px",color:"#E8E4DC",marginBottom:"8px"}}>{MAINTENANCE_ITEMS[wizardStep].name}</div>
                      <div style={{color:"#888",fontSize:"14px",marginBottom:"6px"}}>Recommended every {MAINTENANCE_ITEMS[wizardStep].mileInterval.toLocaleString()} miles</div>
                      <div style={{color:"#666",fontSize:"13px",lineHeight:"1.6",marginBottom:"28px"}}>{MAINTENANCE_ITEMS[wizardStep].notes(activeCar)}</div>
                      <span style={LS}>WHEN WAS THIS LAST DONE?</span>
                      <input style={{...IS,marginBottom:"12px"}} type="number" value={wizardMileage} onChange={e=>setWizardMileage(e.target.value)} placeholder="Enter mileage" autoFocus/>
                      <div style={{display:"flex",gap:"10px"}}>
                        <button onClick={()=>wizardNext(false)} disabled={!wizardMileage} style={{...BP(!!wizardMileage),flex:2}}>{wizardStep<MAINTENANCE_ITEMS.length-1?"SAVE & NEXT":"SAVE & FINISH"}</button>
                        <button onClick={()=>wizardNext(true)} style={{flex:1,background:"transparent",border:"1px solid #2A2A2A",color:"#666",fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"2px",borderRadius:"4px",cursor:"pointer"}}>NOT SURE</button>
                      </div>
                    </div>
                  ):(
                    <div style={{textAlign:"center",padding:"48px 24px"}}>
                      <div style={{fontSize:"48px",marginBottom:"16px"}}>❗</div>
                      <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"22px",color:"#E8E4DC",letterSpacing:"3px",marginBottom:"8px"}}>SET UP MAINTENANCE TRACKER</div>
                      <div style={{color:"#555",fontSize:"14px",marginBottom:"32px",maxWidth:"360px",margin:"0 auto 32px"}}>A few quick questions about your {activeCar.year} {activeCar.make} {activeCar.model} — oil, tires, filters, brakes, coolant, and transmission fluid.</div>
                      <button onClick={startWizard} style={{background:"#FF6B2B",color:"#0D0D0D",border:"none",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px"}}>START SETUP</button>
                    </div>
                  )
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
                      const history=item.history||[];
                      const isExpanded=expandedHistory===item.name;
                      return(
                        <div key={i} style={{background:"#1C1C1C",border:`1px solid ${sc==="unset"?"#2A2A2A":STATUS_COLORS[sc]+"44"}`,borderRadius:"6px",marginBottom:"10px",overflow:"hidden"}}>
                          <div style={{padding:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}}>
                            <div style={{flex:1}}>
                              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:STATUS_COLORS[sc],flexShrink:0}}/>
                                <span style={{color:"#E8E4DC",fontSize:"14px",fontWeight:"500"}}>{item.name}</span>
                              </div>
                              <div style={{color:"#555",fontSize:"12px",paddingLeft:"16px"}}>Every {item.mileInterval.toLocaleString()} mi{item.lastMiles?` · Last: ${item.lastMiles.toLocaleString()} mi · Next: ${milesDue.toLocaleString()} mi`:" · Not logged yet"}</div>
                              {item.notes&&<div style={{color:"#666",fontSize:"11px",paddingLeft:"16px",marginTop:"2px"}}>{item.notes}</div>}
                              {history.length>0&&(
                                <div onClick={()=>setExpandedHistory(isExpanded?null:item.name)} style={{color:"#FF6B2B",fontSize:"11px",paddingLeft:"16px",marginTop:"6px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px"}}>
                                  {isExpanded?"▲ HIDE HISTORY":`▼ VIEW HISTORY (${history.length})`}
                                </div>
                              )}
                            </div>
                            <button onClick={()=>markDone(item)} style={{background:"rgba(28,232,74,0.1)",border:"1px solid rgba(28,232,74,0.3)",color:"#1CE84A",padding:"6px 14px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",whiteSpace:"nowrap",flexShrink:0}}>✓ DONE</button>
                          </div>
                          {isExpanded&&history.length>0&&(
                            <div style={{padding:"0 16px 16px",borderTop:"1px solid #2A2A2A",marginTop:"4px",paddingTop:"12px"}}>
                              {history.map((h,hi)=>(
                                <div key={hi} style={{display:"flex",justifyContent:"space-between",padding:"6px 0 6px 16px",fontSize:"12px",color:"#888",borderBottom:hi<history.length-1?"1px solid #222":"none"}}>
                                  <span>{h.miles.toLocaleString()} mi</span>
                                  <span style={{color:"#555"}}>{new Date(h.date).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <button onClick={()=>{syncCar({...activeCar,maintenance:[]});setWizardStep(-1);}} style={{background:"transparent",border:"1px solid #2A2A2A",color:"#444",padding:"10px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",width:"100%",marginTop:"16px"}}>RESET & REDO SETUP</button>
                  </div>
                )}
              </div>
            )}

            {activeTab==="specs"&&(
              <div>
                {getTorqueSpecs(activeCar).length===0?(
                  <div style={{textAlign:"center",padding:"48px 24px"}}>
                    <div style={{fontSize:"40px",marginBottom:"16px"}}>🔩</div>
                    <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"20px",color:"#E8E4DC",letterSpacing:"3px",marginBottom:"8px"}}>TORQUE SPECS COMING SOON</div>
                    <div style={{color:"#555",fontSize:"14px",marginBottom:"32px",maxWidth:"360px",margin:"0 auto 32px"}}>We're adding verified torque specs car by car — same as maintenance and mods. Nothing here yet for the {activeCar.year} {activeCar.make} {activeCar.model}, but here's what it'll look like once it's populated:</div>
                    <div style={{maxWidth:"420px",margin:"0 auto",opacity:0.35}}>
                      {[["Oil Drain Plug","18 ft-lbs"],["Wheel Lug Nuts","89 ft-lbs"],["Spark Plugs","15 ft-lbs"]].map(([name,val])=>(
                        <div key={name} style={{background:"#1C1C1C",border:"1px solid #2A2A2A",borderRadius:"6px",padding:"14px 16px",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{color:"#C8C4BC",fontSize:"13px"}}>{name}</span>
                          <span style={{color:"#888",fontSize:"13px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px"}}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ):(
                  <div>
                    <span style={LS}>VERIFIED TORQUE SPECS</span>
                    {getTorqueSpecs(activeCar).map((spec,i)=>(
                      <div key={i} style={{background:"#1C1C1C",border:"1px solid #2A2A2A",borderRadius:"6px",padding:"14px 16px",marginBottom:"8px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{color:"#E8E4DC",fontSize:"14px"}}>{spec.partName}</span>
                          <span style={{color:"#FF6B2B",fontSize:"14px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px"}}>{spec.spec} {spec.unit}</span>
                        </div>
                        {spec.notes&&<div style={{color:"#666",fontSize:"12px",marginTop:"6px"}}>{spec.notes}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab==="mods"&&(
              <div>
                {getBrands(activeCar).length===0?(
                  <div style={{textAlign:"center",padding:"48px 0"}}>
                    <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",marginBottom:"8px"}}>NO MODS CATALOG YET</div>
                    <div style={{color:"#444",fontSize:"14px"}}>We're adding more cars all the time.</div>
                  </div>
                ):!activeBrand?(
                  <div>
                    <span style={LS}>SELECT A BRAND</span>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                      {getBrands(activeCar).map(brand=>(
                        <button key={brand} onClick={()=>setActiveBrand(brand)} style={{background:"#1C1C1C",border:`1px solid ${BRAND_COLORS[brand]||"#333"}`,color:"#E8E4DC",padding:"12px 20px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"15px",letterSpacing:"2px",display:"flex",alignItems:"center",gap:"8px",transition:"all 0.15s"}}
                          onMouseEnter={e=>{e.currentTarget.style.background=`${BRAND_COLORS[brand]}22`;}}
                          onMouseLeave={e=>{e.currentTarget.style.background="#1C1C1C";}}
                        ><BrandDot brand={brand}/>{brand}</button>
                      ))}
                    </div>
                  </div>
                ):(
                  <div>
                    <button onClick={()=>setActiveBrand(null)} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px",marginBottom:"20px",padding:0}}>← All Brands</button>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px"}}><BrandDot brand={activeBrand} size={10}/><span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"28px",color:"#E8E4DC",letterSpacing:"2px"}}>{activeBrand}</span></div>
                    {Object.entries(getCategoriesForBrand()).map(([cat,items])=>(
                      <div key={cat} style={{marginBottom:"28px"}}>
                        <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"10px"}}>{cat}</div>
                        {items.map((item,i)=>{const owned=activeCar.build&&activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);return(
                          <div key={i} style={{background:owned?"rgba(255,107,43,0.07)":"#1C1C1C",border:owned?"1px solid rgba(255,107,43,0.4)":"1px solid #2A2A2A",borderRadius:"4px",padding:"14px 16px",marginBottom:"8px"}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"12px"}}>
                              <div style={{flex:1}}>
                                <div style={{color:"#E8E4DC",fontSize:"14px",marginBottom:item.note?"6px":"0"}}>{item.part}</div>
                                {item.note&&<div style={{color:"#666",fontSize:"12px",lineHeight:"1.5"}}>⚠ {item.note}</div>}
                              </div>
                              <button onClick={()=>toggleBuildItem(item)} style={{background:owned?"rgba(255,107,43,0.15)":"#2A2A2A",border:owned?"1px solid #FF6B2B":"1px solid #333",color:owned?"#FF6B2B":"#555",padding:"6px 14px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",whiteSpace:"nowrap",flexShrink:0}}>{owned?"✓ ADDED":"+ ADD"}</button>
                            </div>
                          </div>
                        );})}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

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
                    {(()=>{const byBrand={};activeCar.build.forEach(item=>{if(!byBrand[item.brand])byBrand[item.brand]=[];byBrand[item.brand].push(item);});return Object.entries(byBrand).map(([brand,items])=>(
                      <div key={brand} style={{marginBottom:"24px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}><BrandDot brand={brand} size={10}/><span style={{color:"#E8E4DC",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"2px"}}>{brand}</span></div>
                        {items.map((item,i)=>(
                          <div key={i} style={{background:"#1C1C1C",border:"1px solid rgba(255,107,43,0.2)",borderRadius:"4px",padding:"12px 16px",marginBottom:"6px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div><div style={{color:"#C8C4BC",fontSize:"14px"}}>{item.part}</div><div style={{color:"#555",fontSize:"11px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>{item.category}</div></div>
                            <button onClick={()=>toggleBuildItem(item)} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:"18px"}}>×</button>
                          </div>
                        ))}
                      </div>
                    ));})()}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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