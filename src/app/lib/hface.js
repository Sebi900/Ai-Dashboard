import axios from "axios";

// Fetch the Hugging Face API key from the .env file
const HF_API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY; // Use this for client-side
// or use process.env.HUGGINGFACE_API_KEY for server-side only

// Base URL for Hugging Face Inference API
const BASE_URL = "https://api-inference.huggingface.co/models";

export async function categorizeCommentHuggingFace(commentContent) {
  try {
    // Make the POST request to the Hugging Face API
    const response = await axios.post(
      `${BASE_URL}/distilbert/distilbert-base-uncased-finetuned-sst-2-english`, // Replace with the model of your choice
      {
        inputs: commentContent,
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`, // Use the API key from the .env file
        },
      }
    );

    // Extract and return the result from the API
    return response.data;
  } catch (error) {
    console.error("Error using Hugging Face API:", error);
    throw new Error("Failed to categorize comment");
  }
}

