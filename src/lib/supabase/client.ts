import { createClient } from '@supabase/supabase-js';

// 環境変数の検証とログ出力関数
function validateAndLogEnvironment() {
  // 環境変数を取得
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // 環境変数の存在チェック
  const isClient = typeof window !== 'undefined';
  const environment = isClient ? 'クライアント' : 'サーバー';
  
  // URL形式の検証
  let urlValid = false;
  try {
    if (supabaseUrl) {
      new URL(supabaseUrl);
      urlValid = true;
    }
  } catch (e) {
    console.error(`[Supabase] ${environment}側: URLが無効な形式です`, e);
  }
  
  // ログ出力
  console.log(`[Supabase] ${environment}側環境変数チェック:`, {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ? (urlValid ? '有効' : '無効な形式') : '未設定',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey ? `設定済み (${supabaseAnonKey.substring(0, 5)}...)` : '未設定',
    SUPABASE_SERVICE_ROLE_KEY: supabaseServiceKey ? `設定済み (${supabaseServiceKey?.substring(0, 5)}...)` : (isClient ? 'クライアント側では不要' : '未設定'),
  });
  
  // エラーチェック
  if (!supabaseUrl || !supabaseAnonKey || (!isClient && !supabaseServiceKey)) {
    const errorMessage = `[Supabase] ${environment}側: 必要な環境変数が不足しています`;
    console.error(errorMessage);
    if (!isClient) {
      throw new Error(errorMessage);
    }
  }
  
  return { supabaseUrl, supabaseAnonKey, supabaseServiceKey, isValid: urlValid && !!supabaseUrl && !!supabaseAnonKey };
}

// カスタムフェッチ関数（デバッグ情報付き）
const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  console.log(`[Supabase] APIリクエスト:`, {
    url: typeof input === 'string' ? input : input.toString(),
    method: init?.method || 'GET',
  });
  
  try {
    const response = await fetch(input, init);
    console.log(`[Supabase] APIレスポンス:`, {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });
    return response;
  } catch (error: any) {
    console.error('[Supabase] フェッチエラー:', {
      error,
      type: typeof error,
      properties: Object.keys(error || {}),
      message: error?.message,
      stack: error?.stack,
    });
    throw error;
  }
};

// クライアント側で使用するSupabaseクライアント
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      storageKey: 'music-school-auth-session',
      storage: typeof window !== 'undefined' ? localStorage : undefined,
    },
    global: {
      fetch: customFetch,
    },
  }
);

// サーバーサイドSupabaseクライアントの作成関数
export function createServerSupabaseClient() {
  const { supabaseUrl, supabaseServiceKey, isValid } = validateAndLogEnvironment();
  
  if (!isValid || !supabaseServiceKey) {
    throw new Error('[Supabase] サーバー側クライアント作成エラー: 有効な環境変数が設定されていません');
  }
  
  // サーバーサイドのクライアント作成（サービスロールキー使用）
  return createClient(supabaseUrl!, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      fetch: customFetch,
    },
  });
}

// 環境変数の初期検証を実行（エラーを早期に発見するため）
validateAndLogEnvironment();
