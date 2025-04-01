'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgressの設定
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
});

// ページトランジションのバリエーション
const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 1,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // NProgressのスタイル設定とページ遷移時のローディングインジケーター
  useEffect(() => {
    // スタイル要素を作成
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #nprogress .bar {
        background: #6a64f1 !important;
      }
      #nprogress .peg {
        box-shadow: 0 0 10px #6a64f1, 0 0 5px #6a64f1 !important;
      }
    `;
    document.head.appendChild(styleElement);

    const handleStart = () => {
      NProgress.start();
    };

    const handleComplete = () => {
      NProgress.done();
    };

    // イベントリスナーの設定
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);

    return () => {
      document.head.removeChild(styleElement);
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
      NProgress.done();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        className="w-full"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
