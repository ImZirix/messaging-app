import prisma from "../lib/prisma.js";

const user = await prisma.user.findUnique({ where: { username: "NotZirix" } });

console.log(user);
