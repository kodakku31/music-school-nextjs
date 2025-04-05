'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mypage.module.css';
import { Database } from '@/types/supabase';
import { FaHome, FaSignOutAlt, FaNewspaper, FaUsers, FaUser, FaChartLine } from 'react-icons/fa';
import MainLayout from '@/components/layout/MainLayout';

type ProfileData = {
  id: string;
  name: string;
  email: string;
  instrument: string;
  level: string;
  goal: string;
  avatar_url: string | null;
};

type PracticeRecord = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  content: string;
  duration: number;
  mood: 'good' | 'normal' | 'bad';
  feedback?: {
    id: string;
    content: string;
    created_at: string;
    teacher: {
      name: string;
    };
  };
};

type Assignment = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'not_started' | 'in_progress' | 'completed';
  feedback?: string;
};

type NewsItem = {
  id: string;
  title: string;
  content: string;
  category: 'event' | 'announcement' | 'update';
  image_url: string;
  created_at: string;
};

export default function MyPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    id: '',
    name: '',
    email: '',
    instrument: '',
    level: '',
    goal: '',
    avatar_url: null,
  });
  
  const [activeTab, setActiveTab] = useState('news');
  const [progressTab, setProgressTab] = useState('practice');
  
  const [practiceRecords, setPracticeRecords] = useState<PracticeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  
  // ユーザー情報の取得
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          await fetchProfileData(user.id);
          await fetchPracticeRecords(user.id);
          await fetchAssignments(user.id);
          await fetchNewsItems();
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
  }, [supabase, router]);
  
  // プロフィールデータの取得
  const fetchProfileData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfileData({
          id: data.id,
          name: data.name || '',
          email: data.email || '',
          instrument: data.instrument || '',
          level: data.level || '',
          goal: data.goal || '',
          avatar_url: data.avatar_url,
        });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  // 練習記録の取得
  const fetchPracticeRecords = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('practice_records')
        .select(`
          *,
          feedback:practice_feedback(
            id,
            content,
            created_at,
            teacher:teacher_id(name)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPracticeRecords(data as any);
      }
    } catch (error) {
      console.error('Error fetching practice records:', error);
    }
  };
  
  // 課題の取得
  const fetchAssignments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setAssignments(data as any);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };
  
  // ニュースの取得
  const fetchNewsItems = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setNewsItems(data as any);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  
  // ログアウト処理
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  // ローディング表示
  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>読み込み中...</p>
        </div>
      </MainLayout>
    );
  }
  
  // ニュースタブの内容
  const renderNewsTab = () => {
    return (
      <div className={styles.newsSection}>
        <h3>最新のお知らせ</h3>
        {newsItems.length > 0 ? (
          <div className={styles.newsList}>
            {newsItems.map((news) => (
              <div key={news.id} className={styles.newsCard}>
                <div className={styles.newsImage}>
                  <Image 
                    src={news.image_url || '/images/news-placeholder.jpg'} 
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={`${styles.newsCategory} ${styles[news.category]}`}>
                    {news.category === 'event' ? 'イベント' : 
                     news.category === 'announcement' ? 'お知らせ' : 'アップデート'}
                  </span>
                </div>
                <div className={styles.newsContent}>
                  <div className={styles.newsHeader}>
                    <h3>{news.title}</h3>
                    <span className={styles.newsDate}>
                      {new Date(news.created_at).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  <p>{news.content.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>現在、お知らせはありません。</p>
        )}
      </div>
    );
  };
  
  // コミュニティタブの内容
  const renderCommunityTab = () => {
    return (
      <div className={styles.communitySection}>
        <h3>コミュニティ</h3>
        <div className={styles.comingSoon}>
          <FaUsers size={48} />
          <p>コミュニティ機能は近日公開予定です。<br />お楽しみに！</p>
        </div>
      </div>
    );
  };
  
  // プロフィールタブの内容
  const renderProfileTab = () => {
    return (
      <div className={styles.profileSection}>
        <h3>プロフィール設定</h3>
        <div className={styles.profileInfo}>
          <div className={styles.profileDetail}>
            <label>名前:</label>
            <p>{profileData.name}</p>
          </div>
          <div className={styles.profileDetail}>
            <label>メールアドレス:</label>
            <p>{profileData.email}</p>
          </div>
          <div className={styles.profileDetail}>
            <label>楽器:</label>
            <p>{profileData.instrument || '未設定'}</p>
          </div>
          <div className={styles.profileDetail}>
            <label>レベル:</label>
            <p>{profileData.level || '未設定'}</p>
          </div>
          <div className={styles.profileDetail}>
            <label>目標:</label>
            <p>{profileData.goal || '未設定'}</p>
          </div>
        </div>
        <button className={styles.primaryButton}>
          プロフィールを編集
        </button>
      </div>
    );
  };
  
  // 進捗タブの内容
  const renderProgressTab = () => {
    return (
      <div className={styles.progressSection}>
        <h3>進捗管理</h3>
        <div className={styles.progressTabsContainer}>
          <button 
            className={`${styles.progressTab} ${progressTab === 'practice' ? styles.activeProgressTab : ''}`}
            onClick={() => setProgressTab('practice')}
          >
            練習記録
          </button>
          <button 
            className={`${styles.progressTab} ${progressTab === 'assignment' ? styles.activeProgressTab : ''}`}
            onClick={() => setProgressTab('assignment')}
          >
            課題
          </button>
        </div>
        
        {progressTab === 'practice' ? (
          <>
            {practiceRecords.length > 0 ? (
              <div className={styles.practiceRecordsList}>
                {practiceRecords.map((record) => (
                  <div key={record.id} className={styles.practiceRecordCard}>
                    <div className={styles.practiceRecordHeader}>
                      <span>{new Date(record.created_at).toLocaleDateString('ja-JP')}</span>
                      <span className={`${styles.practiceRecordMood} ${styles[`mood${record.mood.charAt(0).toUpperCase() + record.mood.slice(1)}`]}`}>
                        {record.mood === 'good' ? '😊' : record.mood === 'normal' ? '😐' : '😔'}
                      </span>
                    </div>
                    <h4>{record.title}</h4>
                    <p>{record.content}</p>
                    <p>練習時間: {record.duration}分</p>
                    
                    {record.feedback && record.feedback.length > 0 && (
                      <div className={styles.feedbackSection}>
                        <div className={styles.feedbackHeader}>
                          <h5>講師からのフィードバック</h5>
                          <div className={styles.feedbackMeta}>
                            <span className={styles.teacherName}>{record.feedback[0].teacher.name}</span>
                            <span className={styles.feedbackDate}>
                              {new Date(record.feedback[0].created_at).toLocaleDateString('ja-JP')}
                            </span>
                          </div>
                        </div>
                        <p className={styles.feedbackContent}>{record.feedback[0].content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>練習記録がありません。</p>
            )}
            <button className={styles.primaryButton}>
              新しい練習記録を追加
            </button>
          </>
        ) : (
          <>
            {assignments.length > 0 ? (
              <div className={styles.assignmentsList}>
                {assignments.map((assignment) => (
                  <div key={assignment.id} className={styles.assignmentCard}>
                    <div className={styles.assignmentHeader}>
                      <h4>{assignment.title}</h4>
                      <span className={`${styles.assignmentStatus} ${styles[`status${assignment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`]}`}>
                        {assignment.status === 'not_started' ? '未着手' : 
                         assignment.status === 'in_progress' ? '進行中' : '完了'}
                      </span>
                    </div>
                    <div className={styles.assignmentDueDate}>
                      期限: {new Date(assignment.due_date).toLocaleDateString('ja-JP')}
                    </div>
                    <p>{assignment.description}</p>
                    {assignment.feedback && (
                      <div className={styles.assignmentFeedback}>
                        <h5>講師からのフィードバック:</h5>
                        <p>{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>現在、課題はありません。</p>
            )}
          </>
        )}
      </div>
    );
  };
  
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {profileData.avatar_url ? (
                <Image 
                  src={profileData.avatar_url} 
                  alt={profileData.name} 
                  width={60} 
                  height={60} 
                />
              ) : (
                <div className={styles.defaultAvatar}>
                  {profileData.name.charAt(0)}
                </div>
              )}
            </div>
            <div className={styles.userName}>
              <h2>{profileData.name}</h2>
              <p>{profileData.instrument || '楽器未設定'}</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <Link href="/" className={styles.homeButton}>
              <FaHome /> ホームへ戻る
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <FaSignOutAlt /> ログアウト
            </button>
          </div>
        </div>
        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'news' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <FaNewspaper /> ニュース
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'community' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('community')}
          >
            <FaUsers /> コミュニティ
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> プロフィール
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'progress' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            <FaChartLine /> 進捗管理
          </button>
        </div>
        
        <div className={styles.contentContainer}>
          {activeTab === 'news' && renderNewsTab()}
          {activeTab === 'community' && renderCommunityTab()}
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'progress' && renderProgressTab()}
        </div>
      </div>
    </MainLayout>
  );
}
