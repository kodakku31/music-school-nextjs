'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // ユーザー情報の取得
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
      
      // 認証状態の変更を監視
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkUser();
  }, []);
  
  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  
  // 画像スライドショー
  useEffect(() => {
    const slides = document.querySelectorAll('.image-slide');
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      slides[activeSlide].classList.remove('active');
      const nextSlide = (activeSlide + 1) % slides.length;
      slides[nextSlide].classList.add('active');
      setActiveSlide(nextSlide);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);

  // ナビゲーションリンク
  const navLinks = [
    { href: '/#story', label: 'STORY' },
    { href: '/news', label: 'NEWS' },
    { href: '/lesson', label: 'LESSON' },
    { href: '/teacher', label: 'TEACHER' },
    { href: '/access', label: 'ACCESS' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/blog', label: 'BLOG' },
  ];

  return (
    <>
      {/* 左側パネル（画像エリア） */}
      <div className="left-panel">
        <div className="image-container">
          {/* 画像スライド */}
          <div className="image-slide active">
            <img src="/images/music.jpg" alt="音楽教室" />
          </div>
          <div className="image-slide">
            <img src="/images/piano.jpg" alt="ピアノレッスン" />
          </div>
          <div className="image-slide">
            <img src="/images/violin.jpg" alt="バイオリンレッスン" />
          </div>
          <div className="image-slide">
            <img src="/images/vocal.jpg" alt="ボーカルレッスン" />
          </div>
        </div>
      </div>

      {/* 右上パネル（ナビゲーションエリア） */}
      <div className="nav-panel">
        {/* ロゴ */}
        <div className="logo-container">
          <div className="logo-text">音楽教室</div>
        </div>

        {/* ナビゲーション */}
        <nav className="main-nav">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={pathname === link.href || (link.href === '/#story' && pathname === '/') ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ログインボタン */}
        <div className="login-container">
          {!loading && (
            user ? (
              <div className="user-menu">
                <span className="user-name">{user.user_metadata?.name || user.email}</span>
                <button onClick={handleLogout} className="logout-button">ログアウト</button>
              </div>
            ) : (
              <Link href="/auth" className="login-button">ログイン</Link>
            )
          )}
        </div>

        {/* SNSリンク */}
        <div className="social-links">
          <Link href="#" className="social-link">
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
