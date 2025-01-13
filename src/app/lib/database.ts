// lib/database.ts
import { PrismaClient } from "@prisma/client"; // Assuming you're using Prisma, or substitute with your ORM/DB client

const prisma = new PrismaClient();

export const saveCategoriesToDatabase = async (categories: { id: number; category: string }[]) => {
  try {
    // Example logic to save each category
    for (const { id, category } of categories) {
      await prisma.comment.update({
        where: { id },
        data: { category },
      });
    }
  } catch (error) {
    console.error("Error saving to database:", error);
    throw new Error("Failed to save categories to the database");
  }
};
