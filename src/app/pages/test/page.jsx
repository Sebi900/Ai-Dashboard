
// "use client"

// import { useEffect, useState } from 'react';
// import { query } from '../../lib/bart';  // Assuming `query` is imported correctly

// const TestPage = () => {
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const processComments = async () => {
//       setLoading(true); // Set loading state

//       const comment = "Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!"; // Example comment
//       const data = {
//         inputs: comment,
//         parameters: {
//           candidate_labels: ["spam", "toxic", "constructive"]  // Define your categories here
//         }
//       };

//       try {
//         const response = await query(data);
//         console.log("Categorization Result:", response);

//         // Extract the highest scoring label from response
//         const highestScoreLabel = response.labels[0]; // Assuming the highest score corresponds to the best category
//         setCategory(highestScoreLabel);  // Set the category in state
//       } catch (error) {
//         console.error("Error:", error.message);
//         setError(error.message);  // Handle any errors
//       }

//       setLoading(false);  // Set loading to false after completion
//     };

//     processComments();
//   }, []); // Empty dependency array means it runs once when the component mounts

//   return (
//     <div>
//       <h1>Test Page</h1>
//       <p>Check the console for categorization results.</p>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {category && <p>Category: {category}</p>}
//     </div>
//   );
// };

// export default TestPage;


// "use client"

// import { useEffect, useState } from 'react';
// import { query } from '../../lib/bart'; // Assuming `query` is imported correctly

// const TestPage = () => {
//   const [comments, setComments] = useState([]);
//   const [category, setCategory] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all comments when the component mounts
//   useEffect(() => {
//     const fetchComments = async () => {
//       setLoading(true);
//       try {
//         // Fetch the list of all comments
//         const response = await fetch("http://localhost:3000/api/comments/");
//         const data = await response.json();

//         if (data && Array.isArray(data)) {
//           setComments(data);
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
//   }, []); // Empty array means it runs only once when component mounts

//   const analyzeComment = async (commentId) => {
//     setLoading(true);

//     try {
//       // Fetch the specific comment by ID
//       const response = await fetch(`http://localhost:3000/api/comments/${commentId}`);
//       const comment = await response.json();
      
//       if (!comment || !comment.content) {
//         throw new Error("Comment content is missing.");
//       }

//       const data = {
//         inputs: comment.content,
//         parameters: {
//           candidate_labels: ["spam", "toxic", "constructive"]
//         }
//       };

//       // Perform analysis on the comment content
//       const analysisResult = await query(data);
//       console.log("Categorization Result:", analysisResult);

//       // Assuming highest score is the correct label
//       const highestScoreLabel = analysisResult.labels[0]; // Assuming the highest label
//       setCategory(highestScoreLabel);
//     } catch (error) {
//       console.error("Error analyzing comment:", error.message);
//       setError("Failed to analyze comment.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Comments List</h1>
//       {loading && <p>Loading comments...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             <p><strong>{comment.author}</strong>: {comment.content}</p>
//             <button onClick={() => analyzeComment(comment.id)}>Analyze</button>
//           </li>
//         ))}
//       </ul>

//       {category && <p>Category: {category}</p>}
//     </div>
//   );
// };

// export default TestPage;


"use client"

import { useEffect, useState } from 'react';
import { query } from '../../lib/bart'; // Assuming `query` is imported correctly

const TestPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        // Fetch the list of all comments
        const response = await fetch("http://localhost:3000/api/comments/");
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setComments(data);
          // Analyze all comments after fetching them
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
  }, []); // Empty array means it runs only once when component mounts

  const analyzeAllComments = async (commentsList) => {
    setLoading(true);

    try {
      // Iterate through all comments and analyze each one
      const updatedComments = await Promise.all(
        commentsList.map(async (comment) => {
          const data = {
            inputs: comment.content,
            parameters: {
              candidate_labels: ["spam", "toxic", "constructive"]
            }
          };

          // Perform analysis on the comment content
          const analysisResult = await query(data);

          // Assuming the highest score label is the correct category
          const highestScoreLabel = analysisResult.labels[0]; // Assuming the highest label
          comment.category = highestScoreLabel; // Save the category to the comment

          return comment; // Return the updated comment
        })
      );

      // Update the state with the updated comments
      setComments(updatedComments);
    } catch (error) {
      console.error("Error analyzing comments:", error.message);
      setError("Failed to analyze comments.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Comments List</h1>
      {loading && <p>Loading comments...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p><strong>{comment.author}</strong>: {comment.content}</p>
            <p><strong>Category:</strong> {comment.category || "Not Categorized Yet"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;


