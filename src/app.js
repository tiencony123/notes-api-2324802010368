const os = require('os');
const express = require('express');
const notesRouter = require('./routes/notes');

const app = express();
app.use(express.json());

// GET / - Thông tin máy chủ & MSSV
app.get('/', (req, res) => {
  res.json({
    student_id: '2324802010368',
    host: os.hostname(),
    platform: os.platform(),
    cpus: os.cpus().length,
    memoryGB: (os.totalmem() / (1024 ** 3)).toFixed(2),
    uptime: os.uptime()
  });
});

app.use('/notes', notesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const clientError = ['ValidationError', 'CastError'].includes(err.name)
    || err.code === 'LIMIT_FILE_SIZE';
  res.status(clientError ? 400 : 500).json({ error: err.message });
});

module.exports = app;