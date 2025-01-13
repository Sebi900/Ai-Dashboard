// components/Sidebar.js
"use client";

const Sidebar = ({ setFilter }) => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Filter Comments</h2>
      <button
        onClick={() => setFilter(null)}
        className="w-full text-left px-4 py-2 mb-4 bg-gray-700 hover:bg-gray-600 rounded-md"
      >
        All Comments
      </button>
      <button
        onClick={() => setFilter("spam")}
        className="w-full text-left px-4 py-2 mb-4 bg-red-500 hover:bg-red-400 rounded-md"
      >
        Spam Comments
      </button>
      <button
        onClick={() => setFilter("toxic")}
        className="w-full text-left px-4 py-2 mb-4 bg-yellow-500 hover:bg-yellow-400 rounded-md"
      >
        Toxic Comments
      </button>
      <button
        onClick={() => setFilter("constructive")}
        className="w-full text-left px-4 py-2 bg-green-500 hover:bg-green-400 rounded-md"
      >
        Constructive Comments
      </button>
    </div>
  );
};

export default Sidebar;



