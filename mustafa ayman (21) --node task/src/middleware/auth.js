import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authUser = (req, res, next) => {
  const token = req.header("token");
  jwt.verify(token, process.env.TOKEN_KEY, async (error, decode) => {
    if (error) {
      res.json({ message: "Invalid Token", error });
    } else {
      req.userId = decode.userId;
      next();
    }
  });
};
