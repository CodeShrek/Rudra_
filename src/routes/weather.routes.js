import express from "express";
import { success, error } from "../utils/response.js";
import { verifiedZones } from "../data/verified_zones.js";
import { getZoneFromCoords } from "../utils/helpers.js";

const router = express.Router();

// GET /weather/zone-status
router.get("/zone-status", (req, res) => {
  const { lat, lng } = req.query;

  const zone = getZoneFromCoords(Number(lat), Number(lng));
  if (!zone) return error(res, "ZONE_NOT_FOUND", "Zone not found");

  const zoneData = verifiedZones.find(z => z.zone_id === zone.zone_id);

  if (!zoneData) {
    return success(res, {
      zone_id: zone.zone_id,
      weather_severity: "LOW",
      severity_score: 0.1,
      condition: "CLEAR",
      eta_multiplier: 1.0,
      penalty_suppressed: false,
      alert_message: "No disruption"
    });
  }

  return success(res, {
    zone_id: zone.zone_id,
    weather_severity: zoneData.severity,
    severity_score: zoneData.severity_score,
    condition: zoneData.condition,
    eta_multiplier: zoneData.eta_multiplier,
    penalty_suppressed: zoneData.penalty_suppressed,
    alert_message: `${zoneData.condition} detected in ${zoneData.zone_name}`,
    expires_at: zoneData.expires_at
  });
});

export default router;