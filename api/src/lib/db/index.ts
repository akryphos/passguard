import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { db: PrismaClient };

const prisma =
  globalForPrisma.db ||
  new PrismaClient({
    log:
      process.env.NODE_ENV == "development"
        ? ["query", "error", "warn"]
        : ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.db = prisma;

export default prisma;
