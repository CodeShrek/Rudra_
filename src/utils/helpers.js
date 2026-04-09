// import Zone from "../data/zones.js";

// export const getZoneFromCoords = async (lat, lng) => {
//   const zones = await Zone.find();

//   let minDist = Infinity;
//   let selectedZone = null;

//   zones.forEach(zone => {
//     const [zLat, zLng] = zone.coordinates;

//     const dist = Math.sqrt(
//       Math.pow(lat - zLat, 2) +
//       Math.pow(lng - zLng, 2)
//     );

//     if (dist < minDist) {
//       minDist = dist;
//       selectedZone = zone;
//     }
//   });

//   return selectedZone;
// };


import { zones } from "../data/zones.js";

export const getZoneFromCoords = (lat, lng) => {
  let minDist = Infinity;
  let selectedZone = null;

  zones.forEach(zone => {
    const dist = Math.sqrt(
      Math.pow(lat - zone.lat, 2) +
      Math.pow(lng - zone.lng, 2)
    );

    if (dist < minDist) {
      minDist = dist;
      selectedZone = zone;
    }
  });

  return selectedZone;
};