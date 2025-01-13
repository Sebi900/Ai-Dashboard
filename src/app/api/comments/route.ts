import prisma from "../../lib/prisma";

export async function GET() {
  try {
    // Fetch comments from Prisma database
    const comments = await prisma.comment.findMany();

    // Return the comments as a JSON response
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}

