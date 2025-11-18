import express from "express";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
// Middleware global
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
app.use("/", userRoutes); // Mount user routes
export default app;
//# sourceMappingURL=app.js.map
