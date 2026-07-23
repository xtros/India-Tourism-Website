import React, { useState, useRef, useEffect } from "react";
import { indiaStatesData } from "../data/indiaStatesData";

const languages = [
  { code: "EN", name: "English", label: "English" },
  { code: "HI", name: "Hindi", label: "हिन्दी" },
  { code: "TE", name: "Telugu", label: "తెలుగు" },
  { code: "TA", name: "Tamil", label: "தமிழ்" },
  { code: "BN", name: "Bengali", label: "বাংলা" },
  { code: "MR", name: "Marathi", label: "मराठी" },
];

const festivalList = [
  { name: "Diwali", state: "Pan-India", desc: "Festival of Lights celebrating victory of light over darkness.", season: "Autumn" },
  { name: "Holi", state: "Pan-India", desc: "Vibrant festival of colors celebrating spring and love.", season: "Spring" },
  { name: "Onam", state: "Kerala", desc: "Harvest festival featuring grand snake boat races and Pookkalam.", season: "Autumn" },
  { name: "Durga Puja", state: "West Bengal", desc: "Grand cultural celebration with ornate pandals and traditional dances.", season: "Autumn" },
  { name: "Hornbill Festival", state: "Nagaland", desc: "Festival of festivals showcasing tribal music, dance, and crafts.", season: "Winter" },
  { name: "Bihu", state: "Assam", desc: "Joyful harvest festival with energetic folk dances and feasts.", season: "Spring" },
  { name: "Pushkar Fair", state: "Rajasthan", desc: "Colorfully decorated camel fair and cultural carnival.", season: "Autumn" },
];

const cultureList = [
  { title: "Classical & Folk Dances", desc: "Kathakali, Bharatanatyam, Odissi, Garba, and Yakshagana." },
  { title: "Culinary Heritage", desc: "From South Indian Dosas & Spices to Rajasthani Thalis & Mughlai Delicacies." },
  { title: "Handicrafts & Textiles", desc: "Kanjeevaram & Banarasi Silks, Pashmina Shawls, and Tanjore Paintings." },
  { title: "Sacred Architecture", desc: "Dravidian Temple Towers, Mughal Palaces, and Ancient Rock-cut Caves." },
];

const storiesList = [
  { title: "Legend of the Backwaters", state: "Kerala", excerpt: "Cruising along palm-fringed canals in traditional wooden Kettuvallams." },
  { title: "Fortresses of the Thar", state: "Rajasthan", excerpt: "Golden sand dunes, royal palaces, and tales of ancient Rajput chivalry." },
  { title: "Mystic Peaks of Spiti", state: "Himachal Pradesh", excerpt: "High-altitude monasteries perched on rocky cliffs amidst snow-capped peaks." },
  { title: "Valley of Flowers", state: "Uttarakhand", excerpt: "High-altitude Himalayan alpine meadows carpeted in rare wild flora." },
];

const tourismZones = [
  {
    name: "Himalayas & North",
    emoji: "🏔️",
    desc: "Snow-capped peaks, alpine lakes, and sacred valleys.",
    states: ["Jammu and Kashmir", "Ladakh", "Himachal Pradesh", "Uttarakhand", "Punjab"]
  },
  {
    name: "Deserts & Royal West",
    emoji: "🏰",
    desc: "Golden sand dunes, majestic fortresses, and sun-kissed beaches.",
    states: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"]
  },
  {
    name: "Tropical South & Backwaters",
    emoji: "🌴",
    desc: "Palm-fringed canals, Dravidian temple towers, and spice hills.",
    states: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana"]
  },
  {
    name: "Tea Gardens & East",
    emoji: "🛕",
    desc: "Misty tea estates, living root bridges, and cultural heritage.",
    states: ["West Bengal", "Assam", "Sikkim", "Nagaland", "Meghalaya", "Odisha"]
  },
  {
    name: "Heart of Bharat",
    emoji: "🐅",
    desc: "Tiger sanctuaries, rock-cut monuments, and ancient river ghats.",
    states: ["Madhya Pradesh", "Uttar Pradesh", "Bihar", "Chhattisgarh"]
  }
];

const Menu = ({ section, setSection }) => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'culture' | 'festivals' | 'stories' | 'search' | null
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownSearch, setDropdownSearch] = useState("");

  const stateDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(e.target)) {
        setIsStateOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle Dark / Light Mode global toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [isDarkMode]);

  // Handle Google Translate Integration
  useEffect(() => {
    const gtCodeMap = {
      EN: "en",
      HI: "hi",
      TE: "te",
      TA: "ta",
      BN: "bn",
      MR: "mr",
    };
    const targetLang = gtCodeMap[activeLang.code] || "en";

    setTimeout(() => {
      const gtSelect = document.querySelector(".goog-te-combo");
      if (gtSelect) {
        if (targetLang === "en") {
          // Clear cookies to ensure it stays English on next visit
          const hasCookie = document.cookie.includes("googtrans=");
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
          
          if (hasCookie) {
            // A hard reload is the ONLY 100% reliable way to completely remove Google Translate's 
            // injected <font> tags and DOM changes without getting the Abkhazian bug.
            // Since we now save the scroll section in sessionStorage, this reload is seamless!
            window.location.reload();
          }
        } else {
          gtSelect.value = targetLang;
          gtSelect.dispatchEvent(new Event("change"));
        }
      }
    }, 300);
  }, [activeLang]);

  const activeState = section > 0 ? indiaStatesData[section - 1] : null;

  // Filtered states for Explore dropdown
  const filteredStates = indiaStatesData.filter((state) =>
    state.name.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  // Filtered items for Global Search modal
  const globalSearchResults = searchQuery.trim()
    ? indiaStatesData.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 glass-nav px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300">
        {/* Left Section: Logo + Main Nav Links */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Logo */}
          <button
            onClick={() => {
              setSection(0);
              setIsStateOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="focus:outline-none flex items-center group transition-opacity hover:opacity-95"
          >
            <img
              src="https://i.ibb.co/Xf1CQLs6/yatra-logo.png"
              alt="Yatra Bharat Logo"
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(251,191,36,0.3)]"
            />
          </button>

        </div>

        {/* Right Section: Theme | Explore ▼ | Language Selector | Mobile Hamburger */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">

          {/* Theme Toggle Switch (☀️ / 🌙) */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 sm:px-3 sm:py-2 rounded-full glass-card border border-white/15 text-xs hover:border-amber-400/50 hover:bg-white/10 transition-all focus:outline-none"
            title={isDarkMode ? "Switch to Day Light Mode" : "Switch to Night Mode"}
          >
            <span>{isDarkMode ? "🌙" : "☀️"}</span>
          </button>

          {/* Explore ▼ Dropdown Selector */}
          <div className="relative" ref={stateDropdownRef}>
            <button
              onClick={() => setIsStateOpen(!isStateOpen)}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-red-500/40 text-amber-300 font-semibold text-[11px] sm:text-xs tracking-wider sm:tracking-widest hover:bg-gradient-to-r hover:from-red-700 hover:to-amber-600 hover:text-white transition-all duration-300 glass-card focus:outline-none flex items-center space-x-1 sm:space-x-2 shadow-[0_0_12px_rgba(220,38,38,0.2)]"
            >
              <span className="max-w-[80px] sm:max-w-none truncate">{activeState ? activeState.name.toUpperCase() : "EXPLORE"}</span>
              <span className="text-[9px] sm:text-[10px] text-red-400">{isStateOpen ? "▲" : "▼"}</span>
            </button>

            {isStateOpen && (
              <div className="absolute right-0 mt-3 w-64 sm:w-72 max-h-96 glass-card rounded-2xl p-3 sm:p-4 border border-white/20 shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in backdrop-blur-2xl">
                {/* Search Input inside Dropdown */}
                <input
                  type="text"
                  placeholder="Search State..."
                  value={dropdownSearch}
                  onChange={(e) => setDropdownSearch(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs tracking-wider font-sans focus:outline-none mb-3"
                  autoFocus
                />

                {/* Scrollable State List */}
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin max-h-64">
                  {filteredStates.map((state) => {
                    const isSelected = activeState && activeState.id === state.id;
                    const stateIndex = indiaStatesData.findIndex((s) => s.id === state.id);

                    return (
                      <button
                        key={state.id}
                        onClick={() => {
                          setSection(stateIndex + 1);
                          setIsStateOpen(false);
                          setDropdownSearch("");
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium tracking-widest transition-all duration-200 uppercase block focus:outline-none ${
                          isSelected
                            ? "bg-gradient-to-r from-red-700 to-amber-600 text-white font-bold shadow-lg shadow-red-950/60"
                            : "hover:bg-red-950/40 text-slate-200 hover:text-amber-300"
                        }`}
                      >
                        {state.name}
                      </button>
                    );
                  })}
                  {filteredStates.length === 0 && (
                    <div className="text-[10px] text-slate-500 italic text-center py-4 font-mono">
                      No states found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative notranslate" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full glass-card border border-white/15 text-white text-[11px] sm:text-xs font-mono tracking-wider hover:border-white/40 transition-all focus:outline-none flex items-center space-x-1"
            >
              <span>🌐</span>
              <span className="font-bold">{activeLang.code}</span>
              <span className="text-[9px] opacity-75">{isLangOpen ? "▲" : "▼"}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-40 glass-card rounded-2xl p-2 border border-white/20 shadow-2xl flex flex-col z-50 backdrop-blur-2xl">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setActiveLang(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium tracking-wider transition-colors flex items-center justify-between focus:outline-none ${
                      activeLang.code === lang.code
                        ? "bg-amber-400/20 text-amber-300 font-bold"
                        : "hover:bg-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[11px] font-mono opacity-80">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card border border-white/20 text-white text-xs hover:bg-white/10 transition-all focus:outline-none flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
            aria-label="Toggle Mobile Navigation"
          >
            <span>{isMobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-2xl lg:hidden flex flex-col pt-20 px-6 pb-8 justify-between animate-fade-in">
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-amber-400 tracking-[0.25em] uppercase border-b border-white/10 pb-2">
              Navigation & Exploration
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  setSection(0);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-4 rounded-2xl glass-card text-left font-display font-bold text-sm tracking-wider uppercase transition-all flex items-center justify-between ${
                  section === 0 ? "bg-amber-400/20 border-amber-400 text-amber-300" : "text-white hover:bg-white/10"
                }`}
              >
                <span>🏠 Home</span>
                <span className="text-xs font-mono text-slate-400">Section 00 →</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <img
              src="https://i.ibb.co/Xf1CQLs6/yatra-logo.png"
              alt="Yatra Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-amber-400 font-bold">Mobile Mode 📱</span>
          </div>
        </div>
      )}

      {/* Interactive Culture Modal */}
      {activeModal === "culture" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full rounded-3xl p-6 md:p-8 border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-2xl font-display font-extrabold text-tiranga tracking-wider mb-2 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              Cultural Heritage of India
            </h3>
            <p className="text-xs text-slate-400 font-mono italic mb-6">
              A tapestry of ancient traditions, classical arts, and timeless architecture.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cultureList.map((item, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Festivals Modal */}
      {activeModal === "festivals" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-2xl w-full rounded-3xl p-6 md:p-8 border border-white/20 relative shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-2xl font-display font-extrabold text-tiranga tracking-wider mb-2 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              Festivals & Celebrations
            </h3>
            <p className="text-xs text-slate-400 font-mono italic mb-6">
              Experience the vibrant colors and sacred rituals across Indian states.
            </p>
            <div className="space-y-3">
              {festivalList.map((fest, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-amber-400/40 transition-all">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white uppercase font-display">{fest.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-semibold">{fest.state}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-sans">{fest.desc}</p>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">{fest.season}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Stories Modal */}
      {activeModal === "stories" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-xl w-full rounded-3xl p-6 md:p-8 border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-2xl font-display font-extrabold text-tiranga tracking-wider mb-2 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              Travel Stories & Folklore
            </h3>
            <p className="text-xs text-slate-400 font-mono italic mb-6">
              Journeys through ancient lands, misty valleys, and sacred waters.
            </p>
            <div className="space-y-4">
              {storiesList.map((story, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white uppercase font-display">{story.title}</h4>
                    <span className="text-[10px] font-mono text-amber-400">{story.state}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{story.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Search Modal */}
      {activeModal === "search" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-lg w-full rounded-3xl p-6 border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-xl font-display font-extrabold text-tiranga tracking-wider mb-4 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              Quick Search
            </h3>
            <input
              type="text"
              placeholder="Type state name, capital, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input rounded-xl px-4 py-3 text-xs tracking-wider font-sans focus:outline-none mb-4"
              autoFocus
            />

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {globalSearchResults.map((state) => {
                const stateIndex = indiaStatesData.findIndex((s) => s.id === state.id);
                return (
                  <button
                    key={state.id}
                    onClick={() => {
                      setSection(stateIndex + 1);
                      setActiveModal(null);
                      setSearchQuery("");
                    }}
                    className="w-full text-left p-3 rounded-xl glass-card border border-white/10 hover:border-amber-400/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white uppercase font-display">{state.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Capital: {state.capital}</div>
                    </div>
                    <span className="text-xs text-amber-400">Jump →</span>
                  </button>
                );
              })}
              {searchQuery && globalSearchResults.length === 0 && (
                <div className="text-xs text-slate-400 italic text-center py-6 font-mono">
                  No matching states found for "{searchQuery}"
                </div>
              )}
              {!searchQuery && (
                <div className="text-xs text-slate-400 text-center py-4 font-mono">
                  Start typing to search among 30+ Indian states.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Explore Zones Modal */}
      {activeModal === "explore" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-3xl w-full rounded-3xl p-6 md:p-8 border border-white/20 relative shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-2xl font-display font-extrabold text-tiranga tracking-wider mb-2 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              Explore India by Region & Zone
            </h3>
            <p className="text-xs text-slate-400 font-mono italic mb-6">
              Discover diverse landscapes, climate zones, and cultural realms of Bharat.
            </p>
            <div className="space-y-4">
              {tourismZones.map((zone, idx) => (
                <div key={idx} className="glass-card p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{zone.emoji}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase font-display">{zone.name}</h4>
                      <p className="text-xs text-slate-300 font-sans">{zone.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                    {zone.states.map((stName) => {
                      const stIdx = indiaStatesData.findIndex((s) => s.name.toLowerCase() === stName.toLowerCase() || s.id.toLowerCase() === stName.toLowerCase());
                      return (
                        <button
                          key={stName}
                          onClick={() => {
                            if (stIdx !== -1) {
                              setSection(stIdx + 1);
                              setActiveModal(null);
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-amber-400 hover:text-black text-[11px] font-mono font-semibold transition-all"
                        >
                          {stName} →
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive States Directory Modal */}
      {activeModal === "states" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="glass-card max-w-4xl w-full rounded-3xl p-6 md:p-8 border border-white/20 relative shadow-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass-card border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ✕
            </button>
            <h3 className="text-2xl font-display font-extrabold text-tiranga tracking-wider mb-2 uppercase drop-shadow-[0_0_12px_rgba(255,153,51,0.35)]">
              All States & Union Territories
            </h3>
            <p className="text-xs text-slate-400 font-mono italic mb-6">
              Complete interactive directory of all 30+ Indian states with 3D map navigation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {indiaStatesData.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSection(idx + 1);
                    setActiveModal(null);
                  }}
                  className="glass-card p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all text-left flex items-center justify-between group"
                >
                  <div>
                    <div className="text-xs font-bold text-white uppercase font-display group-hover:text-amber-400 transition-colors">
                      {st.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Cap: {st.capital}
                    </div>
                  </div>
                  <span className="text-xs text-amber-400/80 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
