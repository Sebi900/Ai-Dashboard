// src/app/api/comments/categorize/route.js

import { categorizeAndUpdateComments } from "../../../../lib/ai";

export async function POST() {
  try {
    await categorizeAndUpdateComments(); // Categorize and update all comments
    return new Response("Comments categorized and updated successfully.", { status: 200 });
  } catch (error) {
    return new Response("Failed to categorize comments.", { status: 500 });
  }
}

