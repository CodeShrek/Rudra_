import express from "express";
import { disruptions } from "../data/disruptions.js";
import { success } from "../utils/response.js";

const router = express.Router();

router.get("/zone/:zone_id", (req, res) => {
  const { zone_id } = req.params;

  const reports = disruptions.filter(r => r.zone_id === zone_id);

  const verified = reports.filter(r => r.verified);

  return success(res, {
    zone_id,
    report_count: reports.length,
    threshold: 2,
    verified: verified.length >= 2,
    condition: reports[0]?.condition || "CLEAR",
    penalty_suppressed_for_all: verified.length >= 2
  });
});

// router.get("/zone/:zoneId", (req, res) => {
//   return success(res, {
//     report_count: 1,
//     verified: false
//   });
// });

export default router;