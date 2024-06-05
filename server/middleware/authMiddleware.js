import jwt, { decode } from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const decoded = jwt.verify(authHeader, jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("cant login");
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
};
