import prisma from "@/app/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Extract the ID from the URL parameters

  try {
    // Fetch the comment by ID from the database
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) }, // Use `Number(id)` since the `id` is an integer
    });

    if (!comment) {
      return new Response("Comment not found", { status: 404 });
    }

    // Return the comment as a JSON response
    return new Response(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.error("Error fetching comment:", error);
    return new Response("Failed to fetch comment", { status: 500 });
  }
}
