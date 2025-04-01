import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const requestBody = await request.json();
    const { type, itemId, feedback, studentId } = requestBody;
    
    if (!type || !itemId || !feedback) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Supabaseクライアントを初期化
    const supabase = createRouteHandlerClient({ cookies });
    
    // 認証チェック
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      console.error('[API:フィードバック] 認証エラー:', authError);
      return NextResponse.json(
        { error: '認証エラー' },
        { status: 401 }
      );
    }
    
    const teacherId = session.user.id;
    const teacherName = session.user.user_metadata?.name || '講師';
    const currentDate = new Date().toISOString();
    
    let result;
    
    // フィードバックの種類に応じてデータベース更新
    if (type === 'practice') {
      // 練習記録へのフィードバック
      result = await supabase
        .from('practice_records')
        .update({
          feedback,
          feedback_date: currentDate,
          teacher_id: teacherId,
          teacher_name: teacherName
        })
        .eq('id', itemId)
        .eq('student_id', studentId);
    } else if (type === 'assignment') {
      // 課題へのフィードバック
      result = await supabase
        .from('assignments')
        .update({
          feedback,
          feedback_date: currentDate,
          teacher_id: teacherId,
          teacher_name: teacherName
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
      console.error('[API:フィードバック] データベース更新エラー:', result.error);
      return NextResponse.json(
        { error: 'フィードバックの保存に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'フィードバックを送信しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API:フィードバック] 予期しないエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    );
  }
}

// フィードバックリクエストAPI
export async function PUT(request: Request) {
  try {
    const requestBody = await request.json();
    const { type, itemId } = requestBody;
    
    if (!type || !itemId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Supabaseクライアントを初期化
    const supabase = createRouteHandlerClient({ cookies });
    
    // 認証チェック
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      console.error('[API:フィードバックリクエスト] 認証エラー:', authError);
      return NextResponse.json(
        { error: '認証エラー' },
        { status: 401 }
      );
    }
    
    const studentId = session.user.id;
    
    let result;
    
    // フィードバックリクエストの種類に応じてデータベース更新
    if (type === 'practice') {
      // 練習記録へのフィードバックリクエスト
      result = await supabase
        .from('practice_records')
        .update({
          needs_feedback: true
        })
        .eq('id', itemId)
        .eq('student_id', studentId);
    } else if (type === 'assignment') {
      // 課題へのフィードバックリクエスト
      result = await supabase
        .from('assignments')
        .update({
          needs_feedback: true
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
      console.error('[API:フィードバックリクエスト] データベース更新エラー:', result.error);
      return NextResponse.json(
        { error: 'フィードバックリクエストの保存に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'フィードバックをリクエストしました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API:フィードバックリクエスト] 予期しないエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    );
  }
}

// フィードバック取得API
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const itemId = url.searchParams.get('itemId');
    
    if (!type || !itemId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Supabaseクライアントを初期化
    const supabase = createRouteHandlerClient({ cookies });
    
    // 認証チェック
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      console.error('[API:フィードバック取得] 認証エラー:', authError);
      return NextResponse.json(
        { error: '認証エラー' },
        { status: 401 }
      );
    }
    
    let result;
    
    // フィードバックの種類に応じてデータベースから取得
    if (type === 'practice') {
      // 練習記録のフィードバック
      result = await supabase
        .from('practice_records')
        .select('feedback, feedback_date, teacher_id, teacher_name')
        .eq('id', itemId)
        .single();
    } else if (type === 'assignment') {
      // 課題のフィードバック
      result = await supabase
        .from('assignments')
        .select('feedback, feedback_date, teacher_id, teacher_name')
        .eq('id', itemId)
        .single();
    } else {
      return NextResponse.json(
        { error: '不正なフィードバックタイプ' },
        { status: 400 }
      );
    }
    
    if (result.error) {
      console.error('[API:フィードバック取得] データベース取得エラー:', result.error);
      return NextResponse.json(
        { error: 'フィードバックの取得に失敗しました' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('[API:フィードバック取得] 予期しないエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラー' },
      { status: 500 }
    );
  }
}
