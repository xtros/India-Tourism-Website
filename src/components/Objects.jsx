import { useScroll, Text } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { indiaStatesData } from "../data/indiaStatesData";

// ISO 3166-2:IN to data ID mapping
const stateCodeMap = {
  "IN-AP": "andhrapradesh",
  "IN-AR": "arunachalpradesh",
  "IN-AS": "assam",
  "IN-BR": "bihar",
  "IN-CT": "chhattisgarh",
  "IN-GA": "goa",
  "IN-GJ": "gujarat",
  "IN-HR": "haryana",
  "IN-HP": "himachalpradesh",
  "IN-JH": "jharkhand",
  "IN-KA": "karnataka",
  "IN-KL": "kerala",
  "IN-MP": "madhyapradesh",
  "IN-MH": "maharashtra",
  "IN-MN": "manipur",
  "IN-ML": "meghalaya",
  "IN-MZ": "mizoram",
  "IN-NL": "nagaland",
  "IN-OR": "odisha",
  "IN-PB": "punjab",
  "IN-RJ": "rajasthan",
  "IN-SK": "sikkim",
  "IN-TN": "tamilnadu",
  "IN-TG": "telangana",
  "IN-TR": "tripura",
  "IN-UP": "uttarpradesh",
  "IN-UT": "uttarakhand",
  "IN-WB": "westbengal",
  "IN-JK": "jammuandkashmir",
  "IN-LA": "ladakh",
  "IN-AN": "andamanandnicobar",
  "IN-CH": "chandigarh",
  "IN-DN": "damananddiu",
  "IN-DD": "damananddiu",
  "IN-DL": "delhi",
  "IN-LD": "lakshadweep",
  "IN-PY": "puducherry",
};

// Exact color palette fetched from the official India political map
const customStateColors = {
  andhrapradesh: "#f8a444",   // Apricot Orange
  arunachalpradesh: "#9c8ce4",// Lavender Blue
  assam: "#f8d424",           // Bright Yellow
  bihar: "#e49c34",           // Amber Ochre
  chhattisgarh: "#b4b4f4",    // Light Periwinkle Blue
  goa: "#7c4cb4",             // Deep Purple
  gujarat: "#f49c24",         // Warm Orange
  haryana: "#f8a434",         // Orange Gold
  himachalpradesh: "#e44ca4", // Bright Pink Magenta
  jharkhand: "#b47cd4",       // Violet Purple
  karnataka: "#f8d434",       // Bright Golden Yellow
  kerala: "#b484e4",          // Soft Lavender Purple
  madhyapradesh: "#f4cc24",   // Golden Yellow
  maharashtra: "#94ec44",     // Lime Green
  manipur: "#8cec44",         // Light Lime Green
  meghalaya: "#64c4f4",       // Light Sky Blue
  mizoram: "#b43ce4",         // Violet Magenta
  nagaland: "#c46ce4",        // Soft Pink Magenta
  odisha: "#f8d424",          // Golden Yellow
  punjab: "#f4d434",          // Bright Yellow
  rajasthan: "#ec64e4",       // Vibrant Magenta Pink
  sikkim: "#94e434",          // Lime Green
  tamilnadu: "#8cec44",       // Bright Lime Green
  telangana: "#f46ce4",       // Bright Pink
  tripura: "#949ce4",         // Periwinkle Blue
  uttarpradesh: "#a4e434",    // Light Lime Green
  uttarakhand: "#9c9ce4",     // Periwinkle Blue
  westbengal: "#a4ec34",      // Light Lime Green
  ladakh: "#8cf4a0",          // Mint Green
  jammuandkashmir: "#8ce4ec", // Sky Blue
  andamanandnicobar: "#4ce4d4",// Turquoise Aqua
  delhi: "#ec4c6c",           // Crimson Red
  chandigarh: "#f8cc44",      // Yellow Gold
  puducherry: "#e464c4",      // Rose Pink
  lakshadweep: "#3ce4c4",     // Emerald Lagoon
  damananddiu: "#f48c44",     // Coral Amber
};

const getStateColor = (stateId) => {
  if (customStateColors[stateId]) {
    return customStateColors[stateId];
  }
  if (!stateId) return "#64748b";

  // Deterministic HSL color generator for any state/UT not explicitly mapped
  let hash = 0;
  for (let i = 0; i < stateId.length; i++) {
    hash = stateId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash * 137.5) % 360;
  return `hsl(${Math.floor(h)}, 85%, 60%)`;
};

const Objects = ({ section }) => {
  const { width: viewportWidth, height: viewportHeight } = useThree((state) => state.viewport);
  const scroll = useScroll();

  // Load and parse SVG
  const svg = useLoader(SVGLoader, "/india.svg");

  // Center target and camera target refs
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Compute geometries, centers, and scales
  const { stateGeometries, scale } = useMemo(() => {
    const geometries = [];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    // First pass: Find map boundaries for auto-centering (only for state paths)
    svg.paths.forEach((path) => {
      const svgId = path.userData?.node?.id || path.userData?.node?.getAttribute?.("id");
      if (!svgId || !stateCodeMap[svgId]) return; // Skip non-state paths (like inset boxes)

      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const points = shape.getPoints();
        points.forEach((p) => {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        });
      });
    });

    const mapWidth = maxX - minX;
    const mapHeight = maxY - minY;
    const centerX = minX + mapWidth / 2;
    const centerY = minY + mapHeight / 2;

    // Scale map to fit nicely in 3D view (target size around 7.5 units)
    const targetSize = 7.5;
    const mapScale = targetSize / Math.max(mapWidth, mapHeight);

    // Second pass: Create 3D geometries centered and flipped
    svg.paths.forEach((path) => {
      const svgId = path.userData?.node?.id || path.userData?.node?.getAttribute?.("id");
      if (!svgId || !stateCodeMap[svgId]) return; // Skip non-state paths (like inset boxes)

      const stateId = stateCodeMap[svgId];
      const stateData = indiaStatesData.find((s) => s.id === stateId);
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        // Extrude shape into 3D with bold bevel borders
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 12, // Increased depth for prominent 3D pop
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 2.2, // Bolder bevel size
          bevelThickness: 2.5, // Bolder bevel thickness
        });

        // Translate geometry to align with SVG map center
        geometry.translate(-centerX, -centerY, 0);

        // Flip Y axis (since SVG is top-to-bottom) and apply global scale
        geometry.scale(mapScale, -mapScale, mapScale);
        geometry.computeVertexNormals();

        // Calculate individual geometry's center
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = new THREE.Vector3();
        box.getCenter(center);

        geometries.push({
          svgId,
          stateId,
          stateData,
          geometry,
          center,
          name: stateData ? stateData.name : path.userData.node.getAttribute("title") || svgId,
        });
      });
    });

    // Group centers by stateId to handle multi-part states (e.g. enclaves, islands)
    const stateCenters = {};
    geometries.forEach((g) => {
      if (g.stateId) {
        if (!stateCenters[g.stateId]) {
          stateCenters[g.stateId] = { sum: new THREE.Vector3(), count: 0 };
        }
        stateCenters[g.stateId].sum.add(g.center);
        stateCenters[g.stateId].count += 1;
      }
    });

    // Apply the grouped/averaged center coordinates
    geometries.forEach((g) => {
      if (g.stateId) {
        g.activeCenter = stateCenters[g.stateId].sum.clone().divideScalar(stateCenters[g.stateId].count);
      } else {
        g.activeCenter = g.center;
      }
    });

    return { stateGeometries: geometries, scale: mapScale };
  }, [svg]);

  // Determine active state ID based on current section
  const activeState = section > 0 ? indiaStatesData[section - 1] : null;
  const activeStateId = activeState ? activeState.id : null;

  useFrame((state) => {
    const { camera, mouse } = state;

    // Default (Hero Section): camera looking at entire map perfectly centered
    let targetPos = new THREE.Vector3(0, 0, 8.5);
    let targetLookAt = new THREE.Vector3(0, 0, 0);

    if (activeStateId) {
      // Find center of current active state or UT
      let stateGeom = stateGeometries.find((g) => g.stateId === activeStateId);
      if (!stateGeom) {
        if (activeStateId === "ladakh") stateGeom = stateGeometries.find((g) => g.stateId === "jammuandkashmir");
        else if (activeStateId === "chandigarh") stateGeom = stateGeometries.find((g) => g.stateId === "punjab" || g.stateId === "haryana");
        else if (activeStateId === "damananddiu") stateGeom = stateGeometries.find((g) => g.stateId === "gujarat");
        else if (activeStateId === "puducherry") stateGeom = stateGeometries.find((g) => g.stateId === "tamilnadu");
      }

      if (stateGeom) {
        const c = stateGeom.activeCenter;
        // Fly camera to an angled perspective looking at the state
        // Shift camera left by 1.8 units so the state appears on the right side of the screen
        targetPos.set(c.x - 1.8, c.y - 0.5, 3.5);
        targetLookAt.set(c.x - 1.8, c.y, c.z || 0);
      }
    }

    // Smoothly interpolate camera position and direction
    camera.position.lerp(targetPos, 0.05);
    currentLookAt.current.lerp(targetLookAt, 0.05);
    camera.lookAt(currentLookAt.current);

    // Subtle parallax effect on mouse movements
    camera.position.x += mouse.x * 0.15;
    camera.position.y += mouse.y * 0.15;
  });

  return (
    <group visible={section > 0}>
      {/* 3D Map Mesh Group */}
      <group position={[0, 0, 0]}>
        {stateGeometries.map((item, idx) => {
          const isSelected = activeStateId && (
            item.stateId === activeStateId ||
            (activeStateId === "ladakh" && item.stateId === "jammuandkashmir") ||
            (activeStateId === "jammuandkashmir" && item.stateId === "ladakh")
          );
          const isHero = !activeStateId;
          const baseColor = getStateColor(item.stateId);

          return (
            <group key={idx}>
              <mesh geometry={item.geometry}>
                {isSelected ? (
                  // Focused glowing material for selected state
                  <meshStandardMaterial
                    color={baseColor}
                    emissive={baseColor}
                    emissiveIntensity={3.0}
                    roughness={0.1}
                    metalness={0.9}
                    side={THREE.DoubleSide}
                  />
                ) : isHero ? (
                  // Rich vibrant regional colors in Hero section
                  <meshStandardMaterial
                    color={baseColor}
                    emissive={baseColor}
                    emissiveIntensity={0.7}
                    roughness={0.3}
                    metalness={0.6}
                    transparent
                    opacity={0.75}
                    side={THREE.DoubleSide}
                  />
                ) : (
                  // Dimmed semi-transparent dark material for unselected states in state view
                  <meshStandardMaterial
                    color="#1e293b"
                    roughness={0.5}
                    metalness={0.4}
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                  />
                )}
              </mesh>
              {/* Bold outer edge outlines for 3D state boundaries */}
              <lineSegments>
                <edgesGeometry args={[item.geometry, 25]} />
                <lineBasicMaterial
                  color={isHero || isSelected ? baseColor : "#64748b"}
                  transparent
                  opacity={isHero ? 0.9 : isSelected ? 1.0 : 0.4}
                />
              </lineSegments>
              {/* Outer wireframe glow (disabled for highlighted state) */}
              {!isSelected && (
                <mesh geometry={item.geometry}>
                  <meshBasicMaterial
                    color={isHero ? baseColor : "#475569"}
                    wireframe
                    transparent
                    opacity={isHero ? 0.8 : 0.2}
                  />
                </mesh>
              )}

            </group>
          );
        })}
      </group>

    </group>
  );
};

export default Objects;
