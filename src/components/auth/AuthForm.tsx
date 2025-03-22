'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

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

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
    try {
      setLoading(true);
      setError(null);

      console.log('ログイン開始：', data.email);
      
      // 環境変数が設定されているか確認
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('環境変数チェック:', { 
        url: supabaseUrl ? 'Set (not empty)' : 'Not set (empty)', 
        key: supabaseKey ? 'Set (not empty)' : 'Not set (empty)' 
      });
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase環境変数が設定されていません');
        setError('Supabase環境変数が設定されていません。.env.localファイルを確認してください。');
        setLoading(false);
        return;
      }
      
      // 直接Supabaseクライアントを使用してログイン
      try {
        console.log('直接Supabaseクライアントを使用してログインを試みます');
        
        const { supabase } = await import('@/lib/supabase/client');
        
        const { error, data: authData } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        
        if (error) {
          console.error('Supabaseログインエラー:', error);
          throw new Error(error.message || 'ログインに失敗しました');
        }

        // ログイン成功
        console.log('ログイン成功:', authData?.user?.id);
        setSuccess('ログインに成功しました。リダイレクトします...');
        router.push('/');
        router.refresh();
      } catch (loginError: any) {
        console.error('ログインエラー詳細:', loginError, typeof loginError, Object.keys(loginError));
        throw new Error(`ログインエラー: ${loginError.message || '不明なエラー'}`);
      }
    } catch (error: any) {
      console.error('エラー発生:', error, typeof error, Object.keys(error));
      setError(error.message || 'ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } finally {
      setLoading(false);
    }
  };

  // 会員登録処理
  const handleRegister = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      setError(null);

      console.log('登録開始：', data.email);
      
      // 環境変数が設定されているか確認
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('環境変数チェック:', { 
        url: supabaseUrl ? 'Set (not empty)' : 'Not set (empty)', 
        key: supabaseKey ? 'Set (not empty)' : 'Not set (empty)' 
      });
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase環境変数が設定されていません');
        setError('Supabase環境変数が設定されていません。.env.localファイルを確認してください。');
        setLoading(false);
        return;
      }
      
      // 直接Supabaseクライアントを使用して会員登録
      try {
        console.log('直接Supabaseクライアントを使用して会員登録を試みます');
        
        const { supabase } = await import('@/lib/supabase/client');
        
        const { error, data: authData } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name || '',
            },
          },
        });
        
        if (error) {
          console.error('Supabase会員登録エラー:', error);
          throw new Error(error.message || '会員登録に失敗しました');
        }
        
        console.log('会員登録成功:', authData?.user?.id);
        setSuccess('会員登録が完了しました。メールを確認してアカウントを有効化してください。');
        setMode('login');
        registerForm.reset();
      } catch (signUpError: any) {
        console.error('登録エラー詳細:', signUpError, typeof signUpError, Object.keys(signUpError));
        throw new Error(`登録エラー: ${signUpError.message || '不明なエラー'}`);
      }
    } catch (error: any) {
      console.error('エラー発生:', error, typeof error, Object.keys(error));
      setError(error.message || 'エラーが発生しました。もう一度お試しください。');
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
          {error}
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
