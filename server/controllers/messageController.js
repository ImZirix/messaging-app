import prisma from "../lib/prisma.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, receiverId } = req.body;
    const senderId = req.user.id;

    const message = await prisma.message.create({
      data: {
        text,
        sender: { connect: { id: senderId } },
        receiver: { connect: { id: receiverId } },
      },
      include: {
        sender: { select: { username: true, avatar: true } },
        receiver: { select: { username: true, avatar: true } },
      },
    });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot send message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.user.receiverId;

    if (!receiverId) {
      return res.status(400).json({ error: "receiverId is required" });
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        sender: {
          select: {
            username: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  const currentUserId = req.user.id;
  const otherUserId = req.params.otherUserId;

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: currentUserId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: currentUserId },
        ],
      },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages: ", err);
    res.status(500).json({ error: "Could not fetch messages" });
  }
};
