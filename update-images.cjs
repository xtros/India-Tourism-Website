const fs = require('fs');
let content = fs.readFileSync('src/data/indiaStatesData.js', 'utf8');

const images = {
  'andamanandnicobar': 'https://i.postimg.cc/25JZtYcg/An-aerial-drone-photograph-capturing-the-breathtaking-view-of-the-Andaman-and-Nicobar-Islands-as-see.jpg',
  'himachalpradesh': 'https://i.postimg.cc/ydckrZSz/A-hill-station-in-Himachal-Pradesh-shimla.jpg',
  'arunachalpradesh': 'https://i.postimg.cc/jSbv8Hws/Bomdila-Arunachal-pradesh-Arun-kumar-Singh.jpg',
  'andhrapradesh': 'https://i.ibb.co/nxkngvd/Araku-valley.jpg',
  'karnataka': 'https://i.postimg.cc/YqqCQV8g/Near-Me.jpg',
  'kerala': 'https://i.postimg.cc/3NL7L897/God-Owns-Country-Kerala.jpg',
  'assam': 'https://i.postimg.cc/59PVWtqN/assam-festival-Assam-Tourist-Spots.jpg',
  'bihar': 'https://i.postimg.cc/FKx6bPT7/India.jpg',
  'chhattisgarh': 'https://i.postimg.cc/tRLH4MwT/Chitrakote-Waterfalls-6M4X-2X8-Tiratha-Chhattisgarh-494010-India.jpg',
  'goa': 'https://i.postimg.cc/ZKk1Syvh/Goa-Beaches-Travel-Places-to-visit-in-Goa-Beaches-in-Goa-Pic-21.jpg',
  'gujarat': 'https://i.postimg.cc/jjGh7ybP/beautiful.webp',
  'haryana': 'https://i.postimg.cc/mkdzQGHJ/Rai-Bal-Mukund-Dass-Ka-Chatta-Narnaul-Haryana-Lying-In-Dust.jpg',
  'jharkhand': 'https://i.postimg.cc/43zYWccy/Patratu-Valley-Jharkhand.jpg',
  'madhyapradesh': 'https://i.postimg.cc/GpJpFC0p/Discover-these-hidden-gems-of-Madhya-Pradesh.jpg',
  'manipur': 'https://i.postimg.cc/0yGv30V3/Phumdis.jpg',
  'mizoram': 'https://i.postimg.cc/MKVX6Rs4/8-North-Eastern-States-In-India-That-Are-Awesome-Honeymoon-Destinations.jpg',
  'nagaland': 'https://i.postimg.cc/P5dfd7vr/9-Famous-Nagaland-Tourist-Places-to-Visit.jpg'
};

for (const [id, url] of Object.entries(images)) {
  const regex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?tagline:\\s*".*?",)');
  content = content.replace(regex, `$1\n    imageUrl: "${url}",`);
}

fs.writeFileSync('src/data/indiaStatesData.js', content);
console.log("Updated indiaStatesData.js successfully!");
