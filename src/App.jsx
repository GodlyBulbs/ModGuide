import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const VEHICLES = {
  "Fiat": {
    "500 Abarth": {
      years:["2012","2013","2014","2015","2016","2017","2018","2019"],
      trims:{
        "Base":         { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD" },
        "Competizione": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD" },
        "Turismo":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD" },
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
    "124 Spider": {
      years:["2017","2018","2019","2020"],
      trims:{
        "Classica": { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"RWD" },
        "Lusso":    { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"RWD" },
        "Abarth":   { engine:"1.4L Turbocharged 4-cylinder (164hp)", drivetrain:"RWD" },
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
    "500X": {
      years:["2016","2017","2018","2019","2020","2021","2022"],
      trims:{
        "Pop":      { engine:"1.4L Turbocharged 4-cylinder (160hp)", drivetrain:"FWD" },
        "Trekking": { engine:"2.4L 4-cylinder (180hp)", drivetrain:"AWD" },
        "Lounge":   { engine:"2.4L 4-cylinder (180hp)", drivetrain:"AWD" },
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
  "Mazda": {
    "Mazda3": {
      years:["2004","2019","2020","2021","2022","2023"],
      trims:{
        "i Sedan":            { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD" },
        "i Hatchback":        { engine:"2.0L 4-cylinder (148hp)", drivetrain:"FWD" },
        "s Sedan":            { engine:"2.3L 4-cylinder (160hp)", drivetrain:"FWD" },
        "s Hatchback":        { engine:"2.3L 4-cylinder (160hp)", drivetrain:"FWD" },
        "Sport Sedan":        { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Sport Hatchback":    { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Select Sedan":       { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Select Hatchback":   { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Preferred Sedan":    { engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Preferred Hatchback":{ engine:"2.5L 4-cylinder (186hp)", drivetrain:"FWD" },
        "Premium Sedan":      { engine:"2.5L Turbo 4-cylinder (227hp)", drivetrain:"AWD" },
        "Premium Hatchback":  { engine:"2.5L Turbo 4-cylinder (227hp)", drivetrain:"AWD" },
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
    "MX-5 Miata": {
      years:["2016","2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "Sport":         { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD" },
        "Club":          { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD" },
        "Grand Touring": { engine:"2.0L 4-cylinder (181hp)", drivetrain:"RWD" },
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
    "CX-5": {
      years:["2021","2022","2023","2024","2025"],
      trims:{
        "Sport":               { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD" },
        "Touring":             { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD" },
        "Carbon Edition":      { engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD" },
        "Carbon Edition Turbo":{ engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD" },
        "Grand Touring":       { engine:"2.5L 4-cylinder (187hp)", drivetrain:"AWD" },
        "Grand Touring Reserve":{ engine:"2.5L Turbocharged 4-cylinder (227hp)", drivetrain:"AWD" },
        "Signature":           { engine:"2.5L Turbocharged 4-cylinder (256hp)", drivetrain:"AWD" },
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
  },
  "Subaru": {
    "WRX": {
      years:["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "Base":        { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD" },
        "Premium":     { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD" },
        "Limited":     { engine:"2.0L Turbocharged 4-cylinder (268hp)", drivetrain:"AWD" },
        "STI":         { engine:"2.5L Turbocharged 4-cylinder (310hp)", drivetrain:"AWD" },
        "STI Limited": { engine:"2.5L Turbocharged 4-cylinder (310hp)", drivetrain:"AWD" },
      },
      colors:[
        {name:"WR Blue Pearl (Blue)",hex:"#003893"},
        {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
        {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
        {name:"Magnetite Gray Metallic (Gray)",hex:"#5A5F63"},
      ],
    },
    "BRZ": {
      years:["2013","2014","2015","2016","2017","2021","2022","2023"],
      trims:{
        "Premium": { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD" },
        "Limited": { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD" },
        "tS":      { engine:"2.0L 4-cylinder (200hp)", drivetrain:"RWD" },
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
        "Premium": { engine:"2.0L Turbocharged 4-cylinder (250hp)", drivetrain:"AWD" },
        "Touring": { engine:"2.0L Turbocharged 4-cylinder (250hp)", drivetrain:"AWD" },
      },
      colors:[
        {name:"Crystal Black Silica (Black)",hex:"#1A1A1A"},
        {name:"Ice Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Crystal White Pearl (White)",hex:"#F5F5F5"},
        {name:"Wilderness Green Metallic (Green)",hex:"#3B5A3A"},
      ],
    },
    "Ascent": {
      years:["2019","2020","2021","2022","2023","2024","2025"],
      trims:{
        "Base":          { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD" },
        "Premium":       { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD" },
        "Limited":       { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD" },
        "Touring":       { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD" },
        "Onyx Edition":  { engine:"2.4L Turbocharged 4-cylinder (260hp)", drivetrain:"AWD" },
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
  },
  "Volkswagen": {
    "Golf GTI": {
      years:["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "S":        { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD" },
        "SE":       { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD" },
        "Autobahn": { engine:"2.0L Turbocharged 4-cylinder (220hp)", drivetrain:"FWD" },
        "Rabbit":   { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD" },
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
        "Base":      { engine:"2.0L Turbocharged 4-cylinder (292hp)", drivetrain:"AWD" },
        "DCC & Nav": { engine:"2.0L Turbocharged 4-cylinder (292hp)", drivetrain:"AWD" },
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
        "S":                { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD" },
        "Autobahn":         { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD" },
        "35th Anniversary": { engine:"2.0L Turbocharged 4-cylinder (228hp)", drivetrain:"FWD" },
      },
      colors:[
        {name:"Deep Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Pure White (White)",hex:"#F5F5F5"},
        {name:"Tornado Red (Red)",hex:"#C8102E"},
        {name:"Platinum Gray Metallic (Gray)",hex:"#8A8D8F"},
      ],
    },
  },
  "Ford": {
    "Fiesta ST": {
      years:["2014","2015","2016","2017","2018","2019"],
      trims:{
        "Base": { engine:"1.6L EcoBoost Turbocharged 4-cylinder (197hp)", drivetrain:"FWD" },
      },
      colors:[
        {name:"Molten Orange (Orange)",hex:"#E8601C"},
        {name:"Oxford White (White)",hex:"#F5F5F5"},
        {name:"Performance Blue (Blue)",hex:"#1E4B8E"},
        {name:"Shadow Black (Black)",hex:"#1A1A1A"},
        {name:"Race Red (Red)",hex:"#C8102E"},
      ],
    },
    "Mustang GT": {
      years:["2015","2016","2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "Fastback":           { engine:"5.0L V8 (450hp)", drivetrain:"RWD" },
        "Convertible":        { engine:"5.0L V8 (450hp)", drivetrain:"RWD" },
        "Premium Fastback":   { engine:"5.0L V8 (450hp)", drivetrain:"RWD" },
        "Premium Convertible":{ engine:"5.0L V8 (450hp)", drivetrain:"RWD" },
        "California Special": { engine:"5.0L V8 (450hp)", drivetrain:"RWD" },
        "Bullitt":            { engine:"5.0L V8 (480hp)", drivetrain:"RWD" },
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
  },
  "Honda": {
    "Civic Si": {
      years:["2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "Sedan": { engine:"1.5L Turbocharged 4-cylinder (205hp)", drivetrain:"FWD" },
        "Coupe": { engine:"1.5L Turbocharged 4-cylinder (205hp)", drivetrain:"FWD" },
      },
      colors:[
        {name:"Rallye Red (Red)",hex:"#C8102E"},
        {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
        {name:"Aegean Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
        {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
      ],
    },
    "Civic Type R": {
      years:["2017","2018","2019","2020","2021","2022","2023"],
      trims:{
        "Base":    { engine:"2.0L Turbocharged 4-cylinder (306hp)", drivetrain:"FWD" },
        "Limited": { engine:"2.0L Turbocharged 4-cylinder (306hp)", drivetrain:"FWD" },
      },
      colors:[
        {name:"Championship White (White)",hex:"#F5F5F5"},
        {name:"Rallye Red (Red)",hex:"#C8102E"},
        {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
        {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Boost Blue Pearl (Blue)",hex:"#1E4B8E"},
      ],
    },
    "Accord Sport": {
      years:["2018","2019","2020","2021","2022","2023"],
      trims:{
        "Sport":                { engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD" },
        "Sport Special Edition":{ engine:"1.5L Turbocharged 4-cylinder (192hp)", drivetrain:"FWD" },
        "Sport 2.0T":           { engine:"2.0L Turbocharged 4-cylinder (252hp)", drivetrain:"FWD" },
      },
      colors:[
        {name:"Platinum White Pearl (White)",hex:"#F5F5F5"},
        {name:"Crystal Black Pearl (Black)",hex:"#1A1A1A"},
        {name:"Sonic Gray Pearl (Gray)",hex:"#8A8D8F"},
        {name:"Radiant Red Metallic (Red)",hex:"#C8102E"},
      ],
    },
    "Accord": {
      years:["2016"],
      trims:{
        "LX":      { engine:"2.4L 4-cylinder (185hp)", drivetrain:"FWD" },
        "Sport":   { engine:"2.4L 4-cylinder (189hp)", drivetrain:"FWD" },
        "EX":      { engine:"2.4L 4-cylinder (185hp)", drivetrain:"FWD" },
        "EX-L":    { engine:"2.4L 4-cylinder (185hp)", drivetrain:"FWD" },
        "EX-L V6": { engine:"3.5L V6 (278hp)", drivetrain:"FWD" },
        "Touring": { engine:"3.5L V6 (278hp)", drivetrain:"FWD" },
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
        {name:"San Marino Red (Red)",hex:"#C8102E"},
      ],
    },
  },
  "BMW": {
    "M3": {
      years:["2015","2016","2017","2018","2019","2021","2022","2023"],
      trims:{
        "Sedan":       { engine:"3.0L Twin-Turbo 6-cylinder (473hp)", drivetrain:"RWD" },
        "Competition": { engine:"3.0L Twin-Turbo 6-cylinder (503hp)", drivetrain:"RWD" },
        "CS":          { engine:"3.0L Twin-Turbo 6-cylinder (543hp)", drivetrain:"RWD" },
      },
      colors:[
        {name:"Alpine White (White)",hex:"#F5F5F5"},
        {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
        {name:"Portimao Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Isle of Man Green Metallic (Green)",hex:"#2E5A3A"},
        {name:"Sao Paulo Yellow (Yellow)",hex:"#F5C800"},
      ],
    },
    "M235i / M240i": {
      years:["2014","2015","2016","2017","2018","2019","2021","2022"],
      trims:{
        "Coupe":       { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"RWD" },
        "Convertible": { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"RWD" },
        "xDrive":      { engine:"3.0L Turbocharged 6-cylinder (320hp)", drivetrain:"AWD" },
      },
      colors:[
        {name:"Alpine White (White)",hex:"#F5F5F5"},
        {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
        {name:"Estoril Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Melbourne Red Metallic (Red)",hex:"#C8102E"},
        {name:"Mineral Grey Metallic (Gray)",hex:"#8A8D8F"},
      ],
    },
    "328i / 330i": {
      years:["2012","2013","2014","2015","2016","2017","2018","2019"],
      trims:{
        "Sedan":        { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD" },
        "xDrive":       { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"AWD" },
        "Gran Turismo": { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD" },
        "Touring":      { engine:"2.0L Turbocharged 4-cylinder (248hp)", drivetrain:"RWD" },
      },
      colors:[
        {name:"Alpine White (White)",hex:"#F5F5F5"},
        {name:"Black Sapphire Metallic (Black)",hex:"#1A1A1A"},
        {name:"Mineral Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Estoril Blue Metallic (Blue)",hex:"#1E4B8E"},
        {name:"Melbourne Red Metallic (Red)",hex:"#C8102E"},
      ],
    },
  },
  "Dodge": {
    "Caliber": {
      years:["2007","2008","2009","2010","2011","2012"],
      trims:{
        "SE":   { engine:"1.8L 4-cylinder (148hp)", drivetrain:"FWD" },
        "SXT":  { engine:"2.0L 4-cylinder (158hp)", drivetrain:"FWD" },
        "R/T":  { engine:"2.4L 4-cylinder (172hp)", drivetrain:"AWD" },
        "SRT4": { engine:"2.4L Turbocharged 4-cylinder (285hp)", drivetrain:"FWD" },
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
      years:["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"],
      trims:{
        "ST":      { engines:["5.7L HEMI V8 (345hp)","5.9L Cummins Diesel (325hp)","8.0L V10 (305hp)"] },
        "SLT":     { engines:["5.7L HEMI V8 (345hp)","5.9L Cummins Diesel (325hp)","8.0L V10 (305hp)"] },
        "Laramie": { engines:["5.7L HEMI V8 (345hp)","5.9L Cummins Diesel (325hp)"] },
      },
      drivetrainOptions:["2WD","4WD (Part-Time)","4WD (Full-Time)"],
      colors:[
        {name:"Brilliant Black Crystal Pearl (Black)",hex:"#111111"},
        {name:"Bright Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Bright White / White Knuckle (White)",hex:"#F5F5F5"},
        {name:"Flame Red / Poppy Red (Red)",hex:"#C8102E"},
        {name:"Midnight Blue Pearl (Blue)",hex:"#1E3A6B"},
        {name:"Inferno Red Crystal Pearl (Red)",hex:"#9B1B1B"},
        {name:"Patriot Blue Pearl (Blue)",hex:"#1E4B8E"},
        {name:"Mineral Gray Metallic (Gray)",hex:"#6B6E6F"},
        {name:"Dark Khaki Metallic (Khaki)",hex:"#7A7050"},
        {name:"Deep Molten Red Pearl (Dark Red)",hex:"#6B1A1A"},
        {name:"Light Almond Pearl Metallic (Beige)",hex:"#C8B89A"},
        {name:"Solar Yellow (Yellow)",hex:"#F5C800"},
        {name:"Electric Blue Pearl Metallic (Blue)",hex:"#1C6BE8"},
      ],
    },
  },
  "Toyota": {
    "4Runner": {
      years:["1996","1997","1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"],
      trims:{
        "SR5":           { engines:["3.4L V6 (183hp)","2.7L 4-cylinder (150hp)"] },
        "Limited":       { engine:"3.4L V6 (183hp)" },
        "Sport Edition": { engine:"3.4L V6 (183hp)" },
      },
      drivetrainOptions:["2WD","4WD"],
      colors:[
        {name:"Millennium Silver Metallic (Silver)",hex:"#C0C0C0"},
        {name:"Autumn Blaze Metallic (Orange-Brown)",hex:"#B87333"},
        {name:"Imperial Jade Mica (Green)",hex:"#2E5A3A"},
        {name:"Horizon Blue Metallic (Blue)",hex:"#4A7B9D"},
        {name:"Stellar Blue Pearl (Blue)",hex:"#1E4B8E"},
        {name:"Desert Dune Metallic (Tan)",hex:"#C8B89A"},
        {name:"Radiant Red (Red)",hex:"#C8102E"},
        {name:"Sunfire Red Pearl (Red)",hex:"#9B1B30"},
        {name:"Black / Black Onyx (Black)",hex:"#111111"},
        {name:"Natural White (White)",hex:"#F5F5F5"},
      ],
    },
  },
};

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

const roundToTen=(n)=>Math.round(n/10)*10;
const isLight=(hex)=>{const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return(r*299+g*587+b*114)/1000>160;};

const LS={color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px",display:"block"};
const SS={background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",cursor:"pointer",appearance:"none",WebkitAppearance:"none"};
const IS={background:"#1C1C1C",border:"1px solid #333",color:"#E8E4DC",padding:"12px 16px",borderRadius:"4px",fontSize:"15px",width:"100%",fontFamily:"Inter, sans-serif",boxSizing:"border-box"};
const BP=(on)=>({background:on?"#FF6B2B":"#1C1C1C",color:on?"#0D0D0D":"#444",border:"none",padding:"16px 40px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"18px",letterSpacing:"3px",cursor:on?"pointer":"not-allowed",borderRadius:"4px",width:"100%",transition:"all 0.2s"});

function Section({title,content,delay}){
  return(
    <div style={{animation:"fadeSlide 0.4s ease forwards",animationDelay:`${delay}s`,opacity:0,borderLeft:"3px solid #FF6B2B",paddingLeft:"20px",marginBottom:"32px"}}>
      <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"3px",marginBottom:"8px"}}>{title}</div>
      <div style={{color:"#C8C4BC",lineHeight:"1.8",fontSize:"15px",whiteSpace:"pre-wrap"}}>{content}</div>
    </div>
  );
}

function ModChip({label,selected,onClick}){
  return(
    <div onClick={onClick} style={{padding:"8px 14px",borderRadius:"4px",border:selected?"1px solid #FF6B2B":"1px solid #2A2A2A",background:selected?"rgba(255,107,43,0.12)":"#1C1C1C",color:selected?"#FF6B2B":"#666",fontSize:"13px",cursor:"pointer",userSelect:"none",transition:"all 0.15s",display:"flex",alignItems:"center",gap:"6px"}}>
      {selected&&<span style={{fontSize:"10px"}}>✓</span>}{label}
    </div>
  );
}

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
    key:"brakes",
    name:"Brake Pads & System Check",
    mileInterval:12000,
    monthInterval:12,
    notes:()=>"Interval varies with driving style — inspect pad thickness and rotor condition.",
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
      <div style={{color:textColor,fontSize:"12px",opacity:0.85,marginBottom:"2px"}}>{[car.trim,car.engine,car.drivetrain].filter(Boolean).join(" · ")}</div>
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
  const [fYear,setFYear]=useState("");
  const [fTrim,setFTrim]=useState("");
  const [fEngine,setFEngine]=useState("");
  const [fDrivetrain,setFDrivetrain]=useState("");
  const [fColor,setFColor]=useState(null);

  const makes=Object.keys(VEHICLES);
  const models=fMake?Object.keys(VEHICLES[fMake]):[];
  const vData=fMake&&fModel?VEHICLES[fMake][fModel]:null;
  const years=vData?vData.years:[];
  const trims=vData?Object.keys(vData.trims):[];
  const autoEngine=fTrim&&vData?vData.trims[fTrim]?.engine:"";
  const engineOptions=fTrim&&vData?vData.trims[fTrim]?.engines||[]:[];
  const needsEnginePicker=engineOptions.length>0;
  const autoDrivetrain=fTrim&&vData?vData.trims[fTrim]?.drivetrain:"";
  const drivetrainOptions=vData?.drivetrainOptions||[];
  const needsDrivetrainPicker=drivetrainOptions.length>0;
  const colors=vData?vData.colors:[];
  const canSave=fMake&&fModel&&fYear&&fTrim&&(needsEnginePicker?fEngine:true)&&(needsDrivetrainPicker?fDrivetrain:true)&&fColor;

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
        <SW label="MAKE" val={fMake} set={v=>{setFMake(v);setFModel("");setFYear("");setFTrim("");setFEngine("");setFDrivetrain("");setFColor(null);}} opts={makes} placeholder="Select make" disabled={false}/>
        <SW label="MODEL" val={fModel} set={v=>{setFModel(v);setFYear("");setFTrim("");setFEngine("");setFDrivetrain("");setFColor(null);}} opts={models} placeholder="Select model" disabled={!fMake}/>
        <SW label="YEAR" val={fYear} set={v=>{setFYear(v);setFTrim("");setFEngine("");setFDrivetrain("");}} opts={years} placeholder="Select year" disabled={!fModel}/>
      </div>
      {fYear&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="TRIM" val={fTrim} set={v=>{setFTrim(v);setFEngine("");setFDrivetrain("");}} opts={trims} placeholder="Select trim" disabled={false}/></div>}
      {fTrim&&autoEngine&&(
        <InfoBox label="ENGINE" value={autoEngine}/>
      )}
      {fTrim&&needsEnginePicker&&<div style={{marginBottom:"24px",animation:"fadeSlide 0.3s ease forwards"}}><SW label="ENGINE" val={fEngine} set={setFEngine} opts={engineOptions} placeholder="Select engine" disabled={false}/></div>}
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
              <div style={{color:"#E8E4DC",fontSize:"14px"}}>{fYear} {fMake} {fModel} {fTrim}</div>
              <div style={{color:"#888",fontSize:"12px"}}>{fColor.name}{(autoEngine||fEngine)?` · ${autoEngine||fEngine}`:""}{(autoDrivetrain||fDrivetrain)?` · ${autoDrivetrain||fDrivetrain}`:""}</div>
            </div>
          </div>
        </div>
      )}
      <button onClick={()=>onSave({make:fMake,model:fModel,year:fYear,trim:fTrim,engine:autoEngine||fEngine,drivetrain:autoDrivetrain||fDrivetrain,colorName:fColor?.name,colorHex:fColor?.hex,mileage:0,build:[],maintenance:[]})} disabled={!canSave} style={BP(canSave)}>SAVE TO GARAGE</button>
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
  const [selectedMod,setSelectedMod]=useState("");
  const [loading,setLoading]=useState(false);
  const [sections,setSections]=useState(null);
  const [genError,setGenError]=useState("");
  const [showBell,setShowBell]=useState(false);
  const [editMileage,setEditMileage]=useState(false);
  const [tempMileage,setTempMileage]=useState("");
  const [doneItem,setDoneItem]=useState(null);
  const [doneMileageInput,setDoneMileageInput]=useState("");

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
  const openCar=(car)=>{setActiveCar(car);setActiveBrand(null);setSections(null);setSelectedMod("");setActiveTab("maintenance");setWizardStep(-1);setView("car-detail");};
  const syncCar=async(updated)=>{setGarage(prev=>prev.map(c=>c.id===updated.id?updated:c));setActiveCar(updated);await updateGarageItem(updated);};
  const toggleBuildItem=(item)=>{const exists=activeCar.build&&activeCar.build.find(b=>b.brand===item.brand&&b.part===item.part);syncCar({...activeCar,build:exists?activeCar.build.filter(b=>!(b.brand===item.brand&&b.part===item.part)):[...(activeCar.build||[]),item]});};

  const [wizardStep,setWizardStep]=useState(-1);
  const [wizardMileage,setWizardMileage]=useState("");
  const [wizardAnswers,setWizardAnswers]=useState({});

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
    syncCar({...activeCar,maintenance:activeCar.maintenance.map(i=>i.name===doneItem.name?{...i,lastMiles:miles,lastDate:new Date().toISOString()}:i),mileage:miles});
    setDoneItem(null);
  };
  const updateMileage=()=>{syncCar({...activeCar,mileage:roundToTen(parseInt(tempMileage)||0)});setEditMileage(false);};

  const getCatalog=(car)=>CATALOG[car.make]?.[car.model]||[];
  const getBrands=(car)=>[...new Set(getCatalog(car).map(i=>i.brand))];
  const getCategoriesForBrand=()=>{if(!activeCar||!activeBrand)return{};const cats={};getCatalog(activeCar).filter(i=>i.brand===activeBrand).forEach(i=>{if(!cats[i.category])cats[i.category]=[];cats[i.category].push(i);});return cats;};
  const guideCategories=activeCar?[...new Set(getCatalog(activeCar).map(i=>i.category))]:[];

  const generate=async()=>{
    if(!activeCar||!selectedMod)return;
    setLoading(true);setSections(null);setGenError("");
    const buildContext=activeCar.build&&activeCar.build.length>0?`Car already has: ${activeCar.build.map(b=>`${b.brand} ${b.part}`).join(", ")}. Factor these in.`:"";
    const prompt=`You are a real-world automotive mod expert. User has a ${activeCar.year} ${activeCar.make} ${activeCar.model}${activeCar.trim?` ${activeCar.trim}`:""}${activeCar.engine?` with ${activeCar.engine}`:""}${activeCar.drivetrain?` (${activeCar.drivetrain})`:""}. Guide for: ${selectedMod}. ${buildContext} Return ONLY this JSON, no markdown: {"overview":"2-3 sentence honest summary.","tools":"Exact tools, one per line with a dash.","location":"Where on this specific car.","install":"Numbered steps with real details.","gotchas":"What nobody tells you — most important section.","diagnostic":"What to check if something seems off after install.","verdict":"Honest take. Worth it?"}`;
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      setSections(JSON.parse(data.content.map(b=>b.text||"").join("").replace(/```json|```/g,"").trim()));
      setView("guide");
    }catch{setGenError("Something went wrong. Try again.");}finally{setLoading(false);}
  };

  const SECTION_MAP=[{key:"overview",title:"OVERVIEW"},{key:"tools",title:"TOOLS & PARTS"},{key:"location",title:"WHERE TO FIND IT ON YOUR CAR"},{key:"install",title:"INSTALL WALKTHROUGH"},{key:"gotchas",title:"WHAT NOBODY TELLS YOU"},{key:"diagnostic",title:"POST-INSTALL DIAGNOSTIC"},{key:"verdict",title:"VERDICT"}];
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
          {view!=="garage"&&view!=="add-car"&&<button onClick={()=>{view==="guide"?setView("car-detail"):setView("garage");}} style={{background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:"13px"}}>{view==="guide"?"← Back":"← Garage"}</button>}
          <button onClick={()=>supabase.auth.signOut()} style={{background:"none",border:"1px solid #2A2A2A",color:"#555",padding:"6px 14px",borderRadius:"4px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px"}}>LOG OUT</button>
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",padding:"0 24px"}}>
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
              <div style={{color:"#888",fontSize:"13px",marginBottom:"4px"}}>{[activeCar.trim,activeCar.engine,activeCar.drivetrain].filter(Boolean).join(" · ")}</div>
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
              <Tab id="guides" label="GUIDES"/>
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
                      <div style={{color:"#555",fontSize:"14px",marginBottom:"32px",maxWidth:"360px",margin:"0 auto 32px"}}>A few quick questions about your {activeCar.year} {activeCar.make} {activeCar.model} — oil, tires, air filter, brakes.</div>
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
                      return(
                        <div key={i} style={{background:"#1C1C1C",border:`1px solid ${sc==="unset"?"#2A2A2A":STATUS_COLORS[sc]+"44"}`,borderRadius:"6px",padding:"16px",marginBottom:"10px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                              <div style={{width:"8px",height:"8px",borderRadius:"50%",background:STATUS_COLORS[sc],flexShrink:0}}/>
                              <span style={{color:"#E8E4DC",fontSize:"14px",fontWeight:"500"}}>{item.name}</span>
                            </div>
                            <div style={{color:"#555",fontSize:"12px",paddingLeft:"16px"}}>Every {item.mileInterval.toLocaleString()} mi{item.lastMiles?` · Last: ${item.lastMiles.toLocaleString()} mi · Next: ${milesDue.toLocaleString()} mi`:" · Not logged yet"}</div>
                            {item.notes&&<div style={{color:"#666",fontSize:"11px",paddingLeft:"16px",marginTop:"2px"}}>{item.notes}</div>}
                          </div>
                          <button onClick={()=>markDone(item)} style={{background:"rgba(28,232,74,0.1)",border:"1px solid rgba(28,232,74,0.3)",color:"#1CE84A",padding:"6px 14px",borderRadius:"3px",cursor:"pointer",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",whiteSpace:"nowrap",flexShrink:0}}>✓ DONE</button>
                        </div>
                      );
                    })}
                    <button onClick={()=>{syncCar({...activeCar,maintenance:[]});setWizardStep(-1);}} style={{background:"transparent",border:"1px solid #2A2A2A",color:"#444",padding:"10px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"2px",cursor:"pointer",borderRadius:"4px",width:"100%",marginTop:"16px"}}>RESET & REDO SETUP</button>
                  </div>
                )}
              </div>
            )}

            {activeTab==="guides"&&(
              <div>
                {activeCar.build&&activeCar.build.length>0&&(
                  <div style={{marginBottom:"24px",padding:"14px 18px",background:"#1C1C1C",borderRadius:"4px",borderLeft:"3px solid #FF6B2B"}}>
                    <div style={{color:"#FF6B2B",fontFamily:"'Bebas Neue', sans-serif",fontSize:"11px",letterSpacing:"3px",marginBottom:"8px"}}>YOUR BUILD WILL BE FACTORED IN</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>{activeCar.build.map((item,i)=><span key={i} style={{background:"rgba(255,107,43,0.08)",border:"1px solid rgba(255,107,43,0.2)",color:"#C8C4BC",fontSize:"11px",padding:"3px 8px",borderRadius:"3px",display:"flex",alignItems:"center"}}><BrandDot brand={item.brand} size={6}/>{item.brand} {item.part}</span>)}</div>
                  </div>
                )}
                {guideCategories.length===0?(
                  <div style={{textAlign:"center",padding:"48px 0"}}>
                    <div style={{color:"#333",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",marginBottom:"8px"}}>NO GUIDES YET FOR THIS CAR</div>
                    <div style={{color:"#444",fontSize:"14px"}}>We're adding more cars and guides all the time.</div>
                  </div>
                ):(
                  <div>
                    <span style={LS}>WHAT DO YOU WANT A GUIDE FOR?</span>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px"}}>{guideCategories.map(cat=><ModChip key={cat} label={cat} selected={selectedMod===cat} onClick={()=>setSelectedMod(selectedMod===cat?"":cat)}/>)}</div>
                    {genError&&<div style={{color:"#FF6B2B",marginBottom:"12px",fontSize:"14px"}}>{genError}</div>}
                    {loading&&<div style={{marginBottom:"24px"}}><div style={{height:"2px",background:"#1C1C1C",borderRadius:"2px",overflow:"hidden"}}><div style={{height:"100%",background:"#FF6B2B",animation:"loadBar 2s ease infinite",width:"40%"}}/></div><div style={{color:"#444",fontSize:"13px",marginTop:"10px",fontFamily:"'Bebas Neue', sans-serif",letterSpacing:"2px"}}>PULLING FROM THE COLLECTIVE KNOWLEDGE...</div></div>}
                    <button onClick={generate} disabled={!selectedMod||loading} style={BP(selectedMod&&!loading)}>{loading?"GENERATING...":"GENERATE GUIDE"}</button>
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

        {view==="guide"&&sections&&activeCar&&(
          <div style={{paddingTop:"48px",paddingBottom:"80px"}}>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"13px",letterSpacing:"3px",color:"#444",marginBottom:"6px"}}>GUIDE FOR</div>
            <div style={{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(24px,5vw,40px)",color:"#E8E4DC",lineHeight:"1.1",marginBottom:"40px"}}>
              {activeCar.year} {activeCar.make} {activeCar.model}{activeCar.trim?` ${activeCar.trim}`:""}<br/>
              <span style={{color:"#FF6B2B"}}>— {selectedMod}</span>
            </div>
            {SECTION_MAP.map(({key,title},i)=>sections[key]&&<Section key={key} title={title} content={sections[key]} delay={i*0.15}/>)}
            <div style={{marginTop:"48px",padding:"20px",background:"#1C1C1C",borderRadius:"4px",fontSize:"13px",color:"#555",lineHeight:"1.6"}}>AI-generated from community knowledge. Always verify torque specs with your factory service manual. Mod at your own risk — you already knew that.</div>
            <button onClick={()=>setView("car-detail")} style={{marginTop:"24px",background:"transparent",color:"#FF6B2B",border:"1px solid #FF6B2B",padding:"14px 32px",fontFamily:"'Bebas Neue', sans-serif",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",borderRadius:"4px",width:"100%"}}>← BACK TO {activeCar.year} {activeCar.make} {activeCar.model}</button>
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