import React from "react";
import EmojiGrid from "../components/EmojiGrid";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const handleEmojiSelect = (mood) => {
    // moodは絵文字の代わりに文字列（例: "smile"）
    navigate("/result", { state: { mood } });
  };

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
        気分に合わせて本を選ぼう
      </h1>
      <p className="text-lg mt-4 text-center px-6 text-[#E0FBFC]">
        今の気分を選択してください！
      </p>
      <p className="text-sm mt-2 mb-6 text-center px-6 text-[#E0FBFC]">
        本のおすすめが表示されます。
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {/** EmojiGridの背景にカードを使用せず、絵文字のみを表示する */}
        <EmojiGrid onSelect={handleEmojiSelect} className="text-4xl" />
      </div>
    </motion.div>
  );
};

export default Home;
