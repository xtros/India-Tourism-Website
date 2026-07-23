import React from "react";
import { indiaStatesData } from "../data/indiaStatesData";

const Overlay = ({ section, setSection }) => {
  const totalStates = indiaStatesData.length;
  const progressPercent = Math.min((section / totalStates) * 100, 100);

  // Hide overlay if on landing section (0) OR if scrolled into footer section (> totalStates)
  const isHidden = section === 0 || section > totalStates;

  return (
    <div className={`fixed right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-6 z-40 hidden sm:flex transition-all duration-500 ${
      isHidden ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 translate-x-0"
    }`}>
      {/* Scroll Position Indicator Numbers */}
      <div className="flex flex-col items-center select-none font-mono">
        <span className="text-[10px] tracking-[0.2em] text-red-500 font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
          {section < 10 ? `0${section}` : section}
        </span>
        <div className="w-[1px] h-3 bg-red-500/30 my-1" />
        <span className="text-[8px] tracking-[0.2em] text-amber-400/80 font-medium">
          {totalStates < 10 ? `0${totalStates}` : totalStates}
        </span>
      </div>

      {/* Slim Vertical Timeline Progress Bar */}
      <div className="relative w-[2px] h-36 bg-red-950/40 rounded-full overflow-hidden border border-red-500/20">
        {/* Glowing Filled Progress Bar */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-600 via-rose-500 to-amber-400 transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]"
          style={{ height: `${progressPercent}%` }}
        />
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => setSection(0)}
        className={`w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center text-slate-300 hover:text-amber-400 hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-500 glass-card focus:outline-none ${
          isHidden ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
        }`}
        aria-label="Back to top"
      >
        <span className="text-[10px] transform -rotate-90">➔</span>
      </button>
    </div>
  );
};

export default Overlay;
