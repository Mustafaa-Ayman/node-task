import { Router } from "express";
const router = Router();

import {
  addUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./user.controller.js";

router.post("/adduser", addUser);
router.get("/getusers", getAllUsers);
router.put("/edituser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);
export default router;
