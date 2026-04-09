import express from "express";
import { riders } from "../data/riders.js";
import { emergencies } from "../data/emergencies.js";
import { success } from "../utils/response.js";

const router = express.Router();

// FIND NEAREST RIDER
const findNearestRider = (lat, lng, excludeId) => {
  let best = null;
  let minDist = Infinity;

  riders.forEach(r => {
    if (r.rider_id === excludeId || r.status !== "AVAILABLE") return;

    const dist = Math.sqrt(
      Math.pow(lat - r.lat, 2) +
      Math.pow(lng - r.lng, 2)
    );

    if (dist < minDist) {
      minDist = dist;
      best = r;
    }
  });

  return best;
};

// POST /emergency/declare
router.post("/declare", (req, res) => {
  const { rider_id, lat, lng } = req.body;

  const nearest = findNearestRider(lat, lng, rider_id);

  const emergency = {
    emergency_id: "emg_" + Date.now(),
    ...req.body,
    transfer_status: nearest ? "ASSIGNED" : "FAILED",
    new_rider_id: nearest?.rider_id || null,
    new_rider_name: nearest?.name || null,
    new_rider_eta_minutes: nearest ? 10 : null,
    penalty_applied: false
  };

  emergencies.push(emergency);

  return success(res, emergency);
});

// router.post("/declare", (req, res) => {
//   return success(res, {
//     status: "SEARCHING"
//   });
// });

export default router;