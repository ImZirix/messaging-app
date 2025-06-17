import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.js";
import { generateToken } from "../lib/jwt.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.log("Error creating user", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, username: true, password: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, ...safeUser } = user;

    const token = generateToken(user);
    res.status(200).json({ token, user: safeUser });
  } catch (err) {
    console.log("Error creating user", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
