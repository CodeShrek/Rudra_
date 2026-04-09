export const orders = [
  {
    id: 1,
    userId: "user_101",
    riderId: 1,
    pickupLocation: { lat: 28.61, lng: 77.20 },
    dropLocation: { lat: 28.65, lng: 77.22 },
    status: "pending",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: "user_102",
    riderId: 2,
    pickupLocation: { lat: 28.70, lng: 77.10 },
    dropLocation: { lat: 28.75, lng: 77.12 },
    status: "completed",
    createdAt: new Date(),
  },
];