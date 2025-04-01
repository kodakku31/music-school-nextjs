'use client';

import { useState, useEffect, memo } from 'react';
import Image from 'next/image';

type LazyImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
};

/**
 * 最適化された画像コンポーネント
 * - 遅延読み込み
 * - ぼかしプレースホルダー
 * - メモ化による再レンダリング防止
 */
function LazyImageComponent({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(!priority);

  // 画像読み込み完了時の処理
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width || 1200}
        height={height || 800}
        onLoad={handleImageLoad}
        priority={priority}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ objectFit }}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

// メモ化してコンポーネントの不要な再レンダリングを防止
export const LazyImage = memo(LazyImageComponent);
