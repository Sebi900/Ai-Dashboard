// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../../lib/prisma';

// // API handler to fetch comments from the database
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Fetch comments from the database
//     const comments = await prisma.comment.findMany();
//     res.status(200).json(comments); // Send the comments as a JSON response
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ error: 'Failed to fetch comments' }); // Return an error message if something goes wrong
//   }
// }

// src/app/api/comments/route.js

// import prisma from "../../../../lib/prisma";

// export async function GET() {
//   try {
//     // Fetch comments from Prisma database
//     const comments = await prisma.comment.findMany();

//     // Return the comments as a JSON response
//     return new Response(JSON.stringify(comments), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     return new Response("Failed to fetch comments", { status: 500 });
//   }
// }

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

