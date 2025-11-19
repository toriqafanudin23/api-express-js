// middleware/auth.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Akses ditolak, token tidak ada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan info user di req
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};
