import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// Supabase環境変数
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// デバッグ用に環境変数の状態をコンソールに出力
console.log('Supabase URL:', supabaseUrl ? 'Set (not empty)' : 'Not set (empty)');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set (not empty)' : 'Not set (empty)');

// デモモードかどうかを確認
const isDemoMode = !supabaseUrl || !supabaseAnonKey;
console.log('Demo Mode:', isDemoMode);

// Supabaseクライアントの作成（デモモード対応）
export const supabase = isDemoMode 
  ? {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        signInWithPassword: async () => ({ error: { message: 'デモモードではログインできません。環境変数を設定してください。' } }),
        signUp: async () => ({ error: { message: 'デモモードでは会員登録できません。環境変数を設定してください。' } }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as any
  : createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        // CORSエラーを回避するための設定
        fetch: (url, options = {}) => {
          const headers = new Headers(options.headers || {});
          headers.set('X-Client-Info', 'music-school-nextjs');
          
          return fetch(url, {
            ...options,
            headers,
            mode: 'cors',
            credentials: 'include',
          });
        },
      },
    });

// サーバーサイドでのみ使用するSupabaseクライアント
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  
  console.log('Server Supabase URL:', supabaseUrl ? 'Set (not empty)' : 'Not set (empty)');
  console.log('Server Supabase Service Key:', supabaseServiceKey ? 'Set (not empty)' : 'Not set (empty)');
  
  // デモモードの場合
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('Supabase環境変数が設定されていません。デモモードで実行します。');
    return {
      auth: {
        signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
        signUp: async () => ({ data: { user: null, session: null }, error: null }),
      },
      storage: {
        from: () => ({
          upload: async () => ({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
      from: () => ({
        insert: async () => ({ data: null, error: null }),
        select: () => ({ data: null, error: null }),
      }),
    } as any;
  }
  
  // 実際の環境変数の値をログ出力（デバッグ用）
  console.log('実際のSupabase URL:', supabaseUrl);
  console.log('実際のService Key (最初の10文字):', supabaseServiceKey.substring(0, 10) + '...');
  
  try {
    return createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
      },
    });
  } catch (error) {
    console.error('Supabaseクライアント作成エラー:', error);
    throw error;
  }
};
