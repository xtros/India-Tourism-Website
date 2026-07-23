import React from "react";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState } from "react";
import { Sparkles } from "@react-three/drei";
import { indiaStatesData } from "../data/indiaStatesData";

// custom components
import Particles from "./Particles.jsx";
import Objects from "./Objects.jsx";
import Html from "./Html.jsx";
import ScrollManager from "./ScrollManager.jsx";

const ScrollBasedAnimation = ({ section, setSection, onOpenDetail }) => {
  useFrame(({ mouse, camera }) => {
    // Elegant mouse follow parallax (only active or subtly combined with focus)
    // We can reduce mouse follow when focusing, or keep it subtle
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouse.x * -Math.PI * 0.01,
      0.01
    );
  });

  const totalPages = indiaStatesData.length + 2; // Hero + N states/UTs + Footer

  return (
    <ScrollControls pages={totalPages} damping={0.25} horizontal={false}>
      <ScrollManager section={section} onSectionChange={setSection} />
      <group visible={section > 0}>
        <Sparkles
          count={600}
          size={3}
          speed={0.2}
          opacity={0.4}
          scale={[40, 40, 30]}
          color="#a78bfa"
        />
        <Particles count={1500} />
      </group>
      <Objects section={section} />
      <Scroll html>
        <Html section={section} setSection={setSection} onOpenDetail={onOpenDetail} />
      </Scroll>
    </ScrollControls>
  );
};

export default ScrollBasedAnimation;
