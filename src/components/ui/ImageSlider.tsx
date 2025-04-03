'use client';

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
    blurDataURL?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showDots?: boolean;
}

const ImageSliderComponent = ({ 
  images, 
  autoPlay = true, 
  interval = 5000,
  showControls = true,
  showDots = true
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // メモ化したナビゲーション関数
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 自動スライド
  useEffect(() => {
    if (autoPlay && !isHovering) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlay, interval, goToNext, isHovering]);

  // スライドが変わったときにスクロール
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // キーボードナビゲーション
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNext, goToPrev]);

  return (
    <div 
      className="image-slider-container"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showControls && (
        <div className="slider-controls">
          <button 
            className="slider-control prev" 
            onClick={goToPrev}
            aria-label="前の画像"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="slider-control next" 
            onClick={goToNext}
            aria-label="次の画像"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
      
      <div 
        className="image-slider-track" 
        ref={sliderRef}
      >
        {images.map((image, index) => (
          <div 
            key={index} 
            className="slider-slide"
            aria-hidden={index !== currentIndex}
          >
            <div className="slider-image">
              <Image 
                src={image.src} 
                alt={image.alt} 
                width={800}
                height={450}
                style={{ objectFit: 'cover' }}
                loading={index === 0 ? 'eager' : 'lazy'}
                quality={75}
                sizes="(max-width: 768px) 100vw, 800px"
                placeholder="blur"
                blurDataURL={image.blurDataURL || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMmYyZjIiLz48L3N2Zz4='}
              />
            </div>
            {image.caption && (
              <p className="slider-caption">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
      
      {showDots && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <button 
              key={index} 
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`画像 ${index + 1} に移動`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// メモ化してコンポーネントの不要な再レンダリングを防止
const ImageSlider = memo(ImageSliderComponent);

export default ImageSlider;
