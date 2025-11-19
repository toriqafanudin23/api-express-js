import prisma from "../database/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.$queryRaw`SELECT * FROM "User" ORDER BY id DESC`;
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const isActive = true;

    const existingUser = await prisma.$queryRaw`
      SELECT email FROM "User" WHERE email = ${email};
    `;

    if (existingUser.length > 0) {
      return res
        .status(202)
        .json({
          message: "Email sudah dipakai, gunakan email lain!",
          status: 1,
        });
    }

    const user =
      await prisma.$queryRaw`INSERT INTO "User" (name, email, password, role, "isActive") VALUES (${name}, ${email}, ${password}, ${role}, ${isActive}) RETURNING *`;
    res
      .status(201)
      .json({
        message: "Berhasil menambahkan data! Silahkan login!",
        data: user,
        status: 2,
      });
  } catch (err) {
    console.error("Error post users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    await prisma.$queryRaw`DELETE FROM "User" WHERE id = ${userId}`;
    res.status(200).json({ message: "Berhasil menghapus data user!" });
  } catch (err) {
    console.log("Gagal menghapus data user!");
    res.status(500).send({ error: "Internal server error:", err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { name, email, password, role } = req.body;
    const isActive = true;
    const user =
      await prisma.$queryRaw`UPDATE "User" SET name=${name}, email=${email}, password=${password}, role=${role}, "isActive"=${isActive} WHERE id=${userId} RETURNING name, email, password, role, "isActive";`;
    res.status(200).json({
      message: "Berhasil mengedit data user!",
      data: user,
    });
  } catch (err) {
    console.log("Gagal mengubah data user!");
    res.status(500).send({ error: "Internal server error:", err });
  }
};
