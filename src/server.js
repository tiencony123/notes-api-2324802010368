require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./db');

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`API đang chạy tại cổng ${PORT}`)))
  .catch((err) => {
    console.error('Không kết nối được cơ sở dữ liệu:', err.message);
    process.exit(1);
  });