import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './src/config/db.js';
import inventoryRoutes from './src/routes/inventoryRoutes.js';
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

connectDB();

if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use('/api/inventory', inventoryRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Zypshotz IMS API is running...',
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
