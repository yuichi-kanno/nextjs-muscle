import { PrismaClient } from "@prisma/client";

// TODO: productionの場合の対応
// if (process.env.NODE_ENV === "production") {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   // prisma = new PrismaClient();
//   prisma = global.prisma;
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }
const prisma = new PrismaClient();

export default prisma;
