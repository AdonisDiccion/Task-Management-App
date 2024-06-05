import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

// HASH PASSWORD
export async function hashPassword(password) {
  try {
    const saltRounds = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(`Error hashing password: ${err}`);
    throw err;
  }
}

// COMPARE PASSWORD
export async function comparePassword(hashedPassword, password) {
  try {
    const matchPassword = await bcrypt.compare(hashedPassword, password);
    return matchPassword;
  } catch (err) {
    console.error(`Error comparing passwords: ${err}`);
    throw err;
  }
}

// GENERATE JSONWEBTOKEN
export function generateToken(user) {
  try {
    if (!jwtSecret) {
      throw new Error("No JWT secret found");
    }

    const token = jwt.sign({ userId: user._id  }, jwtSecret, {
      expiresIn: "7d",
    });

    return token;
  } catch (err) {
    console.error(`Error generating token: ${err}`);
    throw err;
  }
}
