import { Router } from "express";
import {
  addTodo,
  checkTodo,
  deleteTodo,
  editTodo,
  getTodos,
  uncheckTodo,
} from "./todo.controller.js";
const router = Router();
router.post("/add", addTodo);
router.put("/edit/:id", editTodo);
router.delete("/delete/:id", deleteTodo);
router.patch("/check/:id", checkTodo);
router.patch("/uncheck/:id", uncheckTodo);
router.get("/list/:state", getTodos);

export default router;
