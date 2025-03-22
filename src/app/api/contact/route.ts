import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// バリデーションスキーマ
const contactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional().nullable(),
  contactType: z.enum(['general', 'lesson', 'trial', 'pricing', 'other'], {
    errorMap: () => ({ message: '問い合わせ種別を選択してください' }),
  }),
  preferredContact: z.enum(['email', 'phone', 'any'], {
    errorMap: () => ({ message: '希望連絡方法を選択してください' }),
  }),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
  policy: z.boolean().refine(val => val === true, {
    message: 'プライバシーポリシーに同意する必要があります',
  }),
});

export async function POST(request: NextRequest) {
  try {
    // リクエストボディを取得
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    
    // バリデーション
    const validationResult = contactFormSchema.safeParse({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      contactType: data.contactType,
      preferredContact: data.preferredContact,
      subject: data.subject,
      message: data.message,
      policy: data.policy === 'true',
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          errors: validationResult.error.format() 
        },
        { status: 400 }
      );
    }

    // デモモードで実行（Supabase接続なし）
    console.log('お問い合わせデータ:', {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      contactType: data.contactType,
      preferredContact: data.preferredContact,
      subject: data.subject,
      message: data.message,
      file: formData.get('attachment') ? 'ファイル添付あり' : 'ファイルなし',
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'お問い合わせを受け付けました',
        demo: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('サーバーエラー:', error);
    return NextResponse.json(
      { success: false, message: '予期せぬエラーが発生しました' },
      { status: 500 }
    );
  }
}
