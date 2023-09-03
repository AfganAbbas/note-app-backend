// Sample note data
// let notes = [
//   { id: 1, text: "Learn Express.js", completed: false },
//   { id: 2, text: "Build a note app", completed: true },
// ];
const Note = require("../model/Note");

// GET /notes - Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving notes" });
  }
};

// POST /notes - Create a new note
const addNote = async (req, res) => {
  try {
    const { name, content } = req.body;
    const note = new Note({
      name,
      content,
      user_id: req.user,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

// GET /notes/:id - Get a specific note
const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    if (note.user_id.toString() !== req.user) {
      return res
        .status(403)
        .json({ error: "User doesn't have an access to this note" });
    }
    res.json(note);
  } else {
    res.status(404).json({ error: "note not found" });
  }
};

// PUT /notes/:id - Update a specific note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ error: "Note not found" });
    }
    if (note.user_id.toString() !== req.user) {
      return res
        .status(403)
        .json({ error: "User doesn't have an access to this note" });
    }
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedNote);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};

// DELETE /notes/:id - Delete a specific note - DONE
const deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);
  if (note) {
    if (note.user_id.toString() !== req.user) {
      return res
        .status(403)
        .json({ error: "User doesn't have an access to this note" });
    }
    const result = await Note.findByIdAndDelete(id);

    // Deleted the note with the given ID
    // Handle the response accordingly
    res.json(result);
  } else {
    // note with the given ID not found
    // Handle the response accordingly
    res.status(404).json({ error: "Note not found" });
  }
};

module.exports = { getAllNotes, getNote, addNote, updateNote, deleteNote };
