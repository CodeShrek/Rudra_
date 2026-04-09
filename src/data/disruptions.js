export const disruptions = [
  {
    id: 1,
    zone_id: 1,
    type: "ACCIDENT",
    severity: "HIGH",
    severity_score: 0.9,
    description: "Major accident causing heavy traffic",
    eta_multiplier: 1.6,
    penalty_suppressed: true,
    createdAt: new Date(),
    expires_at: new Date(Date.now() + 3600000), // 1 hour
  },
  {
    id: 2,
    zone_id: 2,
    type: "ROADBLOCK",
    severity: "MEDIUM",
    severity_score: 0.6,
    description: "Road construction work in progress",
    eta_multiplier: 1.3,
    penalty_suppressed: false,
    createdAt: new Date(),
    expires_at: new Date(Date.now() + 7200000), // 2 hours
  },
  {
    id: 3,
    zone_id: 3,
    type: "WEATHER",
    severity: "LOW",
    severity_score: 0.3,
    description: "Light rain, minor delays expected",
    eta_multiplier: 1.1,
    penalty_suppressed: false,
    createdAt: new Date(),
    expires_at: new Date(Date.now() + 1800000), // 30 mins
  },
];