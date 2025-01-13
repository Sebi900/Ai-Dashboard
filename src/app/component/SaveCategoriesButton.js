// components/SaveCategoriesButton.js
"use client";

const SaveCategoriesButton = ({ comments }) => {
  const saveCategories = async () => {
    try {
      // Extract categories from comments
      const categories = comments.map((comment) => ({
        id: comment.id,
        category: comment.category,
      }));

      // Send categories to the database via API
      const response = await fetch("/api/save-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categories),
      });

      if (!response.ok) {
        throw new Error(`Failed to save categories: ${response.statusText}`);
      }

      const result = await response.json();
      alert("Categories saved successfully!");
      console.log("Save result:", result);
    } catch (error) {
      console.error("Error saving categories:", error.message);
      alert("Failed to save categories.");
    }
  };

  return (
    <button
      onClick={saveCategories}
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
    >
      Save Categories
    </button>
  );
};

export default SaveCategoriesButton;
