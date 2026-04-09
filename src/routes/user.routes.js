import express from "express";

const router = express.Router();

// GET /api/users
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Users fetched successfully",
    data: []
  });
});

// POST /api/users
router.post("/", (req, res) => {
  const { name } = req.body;

  res.json({
    success: true,
    message: "User created",
    user: { name }
  });
});

export default router;
