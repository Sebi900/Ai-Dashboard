// api/update-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ message: "Status updated successfully", updatedComment });
  } catch (error) {
    console.error("Error updating comment status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
