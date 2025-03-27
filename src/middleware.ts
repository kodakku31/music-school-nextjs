import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  try {
    // ミドルウェアでSupabaseクライアントを作成
    const supabase = createMiddlewareClient({ req, res });
    
    // セッションを更新
    await supabase.auth.getSession();
    
    return res;
  } catch (error) {
    console.error('[ミドルウェア] 認証エラー:', error);
    return res;
  }
}

// 特定のパスでのみミドルウェアを実行
export const config = {
  matcher: [
    /*
     * /api/auth/callback から始まるパスを除外
     * これはSupabaseの認証コールバックURLなので、ミドルウェアを実行しない
     */
    '/((?!api/auth/callback).*)',
  ],
};
