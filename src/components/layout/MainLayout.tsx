'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="wrapper">
      <Header />
      
      {/* 右下パネル（メインコンテンツエリア） */}
      <motion.div 
        className="main-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
        <Footer />
      </motion.div>
    </div>
  );
}
