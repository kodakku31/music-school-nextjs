'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  navLinks: Array<{ href: string; label: string }>;
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
  onLogin: () => void;
};

export default function MobileMenu({ 
  navLinks, 
  isLoggedIn, 
  userName, 
  onLogout, 
  onLogin 
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // メニュー外のクリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // スクロールを無効化
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // スクロールを再有効化
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // メニューを開閉するトグル関数
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // メニュー項目クリック時に閉じる
  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mobileMenuContainer}>
      {/* ハンバーガーアイコン（2本線） */}
      <button 
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="メニュー"
      >
        <span></span>
        <span></span>
      </button>

      {/* メニューオーバーレイ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.menuOverlay}
          >
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.menuContainer}
            >
              {/* 閉じるボタン */}
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="閉じる"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              
              {/* ロゴ */}
              <div className={styles.mobileLogoContainer}>
                <div className="logo-text">Musica</div>
              </div>

              {/* ナビゲーション */}
              <nav className={styles.mobileNav}>
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={pathname === link.href || (link.href === '/#story' && pathname === '/') ? styles.active : ''}
                        onClick={handleMenuItemClick}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* ログインボタン/ユーザーメニュー */}
              <div className={styles.mobileAuthContainer}>
                {isLoggedIn ? (
                  <div className={styles.userMenu}>
                    <span className={styles.userName}>{userName}</span>
                    <button onClick={() => { onLogout(); handleMenuItemClick(); }} className={styles.logoutButton}>
                      <span>ログアウト</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { onLogin(); handleMenuItemClick(); }} 
                    className={styles.loginButton}
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
                <Link href="https://www.instagram.com/music_school/" className={styles.socialLink} onClick={handleMenuItemClick}>
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
