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

// 練習記録のタイプ定義
type PracticeRecord = {
  id: number;
  date: string;
  duration: number; // 分単位
  piece: string;
  notes: string;
  mood: 'good' | 'normal' | 'bad';
  feedback?: string;
  feedbackDate?: string;
  teacherId?: string;
  teacherName?: string;
  studentReply?: string;
  studentReplyDate?: string;
  needsFeedback?: boolean;
};

// 課題のタイプ定義
type Assignment = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed';
  feedback?: string;
  feedbackDate?: string;
  teacherId?: string;
  teacherName?: string;
  studentReply?: string;
  studentReplyDate?: string;
  needsFeedback?: boolean;
};

// 進捗データのタイプ定義
type ProgressData = {
  weeklyPractice: { day: string; minutes: number }[];
  skillLevels: { skill: string; level: number }[];
  completedAssignments: number;
  totalAssignments: number;
};

export default function MyPage() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'news' | 'community' | 'profile' | 'progress'>('profile');
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
  
  // 進捗管理関連の状態
  const [practiceRecords, setPracticeRecords] = useState<PracticeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [newPracticeRecord, setNewPracticeRecord] = useState<Omit<PracticeRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    duration: 30,
    piece: '',
    notes: '',
    mood: 'normal'
  });
  const [activeProgressTab, setActiveProgressTab] = useState<'practice' | 'assignments' | 'stats'>('practice');
  
  // フィードバック関連の状態変数
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'practice' | 'assignment'>('practice');
  const [feedbackItemId, setFeedbackItemId] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
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
    
    // サンプル練習記録データ
    setPracticeRecords([
      {
        id: 1,
        date: '2025-03-25',
        duration: 45,
        piece: 'ショパン ノクターン Op.9 No.2',
        notes: '冒頭の右手の表現に注意して練習。左手のアルペジオが安定してきた。',
        mood: 'good',
        feedback: '右手のメロディーラインがとても美しいです。次回は左手のアルペジオをもう少し柔らかく弾いてみましょう。',
        feedbackDate: '2025-03-26',
        teacherId: 'teacher1',
        teacherName: '山田先生'
      },
      {
        id: 2,
        date: '2025-03-23',
        duration: 30,
        piece: 'ベートーベン 月光ソナタ 第1楽章',
        notes: 'テンポが安定しない。もっとメトロノームを使って練習する必要がある。',
        mood: 'normal'
      },
      {
        id: 3,
        date: '2025-03-20',
        duration: 60,
        piece: 'バッハ インベンション No.1',
        notes: '両手の独立した動きを意識。少しづつ上達している。',
        mood: 'good',
        feedback: 'バッハの対位法がよく理解できています。テンポは一定に保ちながら、各声部の独立性をもっと意識してみてください。',
        feedbackDate: '2025-03-22',
        teacherId: 'teacher2',
        teacherName: '佐藤先生'
      }
    ]);
    
    // サンプル課題データ
    setAssignments([
      {
        id: 1,
        title: 'ハノン練習曲 No.1-5',
        description: '各練習曲を3回ずつ、テンポを少しづつ上げながら練習してください。',
        dueDate: '2025-04-05',
        status: 'in_progress',
        feedback: 'No.3の練習が特に効果的です。指の独立性が向上していますね。次はNo.4に重点を置いてみましょう。',
        feedbackDate: '2025-03-25',
        teacherId: 'teacher1',
        teacherName: '山田先生'
      },
      {
        id: 2,
        title: 'ショパン ノクターン Op.9 No.2 暗譜',
        description: '次回のレッスンまでに暗譜できるようにしましょう。特に後半部分に注意。',
        dueDate: '2025-04-12',
        status: 'not_started'
      },
      {
        id: 3,
        title: 'スケール練習 ハ長調とイ短調',
        description: '両手で4オクターブ、上下とも滑らかに弾けるようにしてください。',
        dueDate: '2025-03-29',
        status: 'completed',
        feedback: '良く練習できています。次はテンポを上げて挑戦しましょう。イ短調の下降形は特に上達していますね。',
        feedbackDate: '2025-03-24',
        teacherId: 'teacher2',
        teacherName: '佐藤先生'
      }
    ]);
    
    // サンプル進捗データ
    setProgressData({
      weeklyPractice: [
        { day: '月', minutes: 30 },
        { day: '火', minutes: 45 },
        { day: '水', minutes: 0 },
        { day: '木', minutes: 60 },
        { day: '金', minutes: 30 },
        { day: '土', minutes: 90 },
        { day: '日', minutes: 45 }
      ],
      skillLevels: [
        { skill: 'テクニック', level: 3 },
        { skill: '表現力', level: 4 },
        { skill: '読譜力', level: 2 },
        { skill: 'リズム感', level: 3 },
        { skill: '暗譜力', level: 4 }
      ],
      completedAssignments: 5,
      totalAssignments: 8
    });
    
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
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-be9c29b29330?q=80&w=100',
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

  // ホームページに戻る処理
  const handleHomeNavigation = () => {
    try {
      // 現在のセッション情報をローカルストレージに保存して状態を維持
      const currentUser = user;
      if (currentUser) {
        sessionStorage.setItem('userSession', JSON.stringify({
          isLoggedIn: true,
          email: currentUser.email,
          id: currentUser.id,
          timestamp: new Date().getTime()
        }));
      }
      
      console.log('[ナビゲーション] ホームページへ遷移します', { 
        userEmail: currentUser?.email,
        preservingSession: true 
      });
      
      // 認証情報を保持したままホームページに遷移
      router.push('/');
    } catch (error) {
      console.error('[ナビゲーション] エラー:', error);
      // エラーが発生した場合でも遷移を試みる
      router.push('/');
    }
  };

  // 練習記録の追加
  const handleAddPracticeRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPracticeRecord.piece.trim()) return;
    
    const newRecord: PracticeRecord = {
      id: Date.now(),
      ...newPracticeRecord
    };
    
    setPracticeRecords([newRecord, ...practiceRecords]);
    setNewPracticeRecord({
      date: new Date().toISOString().split('T')[0],
      duration: 30,
      piece: '',
      notes: '',
      mood: 'normal'
    });
  };
  
  // 課題のステータス更新
  const handleUpdateAssignmentStatus = (id: number, status: Assignment['status']) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === id ? { ...assignment, status } : assignment
    ));
  };

  // フィードバック関連の関数
  const handleReplyToFeedback = (recordId: number) => {
    setFeedbackType('practice');
    setFeedbackItemId(recordId);
    setFeedbackMessage('');
    setFeedbackDialogOpen(true);
  };

  const handleReplyToAssignmentFeedback = (assignmentId: number) => {
    setFeedbackType('assignment');
    setFeedbackItemId(assignmentId);
    setFeedbackMessage('');
    setFeedbackDialogOpen(true);
  };

  const handleCancelFeedbackReply = () => {
    setFeedbackDialogOpen(false);
    setFeedbackMessage('');
  };

  const handleSendFeedbackReply = async () => {
    if (!feedbackMessage.trim()) {
      alert('返信内容を入力してください');
      return;
    }

    try {
      // APIを呼び出してフィードバック返信を送信
      const response = await fetch('/api/feedback/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: feedbackType,
          itemId: feedbackItemId,
          message: feedbackMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '返信の送信に失敗しました');
      }

      // 成功時の処理
      alert('返信を送信しました');
      setFeedbackDialogOpen(false);
      setFeedbackMessage('');
      
      // 状態を更新（実際の実装ではAPIから最新データを取得）
      if (feedbackType === 'practice' && feedbackItemId) {
        setPracticeRecords(prevRecords =>
          prevRecords.map(record =>
            record.id === feedbackItemId
              ? { ...record, studentReply: feedbackMessage, studentReplyDate: new Date().toISOString().split('T')[0] }
              : record
          )
        );
      } else if (feedbackType === 'assignment' && feedbackItemId) {
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === feedbackItemId
              ? { ...assignment, studentReply: feedbackMessage, studentReplyDate: new Date().toISOString().split('T')[0] }
              : assignment
          )
        );
      }
    } catch (error) {
      console.error('フィードバック返信エラー:', error);
      alert(error instanceof Error ? error.message : '返信の送信に失敗しました');
    }
  };

  const handleRequestFeedback = async (recordId: number) => {
    try {
      // APIを呼び出してフィードバックをリクエスト
      const response = await fetch('/api/feedback', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'practice',
          itemId: recordId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'フィードバックリクエストに失敗しました');
      }

      // 成功時の処理
      alert('講師にフィードバックをリクエストしました');
      
      // 状態を更新
      setPracticeRecords(prevRecords =>
        prevRecords.map(record =>
          record.id === recordId
            ? { ...record, needsFeedback: true }
            : record
        )
      );
    } catch (error) {
      console.error('フィードバックリクエストエラー:', error);
      alert(error instanceof Error ? error.message : 'フィードバックリクエストに失敗しました');
    }
  };

  const handleRequestFeedbackForAssignment = async (assignmentId: number) => {
    try {
      // APIを呼び出してフィードバックをリクエスト
      const response = await fetch('/api/feedback', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'assignment',
          itemId: assignmentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'フィードバックリクエストに失敗しました');
      }

      // 成功時の処理
      alert('講師にフィードバックをリクエストしました');
      
      // 状態を更新
      setAssignments(prevAssignments =>
        prevAssignments.map(assignment =>
          assignment.id === assignmentId
            ? { ...assignment, needsFeedback: true }
            : assignment
        )
      );
    } catch (error) {
      console.error('フィードバックリクエストエラー:', error);
      alert(error instanceof Error ? error.message : 'フィードバックリクエストに失敗しました');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'news':
        return (
          <div className={styles.newsSection}>
            <h3>最新のお知らせ</h3>
            <div className={styles.newsList}>
              {news.map(item => (
                <div key={item.id} className={styles.newsCard}>
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
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'community':
        return (
          <div className={styles.communitySection}>
            <h3>コミュニティ</h3>
            <p>生徒同士の交流や情報共有の場です。</p>
            <div className={styles.comingSoon}>
              <i className="fas fa-tools"></i>
              <p>準備中です。もうしばらくお待ちください。</p>
            </div>
          </div>
        );
        
      case 'profile':
        return (
          <div className={styles.profileSection}>
            <h3>プロフィール設定</h3>
            <div className={styles.profileInfo}>
              <div className={styles.profileDetail}>
                <label>名前:</label>
                <p>{profileData.name}</p>
              </div>
              <div className={styles.profileDetail}>
                <label>楽器:</label>
                <p>{profileData.instrument}</p>
              </div>
              <div className={styles.profileDetail}>
                <label>レベル:</label>
                <p>{profileData.level === 'beginner' ? '初級' : 
                    profileData.level === 'intermediate' ? '中級' : '上級'}</p>
              </div>
              <div className={styles.profileDetail}>
                <label>自己紹介:</label>
                <p>{profileData.bio}</p>
              </div>
            </div>
            <button className={styles.primaryButton}>
              <i className="fas fa-edit"></i> プロフィールを編集
            </button>
          </div>
        );
        
      case 'progress':
        return (
          <div className={styles.progressSection}>
            <h3>練習と進捗の記録</h3>
            
            <div className={styles.progressTabsContainer}>
              <button 
                className={`${styles.progressTab} ${activeProgressTab === 'practice' ? styles.activeProgressTab : ''}`}
                onClick={() => setActiveProgressTab('practice')}
              >
                <i className="fas fa-music"></i> 練習記録
              </button>
              <button 
                className={`${styles.progressTab} ${activeProgressTab === 'assignments' ? styles.activeProgressTab : ''}`}
                onClick={() => setActiveProgressTab('assignments')}
              >
                <i className="fas fa-tasks"></i> 課題
              </button>
              <button 
                className={`${styles.progressTab} ${activeProgressTab === 'stats' ? styles.activeProgressTab : ''}`}
                onClick={() => setActiveProgressTab('stats')}
              >
                <i className="fas fa-chart-bar"></i> 統計
              </button>
            </div>
            
            {/* 練習記録タブ */}
            {activeProgressTab === 'practice' && (
              <div className={styles.practiceSection}>
                <form onSubmit={handleAddPracticeRecord} className={styles.practiceForm}>
                  <h3>新しい練習記録を追加</h3>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="practice-date">日付</label>
                      <input
                        type="date"
                        id="practice-date"
                        value={newPracticeRecord.date}
                        onChange={(e) => setNewPracticeRecord({...newPracticeRecord, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="practice-duration">練習時間（分）</label>
                      <input
                        type="number"
                        id="practice-duration"
                        min="5"
                        step="5"
                        value={newPracticeRecord.duration}
                        onChange={(e) => setNewPracticeRecord({...newPracticeRecord, duration: parseInt(e.target.value)})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="practice-piece">練習した曲</label>
                    <input
                      type="text"
                      id="practice-piece"
                      value={newPracticeRecord.piece}
                      onChange={(e) => setNewPracticeRecord({...newPracticeRecord, piece: e.target.value})}
                      placeholder="例: ショパン ノクターン Op.9 No.2"
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="practice-notes">メモ</label>
                    <textarea
                      id="practice-notes"
                      value={newPracticeRecord.notes}
                      onChange={(e) => setNewPracticeRecord({...newPracticeRecord, notes: e.target.value})}
                      placeholder="今日の練習内容や気づいたことを記録しましょう"
                      rows={3}
                    ></textarea>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>今日の調子</label>
                    <div className={styles.moodSelector}>
                      <button
                        type="button"
                        className={`${styles.moodButton} ${newPracticeRecord.mood === 'bad' ? styles.activeMood : ''}`}
                        onClick={() => setNewPracticeRecord({...newPracticeRecord, mood: 'bad'})}
                      >
                        <i className="fas fa-frown"></i> イマイチ
                      </button>
                      <button
                        type="button"
                        className={`${styles.moodButton} ${newPracticeRecord.mood === 'normal' ? styles.activeMood : ''}`}
                        onClick={() => setNewPracticeRecord({...newPracticeRecord, mood: 'normal'})}
                      >
                        <i className="fas fa-meh"></i> 普通
                      </button>
                      <button
                        type="button"
                        className={`${styles.moodButton} ${newPracticeRecord.mood === 'good' ? styles.activeMood : ''}`}
                        onClick={() => setNewPracticeRecord({...newPracticeRecord, mood: 'good'})}
                      >
                        <i className="fas fa-smile"></i> 良い
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.formSubmitArea}>
                    <button type="submit" className={styles.submitButton}>
                      <i className="fas fa-plus"></i> 練習記録を保存する
                    </button>
                  </div>
                </form>
                
                <div className={styles.practiceRecordsList}>
                  <h3>練習記録</h3>
                  {practiceRecords.length === 0 ? (
                    <p className={styles.emptyMessage}>練習記録がありません。最初の記録を追加しましょう！</p>
                  ) : (
                    practiceRecords.map(record => (
                      <div key={record.id} className={styles.practiceRecordCard}>
                        <div className={styles.practiceRecordHeader}>
                          <div className={styles.practiceRecordDate}>
                            <i className="far fa-calendar"></i> {record.date}
                          </div>
                          <div className={styles.practiceRecordDuration}>
                            <i className="far fa-clock"></i> {record.duration}分
                          </div>
                          <div className={`${styles.practiceRecordMood} ${
                            record.mood === 'good' ? styles.moodGood : 
                            record.mood === 'normal' ? styles.moodNormal : 
                            styles.moodBad
                          }`}>
                            <i className={`fas fa-${
                              record.mood === 'good' ? 'smile' : 
                              record.mood === 'normal' ? 'meh' : 
                              'frown'
                            }`}></i>
                          </div>
                        </div>
                        <h4>{record.piece}</h4>
                        <p>{record.notes || '特記事項なし'}</p>
                        
                        {record.feedback ? (
                          <div className={styles.feedbackSection}>
                            <div className={styles.feedbackHeader}>
                              <h5><i className="fas fa-comment-dots"></i> 講師からのフィードバック</h5>
                              <div className={styles.feedbackMeta}>
                                <span className={styles.teacherName}>{record.teacherName}</span>
                                <span className={styles.feedbackDate}>{record.feedbackDate}</span>
                              </div>
                            </div>
                            <p className={styles.feedbackContent}>{record.feedback}</p>
                            <button 
                              className={styles.replyButton}
                              onClick={() => handleReplyToFeedback(record.id)}
                            >
                              <i className="fas fa-reply"></i> 返信する
                            </button>
                          </div>
                        ) : (
                          <div className={styles.noFeedback}>
                            <p><i className="fas fa-info-circle"></i> まだフィードバックはありません</p>
                          </div>
                        )}
                        
                        <div className={styles.practiceRecordActions}>
                          <button 
                            className={styles.secondaryButton}
                            onClick={() => handleRequestFeedback(record.id)}
                          >
                            <i className="fas fa-question-circle"></i> フィードバックをリクエスト
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {/* 課題タブ */}
            {activeProgressTab === 'assignments' && (
              <div className={styles.assignmentsSection}>
                <h3>課題一覧</h3>
                
                {assignments.length === 0 ? (
                  <p className={styles.emptyMessage}>現在、課題はありません。</p>
                ) : (
                  <div className={styles.assignmentsList}>
                    {assignments.map(assignment => (
                      <div key={assignment.id} className={styles.assignmentCard}>
                        <div className={styles.assignmentHeader}>
                          <h4>{assignment.title}</h4>
                          <div className={`${styles.assignmentStatus} ${
                            assignment.status === 'completed' ? styles.statusCompleted : 
                            assignment.status === 'in_progress' ? styles.statusInProgress : 
                            styles.statusNotStarted
                          }`}>
                            {assignment.status === 'completed' ? '完了' : 
                             assignment.status === 'in_progress' ? '取組中' : 
                             '未着手'}
                          </div>
                        </div>
                        <div className={styles.assignmentDueDate}>
                          <i className="far fa-calendar-alt"></i> 期限: {assignment.dueDate}
                        </div>
                        <p>{assignment.description}</p>
                        
                        {assignment.feedback && (
                          <div className={styles.feedbackSection}>
                            <div className={styles.feedbackHeader}>
                              <h5><i className="fas fa-comment-dots"></i> 講師からのフィードバック</h5>
                              <div className={styles.feedbackMeta}>
                                <span className={styles.teacherName}>{assignment.teacherName}</span>
                                <span className={styles.feedbackDate}>{assignment.feedbackDate}</span>
                              </div>
                            </div>
                            <p className={styles.feedbackContent}>{assignment.feedback}</p>
                            <button 
                              className={styles.replyButton}
                              onClick={() => handleReplyToAssignmentFeedback(assignment.id)}
                            >
                              <i className="fas fa-reply"></i> 返信する
                            </button>
                          </div>
                        )}
                        
                        <div className={styles.assignmentActions}>
                          {assignment.status !== 'completed' && (
                            <button 
                              className={styles.primaryButton}
                              onClick={() => handleUpdateAssignmentStatus(assignment.id, 'completed')}
                            >
                              <i className="fas fa-check"></i> 完了にする
                            </button>
                          )}
                          
                          {assignment.status === 'not_started' && (
                            <button 
                              className={styles.secondaryButton}
                              onClick={() => handleUpdateAssignmentStatus(assignment.id, 'in_progress')}
                            >
                              <i className="fas fa-play"></i> 取組中にする
                            </button>
                          )}
                          
                          {assignment.status === 'completed' && (
                            <button 
                              className={styles.secondaryButton}
                              onClick={() => handleUpdateAssignmentStatus(assignment.id, 'in_progress')}
                            >
                              <i className="fas fa-undo"></i> 取組中に戻す
                            </button>
                          )}
                          
                          {!assignment.feedback && assignment.status === 'completed' && (
                            <button 
                              className={styles.secondaryButton}
                              onClick={() => handleRequestFeedbackForAssignment(assignment.id)}
                            >
                              <i className="fas fa-question-circle"></i> フィードバックをリクエスト
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* 統計タブ */}
            {activeProgressTab === 'stats' && progressData && (
              <div className={styles.statsSection}>
                <div className={styles.statsSummary}>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{progressData.weeklyPractice.reduce((sum, day) => sum + day.minutes, 0)}分</div>
                    <div className={styles.statLabel}>今週の練習時間</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{progressData.completedAssignments}/{progressData.totalAssignments}</div>
                    <div className={styles.statLabel}>課題達成率</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statValue}>{practiceRecords.length}</div>
                    <div className={styles.statLabel}>記録した練習</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return <div>コンテンツが見つかりません</div>;
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {profileData?.avatarUrl ? (
              <img src={profileData.avatarUrl} alt="User Avatar" />
            ) : (
              <div className={styles.defaultAvatar}>
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>
          <div className={styles.userName}>
            <h2>{profileData?.name || 'ユーザー'}</h2>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button onClick={handleHomeNavigation} className={styles.homeButton}>
            <i className="fas fa-home"></i> ホームページに戻る
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> ログアウト
          </button>
        </div>
      </div>
      
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i> プロフィール
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'news' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <i className="fas fa-newspaper"></i> お知らせ
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'community' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('community')}
        >
          <i className="fas fa-users"></i> コミュニティ
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'progress' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <i className="fas fa-chart-line"></i> 進捗管理
        </button>
      </div>
      
      <div className={styles.contentContainer}>
        {renderTabContent()}
      </div>
      
      {/* フィードバック返信ダイアログ */}
      {feedbackDialogOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>講師へのメッセージ</h3>
              <button 
                className={styles.closeButton}
                onClick={handleCancelFeedbackReply}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                {feedbackType === 'practice' ? '練習記録' : '課題'}へのフィードバックに返信します。
                質問や補足情報を入力してください。
              </p>
              <textarea
                className={styles.feedbackTextarea}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="メッセージを入力してください..."
                rows={5}
              ></textarea>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={handleCancelFeedbackReply}
              >
                キャンセル
              </button>
              <button 
                className={styles.submitButton}
                onClick={handleSendFeedbackReply}
              >
                送信する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
