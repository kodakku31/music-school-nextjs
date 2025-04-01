import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { type, itemId, message } = requestBody;
    
    if (!type || !itemId || !message) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      );
    }
    
    // Supabaseクライアントを初期化
    const supabase = createRouteHandlerClient({ cookies });
    
    // 認証チェック
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      console.error('[API:フィードバック返信] 認証エラー:', authError);
      return NextResponse.json(
        { error: '認証エラー' },
        { status: 401 }
      );
    }
    
    const studentId = session.user.id;
    const studentName = session.user.user_metadata?.name || '生徒';
    const currentDate = new Date().toISOString();
    
    let result;
    
    // フィードバック返信の種類に応じてデータベース更新
    if (type === 'practice') {
      // 練習記録へのフィードバック返信
      result = await supabase
        .from('practice_records')
        .update({
          student_reply: message,
          student_reply_date: currentDate
        })
        .eq('id', itemId)
        .eq('student_id', studentId);
    } else if (type === 'assignment') {
      // 課題へのフィードバック返信
      result = await supabase
        .from('assignments')
        .update({
          student_reply: message,
          student_reply_date: currentDate
        })
        .eq('id', itemId)
        .eq('student_id', studentId);
    } else {
      return NextResponse.json(
        { error: '不正なフィードバックタイプ' },
        { status: 400 }
      );
    }
    
    if (result.error) {
      console.error('[API:フィードバック返信] データベース更新エラー:', result.error);
      return NextResponse.json(
        { error: 'フィードバック返信の保存に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'フィードバック返信を送信しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API:フィードバック返信] 予期しないエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    );
  }
}
