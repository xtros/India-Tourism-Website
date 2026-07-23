import React, { useState, useEffect } from "react";
import { indiaStatesData } from "../data/indiaStatesData";

// Curated high-quality image URLs for Indian tourism regions
export const regionImages = {
  // Andhra Pradesh
  "Visakhapatnam": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "Araku Valley": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "Tirupati": "https://images.unsplash.com/photo-1600100397608-f010e42ed97c?auto=format&fit=crop&w=600&q=80",

  // Arunachal Pradesh
  "Tawang": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
  "Ziro Valley": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80",

  // Assam
  "Kaziranga National Park": "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80",
  "Majuli Island": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",

  // Bihar
  "Bodh Gaya": "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80",

  // Goa
  "North Goa Beaches": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "South Goa": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
  "Old Goa": "https://images.unsplash.com/photo-1590076247563-7eb63c9e55a3?auto=format&fit=crop&w=600&q=80",

  // Gujarat
  "Rann of Kutch": "https://images.unsplash.com/photo-1627894483216-2138af692e2e?auto=format&fit=crop&w=600&q=80",
  "Gir National Park": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",

  // Himachal Pradesh
  "Manali & Solang Valley": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
  "Shimla": "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80",
  "Spiti Valley": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",

  // Karnataka
  "Hampi Ruins": "https://images.unsplash.com/photo-1600100397608-f010e42ed97c?auto=format&fit=crop&w=600&q=80",
  "Coorg (Kodagu)": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",

  // Kerala
  "Alleppey Backwaters": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
  "Munnar Hills": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",

  // Madhya Pradesh
  "Khajuraho Temples": "https://images.unsplash.com/photo-1626285888211-6be3f0e0413?auto=format&fit=crop&w=600&q=80",
  "Kanha Tiger Reserve": "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80",

  // Maharashtra
  "Mumbai": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80",
  "Ajanta & Ellora Caves": "https://images.unsplash.com/photo-1608958220038-f010e42ed97c?auto=format&fit=crop&w=600&q=80",

  // Rajasthan
  "Jaipur (Pink City)": "https://images.unsplash.com/photo-1603258838383-8b7c7b2a6b2a?auto=format&fit=crop&w=600&q=80",
  "Udaipur (City of Lakes)": "https://images.unsplash.com/photo-1562137976-a19c5c2d3a33?auto=format&fit=crop&w=600&q=80",
  "Jaisalmer (Golden City)": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",

  // Tamil Nadu
  "Madurai Meenakshi Temple": "https://images.unsplash.com/photo-1600100397608-f010e42ed97c?auto=format&fit=crop&w=600&q=80",
  "Mahabalipuram": "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80",

  // Uttar Pradesh
  "Agra (Taj Mahal)": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
  "Varanasi (Kashi)": "https://images.unsplash.com/photo-1561361062-0be862a7c445?auto=format&fit=crop&w=600&q=80",

  // Uttarakhand
  "Rishikesh & Haridwar": "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80",
  "Valley of Flowers": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",

  // West Bengal
  "Kolkata": "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=600&q=80",
  "Darjeeling": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80",

  // Ladakh
  "Pangong Tso Lake": "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80",
};



// Maps all 29 states/union territories to landscape themes (aligned with exact state IDs in data module)
export const getStateTheme = (stateId) => {
  const mountainStates = [
    "himachalpradesh", "uttarakhand", "sikkim", "arunachalpradesh", "ladakh"
  ];
  const desertStates = [
    "rajasthan", "gujarat", "haryana", "punjab"
  ];
  const coastalStates = [
    "goa", "kerala", "tamilnadu", "andhrapradesh", "odisha",
    "maharashtra", "westbengal", "karnataka"
  ];
  const natureStates = [
    "assam", "meghalaya", "manipur", "mizoram", "nagaland",
    "tripura", "jharkhand", "chhattisgarh"
  ];

  if (mountainStates.includes(stateId)) return 'mountain';
  if (desertStates.includes(stateId)) return 'desert';
  if (coastalStates.includes(stateId)) return 'coastal';
  if (natureStates.includes(stateId)) return 'nature';
  return 'heritage'; // Default landscape theme
};

export const stateVideos = {
  uttarpradesh: "KOXCeSr6Npc",
  goa: "ZHqaLQ1OeEg",
  chhattisgarh: "17zfNF6nEE4",
  bihar: "TD8PIAVOXVA",
  himachalpradesh: "c2SGeoswx_U",
  andhrapradesh: "c08nCab9dpA",
  rajasthan: "tjOKN0r58Es",
  kerala: "LqoH4uqm9XU",
  meghalaya: "zFXnrYhufxA",
  arunachalpradesh: "GJ9wUxjxUsw",
  assam: "CQfwItBImLs",
  gujarat: "ovrtKeuk5VQ",
  haryana: "v_s-Cem-K7c",
  jharkhand: "eDIJv93S_tQ",
  karnataka: "l4nYZTanUeE",
  madhyapradesh: "TSasJIPojyw",
  maharashtra: "YTxt0b5sWDI",
  manipur: "ILhRZ6rP9eg",
  mizoram: "Wq7l7YFEBHQ",
  nagaland: "55O45olp_Bo",
  odisha: "Uqmc0891L2U",
  punjab: "m701WKQMeYQ",
  sikkim: "zRYd7uTU2hM",
  tamilnadu: "6RWTmulkXXg",
  telangana: "mI0jIjF7Cms",
  tripura: "JMTP5EDAkWI",
  uttarakhand: "Zyj-WSM6UeY",
  westbengal: "x14XguC9Nx4",
  ladakh: "ZFLsBXFK3Pc",
  jammuandkashmir: "Cjl70Cqo3Q4",
  andamanandnicobar: "TC7dENmpaM0",
  delhi: "JW1jSINTzaw",
  chandigarh: "QkSknzNIvNo",
  puducherry: "o4gjoA6crhw",
  lakshadweep: "vKXOJD2q1rg",
  damananddiu: "jmSsV6LIygM",
};

export const stateMp4Videos = {
  // Mountain / Himalayan states
  jammuandkashmir: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-41529-large.mp4",
  ladakh: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-41529-large.mp4",
  himachalpradesh: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  uttarakhand: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  sikkim: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-41529-large.mp4",
  arunachalpradesh: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",

  // Coastal / Tropical states
  kerala: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
  goa: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
  tamilnadu: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
  andamanandnicobar: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
  lakshadweep: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
  puducherry: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",

  // Desert / Royal West states
  rajasthan: "https://assets.mixkit.co/videos/preview/mixkit-dunes-in-a-desert-41530-large.mp4",
  gujarat: "https://assets.mixkit.co/videos/preview/mixkit-dunes-in-a-desert-41530-large.mp4",

  // Nature / Rainforest / Forest states
  meghalaya: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  assam: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  nagaland: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  manipur: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  mizoram: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  tripura: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  chhattisgarh: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
  madhyapradesh: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",

  // Heritage / Urban states
  maharashtra: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  karnataka: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  andhrapradesh: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  telangana: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  uttarpradesh: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  bihar: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  westbengal: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  odisha: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  punjab: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  haryana: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  jharkhand: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  delhi: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  chandigarh: "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4",
  dadraandnagarhavelianddamananddiu: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-41526-large.mp4",
};

export const defaultMp4Video = "https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1187-large.mp4";

const themeColors = {
  mountain: { main: '#38bdf8', hover: '#7dd3fc' }, // Sky Blue
  desert: { main: '#fbbf24', hover: '#fcd34d' },   // Amber Gold
  coastal: { main: '#34d399', hover: '#6ee7b7' },  // Emerald Green
  nature: { main: '#a3e635', hover: '#bef264' },   // Lime Green
  heritage: { main: '#fb7185', hover: '#fda4af' }  // Rose Pink
};

const getStateTitleClass = (name) => {
  if (!name) return "text-3xl sm:text-5xl md:text-6xl";
  if (name.length > 15) return "text-2xl sm:text-3xl md:text-4xl lg:text-5xl";
  if (name.length > 10) return "text-2xl sm:text-4xl md:text-5xl";
  return "text-3xl sm:text-5xl md:text-6xl";
};

export const videoStartTimes = {
  andhrapradesh: 21,
  arunachalpradesh: 0,
  assam: 8,
  bihar: 4,
  chhattisgarh: 24,
  goa: 5,
  gujarat: 22,
  haryana: 0,
  himachalpradesh: 10,
  jharkhand: 0,
  karnataka: 20,
  kerala: 0,
  madhyapradesh: 12,
  maharashtra: 0,
  manipur: 0,
  meghalaya: 6,
  mizoram: 0,
  nagaland: 0,
  odisha: 9,
  punjab: 6,
  rajasthan: 11,
  sikkim: 6,
  tamilnadu: 0,
  telangana: 0,
  tripura: 6,
  uttarpradesh: 0,
  uttarakhand: 10,
  westbengal: 0,
  // Union Territories
  ladakh: 9,
  jammuandkashmir: 0,
  andamanandnicobar: 0,
  delhi: 0,
  chandigarh: 7,
  puducherry: 0,
  lakshadweep: 0,
  damananddiu: 5,
};

const Html = ({ section, setSection, onOpenDetail }) => {
  const activeState = section > 0 && section <= indiaStatesData.length ? indiaStatesData[section - 1] : null;
  const activeTheme = activeState ? getStateTheme(activeState.id) : null;
  const videoId = activeState ? stateVideos[activeState.id] : null;
  const startTime = activeState ? (videoStartTimes[activeState.id] || 0) : 0;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=${startTime}&playsinline=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&rel=0&showinfo=0&autohide=1`
    : null;

  // Selected State for full-page culture & heritage modal now handled via new tab routing

  // Real-time IST clock hook for footer
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setIstTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen relative text-white">

      {/* Dynamic Ambient Background Zero-Controls Video Overlay for State Pages */}
      {embedUrl && (
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden transition-opacity duration-1000 bg-[#06060f]"
          style={{ opacity: section > 0 && section <= indiaStatesData.length && videoId ? 0.35 : 0 }}
        >
          <iframe
            key={embedUrl}
            src={embedUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            tabIndex="-1"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.75] md:scale-[1.85] brightness-[0.85] contrast-[1.05]"
            style={{
              width: "100vw",
              height: "100vh",
              minWidth: "177.78vh",
              minHeight: "56.25vw",
            }}
          />
        </div>
      )}

      {/* SECTION 0: HERO / LANDING */}
      <section className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center px-6 text-center select-none">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[0.25em] sm:tracking-[0.3em] font-display text-tiranga drop-shadow-[0_5px_30px_rgba(255,153,51,0.35)] uppercase animate-fade-in">
          BHARAT
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.5em] mt-6 md:mt-8 uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] flex items-center justify-center space-x-1.5 sm:space-x-3">
          <span className="text-[#FF9933]">INCREDIBLE INDIA</span>
          <span className="text-white font-mono">•</span>
          <span className="text-[#138808]">ONE LAND, A MILLION JOURNEYS</span>
        </p>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-80">
          <span className="text-[9px] tracking-[0.3em] uppercase text-red-400 font-mono">Scroll to Begin</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-red-500 to-amber-400 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-amber-300 rounded-full animate-bounce shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
        </div>
      </section>

      {/* SECTIONS 1 - 29: STATE DETAILS */}
      {indiaStatesData.map((state, idx) => {
        const topPosition = `${(idx + 1) * 100}vh`;
        const isCurrent = section === idx + 1;

        return (
          <section
            key={state.id}
            className="absolute left-0 w-full h-screen flex items-center px-4 sm:px-8 md:px-24 select-none"
            style={{ top: topPosition }}
          >
            {/* Slide-in details card with warm, humanistic editorial glass design */}
            <div
              className={`w-full max-w-lg md:max-w-3xl max-h-[85vh] overflow-y-auto scrollbar-thin bg-[#0e070c]/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-1000 transform ${isCurrent
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 -translate-x-16 scale-90 pointer-events-none"
                }`}
              style={{
                '--theme-main': themeColors[activeTheme]?.main || themeColors.heritage.main,
                '--theme-hover': themeColors[activeTheme]?.hover || themeColors.heritage.hover,
                '--theme-bg-light': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '1A', 
                '--theme-border': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '4D',
                '--theme-shadow': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '33',
              }}
            >
              {/* Top Humanistic Meta Pill Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/15 text-xs font-sans font-medium tracking-wide flex items-center space-x-1.5 shadow-sm">
                  <span>🏛️</span>
                  <span>Capital: <strong className="text-white">{state.capital}</strong></span>
                </span>
              </div>

              {/* Title & Tagline Header */}
              <div className="border-b border-white/10 pb-5 mb-6">
                <h2 className={`${getStateTitleClass(state.name)} font-black font-display tracking-normal sm:tracking-wider text-white uppercase leading-tight sm:leading-none drop-shadow-md break-normal hyphens-none`}>
                  {state.name}
                </h2>
                <p className="text-sm sm:text-base font-serif italic text-amber-300/90 tracking-wide mt-2.5 drop-shadow-sm">
                  "{state.tagline}"
                </p>
              </div>

              {/* Editorial Description */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-7 font-sans font-normal">
                {state.description}
              </p>

              {/* Key Tourism Regions - Horizontal Carousel */}
              <div className="mb-7">
                <h4 className="text-xs font-bold text-slate-300 uppercase mb-4 font-sans tracking-wider flex items-center space-x-2">
                  <span>🌄</span>
                  <span>Key Highlights & Destinations</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pb-2 w-full">
                  {state.regions.map((region) => {
                    const regionImageUrl = regionImages[region.name] || region.imageUrl || state.imageUrl || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80";

                    return (
                      <div
                        key={region.name}
                        className="w-full bg-white/5 rounded-2xl p-3 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-amber-400/40 overflow-hidden group flex flex-col shadow-md"
                      >
                        {/* Region Image Card header */}
                        <div className="w-full h-30 sm:h-36 rounded-xl overflow-hidden mb-3 shadow-inner relative">
                          <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500 z-10" />
                          <img
                            src={regionImageUrl}
                            alt={region.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = state.imageUrl || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80";
                            }}
                            loading="lazy"
                          />
                        </div>
                        <div className="px-1 pb-1 flex-1 flex flex-col">
                          <div className="text-xs font-bold text-white tracking-wide mb-1 font-display group-hover:text-amber-300 transition-colors">
                            {region.name}
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-3">
                            {region.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Humanistic Call-to-Action Bar */}
              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-sans text-slate-300 leading-relaxed flex items-center space-x-2">
                  <span>📖</span>
                  <span>Discover full heritage & travel guide for <span className="text-amber-300 font-semibold">{state.name}</span></span>
                </div>
                <button
                  onClick={() => {
                    if (onOpenDetail) onOpenDetail(state.id);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider font-sans hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.35)] active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Explore Heritage</span>
                  <span className="text-base leading-none">→</span>
                </button>
              </div>
            </div>
          </section>
        );
      })}

      {/* SECTION N+1: GRAND FOOTER (CENTERED) */}
      <section
        className="absolute left-0 w-full min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-16 text-white bg-[#080205]/95 backdrop-blur-2xl border-t border-red-500/30 select-none z-10"
        style={{ top: `${(indiaStatesData.length + 1) * 100}vh` }}
      >
        <div className="max-w-6xl w-full mx-auto flex flex-col justify-center items-center space-y-12 my-auto text-center">
          {/* Main 2-Column Grid (Centered Content) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full max-w-4xl mx-auto items-start">
            {/* Col 1: Brand Info */}
            <div className="space-y-4 flex flex-col items-center text-center">
              <div className="flex items-center justify-center">
                <img
                  src="https://i.ibb.co/Xf1CQLs6/yatra-logo.png"
                  alt="Yatra Logo"
                  className="h-16 md:h-24 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(220,38,38,0.4)]"
                />
              </div>
              <p className="text-xs text-rose-100/70 leading-relaxed font-sans max-w-sm">
                An immersive 3D interactive exploration of India's 28 States and 8 Union Territories. Discover ancient heritage, vibrant festivals, pristine landscapes, and timeless culture.
              </p>
            </div>

            {/* Col 2: Tourist Helplines */}
            <div className="space-y-4 flex flex-col items-center text-center">
              <h4 className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase font-mono mb-2 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                Helpline & Info
              </h4>
              <div className="space-y-3.5 text-xs text-slate-300 font-sans w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 max-w-xs mx-auto">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">24x7 Tourist Helpline (Toll-Free)</span>
                  <span className="text-sm font-bold font-mono text-white">📞 1800-11-1363 / 1363</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <span className="text-[9px] text-slate-400 font-mono uppercase block">Emergency</span>
                    <span className="text-xs font-bold font-mono text-sky-400">🚨 112</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                    <span className="text-[9px] text-slate-400 font-mono uppercase block">Portal</span>
                    <span className="text-xs font-mono text-amber-300">incredibleindia.gov.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar (Centered) */}
          <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <div>
              © 2026 YATRA BHARAT. All Rights Reserved.
            </div>
            <div className="flex items-center space-x-6 text-slate-400 text-xs font-mono">
              <span className="text-slate-200 font-mono flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-amber-400 font-bold">IST</span>
                <span>{istTime || "02:55:17 PM"}</span>
              </span>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-amber-400 hover:underline font-bold">Top ↑</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Html;
