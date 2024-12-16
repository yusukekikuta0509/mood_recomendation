// src/utils/googleBooks.js

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

// 気分に応じた本を取得
export const getBooksByMood = async (mood) => {
  const moodKeywords = {
    smile: "funny books",
    sad: "sad stories",
    sleep: "relaxing books",
    love: "romantic novels",
    celebration: "party books",
    tears: "emotional stories",
    thinking: "philosophical books",
    party: "entertainment",
    upside_down: "quirky books",
    angry: "anger management",
  };

  const query = moodKeywords[mood] || "bestseller";
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();
  return data.items || [];
};

// 本を共有する
export const shareBook = async (bookData) => {
  const response = await fetch("http://localhost/backend/share_book.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  });

  const result = await response.json();
  return result;
};

// 履歴を取得する
export const fetchHistory = async () => {
  const response = await fetch("http://localhost/backend/get_history.php");
  const result = await response.json();
  return result;
};
