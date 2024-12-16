import React, { useEffect, useState } from "react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost/backend/get_history.php");
        const result = await response.json();

        if (result.success) {
          setHistory(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("履歴の取得に失敗しました。");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">共有履歴</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((book, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-lg">
            <img
              src={book.thumbnail || "https://via.placeholder.com/128x192"}
              alt={book.title}
              className="w-full h-auto rounded"
            />
            <h2 className="text-lg font-bold mt-2">{book.title}</h2>
            <p className="text-sm text-gray-700">{book.authors}</p>
            <p className="text-sm text-gray-500">共有先: {book.shared_with || "匿名"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
