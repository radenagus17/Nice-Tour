// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

export const prisma = new PrismaClient();

(async () => {
  const password = await bcrypt.hashSync("admin123", 10);

  const userSeed = await prisma.user.create({
    data: {
      email: "admin@mail.com",
      name: "Admin",
      role: "ADMIN",
      password,
      passport: "",
    },
  });

  console.log(userSeed);
})();
