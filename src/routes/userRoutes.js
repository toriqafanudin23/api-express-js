import { Router } from "express";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const userRoutes = Router();
userRoutes.get("/users", getUsers);
userRoutes.post("/users", createUser);
userRoutes.delete("/users/:id", deleteUser);
userRoutes.put("/users/:id", updateUser);
export default userRoutes;
//# sourceMappingURL=userRoutes.js.map
