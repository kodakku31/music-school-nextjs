'use client';

import { useEffect, useState, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mypage.module.css';

// ニュースのタイプ定義
type News = {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  category: 'event' | 'announcement' | 'update';
};

// 動画投稿のタイプ定義
type VideoPost = {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  userName: string;
  userAvatar: string;
  datePosted: string;
  likes: number;
  commentsCount: number;
  liked: boolean;
};

// コメントのタイプ定義
type Comment = {
  id: number;
  content: string;
  userName: string;
  userAvatar: string;
  datePosted: string;
};

export default function MyPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'videos' | 'profile'>('news');
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<News[]>([]);
  const [videoPosts, setVideoPosts] = useState<VideoPost[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    instrument: '',
    level: 'beginner',
    avatarUrl: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // 直接クライアントを作成して最新の認証状態を取得
        const supabaseClient = createClientComponentClient();
        const { data, error } = await supabaseClient.auth.getSession();

        if (error) {
          console.error('[マイページ] セッション取得エラー:', error);
          return redirect('/');
        }

        if (!data.session) {
          console.log('[マイページ] 未ログインユーザー');
          return redirect('/');
        }

        setUser(data.session.user);
        
        // サンプルデータのロード
        loadSampleData();
      } catch (error) {
        console.error('[マイページ] 認証チェックエラー:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // サンプルデータをロード（実際の実装ではSupabaseから取得）
  const loadSampleData = () => {
    // サンプルニュースデータ
    setNews([
      {
        id: 1,
        title: '春の発表会のお知らせ',
        content: '2025年4月15日に春の発表会を開催します。参加希望の方は4月1日までにお申し込みください。会場は市民ホールです。',
        date: '2025年3月20日',
        imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600',
        category: 'event'
      },
      {
        id: 2,
        title: '新しいピアノ講師が加わりました',
        content: 'ジュリアード音楽院出身の山田花子先生が新しく講師陣に加わりました。クラシックからジャズまで幅広いジャンルに対応しています。',
        date: '2025年3月15日',
        imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=600',
        category: 'announcement'
      },
      {
        id: 3,
        title: 'オンラインレッスン料金改定のお知らせ',
        content: '4月より、オンラインレッスンの料金体系を改定いたします。詳細は料金ページをご確認ください。',
        date: '2025年3月10日',
        category: 'update'
      }
    ]);
    
    // サンプル動画投稿データ
    setVideoPosts([
      {
        id: 1,
        title: 'ショパン ノクターン Op.9 No.2 演奏',
        videoUrl: 'https://www.youtube.com/embed/9E6b3swbnWg',
        thumbnailUrl: 'https://img.youtube.com/vi/9E6b3swbnWg/hqdefault.jpg',
        description: '3ヶ月の練習の成果です。アドバイスをいただけると嬉しいです。',
        userName: '田中音楽家',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100',
        datePosted: '2025年3月18日',
        likes: 24,
        commentsCount: 5,
        liked: false
      },
      {
        id: 2,
        title: 'ベートーベン 月光ソナタ 第1楽章',
        videoUrl: 'https://www.youtube.com/embed/4Tr0otuiQuU',
        thumbnailUrl: 'https://img.youtube.com/vi/4Tr0otuiQuU/hqdefault.jpg',
        description: '初めて月光を完奏できました！テンポが安定しなくて苦労しています。',
        userName: '佐藤ピアニスト',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
        datePosted: '2025年3月15日',
        likes: 18,
        commentsCount: 3,
        liked: true
      },
      {
        id: 3,
        title: 'ジブリメドレー ピアノアレンジ',
        videoUrl: 'https://www.youtube.com/embed/yuhkKSqt-3g',
        thumbnailUrl: 'https://img.youtube.com/vi/yuhkKSqt-3g/hqdefault.jpg',
        description: 'ジブリの名曲をメドレーにしてみました。耳コピなので間違いがあるかもしれません。',
        userName: '鈴木メロディー',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
        datePosted: '2025年3月10日',
        likes: 42,
        commentsCount: 7,
        liked: false
      }
    ]);
    
    // プロフィールデータの初期化
    setProfileData({
      name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
      bio: '音楽が大好きです。特にピアノを練習中です。',
      instrument: 'ピアノ',
      level: 'intermediate',
      avatarUrl: user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=200',
    });
  };
  
  // 動画選択時の処理
  const handleVideoSelect = (video: VideoPost) => {
    setSelectedVideo(video);
    // サンプルコメントデータ
    setComments([
      {
        id: 1,
        content: '素晴らしい演奏ですね！特に後半の表現力が素敵です。',
        userName: '音楽教師',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
        datePosted: '2025年3月19日'
      },
      {
        id: 2,
        content: '左手のアルペジオがとても綺麗です。私も参考にさせてください。',
        userName: 'クラシック好き',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100',
        datePosted: '2025年3月19日'
      },
      {
        id: 3,
        content: 'テンポの変化が自然で心地よいです。次回の投稿も楽しみにしています！',
        userName: 'ピアノ講師',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
        datePosted: '2025年3月18日'
      }
    ]);
  };
  
  // コメント投稿処理
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      content: newComment,
      userName: profileData.name,
      userAvatar: profileData.avatarUrl,
      datePosted: new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };
  
  // いいね処理
  const handleLike = (videoId: number) => {
    setVideoPosts(videoPosts.map(video => {
      if (video.id === videoId) {
        const newLiked = !video.liked;
        return {
          ...video,
          liked: newLiked,
          likes: newLiked ? video.likes + 1 : video.likes - 1
        };
      }
      return video;
    }));
    
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(prev => {
        if (!prev) return null;
        const newLiked = !prev.liked;
        return {
          ...prev,
          liked: newLiked,
          likes: newLiked ? prev.likes + 1 : prev.likes - 1
        };
      });
    }
  };
  
  // プロフィール更新処理
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('プロフィール更新:', profileData);
    // 実際の実装ではSupabaseにデータを保存
    setEditingProfile(false);
  };
  
  // アバター画像選択処理
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 実際の実装ではSupabaseのStorageにアップロード
      // ここではFileReaderでプレビュー
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatarUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      setLoading(true);
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('[ログアウト] エラー:', error);
        return;
      }
      
      console.log('[ログアウト] 成功');
      router.push('/');
    } catch (error) {
      console.error('[ログアウト] 例外:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${profileData.avatarUrl})` }}></div>
          <div>
            <h1>ようこそ、{profileData.name}さん</h1>
            <p>{profileData.instrument} / {profileData.level === 'beginner' ? '初級' : profileData.level === 'intermediate' ? '中級' : '上級'}</p>
          </div>
        </div>
        <button 
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt"></i> ログアウト
        </button>
      </div>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'news' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <i className="fas fa-newspaper"></i> お知らせ
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'videos' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <i className="fas fa-video"></i> みんなの演奏
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i> プロフィール
        </button>
      </div>
      
      <div className={styles.tabContent}>
        {/* ニュースタブ */}
        {activeTab === 'news' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>最新のお知らせ</h2>
            <div className={styles.newsList}>
              {news.map(item => (
                <motion.div
                  key={item.id}
                  className={styles.newsCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: item.id * 0.1 }}
                >
                  {item.imageUrl && (
                    <div className={styles.newsImage}>
                      <img src={item.imageUrl} alt={item.title} />
                      <span className={`${styles.newsCategory} ${styles[item.category]}`}>
                        {item.category === 'event' ? 'イベント' : 
                         item.category === 'announcement' ? 'お知らせ' : '更新情報'}
                      </span>
                    </div>
                  )}
                  <div className={styles.newsContent}>
                    <div className={styles.newsHeader}>
                      <h3>{item.title}</h3>
                      <span className={styles.newsDate}>{item.date}</span>
                    </div>
                    <p>{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* 動画共有タブ */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>
              みんなのピアノ演奏
              <button className={styles.primaryButton}>
                <i className="fas fa-plus"></i> 新しい演奏を投稿
              </button>
            </h2>
            
            {selectedVideo ? (
              <div className={styles.videoDetailView}>
                <button 
                  className={styles.backButton}
                  onClick={() => setSelectedVideo(null)}
                >
                  <i className="fas fa-arrow-left"></i> 一覧に戻る
                </button>
                <div className={styles.videoContainer}>
                  <iframe
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.videoPlayer}
                  ></iframe>
                </div>
                <div className={styles.videoInfo}>
                  <h3>{selectedVideo.title}</h3>
                  <div className={styles.videoMeta}>
                    <div className={styles.videoUser}>
                      <img src={selectedVideo.userAvatar} alt={selectedVideo.userName} className={styles.userAvatar} />
                      <span>{selectedVideo.userName}</span>
                    </div>
                    <span className={styles.videoDate}>{selectedVideo.datePosted}</span>
                  </div>
                  <p className={styles.videoDescription}>{selectedVideo.description}</p>
                  <div className={styles.videoActions}>
                    <button 
                      className={`${styles.likeButton} ${selectedVideo.liked ? styles.liked : ''}`}
                      onClick={() => handleLike(selectedVideo.id)}
                    >
                      <i className={`${selectedVideo.liked ? 'fas' : 'far'} fa-heart`}></i>
                      {selectedVideo.likes}
                    </button>
                    <span className={styles.commentCount}>
                      <i className="far fa-comment"></i> {comments.length} コメント
                    </span>
                  </div>
                </div>
                
                <div className={styles.commentsSection}>
                  <h4>コメント</h4>
                  <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
                    <div className={styles.commentInput}>
                      <img src={profileData.avatarUrl} alt="あなた" className={styles.userAvatar} />
                      <textarea
                        placeholder="演奏へのコメントを書く..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className={styles.primaryButton}>コメントする</button>
                  </form>
                  
                  <div className={styles.commentsList}>
                    {comments.map(comment => (
                      <div key={comment.id} className={styles.commentItem}>
                        <img src={comment.userAvatar} alt={comment.userName} className={styles.userAvatar} />
                        <div className={styles.commentContent}>
                          <div className={styles.commentHeader}>
                            <span className={styles.commentUser}>{comment.userName}</span>
                            <span className={styles.commentDate}>{comment.datePosted}</span>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.videoGrid}>
                {videoPosts.map(video => (
                  <motion.div
                    key={video.id}
                    className={styles.videoCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: video.id * 0.1 }}
                  >
                    <div 
                      className={styles.videoThumbnail}
                      onClick={() => handleVideoSelect(video)}
                    >
                      <img src={video.thumbnailUrl} alt={video.title} />
                      <div className={styles.playButton}>
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                    <div className={styles.videoCardInfo}>
                      <h3 onClick={() => handleVideoSelect(video)}>{video.title}</h3>
                      <div className={styles.videoCardMeta}>
                        <div className={styles.videoUser}>
                          <img src={video.userAvatar} alt={video.userName} className={styles.userAvatar} />
                          <span>{video.userName}</span>
                        </div>
                        <span className={styles.videoDate}>{video.datePosted}</span>
                      </div>
                      <div className={styles.videoCardActions}>
                        <button 
                          className={`${styles.likeButton} ${video.liked ? styles.liked : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(video.id);
                          }}
                        >
                          <i className={`${video.liked ? 'fas' : 'far'} fa-heart`}></i>
                          {video.likes}
                        </button>
                        <span className={styles.commentCount}>
                          <i className="far fa-comment"></i> {video.commentsCount}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
        
        {/* プロフィールタブ */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.profileSection}
          >
            <h2 className={styles.sectionTitle}>プロフィール設定</h2>
            
            {editingProfile ? (
              <form onSubmit={handleProfileUpdate} className={styles.profileForm}>
                <div className={styles.avatarUpload}>
                  <div 
                    className={styles.avatarPreview} 
                    style={{ backgroundImage: `url(${profileData.avatarUrl})` }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className={styles.avatarOverlay}>
                      <i className="fas fa-camera"></i>
                    </div>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className={styles.fileInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">表示名</label>
                  <input
                    type="text"
                    id="name"
                    value={profileData.name}
                    onChange={e => setProfileData({...profileData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bio">自己紹介</label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={e => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                  ></textarea>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="instrument">演奏楽器</label>
                    <select
                      id="instrument"
                      value={profileData.instrument}
                      onChange={e => setProfileData({...profileData, instrument: e.target.value})}
                    >
                      <option value="ピアノ">ピアノ</option>
                      <option value="ギター">ギター</option>
                      <option value="バイオリン">バイオリン</option>
                      <option value="ドラム">ドラム</option>
                      <option value="フルート">フルート</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="level">習熟レベル</label>
                    <select
                      id="level"
                      value={profileData.level}
                      onChange={e => setProfileData({...profileData, level: e.target.value as any})}
                    >
                      <option value="beginner">初級</option>
                      <option value="intermediate">中級</option>
                      <option value="advanced">上級</option>
                    </select>
                  </div>
                </div>
                
                <div className={styles.formActions}>
                  <button type="submit" className={styles.primaryButton}>保存する</button>
                  <button 
                    type="button" 
                    className={styles.secondaryButton}
                    onClick={() => setEditingProfile(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.profileDisplay}>
                <div className={styles.profileHeader}>
                  <div 
                    className={styles.profileAvatar} 
                    style={{ backgroundImage: `url(${profileData.avatarUrl})` }}
                  ></div>
                  <div className={styles.profileInfo}>
                    <h3>{profileData.name}</h3>
                    <p className={styles.profileMeta}>
                      {profileData.instrument} / 
                      {profileData.level === 'beginner' ? '初級' : 
                       profileData.level === 'intermediate' ? '中級' : '上級'}
                    </p>
                    <button 
                      className={styles.editButton}
                      onClick={() => setEditingProfile(true)}
                    >
                      <i className="fas fa-edit"></i> 編集する
                    </button>
                  </div>
                </div>
                
                <div className={styles.profileBio}>
                  <h4>自己紹介</h4>
                  <p>{profileData.bio || '自己紹介はまだ設定されていません。'}</p>
                </div>
                
                <div className={styles.accountInfo}>
                  <h4>アカウント情報</h4>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>メールアドレス</span>
                    <span className={styles.infoValue}>{user.email}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>登録日</span>
                    <span className={styles.infoValue}>
                      {new Date(user.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <button className={styles.secondaryButton}>
                    <i className="fas fa-key"></i> パスワード変更
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
