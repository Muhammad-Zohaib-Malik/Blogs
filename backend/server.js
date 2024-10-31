import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import blogRoutes from './routes/blog.route.js';
import { connectDB } from './config/db.js';
import cors from 'cors'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());
app.use('/api/v1', userRoutes);
app.use('/api/v1', blogRoutes);

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running ${PORT}`)
})


