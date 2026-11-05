const express = require('express');
const os = require('os');

const app = express();
app.use(express.json());

let notes = [];

// GET / - Thông tin máy chủ & MSSV
app.get('/', (req, res) => {
  res.json({
    student_id: '2324802010368',
    host: os.hostname(),
    platform: os.platform(),
    uptime: os.uptime()
  });
});

// GET /api/notes - Lấy danh sách ghi chú
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// POST /api/notes - Thêm ghi chú mới
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const newNote = {
    id: notes.length + 1,
    title,
    content,
    createdAt: new Date()
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

module.exports = app;