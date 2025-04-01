'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// バリデーションスキーマ
const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

const registerSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
  confirmPassword: z.string().min(6, 'パスワードを再入力してください'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

type AuthFormProps = {
  onSuccess?: () => void;
};

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);
  const router = useRouter();

  // ログインフォーム
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 登録フォーム
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // ログイン処理
  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      console.log('[認証] ログイン開始:', { email: data.email });

      // サーバーAPIを使用してログイン
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      // ネットワークエラーではなくHTTPエラーの詳細ログ
      console.log('[認証] ログインAPIレスポンス:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      const result = await response.json();

      if (!response.ok) {
        // レスポンス全体のデバッグ情報も記録
        console.error('[認証] ログインAPIレスポンス詳細:', {
          status: response.status,
          statusText: response.statusText,
          result: result // 結果全体をログ
        });
        
        // エラー情報の安全な取得（undefined対策）
        const errorMessage = 
          (result?.error || result?.message || 'ログイン中にエラーが発生しました');
        const errorDetails = 
          (result?.details || result?.error || result?.message || '詳細なし');
        
        console.error('[認証] ログインAPIエラー詳細:', {
          errorMessage,
          errorDetails
        });
        
        // ステータスコードに基づいたエラーメッセージの生成
        let displayError = errorMessage;
        if (response.status === 401) {
          displayError = 'メールアドレスまたはパスワードが正しくありません';
        } else if (response.status === 404) {
          displayError = 'APIエンドポイントが見つかりません';
        } else if (response.status === 429) {
          // レート制限エラーの詳細な処理
          displayError = 'リクエストが多すぎます。しばらく待ってから再度お試しください';
          
          // サーバーから推奨される待機時間を取得
          const retryAfter = result.retryAfter || 60;
          
          // カウントダウンを設定
          setRetryCountdown(retryAfter);
          
          // カウントダウンタイマーを開始
          const countdownInterval = setInterval(() => {
            setRetryCountdown(prev => {
              if (prev === null || prev <= 1) {
                clearInterval(countdownInterval);
                setLoading(false);
                setError('再度ログインを試みることができます');
                return null;
              }
              return prev - 1;
            });
          }, 1000);
          
          // サーバーからの提案があれば表示
          if (result.suggestion) {
            displayError += `\n${result.suggestion}`;
          }
          
          // 一時的にフォームを無効化
          loginForm.reset();
          setLoading(true);
        } else if (response.status >= 500) {
          displayError = 'サーバーエラーが発生しました。しばらく経ってからもう一度お試しください';
        }
        
        setError(displayError);
        return;
      }

      // ログイン成功
      console.log('[認証] ログイン成功:', { 
        userId: result.user?.id,
        sessionExpires: result.session?.expires_at 
      });
      
      // クライアント側でセッションを明示的に設定
      try {
        const supabase = createClientComponentClient();
        const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
          access_token: result.session.access_token,
          refresh_token: result.session.refresh_token
        });
        
        if (sessionError) {
          console.error('[認証] セッション設定エラー:', sessionError);
        } else {
          console.log('[認証] クライアント側でセッションを設定しました:', {
            userId: sessionData.user?.id,
            email: sessionData.user?.email
          });
        }
      } catch (sessionSetError) {
        console.error('[認証] セッション設定中の例外:', sessionSetError);
      }
      
      setSuccess('ログインに成功しました。リダイレクトします...');
      
      // 認証状態を更新するためにページをリフレッシュ
      setTimeout(() => {
        // 成功時のコールバックがあれば実行
        if (onSuccess) {
          onSuccess();
        }
        router.push('/mypage');
        router.refresh();
        // ブラウザのリロードを強制して認証状態を確実に更新
        window.location.href = '/mypage';
      }, 1000);
    } catch (error: any) {
      // ネットワークエラーの詳細ログ（通常はFailed to fetchなど）
      console.error('[認証] ログイン実行エラー:', {
        error,
        message: error?.message,
        type: typeof error,
        stack: error?.stack,
        properties: Object.keys(error || {})
      });
      
      // ネットワークエラーの場合はユーザーフレンドリーなメッセージを表示
      if (error?.message === 'Failed to fetch') {
        setError('サーバーに接続できません。インターネット接続を確認するか、しばらく経ってからもう一度お試しください');
      } else {
        setError(error?.message || 'ログイン中に予期しないエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  // 会員登録処理
  const handleRegister = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(null);

    try {
      console.log('[認証] 会員登録開始:', { email: data.email, name: data.name });

      // サーバーAPIを使用して会員登録
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });

      // ネットワークエラーではなくHTTPエラーの詳細ログ
      console.log('[認証] 会員登録APIレスポンス:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      const result = await response.json();

      if (!response.ok) {
        // レスポンス全体のデバッグ情報も記録
        console.error('[認証] 会員登録APIレスポンス詳細:', {
          status: response.status,
          statusText: response.statusText,
          result: result // 結果全体をログ
        });
        
        // エラー情報の安全な取得（undefined対策）
        const errorMessage = 
          (result?.error || result?.message || '会員登録中にエラーが発生しました');
        const errorDetails = 
          (result?.details || result?.error || result?.message || '詳細なし');
        
        console.error('[認証] 会員登録APIエラー詳細:', {
          errorMessage,
          errorDetails
        });
        
        // ステータスコードに基づいたエラーメッセージの生成
        let displayError = errorMessage;
        if (response.status === 400) {
          if (
            typeof errorMessage === 'string' && 
            (errorMessage.includes('email') || errorMessage.includes('メール'))
          ) {
            displayError = 'このメールアドレスは既に使用されているか、無効な形式です';
          } else if (
            typeof errorMessage === 'string' && 
            (errorMessage.includes('password') || errorMessage.includes('パスワード'))
          ) {
            displayError = 'パスワードは8文字以上必要です';
          }
        } else if (response.status === 404) {
          displayError = 'APIエンドポイントが見つかりません';
        } else if (response.status >= 500) {
          displayError = 'サーバーエラーが発生しました。しばらく経ってからもう一度お試しください';
        }
        
        setError(displayError);
        return;
      }

      console.log('[認証] 会員登録成功:', { 
        userId: result.user?.id,
        sessionExpires: result.session?.expires_at 
      });
      setSuccess('会員登録が完了しました。メールを確認してアカウントを有効化してください。');
      
      // 成功時のコールバックがあれば実行
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
      
      setMode('login');
      registerForm.reset();
    } catch (error: any) {
      // ネットワークエラーの詳細ログ（通常はFailed to fetchなど）
      console.error('[認証] 会員登録実行エラー:', {
        error,
        message: error?.message,
        type: typeof error,
        stack: error?.stack,
        properties: Object.keys(error || {})
      });
      
      // ネットワークエラーの場合はユーザーフレンドリーなメッセージを表示
      if (error?.message === 'Failed to fetch') {
        setError('サーバーに接続できません。インターネット接続を確認するか、しばらく経ってからもう一度お試しください');
      } else {
        setError(error?.message || '会員登録中に予期しないエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-tabs">
        <button 
          className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
          onClick={() => setMode('login')}
          disabled={loading}
        >
          ログイン
        </button>
        <button 
          className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
          onClick={() => setMode('register')}
          disabled={loading}
        >
          新規会員登録
        </button>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <span>{error}</span>
          {retryCountdown && (
            <div className="retry-countdown">
              再試行まで: {retryCountdown}秒
            </div>
          )}
        </div>
      )}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {mode === 'login' ? (
        <motion.form 
          onSubmit={loginForm.handleSubmit(handleLogin)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="auth-form"
        >
          <div className="form-group">
            <label htmlFor="login-email">メールアドレス</label>
            <input
              id="login-email"
              type="email"
              {...loginForm.register('email')}
              disabled={loading}
            />
            {loginForm.formState.errors.email && (
              <p className="error-text">{loginForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="login-password">パスワード</label>
            <input
              id="login-password"
              type="password"
              {...loginForm.register('password')}
              disabled={loading}
            />
            {loginForm.formState.errors.password && (
              <p className="error-text">{loginForm.formState.errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>

          <div className="auth-links">
            <a href="#" onClick={(e) => { e.preventDefault(); /* パスワードリセット処理 */ }}>
              パスワードをお忘れですか？
            </a>
          </div>
        </motion.form>
      ) : (
        <motion.form 
          onSubmit={registerForm.handleSubmit(handleRegister)}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="auth-form"
        >
          <div className="form-group">
            <label htmlFor="register-name">お名前</label>
            <input
              id="register-name"
              type="text"
              {...registerForm.register('name')}
              disabled={loading}
            />
            {registerForm.formState.errors.name && (
              <p className="error-text">{registerForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="register-email">メールアドレス</label>
            <input
              id="register-email"
              type="email"
              {...registerForm.register('email')}
              disabled={loading}
            />
            {registerForm.formState.errors.email && (
              <p className="error-text">{registerForm.formState.errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="register-password">パスワード</label>
            <input
              id="register-password"
              type="password"
              {...registerForm.register('password')}
              disabled={loading}
            />
            {registerForm.formState.errors.password && (
              <p className="error-text">{registerForm.formState.errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="register-confirm-password">パスワード（確認）</label>
            <input
              id="register-confirm-password"
              type="password"
              {...registerForm.register('confirmPassword')}
              disabled={loading}
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="error-text">{registerForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? '登録中...' : '会員登録'}
          </button>
        </motion.form>
      )}
    </div>
  );
}
