'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import AuthModal from '../auth/AuthModal';
import MobileMenu from './MobileMenu';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [user, setUser] = useState<Session['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const lastAuthCheckRef = useRef<number>(0);
  const AUTH_CHECK_INTERVAL = 30000; // 30秒間隔で認証チェックを制限

  // デバッグ用：現在のパスを確認
  useEffect(() => {
    console.log('現在のパス:', pathname);
  }, [pathname]);

  // ユーザー情報の取得
  useEffect(() => {
    const checkUser = async () => {
      try {
        // 前回の認証チェックからの経過時間を確認
        const now = Date.now();
        const timeSinceLastCheck = now - lastAuthCheckRef.current;
        
        // セッションストレージからユーザー情報を確認（常に実行）
        let sessionUser = null;
        try {
          const storedSession = sessionStorage.getItem('userSession');
          if (storedSession) {
            const parsedSession = JSON.parse(storedSession);
            // 1時間以内に保存されたセッション情報のみ有効とする
            const isValid = (now - parsedSession.timestamp) < 3600000;
            if (isValid) {
              console.log('[認証] セッションストレージからユーザー情報を復元:', parsedSession.email);
              sessionUser = parsedSession;
              
              // セッションストレージに有効な情報がある場合は、一時的にユーザー状態を設定
              if (!user) {
                setUser({
                  id: parsedSession.id,
                  email: parsedSession.email,
                  user_metadata: {
                    name: parsedSession.email.split('@')[0]
                  }
                } as any);
              }
            } else {
              // 期限切れの場合は削除
              sessionStorage.removeItem('userSession');
            }
          }
        } catch (e) {
          console.error('[認証] セッションストレージ読み込みエラー:', e);
        }
        
        // 前回のチェックから十分な時間が経過していない場合はAPIリクエストをスキップ
        if (timeSinceLastCheck < AUTH_CHECK_INTERVAL && (user || sessionUser)) {
          console.log(`[認証] 前回のチェックから${Math.floor(timeSinceLastCheck/1000)}秒しか経過していないため、APIリクエストをスキップします`);
          setLoading(false);
          return;
        }
        
        // 時間が経過しているか、ユーザー情報がない場合はAPIリクエスト
        lastAuthCheckRef.current = now;
        setLoading(true);

        // 直接クライアントを作成して最新の認証状態を取得
        const supabaseClient = createClientComponentClient();
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
          console.error('[認証] セッション取得エラー:', error);
          setLoading(false);
          return;
        }

        // Supabaseセッションがある場合はそれを優先
        if (data.session?.user) {
          console.log('[認証] Supabaseセッション検出:', data.session.user.email);
          setUser(data.session.user);
          
          // 最新のセッション情報をストレージに保存
          sessionStorage.setItem('userSession', JSON.stringify({
            isLoggedIn: true,
            email: data.session.user.email,
            id: data.session.user.id,
            timestamp: now
          }));
        } 
        // セッションストレージに情報があり、Supabaseセッションがない場合
        else if (sessionUser && !data.session?.user) {
          console.log('[認証] セッションストレージからユーザー情報を使用');
          // セッションストレージの情報を使用してユーザー状態を設定
          // 注: これは表示目的のみで、実際の認証には使用しない
          setUser({
            id: sessionUser.id,
            email: sessionUser.email,
            user_metadata: {
              name: sessionUser.email.split('@')[0]
            }
          } as any);
        } else {
          console.log('[認証] 現在のセッション:', data.session?.user?.email || 'ログインなし');
          setUser(data.session?.user || null);
        }

        // 認証状態の変更を監視
        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
          (event: AuthChangeEvent, session: Session | null) => {
            console.log('[認証] 認証状態変更:', event, session?.user?.email);
            setUser(session?.user || null);

            // 状態変更時にページをリフレッシュ
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
              router.refresh();
            }
          }
        );

        return () => {
          if (authListener?.subscription) {
            authListener.subscription.unsubscribe();
          }
        };
      } catch (error) {
        console.error('[認証] 認証状態チェックエラー:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      setLoading(true);
      const supabaseClient = createClientComponentClient();
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        console.error('[認証] ログアウトエラー:', error);
        return;
      }

      console.log('[認証] ログアウト成功');
      setUser(null);

      // ページをリフレッシュしてから、完全なリロードを行う
      router.refresh();
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('[認証] ログアウトエラー:', error);
    } finally {
      setLoading(false);
    }
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
          {!loading ? (
            user ? (
              <div className="user-menu">
                <span className="user-name">
                  {user.user_metadata?.name || user.email?.split('@')[0] || 'ユーザー'}
                  <span className="user-status">●</span>
                </span>
                <div className="user-actions">
                  <Link href="/mypage" className="mypage-button">
                    <span className="mypage-text">マイページ</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    <span className="logout-text">ログアウト</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)} 
                className="login-button"
              >
                <span>ログイン</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </button>
            )
          ) : (
            <div className="loading-button">読み込み中...</div>
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

      {/* ログインモーダル */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />

      {/* モバイルメニュー */}
      <MobileMenu 
        navLinks={[
          { href: '/', label: 'ホーム' },
          { href: '/#story', label: 'ストーリー' },
          { href: '/lesson', label: 'レッスン' },
          { href: '/teacher', label: '講師紹介' },
          { href: '/access', label: 'アクセス' },
          { href: '/contact', label: 'お問い合わせ' },
          { href: '/blog', label: 'ブログ' },
        ]}
        isLoggedIn={!!user}
        userName={user?.email?.split('@')[0]}
        onLogout={handleLogout}
        onLogin={() => setAuthModalOpen(true)}
      />
    </>
  );
}
