import React, { useEffect, useState } from "react";
import styles from './imageSlider.module.css';
import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  data: ImageData[];
  onSlideChange: (index: number) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ data, onSlideChange }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    const newSlide = slide === data.length - 1 ? 0 : slide + 1;
    setSlide(newSlide);
    onSlideChange(newSlide);
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(refreshInterval);
  }, [slide]);

  return (
    <div className={styles.carousel}>
      {data.map((item, idx) => {
        return ( 
        <Image
          src={item.src}
          alt={item.alt}
          key={idx}
          height={800}
          width={715}
          className={`${slide === idx ? `${styles.slide}` : `${styles.slide} ${styles.slideHidden}`}`}
        />  
        );
      })}
      <span className={styles.indicators}>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={`${slide === idx ? `${styles.indicator} ${styles.indicatorActive}` : `${styles.indicator} ${styles.indicatorInactive}`}`}
              onClick={() => {
                setSlide(idx)
                onSlideChange(idx)
                }}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default ImageSlider;
