import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './src/config/db.js';
import inventoryRoutes from './src/routes/inventoryRoutes.js';
import rateLimiter from './src/middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

connectDB();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Zypshotz IMS API is running...',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
