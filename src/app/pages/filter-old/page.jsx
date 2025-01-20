"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../component/Sidebar";
import { query } from "../../lib/bart";
import SaveCategoriesButton from "../../component/SaveCategoriesButton";

const FilterPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null); // State to track the current filter

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/comments/");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setComments(data);
          analyzeAllComments(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        setError("Failed to load comments.");
      }
      setLoading(false);
    };

    fetchComments();
  }, []);

  const analyzeAllComments = async (commentsList) => {
    setLoading(true);

    try {
      const updatedComments = await Promise.all(
        commentsList.map(async (comment) => {
          const data = {
            inputs: comment.content,
            parameters: {
              candidate_labels: ["spam", "toxic", "constructive"],
            },
          };

          const analysisResult = await query(data);
          const highestScoreLabel = analysisResult.labels[0];
          comment.category = highestScoreLabel;
          return comment;
        })
      );

      setComments(updatedComments);
    } catch (error) {
      console.error("Error analyzing comments:", error.message);
      setError("Failed to analyze comments.");
    }

    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch("/api/update-status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedComment = await response.json();

      // Filter out the comment with the updated status from the list
      setComments((prev) =>
        prev.filter((comment) => comment.id !== id)
      );

      // alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error.message);
      alert("Failed to update status.");
    }
  };

  const filteredComments = filter
    ? comments.filter((comment) => comment.category === filter)
    : comments;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setFilter={setFilter} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Comments List</h1>

          {loading && (
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-10 h-10"></div>
              <p className="text-gray-500">Loading comments...</p>
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <ul className="space-y-4 mt-6">
            {filteredComments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold text-gray-700">{comment.author}</p>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      comment.category === "spam"
                        ? "bg-red-500 text-white"
                        : comment.category === "toxic"
                        ? "bg-yellow-500 text-white"
                        : comment.category === "constructive"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {comment.category || "Not Categorized Yet"}
                  </span>
                </div>
                <p className="text-gray-600">{comment.content}</p>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => updateStatus(comment.id, "approved")}
                    className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(comment.id, "rejected")}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => updateStatus(comment.id, "pending")}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Forward
                  </button>
                </div>
              </li>
            ))}
          </ul>
               {/* Add SaveCategoriesButton here */}
        <div className="mt-6">
          <SaveCategoriesButton comments={comments} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
