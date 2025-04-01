import { createServerSupabaseClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

// CORSヘッダーを設定する関数
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

export async function POST(request: Request) {
  console.log('[API:会員登録] リクエスト受信');
  
  try {
    // リクエストボディの取得
    let body;
    try {
      body = await request.json();
      console.log('[API:会員登録] リクエストデータ解析成功', { 
        email: body.email, 
        name: body.name,
        passwordLength: body.password ? body.password.length : 0 
      });
    } catch (parseError: any) {
      console.error('[API:会員登録] リクエスト解析失敗', {
        error: parseError,
        message: parseError?.message,
        contentType: request.headers.get('content-type')
      });
      
      return setCorsHeaders(NextResponse.json(
        { 
          error: 'リクエストの解析に失敗しました', 
          details: parseError?.message || 'JSONデータの解析エラー' 
        },
        { status: 400 }
      ));
    }
    
    const { email, password, name } = body;
    
    // 必須フィールドの検証
    if (!email || !password) {
      console.error('[API:会員登録] 必須フィールドがありません', {
        hasEmail: !!email,
        hasPassword: !!password
      });
      
      return setCorsHeaders(NextResponse.json(
        { 
          error: 'メールアドレスとパスワードは必須です',
          details: {
            email: email ? true : 'メールアドレスが未入力です',
            password: password ? true : 'パスワードが未入力です'
          } 
        },
        { status: 400 }
      ));
    }
    
    // パスワード強度の検証
    if (password.length < 8) {
      return setCorsHeaders(NextResponse.json(
        { 
          error: 'パスワードは8文字以上必要です',
          details: {
            password: 'パスワードの長さが不足しています'
          } 
        },
        { status: 400 }
      ));
    }
    
    // サーバーサイドSupabaseクライアントの作成
    let supabase;
    try {
      supabase = createServerSupabaseClient();
      console.log('[API:会員登録] Supabaseクライアント作成成功');
    } catch (clientError: any) {
      console.error('[API:会員登録] Supabaseクライアント作成失敗', {
        error: clientError,
        message: clientError?.message
      });
      
      return setCorsHeaders(NextResponse.json(
        { 
          error: 'サーバー構成エラー: 認証サービスに接続できません',
          details: clientError?.message || '認証クライアント初期化エラー'
        },
        { status: 500 }
      ));
    }
    
    // 会員登録
    console.log('[API:会員登録] Supabaseで会員登録を実行');
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`
        },
      });
      
      if (error) {
        console.error('[API:会員登録] Supabaseエラー', {
          error,
          code: error.code,
          status: error.status,
          message: error.message
        });
        
        // Supabaseエラーコードに基づいた適切なHTTPステータスとメッセージ
        let statusCode = 400;
        let errorMessage = error.message || '会員登録に失敗しました';
        
        if (error.message?.includes('already registered')) {
          statusCode = 409;
          errorMessage = 'このメールアドレスは既に登録されています';
        } else if (error.message?.includes('password')) {
          statusCode = 400;
          errorMessage = 'パスワードが要件を満たしていません。8文字以上で、文字と数字を含めてください';
        } else if (error.message?.includes('email')) {
          statusCode = 400;
          errorMessage = 'メールアドレスの形式が正しくありません';
        } else if (error.status && error.status === 429) {
          statusCode = 429;
          errorMessage = 'リクエストが多すぎます。しばらく待ってから再度お試しください';
        } else if (error.status && error.status >= 500) {
          statusCode = 503;
          errorMessage = '認証サービスが一時的に利用できません';
        }
        
        return setCorsHeaders(NextResponse.json(
          { 
            error: errorMessage,
            code: error.code,
            details: error.message
          },
          { status: statusCode }
        ));
      }
      
      console.log('[API:会員登録] 会員登録成功', { 
        userId: data.user?.id,
        hasSession: !!data.session
      });
      
      // 成功レスポンス
      return setCorsHeaders(NextResponse.json(
        { 
          message: '会員登録が完了しました',
          user: data.user,
          session: data.session
        },
        { status: 201 }
      ));
    } catch (authError: any) {
      console.error('[API:会員登録] 会員登録処理中の例外', {
        error: authError,
        message: authError?.message,
        stack: authError?.stack?.split('\n').slice(0, 3).join('\n')
      });
      
      return setCorsHeaders(NextResponse.json(
        { 
          error: '認証処理中にエラーが発生しました',
          details: authError?.message || '会員登録処理エラー'
        },
        { status: 500 }
      ));
    }
  } catch (error: any) {
    console.error('[API:会員登録] 予期しない例外', {
      error,
      message: error?.message,
      stack: error?.stack?.split('\n').slice(0, 3).join('\n')
    });
    
    return setCorsHeaders(NextResponse.json(
      { 
        error: 'サーバーエラーが発生しました', 
        details: error?.message || '予期しないエラー'
      },
      { status: 500 }
    ));
  }
}
