"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./globals.css";

// 환경 변수로 API 키 가져오기
const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

// Unsplash 이미지 데이터 타입 정의
interface UnsplashImage {
  urls: {
    regular: string;
  };
}

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 이미지를 불러오는 함수
  const fetchImages = (count: number) => {
    if (!ACCESS_KEY) {
      console.error("API 키가 설정되지 않았습니다.");
      return;
    }

    setLoading(true);

    fetch(
      `https://api.unsplash.com/photos/random?count=${count}&client_id=${ACCESS_KEY}`
    )
      .then((res) => res.json())
      .then((data: UnsplashImage[]) => {
        setImages((prevImages) => [
          ...prevImages,
          ...data.map((img) => img.urls.regular), // img의 타입이 UnsplashImage로 지정되어 있음
        ]);
      })
      .catch((err) => console.error("이미지 로드 오류:", err))
      .finally(() => setLoading(false));
  };

  // 처음에 이미지를 30개 로드
  useEffect(() => {
    fetchImages(30);
  }, []);

  // 랜덤 클래스와 IntersectionObserver 초기화
  useEffect(() => {
    const items = document.querySelectorAll(".grid__wrapper > div");
    const classes = ["wide", "big", "tall"];

    // 랜덤 클래스 부여
    items.forEach((item) => {
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      item.classList.add(randomClass);
    });

    // IntersectionObserver 설정
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [images]);

  return (
    <>
      <h1 className="title">Gallery</h1>
      <main className="grid__wrapper">
        {images.map((src, index) => (
          <div key={index}>
            <Image src={src} alt="Gallery Image" width={300} height={200} />
          </div>
        ))}
      </main>

      <div className="load-more-container">
        <button
          className="load-more-button"
          onClick={() => fetchImages(10)}
          disabled={loading}
        >
          {loading ? "로딩중..." : "더불러오기"}
        </button>
      </div>
    </>
  );
}
