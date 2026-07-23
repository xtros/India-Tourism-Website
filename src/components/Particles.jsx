import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Particles = ({ count = 2500 }) => {
  const pointsRef = useRef();

  // Generate positions, velocities, and colors using useMemo to avoid recalculation
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const vels = new Float32Array(count * 3);

    // Curated high-end color palette matching Yatra Logo theme (Crimson Red & Sacred Gold)
    const colorPalette = [
      new THREE.Color("#dc2626"), // Signature Crimson Red
      new THREE.Color("#ef4444"), // Bright Vermillion
      new THREE.Color("#b91c1c"), // Deep Royal Red
      new THREE.Color("#fbbf24"), // Sacred Saffron Gold
      new THREE.Color("#f97316"), // Warm Flame Ember
    ];

    for (let i = 0; i < count; i++) {
      // Distribute particles around the centered map coordinate space
      // X: -20 to 20, Y: -12 to 12, Z: -15 to 15
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Subtle float velocities
      vels[i * 3] = (Math.random() - 0.5) * 0.008;      // drift X
      vels[i * 3 + 1] = -0.005 - Math.random() * 0.01; // fall down slowly Y
      vels[i * 3 + 2] = (Math.random() - 0.5) * 0.008;      // drift Z

      // Assign a color from our curated palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols, vels];
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      const positionAttr = pointsRef.current.geometry.attributes.position;
      const array = positionAttr.array;
      const len = positionAttr.count;

      for (let i = 0; i < len; i++) {
        // Apply drift velocity
        array[i * 3] += velocities[i * 3];
        array[i * 3 + 1] += velocities[i * 3 + 1];
        array[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around bounds (re-spawn at top if falling below floor)
        if (array[i * 3 + 1] < -12) {
          array[i * 3 + 1] = 12;
        }
        if (Math.abs(array[i * 3]) > 20) {
          array[i * 3] = (Math.random() - 0.5) * 40;
        }
        if (Math.abs(array[i * 3 + 2]) > 15) {
          array[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      
      // Let Three.js know buffer data has changed
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
