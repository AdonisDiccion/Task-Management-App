import express from 'express';
import morgan from 'morgan';
import Cors from 'cors';
import { serverPort } from './config/env.js';
import { connectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'



const app = express();

// Database Connection
connectDB();

// Middleware
// use cors
app.use(Cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api', taskRoutes);


app.listen(serverPort, ()=> {
    console.log(`Server is running on port ${serverPort}`)
})