import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 認証が必要なパスのリスト
const authRequiredPaths = ['/mypage', '/admin'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;
  
  // 認証が必要なパスの場合のみSupabase認証チェックを実行
  const isAuthRequired = authRequiredPaths.some(authPath => path.startsWith(authPath));
  
  if (isAuthRequired) {
    try {
      // ミドルウェアでSupabaseクライアントを作成
      const supabase = createMiddlewareClient({ req, res });
      
      // セッションを確認
      const { data: { session } } = await supabase.auth.getSession();
      
      // 未認証の場合はログインページにリダイレクト
      if (!session) {
        const redirectUrl = new URL('/auth/login', req.url);
        redirectUrl.searchParams.set('redirectTo', path);
        return NextResponse.redirect(redirectUrl);
      }
      
      return res;
    } catch (error) {
      console.error('[ミドルウェア] 認証エラー:', error);
      return res;
    }
  }
  
  // 認証が不要なパスの場合は何もせずに次へ
  return res;
}

// 特定のパスでのみミドルウェアを実行
export const config = {
  matcher: [
    // 静的アセットと認証コールバックを除外
    '/((?!_next/static|_next/image|favicon.ico|images|icons|api/auth/callback).*)',
  ],
};
