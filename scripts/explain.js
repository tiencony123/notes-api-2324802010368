require('dotenv').config();
const mongoose = require('mongoose');
const Note = require('../src/models/note');

const pick = (r) => (Array.isArray(r) ? r[0] : r).executionStats;

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Note.syncIndexes();
  const scan = pick(await Note.find({ tags: 'docker' }).hint({ $natural: 1 }).explain('executionStats'));
  const idx = pick(await Note.find({ tags: 'docker' }).explain('executionStats'));
  console.table({
    'Quét toàn bộ': { docsExamined: scan.totalDocsExamined, returned: scan.nReturned, ms: scan.executionTimeMillis },
    'Dùng chỉ mục': { docsExamined: idx.totalDocsExamined, returned: idx.nReturned, ms: idx.executionTimeMillis }
  });
  await mongoose.disconnect();
})();