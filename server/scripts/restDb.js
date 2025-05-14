import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all records from all tables in correct order to avoid foreign key issues
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();
  // Add other tables as needed
}

main()
  .then(() => {
    console.log("Database cleared.");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
