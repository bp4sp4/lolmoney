"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./globals.css";

const ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

interface UnsplashImage {
  urls: {
    regular: string;
  };
}

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

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
          ...data.map((img) => img.urls.regular),
        ]);
      })
      .catch((err) => console.error("이미지 로드 오류:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages(30);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".grid__wrapper > div");
    const classes = ["wide", "big", "tall"];

    items.forEach((item) => {
      const randomClass = classes[Math.floor(Math.random() * classes.length)];
      item.classList.add(randomClass);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [images]);

  const handleDownload = (src: string) => {
    fetch(src, { mode: "cors" })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => console.error("다운로드 오류:", err));
  };

  return (
    <>
      <h1 className="title">Gallery</h1>
      <main className="grid__wrapper">
        {images.map((src, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredImage(index)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <Image
              src={src}
              alt="Gallery Image"
              width={300}
              height={200}
              crossOrigin="anonymous"
            />
            {hoveredImage === index && (
              <button
                className="download-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(src);
                }}
              >
                Download
              </button>
            )}
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
