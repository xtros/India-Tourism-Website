import { Canvas } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { indiaStatesData } from "./data/indiaStatesData";

// custom components
import ScrollBasedAnimation from "./components/ScrollBasedAnimation";
import Menu from "./components/Menu";
import Overlay from "./components/Overlay";
import StateDetailModal from "./components/StateDetailModal";

export default function App() {
  const [section, setSection] = useState(() => {
    const saved = sessionStorage.getItem("currentSection");
    return saved ? parseInt(saved) : 0;
  });
  
  useEffect(() => {
    sessionStorage.setItem("currentSection", section.toString());
  }, [section]);
  const [detailStateId, setDetailStateId] = useState(null);
  const detailState = detailStateId ? indiaStatesData.find(s => s.id === detailStateId) : null;

  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const targetTag = e.target ? e.target.tagName.toLowerCase() : "";
      if (targetTag === "input" || targetTag === "textarea" || e.target?.isContentEditable) {
        return;
      }
      // Trap video control shortcut keys so they never trigger YouTube overlays or page jumps
      if (["Space", "KeyK", "KeyM", "KeyJ", "KeyL", "MediaPlayPause", "MediaTrackNext", "MediaTrackPrevious"].includes(e.code)) {
        if (e.code === "Space") {
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#06060f] overflow-hidden select-none">
      {/* Hero Background Video */}
      <div
        className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 bg-[#06060f] ${
          section === 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-80 brightness-[0.85] contrast-[1.05]"
          onLoadedMetadata={(e) => {
            e.target.currentTime = 5;
          }}
          src="/videoplayback.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-transparent to-[#06060f]/60 pointer-events-none" />
      </div>

      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        className={styles.canvas}
        camera={{ fov: isMobile ? 65 : 60, position: [0, 0, isMobile ? 10.5 : 8] }}
      >
        <fog attach="fog" args={["#06060f", 8, 30]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <ScrollBasedAnimation section={section} setSection={setSection} onOpenDetail={setDetailStateId} />
      </Canvas>
      {!detailState && <Menu section={section} setSection={setSection} />}
      {!detailState && <Overlay section={section} setSection={setSection} />}
      
      {/* Detail Modal Overlay */}
      {detailState && (
        <StateDetailModal 
          state={detailState} 
          onClose={() => setDetailStateId(null)} 
        />
      )}
    </div>
  );
}
