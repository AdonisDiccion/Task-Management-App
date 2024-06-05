import dotenv from "dotenv";
dotenv.config();

export const serverPort = process.env.PORT;
export const mongoUri = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const serverUrl = process.env.SERVER_URL;
export const emailUser = process.env.EMAIL_USER;
export const emailPass = process.env.EMAIL_PASS;
