
# YATRA BHARAT 🇮🇳 | Explore Incredible India in 3D

<p align="center">
  <img src="https://i.ibb.co/Y7gkKCGv/Chat-GPT-Image-Jul-23-2026-05-54-36-PM.png" alt="Yatra Bharat Banner" width="100%" style="max-height: 360px; object-fit: cover; border-radius: 12px;" />
</p>

> **Yatra Bharat** is an immersive, cinematic, and fully interactive 3D web experience that showcases the tourism, culture, and heritage of India. Built with a modern web stack, it redefines digital exploration through beautiful 3D cartography, rich regional content, and a premium dark-mode aesthetic.

🔗 **Live Demo:** [india-tourism-website-lyart.vercel.app](https://india-tourism-website-lyart.vercel.app/)

---

## 🌟 Key Features

### 🗺️ Interactive 3D Map & Cartography
- **React Three Fiber & Three.js** — A fully rendered 3D interactive map of India with dynamic lighting and particle systems.
- **Dynamic Hover Interactions** — Hover over states to see them physically lift and glow with neon accents and custom tooltips.
- **Cinematic Scroll & Camera** — Smooth GSAP-driven camera flyovers and section snapping across 30+ States and Union Territories.

### ✈️ Cost-Efficient Travel Planner
- **Route & Cost Estimation Engine** — Calculates travel distances, durations, and estimated costs for Flights, AC Trains, and Volvo Buses from any starting city.
- **Live Booking Deep-links** — Instant links to Google Flights and Rome2Rio for live schedules and tickets.

### 📱 Full Mobile Optimization
- **Mobile Navigation Drawer** — Responsive hamburger menu with a glassmorphic slide-down drawer.
- **Touch-Friendly Controls** — Touch-snap carousels, responsive typography, and mobile-optimized modal overlays.
- **Adaptive Camera Viewport** — Automatically frames 3D map objects for portrait screens.

### ✨ Premium Aesthetics & Dark Mode
- **Glassmorphism Design** — Frosted glass cards, glowing borders, vibrant color palettes, and silky transitions.
- **Night/Light Mode Toggle** — Seamless theme switching.
- **Regional Themes** — Dynamic color palettes for Mountains, Deserts, Coastal, Nature, and Heritage regions.
- **Cinematic Hero Background** — Auto-playing, looping, muted background video on the landing page.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| 3D Rendering | [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/), [Drei](https://github.com/pmndrs/drei) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + Vanilla CSS |
| Animations | [GSAP](https://gsap.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/xtros/India-Tourism-Website.git
cd India-Tourism-Website
```

**2. Install dependencies**
```bash
npm install
```

**3. Run development server**
```bash
npm run dev
```

**4. Build for production**
```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── App.jsx                   # Main app entry, Canvas config, hero video
├── components/
│   ├── Objects.jsx           # Core 3D map geometry, materials & interactions
│   ├── Menu.jsx              # Global navigation, mobile drawer, theme toggle
│   ├── Html.jsx              # HTML overlays, state cards & tourism carousels
│   ├── StateDetailModal.jsx  # Full-screen state heritage & info modal
│   └── TravelDigestModal.jsx # Travel cost & route estimation modal
└── data/
    ├── indiaStatesData.js    # State content database (capitals, descriptions, media)
    └── travelData.js         # Geocoding, distance & transport cost engine
public/
└── videoplayback.mp4         # Hero background video
```

---

## 🎓 Acknowledgements

This project combines highly optimized 3D models of India with modern web development best practices to push the limits of digital tourism experiences. Thank you for exploring Yatra Bharat!
