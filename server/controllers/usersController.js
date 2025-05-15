import prisma from "../lib/prisma.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users: ", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
