"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [gameHours, setGameHours] = useState<number | "">("");
  const moneyEarned = (typeof gameHours === "number" ? gameHours : 0) * 9860;

  // 살 수 있는 물건 리스트
  const items = [
    { price: 5000, name: "🍔 햄버거" },
    { price: 15000, name: "🍣 초밥 세트" },
    { price: 50000, name: "🎧 무선 이어폰" },
    { price: 100000, name: "👞 명품 신발" },
    { price: 500000, name: "📱 최신 스마트폰" },
    { price: 2300000, name: "💻 고성능 맥북 노트북" },
  ];

  // 구매 가능 물품 찾기
  const affordableItem =
    items.filter((item) => moneyEarned >= item.price).pop()?.name ||
    "🤔 아직 아무것도 못 사요...";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        🎮 이 시간에 게임 안하고 일 했으면 살 수 있는 것들 💰
      </h1>

      <div className="flex items-center gap-3">
        <label className="text-lg">오늘 게임 시간:</label>
        <input
          type="number"
          value={gameHours}
          onChange={(e) => {
            const value = e.target.value;
            setGameHours(value === "" ? "" : Number(value));
          }}
          onFocus={(e) => e.target.value === "0" && setGameHours("")}
          className="w-20 p-2 rounded-md text-black"
          min="0"
        />
        <span className="text-lg">시간</span>
      </div>

      <motion.div
        className="mt-4 text-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        💰 번 돈:{" "}
        <span className="text-green-400 font-bold">
          {moneyEarned.toLocaleString()} 원
        </span>
      </motion.div>

      <motion.div
        className="mt-6 text-lg font-bold"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5 }}
      >
        {moneyEarned > 0
          ? `✨ ${affordableItem} 살 수 있었어요!`
          : "🤔 게임을 안 하면 아무것도 못 사요..."}
      </motion.div>
    </div>
  );
}
