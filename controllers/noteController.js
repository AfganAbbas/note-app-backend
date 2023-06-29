const express = require('express');
const router = express.Router();

// Sample todo data
let todos = [
  { id: 1, text: 'Learn Express.js', completed: false },
  { id: 2, text: 'Build a todo app', completed: true },
];

// GET /todos - Get all todos
router.get('/', (req, res) => {
//   res.send(todos)
  res.json(todos);
});

// POST /todos - Create a new todo
router.post('/', (req, res) => {
  const { id, name, content } = req.body;
  const newTodo = { id, text, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// GET /todos/:id - Get a specific todo
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// PUT /todos/:id - Update a specific todo
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.text = text || todo.text;
    todo.completed = completed || todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// DELETE /todos/:id - Delete a specific todo
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    res.json(deletedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;