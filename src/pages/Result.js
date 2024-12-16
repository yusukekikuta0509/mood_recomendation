import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBooksByMood } from "../utils/googleBooks";
import { motion } from "framer-motion";

const Result = () => {
  const location = useLocation();
  const { mood } = location.state || {};
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const bookResults = await getBooksByMood(mood);
        setBooks(bookResults);
      } catch (err) {
        setError("本の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [mood]);

  const backgroundAnimation = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center font-['Zen_Maru_Gothic']"
      style={{
        background: "linear-gradient(120deg, #293241, #3D5A80, #EE6C4D)",
        backgroundSize: "300% 300%",
      }}
      animate={backgroundAnimation.animate}
    >
      <h1 className="text-3xl md:text-4xl font-bold mt-10 text-center text-[#E0FBFC]">
        あなたの気分にぴったりの本
      </h1>
      {loading ? (
        <div className="flex items-center justify-center h-64 relative">
          <motion.div
            className="absolute w-16 h-16 bg-[#EE6C4D] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 360],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          ></motion.div>
          <motion.div
            className="absolute w-12 h-12 bg-[#3D5A80] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, -360],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          ></motion.div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: (i) => ({
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                  },
                }),
              }}
              className="w-32 h-56 flex flex-col items-center bg-[#3D5A80] rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden p-2"
            >
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/80x120?text=No+Image"
                }
                alt={book.volumeInfo.title}
                className="w-28 h-36 object-cover rounded mt-1"
              />
              <div className="bg-[#EE6C4D] text-white text-[10px] font-semibold mt-3 text-center px-2 py-1 rounded-full truncate w-[90%]">
                {book.volumeInfo.title}
              </div>
              <p className="text-[9px] text-[#E0FBFC] text-center mt-2 px-2">
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Result;
