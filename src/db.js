const mongoose = require('mongoose');

async function connectDB(uri) {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('Đã kết nối MongoDB Atlas');
}

module.exports = { connectDB };