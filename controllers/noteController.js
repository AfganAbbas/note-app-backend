// Sample todo data
// let todos = [
//   { id: 1, text: "Learn Express.js", completed: false },
//   { id: 2, text: "Build a todo app", completed: true },
// ];
const Note = require("../model/Note");

// GET /todos - Get all todos
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving todos" });
  }
};

// POST /todos - Create a new todo
const addNote = async (req, res) => {
  try {
    const { name, content } = req.body;
    const note = new Note({
      name,
      content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

// GET /todos/:id - Get a specific todo
const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
};

// PUT /todos/:id - Update a specific todo
const updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // console.log(note);
    if (!updatedNote) {
      res.status(404).json({ error: "Note not found" });
    }
    res.json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

// DELETE /todos/:id - Delete a specific todo - DONE
const deletNote = async (req, res) => {
  const id = req.params.id;
  const result = await Note.findByIdAndDelete(id);
  if (result) {
    // Deleted the todo with the given ID
    // Handle the response accordingly
    res.json(result);
  } else {
    // Todo with the given ID not found
    // Handle the response accordingly
    res.status(404).json({ error: "Note not found" });
  }
};

module.exports = { getAllNotes, getNote, addNote, updateNote, deletNote };
