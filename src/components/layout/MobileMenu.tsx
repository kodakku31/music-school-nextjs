'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';

// メニューアニメーションの設定
const menuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 1,
    }
  }
};

// ナビゲーションリンクのタイプ定義
type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  navLinks?: NavLink[];
  isLoggedIn?: boolean;
  userName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
};

export default function MobileMenu({
  navLinks = [],
  isLoggedIn = false,
  userName = '',
  onLogout = () => {},
  onLogin = () => {}
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // メニューの開閉を切り替える
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // メニューを閉じる
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 外部クリックでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // スクロール防止（メニュー表示中）
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // マイページへ移動
  const handleMyPageClick = useCallback(() => {
    closeMenu();
    router.push('/mypage');
  }, [router, closeMenu]);

  return (
    <div className={styles.mobileMenuContainer}>
      {/* ハンバーガーメニューボタン */}
      <button 
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="メニュー"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
      </button>

      {/* メニューオーバーレイ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.menuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* メニューコンテンツ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.menuContainer}
            ref={menuRef}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* 閉じるボタン */}
            <button 
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="メニューを閉じる"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* ロゴ */}
            <div className={styles.mobileLogoContainer}>
              <div className="logo-text">Musica</div>
            </div>

            {/* メニューコンテンツ */}
            <div className={styles.menuContent}>
              {/* ナビゲーションリンク */}
              <nav className={styles.mobileNav}>
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href}
                        className={pathname === link.href || (link.href === '/#story' && pathname === '/') ? styles.active : ''}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* ユーザーメニュー */}
              <div className={styles.userMenu}>
                {isLoggedIn ? (
                  <>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>
                        {userName || 'ユーザー'}
                        <span className={styles.userStatus}>●</span>
                      </span>
                    </div>
                    <div className={styles.userActions}>
                      <button 
                        className={styles.mypageButton}
                        onClick={handleMyPageClick}
                      >
                        <span>マイページ</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </button>
                      <button 
                        className={styles.logoutButton}
                        onClick={onLogout}
                      >
                        <span>ログアウト</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </>
                ) : (
                  <button 
                    className={styles.loginButton}
                    onClick={onLogin}
                  >
                    <span>ログイン</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                  </button>
                )}
              </div>

              {/* SNSリンク */}
              <div className={styles.mobileSocialLinks}>
                <Link 
                  href="https://www.instagram.com/music_school/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  onClick={closeMenu}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
