'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import styles from './teacher-dashboard.module.css';

// 生徒のタイプ定義
type Student = {
  id: string;
  name: string;
  email: string;
  instrument: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  avatarUrl?: string;
};

// 練習記録のタイプ定義
type PracticeRecord = {
  id: number;
  studentId: string;
  studentName: string;
  date: string;
  duration: number;
  piece: string;
  notes: string;
  mood: 'good' | 'normal' | 'bad';
  feedback?: string;
  feedbackDate?: string;
  needsFeedback: boolean;
};

// 課題のタイプ定義
type Assignment = {
  id: number;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed';
  feedback?: string;
  feedbackDate?: string;
  needsFeedback: boolean;
};

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [practiceRecords, setPracticeRecords] = useState<PracticeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'practice' | 'assignments'>('students');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'practice' | 'assignment'>('practice');
  const [feedbackItemId, setFeedbackItemId] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // 認証状態を確認
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('[講師ダッシュボード] セッション取得エラー:', error);
          window.location.href = '/';
          return;
        }

        if (!data.session) {
          console.log('[講師ダッシュボード] 未ログインユーザー');
          window.location.href = '/';
          return;
        }

        // ユーザーが講師かどうか確認する処理を追加する（実際の実装では）
        // この例ではサンプルデータを使用
        
        setUser(data.session.user);
        
        // サンプルデータのロード
        loadSampleData();
      } catch (error) {
        console.error('[講師ダッシュボード] 認証チェックエラー:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // サンプルデータをロード
  const loadSampleData = () => {
    // サンプル生徒データ
    setStudents([
      {
        id: 'student1',
        name: '佐藤 太郎',
        email: 'taro@example.com',
        instrument: 'ピアノ',
        level: 'intermediate',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100'
      },
      {
        id: 'student2',
        name: '鈴木 花子',
        email: 'hanako@example.com',
        instrument: 'ピアノ',
        level: 'beginner',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100'
      },
      {
        id: 'student3',
        name: '田中 一郎',
        email: 'ichiro@example.com',
        instrument: 'ピアノ',
        level: 'advanced',
        avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100'
      }
    ]);
    
    // サンプル練習記録データ
    setPracticeRecords([
      {
        id: 1,
        studentId: 'student1',
        studentName: '佐藤 太郎',
        date: '2025-03-25',
        duration: 45,
        piece: 'ショパン ノクターン Op.9 No.2',
        notes: '冒頭の右手の表現に注意して練習。左手のアルペジオが安定してきた。',
        mood: 'good',
        needsFeedback: true
      },
      {
        id: 2,
        studentId: 'student2',
        studentName: '鈴木 花子',
        date: '2025-03-23',
        duration: 30,
        piece: 'ブルグミュラー 25の練習曲より「アラベスク」',
        notes: '16分音符の部分がスムーズに弾けるようになってきた。',
        mood: 'normal',
        feedback: '16分音符のパッセージが上達していますね。次はもう少しテンポを上げて練習してみましょう。',
        feedbackDate: '2025-03-24',
        needsFeedback: false
      },
      {
        id: 3,
        studentId: 'student3',
        studentName: '田中 一郎',
        date: '2025-03-20',
        duration: 60,
        piece: 'バッハ インベンション No.1',
        notes: '両手の独立した動きを意識。少しづつ上達している。',
        mood: 'good',
        needsFeedback: true
      }
    ]);
    
    // サンプル課題データ
    setAssignments([
      {
        id: 1,
        studentId: 'student1',
        studentName: '佐藤 太郎',
        title: 'ハノン練習曲 No.1-5',
        description: '各練習曲を3回ずつ、テンポを少しづつ上げながら練習してください。',
        dueDate: '2025-04-05',
        status: 'in_progress',
        needsFeedback: true
      },
      {
        id: 2,
        studentId: 'student2',
        studentName: '鈴木 花子',
        title: 'ブルグミュラー 25の練習曲より「アラベスク」',
        description: '次回のレッスンまでに暗譜できるようにしましょう。',
        dueDate: '2025-04-12',
        status: 'not_started',
        needsFeedback: false
      },
      {
        id: 3,
        studentId: 'student3',
        studentName: '田中 一郎',
        title: 'スケール練習 ハ長調とイ短調',
        description: '両手で4オクターブ、上下とも滑らかに弾けるようにしてください。',
        dueDate: '2025-03-29',
        status: 'completed',
        feedback: '良く練習できています。次はテンポを上げて挑戦しましょう。イ短調の下降形は特に上達していますね。',
        feedbackDate: '2025-03-24',
        needsFeedback: false
      }
    ]);
  };

  // フィードバックダイアログを開く（練習記録用）
  const handleGiveFeedback = (recordId: number) => {
    setFeedbackType('practice');
    setFeedbackItemId(recordId);
    setFeedbackMessage('');
    setFeedbackDialogOpen(true);
  };

  // フィードバックダイアログを開く（課題用）
  const handleGiveAssignmentFeedback = (assignmentId: number) => {
    setFeedbackType('assignment');
    setFeedbackItemId(assignmentId);
    setFeedbackMessage('');
    setFeedbackDialogOpen(true);
  };

  // フィードバックをキャンセル
  const handleCancelFeedback = () => {
    setFeedbackDialogOpen(false);
    setFeedbackMessage('');
  };

  // フィードバックを送信
  const handleSendFeedback = async () => {
    if (!feedbackMessage.trim()) {
      alert('フィードバックを入力してください');
      return;
    }

    try {
      // 実際の実装ではAPIを呼び出してデータベースを更新
      // この例ではフロントエンドの状態だけを更新

      const currentDate = new Date().toISOString().split('T')[0];

      if (feedbackType === 'practice' && feedbackItemId !== null) {
        // 練習記録のフィードバックを更新
        setPracticeRecords(prevRecords =>
          prevRecords.map(record =>
            record.id === feedbackItemId
              ? {
                  ...record,
                  feedback: feedbackMessage,
                  feedbackDate: currentDate,
                  needsFeedback: false
                }
              : record
          )
        );
      } else if (feedbackType === 'assignment' && feedbackItemId !== null) {
        // 課題のフィードバックを更新
        setAssignments(prevAssignments =>
          prevAssignments.map(assignment =>
            assignment.id === feedbackItemId
              ? {
                  ...assignment,
                  feedback: feedbackMessage,
                  feedbackDate: currentDate,
                  needsFeedback: false
                }
              : assignment
          )
        );
      }

      setFeedbackDialogOpen(false);
      setFeedbackMessage('');
      alert('フィードバックを送信しました');
    } catch (error) {
      console.error('フィードバック送信エラー:', error);
      alert('フィードバックの送信に失敗しました');
    }
  };

  // 生徒一覧を表示
  const renderStudentsList = () => {
    return (
      <div className={styles.studentsList}>
        <h3>担当生徒一覧</h3>
        <div className={styles.studentsGrid}>
          {students.map(student => (
            <div 
              key={student.id} 
              className={styles.studentCard}
              onClick={() => setSelectedStudent(student.id)}
            >
              <div className={styles.studentAvatar}>
                {student.avatarUrl ? (
                  <img src={student.avatarUrl} alt={student.name} />
                ) : (
                  <div className={styles.avatarPlaceholder}>{student.name[0]}</div>
                )}
              </div>
              <div className={styles.studentInfo}>
                <h4>{student.name}</h4>
                <p>{student.instrument} - {student.level === 'beginner' ? '初級' : student.level === 'intermediate' ? '中級' : '上級'}</p>
                <p>{student.email}</p>
              </div>
              <div className={styles.studentActions}>
                <button className={styles.viewButton}>詳細を見る</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 練習記録一覧を表示
  const renderPracticeRecords = () => {
    const filteredRecords = selectedStudent
      ? practiceRecords.filter(record => record.studentId === selectedStudent)
      : practiceRecords;

    return (
      <div className={styles.practiceRecordsList}>
        <h3>練習記録一覧</h3>
        {selectedStudent && (
          <button 
            className={styles.clearFilterButton}
            onClick={() => setSelectedStudent(null)}
          >
            フィルターをクリア
          </button>
        )}
        <div className={styles.recordsTable}>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>生徒名</th>
                <th>曲名</th>
                <th>練習時間</th>
                <th>モチベーション</th>
                <th>フィードバック</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.studentName}</td>
                  <td>{record.piece}</td>
                  <td>{record.duration}分</td>
                  <td>
                    {record.mood === 'good' ? '😊' : record.mood === 'normal' ? '😐' : '😞'}
                  </td>
                  <td>
                    {record.feedback ? (
                      <div className={styles.feedbackInfo}>
                        <span className={styles.feedbackText}>{record.feedback}</span>
                        <span className={styles.feedbackDate}>{record.feedbackDate}</span>
                      </div>
                    ) : (
                      <span className={styles.noFeedback}>未送信</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className={styles.feedbackButton}
                      onClick={() => handleGiveFeedback(record.id)}
                    >
                      {record.feedback ? 'フィードバックを編集' : 'フィードバックを送信'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // 課題一覧を表示
  const renderAssignments = () => {
    const filteredAssignments = selectedStudent
      ? assignments.filter(assignment => assignment.studentId === selectedStudent)
      : assignments;

    return (
      <div className={styles.assignmentsList}>
        <h3>課題一覧</h3>
        {selectedStudent && (
          <button 
            className={styles.clearFilterButton}
            onClick={() => setSelectedStudent(null)}
          >
            フィルターをクリア
          </button>
        )}
        <div className={styles.assignmentsTable}>
          <table>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>生徒名</th>
                <th>期限</th>
                <th>ステータス</th>
                <th>フィードバック</th>
                <th>アクション</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map(assignment => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{assignment.studentName}</td>
                  <td>{assignment.dueDate}</td>
                  <td>
                    {assignment.status === 'completed' ? '完了' : 
                     assignment.status === 'in_progress' ? '進行中' : '未着手'}
                  </td>
                  <td>
                    {assignment.feedback ? (
                      <div className={styles.feedbackInfo}>
                        <span className={styles.feedbackText}>{assignment.feedback}</span>
                        <span className={styles.feedbackDate}>{assignment.feedbackDate}</span>
                      </div>
                    ) : (
                      <span className={styles.noFeedback}>未送信</span>
                    )}
                  </td>
                  <td>
                    <button 
                      className={styles.feedbackButton}
                      onClick={() => handleGiveAssignmentFeedback(assignment.id)}
                    >
                      {assignment.feedback ? 'フィードバックを編集' : 'フィードバックを送信'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // タブコンテンツを表示
  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return renderStudentsList();
      case 'practice':
        return renderPracticeRecords();
      case 'assignments':
        return renderAssignments();
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>読み込み中...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.dashboardContainer}>
        <h2 className={styles.dashboardTitle}>講師ダッシュボード</h2>
        
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'students' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('students')}
          >
            生徒一覧
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'practice' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('practice')}
          >
            練習記録
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'assignments' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            課題
          </button>
        </div>
        
        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
        
        {/* フィードバックダイアログ */}
        {feedbackDialogOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>フィードバックを送信</h3>
              <textarea
                className={styles.feedbackTextarea}
                placeholder="生徒へのフィードバックを入力してください..."
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                rows={5}
              />
              <div className={styles.modalButtons}>
                <button 
                  className={styles.cancelButton}
                  onClick={handleCancelFeedback}
                >
                  キャンセル
                </button>
                <button 
                  className={styles.sendButton}
                  onClick={handleSendFeedback}
                >
                  送信
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
