const express = require("express");
const noteController = require("../controllers/noteController");
const router = express.Router();

// GET /todos - Get all todos
router.get("/", noteController.getAllNotes);

// POST /todos - Create a new todo
router.post("/", noteController.addNote);

// GET /todos/:id - Get a specific todo
router.get("/:id", noteController.getNote);

// PUT /todos/:id - Update a specific todo
router.put("/:id", noteController.updateNote);

// DELETE /todos/:id - Delete a specific todo
router.delete("/:id", noteController.deletNote);

module.exports = router;
