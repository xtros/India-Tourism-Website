const fs = require('fs');
const content = fs.readFileSync('src/components/StateDetailModal.jsx', 'utf8');

const languagesMap = {
  andhrapradesh: "Telugu",
  arunachalpradesh: "English, Hindi, Monpa",
  assam: "Assamese, Bodo, Bengali",
  bihar: "Hindi, Bhojpuri, Maithili",
  chhattisgarh: "Hindi, Chhattisgarhi",
  goa: "Konkani, Marathi, English",
  gujarat: "Gujarati",
  haryana: "Hindi, Haryanvi, Punjabi",
  himachalpradesh: "Hindi, Pahari",
  jharkhand: "Hindi, Santali, Khortha",
  karnataka: "Kannada",
  kerala: "Malayalam",
  madhyapradesh: "Hindi",
  maharashtra: "Marathi",
  manipur: "Meiteilon (Manipuri)",
  meghalaya: "English, Khasi, Garo",
  mizoram: "Mizo, English",
  nagaland: "English, Nagamese",
  odisha: "Odia",
  punjab: "Punjabi",
  rajasthan: "Hindi, Rajasthani, Marwari",
  sikkim: "Nepali, Sikkimese, Lepcha, English",
  tamilnadu: "Tamil",
  telangana: "Telugu, Urdu",
  tripura: "Bengali, Kokborok",
  uttarpradesh: "Hindi, Urdu, Awadhi, Bhojpuri",
  uttarakhand: "Hindi, Garhwali, Kumaoni",
  westbengal: "Bengali, Nepali",
  andamanandnicobar: "Hindi, English, Bengali, Tamil, Telugu",
  chandigarh: "English, Hindi, Punjabi",
  dadraandnagarhavelianddamananddiu: "Gujarati, Hindi, Marathi, Konkani",
  lakshadweep: "Malayalam, Mahl",
  delhi: "Hindi, Punjabi, Urdu",
  puducherry: "Tamil, French, Telugu, Malayalam, English",
  jammuandkashmir: "Kashmiri, Dogri, Urdu",
  ladakh: "Ladakhi, Purgi, Balti, Urdu, English"
};

let updated = content.replace(
  /const defaultCultureFallback = \{([\s\S]*?)language: "Regional Language & Hindi"([\s\S]*?)\};/,
  `const defaultCultureFallback = {$1language: "Regional Language"$2};\n\nconst stateLanguages = ${JSON.stringify(languagesMap, null, 2)};`
);

updated = updated.replace(
  /const cultureInfo = stateCultureData\[state\.id\] \|\| defaultCultureFallback;/,
  `const cultureInfo = { ...(stateCultureData[state.id] || defaultCultureFallback) };\n  if (stateLanguages[state.id]) {\n    cultureInfo.language = stateLanguages[state.id];\n  }`
);

fs.writeFileSync('src/components/StateDetailModal.jsx', updated);
console.log("Updated StateDetailModal.jsx successfully");
