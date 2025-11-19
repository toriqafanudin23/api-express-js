import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
// Middleware global
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.use("/", userRoutes); // Mount user routes
app.use("/", authRoutes);
export default app;
//# sourceMappingURL=app.js.map
