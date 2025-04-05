import React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // 表示するページ番号の範囲を計算
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // 表示する最大ページ数
    
    if (totalPages <= maxPagesToShow) {
      // 全ページ数が表示最大数以下の場合、すべてのページを表示
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 現在のページの前後に表示するページ数
      const sidePages = Math.floor((maxPagesToShow - 1) / 2);
      
      let startPage = Math.max(1, currentPage - sidePages);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // 終了ページが最大ページ数を超えないように調整
      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      {/* 前のページボタン */}
      <button 
        className={`${styles.pageButton} ${styles.navButton}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページへ"
      >
        <IoChevronBackOutline />
      </button>
      
      {/* ページ番号 */}
      {getPageNumbers().map(number => (
        <button
          key={number}
          className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
          onClick={() => onPageChange(number)}
          aria-label={`${number}ページ目へ`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}
      
      {/* 次のページボタン */}
      <button 
        className={`${styles.pageButton} ${styles.navButton}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページへ"
      >
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default Pagination;
