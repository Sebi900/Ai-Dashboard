// globals.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Add the 'prisma' property to the global object with the correct type
  var prisma: PrismaClient | undefined;
}

export {};
