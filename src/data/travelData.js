export const stateCapitalCoordinates = {
  // States
  andhrapradesh: { lat: 16.5062, lng: 80.6480 },
  arunachalpradesh: { lat: 27.0844, lng: 93.6053 },
  assam: { lat: 26.1433, lng: 91.7898 },
  bihar: { lat: 25.5941, lng: 85.1376 },
  chhattisgarh: { lat: 21.2514, lng: 81.6296 },
  goa: { lat: 15.4909, lng: 73.8278 },
  gujarat: { lat: 23.2156, lng: 72.6369 },
  haryana: { lat: 30.7333, lng: 76.7794 },
  himachalpradesh: { lat: 31.1048, lng: 77.1734 },
  jharkhand: { lat: 23.3441, lng: 85.3096 },
  karnataka: { lat: 12.9716, lng: 77.5946 },
  kerala: { lat: 8.5241, lng: 76.9366 },
  madhyapradesh: { lat: 23.2599, lng: 77.4126 },
  maharashtra: { lat: 18.9750, lng: 72.8258 },
  manipur: { lat: 24.8170, lng: 93.9368 },
  meghalaya: { lat: 25.5788, lng: 91.8933 },
  mizoram: { lat: 23.7271, lng: 92.7176 },
  nagaland: { lat: 25.6751, lng: 94.1086 },
  odisha: { lat: 20.2961, lng: 85.8245 },
  punjab: { lat: 30.7333, lng: 76.7794 },
  rajasthan: { lat: 26.9124, lng: 75.7873 },
  sikkim: { lat: 27.3389, lng: 88.6065 },
  tamilnadu: { lat: 13.0827, lng: 80.2707 },
  telangana: { lat: 17.3850, lng: 78.4867 },
  tripura: { lat: 23.8315, lng: 91.2868 },
  uttarpradesh: { lat: 26.8467, lng: 80.9462 },
  uttarakhand: { lat: 30.3165, lng: 78.0322 },
  westbengal: { lat: 22.5726, lng: 88.3639 },
  
  // Union Territories
  andamannicobar: { lat: 11.6234, lng: 92.7265 },
  chandigarh: { lat: 30.7333, lng: 76.7794 },
  dadranagarhavelidaman: { lat: 20.3974, lng: 72.8328 },
  lakshadweep: { lat: 10.5667, lng: 72.6167 },
  delhi: { lat: 28.6139, lng: 77.2090 },
  puducherry: { lat: 11.9416, lng: 79.8083 },
  ladakh: { lat: 34.1526, lng: 77.5771 },
  jammuandkashmir: { lat: 34.0837, lng: 74.7973 }
};

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;  
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

export function estimateTravelCosts(distanceKm) {
  const flightPossible = distanceKm > 300;
  
  const flightCost = Math.round((distanceKm * 4.5 + 2000) / 100) * 100;
  const flightTimeHours = Math.max(1, distanceKm / 600) + 1.5;
  
  const trainCost = Math.round((distanceKm * 1.8) / 50) * 50;
  const trainTimeHours = distanceKm / 65;
  
  const busCost = Math.round((distanceKm * 2.2) / 50) * 50;
  const busTimeHours = distanceKm / 45;
  
  return {
    flight: flightPossible ? {
      cost: flightCost,
      timeText: `${Math.floor(flightTimeHours)}h ${Math.round((flightTimeHours%1)*60)}m`,
      description: "Fastest • Excludes transfer to airport"
    } : null,
    train: {
      cost: trainCost,
      timeText: `${Math.floor(trainTimeHours)}h ${Math.round((trainTimeHours%1)*60)}m`,
      description: "Comfortable • AC 3-Tier Estimate"
    },
    bus: {
      cost: busCost,
      timeText: `${Math.floor(busTimeHours)}h ${Math.round((busTimeHours%1)*60)}m`,
      description: "Budget • Volvo / AC Seater"
    },
    distance: Math.round(distanceKm)
  };
}
