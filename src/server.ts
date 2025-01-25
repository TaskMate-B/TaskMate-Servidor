import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const server = express();

dotenv.config();
connectDB();
server.use(express.json());

//API Routes
server.use('/api/user', userRoutes);
server.use('/api/project', projectRoutes);
server.use('/api/task', taskRoutes);

export default server;