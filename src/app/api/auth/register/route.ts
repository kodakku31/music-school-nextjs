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
    console.log('会員登録APIが呼び出されました');
    
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
      console.log('リクエストデータ:', { email: requestData.email, name: requestData.name });
    } catch (parseError) {
      console.error('リクエスト解析エラー:', parseError);
      return setCorsHeaders(NextResponse.json({ error: 'リクエストの解析に失敗しました' }, { status: 400 }));
    }
    
    const { email, password, name } = requestData;
    
    if (!email || !password) {
      return setCorsHeaders(NextResponse.json({ error: 'メールアドレスとパスワードは必須です' }, { status: 400 }));
    }
    
    // サーバーサイドのSupabaseクライアントを作成
    const supabase = createServerSupabaseClient();
    
    // 会員登録処理
    try {
      console.log('Supabaseで会員登録を試みます');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
        },
      });
      
      if (error) {
        console.error('Supabase会員登録エラー:', error);
        return setCorsHeaders(NextResponse.json({ error: error.message }, { status: 400 }));
      }
      
      console.log('会員登録成功:', data.user?.id);
      return setCorsHeaders(NextResponse.json({ 
        user: data.user,
        session: data.session
      }));
    } catch (signUpError: any) {
      console.error('会員登録処理中の例外:', signUpError, typeof signUpError, Object.keys(signUpError));
      return setCorsHeaders(NextResponse.json({ 
        error: signUpError.message || '会員登録処理中にエラーが発生しました' 
      }, { status: 500 }));
    }
  } catch (error: any) {
    console.error('会員登録API全体エラー:', error, typeof error, Object.keys(error));
    return setCorsHeaders(NextResponse.json({ error: error.message || '予期しないエラーが発生しました' }, { status: 500 }));
  }
}
