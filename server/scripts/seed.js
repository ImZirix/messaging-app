import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      username: "alice",
      password: "hashedpassword1",
      avatar: "https://example.com/avatar1.png",
      bio: "Hello, I’m Alice!",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      username: "bob",
      password: "hashedpassword2",
      avatar: "https://example.com/avatar2.png",
      bio: "Hey, I’m Bob.",
    },
  });

  await prisma.message.create({
    data: {
      text: "Hi Bob!",
      sender: { connect: { id: user1.id } },
      receiver: { connect: { id: user2.id } },
    },
  });

  console.log("Seed data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
