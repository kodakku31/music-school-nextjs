import AuthForm from '@/components/auth/AuthForm';

export const metadata = {
  title: 'ログイン・会員登録 | 音楽教室',
  description: '音楽教室のログインページです。会員登録も行えます。',
};

export default function AuthPage() {
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-content">
          <h1 className="page-title">ログイン・会員登録</h1>
          <p className="auth-description">
            会員登録すると、レッスンの予約や会員限定コンテンツの閲覧ができるようになります。
          </p>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
