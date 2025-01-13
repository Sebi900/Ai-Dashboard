export async function query(data) {
  const apiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY; // Fetch the API key from .env file

  if (!apiKey) {
    throw new Error("API key is missing. Please set it in the .env file.");
  }

  const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-mnli", {
    headers: {
      Authorization: `Bearer ${apiKey}`, // Use the API key from the .env file
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Hugging Face API.");
  }

  const result = await response.json();
  return result;
}

