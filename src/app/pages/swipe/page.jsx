// "use client";

// import { useState, useEffect } from "react";
// import Sidebar from "../../component/Sidebar";
// import { query } from "../../lib/bart";
// import SaveCategoriesButton from "../../component/SaveCategoriesButton";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// const FilterPage = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState(null); // State to track the current filter
//   const [isSwipeMode, setIsSwipeMode] = useState(false); // Track if swipe mode is enabled
//   const [currentCommentIndex, setCurrentCommentIndex] = useState(0); // Track the current index of the comment

//   useEffect(() => {
//     const fetchComments = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:3000/api/comments/");
//         const data = await response.json();
//         if (data && Array.isArray(data)) {
//           setComments(data);
//           analyzeAllComments(data);
//         } else {
//           throw new Error("Invalid data format");
//         }
//       } catch (error) {
//         console.error("Error fetching comments:", error.message);
//         setError("Failed to load comments.");
//       }
//       setLoading(false);
//     };

//     fetchComments();
//   }, []);

//   const analyzeAllComments = async (commentsList) => {
//     setLoading(true);

//     try {
//       const updatedComments = await Promise.all(
//         commentsList.map(async (comment) => {
//           const data = {
//             inputs: comment.content,
//             parameters: {
//               candidate_labels: ["spam", "toxic", "constructive", "neutral"],
//             },
//           };

//           const analysisResult = await query(data);
//           const highestScoreLabel = analysisResult.labels[0];
//           if (highestScoreLabel.score < 0.5) {
//             comment.category = "uncertain";  // Or "neutral"
//           } else {
//             comment.category = highestScoreLabel.label;
//           }
//           return comment;
//         })
//       );

//       setComments(updatedComments);
//     } catch (error) {
//       console.error("Error analyzing comments:", error.message);
//       setError("Failed to analyze comments.");
//     }

//     setLoading(false);
//   };

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await fetch("/api/update-status", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id, status: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update status");
//       }

//       const updatedComment = await response.json();
//       // Filter out the comment with the updated status from the list
//       setComments((prev) => prev.filter((comment) => comment.id !== id));
//     } catch (error) {
//       console.error("Error updating status:", error.message);
//       alert("Failed to update status.");
//     }
//   };

//   // Keydown event listener for swipe mode
//   useEffect(() => {
//     if (isSwipeMode) {
//       const handleKeydown = (event) => {
//         if (event.key === "a") {
//           // Press 'A' to approve
//           handleApprove();
//         } else if (event.key === "d") {
//           // Press 'D' to reject (delete)
//           handleReject();
//         } else if (event.key === "f") {
//           // Press 'F' to forward
//           handleForward();
//         } else if (event.key === "ArrowRight") {
//           // Right arrow to go to the next comment
//           nextComment();
//         } else if (event.key === "ArrowLeft") {
//           // Left arrow to go to the previous comment
//           prevComment();
//         }
//       };

//       // Add the event listener
//       document.addEventListener("keydown", handleKeydown);

//       // Cleanup the event listener when component unmounts or swipe mode is disabled
//       return () => {
//         document.removeEventListener("keydown", handleKeydown);
//       };
//     }
//   }, [isSwipeMode, currentCommentIndex]);

//   const handleApprove = () => {
//     if (comments.length === 0) {
//       console.error("No comments available");
//       return;
//     }
  
//     if (currentCommentIndex >= 0 && currentCommentIndex < comments.length) {
//       const currentComment = comments[currentCommentIndex];
//       updateStatus(currentComment.id, "approved");
//       nextComment(); // Automatically move to the next comment after approval
//     } else {
//       console.error("No comment found at the current index");
//     }
//   };

//   const handleReject = () => {
//     const currentComment = comments[currentCommentIndex];
//     if (currentComment) {  // Check if the comment exists at the current index
//       updateStatus(currentComment.id, "rejected");
//       nextComment(); // Automatically move to the next comment after rejection
//     } else {
//       console.error("No comment found at the current index");
//     }
//   };

//   const handleForward = () => {
//     const currentComment = comments[currentCommentIndex];
//     if (currentComment) {  // Check if the comment exists at the current index
//       updateStatus(currentComment.id, "pending");
//       nextComment(); // Automatically move to the next comment after forwarding
//     } else {
//       console.error("No comment found at the current index");
//     }
//   };

//   const nextComment = () => {
//     if (currentCommentIndex < comments.length - 1) {
//       setCurrentCommentIndex((prevIndex) => prevIndex + 1);
//     } else {
//       console.log("No more comments to move forward to.");
//     }
//   };

//   const prevComment = () => {
//     if (currentCommentIndex > 0) {
//       setCurrentCommentIndex((prevIndex) => prevIndex - 1);
//     } else {
//       console.log("No previous comment available.");
//     }
//   };

//   const filteredComments = filter
//     ? comments.filter((comment) => comment.category === filter)
//     : comments;

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar setFilter={setFilter} />

//       {/* Main Content */}
//       <div className="flex-1 min-h-screen bg-gray-100 p-8">
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Comments List</h1>

//           {loading && (
//             <div className="flex justify-center items-center space-x-2">
//               <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-10 h-10"></div>
//               <p className="text-gray-500">Loading comments...</p>
//             </div>
//           )}

//           {error && <p className="text-red-500">{error}</p>}

//           <button
//             onClick={() => setIsSwipeMode(!isSwipeMode)}
//             className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             {isSwipeMode ? "Exit Swipe Mode" : "Enter Swipe Mode"}
//           </button>

//           <ul className="space-y-6 mt-6">
//             {filteredComments.map((comment, index) => (
//               <li
//                 key={comment.id}
//                 className={`p-5 border border-gray-300 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white ${
//                   currentCommentIndex === index ? "border-blue-500" : ""
//                 }`} // Highlight the current comment
//               >
//                 <div className="flex justify-between items-center mb-4 px-1 rounded-t-lg">
//                   <p className="text-lg font-semibold">{comment.author}</p>
//                   <span
//                     className={`px-4 py-2 text-sm font-medium rounded-full ${
//                       comment.category === "spam"
//                         ? "bg-red-500 text-white"
//                         : comment.category === "toxic"
//                         ? "bg-yellow-500 text-white"
//                         : comment.category === "constructive"
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-300 text-gray-800"
//                     }`}
//                   >
//                     {comment.category || "Not Categorized Yet"}
//                   </span>
//                 </div>

//                 <p className="text-gray-700 text-base">{comment.content}</p>

//                 {/* Action Buttons with FontAwesome Icons */}
//                 <div className="mt-6 flex space-x-3">
//                   <button
//                     onClick={() => updateStatus(comment.id, "approved")}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 flex items-center space-x-2"
//                   >
//                     <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
//                     <span className="sr-only">Approve</span>
//                   </button>
//                   <button
//                     onClick={() => updateStatus(comment.id, "rejected")}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 flex items-center space-x-2"
//                   >
//                     <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
//                     <span className="sr-only">Reject</span>
//                   </button>
//                   <button
//                     onClick={() => updateStatus(comment.id, "pending")}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 flex items-center space-x-2"
//                   >
//                     <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5" />
//                     <span className="sr-only">Forward</span>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Add SaveCategoriesButton here */}
//           <div className="mt-6">
//             <SaveCategoriesButton comments={comments} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterPage;


"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../component/Sidebar";

const FilterPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [swipeMode, setSwipeMode] = useState(false);
  const [actionStatus, setActionStatus] = useState(null); // To store the action feedback

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/comments/");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setComments(data);
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

      // Remove the comment from the list after updating the status
      setComments((prev) => prev.filter((comment) => comment.id !== id));

      // Show feedback based on the action
      setActionStatus(newStatus);

      // Clear the feedback message after a short delay
      setTimeout(() => setActionStatus(null), 2000);

      // Move to the next comment, but ensure index stays within bounds
      setCurrentCommentIndex((prevIndex) =>
        prevIndex < comments.length - 1 ? prevIndex : prevIndex - 1
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
      alert("Failed to update status.");
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!swipeMode || currentCommentIndex >= comments.length) return;

      const currentComment = comments[currentCommentIndex];
      if (!currentComment) return; // Safeguard against undefined comments

      switch (event.key.toLowerCase()) {
        case "a": // Approve
          updateStatus(currentComment.id, "approved");
          break;
        case "d": // Reject
          updateStatus(currentComment.id, "rejected");
          break;
        case "f": // Forward
          updateStatus(currentComment.id, "forwarded");
          break;
        default:
          break;
      }
    },
    [swipeMode, currentCommentIndex, comments]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const startSwipeMode = () => {
    setSwipeMode(true);
    setCurrentCommentIndex(0); // Reset to the first comment
  };

  const stopSwipeMode = () => {
    setSwipeMode(false);
    setCurrentCommentIndex(0); // Reset index after swipe mode
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

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

          {!swipeMode && (
            <button
              onClick={startSwipeMode}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Start Swipe Mode
            </button>
          )}

          {swipeMode && currentCommentIndex < comments.length && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Swipe Mode: {currentCommentIndex + 1}/{comments.length}
              </h2>

              {/* Guard against undefined comments */}
              {comments[currentCommentIndex] && (
                <div className="p-5 border border-gray-300 bg-gray-100 rounded-lg shadow-lg">
                  <div className="flex gap-4 align-center">
                    <p className="text-lg font-semibold">{comments[currentCommentIndex].author}</p>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        comments[currentCommentIndex].category === "spam"
                          ? "bg-red-500 text-white"
                          : comments[currentCommentIndex].category === "toxic"
                          ? "bg-yellow-500 text-white"
                          : comments[currentCommentIndex].category === "constructive"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {comments[currentCommentIndex].category || "Not Categorized"}
                    </span>
                  </div>
                  <p className="text-gray-700 text-base mt-2">
                    {comments[currentCommentIndex].content}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-gray-600">
                  Use <strong>A</strong> to Approve, <strong>D</strong> to Reject, or <strong>F</strong> to Forward.
                </p>
                <button
                  onClick={stopSwipeMode}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Stop Swipe Mode
                </button>
              </div>
            </div>
          )}

          {/* Status Indicator */}
          {actionStatus && (
            <div
              className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white text-sm font-semibold ${
                actionStatus === "approved"
                  ? "bg-green-500"
                  : actionStatus === "rejected"
                  ? "bg-red-500"
                  : actionStatus === "forwarded"
                  ? "bg-yellow-500"
                  : "bg-gray-500"
              }`}
            >
              Comment {actionStatus.charAt(0).toUpperCase() + actionStatus.slice(1)}!
            </div>
          )}

          {swipeMode && currentCommentIndex >= comments.length && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">No more comments at the moment!</h2>
              <p className="text-gray-500">All comments have been processed.</p>
              <button
                onClick={stopSwipeMode}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Exit Swipe Mode
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
