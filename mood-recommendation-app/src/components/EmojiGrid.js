// src/components/EmojiGrid.js
import React from "react";
import { motion } from "framer-motion";

const EmojiGrid = ({ onSelect }) => {
  // 絵文字と文字列の対応表
  const emojis = [
    { emoji: "😊", value: "smile" },
    { emoji: "😢", value: "sad" },
    { emoji: "😴", value: "sleep" },
    { emoji: "😍", value: "love" },
    { emoji: "🎉", value: "celebration" },
    { emoji: "😭", value: "tears" },
    { emoji: "🤔", value: "thinking" },
    { emoji: "🥳", value: "party" },
    { emoji: "🙃", value: "upside_down" },
    { emoji: "😡", value: "angry" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {emojis.map((item, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(item.value)} // 絵文字ではなく対応する文字列を送る
          whileHover={{
            scale: 1.2, // 拡大
            rotate: [0, 10, -10, 0], // 反縁を描くように回転
            transition: {
              duration: 0.8, // アニメーションの持続時間
              ease: "easeInOut", // 滑らかな動き
              repeat: Infinity, // 無限ループ
              repeatType: "loop", // ループモード
            },
          }}
          className="text-4xl p-4"
        >
          {item.emoji}
        </motion.button>
      ))}
    </div>
  );
};

export default EmojiGrid;
