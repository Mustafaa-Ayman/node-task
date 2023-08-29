import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (PELOD) => jwt.sign(PELOD, process.env.TOKEN_KEY);
