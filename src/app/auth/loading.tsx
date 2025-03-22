export default function Loading() {
  return (
    <div className="auth-page loading">
      <div className="container">
        <div className="auth-content">
          <h1 className="page-title">ログイン・会員登録</h1>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>読み込み中...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
