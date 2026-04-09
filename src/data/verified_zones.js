export const verifiedZones = [
  {
    zone_id: 1,
    zone_name: "Zone A",
    severity: "HIGH",
    severity_score: 0.9,
    condition: "RAIN",
    eta_multiplier: 1.5,
    penalty_suppressed: true,
    expires_at: new Date(Date.now() + 3600000),
  },
];