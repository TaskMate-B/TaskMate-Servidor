import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';

const server = express();

dotenv.config();
connectDB();
server.use(express.json());

//API Routes
server.use('/api/user', userRoutes);
server.use('/api/project', projectRoutes);

export default server;