import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/client';

// CORSヘッダーを設定する関数
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// OPTIONSリクエストに対応するハンドラー
export async function OPTIONS() {
  return setCorsHeaders(NextResponse.json({}, { status: 200 }));
}

export async function POST(request: Request) {
  try {
    console.log('ログインAPIが呼び出されました');
    
    // 環境変数チェック
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('サーバー環境変数:', { 
      url: supabaseUrl ? 'Set (not empty)' : 'Not set (empty)', 
      serviceKey: supabaseServiceKey ? 'Set (not empty)' : 'Not set (empty)' 
    });
    
    // リクエストボディの解析
    let requestData;
    try {
      requestData = await request.json();
      console.log('リクエストデータ:', { email: requestData.email });
    } catch (parseError) {
      console.error('リクエスト解析エラー:', parseError);
      return setCorsHeaders(NextResponse.json({ error: 'リクエストの解析に失敗しました' }, { status: 400 }));
    }
    
    const { email, password } = requestData;
    
    if (!email || !password) {
      return setCorsHeaders(NextResponse.json({ error: 'メールアドレスとパスワードは必須です' }, { status: 400 }));
    }
    
    // サーバーサイドのSupabaseクライアントを作成
    const supabase = createServerSupabaseClient();
    
    // ログイン処理
    try {
      console.log('Supabaseでログインを試みます');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Supabaseログインエラー:', error);
        return setCorsHeaders(NextResponse.json({ error: error.message }, { status: 400 }));
      }
      
      console.log('ログイン成功:', data.user?.id);
      return setCorsHeaders(NextResponse.json({ 
        user: data.user,
        session: data.session
      }));
    } catch (loginError: any) {
      console.error('ログイン処理中の例外:', loginError, typeof loginError, Object.keys(loginError));
      return setCorsHeaders(NextResponse.json({ 
        error: loginError.message || 'ログイン処理中にエラーが発生しました' 
      }, { status: 500 }));
    }
  } catch (error: any) {
    console.error('ログインAPI全体エラー:', error, typeof error, Object.keys(error));
    return setCorsHeaders(NextResponse.json({ error: error.message || '予期しないエラーが発生しました' }, { status: 500 }));
  }
}
