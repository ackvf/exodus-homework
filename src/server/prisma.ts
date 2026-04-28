import { PrismaClient } from "@prisma/client"

import "@/server/env"

declare global {
  var prismaGlobal: PrismaClient | undefined
}

export const prisma = globalThis.prismaGlobal ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma
}
