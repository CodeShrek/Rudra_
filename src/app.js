import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import supportRoutes from "./routes/support.routes.js";
import corroborationRoutes from "./routes/corroboration.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/weather", weatherRoutes);
app.use("/api/v1/support", supportRoutes);
app.use("/api/v1/corroboration", corroborationRoutes);
app.use("/api/v1/emergency", emergencyRoutes);
app.use("/api/v1/", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;