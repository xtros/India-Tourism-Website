import React, { useState } from "react";
import { getStateTheme, stateVideos, regionImages, stateMp4Videos, defaultMp4Video } from "./Html";
import { stateCapitalCoordinates, calculateDistance, estimateTravelCosts } from "../data/travelData";

// Curated culture data fallbacks for states and UTs
const stateCultureData = {
  kerala: {
    dance: "Kathakali & Theyyam",
    attire: "Mundum Neryathum",
    cuisine: "Kerala Sadya, Appam & Stew, Malabar Parotta",
    bestTime: "September to March",
    language: "Malayalam"
  },
  rajasthan: {
    dance: "Ghoomar & Kalbelia",
    attire: "Ghagra Choli & Bandhani Safa",
    cuisine: "Dal Baati Churma, Laal Maas, Ghevar",
    bestTime: "October to March",
    language: "Hindi & Rajasthani"
  },
  tamilnadu: {
    dance: "Bharatanatyam",
    attire: "Kanjeevaram Silk Saree & Veshti",
    cuisine: "Dosa, Idli, Chettinad Chicken, Filter Coffee",
    bestTime: "November to March",
    language: "Tamil"
  },
  ladakh: {
    dance: "Cham Masked Dance & Jabro",
    attire: "Goncha & Perak Turquoise Headpiece",
    cuisine: "Thukpa, Momos, Butter Tea (Gur Gur Chai)",
    bestTime: "May to September",
    language: "Ladakhi, Bhoti"
  },
  delhi: {
    dance: "Kathak & Classical Fusion",
    attire: "Indo-Western & Traditional Kurta",
    cuisine: "Chole Bhature, Butter Chicken, Paranthas, Chaat",
    bestTime: "October to March",
    language: "Hindi, English, Punjabi"
  },
  andamanandnicobar: {
    dance: "Nicobarese Tribal Dance",
    attire: "Coastal Linen & Traditional Weaves",
    cuisine: "Seafood Curry, Grilled Fish, Coconut Dishes",
    bestTime: "October to May",
    language: "Hindi, Bengali, English"
  },
  goa: {
    dance: "Fugdi & Dekhnni",
    attire: "Pano Bhaju & Casual Beachwear",
    cuisine: "Goan Fish Curry Rice, Bebinca, Vindaloo",
    bestTime: "November to February",
    language: "Konkani, English"
  },
  gujarat: {
    dance: "Garba & Dandiya Raas",
    attire: "Chaniya Choli & Kediyu",
    cuisine: "Dhokla, Khandvi, Gujarati Thali, Undhiyu",
    bestTime: "October to March",
    language: "Gujarati"
  },
  westbengal: {
    dance: "Chhau Dance & Baul Songs",
    attire: "Baluchari Saree & Dhoti Panjabi",
    cuisine: "Shorshe Ilish, Rasgulla, Mishti Doi, Kosha Mangsho",
    bestTime: "October to March",
    language: "Bengali"
  },
  maharashtra: {
    dance: "Lavani & Koli Dance",
    attire: "Nauvari Saree & Pheta Turbans",
    cuisine: "Vada Pav, Misal Pav, Puran Poli, Modak",
    bestTime: "October to March",
    language: "Marathi"
  }
};

const defaultCultureFallback = {
  dance: "Traditional Regional Folk Dance",
  attire: "Handloom Weaves & Heritage Attire",
  cuisine: "Authentic Regional Thali & Local Delicacies",
  bestTime: "October to March",
  language: "Regional Language"
};

const stateLanguages = {
  "andhrapradesh": "Telugu",
  "arunachalpradesh": "English, Hindi, Monpa",
  "assam": "Assamese, Bodo, Bengali",
  "bihar": "Hindi, Bhojpuri, Maithili",
  "chhattisgarh": "Hindi, Chhattisgarhi",
  "goa": "Konkani, Marathi, English",
  "gujarat": "Gujarati",
  "haryana": "Hindi, Haryanvi, Punjabi",
  "himachalpradesh": "Hindi, Pahari",
  "jharkhand": "Hindi, Santali, Khortha",
  "karnataka": "Kannada",
  "kerala": "Malayalam",
  "madhyapradesh": "Hindi",
  "maharashtra": "Marathi",
  "manipur": "Meiteilon (Manipuri)",
  "meghalaya": "English, Khasi, Garo",
  "mizoram": "Mizo, English",
  "nagaland": "English, Nagamese",
  "odisha": "Odia",
  "punjab": "Punjabi",
  "rajasthan": "Hindi, Rajasthani, Marwari",
  "sikkim": "Nepali, Sikkimese, Lepcha, English",
  "tamilnadu": "Tamil",
  "telangana": "Telugu, Urdu",
  "tripura": "Bengali, Kokborok",
  "uttarpradesh": "Hindi, Urdu, Awadhi, Bhojpuri",
  "uttarakhand": "Hindi, Garhwali, Kumaoni",
  "westbengal": "Bengali, Nepali",
  "andamanandnicobar": "Hindi, English, Bengali, Tamil, Telugu",
  "chandigarh": "English, Hindi, Punjabi",
  "dadraandnagarhavelianddamananddiu": "Gujarati, Hindi, Marathi, Konkani",
  "lakshadweep": "Malayalam, Mahl",
  "delhi": "Hindi, Punjabi, Urdu",
  "puducherry": "Tamil, French, Telugu, Malayalam, English",
  "jammuandkashmir": "Kashmiri, Dogri, Urdu",
  "ladakh": "Ladakhi, Purgi, Balti, Urdu, English"
};


const stateTriviaData = {
  jammuandkashmir: "Home to India's only floating post office on Dal Lake, the breathtaking Gulmarg Gondola (world's second-highest cable car), and Asia's largest tulip garden.",
  kerala: "Renowned for 600km of tranquil backwaters, India's first 100% literate state, and ancient Ayurvedic healing traditions.",
  rajasthan: "Home to the ancient Aravalli range (older than the Himalayas), majestic living forts like Jaisalmer, and the world's only Temple of Rats (Karni Mata).",
  ladakh: "Houses Umling La (the highest motorable road in the world at 19,024 ft) and the famous Magnetic Hill that defies gravity.",
  goa: "Features India's tallest waterfalls (Dudhsagar), 450+ years of Portuguese heritage architecture, and 100+ km of palm-lined coastline.",
  himachalpradesh: "Home to the UNESCO World Heritage Kalka-Shimla Toy Train and the world's highest cricket ground in Chail (7,500 ft above sea level).",
  uttarakhand: "Holds the UNESCO Valley of Flowers with 500+ species of alpine wildflowers and Rishikesh, global Yoga Capital of the World.",
  westbengal: "Home to the world's largest mangrove forest (Sundarbans), the iconic UNESCO Toy Train of Darjeeling, and India's oldest operating port.",
  punjab: "Houses the Golden Temple, serving over 100,000 free hot meals daily in the world's largest community kitchen (Langar).",
  gujarat: "Features the Great Rann of Kutch (world's largest salt desert), the Statue of Unity (world's tallest statue at 182m), and Gir, sole home of Asiatic Lions.",
  uttarpradesh: "Home to the Taj Mahal (Wonders of the World), Varanasi (one of the oldest continuously inhabited cities on Earth), and Kumbh Mela.",
  andhrapradesh: "Home to Tirumala Venkateswara Temple (most visited religious shrine on Earth) and Lambasingi, the only place in South India with snowfall.",
  arunachalpradesh: "Known as the 'Land of Dawn-lit Mountains', holding Tawang Monastery (second largest Buddhist monastery in the world).",
  assam: "Home to Kaziranga National Park (holding two-thirds of the world's great one-horned rhinos) and Majuli, the world's largest river island.",
  bihar: "Birthplace of Buddhism & Jainism, holding the ancient ruins of 5th-century Nalanda University (world's first residential international university).",
  chhattisgarh: "Features Chitrakote Falls (the 'Niagara of India' on Indravati river) and 44% dense virgin rainforest cover.",
  karnataka: "Home to Hampi (UNESCO boulder-strewn ruins of the Vijayanagara Empire) and Mysuru Palace, India's second most visited monument after Taj Mahal.",
  madhyapradesh: "Known as the 'Tiger State of India' (holding 785 tigers), Khajuraho UNESCO temples, and Sanchi Stupa built by Emperor Ashoka in 3rd century BCE.",
  maharashtra: "Home to Ellora's Kailasa Temple (largest monolithic rock-cut monument in the world carved top-down out of a single rock cliff).",
  manipur: "Home to Loktak Lake (the world's only floating national park with phumdis) and the indigenous martial art Thang-Ta.",
  meghalaya: "Home to Mawsynram (wettest place on planet Earth) and living root bridges handmade by Khasi tribes over centuries.",
  mizoram: "Known for the blue mountain peak Phawngpui, bamboo dance (Cheraw), and 90%+ forest canopy cover.",
  nagaland: "Hosts the Hornbill Festival ('Festival of Festivals') celebrating 16 distinct indigenous tribes in the Naga hills.",
  odisha: "Home to Konark Sun Temple (conceived as a giant 24-wheeled stone chariot) and Chilika Lake, Asia's largest brackish lagoon.",
  sikkim: "India's first 100% organic farming state, guarded by Mt. Kanchenjunga (3rd highest mountain on Earth).",
  tamilnadu: "Home to Great Living Chola Temples with towering Dravidian gopurams and Dhanushkodi, the submerged ghost town at India's tip.",
  telangana: "Home to the 400-year-old Charminar, Ramappa Temple (UNESCO site built with floating bricks), and Hyderabad's Koh-i-Noor diamond history.",
  tripura: "Features Unakoti (mysterious hillside rock-cut relief sculptures of Shiva dating to 7th century) and Ujjayanta Palace.",
  delhi: "Capital territory holding 3 UNESCO sites (Qutub Minar, Humayun's Tomb, Red Fort) and Asia's largest spice market (Khari Baoli).",
  chandigarh: "India's first master-planned modern city designed by Le Corbusier, featuring the 40-acre waste-to-art Rock Garden.",
  puducherry: "French colonial coastal town holding Auroville (experimental township for human unity) and Matrimandir golden dome.",
  lakshadweep: "Archipelago of 36 coral atolls featuring bioluminescent night waters and 99% crystal-clear marine lagoon expanse.",
  dadraandnagarhavelianddamananddiu: "Coastal enclave with 16th-century Portuguese sea fortresses, Warli tribal art, and tranquil palm beaches.",
};

const themeColors = {
  mountain: { main: '#38bdf8', hover: '#7dd3fc' }, // sky
  desert: { main: '#fbbf24', hover: '#fcd34d' },   // amber
  coastal: { main: '#34d399', hover: '#6ee7b7' },  // emerald
  nature: { main: '#a3e635', hover: '#bef264' },   // lime
  heritage: { main: '#fb7185', hover: '#fda4af' }  // rose
};

const StateDetailModal = ({ state, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [travelOrigin, setTravelOrigin] = useState("");
  const [travelData, setTravelData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleEstimateCosts = async () => {
    if (!travelOrigin.trim()) return;
    setIsCalculating(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(travelOrigin + ", India")}&format=json`);
      const data = await res.json();
      if (data && data.length > 0) {
        const originLat = parseFloat(data[0].lat);
        const originLng = parseFloat(data[0].lon);

        const destCoords = stateCapitalCoordinates[state.id];
        if (destCoords) {
          const dist = calculateDistance(originLat, originLng, destCoords.lat, destCoords.lng);
          const costs = estimateTravelCosts(dist);
          setTravelData({ origin: data[0].display_name.split(",")[0], dist, costs });
        } else {
          alert("Destination coordinates not available for " + state.name);
        }
      } else {
        alert("Could not find location. Please try a major city.");
      }
    } catch (e) {
      console.error(e);
      alert("Error calculating travel costs.");
    }
    setIsCalculating(false);
  };

  if (!state) return null;

  const cultureInfo = { ...(stateCultureData[state.id] || defaultCultureFallback) };
  if (stateLanguages[state.id]) {
    cultureInfo.language = stateLanguages[state.id];
  }
  const activeTheme = getStateTheme(state.id);

  let videoId = stateVideos[state.id];

  const videoStartTimes = {
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
  const startTime = videoStartTimes[state.id] || 0;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=${startTime}&playsinline=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&rel=0&showinfo=0&autohide=1`
    : null;

  return (
    <>
      {/* Background Zero-Controls Video Player */}
      {embedUrl && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-[90] overflow-hidden bg-[#06060f]">
          <iframe
            key={embedUrl}
            src={embedUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            tabIndex="-1"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 scale-[1.75] md:scale-[1.85] brightness-[0.85] contrast-[1.05]"
            style={{
              width: "100vw",
              height: "100vh",
              minWidth: "177.78vh",
              minHeight: "56.25vw",
            }}
          />
        </div>
      )}

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/40 animate-fadeIn select-none overflow-hidden">
        {/* Container */}
        <div style={{
          '--theme-main': themeColors[activeTheme]?.main || themeColors.heritage.main,
          '--theme-hover': themeColors[activeTheme]?.hover || themeColors.heritage.hover,
          '--theme-bg-light': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '1A', // 10% opacity
          '--theme-border': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '4D', // 30% opacity
          '--theme-shadow': (themeColors[activeTheme]?.main || themeColors.heritage.main) + '33', // 20% opacity
        }} className="relative w-full h-full max-w-7xl md:h-[85vh] bg-transparent md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10">

          {/* LEFT PANEL - Editorial State Highlight Card */}
          <div className="w-full md:w-[36%] bg-[#0e070c]/85 backdrop-blur-2xl border-b md:border-b-0 md:border-r border-white/15 flex flex-col justify-between p-5 sm:p-7 md:p-9 z-10 shrink-0 max-h-[40vh] md:max-h-none md:h-full overflow-y-auto scrollbar-thin">
            <div className="space-y-4 sm:space-y-6">
              {/* Top Controls (Left Panel) */}
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="flex items-center space-x-2 text-xs font-sans font-medium text-amber-200 hover:text-amber-100 transition-colors bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2 rounded-full shadow-sm"
                >
                  <span>← Back</span>
                </button>
              </div>

              {/* State Hero Photography Banner */}
              {state.imageUrl && (
                <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden shadow-lg border border-white/15 relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                  <img 
                    src={state.imageUrl} 
                    alt={state.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <span className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 text-[10px] font-sans font-semibold tracking-wide backdrop-blur-md">
                    🏛️ Cultural State Guide
                  </span>
                </div>
              )}

              {/* Title & Editorial Tagline */}
              <div className="space-y-2.5">
                <h1 className={`${state.name.length > 15 ? 'text-xl sm:text-2xl md:text-3xl' : state.name.length > 9 ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl'} font-extrabold font-display tracking-wide text-white uppercase leading-tight drop-shadow-md break-normal hyphens-none max-w-full`}>
                  {state.name}
                </h1>
                <p className="text-sm font-serif italic text-amber-300/90 tracking-wide">
                  "{state.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pt-3 border-t border-white/10">
                  {state.description}
                </p>

                {/* Interesting Trivia / Did You Know Card */}
                {stateTriviaData[state.id] && (
                  <div className="pt-3 border-t border-white/10">
                    <div className="bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-3.5 space-y-1.5 shadow-sm">
                      <div className="flex items-center space-x-2 text-amber-300 font-sans font-bold text-xs uppercase tracking-wider">
                        <span>💡</span>
                        <span>Did You Know?</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans italic">
                        "{stateTriviaData[state.id]}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Humanistic Meta Pill Badges */}
            <div className="mt-5 sm:mt-8 space-y-2.5">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center space-x-3 text-xs font-sans">
                <span className="text-lg">📍</span>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Capital City</span>
                  <strong className="text-white font-semibold">{state.capital}</strong>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center space-x-3 text-xs font-sans">
                <span className="text-lg">✨</span>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Best Time to Visit</span>
                  <strong className="text-amber-300 font-semibold">{cultureInfo.bestTime}</strong>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-3.5 flex items-center space-x-3 text-xs font-sans">
                <span className="text-lg">🗣️</span>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium uppercase tracking-wider">Primary Languages</span>
                  <strong className="text-sky-300 font-semibold">{cultureInfo.language}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Scrollable Content */}
          <div className="w-full md:w-[64%] bg-[#08040a]/90 backdrop-blur-md flex flex-col flex-1 md:h-full relative z-0 min-h-0">
            {/* Top Bar Right Panel */}
            <div className="hidden md:flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/50 backdrop-blur-xl absolute top-0 left-0 w-full z-20">
              <div className="text-xs font-sans font-medium text-amber-200/90 tracking-wider flex items-center space-x-2">
                <span>🌟</span>
                <span>Discover Incredible India • Regional Travel Guide</span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-sans text-sm transition-colors shadow-sm"
              >
                ✕
              </button>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="md:hidden absolute top-3 right-3 z-50 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center font-sans text-xs sm:text-sm"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Scrollable Area */}
            <div className="overflow-y-auto scrollbar-thin flex-1 pt-4 sm:pt-6 md:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 md:px-8 space-y-6 sm:space-y-8 h-full">

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-2 border-b border-white/10 pb-3.5 sticky top-0 bg-[#08040a]/95 backdrop-blur-xl z-10 pt-1 -mt-1 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all whitespace-nowrap ${activeTab === "overview"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  📍 Destinations ({state.regions?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("culture")}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all whitespace-nowrap ${activeTab === "culture"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  🎭 Culture & Heritage
                </button>
                <button
                  onClick={() => setActiveTab("festivals")}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all whitespace-nowrap ${activeTab === "festivals"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  📅 Festivals ({state.events?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab("travel")}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all whitespace-nowrap ${activeTab === "travel"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  ✈️ Trip Planner
                </button>
              </div>

              {/* TAB 1: OVERVIEW & TOP DESTINATIONS */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold font-sans tracking-wider text-amber-300 uppercase flex items-center space-x-2">
                    <span>🌄</span>
                    <span>Must-Visit Destinations & Highlights</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {state.regions?.map((region, idx) => {
                      const regionImg = regionImages[region.name] || region.imageUrl || state.imageUrl || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80";

                      return (
                        <div
                          key={idx}
                          className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 hover:bg-white/10 transition-all duration-300 hover:border-amber-400/40 flex flex-col justify-between group cursor-pointer shadow-md overflow-hidden"
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(region.name + ' ' + state.name + ' tourism')}`, '_blank')}
                        >
                          {/* Destination Photography Header */}
                          <div className="w-full h-32 sm:h-36 rounded-xl overflow-hidden relative shadow-inner">
                            <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                              src={regionImg}
                              alt={region.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = state.imageUrl || "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80";
                              }}
                              loading="lazy"
                            />
                            <span className="absolute bottom-2 left-2 z-20 px-2.5 py-0.5 rounded-full bg-black/60 text-slate-200 border border-white/15 text-[10px] font-sans font-medium backdrop-blur-md">
                              📍 Spot 0{idx + 1}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                              {region.name}
                            </h4>
                            <p className="text-xs text-slate-200 leading-relaxed font-sans">
                              {region.desc}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans text-slate-300 group-hover:border-amber-400/30 transition-colors">
                            <span className="text-[11px] font-medium text-slate-400">Explore Highlight</span>
                            <span className="text-amber-300 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                              <span>Explore Destination</span>
                              <span>→</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: CULTURE & TRADITIONS */}
              {activeTab === "culture" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-[color:var(--theme-main)]">
                      <span className="text-3xl">🎭</span>
                      <h4 className="text-xs font-bold font-mono uppercase tracking-widest leading-relaxed">Folk Dance & Art Forms</h4>
                    </div>
                    <p className="text-sm font-bold font-sans text-white border-t border-white/10 pt-4">{cultureInfo.dance}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Deeply rooted in classical mythological themes and ancient folk stories passed down through generations.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-[color:var(--theme-main)]">
                      <span className="text-3xl">👘</span>
                      <h4 className="text-xs font-bold font-mono uppercase tracking-widest leading-relaxed">Traditional Attire & Crafts</h4>
                    </div>
                    <p className="text-sm font-bold font-sans text-white border-t border-white/10 pt-4">{cultureInfo.attire}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Intricate handloom weaves, silk embroideries, and regional handicrafts crafted by master artisans.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 md:col-span-2">
                    <div className="flex items-center space-x-3 text-[color:var(--theme-main)]">
                      <span className="text-3xl">🍲</span>
                      <h4 className="text-xs font-bold font-mono uppercase tracking-widest">Culinary Heritage & Signature Dishes</h4>
                    </div>
                    <p className="text-sm font-bold font-sans text-white border-t border-white/10 pt-4">{cultureInfo.cuisine}</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-2xl">
                      A rich blend of regional aromatic spices, traditional slow-cooking methods, and authentic local ingredients.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: FESTIVALS */}
              {activeTab === "festivals" && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold font-mono tracking-[0.2em] text-[color:var(--theme-main)] uppercase pl-1">
                    Annual Cultural Celebrations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {state.events?.map((evt, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:bg-white/[0.08] transition-all"
                      >
                        <div className="flex items-start justify-between border-b border-white/10 pb-3 gap-4">
                          <h4 className="text-sm font-bold font-display text-white uppercase leading-tight">{evt.name}</h4>
                          <span className="px-3 py-1.5 rounded-full bg-[color:var(--theme-bg-light)] text-[color:var(--theme-main)] font-mono text-[9px] uppercase font-bold border border-[color:var(--theme-shadow)] shrink-0">
                            🗓️ {evt.date}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans">
                          {evt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: TRAVEL PLANNER */}
              {activeTab === "travel" && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold font-mono tracking-[0.2em] text-[color:var(--theme-main)] uppercase pl-1">
                    Cost-Efficient Route Planner
                  </h3>

                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <p className="text-xs text-slate-400 mb-4 font-sans">
                      Calculate estimated travel costs and durations to <strong className="text-white">{state.name}</strong> from your city.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">📍</span>
                        <input
                          type="text"
                          placeholder="Enter your starting city (e.g. Mumbai, Delhi)..."
                          value={travelOrigin}
                          onChange={(e) => setTravelOrigin(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEstimateCosts()}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[color:var(--theme-main)] transition-colors"
                        />
                      </div>
                      <button
                        onClick={handleEstimateCosts}
                        disabled={isCalculating || !travelOrigin.trim()}
                        className="w-full sm:w-auto px-6 py-3 bg-[color:var(--theme-main)] text-black font-bold rounded-xl whitespace-nowrap hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isCalculating ? "Calculating..." : "Estimate Costs →"}
                      </button>
                    </div>
                  </div>

                  {travelData && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-2">
                        <span>From: <strong>{travelData.origin}</strong></span>
                        <span>Distance: <strong>{travelData.dist.toFixed(0)} km</strong></span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {travelData.costs.flight && (
                          <div className="bg-white/5 border border-sky-400/30 rounded-2xl p-5 hover:bg-sky-400/10 transition-colors">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-xl">✈️</span>
                              <h4 className="text-sm font-bold text-sky-400 uppercase">Flight</h4>
                            </div>
                            <div className="text-2xl font-display font-bold text-white mb-1">
                              ₹{travelData.costs.flight.cost.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">est.</span>
                            </div>
                            <p className="text-xs text-slate-300 font-mono mb-4">⏱ {travelData.costs.flight.timeText}</p>
                            <p className="text-[10px] text-slate-400 mb-4 h-6">{travelData.costs.flight.description}</p>
                            <button
                              onClick={() => window.open(`https://www.google.com/travel/flights?q=Flights%20from%20${encodeURIComponent(travelOrigin)}%20to%20${encodeURIComponent(state.capital)}`, '_blank')}
                              className="w-full py-2 border border-sky-400/50 text-sky-400 text-xs font-bold rounded-lg hover:bg-sky-400 hover:text-black transition-colors"
                            >
                              Check Flights
                            </button>
                          </div>
                        )}

                        {travelData.costs.train && (
                          <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-5 hover:bg-amber-400/10 transition-colors">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-xl">🚆</span>
                              <h4 className="text-sm font-bold text-amber-400 uppercase">Train (AC)</h4>
                            </div>
                            <div className="text-2xl font-display font-bold text-white mb-1">
                              ₹{travelData.costs.train.cost.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">est.</span>
                            </div>
                            <p className="text-xs text-slate-300 font-mono mb-4">⏱ {travelData.costs.train.timeText}</p>
                            <p className="text-[10px] text-slate-400 mb-4 h-6">{travelData.costs.train.description}</p>
                            <button
                              onClick={() => window.open(`https://www.rome2rio.com/s/${encodeURIComponent(travelOrigin)}/${encodeURIComponent(state.capital)}`, '_blank')}
                              className="w-full py-2 border border-amber-400/50 text-amber-400 text-xs font-bold rounded-lg hover:bg-amber-400 hover:text-black transition-colors"
                            >
                              Check Trains
                            </button>
                          </div>
                        )}

                        {travelData.costs.bus && (
                          <div className="bg-white/5 border border-emerald-400/30 rounded-2xl p-5 hover:bg-emerald-400/10 transition-colors">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-xl">🚌</span>
                              <h4 className="text-sm font-bold text-emerald-400 uppercase">Volvo Bus</h4>
                            </div>
                            <div className="text-2xl font-display font-bold text-white mb-1">
                              ₹{travelData.costs.bus.cost.toLocaleString()} <span className="text-xs text-slate-400 font-sans font-normal">est.</span>
                            </div>
                            <p className="text-xs text-slate-300 font-mono mb-4">⏱ {travelData.costs.bus.timeText}</p>
                            <p className="text-[10px] text-slate-400 mb-4 h-6">{travelData.costs.bus.description}</p>
                            <button
                              onClick={() => window.open(`https://www.rome2rio.com/s/${encodeURIComponent(travelOrigin)}/${encodeURIComponent(state.capital)}`, '_blank')}
                              className="w-full py-2 border border-emerald-400/50 text-emerald-400 text-xs font-bold rounded-lg hover:bg-emerald-400 hover:text-black transition-colors"
                            >
                              Check Buses
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="text-center pt-2">
                        <button
                          onClick={() => window.open(`https://www.rome2rio.com/s/${encodeURIComponent(travelOrigin)}/${encodeURIComponent(state.name)}`, '_blank')}
                          className="text-xs text-[color:var(--theme-main)] hover:underline opacity-80"
                        >
                          Compare all options on Rome2Rio ↗
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateDetailModal;
