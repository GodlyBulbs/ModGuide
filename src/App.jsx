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
  "Audi": {
    "A4": {
      generations:{
        "B5 (1996-2001)":{
          years:["1996","1997","1998","1999","2000","2001"],
          trims:{
            "1.8T":  { engine:"1.8L Turbocharged 4-cylinder (148-170hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"], note:"First A4 in the US, replacing the Audi 80. 1999 facelift bumped the turbo four's output and added a 30-valve V6." },
            "2.8":   { engine:"2.8L V6 (172hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"], note:"Quattro AWD standard on every V6 model." },
            "S4":    { engine:"2.7L Twin-Turbo V6 (250hp)", drivetrain:"AWD", transmission:"Manual", note:"1999 debut, RS4 wagon (Euro-only, 380hp) also launched this generation but wasn't sold in the US." },
          },
          colors:[
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Cactus Green (Green)",hex:"#2E5A3A"},
            {name:"Ming Blue Pearl (Blue)",hex:"#1E3A6B"},
            {name:"Light Silver (Silver)",hex:"#C0C0C0"},
          ],
        },
        "B6 (2002-2005)":{
          years:["2002","2003","2004","2005"],
          trims:{
            "1.8T":  { engine:"1.8L Turbocharged 4-cylinder (170hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"] },
            "3.0":   { engine:"3.0L V6 (220hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "S4":    { engine:"4.2L V8 (340-344hp)", drivetrain:"AWD", transmission:"Manual" },
          },
          colors:[
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Dolphin Gray (Gray)",hex:"#8A8D8F"},
            {name:"Denim Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Light Silver (Silver)",hex:"#C0C0C0"},
          ],
        },
        "B7 (2006-2008)":{
          years:["2006","2007","2008"],
          trims:{
            "2.0T": { engine:"2.0L Turbocharged 4-cylinder (200hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"], note:"Replaced the old 1.8T — standard 5-speed manual." },
            "3.2":  { engine:"3.2L V6 (255hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "S4":   { engine:"4.2L V8 (340hp)", drivetrain:"AWD", transmission:"Manual" },
            "RS4":  { engine:"4.2L V8 (420hp)", drivetrain:"AWD", transmission:"Manual", note:"2006 debut for this generation — RS4 wagon and cabriolet also existed in Europe, sedan only officially in the US." },
          },
          colors:[
            {name:"Brilliant Black (Black)",hex:"#1A1A1A"},
            {name:"Meteor Gray Pearl (Gray)",hex:"#5A5F63"},
            {name:"Deep Sea Blue Pearl (Blue)",hex:"#1E3A6B"},
            {name:"Ibis White (White)",hex:"#F5F5F5"},
          ],
        },
        "B8 (2009-2016)":{
          years:["2009","2010","2011","2012","2013","2014","2015","2016"],
          trims:{
            "2.0T":  { engine:"2.0L Turbocharged 4-cylinder (211-220hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"], note:"All-new MLB platform — longer wheelbase, more interior room, better weight distribution." },
            "3.2":   { engine:"3.2L V6 (265hp)", drivetrain:"AWD", transmission:"Automatic", note:"V6 was dropped partway through this generation, leaving the 2.0T as the only engine in the regular A4 lineup for later years." },
            "S4":    { engine:"3.0L Supercharged V6 (333hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Phantom Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Monsoon Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Scuba Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Ibis White (White)",hex:"#F5F5F5"},
          ],
        },
        "B9 (2017-2024)":{
          years:["2017","2018","2019","2020","2021","2022","2023","2024"],
          trims:{
            "40 TFSI":{ engine:"2.0L Turbocharged 4-cylinder (190hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "45 TFSI":{ engine:"2.0L Turbocharged 4-cylinder (248-252hp)", drivetrain:"AWD", transmission:"Automatic", note:"2020 facelift year — only engine offered in the regular A4 from here on was this 2.0T, in two output levels." },
            "S4":     { engine:"3.0L Turbocharged V6 (349-354hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Mythos Black Metallic (Black)",hex:"#1A1A1A"},
            {name:"Florett Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Glacier White Metallic (White)",hex:"#F0F0F0"},
            {name:"Ultra Blue Metallic (Blue)",hex:"#1E4B8E"},
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
  "Cadillac": {
    "CTS-V": {
      generations:{
        "1st Gen (2004-2007)":{
          years:["2004","2005","2006","2007"],
          trims:{
            "Base": { engine:"5.7L LS6 V8 (400hp)", drivetrain:"RWD", transmission:"Manual", note:"Sedan only, manual-only — the LS6 was carried over from the Chevrolet Corvette C5 Z06." },
          },
          colors:[
            {name:"Black Raven (Black)",hex:"#1A1A1A"},
            {name:"Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Sable Black (Black)",hex:"#111111"},
            {name:"Light Platinum (Silver)",hex:"#C8C8C8"},
          ],
        },
        "2nd Gen (2009-2015)":{
          years:["2009","2010","2011","2012","2013","2014","2015"],
          trims:{
            "Sedan":{ engine:"6.2L Supercharged LSA V8 (556hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Complete re-engineering, first supercharged CTS-V. Coupe and Sport Wagon body styles added for 2011." },
            "Coupe":{ engine:"6.2L Supercharged LSA V8 (556hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Sport Wagon":{ engine:"6.2L Supercharged LSA V8 (556hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Genuinely rare — a factory 556hp super-wagon, cult following among enthusiasts." },
          },
          colors:[
            {name:"Black Raven (Black)",hex:"#1A1A1A"},
            {name:"Radiant Silver (Silver)",hex:"#C0C0C0"},
            {name:"Crystal Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Stealth Blue (Blue)",hex:"#1E3A6B"},
          ],
        },
        "3rd Gen (2016-2019)":{
          years:["2016","2017","2018","2019"],
          trims:{
            "Base":{ engine:"6.2L Supercharged LT4 V8 (640hp)", drivetrain:"RWD", transmission:"Automatic", note:"Sedan only, automatic only — nicknamed the 'four-door Corvette' since it shares the LT4 with the Corvette Z06. Final generation before the CTS-V was discontinued and replaced by the CT5-V." },
          },
          colors:[
            {name:"Black Raven (Black)",hex:"#1A1A1A"},
            {name:"Crystal White Tricoat (White)",hex:"#F0F0F0"},
            {name:"Velocity Red (Red)",hex:"#C8102E"},
            {name:"Phantom Gray Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
      },
    },
  },
  "Chevrolet": {
    "Camaro": {
      generations:{
        "3rd Gen Tail (1990-1992)":{
          years:["1990","1991","1992"],
          trims:{
            "RS":     { engine:"3.1L V6 (140hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "Z28":    { engines:["5.0L V8 (170hp)","5.7L V8 (245hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"The 5.7L (IROC-Z/Z28 TPI) was the performance engine of this era." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Bright Red (Red)",hex:"#C8102E"},
            {name:"Dark Blue Metallic (Blue)",hex:"#1E3A6B"},
          ],
        },
        "4th Gen (1993-2002)":{
          years:["1993","1994","1995","1996","1997","1998","1999","2000","2001","2002"],
          trims:{
            "Base": { engine:"3.4L V6 (160hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"3.4L V6 for 1993-1994 only, replaced by the 3.8L (200-205hp) starting 1995." },
            "Z28":  { engines:["5.7L LT1 V8 (275hp)","5.7L LS1 V8 (305-325hp)"], drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"LT1 through 1997, then the all-aluminum LS1 arrived for 1998 — a genuinely significant engine upgrade mid-generation." },
            "SS":   { engine:"5.7L LS1 V8 (320-325hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"SS trim added starting 1996 (SLP-built), became a factory Chevrolet option by 1999." },
          },
          colors:[
            {name:"Arctic White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Bright Rally Red (Red)",hex:"#C8102E"},
            {name:"Sebring Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "5th Gen (2010-2015)":{
          years:["2010","2011","2012","2013","2014","2015"],
          trims:{
            "LS":  { engine:"3.6L V6 (300-323hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"After an 8-year hiatus, the Camaro returned for 2010 — first year built on GM's Zeta platform." },
            "SS":  { engine:"6.2L V8 (400-426hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "ZL1": { engine:"6.2L Supercharged V8 (580hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Added for 2012." },
            "Z/28":{ engine:"7.0L V8 (505hp)", drivetrain:"RWD", transmission:"Manual", note:"2014-2015 only — track-focused, no A/C or radio standard to save weight." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Rally Yellow (Yellow)",hex:"#F5C800"},
          ],
        },
        "6th Gen (2016-2024)":{
          years:["2016","2017","2018","2019","2020","2021","2022","2023","2024"],
          trims:{
            "LS/1LS": { engine:"2.0L Turbocharged 4-cylinder (275hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Moved to GM's lighter Alpha platform (shared with Cadillac ATS/CTS). The turbo four was discontinued after 2018." },
            "LT/1LT": { engine:"3.6L V6 (335hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "SS/1SS":{ engine:"6.2L V8 (455hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"] },
            "ZL1":    { engine:"6.2L Supercharged V8 (650hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Final generation — Camaro production ended in December 2023 (2024 Collector's Edition being the send-off)." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Red Hot (Red)",hex:"#C8102E"},
            {name:"Riverside Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Shock (Yellow-Green)",hex:"#B8D848"},
          ],
        },
      },
    },
    "Silverado": {
      generations:{
        "C/K 4th Gen (1990-1998)":{
          years:["1990","1991","1992","1993","1994","1995","1996","1997","1998"],
          trims:{
            "Base":       { engine:"4.3L V6 (160-200hp)", drivetrains:["2WD","4WD"], transmissions:["Manual","Automatic"], note:"Called the C/K, not Silverado — that name didn't become its own model until 1999. 'Silverado' was just a trim level during this era." },
            "Silverado":  { engines:["5.0L V8 (170hp)","5.7L V8 (200-255hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "454 SS":     { engine:"7.4L V8 (230-255hp)", drivetrain:"2WD", transmission:"Automatic", note:"1990-1993 only — legendary factory hot rod truck, only about 17,000 ever made. Genuinely rare and collectible today." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Dark Blue Metallic (Blue)",hex:"#1E3A6B"},
          ],
        },
        "1st Gen (1999-2006)":{
          years:["1999","2000","2001","2002","2003","2004","2005","2006"],
          trims:{
            "Work Truck": { engine:"4.3L V6 (200hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"First year the Silverado became its own model, no longer just a C/K trim." },
            "LS":         { engines:["4.8L V8 (255-270hp)","5.3L V8 (285-295hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "LT":         { engines:["5.3L V8 (285-295hp)","6.0L V8 (300-325hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "SS":         { engine:"6.0L V8 (345hp)", drivetrain:"4WD", transmission:"Automatic", note:"2003-2006 only, extended cab — a genuine factory performance truck, only ~17,000 built." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Dark Gray Metallic (Gray)",hex:"#5A5F63"},
          ],
        },
        "2nd Gen (2007-2013)":{
          years:["2007","2008","2009","2010","2011","2012","2013"],
          trims:{
            "Work Truck": { engine:"4.3L V6 (195hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"Named 2007 North American Truck of the Year." },
            "LS":         { engines:["4.8L V8 (295hp)","5.3L V8 (315-326hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "LTZ":        { engines:["5.3L V8 (315-326hp)","6.2L V8 (403hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Silver Birch Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "3rd Gen (2014-2018)":{
          years:["2014","2015","2016","2017","2018"],
          trims:{
            "Work Truck": { engine:"4.3L V6 (285hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"All-new K2XX platform, first year of the EcoTec3 engine family replacing the old Vortec lineup." },
            "LT":         { engines:["4.3L V6 (285hp)","5.3L V8 (355hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "High Country":{ engine:"6.2L V8 (420hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"Top trim, introduced this generation." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Cajun Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Slate Grey Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
        "4th Gen (2019-2026)":{
          years:["2019","2020","2021","2022","2023","2024","2025","2026"],
          trims:{
            "Work Truck": { engine:"2.7L Turbocharged 4-cylinder (310hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"First-ever turbo four-cylinder base engine on a Silverado. 3.0L Duramax inline-6 diesel also became available this generation." },
            "LT":         { engines:["2.7L Turbocharged 4-cylinder (310hp)","5.3L V8 (355hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "High Country":{ engine:"6.2L V8 (420hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Cherry Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Satin Steel Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
      },
    },
  },
  "Chrysler": {
    "300": {
      generations:{
        "1st Gen (2005-2010)":{
          years:["2005","2006","2007","2008","2009","2010"],
          trims:{
            "Base":  { engine:"2.7L V6 (190hp)", drivetrain:"RWD", transmission:"Automatic", note:"Reintroduced the 300 nameplate and the HEMI V8 to Chrysler for the first time in 50 years. Built on the LX platform, sharing components with the Mercedes E-Class and S-Class." },
            "Touring": { engine:"3.5L V6 (250hp)", drivetrains:["RWD","AWD"], transmission:"Automatic" },
            "300C":  { engine:"5.7L HEMI V8 (340-359hp)", drivetrains:["RWD","AWD"], transmission:"Automatic", note:"359hp starting 2009 when variable valve timing was added." },
            "300C SRT8": { engine:"6.1L HEMI V8 (425hp)", drivetrain:"RWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Brilliant Black Crystal Pearl (Black)",hex:"#1A1A1A"},
            {name:"Bright Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Inferno Red Crystal Pearl (Red)",hex:"#9B1B1B"},
            {name:"Marine Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "2nd Gen (2011-2023)":{
          years:["2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023"],
          trims:{
            "Base":  { engine:"3.6L Pentastar V6 (292-300hp)", drivetrains:["RWD","AWD"], transmission:"Automatic", note:"Long-running generation — final year was 2023, capped off with a limited-run 300C special edition as a send-off before the nameplate was discontinued." },
            "300C":  { engine:"5.7L HEMI V8 (363hp)", drivetrains:["RWD","AWD"], transmission:"Automatic" },
            "300 SRT8/SRT":{ engine:"6.4L HEMI V8 (465-470hp)", drivetrain:"RWD", transmission:"Automatic", note:"Returned for 2012, using the same 392 HEMI shared with other Chrysler Group SRT vehicles." },
          },
          colors:[
            {name:"Gloss Black (Black)",hex:"#1A1A1A"},
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Velvet Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Frostbite (Silver)",hex:"#C0C0C0"},
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
  "GMC": {
    "Sierra": {
      generations:{
        "C/K 1st Gen (1990-1998)":{
          years:["1990","1991","1992","1993","1994","1995","1996","1997","1998"],
          trims:{
            "Base":  { engine:"4.3L V6 (160-200hp)", drivetrains:["2WD","4WD"], transmissions:["Manual","Automatic"], note:"Called the GMC C/K during this era — 'Sierra' was a trim level, not yet its own model name." },
            "SLE":   { engines:["5.0L V8 (170hp)","5.7L V8 (200-255hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "SLT":   { engine:"5.7L V8 (200-255hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Dark Blue Metallic (Blue)",hex:"#1E3A6B"},
          ],
        },
        "2nd Gen (1999-2006)":{
          years:["1999","2000","2001","2002","2003","2004","2005","2006"],
          trims:{
            "SL":  { engine:"4.3L V6 (200hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"First year Sierra became its own model, twinned with the new Chevy Silverado, no longer just a C/K trim." },
            "SLE": { engines:["4.8L V8 (255-270hp)","5.3L V8 (285-295hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "SLT": { engines:["5.3L V8 (285-295hp)","6.0L V8 (300-325hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.0L V8 (325hp)", drivetrain:"4WD", transmission:"Automatic", note:"Denali sub-brand launched on the Sierra — GMC's answer to a luxury trim level, standard AWD." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Dark Gray Metallic (Gray)",hex:"#5A5F63"},
          ],
        },
        "3rd Gen (2007-2013)":{
          years:["2007","2008","2009","2010","2011","2012","2013"],
          trims:{
            "SL":    { engine:"4.3L V6 (195hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "SLE":   { engines:["4.8L V8 (295hp)","5.3L V8 (315-326hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.2L V8 (403hp)", drivetrain:"AWD", transmission:"Automatic", note:"2007 Denali was initially the only half-ton GM truck with the 6.2L V8, paired to a 6-speed automatic." },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Fire Red (Red)",hex:"#C8102E"},
            {name:"Silver Birch Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "4th Gen (2014-2018)":{
          years:["2014","2015","2016","2017","2018"],
          trims:{
            "Base": { engine:"4.3L V6 (285hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"New EcoTec3 engine family and 8-speed automatic (added MY2015 on the 6.2L). Refreshed for 2016." },
            "SLE":  { engines:["4.3L V6 (285hp)","5.3L V8 (355hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.2L V8 (420hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Cardinal Red (Red)",hex:"#9B1B30"},
            {name:"Quicksilver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "5th Gen (2019-2026)":{
          years:["2019","2020","2021","2022","2023","2024","2025","2026"],
          trims:{
            "Base": { engine:"2.7L Turbocharged 4-cylinder (310hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"All-new generation — first turbo four-cylinder base engine, plus a new 3.0L Duramax inline-6 diesel option." },
            "SLE":  { engines:["2.7L Turbocharged 4-cylinder (310hp)","5.3L V8 (355hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "AT4":  { engine:"5.3L V8 (355hp)", drivetrain:"4WD", transmission:"Automatic", note:"Off-road focused trim introduced this generation, GMC's answer to Silverado's Trail Boss." },
            "Denali":{ engine:"6.2L V8 (420hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Cayenne Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Satin Steel Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
      },
    },
    "Yukon": {
      generations:{
        "1st Gen (1992-1999)":{
          years:["1992","1993","1994","1995","1996","1997","1998","1999"],
          trims:{
            "Base": { engine:"5.7L V8 (210hp)", drivetrains:["2WD","4WD"], transmissions:["Manual","Automatic"], note:"Launched 1992 as a 2-door only, replacing the GMC Jimmy. 4-door added 1995, which quickly became the more popular body style — 2-door was gone by 1997." },
            "SLE":  { engine:"5.7L V8 (210hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "SLT":  { engine:"5.7L V8 (210hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"5.7L V8 (255hp)", drivetrain:"4WD", transmission:"Automatic", note:"Denali trim launched for 1999 — the start of GMC's now-signature luxury sub-brand." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Dark Blue Metallic (Blue)",hex:"#1E3A6B"},
          ],
        },
        "2nd Gen (2000-2006)":{
          years:["2000","2001","2002","2003","2004","2005","2006"],
          trims:{
            "SLE":   { engines:["4.8L V8 (255hp)","5.3L V8 (285hp)"], drivetrains:["2WD","4WD"], transmission:"Automatic", note:"All-new GMT800 platform, stronger frame. 2003 mid-cycle refresh added new safety features and updated interior." },
            "SLT":   { engine:"5.3L V8 (285hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.0L V8 (320-325hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Victory Red (Red)",hex:"#C8102E"},
            {name:"Silver Birch Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "3rd Gen (2007-2014)":{
          years:["2007","2008","2009","2010","2011","2012","2013","2014"],
          trims:{
            "SLE":   { engine:"4.8L V8 (290hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"GMT900 platform — more angular styling. A hybrid model was offered 2008-2013, GM's 2-mode hybrid system with a 6.0L V8." },
            "SLT":   { engine:"5.3L V8 (320hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.2L V8 (380hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Fire Red (Red)",hex:"#C8102E"},
            {name:"Quicksilver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "4th Gen (2015-2020)":{
          years:["2015","2016","2017","2018","2019","2020"],
          trims:{
            "SLE":   { engine:"5.3L V8 (355hp)", drivetrains:["2WD","4WD"], transmission:"Automatic", note:"AWD was dropped as an option this generation — RWD or 4WD only. New lightweight aluminum liftgate and hood." },
            "SLT":   { engine:"5.3L V8 (355hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
            "Denali":{ engine:"6.2L V8 (420hp)", drivetrains:["2WD","4WD"], transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Crimson Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Quicksilver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
        "5th Gen (2021-2026)":{
          years:["2021","2022","2023","2024","2025","2026"],
          trims:{
            "SLE":   { engine:"5.3L V8 (355hp)", drivetrain:"4WD", transmission:"Automatic", note:"All-new larger platform, independent rear suspension for the first time. A 3.0L Duramax diesel inline-6 (277hp) joined the lineup too — first diesel Yukon ever." },
            "SLT":   { engine:"5.3L V8 (355hp)", drivetrain:"4WD", transmission:"Automatic" },
            "AT4":   { engine:"6.2L V8 (420hp)", drivetrain:"4WD", transmission:"Automatic", note:"Off-road trim introduced this generation." },
            "Denali":{ engine:"6.2L V8 (420hp)", drivetrain:"4WD", transmission:"Automatic" },
          },
          colors:[
            {name:"Summit White (White)",hex:"#F5F5F5"},
            {name:"Onyx Black (Black)",hex:"#1A1A1A"},
            {name:"Cayenne Red Tintcoat (Red)",hex:"#9B1B30"},
            {name:"Satin Steel Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
      },
    },
  },
  "Honda": {
    "S2000": {
      generations:{
        "AP1 (1999-2003)":{
          years:["1999","2000","2001","2002","2003"],
          trims:{
            "Base": { engine:"2.0L VTEC 4-cylinder (240hp)", drivetrain:"RWD", transmission:"Manual", note:"F20C engine — all-aluminum, revs to a screaming 9,000rpm, one of the highest specific-output naturally-aspirated engines ever put in a production car. Manual only, no automatic ever offered." },
          },
          colors:[
            {name:"Grand Prix White (White)",hex:"#F5F5F5"},
            {name:"Berlina Black (Black)",hex:"#1A1A1A"},
            {name:"Formula Red (Red)",hex:"#C8102E"},
            {name:"Silverstone Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Sebring Silver Metallic (Silver)",hex:"#C8C8C8"},
          ],
        },
        "AP2 (2004-2009)":{
          years:["2004","2005","2006","2007","2008","2009"],
          trims:{
            "Base": { engine:"2.2L VTEC 4-cylinder (237hp)", drivetrain:"RWD", transmission:"Manual", note:"F22C engine — larger displacement than the AP1's F20C but a lower 8,000-8,200rpm redline, traded a little peak power for a broader, more usable torque curve. Traction control added starting 2006." },
          },
          colors:[
            {name:"Grand Prix White (White)",hex:"#F5F5F5"},
            {name:"Berlina Black (Black)",hex:"#1A1A1A"},
            {name:"New Formula Red (Red)",hex:"#C8102E"},
            {name:"Rio Yellow (Yellow)",hex:"#F5C800"},
            {name:"Apex Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
      },
    },
    "Del Sol": {
      years:["1993","1994","1995","1996","1997"],
      trims:{
        "S":    { engine:"1.5L SOHC 4-cylinder (102hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Marketed as the Civic del Sol — targa-top successor to the CR-X. One single generation for its whole run, 1993-1997." },
        "Si":   { engine:"1.6L SOHC VTEC 4-cylinder (125hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
        "VTEC": { engine:"1.6L DOHC VTEC 4-cylinder (160hp)", drivetrain:"FWD", transmission:"Manual", note:"1994-1995 only — the B16A engine, the one enthusiasts actually chase today. Stiffer suspension, bigger brakes, 14-inch wheels." },
      },
      colors:[
        {name:"Frost White (White)",hex:"#F5F5F5"},
        {name:"Milano Red (Red)",hex:"#C8102E"},
        {name:"Black (Black)",hex:"#1A1A1A"},
        {name:"Cyber Green Pearl (Green)",hex:"#3B8A5A"},
        {name:"Vogue Silver Metallic (Silver)",hex:"#C0C0C0"},
      ],
    },
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
  "Jeep": {
    "Wrangler": {
      generations:{
        "YJ Tail (1990-1995)":{
          years:["1990","1991","1992","1993","1994","1995"],
          trims:{
            "Base":{ engine:"2.5L 4-cylinder (117hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"], note:"Controversial square headlights instead of the traditional round Jeep look. Best known for the 4.0L inline-six, added for 1991 — the engine that gave the YJ its reputation for durability." },
            "S":   { engine:"4.0L Inline-6 (177-190hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Sahara":{ engine:"4.0L Inline-6 (177-190hp)", drivetrain:"4WD", transmission:"Manual" },
            "Renegade":{ engine:"4.0L Inline-6 (177-190hp)", drivetrain:"4WD", transmission:"Manual" },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Forest Green (Green)",hex:"#2E5A3A"},
          ],
        },
        "TJ (1997-2006)":{
          years:["1997","1998","1999","2000","2001","2002","2003","2004","2005","2006"],
          trims:{
            "SE":     { engine:"2.5L 4-cylinder (120hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"], note:"Round headlights returned — a genuine crowd-pleaser for Jeep purists. New coil-spring suspension (borrowed from the Grand Cherokee) massively improved ride quality." },
            "Sport":  { engine:"4.0L Inline-6 (181hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Sahara": { engine:"4.0L Inline-6 (181hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Rubicon":{ engine:"4.0L Inline-6 (181hp)", drivetrain:"4WD", transmission:"Manual", note:"Introduced 2003 — factory locking differentials and heavy-duty axles, instant off-road legend status." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Flame Red (Red)",hex:"#C8102E"},
            {name:"Electric Blue (Blue)",hex:"#1C6BE8"},
          ],
        },
        "JK (2007-2018)":{
          years:["2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"],
          trims:{
            "Sport":  { engines:["3.8L V6 (202hp)","3.6L Pentastar V6 (285hp)"], drivetrain:"4WD", transmissions:["Manual","Automatic"], note:"First clean-sheet redesign ever, and the first four-door Wrangler Unlimited. The 3.8L (2007-2011) is known for being underpowered and oil-hungry — the 3.6L Pentastar starting 2012 fixed both problems." },
            "Sahara": { engine:"3.6L Pentastar V6 (285hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Rubicon":{ engine:"3.6L Pentastar V6 (285hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Firecracker Red (Red)",hex:"#C8102E"},
            {name:"Rock Lobster (Orange)",hex:"#E8601C"},
          ],
        },
        "JL (2018-2026)":{
          years:["2018","2019","2020","2021","2022","2023","2024","2025","2026"],
          trims:{
            "Sport":  { engines:["3.6L Pentastar V6 (285hp)","2.0L Turbocharged 4-cylinder (270hp)"], drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Sahara": { engines:["3.6L Pentastar V6 (285hp)","3.0L EcoDiesel V6 (260hp)"], drivetrain:"4WD", transmissions:["Manual","Automatic"], note:"EcoDiesel added for 2020. 4xe plug-in hybrid variant arrived 2021." },
            "Rubicon":{ engine:"3.6L Pentastar V6 (285hp)", drivetrain:"4WD", transmissions:["Manual","Automatic"] },
            "Rubicon 392":{ engine:"6.4L HEMI V8 (470hp)", drivetrain:"4WD", transmission:"Automatic", note:"2021 debut — the first V8 Wrangler ever offered from the factory. A genuinely wild, limited-run product." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Firecracker Red (Red)",hex:"#C8102E"},
            {name:"Sarge Green (Green)",hex:"#3B5A3A"},
            {name:"Hydro Blue Pearl (Blue)",hex:"#4A7B9D"},
          ],
        },
      },
    },
  },
  "Lincoln": {
    "Continental": {
      generations:{
        "8th Gen Tail (1990-1994)":{
          years:["1990","1991","1992","1993","1994"],
          trims:{
            "Base": { engine:"3.8L V6 (140hp)", drivetrain:"FWD", transmission:"Automatic", note:"No V8 offered this generation — FWD only, first US-made car with dual front airbags standard." },
          },
          colors:[
            {name:"White Pearlescent (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Titanium Frost (Silver)",hex:"#C0C0C0"},
            {name:"Wine Red (Red)",hex:"#6B1A1A"},
          ],
        },
        "9th Gen (1995-2002)":{
          years:["1995","1996","1997","1998","1999","2000","2001","2002"],
          trims:{
            "Base":{ engine:"4.6L Northstar V8 (260-275hp)", drivetrain:"FWD", transmission:"Automatic", note:"V8 power returned for the first time since 1987. 1999 bumped output to 275hp. 1998 facelift gave it a Town Car-like front end. Discontinued after 2002 — a 15-year gap followed before the nameplate returned." },
          },
          colors:[
            {name:"White Pearlescent (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Autumn Red (Red)",hex:"#6B1A1A"},
            {name:"Medium Graphite Metallic (Gray)",hex:"#6B6E6F"},
          ],
        },
        "10th Gen (2017-2020)":{
          years:["2017","2018","2019","2020"],
          trims:{
            "Premiere":{ engine:"3.7L V6 (305hp)", drivetrains:["FWD","AWD"], transmission:"Automatic", note:"Revived after a 15-year absence, replacing the slow-selling MKS. First Continental ever offered with AWD. Discontinued again after 2020 — Lincoln went SUV/crossover-only in the US after this." },
            "Select":  { engine:"2.7L Twin-Turbo V6 (335hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Black Label":{ engine:"3.0L Twin-Turbo V6 (400hp)", drivetrain:"AWD", transmission:"Automatic", note:"Top trim, most powerful Continental ever built." },
          },
          colors:[
            {name:"Infinite Black (Black)",hex:"#1A1A1A"},
            {name:"Ceramic Pearl (White)",hex:"#F0F0F0"},
            {name:"Rhapsody Blue (Blue)",hex:"#1B2A4A"},
            {name:"Iced Mocha Metallic (Brown)",hex:"#4A3728"},
          ],
        },
      },
    },
  },
  "Mazda": {
    "CX-5": {
      generations:{
        "KE (2013-2016)":{
          years:["2013","2014","2015","2016"],
          trims:{
            "Sport":        { engine:"2.0L 4-cylinder (155hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"], note:"2013 only for the 2.0L — replaced by the 2.5L starting the 2014 model year across the lineup." },
            "Touring":      { engine:"2.5L 4-cylinder (184hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Grand Touring":{ engine:"2.5L 4-cylinder (184hp)", drivetrains:["FWD","AWD"], transmission:"Automatic", note:"2016 got a mid-cycle refresh — new grille, taillights, retuned suspension, and updated infotainment, still the same KE generation underneath." },
          },
          colors:[
            {name:"Soul Red Metallic (Red)",hex:"#9B1B30"},
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Meteor Gray Mica (Gray)",hex:"#6B6E6F"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
          ],
        },
        "KF (2017-2024)":{
          years:["2017","2018","2019","2020","2021","2022","2023","2024"],
          trims:{
            "Sport":                { engine:"2.5L 4-cylinder (187hp)", drivetrains:["FWD","AWD"], transmission:"Automatic", note:"AWD wasn't standard across the board until the 2022 model year — earlier years could be had in FWD." },
            "Touring":              { engine:"2.5L 4-cylinder (187hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Carbon Edition":       { engine:"2.5L 4-cylinder (187hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Grand Touring":        { engine:"2.5L 4-cylinder (187hp)", drivetrains:["FWD","AWD"], transmission:"Automatic" },
            "Grand Touring Reserve":{ engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic", note:"Turbo engine (borrowed from the CX-9) arrived for the 2019 model year, 250hp on premium fuel / 227hp on regular. Your friend's 2020 falls right in this window." },
            "Signature":            { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Polymetal Gray Metallic (Dark Gray)",hex:"#4A4E52"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Eternal Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "3rd Generation (2025-2026)":{
          years:["2025","2026"],
          trims:{
            "Sport":        { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic", note:"All-new platform for the first time since 2013. Carries over the same naturally-aspirated 2.5L for now." },
            "Preferred":    { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic" },
            "Premium":      { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Rhodium White Metallic (White)",hex:"#E8E8E8"},
          ],
        },
      },
    },
    "Mazda3": {
      generations:{
        "BG Protégé (1990-1994)":{
          years:["1990","1991","1992","1993","1994"],
          trims:{
            "DX":     { engine:"1.6L 4-cylinder (82hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Called the Protégé, not Mazda3 — that nameplate didn't exist yet. This generation replaced the Mazda 323." },
            "LX":     { engine:"1.8L DOHC 4-cylinder (103hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "4WD Turbo": { engine:"1.6L Turbocharged 4-cylinder (135hp)", drivetrain:"AWD", transmission:"Manual", note:"1990-1991 only — a genuinely rare factory AWD turbo Protégé before it was discontinued." },
          },
          colors:[
            {name:"Classic White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Crimson Red (Red)",hex:"#C8102E"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "BH Protégé (1995-1998)":{
          years:["1995","1996","1997","1998"],
          trims:{
            "DX": { engine:"1.5L SOHC 4-cylinder (92hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"The 'organic' redesign era — rounder styling than the outgoing BG." },
            "LX": { engine:"1.8L DOHC 4-cylinder (122hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "ES": { engine:"1.8L DOHC 4-cylinder (122hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Classic White (White)",hex:"#F5F5F5"},
            {name:"Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Aroma Red Mica (Red)",hex:"#C8102E"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "BJ Protégé (1999-2003)":{
          years:["1999","2000","2001","2002","2003"],
          trims:{
            "DX":                { engine:"1.6L SOHC 4-cylinder (100hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Based on the larger 626 platform — bigger and more modern than the BH it replaced." },
            "LX":                { engine:"1.6L SOHC 4-cylinder (100hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "ES":                { engine:"1.8L DOHC 4-cylinder (122hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Mazdaspeed Protégé":{ engine:"2.0L Turbocharged 4-cylinder (170hp)", drivetrain:"FWD", transmission:"Manual", note:"2003 only — limited-production, developed with Racing Beat and Callaway. Genuinely rare and sought after today." },
          },
          colors:[
            {name:"Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"Aroma Red Mica (Red)",hex:"#C8102E"},
            {name:"Sunlight Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Grace Green Mica (Green)",hex:"#2E5A3A"},
          ],
        },
        "BK Mazda3 (2004-2009)":{
          years:["2004","2005","2006","2007","2008","2009"],
          trims:{
            "i Sedan":     { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"The Protégé name is retired here — this is the first car actually badged Mazda3." },
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
            {name:"Velocity Red Mica (Red)",hex:"#9B1B30"},
          ],
        },
        "BL Mazda3 (2010-2013)":{
          years:["2010","2011","2012","2013"],
          trims:{
            "i Sport":       { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "i Touring":     { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "s Grand Touring":{ engine:"2.5L 4-cylinder (167hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Mazdaspeed3":   { engine:"2.3L Turbocharged 4-cylinder (263hp)", drivetrain:"FWD", transmission:"Manual", note:"Genuine hot hatch — one of the most beloved Mazda performance cars ever made. This is the last year Mazdaspeed3 existed before it was discontinued." },
          },
          colors:[
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Zoom-Zoom Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"True Red (Red)",hex:"#C8102E"},
          ],
        },
        "BM/BN Mazda3 (2014-2018)":{
          years:["2014","2015","2016","2017","2018"],
          trims:{
            "i Sport":         { engine:"2.0L 4-cylinder (155hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"First generation with Mazda's Kodo 'Soul of Motion' design language — a big styling leap from the outgoing BL." },
            "i Touring":       { engine:"2.0L 4-cylinder (155hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "s Grand Touring": { engine:"2.5L 4-cylinder (184hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Soul Red Metallic (Red)",hex:"#9B1B30"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Titanium Flash Mica (Gray)",hex:"#8A8D8F"},
          ],
        },
        "BP Mazda3 (2019-2025)":{
          years:["2019","2020","2021","2022","2023","2024","2025"],
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
      },
    },
    "Mazda6": {
      generations:{
        "GD 626 (1990-1992)":{
          years:["1990","1991","1992"],
          trims:{
            "DX": { engine:"2.2L 4-cylinder (110hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Called the 626, not Mazda6 — that nameplate didn't exist yet." },
            "LX": { engine:"2.2L 4-cylinder (110hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "GT": { engine:"2.2L Turbocharged 4-cylinder (145hp)", drivetrain:"FWD", transmission:"Manual", note:"Genuinely rare factory turbo trim from this era." },
          },
          colors:[
            {name:"Classic White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Crimson Red (Red)",hex:"#C8102E"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "GE 626 (1993-1997)":{
          years:["1993","1994","1995","1996","1997"],
          trims:{
            "DX": { engine:"2.0L 4-cylinder (118hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "LX": { engine:"2.0L 4-cylinder (118hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "ES": { engine:"2.5L V6 (164hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Classic White (White)",hex:"#F5F5F5"},
            {name:"Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Aroma Red Mica (Red)",hex:"#C8102E"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "GF/GW 626 (1998-2002)":{
          years:["1998","1999","2000","2001","2002"],
          trims:{
            "LX": { engine:"2.0L 4-cylinder (125hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "ES": { engine:"2.5L V6 (170hp)", drivetrain:"FWD", transmission:"Automatic", note:"Last 626 generation — replaced by the Mazda6 starting the following year." },
          },
          colors:[
            {name:"Sunlight Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Aroma Red Mica (Red)",hex:"#C8102E"},
            {name:"Twilight Blue Mica (Blue)",hex:"#1E4B8E"},
          ],
        },
        "Gen 1 Mazda6 (2003-2008)":{
          years:["2003","2004","2005","2006","2007","2008"],
          trims:{
            "i":            { engine:"2.3L 4-cylinder (160hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"First car actually badged Mazda6 — replaced both the 626 and the Millenia." },
            "s":            { engine:"3.0L V6 (220hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "Mazdaspeed6":  { engine:"2.3L Turbocharged 4-cylinder (274hp)", drivetrain:"AWD", transmission:"Manual", note:"2006-2007 only — genuine sleeper performance sedan, factory AWD turbo. Highly sought after today." },
          },
          colors:[
            {name:"Titanium Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Winning Blue Metallic (Blue)",hex:"#1E4B8E"},
            {name:"Galaxy Gray Mica (Gray)",hex:"#5A5F63"},
            {name:"True Red (Red)",hex:"#C8102E"},
            {name:"Black Mica (Black)",hex:"#1A1A1A"},
          ],
        },
        "Gen 2 Mazda6 (2009-2013)":{
          years:["2009","2010","2011","2012","2013"],
          trims:{
            "i":  { engine:"2.5L 4-cylinder (170hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "s":  { engine:"3.7L V6 (272hp)", drivetrain:"FWD", transmission:"Automatic", note:"This V6 was borrowed from Ford — the flagship engine of this generation." },
          },
          colors:[
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Zoom-Zoom Blue Mica (Blue)",hex:"#1E4B8E"},
            {name:"Sangria Red Mica (Red)",hex:"#9B1B30"},
          ],
        },
        "Gen 3 Mazda6 Pre-Turbo (2014-2017)":{
          years:["2014","2015","2016","2017"],
          trims:{
            "Sport":        { engine:"2.5L 4-cylinder (184hp)", drivetrain:"FWD", transmission:"Automatic", note:"The V6 was dropped this generation — Skyactiv 2.5L four-cylinder only, no manual offered in the US." },
            "Touring":      { engine:"2.5L 4-cylinder (184hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Grand Touring":{ engine:"2.5L 4-cylinder (184hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Soul Red Metallic (Red)",hex:"#9B1B30"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Titanium Flash Mica (Gray)",hex:"#8A8D8F"},
          ],
        },
        "Gen 3 Mazda6 Turbo (2018-2021)":{
          years:["2018","2019","2020","2021"],
          trims:{
            "Sport":                { engine:"2.5L 4-cylinder (187hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Touring":              { engine:"2.5L 4-cylinder (187hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Grand Touring":        { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"FWD", transmission:"Automatic", note:"First turbocharged Mazda6 in the US since the Mazdaspeed6 ended in 2007. 250hp on premium fuel, 227hp on regular." },
            "Grand Touring Reserve":{ engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Signature":            { engine:"2.5L Turbocharged 4-cylinder (227-250hp)", drivetrain:"FWD", transmission:"Automatic", note:"Top trim — Nappa leather, Bose 12-speaker audio, Auburn or Deep Crystal Blue exclusive interior colors." },
          },
          colors:[
            {name:"Snowflake White Pearl Mica (White)",hex:"#F0F0F0"},
            {name:"Jet Black Mica (Black)",hex:"#1A1A1A"},
            {name:"Soul Red Crystal Metallic (Red)",hex:"#9B1B30"},
            {name:"Deep Crystal Blue Mica (Blue)",hex:"#1B3A6B"},
            {name:"Machine Gray Metallic (Gray)",hex:"#6B6E6F"},
            {name:"Polymetal Gray Metallic (Dark Gray)",hex:"#4A4E52"},
            {name:"Titanium Flash Mica (Gray)",hex:"#8A8D8F"},
          ],
        },
      },
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
  "Mercedes-Benz": {
    "E-Class": {
      generations:{
        "W124 (1990-1993)":{
          years:["1990","1991","1992","1993"],
          trims:{
            "300E":  { engine:"3.0L Inline-6 (188hp)", drivetrain:"RWD", transmissions:["Manual","Automatic"], note:"Not officially called 'E-Class' until the 1993 facelift — before that it was just the 300-series W124. This generation is where the E-Class name was born." },
            "400E":  { engine:"4.2L V8 (268hp)", drivetrain:"RWD", transmission:"Automatic" },
            "500E":  { engine:"5.0L V8 (315hp)", drivetrain:"RWD", transmission:"Automatic", note:"Co-developed with Porsche, hand-assembled, genuinely legendary sleeper sedan today." },
          },
          colors:[
            {name:"Astral Silver (Silver)",hex:"#C0C0C0"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Alabaster White (White)",hex:"#F5F5F5"},
            {name:"Blue Black (Blue)",hex:"#1E3A6B"},
          ],
        },
        "W210 (1996-2002)":{
          years:["1996","1997","1998","1999","2000","2001","2002"],
          trims:{
            "E320": { engine:"3.2L Inline-6 (217hp)", drivetrain:"RWD", transmission:"Automatic", note:"First generation to wear the E-Class name from day one. Distinctive quad-headlight 'goggle-eye' styling was controversial at launch." },
            "E430": { engine:"4.3L V8 (275hp)", drivetrain:"RWD", transmission:"Automatic" },
            "E55 AMG":{ engine:"5.5L V8 (349hp)", drivetrain:"RWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Brilliant Silver (Silver)",hex:"#C0C0C0"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Alabaster White (White)",hex:"#F5F5F5"},
            {name:"Sepang Brown (Brown)",hex:"#4A3728"},
          ],
        },
        "W211 (2003-2009)":{
          years:["2003","2004","2005","2006","2007","2008","2009"],
          trims:{
            "E350":  { engine:"3.5L V6 (268hp)", drivetrain:"RWD", transmission:"Automatic" },
            "E500":  { engine:"5.0L V8 (302hp)", drivetrains:["RWD","AWD"], transmission:"Automatic" },
            "E63 AMG":{ engine:"6.2L V8 (507hp)", drivetrain:"RWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Iridium Silver (Silver)",hex:"#C0C0C0"},
            {name:"Obsidian Black (Black)",hex:"#1A1A1A"},
            {name:"Alabaster White (White)",hex:"#F5F5F5"},
            {name:"Capri Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
        "W212 (2010-2016)":{
          years:["2010","2011","2012","2013","2014","2015","2016"],
          trims:{
            "E350":  { engine:"3.5L V6 (302hp)", drivetrains:["RWD","AWD"], transmission:"Automatic", note:"2013 facelift dropped the quad-headlight look for good — the E started looking like the rest of the Mercedes lineup again." },
            "E550":  { engine:"4.6L Twin-Turbo V8 (402hp)", drivetrains:["RWD","AWD"], transmission:"Automatic" },
            "E63 AMG":{ engine:"5.5L Twin-Turbo V8 (518hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Iridium Silver (Silver)",hex:"#C0C0C0"},
            {name:"Obsidian Black (Black)",hex:"#1A1A1A"},
            {name:"Polar White (White)",hex:"#F5F5F5"},
            {name:"Lunar Blue (Blue)",hex:"#1E3A6B"},
          ],
        },
        "W213 (2017-2023)":{
          years:["2017","2018","2019","2020","2021","2022","2023"],
          trims:{
            "E300":  { engine:"2.0L Turbocharged 4-cylinder (241hp)", drivetrains:["RWD","AWD"], transmission:"Automatic", note:"Simplified engine lineup — the old naturally-aspirated V6 was dropped in favor of turbo fours and sixes." },
            "E450":  { engine:"3.0L Turbocharged Inline-6 (362hp)", drivetrain:"AWD", transmission:"Automatic" },
            "E63 S AMG":{ engine:"4.0L Twin-Turbo V8 (603hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Iridium Silver (Silver)",hex:"#C0C0C0"},
            {name:"Obsidian Black (Black)",hex:"#1A1A1A"},
            {name:"Polar White (White)",hex:"#F5F5F5"},
            {name:"Cavansite Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
        "W214 (2024-2026)":{
          years:["2024","2025","2026"],
          trims:{
            "E350":  { engine:"2.0L Turbocharged 4-cylinder (255hp)", drivetrains:["RWD","AWD"], transmission:"Automatic", note:"All-new generation." },
            "E450":  { engine:"3.0L Turbocharged Mild-Hybrid Inline-6 (375hp)", drivetrain:"AWD", transmission:"Automatic" },
          },
          colors:[
            {name:"High-Tech Silver (Silver)",hex:"#C0C0C0"},
            {name:"Obsidian Black (Black)",hex:"#1A1A1A"},
            {name:"Polar White (White)",hex:"#F5F5F5"},
            {name:"Spectral Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
      },
    },
  },
  "Mitsubishi": {
    "Eclipse": {
      generations:{
        "1st Gen (1990-1994)":{
          years:["1990","1991","1992","1993","1994"],
          trims:{
            "Base":   { engine:"1.8L 4-cylinder (92hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "GS":     { engine:"2.0L 4-cylinder (135hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "GS Turbo":{ engine:"2.0L Turbocharged 4G63T 4-cylinder (195hp)", drivetrain:"FWD", transmission:"Manual", note:"This is the legendary 4G63 — same core engine family that would later power the Lancer Evolution." },
            "GSX":    { engine:"2.0L Turbocharged 4G63T 4-cylinder (195hp)", drivetrain:"AWD", transmission:"Manual", note:"AWD version of the GS Turbo — the only turbo AWD coupe on the US market at the time, and a genuine sleeper today. Shared its platform and drivetrain with the Eagle Talon TSi and Plymouth Laser." },
          },
          colors:[
            {name:"Diamond White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Wineberry Red Pearl (Red)",hex:"#6B1A1A"},
            {name:"Radiant Fire Red (Red)",hex:"#C8102E"},
          ],
        },
        "2nd Gen (1995-1999)":{
          years:["1995","1996","1997","1998","1999"],
          trims:{
            "RS":     { engine:"2.0L 4-cylinder (140hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Base engine this generation was actually Chrysler-sourced (420A), not Mitsubishi's own. Spyder convertible body style added for 1996." },
            "GS":     { engine:"2.4L 4G64 4-cylinder (141hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "GS-T":   { engine:"2.0L Turbocharged 4G63T 4-cylinder (210hp)", drivetrain:"FWD", transmission:"Manual", note:"The 4G63 carries over into this generation, bumped to 210hp." },
            "GSX":    { engine:"2.0L Turbocharged 4G63T 4-cylinder (210hp)", drivetrain:"AWD", transmission:"Manual", note:"AWD turbo — this is the last generation the Eclipse ever offered the 4G63 or AWD. After 1999, both are gone for good." },
          },
          colors:[
            {name:"Dover White (White)",hex:"#F5F5F5"},
            {name:"Kalapana Black (Black)",hex:"#1A1A1A"},
            {name:"Scarlet Red (Red)",hex:"#C8102E"},
            {name:"Deep Amethyst Pearl (Purple)",hex:"#4A2E5A"},
          ],
        },
        "3rd Gen (2000-2005)":{
          years:["2000","2001","2002","2003","2004","2005"],
          trims:{
            "RS": { engine:"2.4L 4-cylinder (155hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"No turbo, no AWD offered this generation at all — the 4G63/GSX era was over. Redesigned with softer, more comfort-oriented styling." },
            "GS": { engine:"2.4L 4-cylinder (155hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "GT": { engine:"3.0L V6 (200-205hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Dover White Pearl (White)",hex:"#F5F5F5"},
            {name:"Black Diamond Pearl (Black)",hex:"#1A1A1A"},
            {name:"Coral Red (Red)",hex:"#C8102E"},
            {name:"Sunset Pearlescent (Orange)",hex:"#E8601C"},
          ],
        },
        "4th Gen (2006-2012)":{
          years:["2006","2007","2008","2009","2010","2011","2012"],
          trims:{
            "GS": { engine:"2.4L 4-cylinder (162hp)", drivetrain:"FWD", transmission:"Automatic" },
            "GT": { engine:"3.8L V6 (265hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Final generation — production ended early in August 2011 as the model year wound down. No successor was ever made." },
          },
          colors:[
            {name:"Kona Sunset Pearl (Orange)",hex:"#E8601C"},
            {name:"Northstar Blue Pearl (Blue)",hex:"#1E4B8E"},
            {name:"Rally Red (Red)",hex:"#C8102E"},
            {name:"Graphite Gray (Gray)",hex:"#6B6E6F"},
          ],
        },
      },
    },
  },
  "Nissan": {
    "Altima": {
      generations:{
        "1st Gen (1993-1997)":{
          years:["1993","1994","1995","1996","1997"],
          trims:{
            "XE": { engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"Replaced the Stanza — the very first Altima rolled off the line in Smyrna, Tennessee in June 1992. All Altimas have always been US-built." },
            "GXE":{ engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"] },
            "SE": { engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmission:"Manual" },
          },
          colors:[
            {name:"Cloud White (White)",hex:"#F5F5F5"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Aspen White (White)",hex:"#F0F0F0"},
            {name:"Sedona Red (Red)",hex:"#9B1B30"},
          ],
        },
        "2nd Gen (1998-2001)":{
          years:["1998","1999","2000","2001"],
          trims:{
            "GXE":{ engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmissions:["Manual","Automatic"], note:"1997 added a 'Limited Edition' package with alloy wheels and keyless entry — carried into this generation's early years." },
            "SE": { engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmission:"Manual" },
            "GLE":{ engine:"2.4L DOHC 4-cylinder (150hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Cloud White (White)",hex:"#F5F5F5"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red (Red)",hex:"#9B1B30"},
            {name:"Storm Gray (Gray)",hex:"#6B6E6F"},
          ],
        },
        "3rd Gen (2002-2006)":{
          years:["2002","2003","2004","2005","2006"],
          trims:{
            "S":   { engine:"2.5L 4-cylinder (175hp)", drivetrain:"FWD", transmission:"Automatic", note:"First Altima ever offered with a V6, and the first built on Nissan's new FF-L platform — a huge jump in size and interior space." },
            "SL":  { engine:"3.5L V6 (245-250hp)", drivetrain:"FWD", transmission:"Automatic" },
            "SE-R":{ engine:"3.5L V6 (260hp)", drivetrain:"FWD", transmission:"Manual", note:"Performance trim with a genuinely quick V6 for the segment at the time." },
          },
          colors:[
            {name:"Cloud White (White)",hex:"#F5F5F5"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Java Metallic (Brown)",hex:"#4A3728"},
          ],
        },
        "4th Gen (2007-2012)":{
          years:["2007","2008","2009","2010","2011","2012"],
          trims:{
            "2.5S":  { engine:"2.5L 4-cylinder (175hp)", drivetrain:"FWD", transmission:"Automatic (CVT)", note:"First generation to offer a Coupe body style (added 2008) alongside the sedan, plus a Hybrid model starting 2007." },
            "3.5SR": { engine:"3.5L V6 (270hp)", drivetrain:"FWD", transmissions:["Manual","Automatic (CVT)"] },
            "Hybrid":{ engine:"2.5L Hybrid 4-cylinder (198hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Winter Frost Pearl (White)",hex:"#F0F0F0"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Code Red Metallic (Red)",hex:"#9B1B30"},
            {name:"Ocean Gray (Gray)",hex:"#6B6E6F"},
          ],
        },
        "5th Gen (2013-2018)":{
          years:["2013","2014","2015","2016","2017","2018"],
          trims:{
            "2.5S":  { engine:"2.5L 4-cylinder (182hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "3.5SL": { engine:"3.5L V6 (270hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Pearl White (White)",hex:"#F5F5F5"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Cayenne Red (Red)",hex:"#9B1B30"},
            {name:"Storm Blue (Blue)",hex:"#1E3A6B"},
          ],
        },
        "6th Gen (2019-2026)":{
          years:["2019","2020","2021","2022","2023","2024","2025","2026"],
          trims:{
            "S":   { engine:"2.5L 4-cylinder (188hp)", drivetrains:["FWD","AWD"], transmission:"Automatic (CVT)", note:"AWD became available for the first time in Altima history. The VC-Turbo engine on SR trims is genuinely unique tech — the world's first production variable compression ratio engine." },
            "SV":  { engine:"2.5L 4-cylinder (188hp)", drivetrains:["FWD","AWD"], transmission:"Automatic (CVT)" },
            "SR":  { engine:"2.0L VC-Turbo 4-cylinder (236hp)", drivetrain:"FWD", transmission:"Automatic (CVT)" },
            "Platinum":{ engine:"2.5L 4-cylinder (188hp)", drivetrains:["FWD","AWD"], transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Glacier White (White)",hex:"#F5F5F5"},
            {name:"Super Black (Black)",hex:"#1A1A1A"},
            {name:"Scarlet Ember (Red)",hex:"#9B1B30"},
            {name:"Gun Metallic (Gray)",hex:"#6B6E6F"},
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
  "Shelby": {
    "Series 1": {
      years:["1999"],
      trims:{
        "Base":         { engine:"4.0L Aurora V8 (320hp)", drivetrain:"RWD", transmission:"Manual", note:"The only car Carroll Shelby ever designed completely from a clean sheet — every other Shelby is a reworked version of someone else's car (usually Ford's). All-aluminum chassis, carbon fiber body panels. Only 249 were ever built, all titled as 1999 models despite production running into 2005." },
        "Supercharged": { engine:"4.0L Supercharged Aurora V8 (450hp)", drivetrain:"RWD", transmission:"Manual", note:"A rare factory-supercharged variant built after GM discontinued the Aurora engine — genuinely hard to find today." },
      },
      colors:[
        {name:"Shelby Blue (Blue)",hex:"#1E3A6B"},
        {name:"Silver (Silver)",hex:"#C0C0C0"},
        {name:"Red (Red)",hex:"#C8102E"},
        {name:"Black (Black)",hex:"#1A1A1A"},
      ],
    },
  },
  "Subaru": {
    "Impreza": {
      generations:{
        "1st Gen (1993-2001)":{
          years:["1993","1994","1995","1996","1997","1998","1999","2000","2001"],
          trims:{
            "L":  { engine:"1.8L Flat-4 (110hp)", drivetrains:["FWD","AWD"], transmissions:["Manual","Automatic"], note:"WRX/STI not offered in the US on this generation — those are covered separately in our WRX entry starting with Bugeye 2002." },
            "Outback Sport":{ engine:"2.2L Flat-4 (137hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"], note:"Off-road appearance package, sold only in North America — the direct predecessor to today's Crosstrek." },
          },
          colors:[
            {name:"Bright White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Sedona Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Sage Green (Green)",hex:"#5A7A5A"},
          ],
        },
        "2nd Gen (2002-2007)":{
          years:["2002","2003","2004","2005","2006","2007"],
          trims:{
            "2.5 RS":{ engine:"2.5L Flat-4 (165-173hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
            "Outback Sport":{ engine:"2.5L Flat-4 (165-173hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Crystal White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Aspen White (White)",hex:"#F0F0F0"},
            {name:"Woodland Green (Green)",hex:"#2E5A3A"},
          ],
        },
        "3rd Gen (2008-2011)":{
          years:["2008","2009","2010","2011"],
          trims:{
            "2.5i":{ engine:"2.5L Flat-4 (170hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"], note:"Sedan and hatchback body styles." },
            "Outback Sport":{ engine:"2.5L Flat-4 (170hp)", drivetrain:"AWD", transmissions:["Manual","Automatic"] },
          },
          colors:[
            {name:"Satin White Pearl (White)",hex:"#F0F0F0"},
            {name:"Obsidian Black Pearl (Black)",hex:"#1A1A1A"},
            {name:"Ruby Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Newport Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "4th Gen (2012-2016)":{
          years:["2012","2013","2014","2015","2016"],
          trims:{
            "2.0i":        { engine:"2.0L Flat-4 (148hp)", drivetrain:"AWD", transmission:"Automatic (CVT)", note:"WRX and STI split off as their own standalone models this generation, no longer badged as part of the Impreza lineup." },
            "2.0i Premium":{ engine:"2.0L Flat-4 (148hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
            "2.0i Limited":{ engine:"2.0L Flat-4 (148hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Satin White Pearl (White)",hex:"#F0F0F0"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Venetian Red Pearl (Red)",hex:"#9B1B30"},
            {name:"Marine Blue Pearl (Blue)",hex:"#1E4B8E"},
          ],
        },
        "5th Gen (2017-2023)":{
          years:["2017","2018","2019","2020","2021","2022","2023"],
          trims:{
            "Base":   { engine:"2.0L Flat-4 (152hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
            "Premium":{ engine:"2.0L Flat-4 (152hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
            "Sport":  { engine:"2.0L Flat-4 (152hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
            "Limited":{ engine:"2.0L Flat-4 (152hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Pure Red (Red)",hex:"#C8102E"},
            {name:"Dark Blue Pearl (Blue)",hex:"#1B2A4A"},
          ],
        },
        "6th Gen (2024-2026)":{
          years:["2024","2025","2026"],
          trims:{
            "Base":   { engine:"2.0L Flat-4 (152hp)", drivetrain:"AWD", transmission:"Automatic (CVT)", note:"Hatchback only starting this generation — no more sedan body style, though the related WRX still offers one." },
            "Sport":  { engine:"2.5L Flat-4 (182hp)", drivetrain:"AWD", transmission:"Automatic (CVT)", note:"2.5L option added this generation for the first time on a non-WRX Impreza." },
            "RS":     { engine:"2.5L Flat-4 (182hp)", drivetrain:"AWD", transmission:"Automatic (CVT)" },
          },
          colors:[
            {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
            {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
            {name:"Solar Orange (Orange)",hex:"#E8601C"},
            {name:"Horizon Blue (Blue)",hex:"#1E4B8E"},
          ],
        },
      },
    },
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
    "Avalon": {
      generations:{
        "1st Gen (1995-1999)":{
          years:["1995","1996","1997","1998","1999"],
          trims:{
            "XL":  { engine:"3.0L V6 (192hp)", drivetrain:"FWD", transmission:"Automatic", note:"Built in Georgetown, Kentucky from day one — replaced the rear-wheel-drive Cressida. DOHC engine through 1996, switched to SOHC for 1997+ (same displacement, similar output)." },
            "XLS": { engine:"3.0L V6 (192hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Gold Edition": { engine:"3.0L V6 (192hp)", drivetrain:"FWD", transmission:"Automatic", note:"Special luxury package — gold badging, upgraded leather and wood trim, distinct from the standard XLS." },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Cashmere Beige Metallic (Beige)",hex:"#C8B89A"},
            {name:"Dark Green Pearl (Green)",hex:"#2E5A3A"},
            {name:"Sunfire Red Pearl (Red)",hex:"#9B1B30"},
          ],
        },
        "2nd Gen (2000-2004)":{
          years:["2000","2001","2002","2003","2004"],
          trims:{
            "XL":  { engine:"3.0L V6 (210hp)", drivetrain:"FWD", transmission:"Automatic" },
            "XLS": { engine:"3.0L V6 (210hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Antique Sage Metallic (Green)",hex:"#7A8A6A"},
            {name:"Salsa Red Pearl (Red)",hex:"#9B1B30"},
          ],
        },
        "3rd Gen (2005-2012)":{
          years:["2005","2006","2007","2008","2009","2010","2011","2012"],
          trims:{
            "XL":      { engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
            "XLS":     { engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Limited": { engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#1A1A1A"},
            {name:"Classic Silver Metallic (Silver)",hex:"#C0C0C0"},
            {name:"Cassis Red Mica (Red)",hex:"#9B1B30"},
          ],
        },
        "4th Gen (2013-2018)":{
          years:["2013","2014","2015","2016","2017","2018"],
          trims:{
            "XLE":     { engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
            "XLE Premium":{ engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Limited": { engine:"3.5L V6 (268hp)", drivetrain:"FWD", transmission:"Automatic" },
            "Hybrid":  { engine:"2.5L Hybrid 4-cylinder (200hp)", drivetrain:"FWD", transmission:"Automatic (e-CVT)", note:"Hybrid powertrain added this generation." },
          },
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Attitude Black (Black)",hex:"#1A1A1A"},
            {name:"Cypress Metallic (Green)",hex:"#5A7A5A"},
            {name:"Salsa Red Pearl (Red)",hex:"#9B1B30"},
          ],
        },
        "5th Gen (2019-2022)":{
          years:["2019","2020","2021","2022"],
          trims:{
            "XLE":     { engine:"3.5L V6 (301hp)", drivetrain:"FWD", transmission:"Automatic", note:"Final generation — discontinued after 2022 as Toyota shifted its US flagship sedan role to the new Crown." },
            "Limited": { engine:"3.5L V6 (301hp)", drivetrains:["FWD","AWD"], transmission:"Automatic", note:"AWD became available for the first time in Avalon history, starting 2020." },
            "TRD":     { engine:"3.5L V6 (301hp)", drivetrain:"FWD", transmission:"Automatic", note:"A genuinely odd but real product — a sport-tuned, lowered, performance-exhaust Avalon." },
            "Hybrid":  { engine:"2.5L Hybrid 4-cylinder (215hp)", drivetrain:"FWD", transmission:"Automatic (e-CVT)" },
          },
          colors:[
            {name:"Wind Chill Pearl (White)",hex:"#F0F0F0"},
            {name:"Midnight Black Metallic (Black)",hex:"#1A1A1A"},
            {name:"Ruby Flare Pearl (Red)",hex:"#9B1B30"},
            {name:"Celestial Silver Metallic (Silver)",hex:"#C0C0C0"},
          ],
        },
      },
    },
    "4Runner": {
      generations:{
        "2nd Gen (1990-1995)":{
          years:["1990","1991","1992","1993","1994","1995"],
          trims:{
            "Base": { engine:"2.4L 4-cylinder (116hp)", transmission:"Manual" },
            "SR5":  { engines:["2.4L 4-cylinder (116hp)","3.0L V6 (150hp)"], transmissions:["Manual","Automatic"], note:"The V6 could be paired with either transmission — the 4-cylinder was manual only." },
            "Limited": { engine:"3.0L V6 (150hp)", drivetrain:"4WD", transmission:"Automatic", note:"Added partway through this generation as the range-topping trim." },
          },
          drivetrainOptions:["2WD","4WD"],
          colors:[
            {name:"Super White (White)",hex:"#F5F5F5"},
            {name:"Black (Black)",hex:"#111111"},
            {name:"Cardinal Red Mica (Red)",hex:"#9B1B30"},
            {name:"Teal Mica (Teal)",hex:"#1B6B6B"},
            {name:"Sandalwood Metallic (Tan)",hex:"#C8B89A"},
          ],
        },
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
const TORQUE_SPECS = {
  "Abarth": {
    "500 Abarth": [
      {
        partName:"Wheel Lug Nuts",
        size:"17mm socket, M12 x 1.25 thread",
        spec:"75",
        unit:"ft-lbs",
        notes:"Straight from Fiat's factory owner's manual — this is the spec for the standard aluminum alloy wheels. If you're running the steel spare, that one's lower at 63 ft-lbs.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"12",
        unit:"ft-lbs",
        notes:"Owners consistently cite this as coming straight from the factory manual (16 Nm). A few report using 13-14 ft-lbs without issue — don't force it past snug, over-tightening can crack the head or strip the threads.",
      },
      {
        partName:"Oil Drain Plug",
        size:"17mm socket",
        spec:"20",
        unit:"ft-lbs",
        notes:"Forum-sourced torque value (27 Nm), not pulled from an official manual page — treat the torque as a solid estimate. Socket size confirmed 17mm.",
      },
      {
        partName:"Oil Filter Cap",
        size:"27mm socket",
        spec:"18",
        unit:"ft-lbs",
        notes:"This torque value is actually molded right into the cap itself. Hand-tighten only — this one's easy to over-torque and crack.",
      },
    ],
  },
  "Dodge": {
    "Ram 2500": [
      {
        partName:"Wheel Lug Nuts",
        size:"15/16\" socket, 9/16-18 thread",
        spec:"135",
        unit:"ft-lbs",
        notes:"Well corroborated across owner manuals and forums for the single-rear-wheel 2500 — use a star/crisscross pattern, not a circle, and re-torque after the first 100-200 miles if you're on aluminum wheels.",
      },
      {
        partName:"Fuel Injector Line Fittings",
        size:"Not confirmed — verify before buying a wrench",
        spec:"Not confirmed",
        unit:"",
        notes:"Important note before you touch anything here: a 2004 and a 2004.5 5.9L Cummins have genuinely different injectors, so don't trust a torque spec you find online without confirming it matches your exact build date, not just model year.",
      },
      {
        partName:"Oil Drain Plug",
        size:"Not confirmed — verify before buying a socket",
        spec:"Not confirmed",
        unit:"",
        notes:"We haven't nailed down a solid source for this one yet — if you or your buddy check the factory manual or measure it directly, send it over and we'll lock it in.",
      },
    ],
  },
  "Mazda": {
    "Mazda3": [
      {
        partName:"Wheel Lug Nuts",
        size:"Commonly 21mm on Mazdas, but verify against your actual lug nuts before buying a socket",
        spec:"103",
        unit:"ft-lbs",
        notes:"Torque figure is consistent across sources for 2019+ models — use a star/crisscross pattern, not a circle.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"13",
        unit:"ft-lbs",
        notes:"Covers both the 2.0L and 2.5L naturally-aspirated engines. If you've got the 2.5L Turbo, double check before assuming this applies — turbo spark plugs sometimes run a different spec.",
      },
      {
        partName:"Oil Drain Plug",
        size:"24mm socket",
        spec:"29",
        unit:"ft-lbs",
        notes:"A few owners report using 23-25 ft-lbs without issue, so there's some real-world flexibility here, but 29 is the documented factory figure. Use a new crush washer every time — reusing the old one is the most common cause of a leaking drain plug.",
      },
    ],
    "Mazda6": [
      {
        partName:"Wheel Lug Nuts",
        size:"Commonly 21mm on Mazdas, but verify against your actual lug nuts before buying a socket",
        spec:"103",
        unit:"ft-lbs",
        notes:"Same figure and range as the Mazda3 — Mazda keeps this consistent across the Skyactiv-era lineup. Star/crisscross pattern, not a circle.",
      },
      {
        partName:"Oil Drain Plug",
        size:"8mm Allen/hex key, 3/8\" drive",
        spec:"25",
        unit:"ft-lbs",
        notes:"Owners commonly use 23-30 ft-lbs without issue on the 2.5L. Get a properly-fitting Allen bit — the 8mm hex is small enough that a sloppy fit will round it out. New crush washer every time.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"Not confirmed",
        unit:"",
        notes:"We haven't found a solid confirmed number for the 2.5L Turbo specifically yet — several owners of your buddy's exact engine have asked the same question without a clear answer. NGK's general guidance is hand-tight plus a half turn rather than a hard torque number. If you find the real factory spec, send it over and we'll lock it in.",
      },
    ],
    "CX-5": [
      {
        partName:"Wheel Lug Nuts",
        size:"Commonly 21mm on Mazdas, but verify against your actual lug nuts before buying a socket",
        spec:"103",
        unit:"ft-lbs",
        notes:"Same shared Skyactiv-era figure as the Mazda3 and Mazda6. Star/crisscross pattern, not a circle.",
      },
      {
        partName:"Oil Drain Plug",
        size:"17mm socket",
        spec:"25-30",
        unit:"ft-lbs",
        notes:"Confirmed range for the 2.5L, matches the Mazda6 and Mazda3 since they share the same drivetrain family. New crush washer every oil change — Mazda pans are aluminum and easy to strip if you overdo it.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"Not confirmed",
        unit:"",
        notes:"Same gap here as the Mazda6 Turbo — couldn't pin down a confirmed factory number for either the NA or turbo 2.5L. If you find it, send it over.",
      },
    ],
  },
  "Acura": {
    "TLX": [
      {
        partName:"Wheel Lug Nuts",
        size:"Not confirmed — verify before buying a socket",
        spec:"Not confirmed",
        unit:"",
        notes:"Even TLX owners on their own forums couldn't pin this down definitively — one guess floating around is 80 ft-lbs based on shared parts with the Honda TSX/Accord platform, but that's a guess, not a confirmed factory number. Treat with real caution and check your specific owner's manual.",
      },
      {
        partName:"Oil Drain Plug",
        size:"18mm socket",
        spec:"Not confirmed",
        unit:"",
        notes:"Socket size is confirmed from the genuine Acura part listing, but we couldn't pin down a solid torque figure specific to the TLX. If you find it, send it over.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"16",
        unit:"ft-lbs",
        notes:"Confirmed for the 2.4L 4-cylinder (K24W7 engine). If your 2018 has the 3.5L V6 instead (common on Tech/A-Spec/Advance trims), this number may not carry over exactly — worth confirming which engine yours has.",
      },
    ],
  },
  "Scion": {
    "tC": [
      {
        partName:"Wheel Lug Nuts",
        size:"Not confirmed — verify before buying a socket",
        spec:"76",
        unit:"ft-lbs",
        notes:"Pulled from a genuine factory torque spec table — solid figure, listed as 'Front wheel' in the source.",
      },
      {
        partName:"Oil Drain Plug",
        size:"Not confirmed — verify before buying a socket",
        spec:"26",
        unit:"ft-lbs",
        notes:"Confirmed for the 2AR-FE 2.5L (2011-2016 gen). New crush washer every oil change.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"14",
        unit:"ft-lbs",
        notes:"Straight from a genuine factory torque spec table — listed as 'Spark plug x Cylinder head.' This is a solid, well-sourced number.",
      },
    ],
  },
  "Toyota": {
    "4Runner": [
      {
        partName:"Wheel Lug Nuts",
        size:"Commonly 21mm on 3rd gen 4Runners, but verify against your actual lug nuts before buying a socket",
        spec:"83",
        unit:"ft-lbs",
        notes:"Torque figure is confirmed for the 3rd gen (1996-2002) — matches your friend's 1999. Always tighten in a star pattern.",
      },
      {
        partName:"Oil Drain Plug",
        size:"Not confirmed — verify before buying a socket",
        spec:"29",
        unit:"ft-lbs",
        notes:"Torque figure confirmed for the 3.4L V6 (5VZ-FE). This is a known tight plug from the factory, some owners report real fights getting it loose the first time. Don't panic if it takes real effort, just don't round it out. New crush washer every oil change.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"Not confirmed",
        unit:"",
        notes:"Haven't nailed down a solid factory number for the 3.4L V6 yet. If you or your friend check the manual, send it over.",
      },
    ],
  },
  "Honda": {
    "Accord": [
      {
        partName:"Wheel Lug Nuts",
        size:"Commonly 21mm on Hondas, but verify against your actual lug nuts before buying a socket",
        spec:"80",
        unit:"ft-lbs",
        notes:"Well corroborated for the 9th gen (2013-2017) — matches your friend's 2016. If you're on the current 11th gen 1.5T instead, worth a quick cross-check against that owner's manual since it wasn't the primary source for this figure.",
      },
      {
        partName:"Oil Drain Plug",
        size:"17mm socket",
        spec:"25-30",
        unit:"ft-lbs",
        notes:"Confirmed range specifically for the 2013-2016 9th gen Accord (2.4L I4 / 3.5L V6 era). Real variance across sources — some say 25, some say 30. Honda's drain plug threads are notably soft, so err toward the lower end and don't force it. New crush washer every oil change, always.",
      },
      {
        partName:"Spark Plugs",
        size:"5/8\" (16mm) spark plug socket",
        spec:"13",
        unit:"ft-lbs",
        notes:"156 in-lbs (13 ft-lbs) is confirmed for the J-series V6. If your friend's 2016 has the 2.4L four-cylinder instead of the 3.5L V6, this may not carry over exactly — worth confirming which engine his has before trusting this number.",
      },
    ],
  },
};

const CATALOG = {
  "Abarth": {
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
  "Dodge": {
    "Ram 2500": [
      {brand:"Smarty (Mads Electronics)",category:"Tuner / Programmer",part:"Smarty CR Tuner",note:"The go-to tuner in the 5.9L Cummins community — adjustable power levels, works well stacked with other fueling mods."},
      {brand:"Smarty (Mads Electronics)",category:"Tuner / Programmer",part:"Smarty Jr.",note:"Milder power gains, aimed at fuel economy over max horsepower."},
      {brand:"Edge Products",category:"Tuner / Programmer",part:"Juice w/ Attitude CS2",note:"2003-2004 has its own specific version — don't grab the 2004.5+ one, the calibration is different."},
      {brand:"BD Diesel",category:"Turbo Upgrade",part:"Super B Turbo",note:"Quick-spooling upgrade, popular first turbo swap before going to compounds."},
      {brand:"BD Diesel",category:"Fuel Injectors",part:"BD-Built Performance Injectors (60-120hp)",note:"Bigger injectors need more fuel pressure than the stock lift pump can supply — upgrade the lift pump alongside these, not after."},
      {brand:"ATS Diesel",category:"Turbo Upgrade",part:"Aurora Compound Turbo Kit",note:"Serious power builds — compound turbo setup, not a first mod."},
      {brand:"Fleece Performance",category:"Turbo Upgrade",part:"Billet S475 Turbo",note:"High-horsepower single turbo option."},
      {brand:"Fleece Performance",category:"Fuel Injectors",part:"Fleece Performance Injectors",note:"Reman and upgraded injector options."},
      {brand:"Industrial Injection",category:"Turbo Upgrade",part:"Turbo Upgrade Kits",note:"Wide range from mild to compound setups."},
      {brand:"Industrial Injection",category:"Fuel Injectors",part:"Reman & Upgraded Injectors",note:"Also does CP3 fuel pump upgrades if you're pushing bigger injectors."},
      {brand:"MBRP",category:"Exhaust",part:"4\" Turbo-Back Exhaust",note:"Straight pipe or muffled options."},
      {brand:"Diamond Eye",category:"Exhaust",part:"4\" Turbo-Back Exhaust",note:"Comparable to MBRP — a lot of it comes down to sound preference between the two."},
      {brand:"S&B Filters",category:"Cold Air Intake",part:"Cold Air Intake System",note:"Reusable filter, common companion to any tuning mod."},
      {brand:"FASS Fuel Systems",category:"Lift Pump",part:"FASS Titanium Signature Series",note:"Upgrading the lift pump is the mod nobody wants to do first but almost everyone needs once injectors get bigger."},
      {brand:"Carli Suspension",category:"Suspension",part:"Leveling / Lift Kit",note:"Well regarded in the towing and off-road Cummins crowd for ride quality, not just lift height."},
      {brand:"South Bend Clutch",category:"Clutch",part:"Performance Clutch Kit",note:"Manual transmission only — needed once power climbs past what the stock clutch can hold."},
    ],
  },
  "Mazda": {
    "Mazda3": [
      {brand:"CorkSport",category:"Air Intake",part:"Performance Air Intake",note:"The dominant Mazda-specific performance brand for this platform — most 2019+ Mazda3 mods lead back to them."},
      {brand:"CorkSport",category:"Exhaust",part:"Sport Exhaust System"},
      {brand:"CorkSport",category:"Lowering Springs (Non-Turbo)",part:"Lowering Spring Set — Non-Turbo",note:"Fits FWD and AWD non-turbo hatchback and sedan. Not confirmed to work with the 2.0L engine specifically — check current fitment before buying."},
      {brand:"CorkSport",category:"Lowering Springs (Turbo)",part:"NotSoLow Lowering Springs — Turbo",note:"These are NOT interchangeable with the non-turbo springs — turbo models sit differently and need their own part number (2021+ Turbo Hatchback and Sedan)."},
      {brand:"CorkSport",category:"Sway Bars",part:"Performance Sway Bar"},
      {brand:"CorkSport",category:"Suspension",part:"Camber Plates"},
      {brand:"CorkSport",category:"Turbo Performance",part:"Intercooler Upgrade",note:"Turbo models only."},
    ],
    "Mazda6": [
      {brand:"CorkSport",category:"Air Intake",part:"Short Ram Intake (2018+ Turbo)",note:"Specifically designed for the 2018+ 2.5L Turbo — also fits CX-5/CX-9 turbo since they share the engine."},
      {brand:"CorkSport",category:"Air Intake",part:"Turbo Inlet Pipe",note:"Pairs with the Short Ram Intake — increases the OEM 2.5\" turbo inlet to 3\", best paired together rather than alone."},
      {brand:"CorkSport",category:"Exhaust",part:"Axle Back Exhaust (2018+)",note:"Fits both the 2.5L NA and 2.5L Turbo. Milder tone increase — pairs well with the SRI."},
      {brand:"CorkSport",category:"Exhaust",part:"Cat Back Exhaust (2018+ Turbo)",note:"Turbo-specific — roughly 5-6whp gain in CorkSport's own dyno testing when paired with their intake, no tuning changes needed."},
      {brand:"CorkSport",category:"Mazdaspeed6 Intake",part:"Cold Air Intake (2006-2007 only)",note:"For the older Gen 1 Mazdaspeed6 turbo — not compatible with the current Gen 3 Turbo."},
      {brand:"CorkSport",category:"Mazdaspeed6 Exhaust",part:"Turbo-Back Exhaust (2006-2007 only)"},
    ],
    "CX-5": [
      {brand:"CorkSport",category:"Air Intake",part:"Short Ram Intake (2.5L Non-Turbo)",note:"Confirmed fitment 2013-2025 for the naturally-aspirated 2.5L — this is the one that matches your friend's car. About 5-6whp gain, no tune needed."},
      {brand:"CorkSport",category:"Exhaust",part:"Cat-Back Exhaust (Non-Turbo)",note:"Non-turbo specific system, pairs well with the Short Ram Intake."},
      {brand:"CorkSport",category:"Suspension",part:"Sway Bars"},
      {brand:"CorkSport",category:"Suspension",part:"Rear Lower Control Arms"},
    ],
  },
  "Toyota": {
    "4Runner": [
      {brand:"ARB",category:"Front Bumper",part:"ARB Deluxe Bar Bumper",note:"Winch-compatible, one of the most trusted names in off-road armor."},
      {brand:"ARB",category:"Recovery / Air",part:"On-Board Twin Air Compressor",note:"Common pairing with ARB Air Lockers for airing up after off-road runs."},
      {brand:"ARB",category:"Differential",part:"Air Locker",note:"Electronically-actuated locking differential — serious off-road upgrade, not a mild mod."},
      {brand:"Old Man Emu",category:"Suspension",part:"OME Lift Kit / Shocks",note:"Owned by ARB — extremely common pairing with ARB armor for a cohesive off-road build."},
      {brand:"Bilstein",category:"Suspension",part:"5100 Series Shocks",note:"A more budget-friendly, still well-respected alternative to OME for a mild lift."},
      {brand:"TRD",category:"Performance",part:"TRD Cold Air Intake"},
      {brand:"TRD",category:"Exhaust",part:"TRD Performance Exhaust"},
      {brand:"TRD",category:"Suspension",part:"TRD Sway Bars"},
      {brand:"ICON Vehicle Dynamics",category:"Suspension",part:"Stage Lift Kit",note:"More aggressive and more expensive than OME/Bilstein — aimed at serious off-road builds, not just a mild lift for looks."},
    ],
  },
  "Acura": {
    "TLX": [
      {brand:"MagnaFlow",category:"Exhaust",part:"Performance Exhaust System",note:"Confirmed direct-fit for the 2018 TLX. Worth knowing before you shop: the TLX enthusiast scene is genuinely thin — some owners report there being no dedicated cat-back option at all and end up building custom exhausts through local shops instead."},
      {brand:"MagnaFlow",category:"Catalytic Converter",part:"OEM-Grade Catalytic Converter",note:"EPA/CARB compliant — confirm your state of registration before buying to make sure it's legal for your area."},
    ],
  },
  "Scion": {
    "tC": [
      {brand:"Injen",category:"Exhaust",part:"SES Axle-Back Exhaust (2011-2016)",note:"Confirmed fitment for your friend's 2013 — dyno-proven gains around 7-8hp, direct bolt-on to factory mounting points, no cutting or welding."},
      {brand:"Injen",category:"Air Intake",part:"SP Cold Air Intake System (2011-2016)"},
      {brand:"TRD",category:"Air Intake",part:"TRD Cold Air Intake"},
      {brand:"TRD",category:"Suspension",part:"TRD Sway Bars"},
      {brand:"TRD",category:"Suspension",part:"TRD Lowering Springs"},
      {brand:"TRD",category:"Exhaust",part:"TRD Performance Exhaust"},
    ],
  },
  "Honda": {
    "Accord": [
      {brand:"Borla",category:"Exhaust",part:"S-Type Axle-Back Exhaust (2013-2017)",note:"Confirmed fitment for both the 2.4L 4-cylinder and 3.5L V6, sedan and coupe. This is the one that matches your friend's 2016."},
      {brand:"K&N",category:"Air Intake",part:"Cold Air Intake System (2013-2017 2.4L)",note:"Confirmed fitment for the 2.4L across EX, EX-L, LX, LX-S, Sport, and Sport Special Edition trims — this is the one for your friend's engine."},
    ],
  },
};

const BRAND_COLORS = {
  "EuroCompulsion":"#E8401C","Forge Motorsports":"#4A8FE8","Ragazzon":"#2E8B57",
  "Magnaflow":"#9B59B6","Neuspeed":"#E8B01C","Bosch":"#E81C4A",
  "Ignition Projects":"#1CE8D4","NGK":"#E86B1C","EBC Brakes":"#E8E040",
  "Wilwood":"#1CE84A","Cravenspeed":"#E81CB0","Mishimoto":"#1C9AE8",
  "Smarty (Mads Electronics)":"#E8401C","Edge Products":"#4A8FE8","BD Diesel":"#2E8B57",
  "ATS Diesel":"#9B59B6","Fleece Performance":"#E8B01C","Industrial Injection":"#E81C4A",
  "MBRP":"#1CE8D4","Diamond Eye":"#E86B1C","S&B Filters":"#E8E040",
  "FASS Fuel Systems":"#1CE84A","Carli Suspension":"#E81CB0","South Bend Clutch":"#1C9AE8",
  "CorkSport":"#E8401C",
  "ARB":"#4A8FE8","Old Man Emu":"#B87333","Bilstein":"#E81C1C","TRD":"#E8401C","ICON Vehicle Dynamics":"#1CE8D4",
  "Borla":"#9B1B30","PRL Motorsports":"#1C6BE8","K&N":"#E8401C","Injen":"#1C6BE8",
};

const BRAND_LINKS = {
  "EuroCompulsion":"https://shopeurocompulsion.net",
  "Forge Motorsports":"https://forgemotorsport.com",
  "Ragazzon":"https://www.ragazzon.com",
  "Magnaflow":"https://www.magnaflow.com",
  "Neuspeed":"https://www.neuspeed.com",
  "Bosch":"https://www.boschautoparts.com",
  "Ignition Projects":"https://www.ignitionprojects.com",
  "NGK":"https://www.ngksparkplugs.com",
  "EBC Brakes":"https://www.ebcbrakes.com",
  "Wilwood":"https://www.wilwood.com",
  "Cravenspeed":"https://www.cravenspeed.com",
  "Mishimoto":"https://www.mishimoto.com",
  "Smarty (Mads Electronics)":"https://www.madselectronics.com",
  "Edge Products":"https://www.edgeproducts.com",
  "BD Diesel":"https://www.bd-power.com",
  "ATS Diesel":"https://www.atsdiesel.com",
  "Fleece Performance":"https://www.fleeceperformance.com",
  "Industrial Injection":"https://www.industrialinjection.com",
  "MBRP":"https://www.mbrp.com",
  "Diamond Eye":"https://www.diamondeyeperformance.com",
  "S&B Filters":"https://www.sbfilters.com",
  "FASS Fuel Systems":"https://www.fassride.com",
  "Carli Suspension":"https://www.carlisuspension.com",
  "South Bend Clutch":"https://www.southbendclutch.com",
  "CorkSport":"https://corksport.com",
  "ARB":"https://www.arbusa.com",
  "Old Man Emu":"https://www.arbusa.com/oldmanemu",
  "Bilstein":"https://www.bilsteinus.com",
  "TRD":"https://www.trdparts.com",
  "ICON Vehicle Dynamics":"https://www.iconvehicledynamics.com",
  "Borla":"https://www.borla.com",
  "PRL Motorsports":"https://prlmotorsports.com",
  "K&N":"https://www.knfilters.com",
  "Injen":"https://injen.com",
};

// Generic mod categories every car can quick-mark, even without a full parts catalog.
const QUICK_UPGRADE_CATEGORIES=["Air Intake","Exhaust","Downpipe","Intercooler","Turbo/Supercharger","Injectors","Spark Plugs","Ignition Coils","Tune/Tuner","Suspension","Brakes","Wheels","Clutch"];

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
  const toggleUpgradeCategory=(cat)=>{const current=activeCar.upgradedCategories||[];const exists=current.includes(cat);syncCar({...activeCar,upgradedCategories:exists?current.filter(c=>c!==cat):[...current,cat]});};

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

  const getCatalog=(car)=>CATALOG[car.make]?.[car.model]||CATALOG["Abarth"]?.[car.model]||CATALOG["Fiat"]?.[car.model]||[];
  const getTorqueSpecs=(car)=>TORQUE_SPECS[car.make]?.[car.model]||TORQUE_SPECS["Abarth"]?.[car.model]||TORQUE_SPECS["Fiat"]?.[car.model]||[];
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
                    <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"28px",flexWrap:"wrap"}}>
                      <BrandDot brand={activeBrand} size={10}/>
                      <span style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"28px",color:"#E8E4DC",letterSpacing:"2px"}}>{activeBrand}</span>
                      {BRAND_LINKS[activeBrand]&&(
                        <a href={BRAND_LINKS[activeBrand]} target="_blank" rel="noopener noreferrer" style={{color:"#FF6B2B",fontSize:"12px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"1px",border:"1px solid #FF6B2B",padding:"5px 12px",borderRadius:"4px"}}>VISIT SITE ↗</a>
                      )}
                    </div>
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
                <span style={LS}>WHAT'S UPGRADED ON THIS CAR?</span>
                <p style={{color:"#555",fontSize:"12px",marginBottom:"16px"}}>Tap what applies — works even for cars without a full parts catalog yet.</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"32px"}}>
                  {QUICK_UPGRADE_CATEGORIES.map(cat=>{
                    const on=(activeCar.upgradedCategories||[]).includes(cat);
                    return(
                      <div key={cat} onClick={()=>toggleUpgradeCategory(cat)} style={{padding:"9px 16px",borderRadius:"4px",border:on?"1px solid #FF6B2B":"1px solid #2A2A2A",background:on?"rgba(255,107,43,0.12)":"#1C1C1C",color:on?"#FF6B2B":"#888",fontSize:"13px",cursor:"pointer",userSelect:"none",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.15s"}}>
                        {on&&<span style={{fontSize:"10px"}}>✓</span>}{cat}
                      </div>
                    );
                  })}
                </div>
                {!activeCar.build||activeCar.build.length===0?(
                  <div style={{textAlign:"center",padding:"48px 0",borderTop:"1px solid #1C1C1C"}}>
                    <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",marginBottom:"8px"}}>NO SPECIFIC PARTS LOGGED YET</div>
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