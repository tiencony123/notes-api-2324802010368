const express = require('express');
const os = require('os');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

mongoose.set('sanitizeFilter', true); // lớp phòng thủ thứ hai chống NoSQL injection

const app = express();
app.set('trust proxy', 1);            // Codespaces và Vercel đứng sau proxy
app.use(helmet());                    // các header bảo mật HTTP
app.use(express.json({ limit: '100kb' }));

app.use('/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 }), authRouter);

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