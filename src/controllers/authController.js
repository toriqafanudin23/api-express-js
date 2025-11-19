// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma.js"; // Import Prisma client

// Register user
export const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  //sudah di validasi frontend
  //   if (!email || !password || !name || !role) {
  //     return res.status(400).json({ message: "Semua field wajib diisi" });
  //   }

  try {
    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(202)
        .json({ message: "Email sudah terpakai", status: 1 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role },
    });

    res.status(201).json({
      message: "User berhasil dibuat",
      status: 2,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // validasi sudah dilakukan frontend
  //   if (!email || !password) {
  //     return res.status(400).json({ message: "Email dan password wajib diisi" });
  //   }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email salah!", status: 1 });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!", status: 1 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Payload
      process.env.JWT_SECRET, // Pastikan ada di .env
      { expiresIn: "1h" } // Expired dalam 1 jam
    );

    res.json({ message: "Login berhasil", status: 2, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
