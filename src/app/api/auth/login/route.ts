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
  console.log('[API:ログイン] リクエスト受信');
  
  try {
    // リクエストボディの取得
    let body;
    try {
      body = await request.json();
      console.log('[API:ログイン] リクエストデータ解析成功', { 
        email: body.email, 
        passwordLength: body.password ? body.password.length : 0 
      });
    } catch (parseError: any) {
      console.error('[API:ログイン] リクエスト解析失敗', {
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
    
    const { email, password } = body;
    
    // 必須フィールドの検証
    if (!email || !password) {
      console.error('[API:ログイン] 必須フィールドがありません', {
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
    
    // サーバーサイドSupabaseクライアントの作成
    let supabase;
    try {
      supabase = createServerSupabaseClient();
      console.log('[API:ログイン] Supabaseクライアント作成成功');
    } catch (clientError: any) {
      console.error('[API:ログイン] Supabaseクライアント作成失敗', {
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
    
    // ログイン処理
    console.log('[API:ログイン] Supabaseでログインを実行');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('[API:ログイン] Supabaseエラー', {
          error,
          code: error.code,
          status: error.status,
          message: error.message
        });
        
        // Supabaseエラーコードに基づいた適切なHTTPステータスとメッセージ
        let statusCode = 400;
        let errorMessage = error.message || 'ログインに失敗しました';
        
        if (error.message?.includes('Invalid login')) {
          statusCode = 401;
          errorMessage = 'メールアドレスまたはパスワードが正しくありません';
        } else if (error.message?.includes('Email not confirmed')) {
          statusCode = 401;
          errorMessage = 'メールアドレスが確認されていません。メールを確認してアカウントを有効化してください';
        } else if (error.status && error.status === 429) {
          statusCode = 429;
          errorMessage = 'リクエストが多すぎます。しばらく待ってから再度お試しください';
          
          // レート制限エラーの詳細をログに記録
          console.warn('[API:ログイン] レート制限に達しました', {
            email,
            errorDetails: error.message,
            timestamp: new Date().toISOString()
          });
          
          // クライアントにより詳細な情報を提供
          return setCorsHeaders(NextResponse.json(
            { 
              error: errorMessage,
              code: error.code,
              details: error.message,
              retryAfter: 60, // 60秒後に再試行を推奨
              suggestion: 'ブラウザを閉じて再度開くか、別のブラウザで試してみてください'
            },
            { 
              status: statusCode,
              headers: {
                'Retry-After': '60' // 標準的なレート制限ヘッダー
              }
            }
          ));
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
      
      console.log('[API:ログイン] ログイン成功', { 
        userId: data.user?.id,
        hasSession: !!data.session
      });
      
      // 成功レスポンス
      return setCorsHeaders(NextResponse.json({
        user: data.user,
        session: data.session,
      }));
    } catch (authError: any) {
      console.error('[API:ログイン] ログイン処理中の例外', {
        error: authError,
        message: authError?.message,
        stack: authError?.stack?.split('\n').slice(0, 3).join('\n')
      });
      
      return setCorsHeaders(NextResponse.json(
        { 
          error: '認証処理中にエラーが発生しました',
          details: authError?.message || 'ログイン処理エラー'
        },
        { status: 500 }
      ));
    }
  } catch (error: any) {
    console.error('[API:ログイン] 予期しない例外', {
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
