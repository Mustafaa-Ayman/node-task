import { Todo } from "../../../database/models/todo.model.js";

export const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const getTodos = async (req, res) => {
  try {
    let todos;
    switch (req.params.state) {
      case "check":
        todos = await Todo.find({ checked: true }).populate(
          "author",
          "username -_id"
        );
        break;
      case "uncheck":
        todos = await Todo.find({ checked: false }).populate(
          "author",
          "username -_id"
        );
        break;
      case "all":
        todos = await Todo.find().populate("author", "username -_id");
        break;
      default:
        res.json({ message: "Invalid Input" });
        return;
    }
    res.json({ todos });
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const editTodo = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const checkTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { checked: true },
      { new: true }
    );
    res.json({ message: "Todo checked successfully", todo: updatedTodo });
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const uncheckTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { checked: false },
      { new: true }
    );
    res.json({ message: "Todo unchecked successfully", todo: updatedTodo });
  } catch (error) {
    res.json({ message: "error" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.json({ message: "error" });
  }
};
