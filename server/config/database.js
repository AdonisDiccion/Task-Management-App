import mongoose from "mongoose";
import { mongoUri } from "./env.js";

export async function connectDB () {
    
    try {
        await mongoose.connect(mongoUri);
        console.log('Database connected: TaskManagementApp');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.on('error', (err) => {
        console.error(`Connection error: ${err}`);
    });

}