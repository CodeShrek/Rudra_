import express from "express";
import { tickets } from "../data/tickets.js";
import { success, error } from "../utils/response.js";

const router = express.Router();

// GET ticket
router.get("/ticket/:id", (req, res) => {
  const ticket = tickets.find(t => t.ticket_id === req.params.id);

  if (!ticket) return error(res, "NOT_FOUND", "Ticket not found");

  return success(res, ticket);
});

// POST create
router.post("/raise-ticket", (req, res) => {
  const newTicket = {
    ...req.body,
    ticket_id: "tkt_" + Date.now(),
    status: "OPEN",
    created_at: new Date().toISOString()
  };

  tickets.push(newTicket);

  return success(res, newTicket);
});

// router.post("/", (req, res) => {
//   return success(res, {
//     ticket_id: "TCK123",
//     status: "open"
//   });
// });

export default router;