import { NextRequest, NextResponse } from "next/server";
import { saveCategoriesToDatabase } from "@/app/lib/database"// Create this function to interact with your database

export async function POST(req: NextRequest) {
  try {
    const categories = await req.json();

    if (!Array.isArray(categories)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Save categories to the database
    await saveCategoriesToDatabase(categories);

    return NextResponse.json({ message: "Categories saved successfully" });
  } catch (error) {
    console.error("Error saving categories:", error);
    return NextResponse.json(
      { error: "Failed to save categories" },
      { status: 500 }
    );
  }
}
